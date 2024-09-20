"use client";

import RetroGrid from "@/components/magicui/retro-grid";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className="font-denton text-2xl h-screen flex flex-col justify-center items-center px-6 relative">
      <div>
        <p className="mb-4">
          welcome to{" "}
          <span className="text-violet-500">tokendelegation.fun</span>, powered
          by solana blockchain.<br></br> with the power of the token22 program,
          create your own token with token metadata, mint, transfer, delegate
          and burn tokens all in one place{" "}
        </p>
        <Button
          className="border-2 border-[#ffe4b5] text-lg rounded-xl bg-white text-black hover:text-[#ffe4b5] "
          onClick={() => router.push("/token")}
        >
          get started
        </Button>
      </div>
      <RetroGrid />
    </div>
  );
}
