import { create } from "zustand";

export const userStore = create((set)=>({
    user:{
        fullName:"Swadhesh"
    },
    updateUser:(newUser:any)=> set((state:any)=>({
        user:{...state.user,...newUser}
    }))
}))