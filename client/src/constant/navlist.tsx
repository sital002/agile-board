import {
  ChartNoAxesGantt,
  ChevronDown,
  Code,
  Dice6,
  Ellipsis,
  Eye,
  FolderDot,
  Fullscreen,
  // Goal,
  List,
  PersonStandingIcon,
  Plus,
  // NotebookText,
  // Plus,
  Settings,
  Share,
  Star,
  Zap,
} from "lucide-react";
import Dropdown from "../components/dropdown";

export const sidebarlist = [
  {
    name: "Project",
    icon: <FolderDot size={20} />,
    url: "project",
    children: [
      {
        name: "Create Project",
        icon: <Plus size={20} />,
        url: "/create",
      },
      {
        name: "View Project",
        icon: <Eye size={20} />,
        url: "/projects",
      },
    ],
  },
  {
    name: "Team",
    icon: <ChartNoAxesGantt size={20} />,
    url: "timeline",
    children: [
      {
        name: "Add Member",
        icon: <PersonStandingIcon size={20} />,
        url: "/team",
      },
    ],
  },
  {
    name: "Board",
    icon: <Dice6 size={20} />,
    url: `/project/${localStorage.getItem("currentProjectId")}`,
  },
  {
    name: "List",
    icon: <List size={20} />,
    url: "lists",
  },
  // {
  //   name: "Goals",
  //   icon: <Goal size={20} />,
  //   url: "goals",
  // },
  // {
  //   name: "Add View",
  //   icon: <Plus size={20} />,
  //   url: "view",
  // },
];

export const development = [
  {
    name: "Code",
    icon: <Code size={20} />,
  },
];

export const setting = [
  // {
  //   name: "Project pages",
  //   icon: <NotebookText size={20} />,
  // },
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
    name: <Dropdown />,
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
    icon: <Zap size={20} />,
  },
  {
    name: "",
    icon: <Star size={20} />,
  },
  {
    name: "",
    icon: <Share size={20} />,
  },
  {
    name: "",
    icon: <Fullscreen size={20} />,
  },
  {
    name: "",
    icon: <Ellipsis size={20} />,
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

export const detailsList = [
  {
    name: "Labels",
    value: "None",
  },
  {
    name: "Due Date",
    value: "None",
  },
  {
    name: "Time Tracking",
    value: "No Time Log",
  },
  {
    name: "Start Date",
    value: "None",
  },
  {
    name: "Category",
    value: "None",
  },
  {
    name: "Team",
    value: "None",
  },
];
