import { TypographyProps } from "@/types";

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
