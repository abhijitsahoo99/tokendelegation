import {useState, useEffect} from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey} from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
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
interface TokenBalanceProps {
  mintAddress: string;
}
export default function TokenBalance({ mintAddress }: TokenBalanceProps) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [nextRefresh, setNextRefresh] = useState<number>(10);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) return;

      try {
        const mintPublicKey = new PublicKey(mintAddress);
        const tokenAccount = await getAssociatedTokenAddress(
          mintPublicKey,
          publicKey
        );
        const account = await getAccount(connection, tokenAccount);
        setBalance(Number(account.amount));
        setLastRefreshed(new Date());
        setNextRefresh(10);
      } catch (error: any) {
        console.error("Error fetching token balance:", error);
      }
    };

    fetchBalance();
    const intervalId = setInterval(fetchBalance, 10000); // Refresh every 10 seconds

    const countdownId = setInterval(() => {
      setNextRefresh((prev) => (prev > 0 ? prev - 1 : 10));
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(countdownId);
    };
  }, [connection, publicKey, mintAddress]);
  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">token balance</CardTitle>
          <CardDescription>view your current token balance</CardDescription>
        </CardHeader>
        <CardContent>
        {balance !== null ? (
          <>
            <p className="text-lg font-semibold">
              Your token balance: {balance}
            </p>
          </>
        ) : (
          <p>No Balance</p>
        )}
        <p className="text-sm text-gray-500 bottom-2 right-4 absolute">
          Next refresh in: {nextRefresh} seconds
        </p>
        </CardContent>
      </Card>
    </div>
  );
}
