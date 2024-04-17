"use client";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa"; // Import hamburger icon
import pic from "@/Images/profile.jpg";
import Image from "next/image";
import Link from "next/link";


function BurgerMenu() {
  
  const [isOpen, setIsOpen] = useState(false);

  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (action:any, event:any) => {
    // Prevent the default behavior (page refresh)
    event.preventDefault();

    // Handle item click action here
    console.log(action);
    // Close the menu after action
    setIsOpen(false);
  };


  return (
    <div className="">
     
        <button
          onClick={toggleMenu}
          className="rounded-full p-2 focus:outline-none border "
        >
          <FaBars /> {/* Hamburger icon */}
          <span className="sr-only">Toggle user menu</span>
        </button>

 

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
          <div className="py-1">
            <button
              onClick={(e) => handleItemClick("profile", e)}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              <span className="mr-2">Profile</span>
            </button>
            <button
              onClick={(e) => handleItemClick("settings", e)}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              <span className="mr-2">Settings</span>
            </button>
            <a
              href="/api/auth/signout?callbackUrl=/"
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              <span className="mr-2">Logout</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default BurgerMenu;
