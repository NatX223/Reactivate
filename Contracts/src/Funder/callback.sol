// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity >=0.8.0;

contract callback {
    event Received(
        address indexed contractAddress
    );
    event Complete(
        uint256 indexed amount
    );

    function callFunc() external {
        emit Received(
            address(this)
        );
    }

    receive() external payable {
        emit Complete(msg.value);
    }
}