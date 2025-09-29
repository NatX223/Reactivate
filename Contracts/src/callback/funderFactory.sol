// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './funder.sol';
import './IAccountFactory.sol';
import './IDevAccount.sol';

contract funderFactory {
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
        address indexed funderAddress
    );

    constructor() payable {
        owner = msg.sender;
    }

    function setAccountFactory(address _accountFactory) external {
        accountFactory = _accountFactory;
    }
    
    function createFunder(address dev, address callbackContract, address reactiveContract, uint256 refillValue, uint256 refillthreshold) payable external {
        address devAccount = IAccountFactory(accountFactory).devAccounts(dev);
        uint256 devAccountBalance = devAccount.balance;
        uint256 initialFundAmount = (refillValue * 2) + 0.01 ether;

        require(devAccountBalance >= initialFundAmount, "Not enough REACT in dev account");

        Funder newReactiveFunder = new Funder{value: initialFundAmount}(callbackContract, reactiveContract, refillValue, refillthreshold, devAccount);
        address funderAddress = address(newReactiveFunder);

        IDevAccount(devAccount).withdraw(address(this), initialFundAmount);
        IDevAccount(devAccount).whitelist(funderAddress);

        emit Setup(dev, funderAddress);
    }

    receive() external payable {
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    } 
}