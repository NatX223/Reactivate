// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';

contract callbackHandler is AbstractCallback {

    event callbackHandled(address indexed contractAddress);
    
    constructor(address _service) AbstractCallback(_service) payable {
    }

    function callback(address sender) external authorizedSenderOnly rvmIdOnly(sender) {
        emit callbackHandled(address(this));
    }
}