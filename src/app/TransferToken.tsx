import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  createAssociatedTokenAccountInstruction,
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
interface TransferTokensProps {
  mintAddress: string;
}
export default function TransferToken({ mintAddress }: TransferTokensProps) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTransferTokens = async () => {
    if (!publicKey) {
      setMessage("Wallet not connected");
      return;
    }

    setIsProcessing(true);
    try {
      const mintPublicKey = new PublicKey(mintAddress);
      const recipientPublicKey = new PublicKey(recipient);

      const sourceAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        publicKey
      );
      const destinationAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        recipientPublicKey
      );

      const transaction = new Transaction();

      const recipientTokenAccountInfo = await connection.getAccountInfo(
        destinationAccount
      );

      if (!recipientTokenAccountInfo) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            destinationAccount,
            recipientPublicKey,
            mintPublicKey
          )
        );
      }

      transaction.add(
        createTransferInstruction(
          sourceAccount,
          destinationAccount,
          publicKey,
          BigInt(amount)
        )
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      setMessage(`Transferred ${amount} tokens to ${recipient}`);
    } catch (error: any) {
      setMessage(`Error transferring tokens: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">transfer tokens</CardTitle>
          <CardDescription>send tokens to another account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Recipient address"
                  className="mb-4"
                />
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount to transfer"
                  className="mb-4"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleTransferTokens}
            disabled={isProcessing}
            className="bg-black text-white"
          >
            {" "}
            {isProcessing ? "processing..." : "transfer tokens"}
          </Button>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
