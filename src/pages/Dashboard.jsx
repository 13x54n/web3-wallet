import React from "react";
import { wallet } from "./WelcomePage";
import { ethers } from "ethers";

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
          <input type="text" placeholder="Enter Friend's Address..."/><input type="text" placeholder="Enter Value..."/>
          <button>Send</button>
          <hr />
          <h3>Transaction History</h3>
          <p>⚠️ For now, history is in progress!</p>
        </>
      )}
    </div>
  );
}
