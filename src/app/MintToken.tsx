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
interface MintTokensProps {
  mintAddress: string;
}
export default function MintToken({ mintAddress }: MintTokensProps) {
  const [message, setMessage] = React.useState<string>("");
  const [isProcessing, setIsProcessing] = React.useState(false);
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
                  //   value={decimals}
                  //   onChange={(e) => setDecimals(e.target.value)}
                  placeholder="Decimals"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="bg-black text-white">
            {" "}
            {isProcessing ? "processing..." : "mint tokens"}
          </Button>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
