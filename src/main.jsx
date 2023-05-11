import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "../public/index.css";
import App from "./App";
import SSOLogin from "./components/sso";
import Token from "./components/token";
import MenuChooser from "./components/menuChooser";
import NavBar from "./components/NavBar";
import NormalizationDashboard from './components/NormalizationDashboard';
import ManualWorkFlowDashboard from './components/ManualWorkFlowDashboard'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "sso",
    element: <SSOLogin />
  },
  {
    path: "/menuChooser",
    element: (
    <>
    <NavBar />
    <MenuChooser />
    </>)
  },
  {
    path: "/normalizationDashBoard",
    element: (
    <>
    <NavBar />
    <NormalizationDashboard />
    </>)
  },
  {
    path: "/manualWorkFlowDashboard",
    element: (
    <>
    <NavBar />
    <ManualWorkFlowDashboard />
    </>)
  },
  {
    path: "redirect/web",
    element: <Token />
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
