import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "../public/index.css";
import App from "./App";
import SSOLogin from "./components/sso";
import Token from "./components/token";
import MenuChooser from "./components/menuChooser";
import NavBar from "./components/NavBar";
import NormalizationDashboard from "./components/NormalizationDashboard";
import ManualWorkFlowDashboard from "./components/ManualWorkFlowDashboard";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sso" element={<SSOLogin />} />
      <Route path="/redirect/web" element={<Token />} />
      <Route
        path="/menuChooser"
        element={
          <>
            <NavBar />
            <MenuChooser />
          </>
        }
      />
      <Route
        path="/normalizationDashBoard"
        element={
          <div className="h-screen">
            <NavBar />
            <NormalizationDashboard />
          </div>
        }
      />
      <Route
        path="/manualWorkFlowDashboard"
        element={
          <>
            <NavBar />
            <ManualWorkFlowDashboard backButtonString={"<Back"}
             SearchTest={"Search"}
             testInsideTheAlert={"Style DGET233 and FWPT1Y3 are doesn’t exist"}
            />
          </>
        }
      />
    </Routes>
  </BrowserRouter>
);
