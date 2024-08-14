"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";

function Appbar() {
  const router = useRouter();
  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const handleWalletAction = () => {
    if (publicKey) {
      disconnect();
      router.push("/");
    } else {
      setVisible(true);
    }
  };
  return (
    <div>
      <div>
        <Button
          onClick={handleWalletAction}
          className="bg-white hover:bg-fuchsia-50 text-blakc"
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
