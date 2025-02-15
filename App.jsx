import React, { useContext } from "react";
import { createBrowserRouter, Navigate, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signUp/Signup";
import Navbar from "./component/navbar/Navbar";
import Leftbar from "./component/left_bar/Leftbar";
import Rightbar from "./component/right_bar/Rightbar";
import Profile from "./component/profile/Profile";
import Home from "./pages/home/Home";
import "./style.scss";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

const Layout = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Leftbar />
        <div style={{ flex: 6 }}>
          <Outlet /> {/* Where Home or Profile will render */}
        </div>
        <Rightbar />
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { userCurrent } = useContext(AuthContext); // Fix: Use inside component
  return userCurrent ? children : <Navigate to="/login" />;
};

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile/:id", element: <Profile /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
