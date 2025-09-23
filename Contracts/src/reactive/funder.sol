// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';

contract funder is AbstractCallback {

    address public reactiveReceiver;
    uint256 public refillValue;
    uint256 public refillThreshold;

    event refillHandled(address indexed refillerAddress, address reactiveContract);
    event callbackHandled(address indexed funderContract);
    
    constructor(address _service, address _reactiveReceiver, uint256 _refillValue, uint256 _refillThreshold) AbstractCallback(_service) payable {
        reactiveReceiver = _reactiveReceiver;
        refillValue = _refillValue;
        refillThreshold = _refillThreshold;
    }
    
    function callback(address sender) external authorizedSenderOnly rvmIdOnly(sender) {
        uint256 bal = reactiveReceiver.balance;
        if (bal <= refillThreshold) {
            (bool success, ) = reactiveReceiver.call{value: refillValue}("");
            require(success, "Payment failed.");

            emit refillHandled(address(this), reactiveReceiver);
        } else {
            emit callbackHandled(address(this));
        }

    }
} 