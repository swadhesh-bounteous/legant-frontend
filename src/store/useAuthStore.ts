import { create } from "zustand";

interface AuthState {
  jwtToken: string | null; 
  setJwtToken: (token: string) => void; 
  clearJwtToken: () => void; 
}

const useAuthStore = create<AuthState>((set) => ({
  jwtToken: null,
  setJwtToken: (token: string) => set({ jwtToken: token }),
  clearJwtToken: () => set({ jwtToken: null }),
}));

export default useAuthStore;
