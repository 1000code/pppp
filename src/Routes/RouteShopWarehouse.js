import React from "react";

const Dividends = React.lazy(() => import("../Pages/Report/Dividends"));
const GetUser = React.lazy(() => import("../Pages/Users/ListStaff"));
const AddUser = React.lazy(() => import("../Pages/Users/AddUser"));
const UpdateUser = React.lazy(() => import("../Pages/Users/UpdateUser"));
const Resent = React.lazy(() => import("../Pages/Warehouse/Resent"));
const ParcelInWarehouse = React.lazy(() =>
  import("../Pages/Warehouse/ParcelInWarehouse")
);
const ReceiveParcel = React.lazy(() =>
  import("../Pages/Warehouse/ReceiveParcel")
);

const RouteShopWarehouse = [
  {
    path: "/dashboard/dividends",
    name: "Dividends",
    element: Dividends,
  },
  {
    path: "/dashboard/user-branch",
    name: "GetUser",
    element: GetUser,
  },
  {
    path: "/dashboard/u_branch/add-user",
    name: "AddUser",
    element: AddUser,
  },
  {
    path: "/dashboard/u_branch/update/:id",
    name: "UpdateUser",
    element: UpdateUser,
  },

  {
    path: "/dashboard/parcel/receive-parcel",
    name: "ReceiveParcel",
    element: ReceiveParcel,
  },
  {
    path: "/dashboard/dividends",
    name: "Dividends",
    element: Dividends,
  },
  {
    path: "/dashboard/parcel-in-warehouse",
    name: "ParcelInWarehouse",
    element: ParcelInWarehouse,
  },
  {
    path: "/dashboard/parcel/resent/:serialParcel",
    name: "Resent",
    element: Resent,
  },
];

export default RouteShopWarehouse;
