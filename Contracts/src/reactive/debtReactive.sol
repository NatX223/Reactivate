// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import '../../lib/reactive-lib/src/interfaces/ISystemContract.sol';
import '../../lib/reactive-lib/src/abstract-base/AbstractPausableReactive.sol';
import '../../lib/reactive-lib/src/interfaces/IReactive.sol';

contract reactive is IReactive, AbstractPausableReactive {

    uint64 private constant GAS_LIMIT = 1000000;
    uint256 private constant REACTIVE_CHAIN_ID = 1597;
    uint256 private CALL_TOPIC_0 = 0xae9b008540831f838abd0c11ccc58c6373c34ab68e881d96aefe64688f45ec6d;
    
    address public callbackAddress;
    address public funderContract;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );

    constructor(address _service, address _callbackAddress, address _funderContract) payable {
        callbackAddress = _callbackAddress;
        _funderContract = funderContract;
        service = ISystemContract(payable(_service));
        if (!vm) {
            service.subscribe(REACTIVE_CHAIN_ID, _funderContract, CALL_TOPIC_0, REACTIVE_IGNORE, REACTIVE_IGNORE, REACTIVE_IGNORE);
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

        bytes memory payload = abi.encodeWithSignature(
            "callback(address)",
            address(0)
        );

        emit Callback(
        REACTIVE_CHAIN_ID,
        callbackAddress,
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