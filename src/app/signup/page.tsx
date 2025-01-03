"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import user_reg from "public/assets/images/user_reg.png";
import dynamic from "next/dynamic";
import Typography from "@/components/common/Typography";

const SignUpForm = dynamic(() => import("./SignUpForm"));

const SignUpPage = () => {
  return (
    <div className="max-h-screen flex justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
        <div className="w-full h-1/3 md:h-full md:w-1/2 bg-gray-100">
          <Image
            src={user_reg}
            aria-label="Sign up image"
            alt="Signup"
            className="w-full h-full md:p-24 object-contain"
            priority
          />
        </div>
        <div className="w-full md:w-1/2 h-2/3 md:h-full flex flex-col p-6 justify-center md:px-32">
          <Typography
            variant="h2"
            className="text-3xl md:text-4xl font-medium mb-6"
          >
            Sign Up
          </Typography>
          <Typography variant="p" className="text-sm mb-4">
            Already have an account?{" "}
            <Link href="/signin" className="ml-1 text-orange-500 font-medium">
              Sign in
            </Link>
          </Typography>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
