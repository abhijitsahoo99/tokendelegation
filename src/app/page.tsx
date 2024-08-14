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

  const [countdown, setCountdown] = useState(0);

  const handleWalletAction = () => {
    if (publicKey) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (publicKey) {
      setCountdown(2); // Set the countdown time in seconds
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [publicKey]);

  useEffect(() => {
    if (countdown === 0 && publicKey) {
      router.push("/token");
    }
  }, [countdown, publicKey, router]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen text-center gap-2">
        <p className="text-2xl">tokendelegation.fun</p>
        <p>create, mint, transfer, delegate & burn token all in one place.</p>
        {publicKey && countdown > 0 ? (
          <p>Redirecting you in {countdown} seconds...</p>
        ) : null}
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
