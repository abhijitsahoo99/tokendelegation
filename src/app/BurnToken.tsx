import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createBurnInstruction,
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
interface BurnTokenProps {
  mintAddress: string;
}
export default function BurnToken({ mintAddress }: BurnTokenProps) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBurnTokens = async () => {
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
        createBurnInstruction(
          tokenAccount,
          mintPublicKey,
          publicKey,
          BigInt(amount)
        )
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      setMessage(`Burned ${amount} tokens`);
    } catch (error: any) {
      setMessage(`Error burning tokens: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">burn tokens</CardTitle>
          <CardDescription>
            permanently remove tokens from circulator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount to burn"
                  className="mb-4"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleBurnTokens}
            disabled={isProcessing}
            className="bg-black text-white"
          >
            {" "}
            {isProcessing ? "processing..." : "burn tokens"}
          </Button>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
