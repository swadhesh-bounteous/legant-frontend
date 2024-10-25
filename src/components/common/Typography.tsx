import { ReactNode } from "react";

interface TypographyProps {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const Typography = ({
  variant,
  children,
  className = "",
  onClick,
}: TypographyProps) => {
  const Component = variant;
  return (
    <Component className={className} onClick={onClick}>
      {children}
    </Component>
  );
};

export default Typography;
