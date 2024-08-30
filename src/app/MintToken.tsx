import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createMintToInstruction,
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
interface MintTokensProps {
  mintAddress: string;
}
export default function MintToken({ mintAddress }: MintTokensProps) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMintTokens = async () => {
    if (!publicKey) {
      setMessage("Wallet not connected");
      setIsError(true);
      return;
    }

    setIsProcessing(true);
    setIsError(false);
    try {
      const mintPublicKey = new PublicKey(mintAddress);
      const tokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        publicKey
      );

      const transaction = new Transaction().add(
        createMintToInstruction(
          mintPublicKey,
          tokenAccount,
          publicKey,
          BigInt(amount)
        )
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      setMessage(`Minted ${amount} tokens to ${tokenAccount.toBase58()}`);
    } catch (error: any) {
      setMessage(`Error minting tokens: ${error.message}`);
      setIsError(true);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">mint tokens</CardTitle>
          <CardDescription>
            create new token supply to add it to your account
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
                  placeholder="Amount to mint"
                  className="mb-4"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-black text-white"
            onClick={handleMintTokens}
            disabled={isProcessing}
          >
            {" "}
            {isProcessing ? "processing..." : "mint tokens"}
          </Button>
          {message && (
            <p className={`mt-2 text-xs ${isError ? "text-red-500" : ""}`}>
              {message}
            </p>
          )}
          {isError && (
            <p className="text-red-500 text-sm mt-2">
              Make sure you&apos;ve created a token account.
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
