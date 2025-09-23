// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './reactive.sol';
import './funder.sol';
import './debtReactive.sol';
import './DebtPayer.sol';

contract ReactiveFunderFactory {
    address public constant SERVICE = 0x0000000000000000000000000000000000fffFfF;
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

    function setupFunder(address reactiveContract, uint256 refillValue, uint256 refillthreshold) payable external {
        uint256 initialFundAmount = refillValue * 2;
        Funder newReactiveFunder = new Funder{value: initialFundAmount}(SERVICE, reactiveContract, refillValue, refillthreshold);
        address funderAddress = address(newReactiveFunder);
        Reactive newReactiveTracker = new Reactive{value: 2 ether}(SERVICE, funderAddress, reactiveContract);

        DebtPayer newDebtPayer = new DebtPayer{value: 2 ether}(SERVICE, reactiveContract);
        address debtPayerAddress = address(newDebtPayer);
        DebtReactive newDebtReactive = new DebtReactive{value: 2 ether}(SERVICE, debtPayerAddress, funderAddress);

        emit Setup(msg.sender, reactiveContract, funderAddress, address(newReactiveTracker), address(newDebtPayer), address(newDebtReactive));
    }

    receive() external payable {
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    }
}