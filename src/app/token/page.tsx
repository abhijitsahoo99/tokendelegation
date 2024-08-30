"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import CreateMint from "../CreateMint";
import MintToken from "../MintToken";
import CreateTokenAccount from "../CreateTokenAccount";
import TokenBalance from "../TokenBalance";
import TransferToken from "../TransferToken";
import DelegateToken from "../DelegateToken";
import BurnToken from "../BurnToken";

function Token() {
  const { publicKey } = useWallet();
  const [mintAddress, setMintAddress] = useState<string | null>(null);
  const handleMintCreated = (address: string) => {
    setMintAddress(address);
  };
  return (
    <div className="container mx-auto px-4 py-6 gap-4">
      {publicKey &&
        (!mintAddress ? (
          <div className="flex justify-center max-w-96 mt-8 items-center">
            <CreateMint onMint={handleMintCreated} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3">
            <CreateTokenAccount mintAddress={mintAddress} />
            <MintToken mintAddress={mintAddress} />
            <TokenBalance mintAddress={mintAddress} />
            <TransferToken mintAddress={mintAddress} />
            <DelegateToken mintAddress={mintAddress} />
            <BurnToken mintAddress={mintAddress} />
          </div>
        ))}
    </div>
  );
}

export default Token;
