import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import user_reg from "../../../public/assets/images/user_reg.png";
import dynamic from 'next/dynamic';
import Typography from '@/components/common/Typography';

const SigninForm = dynamic(()=> import('./SigninForm'))

const page = () => {
  return (
    <div className="max-h-screen flex justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
        <div className="w-full h-1/3 md:h-full md:w-1/2 bg-gray-100">
          <Image
            src={user_reg}
            alt="Signup"
            aria-label="Sign in image"
            className="w-full h-full"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <div className="w-full md:w-1/2 h-2/3 md:h-full flex flex-col p-6 justify-center md:px-32">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">Sign In</h2>
          <Typography variant='p' className="text-sm mb-6">
            Don't have an account yet?{" "}
            <Link href="/signup" className="text-green-500 font-medium">
              Sign Up
            </Link>
          </Typography>
          <SigninForm />
        </div>
      </div>
    </div>
  )
}

export default page