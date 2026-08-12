import React from "react";
import { Login } from "next-auth-mfelfelani72";

const Page = () => {
  // دیکشنری ترجمه
  const dict = {
    email: "Email",
    password: "Password",
    login: "Login",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    register: "Register",
    // ... بقیه کلیدهای مورد نیاز
  };

  return (
    <div className="flex flex-row bg-cyan-950 h-screen w-full items-center justify-center">
      <Login loginRoute="/api/auth/login" />
    </div>
  );
};

export default Page;
