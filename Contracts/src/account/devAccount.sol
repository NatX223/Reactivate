// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DevAccount {
    address public admin;
    address public owner;
    address public factory;

    mapping (address => bool) public whitelisted;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );

    constructor(address _owner, address _admin, address _factory) payable {
        admin = _admin;
        owner = _owner;
        factory = _factory;
    }

    function whitelist(address funderContract) external onlyAdmin {
        whitelisted[funderContract] = true;
    }

    function blacklist(address funderContract) external onlyAdmin {
        whitelisted[funderContract] = false;
    }

    function withdraw(address fundedContract, uint256 amount) external onlyWhitelisted {
        (bool success, ) = fundedContract.call{value: amount}("");
        require(success, "Payment failed.");
    }

    receive() external payable {
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    }

    modifier onlyAdmin {
        require(msg.sender == admin || msg.sender == owner || msg.sender == factory, "Only authorized can call this function");
        _;
    }

    modifier onlyWhitelisted {
        require(msg.sender == admin || whitelisted[msg.sender] == true, "Only authorized can call this function");
        _;
    }
}