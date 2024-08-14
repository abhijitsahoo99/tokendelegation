"use client";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  useEffect(() => {
    if (publicKey) {
      router.push("/token");
    }
  }, [publicKey, router]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen text-center gap-2">
        <p className="text-2xl">tokendelegation.fun</p>
        <p>create, mint, transfer, delegate & burn token all in one place.</p>
      </div>
    </div>
  );
}
