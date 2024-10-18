import React from "react";
import Typography from "./Typography";

interface IncrementDecrementButtonProps {
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const IncrementDecrementButton: React.FC<IncrementDecrementButtonProps> = ({
  quantity,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <div className="flex items-center mt-2 border-[1px] border-black px-4 py-2 rounded-md w-fit text-xs">
      <button onClick={handleDecrement}>−</button>
      <Typography variant="span" className="mx-4">
        {quantity}
      </Typography>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default IncrementDecrementButton;