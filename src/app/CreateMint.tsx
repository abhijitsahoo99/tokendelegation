import * as React from "react";

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

export default function CreateMint() {
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
                <Input id="address" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="bg-black text-white">create mint</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
