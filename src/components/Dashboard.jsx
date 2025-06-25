import { NavLink, Outlet } from "react-router";
import { GrOverview } from "react-icons/gr";
import { FaAllergies } from "react-icons/fa";
import { FaMagnifyingGlassDollar, FaPlus } from "react-icons/fa6";

const Dashboard = () => {
  return (
    <div className="my-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 *:border *:border-gray-200 *:p-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 duration-200 ${
                isActive
                  ? "text-pink-500 font-semibold"
                  : "hover:text-green-500"
              }`
            }
          >
            <GrOverview />
            <span>Overview</span>
          </NavLink>
          <NavLink
            to="/dashboard/allItems"
            className={({ isActive }) =>
              `flex items-center gap-2 duration-200 ${
                isActive
                  ? "text-green-500 font-semibold"
                  : "hover:text-green-500"
              }`
            }
          >
            <FaAllergies />
            <span>All Recipes</span>
          </NavLink>
          <NavLink
            to="/dashboard/addItems"
            className={({ isActive }) =>
              `flex items-center gap-2 duration-200 ${
                isActive
                  ? "text-green-500 font-semibold"
                  : "hover:text-green-500"
              }`
            }
          >
            <FaPlus />
            <span>Add Recipes</span>
          </NavLink>
          <NavLink
            to="/dashboard/myItems"
            className={({ isActive }) =>
              `flex items-center gap-2 duration-200 ${
                isActive
                  ? "text-green-500 font-semibold"
                  : "hover:text-green-500"
              }`
            }
          >
            <FaMagnifyingGlassDollar />
            <span>My Recipes</span>
          </NavLink>
        </div>
        <div className="text-sm text-gray-500">
          <span>Dashboards</span> <span className="mx-1">&gt;</span>{" "}
          <span className="font-medium text-gray-700">Overview</span>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
