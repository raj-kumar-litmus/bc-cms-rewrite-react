import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "../public/index.css";
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
      <Route path="/" element={<SSOLogin />} />
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
          <>
            <NavBar />
            <NormalizationDashboard />
          </>
        }
      />
      <Route
        path="/manualWorkFlowDashboard"
        element={
          <>
            <NavBar />
            <ManualWorkFlowDashboard
              backButtonString={"<Back"}
              searchTest={"Search"}
              alertText={"Style DGET233 and FWPT1Y3 are doesn’t exist"}
              displayTest={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et d"
              }
            />
          </>
        }
      />
    </Routes>
  </BrowserRouter>
);
