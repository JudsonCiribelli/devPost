import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/Home/home";
import LoginPage from "./pages/Login/login";
import PostsPage from "./pages/Posts/posts";
import RegisterPage from "./pages/Register/register";
import UserProfilePage from "./pages/User/user";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <PostsPage />,
        path: "/posts",
      },
      {
        element: <LoginPage />,
        path: "/login",
      },
      {
        element: <RegisterPage />,
        path: "/register",
      },
      {
        element: <UserProfilePage />,
        path: "/user/:id",
      },
    ],
  },
]);

export { router };
