import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";
import { useRouter } from "next/navigation";

const login = async (data: { email: string; password: string }) => {
  const response = await axios.post(
    "https://localhost:7058/api/Auth/login",
    data,
  );
  return response.data;
};

const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast({
        title: "Login Successful",
        description: "You can now start shopping",
        variant: "default",
      });

      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
      }
      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      }
      router.push("/shop");
    },
    onError: () => {
      toast({
        title: "Login Error",
        description: "Something went wrong during Login. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export default useLogin;
