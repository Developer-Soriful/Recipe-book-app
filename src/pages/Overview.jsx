import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { Link, useLoaderData } from "react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts";

const Overview = () => {
  const { user } = useContext(AuthContext);
  const [myData, setMyData] = useState([]);
  const loaderData = useLoaderData();

  useEffect(() => {
    if (user.email) {
      fetch(`https://server-side-eight-pearl.vercel.app/users/email/${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyData(data));
    }
  }, [user.email]);

  // Create chart-friendly dataset
  const chartData = loaderData.map((item, index) => ({
    id: index + 1,
    recipe: item.title || `Recipe ${index + 1}`,
    preparation_time: item.preparation_time || 0,
    likeCount: item.likeCount || 0,
  }));

  return (
    <div>
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-10">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recipe Overview</h2>
            <div className="space-x-2">
              <button className="bg-gray-100 px-3 py-1 rounded text-sm hover:bg-gray-200">
                ALL
              </button>
              <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm hover:bg-purple-200">
                1M
              </button>
              <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm hover:bg-purple-200">
                6M
              </button>
              <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm hover:bg-purple-200">
                1Y
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {loaderData.length}
              </p>
              <p className="text-sm text-gray-500">Total Recipes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {loaderData.filter((item) => item.likeCount > 10).length}
              </p>
              <p className="text-sm text-gray-500">Popular Items</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {loaderData.reduce(
                  (sum, item) => sum + (item.preparation_time || 0),
                  0
                )}
                m
              </p>
              <p className="text-sm text-gray-500">Total Prep Time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {loaderData.reduce(
                  (sum, item) => sum + (item.likeCount || 0),
                  0
                )}
              </p>
              <p className="text-sm text-gray-500">Total Likes</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="recipe"
                angle={-20}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="preparation_time" fill="#4F46E5" name="Prep Time" />
              <Bar dataKey="likeCount" fill="#10B981" name="Likes" />
              <Line
                type="monotone"
                dataKey="likeCount"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Likes Trend"
              />
              <Area
                type="monotone"
                dataKey="likeCount"
                stroke="none"
                fill="#FFFBEB"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-5">
              <div className="w-16 h-16 rounded-full flex justify-center items-center text-3xl bg-light-blue-bg text-dark-blue-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <div className="flex-grow">
                <div className="text-sm text-gray-500 uppercase mb-1">
                  TOTAL RECIPES
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {loaderData?.length || 0}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500">
                  <span>Recipes of all time</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-5">
              <div className="w-16 h-16 rounded-full flex justify-center items-center text-3xl bg-light-yellow-bg text-dark-yellow-icon">
                <i className="fas fa-award"></i>
              </div>
              <div className="flex-grow">
                <div className="text-sm text-gray-500 uppercase mb-1">
                  MY ADDED RECIPES
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {myData?.length || 0}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500">
                  <span>Recently added this month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                User Profile
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Last Login
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    June 25, 2025, 10:30 AM
                  </p>
                </div>
                <Link to="/profile">
                  <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
