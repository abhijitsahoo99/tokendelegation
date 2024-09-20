"use client";

import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Appbar from "@/components/Appbar";

function Token() {
  return (
    <div className="min-h-screen flex flex-col">
      <Appbar />
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] absolute inset-0 h-full"
        )}
      />
      <div className="flex-grow flex flex-col justify-center items-center font-denton p-2 sm:p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl">solana token creator</h1>
          <p className="text-base sm:text-lg md:text-xl mt-4 max-w-md mx-auto">
            easily create your own solana SPL token in just few simple steps
            without coding
          </p>
        </div>
        <Card className="w-full max-w-[300px] sm:max-w-[500px]">
          <CardContent className="p-4 sm:p-6">
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1 sm:space-y-1.5">
                  <Label htmlFor="name" className="text-sm sm:text-base">Name</Label>
                  <Input id="name" placeholder="bonk" />
                </div>
                <div className="flex flex-col space-y-1 sm:space-y-1.5">
                  <Label htmlFor="symbol" className="text-sm sm:text-base">Symbol</Label>
                  <Input id="symbol" placeholder="BONK" />
                </div>
                <div className="flex flex-col space-y-1 sm:space-y-1.5">
                  <Label htmlFor="supply" className="text-sm sm:text-base">Initial Supply</Label>
                  <Input id="supply" placeholder="1000" />
                </div>
                <div className="flex flex-col space-y-1 sm:space-y-1.5">
                  <Label htmlFor="image" className="text-sm sm:text-base">Image URL</Label>
                  <Input id="image" placeholder="" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between p-2 sm:p-4">
            <Button
              variant="outline"
              className="w-full hover:bg-white hover:text-black text-sm sm:text-base"
            >
              Create
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Token;
