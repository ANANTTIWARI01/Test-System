import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

import AdminProtectedRoute from "./admin/pages/ProtectedRoute";
import AdminFirst from "./admin/pages/AdminFirst";
import AdminHome from "./admin/pages/AdminHome";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminRegister from "./admin/pages/AdminRegister";
import CreateNewTest from "./admin/pages/CreateNewTest";
import ViewTests from "./admin/pages/ViewTests";
import AdminAuth from "./admin/context/Auth";

import First from "./pages/First";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Auth from "./context/Auth";
import AttemptTest from "./pages/AttemptTest";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Auth>
        <First />
      </Auth>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/attempt-test/:testID",
        element: (
          <ProtectedRoute>
            <AttemptTest />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminAuth>
        <AdminFirst />
      </AdminAuth>
    ),
    children: [
      {
        index: true,
        element: (
          <AdminProtectedRoute>
            <AdminHome />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <AdminProtectedRoute>
            <AdminHome />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "test",
        element: (
          <AdminProtectedRoute>
            <AdminHome />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "test/new",
        element: (
          <AdminProtectedRoute>
            <CreateNewTest />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "test/view",
        element: (
          <AdminProtectedRoute>
            <ViewTests />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "register",
        element: <AdminRegister />,
      }
    ],
  },
  {
    path: "*",
    element: (
      <h1>
        404 You shouldn't be here. <Link to="/">Go Back</Link>
      </h1>
    ),
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
