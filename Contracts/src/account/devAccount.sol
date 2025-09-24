// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract Account{
    address public admin;
    address public owner;
    address public fundingToken;

    mapping (address => bool) public whitelisted;

    constructor(address _owner, address _admin, address _fundingToken) {
        admin = _admin;
        owner = _owner;
    }

    // whitelist function
    function whitelist(address funderContract) external onlyAdmin {
        whitelisted[funderContract] = true;
    }

    function blacklist(address funderContract) external onlyAdmin {
        whitelisted[funderContract] = false;
    }

    // send ether function
    function fundContract(address fundedContract, uint256 amount) external onlyWhitelisted {
        (bool success, ) = fundedContract.call{value: amount}("");
        require(success, "Payment failed.");
    }

    // send token function
    function fundContractToken(address fundedContract, uint256 amount) {
        IERC20(fundingToken).transfer(fundedContract, amount);
    }
}