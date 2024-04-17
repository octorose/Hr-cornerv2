import React from "react";
import Link from "next/link";
import { Button } from "./button";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>Only test again</div>
        <div className="flex gap-10">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/CreateUser" className="hover:underline">
            Create User
          </Link>
          <Link href="/ClientMember" className="hover:underline">
            Client Member
          </Link>
          <Link href="/Member" className="hover:underline">
            Member
          </Link>
          <Link href="/Denied" className="hover:underline">
            Denied
          </Link>
        </div>
        <div>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <div className="flex gap-4">
              <Link href="/api/auth/signin">Login</Link>
              <Link href="/api/auth/signup">Sign Up</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
