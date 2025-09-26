// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./devAccount.sol";

contract AccountFactory {
    address public admin;

    uint256 public userCount;
    mapping (address => address) public devAccounts;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );

    constructor() payable {
        admin = msg.sender;
    }

    function createAccount() external {
        if (userCount < 11) {
            DevAccount newAccount = new DevAccount{value: 2 ether}(msg.sender, admin);
            devAccounts[msg.sender] = address(newAccount);
            userCount = userCount + 1;
        } else {
            DevAccount newAccount = new DevAccount{value: 0 ether}(msg.sender, admin);
            devAccounts[msg.sender] = address(newAccount);
            userCount = userCount + 1;
        }
    }

    receive() external payable {
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    }
}