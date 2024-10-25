import { LucideIcon } from "lucide-react";
export interface ViewToggleButtonType {
  viewType: string;
  currentViewType: string;
  Icon: LucideIcon;
  onClick: () => void;
};
