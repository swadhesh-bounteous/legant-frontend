import React from "react";
import Typography from "./Typography";
import { IncrementDecrementButtonProps } from "@/types";

const IncrementDecrementButton: React.FC<IncrementDecrementButtonProps> = ({
  quantity,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <div className="flex items-center border-2 border-gray-300 px-4 py-2 rounded-md w-fit text-xs">
      <button onClick={handleDecrement}>−</button>
      <Typography variant="span" className="mx-4">
        {quantity}
      </Typography>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default IncrementDecrementButton;
