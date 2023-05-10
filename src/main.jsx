import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "../public/index.css";
import App from "./App";
import SSOLogin from "./components/sso";
import Token from "./components/token";
import MenuChooser from "./components/menuChooser";

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
    path: "menuChooser",
    element: <MenuChooser />
  },
  {
    path: "redirect/web",
    element: <Token />
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
