import React, { useEffect, useState } from "react";
import Alert from "../../Components/Alert";

// import DatePicker from "react-date-picker";
import { useSelector } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMyMoney } from "../../API/Finance";

const Mymoney = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const [users, setUser] = useState([]);
  const [total, setTotal] = useState([]);
  const [showTotal, setShowTotal] = useState(false);
  const [showCOD, setShowCOD] = useState(false);

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [search, setSearch] = useState({
    branch_code: user.branch_code,
    date_start: "",
    date_end: new Date(),
    user_id: user.id,
  });

  const { date_start, date_end } = search;

  useEffect(() => {
    date_start !== "" &&
      date_end !== "" &&
      getMyMoney(search, token)
        .then((res) => {
          setUser(res.data.user);
          setTotal(res.data.money);
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

  return (
    <>
      <div className="container">
        <div className="card card-body">
          <h3 className="text-danger mb-3">ຍອດເງິນທີ່ຕ້ອງສົ່ງ </h3>
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

        {/* ------------------------------- */}
        <div className="table-responsive text-nowrap ">
          <div className="mt-3 ">
            <div className="mb-3 table-responsive text-nowrap ">
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
                  <tr>
                    <td>{users.username}</td>
                    {/* {total && ( */}
                    <>
                      <td>
                        {total.shipping_cost !== undefined &&
                          total.shipping_cost.toLocaleString() + " ກີບ"}
                      </td>
                      <td>
                        {total.cod_lak !== undefined &&
                          total.cod_lak.toLocaleString()}
                      </td>
                      <td>
                        {total.cod_thb !== undefined &&
                          total.cod_thb.toLocaleString()}
                      </td>

                      <td>
                        {total.cod_usd !== undefined &&
                          total.cod_usd.toLocaleString()}
                      </td>
                    </>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mymoney;
