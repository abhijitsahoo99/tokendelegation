"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Balance } from "./Balance";

function Appbar() {
  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const handleWalletAction = () => {
    if (publicKey) {
      disconnect();
    } else {
      setVisible(true);
    }
  };
  return (
    <div>
      <div className="flex justify-between m-6 mb-0 items-center">
        <Balance />
        <Button
          onClick={handleWalletAction}
          className="bg-white hover:bg-fuchsia-50 text-black"
        >
          {publicKey
            ? `${publicKey.toBase58().slice(0, 4)}...${publicKey
                .toBase58()
                .slice(-4)}`
            : "connect wallet"}
        </Button>
      </div>
    </div>
  );
}

export default Appbar;
