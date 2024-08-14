"use client";
import React, { useEffect } from "react";
import CreateMint from "../CreateMint";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

function token() {
  return (
    <div>
      <CreateMint />
    </div>
  );
}

export default token;
