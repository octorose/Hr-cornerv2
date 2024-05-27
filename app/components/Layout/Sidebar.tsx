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
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/Images/LeoniLogo.png";
import { useRouter } from "next/router";

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
  // const router = useRouter();
  const [activeButton, setActiveButton] = React.useState(active);

  useEffect(() => {
    // Check if there's a stored active button in localStorage
    const storedActiveButton = localStorage.getItem("activeButton");
    if (storedActiveButton) {
      setActiveButton(storedActiveButton);
    }
  }, []);

  const handleSetActiveButton = (name: string) => {
    setActiveButton(name);
    // Store the active button in localStorage
    localStorage.setItem("activeButton", name);
  };
  const route = [
    { name: "Home", path: "/", icon: <HomeIcon className="h-4 w-4" /> },
    {
      name: "Candidates",
      path: "/Candidates",
      icon: <UsersIcon className="h-4 w-4" />,
    },
    {
      name: "Departements",
      path: "/Departements",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      name: "Positions Requests",
      path: "/Pr",
      icon: <PositioRequestIcon />,
    },
  ];

  return (
    <div className="my-[6%] ml-[5%] hidden lg:inline-block">
        <div className="flex bg-blue-950 rounded-3xl max-h-screen h-[96%] w-[280px]  flex-col gap-2 fixed ">
          <div className="flex justify-center h-20 items-center  border-b px-6">
            <Link className="flex  items-center  font-semibold" href="#">
              <div className="flex  ml-auto items-center gap-1">
                <div className="flex ml-auto font-extrabold font-outline-2 text-blue-950 text-3xl items-center gap-4">
                  LEONI
                </div>
                <div className="flex ml-auto items-center bg-orange-500 text-white rounded-lg px-1 py-2 gap-4">
                  ' S CORNER
                </div>
              </div>
            </Link>
          </div>
          <div className="flex-1  py-2">
            <nav className="grid  px-5 text-sm text-white gap-2 font-medium">
              {route.map((item, index) => (
                <Link
                  href={item.path}
                  // href="#"
                  key={index}
                  className={`flex items-center transition-all gap-2 p-3 rounded-lg hover:bg-gray-100 hover:bg-opacity-20 ${
                    activeButton === item.name
                      ? "bg-gray-200 dark:bg-gray-200  text-lg text-orange-500 hover:bg-gray-200 hover:bg-opacity-100"
                      : ""
                  }`}
                  onClick={() => handleSetActiveButton(item.name)}
                >
                  {item.icon}
                  <span
                    className={`${
                      activeButton === item.name ? "translate-x-3" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

    </div>
  );
};

export default Sidebar;
