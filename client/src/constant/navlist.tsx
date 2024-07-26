import {
  ChartNoAxesGantt,
  ChevronDown,
  Code,
  Dice6,
  Ellipsis,
  Fullscreen,
  Goal,
  List,
  NotebookText,
  Plus,
  Settings,
  Share,
  Star,
  Zap,
} from "lucide-react";

export const sidebarlist = [
  {
    name: "Timeline",
    icon: <ChartNoAxesGantt size={20} />,
    url: "timeline",
  },
  {
    name: "Board",
    icon: <Dice6 size={20} />,
    url: "board",
  },
  {
    name: "List",
    icon: <List size={20} />,
    url: "list",
  },
  {
    name: "Goals",
    icon: <Goal size={20} />,
    url: "goals",
  },
  {
    name: "Add View",
    icon: <Plus size={20} />,
    url: "view",
  },
];

export const development = [
  {
    name: "Code",
    icon: <Code size={20} />,
  },
];

export const setting = [
  {
    name: "Project pages",
    icon: <NotebookText size={20} />,
  },
  {
    name: "Project settings",
    icon: <Settings size={20} />,
  },
];

export const navlist = [
  {
    name: "Your work",
    icon: <ChevronDown size={20} strokeWidth={0.6} />,
  },
  {
    name: "Projects",
    icon: <ChevronDown size={20} strokeWidth={0.6} />,
  },
  {
    name: "Filters",
    icon: <ChevronDown size={20} strokeWidth={0.6} />,
  },
  {
    name: "Dashboards",
    icon: <ChevronDown size={20} strokeWidth={0.6} />,
  },
  {
    name: "Teams",
    icon: <ChevronDown size={20} strokeWidth={0.6} />,
  },
  {
    name: "Apps",
    icon: <ChevronDown size={20} strokeWidth={0.6} />,
  },
];

export const headerIcon = [
  {
    name: "",
    icon: <Zap />,
  },
  {
    name: "",
    icon: <Star />,
  },
  {
    name: "",
    icon: <Share />,
  },
  {
    name: "",
    icon: <Fullscreen />,
  },
  {
    name: "",
    icon: <Ellipsis />,
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
