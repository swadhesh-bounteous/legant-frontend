"use client";
import { Button } from "@/components/ui/button";
import { userStore } from "@/store/user";

export default function Home() {
  const user = userStore((state:any)=> state.user);
  const updateUser = userStore((state:any)=> state.updateUser);
  return (
    <div>
      <Button>{user.fullName}</Button>
      <input type="text" onChange={(e:any)=>updateUser({fullName: e.target.value})}></input>
    </div>
  );
}
