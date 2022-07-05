import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Alert from "../../Components/Alert";

// import DatePicker from "react-date-picker";
import { useSelector } from "react-redux";
import { formatDate, parcelType, dateSearch } from "../../Functions/Functions";
import { getTotalDividendsABranch } from "../../API/Parcel";

import SearchIcon from "@mui/icons-material/Search";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMoneyFromCounter } from "../../API/Finance";
import { getUserBranchByBranchCode } from "../../API/UserBranch";

const Getmoney = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState([]);

  const [allUsers, setAllUser] = useState([]);

  const [users, setUser] = useState([]);
  const [total, setTotal] = useState([]);
  const [result, setResult] = useState({
    total_shipping_cost: "",
  });
  const [staff, setStaff] = useState([]);
  const [shippingCostStart, setShippingCostStart] = useState([]);
  const [COD, setCOD] = useState([]);
  const [shippingCostEnd, setShippingCostEnd] = useState([]);

  const [totalCOD, setTotalCOD] = useState({
    total_cod_lak: 0,
    total_cod_thb: 0,
    total_cod_usd: 0,
  });
  const [totalShipping, setTotalShipping] = useState(null);

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [search, setSearch] = useState({
    branch_code: user.branch_code,
    date_start: "",
    date_end: new Date(),
  });

  const { date_start, date_end } = search;

  useEffect(() => {
    date_start !== "" &&
      date_end !== "" &&
      getMoneyFromCounter(search, token)
        .then((res) => {
          setStaff(res.data.staff);

          setCOD(res.data.cod);
          setShippingCostStart(res.data.shipping_cost_start);
          setShippingCostEnd(res.data.shipping_cost_end);
          res.data.total_cod.length > 0 && setTotalCOD(res.data.total_cod[0]);
          res.data.total_shipping.length > 0 &&
            setTotalShipping(res.data.total_shipping[0].total);
        })
        .catch((err) => {
          Alert.error(err.response.data.error);
        });
  }, [search]);

  // --------------- format date -----------------------
  const handleDateStart = (date) => {
    setDateStart(date);
    setSearch({ ...search, date_start: dateFormat(date) });
  };

  const handleDateEnd = (date) => {
    setDateEnd(date);
    setSearch({ ...search, date_end: date });
  };

  const dateFormatAux = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const dateFormat = (date) => {
    let formatYearMonthDay = dateFormatAux(date);
    return formatYearMonthDay;
  };

  const sumShippingCost = (userId) => {
    let zum1 = null;
    let zum2 = null;
    shippingCostStart.map((item) => {
      if (userId == item._id.user_id) {
        zum1 = item.total;
        return zum1;
      }
    });

    shippingCostEnd.map((item) => {
      if (userId == item._id.get_money_by) {
        zum2 = item.total;
        return zum2;
      }
    });
    let zum = zum1 + zum2;
    if (zum === 0) return "-";
    return zum;
  };

  const sumCODLak = (userId) => {
    let zum = null;
    COD.map((item) => {
      if (userId == item._id.get_money_by) {
        zum = item.total_cod_lak;
        return zum;
      }
    });

    if (zum === 0) return "-";
    return zum;
  };
  const sumCODThb = (userId) => {
    let zum = null;
    COD.map((item) => {
      if (userId == item._id.get_money_by) {
        zum = item.total_cod_thb;
        return zum;
      }
    });

    if (zum === 0) return "-";
    return zum;
  };
  const sumCODUsd = (userId) => {
    let zum = null;
    COD.map((item) => {
      if (userId == item._id.get_money_by) {
        zum = item.total_cod_usd;
        return zum;
      }
    });

    if (zum === 0) return "-";
    return zum;
  };

  const totalMoneyForSent = (totalShipping, totalCODLak) => {
    if (typeof totalShipping === "string") {
      totalShipping = 0;
    }

    return totalCODLak + totalShipping;
  };

  return (
    <>
      <div className="container">
        <div className="card card-body">
          <h3 className="text-danger mb-3">ເກັບເງິນຈາກ Counter</h3>
          <div className=" row ">
            <div className="col-auto">
              <DatePicker
                selected={dateStart}
                onChange={(date) => handleDateStart(date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm:ss"
                className="form-control"
                placeholderText="--/--/--"
                maxDate={new Date()}
              />
            </div>
            <div className="col-auto">
              <DatePicker
                selected={dateEnd}
                onChange={(date) => handleDateEnd(date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm:ss"
                className="form-control"
                placeholderText="--/--/--"
                maxDate={new Date()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------- */}
      <div className="table-responsive text-nowrap">
        <div className="container">
          <div className="mt-3">
            <div className="card card-body mb-5">
              <div className="mb-3 table-responsive text-nowrap">
                <table className="table  table-borderless table-striped">
                  <thead className="bg-danger  text-white">
                    <tr>
                      <th rowSpan={2}>ພະນັກງານ</th>
                      <th rowSpan={2}>ຮັບ-ຈ່າຍ</th>
                      <th colSpan={3} className="cod-th">
                        COD
                      </th>
                    </tr>
                    <tr>
                      <th>LAK</th>
                      <th>THB</th>
                      <th>USD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.username}</td>
                          <td>
                            {sumShippingCost(item._id) &&
                              sumShippingCost(item._id).toLocaleString()}
                          </td>
                          <td>
                            {sumCODLak(item._id) &&
                              sumCODLak(item._id).toLocaleString()}
                          </td>
                          <td>
                            {sumCODThb(item._id) &&
                              sumCODThb(item._id).toLocaleString()}
                          </td>
                          <td>
                            {sumCODUsd(item._id) &&
                              sumCODUsd(item._id).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card card-body border-danger">
            <div className="h4 text-danger mt-2 ">
              ຍອດເງິນທີ່ຕ້ອງສົ່ງ ບໍລິສັດ
            </div>
            <table className="table  table-borderless table-striped">
              <thead className="  text-danger">
                <tr>
                  <th rowSpan={2}>#</th>
                  <th rowSpan={2}>ຮັບ-ຈ່າຍ</th>
                  <th colSpan={3} className="cod-th">
                    COD
                  </th>
                </tr>
                <tr>
                  <th>LAK</th>
                  <th>THB</th>
                  <th>USD</th>
                  <th className="text-center">ລວມກີບ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ຍອດເງິນທີ່ຕ້ອງສົ່ງ ບໍລິສັດ</td>
                  <td>
                    {totalShipping !== null
                      ? totalShipping.toLocaleString()
                      : "-"}
                  </td>

                  <td>
                    {totalCOD && totalCOD.total_cod_lak > 0
                      ? totalCOD.total_cod_lak.toLocaleString()
                      : "-"}
                  </td>
                  <td className=" text-danger ">
                    {totalCOD && totalCOD.total_cod_thb > 0
                      ? totalCOD.total_cod_thb.toLocaleString()
                      : "-"}
                  </td>
                  <td className=" text-danger ">
                    {totalCOD && totalCOD.total_cod_usd > 0
                      ? totalCOD.total_cod_usd.toLocaleString()
                      : "-"}
                  </td>
                  <td className=" text-danger text-center">
                    {totalMoneyForSent(
                      totalShipping,
                      totalCOD.total_cod_lak
                    ).toLocaleString() + " ກີບ"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Getmoney;
