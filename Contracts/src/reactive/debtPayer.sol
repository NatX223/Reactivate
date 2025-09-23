// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';
import './IAbstractPayer.sol';

contract DebtPayer is AbstractCallback {

    address public reactiveContract;
    event callbackHandled(address indexed funderContract);
    
    constructor(address _service, address _reactiveContract) AbstractCallback(_service) payable {
        reactiveContract = _reactiveContract;
    }
    
    function callback(address sender) external authorizedSenderOnly rvmIdOnly(sender) {
        IAbsctractPayer(reactiveContract).coverDebt();
        
        emit callbackHandled(address(this));
    }
} 