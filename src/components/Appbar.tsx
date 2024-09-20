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
      <div className="flex justify-between m-6 mb-0 items-center font-denton">
        <Balance />
        <Button
          onClick={handleWalletAction}
          className="border-2 border-[#ffe4b5] text-lg rounded-xl hover:bg-white hover:text-black text-[#ffe4b5]"
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
