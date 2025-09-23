// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';

contract Funder is AbstractCallback {

    address public callbackReceiver;
    uint256 public refillValue;
    uint256 public refillThreshold;

    event refillHandled(address indexed refillerAddress, address callbackContract);
    event callbackHandled(address indexed funderContract);
    
    constructor(address _service, address _callbackReceiver, uint256 _refillValue, uint256 _refillThreshold) AbstractCallback(_service) payable {
        callbackReceiver = _callbackReceiver;
        refillValue = _refillValue;
        refillThreshold = _refillThreshold;
    }
    
    function callback(address sender) external authorizedSenderOnly rvmIdOnly(sender) {
        uint256 bal = callbackReceiver.balance;
        if (bal <= refillThreshold) {
            (bool success, ) = callbackReceiver.call{value: refillValue}("");
            require(success, "Payment failed.");

            emit refillHandled(address(this), callbackReceiver);
        } else {
            emit callbackHandled(address(this));
        }

    }
} 