import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomeLayout from "../layouts/HomeLayout";
import AllRecipe from "../layouts/AllRecipe";
import AddRecipe from "../layouts/AddRecipe";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "../Auth/PrivateRoute";
import Profile from "../pages/Profile";
import ErrorPage from "../pages/ErrorPage";
import RecipeCardDetails from "../components/RecipeCardDetails";
import MyRecipes from "../layouts/MyRecipes";
import Dashboard from "../components/Dashboard";
import Overview from "../pages/Overview";
import MyItemsTable from "../pages/MyItemsTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: async () => {
          const response = await fetch("https://book-recipe-server.vercel.app/toprecipe");
          const data = await response.json();
          return data;
        },
        element: <HomeLayout />,
      },
      {
        path: "/allrecipes",
        loader: async () => {
          const response = await fetch("https://book-recipe-server.vercel.app/users");
          const data = await response.json();
          return data;
        },
        element: <AllRecipe />,
      },
      {
        path: "/addrecipes",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/users/:id",
        loader: async ({ params }) => {
          const response = await fetch(
            `https://book-recipe-server.vercel.app/users/${params.id}`
          );
          const data = await response.json();
          return data;
        },
        element: (
          <PrivateRoute>
            <RecipeCardDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/myrecipes",
        element: (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: <Dashboard />,

        children: [
          {
            index: true,
            element: <Overview />,
            loader: async () => {
              const response = await fetch("https://book-recipe-server.vercel.app/users");
              const data = await response.json();
              return data;
            },
          },
          {
            path: "/dashboard/allItems",
            element: <AllRecipe />,
            loader: async () => {
              const response = await fetch("https://book-recipe-server.vercel.app/users");
              const data = await response.json();
              return data;
            },
          },
          {
            path: "/dashboard/addItems",
            element: <AddRecipe />,
          },
          {
            path: "/dashboard/myItems",
            element: <MyItemsTable />,
            loader: async () => {
              const response = await fetch("https://book-recipe-server.vercel.app/users");
              const data = await response.json();
              return data;
            },
          }
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
