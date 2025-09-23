// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import '../../lib/reactive-lib/src/interfaces/ISystemContract.sol';
import '../../lib/reactive-lib/src/abstract-base/AbstractPausableReactive.sol';
import '../../lib/reactive-lib/src/interfaces/IReactive.sol';

contract Reactive is IReactive, AbstractPausableReactive {

    uint64 private constant GAS_LIMIT = 1000000;
    uint256 private constant REACTIVE_CHAIN_ID = 1597;
    uint256 private constant CALL_TOPIC_0 = 0x8dd725fa9d6cd150017ab9e60318d40616439424e2fade9c1c58854950917dfc;
    
    address public callbackHandler;
    address public reactiveContract;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );

    constructor(address _service, address _callbackHandler, address _reactiveContract) payable {
        callbackHandler = _callbackHandler;
        reactiveContract = _reactiveContract;
        service = ISystemContract(payable(_service));
        if (!vm) {
            service.subscribe(REACTIVE_CHAIN_ID, _reactiveContract, CALL_TOPIC_0, REACTIVE_IGNORE, REACTIVE_IGNORE, REACTIVE_IGNORE);
        }
    }

    function getPausableSubscriptions() internal view override returns (Subscription[] memory) {
        Subscription[] memory result = new Subscription[](1);
        result[0] = Subscription(
            REACTIVE_CHAIN_ID,
            address(service),
            CALL_TOPIC_0,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE
        );
        return result;
    }

    function react(LogRecord calldata log) external vmOnly {
        // address recipient = address(uint160(log.topic_1));

        bytes memory payload = abi.encodeWithSignature(
            "callback(address)",
            address(0)
        );

        emit Callback(
        REACTIVE_CHAIN_ID,
        callbackHandler,
        GAS_LIMIT,
        payload
    );
    }

    receive() external payable override(AbstractPayer, IPayer) {
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    }
}