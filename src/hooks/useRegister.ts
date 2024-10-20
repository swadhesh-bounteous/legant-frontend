import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";
import { useRouter } from "next/navigation";

const registerFn = async (data: { email: string; password: string }) => {
  const response = await axios.post(
    "https://localhost:7058/api/Auth/register",
    data,
  );
  return response.data;
};

const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerFn,
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "Your account has been created. You can now log in.",
        variant: "default",
      });
      router.push("/signin");
    },
    onError: () => {
      toast({
        title: "Registration Error",
        description:
          "Something went wrong during registration. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export default useRegister;
