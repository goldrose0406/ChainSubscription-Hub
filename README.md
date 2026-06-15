# Escrow Contract (Soroban)

This repository contains a Soroban smart contract implementing a simple escrow (initialize / release / refund) and a minimal frontend.

**Contract ID:** CAU2YHMVF6UIDI7JM3WSGRQFTBH25C5IPQYIP4MKOGK2F7RXERG3NB74

**Transaction hashes**
- Deploy: <paste deploy tx hash here>
- initialize: <paste initialize tx hash here>
- release: <paste release tx hash here>
- refund: <paste refund tx hash here>

## Files
- Source contract: [contracts/escrow-contract/src/lib.rs](contracts/escrow-contract/src/lib.rs#L1-L200)
- Frontend: [stellar-dapp/frontend/app.js](stellar-dapp/frontend/app.js)

## Description
A simple escrow contract with these main functions:
- `initialize(buyer, seller, arbiter, token, amount)` – store escrow metadata and amount.
- `release(caller)` – send funds to seller (callable by buyer or arbiter).
- `refund(arbiter)` – refund buyer (callable by arbiter).

## Build & Deploy (Soroban Studio)
1. Open the project in Soroban Studio.
2. In the `contracts/escrow-contract` workspace click `Build Contract`.
3. In the Deploy panel upload or select the built wasm and click `Deploy Contract`.
4. Sign with Freighter on Testnet.
5. After deploy copy the `Contract ID` and the deploy transaction hash.

## Invoke (Soroban Studio)
1. In `DEPLOYED CONTRACTS` select the deployed contract (Testnet, Freighter).
2. Under `WRITE` choose function `initialize` and fill arguments:
	 - `buyer`: public key (G...)
	 - `seller`: public key (G...)
	 - `arbiter`: public key (G...)
	 - `token`: token contract id (or a placeholder)
	 - `amount`: integer (e.g. `1000000`)
3. Click `Call`, sign with Freighter and copy the tx hash.

## Invoke (CLI example)
Replace placeholders and run:

```bash
soroban contract invoke \
	--id CAU2YHMVF6UIDI7JM3WSGRQFTBH25C5IPQYIP4MKOGK2F7RXERG3NB74 \
	--fn initialize \
	--network testnet \
	--source <BUYER_PUBLIC_KEY_G...> \
	--arg <BUYER_G...> <SELLER_G...> <ARBITER_G...> <TOKEN_G...> 1000000
```

## Frontend
- Update `CONTRACT_ID` in `stellar-dapp/frontend/app.js` with the deployed contract id above.

## Notes
- Make sure Freighter is connected to Testnet and the signing account has Testnet XLM (use Friendbot).
- If you want, provide the actual tx hashes and I will insert them into this README for you.

---

Prepared for submission. If you want I can now add the transaction hashes (if you paste them) and update the frontend file.

## Project Vision

Build a minimal, auditable escrow contract on Soroban to demonstrate secure fund custody and controlled release/refund flows mediated by a designated arbiter.

## Key Features

- Initialize escrow between buyer, seller, and arbiter with a specified token/amount.
- Controlled release: only buyer or arbiter can release funds to seller.
- Refund by arbiter to return funds to buyer in dispute.

## Future Scope

- Implement token approval/transfer_from flow and tests.
- Add access control and event logging for better auditability.
- Build frontend UI for end-to-end UX and automated test scripts.
