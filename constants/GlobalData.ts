import { TaskType } from "./Types";

export type NavigationHeaderType = {
  title: 'Groups' | 'Individual' | 'Pending';
};

export const NavigationHeaders: Array<NavigationHeaderType> = [
  {
    title: "Groups",
  },
  {
    title: "Individual",
  },
  {
    title: "Pending",
  },
];

export const CardColors = ["#FEF752", "#C8A2E5", "#BCEF4C", "#FEA67D"];
