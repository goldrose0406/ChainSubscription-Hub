Stellar Soroban dApp - Quick Starter

This repository contains a minimal Soroban smart contract and a tiny frontend you can use with Soroban Studio to complete the Rise In / Stellar bootcamp task.

What is included
- `lib.rs` — a simple counter contract (paste this into Soroban Studio `lib.rs`).
- `frontend/index.html` + `frontend/app.js` — minimal UI that connects with Freighter and calls the contract (replace CONTRACT_ID after deploy).

Quick flow (Soroban Studio)
1. Open https://soroban.studio/ and create a new project (or use the default contract template).
2. Open the `lib.rs` file in the editor and replace its contents with the `lib.rs` from this folder.
3. Click **Build**. Fix any compile errors if shown.
4. Click **Deploy to Testnet** and confirm (Soroban Studio will ask to connect Freighter and use Friendbot test XLM).
5. After deploy you will get a **Contract ID** — copy it.
6. Use the Studio UI to **Invoke** `init` (or `inc`) at least once to produce a transaction hash — save a screenshot and the tx hash.
7. Update the `frontend/app.js` `CONTRACT_ID` constant with your deployed contract ID to test the UI locally or host it.

Frontend usage
- Open `frontend/index.html` in a browser with the Freighter extension installed and set to Testnet.
- Click "Connect Wallet" then use the UI buttons to call the contract. The UI shows returned values and tx hashes.

Submission checklist (per bootcamp)
- GitHub repo is PUBLIC
- README (English) includes: project name, description, contract ID, at least 1 tx link, screenshots
- No private keys / .env files committed

If you want, I can:
- Walk you through pasting and deploying in Soroban Studio step-by-step (I'll describe each click), or
- Prepare a GitHub-ready repo and push it (you'll need to supply a GitHub token or push yourself).
