// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './reactive.sol';
import './funder.sol';
import './debtReactive.sol';
import './DebtPayer.sol';

contract ReactiveFunderFactory {
    address public service;
    address private owner;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );
    event Setup(
        address indexed dev,
        address indexed callbackContract,
        address indexed funderAddress,
        address reactiveTracker,
        address debtPayer,
        address debtReactive
    );

    mapping (address => uint256) public devBalance;

    constructor() {
        owner = msg.sender;
    }

    function setupFunder(address dev, address callbackContract, uint256 eventTopic, uint256 refillValue, uint256 refillthreshold) payable external {
        require(msg.sender == owner, "Not authorized - only owner can call function");
        uint256 initialFundAmount = (refillValue * 2);
        require(devBalance[dev] >= initialFundAmount, "Not enough funds - top up funds");
        
        Funder newReactiveFunder = new Funder{value: initialFundAmount}(service, callbackContract, refillValue, refillthreshold);
        address funderAddress = address(newReactiveFunder);
        Reactive newReactiveTracker = new Reactive{value: 2 ether}(service, funderAddress, callbackContract, eventTopic);

        DebtPayer newDebtPayer = new DebtPayer{value: 2 ether}(service, callbackContract);
        address debtPayerAddress = address(newDebtPayer);
        DebtReactive newDebtReactive = new DebtReactive{value: 2 ether}(service, debtPayerAddress, funderAddress);

        devBalance[dev] = devBalance[dev] - initialFundAmount;

        emit Setup(dev, callbackContract, funderAddress, address(newReactiveTracker), address(newDebtPayer), address(newDebtReactive));
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