export const navItems: NavItem[] = [
  {
    description: "Home",
    path: "/",
    icon: "home",
  },

  {
    description: "My Posts",
    path: "/myposts",
    icon: "post",
  },
  {
    description: "Favoites",
    path: "/favorites",
    icon: "heart",
  },
];

interface NavItem {
  description: string;
  path: string;
  icon: Icon;
}

type Icon = "logo" | "home" | "post" | "heart" | "search";
