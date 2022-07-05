import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ============= import css ============
import "bootstrap/dist/css/bootstrap.min.css";
import "./Assets/css/App.css";
import "antd/dist/antd.css";

import Loading from "./Components/Loading";
import DefaultLayout from "./Layouts/DefaultLayouts";

// ========= @import  redux ===========
import { useDispatch } from "react-redux";

import { currentUserBranch } from "./API/Auth";
import { disableClickRight } from "./Functions/Functions";
import { getLocation } from "./API/GetLoaction";
import BlockCountry from "./Components/BloackCountry";

const App = () => {
  const token = sessionStorage.AUTHORIZATION;
  const dispatch = useDispatch();
  const [visit, setVisit] = useState("load");
  const [country, setCountry] = useState([
    {
      ip: "103.43.77.242",
      continent_code: "AS",
      continent_name: "Asia",
      country_code2: "LA",
      country_code3: "LAO",
      country_name: "Laos",
      country_capital: "Vientiane",
      state_prov: "",
      district: "",
      city: "Vientiane",
      zipcode: "",
      latitude: "17.96742",
      longitude: "102.61538",
      is_eu: false,
      calling_code: "+856",
      country_tld: ".la",
      languages: "lo,fr,en",
      country_flag: "https://ipgeolocation.io/static/flags/la_64.png",
      geoname_id: "10105492",
      isp: "Lao Telecommunication Co Ltd",
      connection_type: "",
      organization: "Lao Telecommunication Co Ltd",
      currency: {
        code: "LAK",
        name: "Lao Kip",
        symbol: "₭",
      },
    },
    {
      ip: "103.43.77.242",
      continent_code: "AS",
      continent_name: "Asia",
      country_code2: "TH",
      country_code3: "THAILAND",
      country_name: "Thailand",
      country_capital: "Bangkok",
      state_prov: "",
      district: "",
      city: "Bangkok",
      zipcode: "",
      latitude: "17.96742",
      longitude: "102.61538",
      is_eu: false,
      calling_code: "+856",
      country_tld: ".la",
      languages: "lo,fr,en",
      country_flag: "https://ipgeolocation.io/static/flags/la_64.png",
      geoname_id: "10105492",
      isp: "Lao Telecommunication Co Ltd",
      connection_type: "",
      organization: "Lao Telecommunication Co Ltd",
      currency: {
        code: "LAK",
        name: "Lao Kip",
        symbol: "₭",
      },
    },
  ]);

  useEffect(() => {
    if (token) {
      currentUserBranch(token)
        .then((res) => {
          // console.log(res.data);
          dispatch({
            type: "LOGIN",
            payload: {
              token: token,
              phone: res.data.role.phone,
              id: res.data.role.id,
              username: res.data.role.username,
              name: res.data.role.name,
              role_sub_branch: res.data.role.role_sub_branch,
              status_tracking: res.data.role.status_tracking,
              branch_code: res.data.role.branch_code,
              user_type: res.data.role.user_type,
              p_poste: res.data.role.p_poste,
            },
          });
        })
        .catch((err) => {
          console.error(err.response.data);
          dispatch({
            type: "LOGOUT",
            payload: null,
          });
        });
    }
  }, [dispatch]);

  useEffect(() => {
    window.location.hostname !== "localhost" && disableClickRight();
    getLocation()
      .then((res) => {
        checkVisitor(res.data.country_code2);

        const {
          ip,
          continent_code,
          continent_name,
          country_code2,
          country_code3,
          country_name,
          country_capital,
          state_prov,
          district,
          city,
          zipcode,
          latitude,
          longitude,
          is_eu,
          calling_code,
          country_tld,
          languages,
          country_flag,
          geoname_id,
          isp,
          connection_type,
          organization,
          currency: { code, name, symbol },
        } = res.data;

        dispatch({
          type: "VISIT",
          payload: {
            ip,
            continent_code,
            continent_name,
            country_code2,
            country_code3,
            country_name,
            country_capital,
            state_prov,
            district,
            city,
            zipcode,
            latitude,
            longitude,
            is_eu,
            calling_code,
            country_tld,
            languages,
            country_flag,
            geoname_id,
            isp,
            connection_type,
            organization,
            currency: { code, name, symbol },
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const checkVisitor = (country_code) => {
    country.map((item) => {
      item.country_code2 === country_code && setVisit("pass");
    });
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="*"
            element={
              visit === "pass" ? (
                <DefaultLayout />
              ) : (
                <BlockCountry visit={visit} />
              )
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
