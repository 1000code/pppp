import React from "react";

const ReceiveParcelTruck = React.lazy(() =>
  import("../Pages/Parcel/ReceiveParcelTruck")
);
const RouteTruck = [
  {
    path: "/dashboard/parcel/receive-parcel-truck",
    name: "ReceiveParcelTruck",
    element: ReceiveParcelTruck,
  },
];
export default RouteTruck;
