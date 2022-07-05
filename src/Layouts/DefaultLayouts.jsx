import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ================== Import component and route ===============================
import RouteCounter from "../Routes/RouteCounter";
import RouteBranch from "../Routes/RouteBranch";
import RouteRider from "../Routes/RouteRider";
import RouteShopWarehouse from "../Routes/RouteShopWarehouse";
import RoutePublic from "../Routes/RoutePublic";
// ================== Import middleware ===============================
import IsCounter from "../Middleware/IsCounter";
import IsRider from "../Middleware/IsRider";
import IsBranch from "../Middleware/IsBranch";
import IsWarehouseShop from "../Middleware/IsWarehouseShop";
import CheckLogin from "../Middleware/CheckLogin";

import Sidebar from "./Sidebar";

// ===============================
import Login from "../Pages/Auth/Login";

//========= @import  redux ===========
import { useSelector } from "react-redux";
import IsTruck from "../Middleware/IsTruck";
import RouteTruck from "../Routes/RouteTruck";
import Redirect from "../Middleware/Redirect";

const DefaultLayout = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      <Sidebar />

      <div className="contents ">
        <Routes>
          <Route
            exact
            path="/"
            name="Login"
            element={
              user && user.token ? (
                <Navigate to="dashboard" replace />
              ) : (
                <Login />
              )
            }
          />

          {/* ----------- public Route---------- */}
          <Route element={<IsTruck />}>
            {RouteTruck.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            })}
          </Route>

          <Route element={<CheckLogin />}>
            {RoutePublic.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            })}
          </Route>

          <Route element={<IsBranch />}>
            {RouteBranch.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            })}
          </Route>
          <Route element={<IsCounter />}>
            {RouteCounter.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx + idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            })}
          </Route>

          <Route element={<IsRider />}>
            {RouteRider.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx + "ware"}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            })}
          </Route>
          <Route element={<IsWarehouseShop />}>
            {RouteShopWarehouse.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx + "ware"}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            })}
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default DefaultLayout;
