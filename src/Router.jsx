import { createBrowserRouter } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import * as Detail from "./pages/Detail";
import Order from "./pages/Order";
import * as Login from "./pages/Login";
import History from "./pages/History";

// Helpers
import * as Handle from "./helpers/handleRoutes";
import Title from "./helpers/handleTitle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Handle.DirectToDashboard />,
  },
  {
    path: "/auth/login",
    element: (
      <Title onTitle={"Login"}>
        <Login.Customer />
      </Title>
    ),
  },
  {
    path: "auth/login/guest",
    element: (
      <Handle.PreventBackToLogin>
        <Title onTitle={"Guest login"}>
          <Login.Guest />
        </Title>
      </Handle.PreventBackToLogin>
    ),
  },
  {
    path: "auth/login/admin",
    element: (
      <Title onTitle={"Admin login"}>
        <Login.Admin />
      </Title>
    ),
  },
  {
    path: "/product/detail",
    element: (
      <Title onTitle={"Product detail"}>
        <Detail.Product />
      </Title>
    ),
  },
  {
    path: "/order",
    element: (
      <Title onTitle={"Order"}>
        <Order />
      </Title>
    ),
  },
  {
    path: "/order/history",
    element: (
      <Title onTitle={"Order history"}>
        <History />
      </Title>
    ),
  },
  {
    path: "/order/history/detail/:id",
    element: (
      <Title onTitle={"Order history detail"}>
        <Detail.History />
      </Title>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Title onTitle={"Dashboard"}>
        <Dashboard />
      </Title>
    ),
  },
  {
    path: "/cart",
    element: (
      <Handle.PreventDirectToCart>
        <Title onTitle={"Cart"}>
          <Cart />
        </Title>
      </Handle.PreventDirectToCart>
    ),
  },
]);

export default router;
