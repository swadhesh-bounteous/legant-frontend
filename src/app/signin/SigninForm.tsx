"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { signInSchema } from "@/types/SignInSchema";
import Typography from "@/components/common/Typography";

type SignInFormData = z.infer<typeof signInSchema>;

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8"
      >
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            id="email"
            {...register("email")}
            className="mt-1 w-full"
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <Typography variant="p" className="text-red-600 py-2 text-xs">{errors.email.message}</Typography>
          )}
        </div>
        <div className="relative">
          <Label htmlFor="password">Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password")}
            className="mt-1 w-full"
          />
          <Typography variant="span"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-[2.5rem] cursor-pointer text-gray-500"
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </Typography>
          {errors.password && (
            <Typography variant="p" className="text-red-600 py-2 text-xs">
              {errors.password.message}
            </Typography>
          )}
        </div>
        <Button type="submit" className="w-full bg-black text-white mt-4">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
