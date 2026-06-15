// Minimal frontend to call the Counter contract using Freighter
import * as StellarSdk from "https://cdn.jsdelivr.net/npm/@stellar-sdk/browser@0.0.0/+esm";
import { isConnected, getAddress, signTransaction } from "https://cdn.jsdelivr.net/npm/@stellar/freighter-api@0.2.0/+esm";

const CONTRACT_ID = "REPLACE_WITH_YOUR_CONTRACT_ID";
const RPC_URL = "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

async function connectWallet() {
  if (!(await isConnected())) return alert("Install Freighter and set to Testnet");
  const { address } = await getAddress();
  document.getElementById("wallet").textContent = address;
  return address;
}

async function callContract(funcName, ...args) {
  const address = await connectWallet();
  const server = new StellarSdk.SorobanRpc.Server(RPC_URL);
  const account = await server.getAccount(address);
  const contract = new StellarSdk.Contract(CONTRACT_ID);

  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call(funcName, ...args))
    .setTimeout(30)
    .build();

  const prepared = await server.prepareTransaction(tx);
  const { signedTxXdr } = await signTransaction(prepared.toXDR(), {
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  const signed = StellarSdk.TransactionBuilder.fromXDR(signedTxXdr, NETWORK_PASSPHRASE);
  const res = await server.sendTransaction(signed);
  return res;
}

document.getElementById("connect").onclick = async () => {
  await connectWallet();
};
document.getElementById("init").onclick = async () => {
  const r = await callContract("init", 0);
  document.getElementById("tx").textContent = JSON.stringify(r);
};
document.getElementById("inc").onclick = async () => {
  const r = await callContract("inc");
  document.getElementById("tx").textContent = JSON.stringify(r);
};
document.getElementById("get").onclick = async () => {
  try {
    const address = await connectWallet();
    const server = new StellarSdk.SorobanRpc.Server(RPC_URL);
    const contract = new StellarSdk.Contract(CONTRACT_ID);
    const val = await server.callContractReadOnly(contract, "get", []);
    document.getElementById("value").textContent = val; 
  } catch (e) {
    document.getElementById("value").textContent = "error";
  }
};
