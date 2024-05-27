import {
  BellIcon,
  LogOutIcon,
  Package2Icon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import pic from "@/Images/profile.jpg";
import DropdownMenu from "../DropDown/DropDown";
import { getServerSession } from "next-auth";
import { options } from "@/api/auth/[...nextauth]/options";

async function Nav() {
  const session = await getServerSession(options);

  return (
    <header className="flex h-20 ml-5 items-center gap-4 border-b bg-blue-950  px-6 rounded-3xl mt-[1%] mx-[1%] ">
      <Link className="lg:hidden" href="#">
        <Package2Icon className="w-6 h-6" />
        <span className="sr-only">Home</span>
      </Link>

      <nav className="hidden md:flex md:ml-auto md:items-center md:gap-5 lg:gap-4">
        <Link className="font-semibold text-white" href="#">
          Employees
        </Link>
        <Link className="text-orange-500" href="#">
          Recruitement
        </Link>
        <Link className="text-orange-500" href="#">
          Performance
        </Link>
        <Link className="text-orange-500" href="#">
          Rewards
        </Link>
      </nav>
      <div className="flex ml-auto text-white items-center gap-4">
        {session ? (
          <DropdownMenu />
        ) : (
          <div className="flex gap-4">
            <Link href="/api/auth/signin">Login</Link>
            <Link href="/api/auth/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Nav;
