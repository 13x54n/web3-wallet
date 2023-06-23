import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/Dashboard";

const keyPairExists = () => {
  // @note totally not secure on revealing the key for the key pair store & storing on local storage - 13x54r
  if (localStorage.getItem("13x54r_keyPair") && localStorage.getItem('13x54r_walletPassword')) {
    return true;
  } else {
    return false;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: keyPairExists() ? <Dashboard /> : <WelcomePage />,
  },
  {
    path: "/dashboard",
    element: keyPairExists() ? <Dashboard /> : <WelcomePage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
