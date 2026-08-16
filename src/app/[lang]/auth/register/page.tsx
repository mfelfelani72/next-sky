import React from "react";
import { Register } from "next-auth-mfelfelani72";

const Page = () => {
 
  return (
    <div className="flex flex-row bg-cyan-950 h-screen w-full items-center justify-center">
      <Register
        layout="twoColumn"
        theme="default"
        className="w-full max-w-none px-0"
      />
    </div>
  );
};

export default Page;
