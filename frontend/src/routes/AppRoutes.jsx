import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import MyLinks from "../pages/dashboard/MyLinks";
import CreateLink from "../pages/dashboard/CreateLink";
import Analytics from "../pages/dashboard/Analytics";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/common/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard_Analytics from "../pages/dashboard/Dashboard_Analytics";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create"
          element={<CreateLink />}
        />

        <Route
          path="/my-links"
          element={<MyLinks />}
        />

        <Route
          path="/analytics/:shortCode"
          element={<Analytics />}
        />

        <Route
          path="/dashboard-analytics"
          element={<Dashboard_Analytics/>}
        />

      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;