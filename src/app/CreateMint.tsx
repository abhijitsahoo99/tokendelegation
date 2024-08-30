import * as React from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  TOKEN_PROGRAM_ID,
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

interface mintProps {
  onMint: (mintAddress: string) => void;
}

export default function CreateMint({ onMint }: mintProps) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [decimals, setDecimals] = React.useState<string>("9");
  const [message, setMessage] = React.useState<string>("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleCreateMint = async () => {
    if (!publicKey) {
      setMessage("Wallet not connected");
      return;
    }

    setIsProcessing(true);
    try {
      const mint = Keypair.generate();
      const lamports = await getMinimumBalanceForRentExemptMint(connection);

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mint.publicKey,
          space: 82,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mint.publicKey,
          Number(decimals),
          publicKey,
          publicKey,
          TOKEN_PROGRAM_ID
        )
      );

      const signature = await sendTransaction(transaction, connection, {
        signers: [mint],
      });
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');

      const mintAddress = mint.publicKey.toBase58();
      setMessage(`Mint created successfully : ${mintAddress}`);
      onMint(mintAddress);
    } catch (error: any) {
      setMessage(`Error creating mint : ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">create token mint</CardTitle>
          <CardDescription>
            create a new token mint to issue your own tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="number"
                  value={decimals}
                  onChange={(e) => setDecimals(e.target.value)}
                  placeholder="Decimals"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="bg-black text-white" onClick={handleCreateMint}>
            {" "}
            {isProcessing ? "processing..." : "create mint"}
          </Button>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
