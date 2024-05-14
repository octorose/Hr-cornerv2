"use client";
import {
  AwardIcon,
  BellIcon,
  CircleDollarSign,
  HomeIcon,
  Package2Icon,
  ShoppingCartIcon,
  TrendingUpIcon,
  UsersIcon,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/Images/LeoniLogo.png";

// Postion Request icon an inline PR icon
const PositioRequestIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

const Sidebar = ({ active }: { active: string }) => {
  const [ActiveButton, setActiveButton] = React.useState(active);
  const route = [
    { name: "Home", path: "/", icon: <HomeIcon className="h-4 w-4" /> },
    {
      name: "Candidates",
      path: "/Employee",
      icon: <UsersIcon className="h-4 w-4" />,
    },
    {
      name: "Departements",
      path: "/Departements",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      name: "Positions Requests",
      path: "/Performance",
      icon: <PositioRequestIcon />,
    },
  ];

  return (
    <div className="">
      <div className="hidden border-r  bg-gray-100/40 lg:block dark:bg-gray-800/40 h-full">
        <div className="flex h-full max-h-screen w-[280px]  flex-col gap-2 fixed ">
          <div className="flex h-20 items-center  border-b px-6">
            <Link className="flex items-center  font-semibold" href="#">
              <Image src={logo} width={0} height={20} alt="logo" />
              <span className="ml-1">'s Hr Corner</span>
            </Link>
            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {route.map((item, index) => (
                <Link
                  href={item.path}
                  // href="#"
                  key={index}
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    ActiveButton === item.name
                      ? "bg-gray-200 dark:bg-gray-700"
                      : ""
                  }`}
                  onClick={() => setActiveButton(item.name)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
