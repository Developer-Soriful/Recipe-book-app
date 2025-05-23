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


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                loader: async () => {
                    const response = await fetch('https://server-side-eight-pearl.vercel.app/toprecipe');
                    const data = await response.json();
                    return data;
                },
                element: (
                    <PrivateRoute>
                        <HomeLayout />
                    </PrivateRoute>
                ),
            },
            {
                path: "/allrecipes",
                loader: async () => {
                    const response = await fetch('https://server-side-eight-pearl.vercel.app/users');
                    const data = await response.json();
                    return data;
                },
                element: (
                    <PrivateRoute>
                        <AllRecipe />
                    </PrivateRoute>
                ),
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
                element:
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>,
            },
            {
                path: "/users/:id",
                loader: async ({ params }) => {
                    const response = await fetch(`https://server-side-eight-pearl.vercel.app/users/${params.id}`);
                    const data = await response.json();
                    return data;
                },
                element: <RecipeCardDetails />,
            },
            {
                path: "/myrecipes",
                element: <PrivateRoute>
                    <MyRecipes />
                </PrivateRoute>
            }
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
