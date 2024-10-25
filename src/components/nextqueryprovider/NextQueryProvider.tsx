"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Navbar, Footer } from "@/components";
import { Toaster } from "../ui/toaster";
import useShowNavbarFooter from "@/hooks/useShowNavbarFooter";

const NextQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {useShowNavbarFooter() && <Navbar />}
      {children}
      {useShowNavbarFooter() && <Footer />}
      <Toaster />
    </QueryClientProvider>
  );
};

export default NextQueryProvider;
