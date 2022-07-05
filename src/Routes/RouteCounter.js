import React from "react";
import ParcelInWarehouse from "../Pages/Report/ParcelInWarehouse";

const AddParcel = React.lazy(() => import("../Pages/Parcel/Add"));
const GetCustomer = React.lazy(() => import("../Pages/Customer/Index"));
const AddCustomer = React.lazy(() => import("../Pages/Customer/Add"));
const UpdateCustomer = React.lazy(() => import("../Pages/Customer/Update"));
const AddAcount = React.lazy(() => import("../Pages/Customer/AddAccount"));
const ListParcel = React.lazy(() => import("../Pages/Parcel/ListParcels"));

const Mymoney = React.lazy(() => import("../Pages/Report/Mymoney"));

const RouteCounter = [
  {
    path: "/dashboard/parcel/cancel",
    name: "ListParcel",
    element: ListParcel,
  },
  {
    path: "/dashboard/parcel/add",
    name: "AddParcel",
    element: AddParcel,
  },
  {
    path: "/dashboard/customers",
    name: "Getcustomer",
    element: GetCustomer,
  },
  {
    path: "/dashboard/customer/add/:phone",
    name: "AddCustomer",
    element: AddCustomer,
  },
  {
    path: "/dashboard/customer/update/:id",
    name: "UpdateCustomer",
    element: UpdateCustomer,
  },
  {
    path: "/dashboard/parcel-for-sent",
    name: "ParcelInWarehouse",
    element: ParcelInWarehouse,
  },
  {
    path: "/dashboard/total-shipping-cost",
    name: "Mymoney",
    element: Mymoney,
  },
  {
    path: "/dashboard/customer/:id",
    name: "AddAcount",
    element: AddAcount,
  },
];

export default RouteCounter;
