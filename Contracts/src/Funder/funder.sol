// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';

contract funder is AbstractCallback {

    address public receiver;
    event callbackHandled(address indexed contractAddress);
    
    constructor(address _service, address _receiver) AbstractCallback(_service) payable {
        receiver = _receiver;
    }
    
    function callback(address sender) external authorizedSenderOnly rvmIdOnly(sender) {
        (bool success, ) = receiver.call{value: 0.05 ether}("");
        require(success, "Payment failed.");

        emit callbackHandled(address(this));
    }
} 