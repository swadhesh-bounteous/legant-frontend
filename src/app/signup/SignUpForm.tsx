"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import { signUpSchema } from "@/types/SignUpSchema";

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input
            type="text"
            id="name"
            {...register("name")}
            className="mt-1 w-full"
          />
          {errors.name && <p className="text-red-600 py-2 text-xs">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            id="email"
            {...register("email")}
            className="mt-1 w-full"
            placeholder="example@gmail.com"
          />
          {errors.email && <p className="text-red-600 py-2 text-xs">{errors.email.message}</p>}
        </div>

        <div className="relative">
          <Label htmlFor="password">Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password")}
            className="mt-1 w-full"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-[2.5rem] cursor-pointer text-gray-500"
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </span>
          {errors.password && <p className="text-red-600 py-2 text-xs">{errors.password.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="agreement" />
          <Label htmlFor="agreement" className="text-sm">
            I agree with{" "}
            <Link href="#" className="text-gray-700 underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-gray-700 underline">
              Terms of Use
            </Link>
          </Label>
        </div>

        <Button type="submit" className="w-full bg-black text-white mt-4">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
