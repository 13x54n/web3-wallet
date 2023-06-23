import React from "react";
import { ethers } from "ethers";

export var wallet = null;

const setWallet = (_wallet) => {
  wallet = _wallet;
  localStorage.setItem("13x54r_keyPair", JSON.stringify(_wallet));
};

export default function WelcomePage() {
  const [walletStatus, setWalletStatus] = React.useState("");

  // @dev form input variables
  const [privateKey, setPrivateKey] = React.useState("");
  const [mnemonic, setMnemonic] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordStatus, setPasswordStatus] = React.useState(true);

  const handleWalletStatus = (_status) => {
    setWalletStatus(_status);
  };

  const handleImportWallet = (_type) => {
    if (_type === "privateKey") {
      const _wallet = new ethers.Wallet(privateKey);
      setWallet(_wallet);
    } else if (_type === "mnemonic") {
      const _wallet = ethers.HDNodeWallet.fromPhrase(mnemonic);

      // @dev we can import users many accounts
      // const secondAccount = _wallet.derivePath(`m/44'/60'/0'/0/1`);
      // const thirdAccount = _wallet.derivePath(`m/44'/60'/0'/0/2`);

      setWallet(_wallet);
    }
  };

  const handleCreateWallet = () => {
    const _wallet = ethers.Wallet.createRandom();

    setWallet(_wallet);
    setWalletStatus("password");
  };

  const handlePassword = () => {
    if (password !== confirmPassword) {
      return setPasswordStatus(false);
    } else {
      localStorage.setItem("13x54r_walletPassword", password);
      window.location.reload()
    }
  };

  return (
    <div>
      <h1>Welcome - Wallet by 13x54r</h1>
      {walletStatus === "" && (
        <>
          <button onClick={() => handleWalletStatus("import")}>
            Import Wallet
          </button>
          <button onClick={() => handleCreateWallet()}>
            Create New Wallet
          </button>
        </>
      )}

      {walletStatus === "import" && (
        <>
          <input
            type="text"
            placeholder="Enter Private Key..."
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <button onClick={() => handleImportWallet("privateKey")}>
            Import
          </button>
          <br />
          <p>or</p>
          <input
            type="text"
            placeholder="Enter Mnemonic Phrase..."
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
          />
          <button onClick={() => handleImportWallet("mnemonic")}>Import</button>

          <button onClick={() => handleWalletStatus("")}>Back</button>
        </>
      )}

      {walletStatus === "password" && (
        <>
          {!passwordStatus && <p>Warning: Password didn't matched!</p>}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={() => handlePassword()}>Next</button>
        </>
      )}
    </div>
  );
}
