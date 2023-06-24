import React from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { wallet } from "./WelcomePage";

const provider = new ethers.JsonRpcProvider(
  import.meta.env.VITE_APP_INFURA_ENDPOINT
);

export default function Dashboard() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [balance, setBalance] = React.useState(0);

  const handleAuthentication = () => {
    if (password === localStorage.getItem("13x54r_walletPassword")) {
      setAuthenticated(true);
    }
  };

  React.useEffect(() => {
    provider.getBalance(wallet?.address).then((_balance) => {
      const formattedBalance = ethers.formatEther(_balance);
      setBalance(formattedBalance);
    });
  }, []);

  const [receiverAddress, setReceiverAddress] = React.useState("");
  const [receivingAmount, setReceivingAmount] = React.useState("");

  const handleTransactionSend = () => {
    console.log(wallet.privateKey)
    const signer = new ethers.Wallet(wallet.privateKey, provider);

    let tx = {
      to: receiverAddress,
      // Convert currency unit from ether to wei
      value: ethers.parseEther(receivingAmount),
    };

    signer
      .sendTransaction(tx)
      .then(() => toast("Transaction Submitted!"))
      .then((txObj) => {
        console.log("txHash", txObj.hash);
        toast("Transaction Completed!");
        // => 0x9c172314a693b94853b49dc057cf1cb8e529f29ce0272f451eea8f5741aa9b58
        // A transaction result can be checked in a etherscan with a transaction hash which can be obtained here.
      });
  };

  return (
    <div>
      <h1>Hey, 13x54r Wallet User! 👋</h1>
      {!authenticated && (
        <>
          <input
            type="password"
            placeholder="Enter Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={() => handleAuthentication()}>Log In</button>
        </>
      )}
      {authenticated && (
        <>
          <p>Public Address: {wallet?.address}</p>
          <p>Balance: {balance} ether</p>
          <input
            type="text"
            placeholder="Enter Friend's Address..."
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Value..."
            value={receivingAmount}
            onChange={(e) => setReceivingAmount(e.target.value)}
          />
          <button onClick={() => handleTransactionSend()}>Send</button>
          <hr />
          <h3>Transaction History</h3>
          <p>⚠️ For now, history is in progress!</p>
        </>
      )}
    </div>
  );
}
