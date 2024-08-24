import * as React from "react";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CreateTokenAccountProps {
  mintAddress: string;
}

export default function CreateTokenAccount({
  mintAddress,
}: CreateTokenAccountProps) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [message, setMessage] = React.useState<string>("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleCreateTokenAccount = async () => {
    if (!publicKey) {
      setMessage("Wallet not connected");
      return;
    }

    setIsProcessing(true);
    try {
      const mintPublicKey = new PublicKey(mintAddress);
      const associatedTokenAddress = await getAssociatedTokenAddress(
        mintPublicKey,
        publicKey
      );

      const transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          publicKey,
          associatedTokenAddress,
          publicKey,
          mintPublicKey
        )
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      setMessage(`Token account created: ${associatedTokenAddress.toBase58()}`);
    } catch (error: any) {
      setMessage(`Error creating token account: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">create token account</CardTitle>
          <CardDescription>
            create an account to hold your tokens
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            className="bg-black text-white"
            onClick={handleCreateTokenAccount}
          >
            {" "}
            {isProcessing ? "Processing..." : "Create Mint"}
          </Button>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
