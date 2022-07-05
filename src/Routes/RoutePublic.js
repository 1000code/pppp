import React from "react";
const Dashboard = React.lazy(() => import("../Pages/Dashboard/Dashboard"));

const RouteCounter = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: Dashboard,
  },
];

export default RouteCounter;
