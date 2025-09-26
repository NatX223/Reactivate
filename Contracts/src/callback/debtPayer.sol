// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';
import './IAbstractPayer.sol';
import './ISystemContract.sol';

contract DebtPayer is AbstractCallback {

    address public callbackContract;
    address public reactiveContract;
    address public constant SYSTEM_CONTRACT = 0x0000000000000000000000000000000000fffFfF;

    event debtPaid(address indexed fundedContract);
    
    constructor(address _service, address _callbackContract, address _reactiveContract) AbstractCallback(_service) payable {
        callbackContract = _callbackContract;
        reactiveContract = _reactiveContract;
    }
    
    function callback(address sender) external authorizedSenderOnly rvmIdOnly(sender) {
        unit256 callbackDebt = ISystemContract.debts(callbackContract);
        unit256 reactiveDebt = ISystemContract.debts(reactiveContract);
        if (callbackDebt > 0) {
            IAbsctractPayer(callbackContract).coverDebt();
            emit debtPaid(address(this));
        }

        if (reactiveDebt > 0) {
            IAbsctractPayer(reactiveContract).coverDebt();
            emit debtPaid(address(this));
        }
    }
} 