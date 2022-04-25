import React from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

import MainLayout from "./Layout/MainLayout";
import AuthLayout from "./Layout/AuthLayout";

// import RouteUrls from "./Routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <MainLayout>
                <Outlet />
              </MainLayout>
            }
          >
            <Route path="/" element={<Home />} />
          </Route>

          {/* Profile */}
          <Route
            element={
              <MainLayout>
                <Outlet />
              </MainLayout>
            }
          >
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route
            element={
              <AuthLayout>
                <Outlet />
              </AuthLayout>
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
