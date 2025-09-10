// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {ReactWallet} from "./Wallet.sol";

contract ReactWalletFactory is Ownable {
    address public serviceAddress;
    mapping (address => address) public wallet;
    constructor(address _serviceAddress) Ownable(msg.sender) {
        serviceAddress = _serviceAddress;
    }

    function createWallet() public onlyOwner {
        wallet[msg.sender] = address(new ReactWallet(serviceAddress));
    }

    function getWallet() public view returns (address) {
        return wallet[msg.sender];
    }
}
