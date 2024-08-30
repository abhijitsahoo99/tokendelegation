import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createApproveInstruction,
  createRevokeInstruction,
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
import { Input } from "@/components/ui/input";

interface DelegateTokenProps {
  mintAddress: string;
}

export default function DelegateToken({ mintAddress }: DelegateTokenProps) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [delegate, setDelegate] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelegateTokens = async () => {
    if (!publicKey) {
      setMessage("Wallet not connected");
      return;
    }

    setIsProcessing(true);
    try {
      const mintPublicKey = new PublicKey(mintAddress);
      const delegatePublicKey = new PublicKey(delegate);
      const tokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        publicKey
      );

      const transaction = new Transaction().add(
        createApproveInstruction(
          tokenAccount,
          delegatePublicKey,
          publicKey,
          BigInt(amount)
        )
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      setMessage(`Delegated ${amount} tokens to ${delegate}`);
    } catch (error: any) {
      setMessage(`Error delegating tokens: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRevokeDelegate = async () => {
    if (!publicKey) {
      setMessage("Wallet not connected");
      return;
    }

    setIsProcessing(true);
    try {
      const mintPublicKey = new PublicKey(mintAddress);
      const tokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        publicKey
      );

      const transaction = new Transaction().add(
        createRevokeInstruction(tokenAccount, publicKey)
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      setMessage("Delegation revoked successfully");
    } catch (error: any) {
      setMessage(`Error revoking delegation: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">delegate tokens</CardTitle>
          <CardDescription>
            delegate spending authority of your tokens to another account{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="text"
                  value={delegate}
                  onChange={(e) => setDelegate(e.target.value)}
                  placeholder="Delegate address"
                  className="mb-4"
                />
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount to delegate"
                  className="mb-4"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between">
            <Button
              onClick={handleDelegateTokens}
              disabled={isProcessing}
              className="bg-black text-white"
            >
              {" "}
              {isProcessing ? "processing..." : "delegate"}
            </Button>
            <Button
              onClick={handleRevokeDelegate}
              disabled={isProcessing}
              className="bg-black text-white"
            >
              {" "}
              {isProcessing ? "processing..." : "revoke"}
            </Button>
          </div>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
