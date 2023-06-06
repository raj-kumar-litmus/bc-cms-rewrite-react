import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashBoardProvider } from "./context/normalizationDashboard";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "../public/index.css";

const SSOLogin = lazy(() => import("./components/sso"));
const MenuChooser = lazy(() => import("./components/menuChooser"));
const NavBar = lazy(() => import("./components/NavBar"));
const NormalizationDashboard = lazy(() =>
  import("./components/NormalizationDashboard")
);
const ManualWorkFlowDashboard = lazy(() =>
  import("./components/ManualWorkFlowDashboard")
);
const StyleDetails = lazy(() => import("./pages/styleDetails"));
const Loader = lazy(() => import("./components/loader"));
const ViewMoreHistoryPage = lazy(() => import("./pages/ViewMoreHistoryPage"));


const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SSOLogin />} />
        <Route
          path="/styleDetails"
          element={<StyleDetails quickFix={false} styleId="CGHD23Y" />}
        />
        <Route
          path="/viewMoreHistory"
          element={<ViewMoreHistoryPage/>}
        />
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
              <DashBoardProvider>
                <NormalizationDashboard />
              </DashBoardProvider>
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
    </Suspense>
  </Router>
);
