import React from "react";

export default function navbar({ address, isConnected, connectWallet }) {
  return (
    <div>
      Navbar -{" "}
      {isConnected ? (
        <span>{address}</span>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
