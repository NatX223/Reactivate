// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ISystemContract {
    function debts(address reactive) external view returns (uint256);
}