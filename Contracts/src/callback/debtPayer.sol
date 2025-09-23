// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';
import './IAbstractPayer.sol';

contract DebtPayer is AbstractCallback {

    address public callbackContract;
    event callbackHandled(address indexed funderContract);
    
    constructor(address _service, address _callbackContract) AbstractCallback(_service) payable {
        callbackContract = _callbackContract;
    }
    
    function callback(address sender) external authorizedSenderOnly rvmIdOnly(sender) {
        IAbsctractPayer(callbackContract).coverDebt();
        
        emit callbackHandled(address(this));
    }
} 