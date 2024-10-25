import { usePathname } from "next/navigation";

const useShowNavbarFooter = () => {
  const pathname = usePathname();
  const hiddenRoutes = ["/signup", "/signin"]; 
  return !hiddenRoutes.includes(pathname); 
};

export default useShowNavbarFooter;
