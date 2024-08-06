import { Code, Home, Settings, Users, User } from "lucide-react";

export const sidebarOptions = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/dashboard/projects", icon: Code },
  { name: "Teams", href: "/dashboard/teams", icon: Users },
  { name: "Users", href: "/dashboard/users", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];
