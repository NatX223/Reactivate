// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {ReactWallet} from "./Wallet.sol";

contract ReactWalletFactory is Ownable {
    mapping (address => address) public wallet;
    constructor() Ownable(msg.sender) {}

    function createWallet() public onlyOwner {
        wallet[msg.sender] = address(new ReactWallet(msg.sender));
    }

    function getWallet() public view returns (address) {
        return wallet[msg.sender];
    }
}
