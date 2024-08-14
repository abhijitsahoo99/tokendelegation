"use client";
import React from "react";

import Appbar from "@/components/Appbar";
import { Balance } from "@/components/Balance";

function layout() {
  return (
    <div>
      <div className="flex justify-between px-4 items-center">
        <Balance />
        <Appbar />
      </div>
    </div>
  );
}

export default layout;
