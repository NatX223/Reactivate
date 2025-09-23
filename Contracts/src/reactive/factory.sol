// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './reactive.sol';
import './funder.sol';
import './debtReactive.sol';
import './DebtPayer.sol';

contract ReactiveFunderFactory {
    address public constant SERVICE = 0x0000000000000000000000000000000000fffFfF;
    address private owner;
    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );
    event Setup(
        address indexed dev,
        address indexed reactiveContract,
        address indexed funderAddress,
        address reactiveTracker,
        address debtPayer,
        address debtReactive
    );

    mapping (address => uint256) public devBalance;

    constructor() {
        owner = msg.sender;
    }

    function setupFunder(address dev, address reactiveContract, uint256 refillValue, uint256 refillthreshold) payable external {
        require(msg.sender == owner, "Not authorized - only owner can call function");
        uint256 initialFundAmount = (refillValue * 2);
        require(devBalance[dev] >= initialFundAmount, "Not enough funds - top up funds");
        
        Funder newReactiveFunder = new Funder{value: initialFundAmount}(SERVICE, reactiveContract, refillValue, refillthreshold);
        address funderAddress = address(newReactiveFunder);
        Reactive newReactiveTracker = new Reactive{value: 0.5 ether}(SERVICE, funderAddress, reactiveContract);

        DebtPayer newDebtPayer = new DebtPayer{value: 0.5 ether}(SERVICE, reactiveContract);
        address debtPayerAddress = address(newDebtPayer);
        DebtReactive newDebtReactive = new DebtReactive{value: 0.5 ether}(SERVICE, debtPayerAddress, funderAddress);

        devBalance[dev] = devBalance[dev] - initialFundAmount;

        emit Setup(dev, reactiveContract, funderAddress, address(newReactiveTracker), address(newDebtPayer), address(newDebtReactive));
    }

    receive() external payable {
        uint256 balance = devBalance[tx.origin];
        devBalance[tx.origin] = balance + msg.value;
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    }
}