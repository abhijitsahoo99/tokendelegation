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
        <div className="border-2 px-4 py-1 bg-white hover:bg-fuchsia-50 text-black">
          balance : {balance / LAMPORTS_PER_SOL} SOL{" "}
        </div>
      ) : (
        <div className="border-2 px-4 py-1 bg-white hover:bg-fuchsia-50 text-black">
          balance : connect wallet{" "}
        </div>
      )}
    </div>
  );
};
