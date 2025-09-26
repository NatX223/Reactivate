// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract getTopic {
    event refillHandled(address indexed refillerAddress, address reactiveContract);
    event callbackHandled(address indexed funderContract);
    
    constructor() {}
    
    function refill() external {
        emit refillHandled(address(this), address(0));
    }

    function callback() external {
        emit callbackHandled(address(this));
    }
} 