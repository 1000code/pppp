import React, { useEffect, useState } from "react";
import Alert from "../../Components/Alert";
import { useSelector } from "react-redux";
import { getTotalDividendsABranch } from "../../API/Parcel";

import DatePicker from "react-datepicker";
import { getAllPercentage } from "../../API/PercentCOD";
import { shippingCost, totalCOD } from "../../Functions/Dividends";

const Dividends = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const [branch, setBranch] = useState([]);
  const [percentCOD, setPercentCOD] = useState([]);
  const [shipping, setShipping] = useState(0);
  const [COD, setCOD] = useState([]);
  const [percentWarehouse, setPercentWarehouse] = useState(0);
  const [showDividends, setShowDividends] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [showResult, setShowResult] = useState(true);

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [search, setSearch] = useState({
    date_start: new Date(),
    date_end: new Date(),
    branch_code: user.branch_code,
  });

  useEffect(() => {
    LoadTotalDividends(search, token);
    LoadPercentCOD(token);
  }, [search]);

  const LoadTotalDividends = (search, token) => {
    getTotalDividendsABranch(search, token)
      .then((res) => {
        setBranch(res.data.branch[0]);
        setCOD(res.data.COD);
        setTracking(res.data.tracking);
        setShipping(res.data.shipping_cost);
        res.data.dividends_warehouse.length > 0 &&
          setPercentWarehouse(
            res.data.dividends_warehouse[0].parcel_join[0].total
          );
      })
      .catch((err) => {
        console.log(err);
        Alert.error(err.response.data.error);
      });
  };

  let result = {
    totalBranch: "-",
    totalWarehouse: "-",
    totalAll: "-",
  };

  if (shipping) {
    result = shippingCost(shipping, tracking, user.branch_code, branch);
  }
  const { totalBranch, totalWarehouse, totalAll } = result;

  const LoadPercentCOD = (token) => {
    getAllPercentage(token)
      .then((res) => {
        setPercentCOD(res.data);
      })
      .catch((err) => {
        Alert.error(err.response.data.error);
      });
  };

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

  const percentBranch = () => {
    let zum = 0;
    if (checkBranch(branch)) {
      zum =
        branch.dividends_join[0].delivery + branch.dividends_join[0].receive;
    }

    return zum;
  };

  const calculateShippingCost = () => {
    let zum = 0;
    zum = (percentBranch() * shipping) / 100;

    return zum;
  };

  const calculateWarehouse = () => {
    let zum = 0;

    if (checkBranch(branch)) {
      zum = (branch.dividends_join[0].warehouse * percentWarehouse) / 100;
    }

    return zum;
  };

  const total = (warehouse) => {
    let zum = 0;
    zum = calculateWarehouse() + calculateShippingCost();

    return zum;
  };
  const checkBranch = (branch) => {
    if (branch.length !== 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <div className="container">
        <div className="card card-body">
          <h3 className="text-danger mb-3">ລາຍງານຜົນຕອບແທນ</h3>
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

        <div className="card border-danger mt-3 ">
          <div className="row m-2">
            <div className=" col-12 mb-5">
              <div className="card">
                <div className="card-header border-0 bg-danger">
                  <h3 className="card-title text-white">
                    ປະເພດສາຂາ :{" "}
                    {checkBranch(branch) && branch.dividends_join[0].name}
                  </h3>
                </div>
                <div className="card-body">
                  <>
                    <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                      <p className="text-success text-xl">
                        <span className="text-muted">ຜົນຕອບແທນ ຂາຮັບ</span>
                      </p>
                      <p className="d-flex flex-column text-right">
                        <span className="font-weight-bold">
                          {checkBranch(branch) &&
                            branch.dividends_join[0].delivery + "%"}
                        </span>
                      </p>
                    </div>
                    {/* /.d-flex */}
                    <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                      <p className="text-warning text-xl">
                        <span className="text-muted">ຜົນຕອບແທນ ຂາຈ່າຍ</span>
                      </p>
                      <p className="d-flex flex-column text-right">
                        <span className="font-weight-bold">
                          {checkBranch(branch) &&
                            branch.dividends_join[0].receive + "%"}
                        </span>
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                      <p className="text-warning text-xl">
                        <span className="text-muted">ຜົນຕອບແທນ ຄ່າຄັດແຍກ</span>
                      </p>
                      <p className="d-flex flex-column text-right">
                        <span className="font-weight-bold">
                          {checkBranch(branch) &&
                            branch.dividends_join[0].warehouse + "%"}
                        </span>
                      </p>
                    </div>
                  </>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="card">
                <div className="card-header border-0 alert-warning">
                  <h3 className="card-title  text-danger">ຜົນຕອບແທນ </h3>
                </div>
                <div className="card-body">
                  <>
                    <div className="d-flex justify-content-between border-bottom mt-3 align-items-center mb-0">
                      <p className="d-flex flex-column text-xl">
                        <span className="text-muted">ຮັບ-ຈ່າຍ ພັດສະດຸ</span>
                      </p>
                      <p className="d-flex flex-column text-right">
                        <span className="text-muted">
                          {typeof totalBranch === "number"
                            ? totalBranch.toLocaleString() + " ກີບ"
                            : totalBranch}
                        </span>
                      </p>
                    </div>
                    {/* /.d-flex */}
                    <div className="d-flex justify-content-between border-bottom mt-3 align-items-center mb-0">
                      <p className="d-flex flex-column text-xl">
                        <span className="text-muted">ຄ່າຄັດແຍກ</span>
                      </p>
                      <p className="d-flex flex-column text-right">
                        <span className="text-muted">
                          {typeof totalWarehouse === "number"
                            ? totalWarehouse.toLocaleString() + " ກີບ"
                            : totalWarehouse}
                        </span>
                      </p>
                    </div>

                    <div className="d-flex justify-content-between border-bottom mt-3 align-items-center mb-0">
                      <p className="d-flex flex-column text-xl">
                        <span className="text-muted">ລວມ</span>
                      </p>
                      <p className="d-flex flex-column text-right">
                        <span className=" text-muted">
                          <i className="ion ion-android-arrow-down  " />
                        </span>
                        <span className="font-weight-bold text-danger text-end alert-warning py-2 ps-4 pe-1">
                          {typeof totalAll === "number"
                            ? totalAll.toLocaleString() + " ກີບ"
                            : totalAll}
                        </span>
                      </p>
                    </div>
                  </>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="card">
                <div className="card-header border-0 alert-warning">
                  <h3 className="card-title   text-danger">COD </h3>
                </div>
                <div className="card-body">
                  {showResult && (
                    <>
                      <div className="d-flex justify-content-between border-bottom mt-3 align-items-center mb-0">
                        <p className="d-flex flex-column text-xl">
                          <span className="text-muted">LAK</span>
                        </p>
                        <p className="d-flex flex-column text-right">
                          <span className="text-muted">
                            <i className="ion ion-android-arrow-down text-danger" />
                          </span>
                          <span className="font-weight-bold text-end  text-danger alert-warning py-2 ps-4 pe-1">
                            {totalCOD(COD, percentCOD, "lak").toLocaleString()}
                          </span>
                        </p>
                      </div>
                      {/* /.d-flex */}
                      <div className="d-flex justify-content-between border-bottom mt-3 align-items-center mb-0">
                        <p className="d-flex flex-column text-xl">
                          <span className="text-muted">THB</span>
                        </p>
                        <p className="d-flex flex-column text-right">
                          <span className="text-muted">
                            <i className="ion ion-android-arrow-down text-danger" />{" "}
                          </span>
                          <span className="font-weight-bold text-end  text-danger alert-warning py-2 ps-4 pe-1">
                            {totalCOD(COD, percentCOD, "thb").toLocaleString()}
                          </span>
                        </p>
                      </div>

                      <div className="d-flex justify-content-between border-bottom mt-3 align-items-center mb-0">
                        <p className="d-flex flex-column text-xl">
                          <span className="text-muted"> USD</span>
                        </p>
                        <p className="d-flex flex-column text-right">
                          <span className=" text-muted">
                            <i className="ion ion-android-arrow-down text-danger " />
                          </span>
                          <span className="font-weight-bold text-end  text-danger alert-warning py-2 ps-4 pe-1">
                            {totalCOD(COD, percentCOD, "usd").toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </>
                  )}
                  {/* /.d-flex */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dividends;
