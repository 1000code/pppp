import React from "react";

// const AddParcel = React.lazy(() => import("..//Pages/Parcel/AddParcel"))
const SendParcel = React.lazy(() =>
    import ("../Pages/Parcel/SendParcel"));

const RouteRider = [{
    path: "/dashboard/parcel/send-parcel",
    name: "SendParcel",
    element: SendParcel,
}, ];

export default RouteRider;