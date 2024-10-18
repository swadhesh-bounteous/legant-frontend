import { LucideIcon } from "lucide-react";
export type ViewToggleButtonType = {
  viewType: string;
  currentViewType: string;
  Icon: LucideIcon;
  onClick: () => void;
};