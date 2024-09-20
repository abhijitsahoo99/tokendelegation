import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

export const Balance: FC = () => {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      setBalance(info!.lamports);
    });
  }, [connection, publicKey]);

  return (
    <div>
      {publicKey ? (
        <div className="border-2 border-[#ffe4b5] text-lg rounded-xl bg-white text-black px-2">
          balance : {balance / LAMPORTS_PER_SOL} SOL{" "}
        </div>
      ) : (
        <div className="border-2 border-[#ffe4b5] text-lg rounded-xl bg-white text-black  px-2">
          balance : connect wallet to check balance{" "}
        </div>
      )}
    </div>
  );
};
