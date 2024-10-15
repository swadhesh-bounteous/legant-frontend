"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import user_reg from "../../../public/assets/images/user_reg.png";

const SignUpForm = dynamic(() => import("./SignUpForm"));

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="max-h-screen flex justify-center bg-gray-50 p-4">
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
        <div className="w-full h-1/3 md:h-full md:w-1/2 bg-gray-100">
          <Image
            src={user_reg}
            alt="Signup"
            className="w-full h-full"
            style={{ objectFit: "contain" }}
            priority 
            placeholder="blur" 
            sizes="(max-width: 768px) 100vw, 50vw" 
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col p-6 justify-center md:pl-32">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">Sign up</h2>
          <p className="text-sm mb-4">
            Already have an account?{" "}
            <Link href="/signin" className="text-green-500 font-medium">
              Sign in
            </Link>
          </p>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
