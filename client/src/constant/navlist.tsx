import {
  ChartNoAxesGantt,
  Dice6,
  FolderDot,
  List,
  Settings,
} from "lucide-react";

export const sidebarlist = [
  {
    name: "Project",
    icon: <FolderDot size={20} />,
    url: "projects",
  },
  {
    name: "Team",
    icon: <ChartNoAxesGantt size={20} />,
    url: "team",
  },
  {
    name: "Board",
    icon: <Dice6 size={20} />,
    url: `/board`,
  },
  {
    name: "List",
    icon: <List size={20} />,
    url: "lists",
  },
  {
    name: "Project settings",
    icon: <Settings size={20} />,
    url: "settings",
  },
];

export const selectList = [
  {
    name: "None",
    value: "none",
  },
  {
    name: "Assignee",
    value: "assignee",
  },
  {
    name: "Subtask",
    value: "subtask",
  },
];
