"use client";
import React, { useEffect } from "react";
import CreateMint from "../CreateMint";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import MintToken from "../MintToken";
import CreateTokenAccount from "../CreateTokenAccount";
import TokenBalance from "../TokenBalance";
import TransferToken from "../TransferToken";
import DelegateToken from "../DelegateToken";
import BurnToken from "../BurnToken";

function token() {
  return (
    <div className="container mx-auto px-4 py-6 gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3">
        <CreateMint />
        <CreateTokenAccount />
        <MintToken />
        <TokenBalance />
        <TransferToken />
        <DelegateToken />
        <BurnToken />
      </div>
    </div>
  );
}

export default token;
