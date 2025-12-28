import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import Home from "./components/pages/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router";
import PayrollReports, {
  clientLoader,
} from "./components/pages/PayrollReports.tsx";
import Layout from "./components/partials/Layout.tsx";
const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    element: <Layout />, // Layout wraps all child routes
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/payroll-reports",
        element: <PayrollReports />,
        loader: clientLoader,
      },
    ],
  },
]);

createRoot(root!).render(<RouterProvider router={router} />);
