// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {ReactWallet} from "./Wallet.sol";

contract ReactWalletFactory is Ownable {
    address public serviceAddress;
    mapping (address => address) public wallet;
    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );

    constructor() Ownable(msg.sender) {
        serviceAddress = 0x0000000000000000000000000000000000fffFfF;
    }

    function createWallet(uint256 _cronTopic, uint256 amount, address recipient, address token) public {
        ReactWallet newWallet = new ReactWallet{value: 1 ether}(serviceAddress, _cronTopic, amount, recipient, token);

        wallet[msg.sender] = address(newWallet);
    }

    function getWallet(address owner) public view returns (address) {
        return wallet[owner];
    }

    receive() external payable {
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    }
}
