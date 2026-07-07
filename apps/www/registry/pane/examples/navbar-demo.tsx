import {
  CompassIcon,
  HeartIcon,
  HomeIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { Navbar } from "@/components/ui/navbar";

export default function NavbarDemo() {
  return (
    <Navbar
      defaultValue="Home"
      items={[
        { label: "Home", icon: <HomeIcon /> },
        { label: "Search", icon: <SearchIcon /> },
        { label: "Explore", icon: <CompassIcon /> },
        { label: "Favorites", icon: <HeartIcon /> },
        { label: "Profile", icon: <UserIcon /> },
      ]}
    />
  );
}
