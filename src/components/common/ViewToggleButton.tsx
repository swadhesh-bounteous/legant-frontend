import React from "react";
import { ViewToggleButtonType } from "@/types/ViewToggleButtonType";

const ViewToggleButton = ({
  viewType,
  currentViewType,
  Icon,
  onClick,
}: ViewToggleButtonType) => {
  return (
    <button
      className={`p-2 rounded ${
        currentViewType === viewType ? "bg-gray-200" : ""
      }`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

export default ViewToggleButton;
