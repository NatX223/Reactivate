// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC20} from "../lib/forge-std/src/interfaces/IERC20.sol";
import '../lib/reactive-lib/src/interfaces/ISystemContract.sol';
import '../lib/reactive-lib/src/abstract-base/AbstractPausableReactive.sol';
import '../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';
contract ReactWallet is AbstractPausableReactive, AbstractCallback {
    address public walletOwner;
    uint256 public CRON_TOPIC;
    uint256 public scheduledAmount;
    address public scheduledRecipient;
    address public scheduledToken;

    uint64 private constant GAS_LIMIT = 1000000;
    uint256 public lastCronBlock;

    address public receiveModule;
    uint256 public receivePercentage;
    mapping (address => uint256) public approvedModules;
    mapping (address => mapping (address => uint256)) public approvedTokenModules;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );
    
    uint256 public count;

    constructor(address _service, uint256 _cronTopic, uint256 amount, address recipient, address token) AbstractCallback(_service) payable {
        walletOwner = tx.origin;
        setSchedule(_service, _cronTopic, amount, recipient, token);
    }

    function approveModuleETH(address module, uint256 amount) public onlyWalletOwner {
        approvedModules[module] = amount;
    }

    function approveReceiveModule(address module, uint256 percentage) public onlyWalletOwner {
        receiveModule = module;
        receivePercentage = percentage;
    }

    function approveModuleToken(address module, address token, uint256 amount) public onlyWalletOwner {
        approvedTokenModules[module][token] = amount;
    }

    function sendEth(address to, uint256 amount) public onlyWalletOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(to).transfer(amount);
    }

    function sendToken(address token, address to, uint256 amount) public onlyWalletOwner {
        require(IERC20(token).balanceOf(address(this)) >= amount, "Insufficient balance");
        IERC20(token).transfer(to, amount);
    }

    function getEth(uint256 amount) public onlyApprovedModule(msg.sender, amount) {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(msg.sender).transfer(amount);
    }

    function getToken(address token, uint256 amount) public onlyApprovedTokenModule(msg.sender, token, amount) {
        require(IERC20(token).balanceOf(address(this)) >= amount, "Insufficient balance");
        IERC20(token).transfer(msg.sender, amount);
    }

    modifier onlyApprovedModule(address module, uint256 amount) {
        require(approvedModules[module] >= amount, "Module not approved");
        _;
    }
    
    modifier onlyApprovedTokenModule(address module, address token, uint256 amount) {
        require(approvedTokenModules[module][token] >= amount, "Module not approved");
        _;
    }

    modifier onlyWalletOwner() {
        require(msg.sender == walletOwner, 'Unauthorized');
        _;
    }

    function setSchedule(address _service, uint256 _cronTopic, uint256 amount, address recipient, address token) internal {
        service = ISystemContract(payable(_service));
        CRON_TOPIC = _cronTopic;
        scheduledAmount = amount;
        scheduledRecipient = recipient;
        scheduledToken = token;
        if (!vm) {
            service.subscribe(block.chainid, address(service), _cronTopic, REACTIVE_IGNORE, REACTIVE_IGNORE, REACTIVE_IGNORE);
        }
    }

    function getPausableSubscriptions() internal view override returns (Subscription[] memory) {
        Subscription[] memory result = new Subscription[](1);
        result[0] = Subscription(
            block.chainid,
            address(service),
            CRON_TOPIC,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE
        );
        return result;
    }

    function callback(address sender) authorizedSenderOnly rvmIdOnly(sender) external {
        if (scheduledToken == address(0)) {
            count = count + 1;
            payable(scheduledRecipient).transfer(scheduledAmount);
        } else {
            count = count + 1;
            IERC20(scheduledToken).transfer(scheduledRecipient, scheduledAmount);
        }
    }

    function react(LogRecord calldata log) external vmOnly {
        count = count + 1;
        if (log.topic_0 == CRON_TOPIC) {
            lastCronBlock = block.number;
            emit Callback(
                block.chainid,
                address(this),
                GAS_LIMIT,
                abi.encodeWithSignature("callback(), address(0)")
            );
        }
    }

    receive() external payable override(AbstractPayer, IPayer) {
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    }
    
}
