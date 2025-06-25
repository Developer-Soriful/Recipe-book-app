import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { Link, NavLink } from "react-router";
import { FaAddressBook } from "react-icons/fa6";
import { GiAllSeeingEye } from "react-icons/gi";
import { MdMyLocation } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);
  // something
  // Toggle Theme Class
  // some change
  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDark]);

  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div>
      <header className="py-4 shadow-md transition-colors duration-300">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex gap-4 items-center">
            <div className="rounded-full h-10">
              <img
                src="/logo.png"
                alt="Website Logo"
                className=" mr-2 w-full h-full"
              />
            </div>
            <div>
              <span className="text-xl font-bold">My Recipe Book</span>
            </div>
          </div>
          {/* Nav Links */}

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 duration-200 ${
                    isActive
                      ? "text-green-500 font-semibold"
                      : "hover:text-green-500"
                  }`
                }
              >
                <BiHomeAlt />
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Go to Home"
                >
                  Home
                </span>
              </NavLink>

              <Tooltip
                className="z-10"
                id="my-tooltip"
                content="Hello world!"
              />

              <NavLink
                to="/allrecipes"
                className={({ isActive }) =>
                  `flex items-center gap-2 duration-200 ${
                    isActive
                      ? "text-green-500 font-semibold"
                      : "hover:text-green-500"
                  }`
                }
              >
                <GiAllSeeingEye />
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Go to All Recipes!"
                >
                  All Recipes
                </span>
              </NavLink>
              <NavLink
                to="/myrecipes"
                className={({ isActive }) =>
                  `flex items-center gap-2 duration-200 ${
                    isActive
                      ? "text-green-500 font-semibold"
                      : "hover:text-green-500"
                  }`
                }
              >
                <MdMyLocation />
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Go to My Recipes!"
                >
                  My Recipes
                </span>
              </NavLink>
              <NavLink
                to="/addrecipes"
                className={({ isActive }) =>
                  `flex items-center gap-2 duration-200 ${
                    isActive
                      ? "text-green-500 font-semibold"
                      : "hover:text-green-500"
                  }`
                }
              >
                <FaAddressBook />
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Go to All Recipes!"
                >
                  Add Recipes
                </span>
              </NavLink>
            </ul>
          </nav>

          {/* Auth + Theme Toggle */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/signup">
                  <button className="hover:text-blue-600 transition">
                    Sign up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="hover:text-blue-600 transition">
                    Login
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile">
                  <div className="relative group flex items-center rounded-full cursor-pointer border-2 border-gray-500">
                    <span
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={user.displayName}
                    >
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img src={user.photoURL} alt="profile" />
                        </div>
                      </div>
                    </span>
                  </div>
                </Link>

                {/* 🌗 Theme Toggle Button */}
                <button
                  onClick={handleThemeToggle}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  {isDark ? "☀️ Light" : "🌙 Dark"}
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
