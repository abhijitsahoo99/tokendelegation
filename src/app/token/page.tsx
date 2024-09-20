"use client";

import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import React from "react";
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
import { Label } from "@/components/ui/label";
import Appbar from "@/components/Appbar";

function Token() {
  return (
    <div>
      <Appbar />
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
        )}
      />
      <div className="flex flex-col justify-center items-center font-denton h-screen">
        <div className="text-center">
          <h1 className="text-5xl">solana token creator</h1>
          <p className="text-xl mt-4">
            easily create your own solana SPL token in just few simple steps
            without coding
          </p>
        </div>
        <div className="mt-10">
          <Card className="w-[500px]">
            {/* <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader> */}
            <CardContent className="p-6">
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="bonk" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="symbol">Symbol</Label>
                    <Input id="name" placeholder="BONK" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="supply">Initial Supply</Label>
                    <Input id="name" placeholder="1000" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="name" placeholder="" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className="hover:bg-white hover:text-black"
              >
                Create
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Token;
