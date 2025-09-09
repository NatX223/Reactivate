// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {IERC20} from "../lib/forge-std/src/interfaces/IERC20.sol";

contract ReactWallet is Ownable {
    address public receiveModule;
    uint256 public receivePercentage;
    mapping (address => uint256) public approvedModules;
    mapping (address => mapping (address => uint256)) public approvedTokenModules;
    constructor(address owner) Ownable(owner) {}

    function approveModuleETH(address module, uint256 amount) public onlyOwner {
        approvedModules[module] = amount;
    }

    function approveReceiveModule(address module, uint256 percentage) public onlyOwner {
        receiveModule = module;
        receivePercentage = percentage;
    }

    function approveModuleToken(address module, address token, uint256 amount) public onlyOwner {
        approvedTokenModules[module][token] = amount;
    }

    function sendEth(address to, uint256 amount) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(to).transfer(amount);
    }

    function sendToken(address token, address to, uint256 amount) public onlyOwner {
        require(IERC20(token).balanceOf(address(this)) >= amount, "Insufficient balance");
        IERC20(token).transfer(to, amount);
    }

    function getEth(uint256 amount) public onlyApprovedModule(msg.sender, amount) {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(msg.sender).transfer(amount);
    }

    function getToken(address token, uint256 amount) public onlyApprovedTokenModule(msg.sender, token, amount) {
        require(IERC20(token).balanceOf(address(this)) >= amount, "Insufficient balance");
        IERC20(token).transfer(msg.sender, amount);
    }

    modifier onlyApprovedModule(address module, uint256 amount) {
        require(approvedModules[module] >= amount, "Module not approved");
        _;
    }

    modifier onlyApprovedTokenModule(address module, address token, uint256 amount) {
        require(approvedTokenModules[module][token] >= amount, "Module not approved");
        _;
    }

    
}
