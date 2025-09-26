// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './reactive.sol';
import './funder.sol';
import './debtReactive.sol';
import './DebtPayer.sol';
import './IAccountFactory.sol';
import './IDevAccount.sol';

contract ReactiveFunderFactory {
    address public service;
    address private owner;
    address public accountFactory;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );
    event Setup(
        address indexed dev,
        address indexed funderAddress,
        address indexed debtPayer
    );

    constructor() payable {
        owner = msg.sender;
    }

    function setAccountFactory(address _accountFactory) external {
        accountFactory = _accountFactory;
    }
    
    function setupFunder(address callbackContract, address reactiveContract, uint256 eventTopic, uint256 refillValue, uint256 refillthreshold) payable external {
        address devAccount = IAccountFactory(accountFactory).devAccounts(msg.sender);
        uint256 devAccountBalance = devAccount.balance;
        uint256 initialFundAmount = (refillValue * 2) + 2 ether;
        uint256 deploymentAmount = initialFundAmount + 6 ether;
        
        require(devAccountBalance >= deploymentAmount, "Not enough REACT in dev account");
        
        Funder newReactiveFunder = new Funder{value: initialFundAmount}(service, callbackContract, reactiveContract, refillValue, refillthreshold);
        address funderAddress = address(newReactiveFunder);
        new Reactive{value: 2 ether}(service, funderAddress, callbackContract, eventTopic);

        DebtPayer newDebtPayer = new DebtPayer{value: 2 ether}(service, callbackContract, reactiveContract);
        address debtPayerAddress = address(newDebtPayer);
        new DebtReactive{value: 2 ether}(service, debtPayerAddress, funderAddress);

        IDevAccount(devAccount).withdraw(address(this), deploymentAmount);

        emit Setup(msg.sender, funderAddress, address(newDebtPayer));
    }

    receive() external payable {
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    } 
}