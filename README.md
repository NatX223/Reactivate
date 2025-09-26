# Reactivate
One stop solution to keep your reactive and callback contracts always active

---  

## Live Link - 
## Demo - 

## Table of Contents  

1. [Overview](#overview)  
2. [Problem Statement](#problem-statement)  
3. [Solution](#solution)  
4. [How It Works](#how-it-works)  
5. [Technologies Used](#technologies-used)  
6. [Setup and Deployment](#setup-and-deployment)  
7. [Future Improvements](#future-improvements)  
8. [Acknowledgments](#acknowledgments)  

---  

## Overview  

FlareSec is a native multi-factor authentication (MFA) service for the Flare blockchain, designed to enhance asset security by adding an extra verification 
step for sensitive smart contract functions such as transfer and approve.

It introduces email-based authentication alongside standard wallet signatures to help prevent unauthorized transactions and give users greater control over 
their assets. Fully integrated with Flare’s infrastructure, FlareSec offers a seamless, decentralized way to secure on-chain interactions.

---  

## Problem Statement  

Reactive contracts and callback contracts need REACT tokens and native tokens on other chains to be kept active otherwise they will become inactive due to lack tokens to run them, thus there needs to be constant manual monitoring of these contracts by the developers especially for reactive contracts that track high volume events like token transfers and approvals.

---  

## Solution  

Reactivate solves this pain point by automated monitoring, topping up and reactivation of reactive and callback contracts using reactive contracts of it's own. The solution is well suited for reactive contracts and the reactive ecosystem because it tracks the event emiited in the callback contract the user specifies and checks the balance of both reactive and callback contracts after every event and if the balance is below a specific threshold or has become inactive, the reactivate callback contract automatically funds the user specified contracts and if needed calls the "coverDebt()" function to reactivate them.

---  

## How It Works  

The working mechanism of the dapp can be broken down into 4 steps

1. **User Registration**:
   - The user signs up by generating a funding account.
   - This can be funded with REACT tokens or ETH and USDC on Base and other supported chains.
2. **Making a Deployment**:
   - The user inputs the addresses of the reactive and callback contracts and the signature hash of the event they want to track.
   - The user sepicifiies the balance threshold and the refill amounts.
   - The monitoring reactive contract and the corresponding funding callback contract are deployed using the provided parameters.
3. **Monitoring a Trigger event**:
   - The monitoring reactive contract picks up an event from the callback contract being monitored and emits a "Callback" event to call the funding function on the funding contract.
   - The funding function on the funding contract is called by the system contract, if the contracts balances are below the user specified threshold then REACT/native tokens are sent to the user specified contracts to keep them active.
4. **Contract Reactivation**:
   - If the contracts are inactive then the "coverDebt()" function is called to reactivate them.

---  

## Technologies Used  

| **Technology**    | **Purpose**                                              |  
|-------------------|----------------------------------------------------------|
| **Reactive**      | Use of Reactive's reactive and callback contracts.       |  
| **Firestore**     | Tracking platform activity and metrics.                  |
| **Wagmi**         | Smart contract interaction.                              | 
| **Next.js**       | Frontend framework for building the user interface.      |  

### Flare

In order to build FlareSec, native Flare technologies were utilized. Because these technologies are built in, It was easier to properly utilize them.
The Secure Random Number and Flare Data Connector features were used, Below is a description of how each of these technologies were used in building the project.

- Secure Random Number - The Secure Random Number feature is used in randomly selecting which validator will be responsible for carrying out a transaction 
once it has been approved or rejected. It was also used in a hashing function for determining the unique Id for each transaction.
Below is a code snippet showing how SRN was generated and used in the project
```solidity
    function getValidationParams(address contractAddress) public returns (address validator, uint256 reqId) {
        // get validator count
        validatorCount.current();
        // generate random number within that range
        (uint256 randomNumber, , ) = getSecureRandomNumber();
        uint256 validatorIndex = randomNumber % validatorCount.current();

        validator = validatorAddresses[validatorIndex];
        reqId = uint256(keccak256(abi.encodePacked(randomNumber, block.timestamp, contractAddress)));

        // Set the latest chosen validator
        latestValidator = validator;

        return (validator, reqId);
    }

    function getSecureRandomNumber()
        internal
        view
        returns (uint256 randomNumber, bool isSecure, uint256 timestamp)
    {
        (randomNumber, isSecure, timestamp) = randomV2.getRandomNumber();
        require(isSecure, "Random number is not secure");
        return (randomNumber, isSecure, timestamp);
    }
```
The full code for the contract the Secure Random Number was used can be found [here](https://github.com/NatX223/FlareSec/blob/main/smart%20contracts/contracts/Control.sol).

- Flare Data Connector - Another key component that is integral to the project is the use Flare Data Connector. FDC eneabled the passing of verified 
external data to asset smart contracts. This was absolutely neccesary because the service requires valid proofs as it handles user assets and that is 
what FDC provides - verifiable proof that a user has approved or rejected a transaction through their email. The proof is first generated off-chain then 
passed on on-chain by a validator calling a validation function on an asset contract.  
Below is a code snippet showing some of the specs and how proofs are generated 
```javascript
const postprocessJq = `{owner: .owner, spender: .spender, receiver: .receiver, amount: .amount, status: .status, initiatedTime: .initiatedTime}`;
const abiSignature = `{\"components\": [{\"internalType\": \"address\", \"name\": \"owner\", \"type\": \"address\"},{\"internalType\": \"address\", \"name\": \"spender\", \"type\": \"address\"},{\"internalType\": \"address\", \"name\": \"receiver\", \"type\": \"address\"},{\"internalType\": \"uint256\", \"name\": \"amount\", \"type\": \"uint256\"},{\"internalType\": \"enum IERC20x.Status\", \"name\": \"status\", \"type\": \"uint8\"},{\"internalType\": \"uint256\", \"name\": \"initiatedTime\", \"type\": \"uint256\"}],\"name\": \"task\",\"type\": \"tuple\"}`;

const attestationTypeBase = "IJsonApi";
const sourceIdBase = "WEB2";
``` 

Proof generation
```javascript
async function retrieveDataAndProof(
    abiEncodedRequest,
    roundId
) {
    const url = `${COSTON2_DA_LAYER_URL}api/v1/fdc/proof-by-request-round-raw`;
    console.log("Url:", url, "\n");
    return await retrieveDataAndProofBase(url, abiEncodedRequest, roundId);
}

async function retrieveDataAndProofBase(
  url,
  abiEncodedRequest,
  roundId
) {
  console.log("Waiting for the round to finalize...");
  // We check every 10 seconds if the round is finalized
  const relay = await getRelay();
  while (!(await relay.isFinalized(200, roundId))) {
    await sleep(10000);
  }
  console.log("Round finalized!\n");

  const request = {
    votingRoundId: roundId,
    requestBytes: abiEncodedRequest,
  };
  console.log("Prepared request:\n", request, "\n");

  await sleep(10000);
  var proof = await postRequestToDALayer(url, request, true);
  console.log("Waiting for the DA Layer to generate the proof...");
  while (proof.response_hex == undefined) {
    await sleep(5000);
    proof = await postRequestToDALayer(url, request, false);
  }
  console.log("Proof generated!\n");

  console.log("Proof:", proof, "\n");
  return proof;
}
```
In the smart cntracts the use of the external data gotten from the validation API is highlighted below
```solidity
    function validateTransfer(uint256 reqId, IJsonApi.Proof calldata data) external onlyValidator(reqId) returns(bool) {
        require(isJsonApiProofValid(data), "Invalid proof");
        require(requests[reqId].status != Status.Approved, "Transaction already approved");
        
        Request memory params = abi.decode(data.data.responseBody.abi_encoded_data, (Request));

        // Check the status of the request
        require(params.status == Status.Approved, "Transfer request is still pending or has been denied");

        if (params.status == Status.Denied) {
            requests[reqId].status = Status.Denied;
            revert("Transfer request has been denied");
        } else if (params.status == Status.Pending) {
            revert("Transfer request is still pending");
        }

        // Get the max approval time from the Control contract
        uint maxApprovalTime = IControl(controlContract).maxApprovalTime();

        // Check that the time difference is within the max approval time
        require(block.timestamp <= requests[reqId].initiatedTime + maxApprovalTime, "Approval time exceeded");

        // Additional logic for validation can be added here
        _burn(_msgSender(), requests[reqId].amount);
        ERC20(originalContract).transfer(requests[reqId].receiver, requests[reqId].amount);

        requests[reqId].status = Status.Approved;

        return true; // Return true if validation is successful
    }
``` 

Use of example specifications
```bash
attestation_type: '0x494a736f6e417069000000000000000000000000000000000000000000000000',
sourceId: '0x5745423200000000000000000000000000000000000000000000000000000000',
votingRound: 964883n,
proof: [
  '0xf0bedb4fd550d6c3f4e25983d9aadf33c46330c7203e08439e04f3893d64e1ac',
  '0x7cf5d720a1bf44c5333a3fda07e612f9c4b520d4668ed85457fc31bad3142d56',
  '0x10e655fa5a9bc7cd3752a872355d953cb62707057a9f88bedae415e977ec70e0',
  '0x2bc21662211af868bbc81c5c4b93f8aaa091498797ed7b4633ec93237ea4ff91'
]
url: 'https://96c5-62-173-60-250.ngrok-free.app/event/1767448648305103850985470812704491472459415057420211611911389935726085599372',
postprocessJq: '{owner: .owner, spender: .spender, receiver: .receiver, amount: .amount, status: .status, initiatedTime: .initiatedTime}',
abi_signature: '{"components": [{"internalType": "address", "name": "owner", "type": "address"},{"internalType": "address", "name": "spender", "type": "address"},{"internalType": "address", "name": "receiver", "type": "address"},{"internalType": "uint256", "name": "amount", "type": "uint256"},{"internalType": "enum IERC20x.Status", "name": "status", "type": "uint8"},{"internalType": "uint256", "name": "initiatedTime", "type": "uint256"}],"name": "task","type": "tuple"}'
abi_encoded_data: '0x0000000000000000000000002ae67a159fc288db6ba4407c014f20147130b54a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000006897d3a40bf4f217f3f26cb4c31baf490b5ec074000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000068064afb'
```
The full code to contracts that utilize FDC can be found [here](https://github.com/NatX223/FlareSec/blob/main/smart%20contracts/contracts/Tokenx.sol) and [here](https://github.com/NatX223/FlareSec/blob/main/smart%20contracts/contracts/NFTx.sol).

- The smart contracts were deployed on the Coston2 testnet, below is a table showing the contracts deployed and their addreess

| **Contract**        | **Addres**                                 | **Function**                                                             |
|---------------------|--------------------------------------------|--------------------------------------------------------------------------|
| **Control**         | 0x8c54cbb9e358888B902725593a5006A96a8C9551 | Setting protocol params and generating transaction validator and id      |
| **TokenXFactory**   | 0x8B8b617Ce5FF505C04723107221F2757154Dc25A | TokenX contract creation/deployment                                      |
| **NFTXFactory**     | 0x4E82f9A00C76a6c966e8A4a9A1382CEeD37FFC17 | NFTX contract creation/deployment                                        |
| **TokenXRouter**    | 0x4798963E50accCc36781C3F0cf12b38A93777EbA | Broadcasting TokenX transactions - emitting trackable transaction events | 
| **NFTXRouter**      | 0x5E5EcA08e8978BE3D52e7874B6B8080154E55E53 | Broadcasting NFTX transactions - emitting trackable transaction events   |


### Node.js

The project utilizes off-chain data to verify on-chain transactions, as such there was need for a external data source and this came in form of a server.
The server is responsible for tracking events from the router contracts, alerting the user through their emails and then notifying the assigned validator
to get the users response, generating a proof for it and finally executing the function on-chain. The full code for the general backend and validator can 
be found [here](https://github.com/NatX223/FlareSec/tree/main/backend/src) and [here](https://github.com/NatX223/FlareSec/tree/main/validator/src) respectively. 

### MailerSend

MailerSend was used for relaying email alerts to users, it was chosen because of its speed and ease of use.

## Setup and Deployment  

### Prerequisites  

- Node.js v16+  
- Solidity development environment(Hardhat recommended)
- Blockchain wallets (e.g., MetaMask)  

### Local Setup  

The repository has to be cloned first

```bash  
  git clone https://github.com/NatX223/FlareSec  
```
- Smart contracts

1. Navigate to the smart contracts directory:  
  ```bash  
  cd smart contracts  
  ```  
2. Install dependencies:  
  ```bash  
  npm install  
  ```  
3. Set up environment variables:
  ```  
  CONTROL_OWNER=<Controller private key>
  VALIDATOR=<Validator private key>
  FLARE_RPC_URL=https://coston2-api.flare.network/ext/C/rpc
  COSTON2_FLARESCAN_API=https://api.routescan.io/v2/network/testnet/evm/114/etherscan/api
  FLARE_FLARESCAN_API=https://api.routescan.io/v2/network/mainnet/evm/14/etherscan/api 
  ```  
4. Compile smart contracts:  
  ```bash  
  npx hardhat compile  
  ```  
5. Run some tests:
  ```bash
  npx hardhat run scripts/test/control.test.js --network flare
  ```
  ```bash
  npx hardhat run scripts/test/tokenx.test.js --network flare
  ```
6. Run deployment scripts:
  ```bash
  npx hardhat run scripts/control.js --network flare
  ```
  ```bash
  npx hardhat run scripts/assets.js --network flare
  ```
  ```bash
  npx hardhat run scripts/factory.js --network flare
  ```

---  

## Future Improvements

1. Provide support for SMS notification and Auntentication apps.
2. Extensive audits on the protocol's smart contracts.
3. Mainnet deployment.
3. Building a wallet mobile app.

---  

## Acknowledgments  

Special thanks to **Flare x Encode Hackathon 2025** organizers: Flare and Encode. The Flare products played a pivotal role in building FlareSec functionality and impact.
