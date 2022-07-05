import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Notice } from "../../Components/Notice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QRCode from "react-qr-code";
import { getParcelBySerialParcel, updateStatusParcel } from "../../API/Parcel";
import Alert from "../../Components/Alert";
import { useSelector } from "react-redux";
import moment from "moment";
import { parcelType } from "../../Functions/Functions";

const SendParcel = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const [showParcel, setShowParcel] = useState(false);
  const [noData, setNoData] = useState(false);

  const [COD, setCOD] = useState({
    cod_lak: "",
    currency_cod: "",
    cod_thb: "",
    cod_usd: "",
  });
  const { currency_cod, cod_thb } = COD;

  const [totalPrice, setTotalPrice] = useState("");
  const [branch, setBranch] = useState({
    branch_now: "",
  });

  const [parcel, setParcel] = useState({
    serial_parcel: "",
    serial_bag: "",
    cus_receive_name: "",
    cus_receive_phone: "",
    cus_sender_name: "",
    cus_sender_phone: "",

    address_receive: "",
    branch_start: "",
    location_parcel: "",
    branch_end: "",
    name_branch_end: "",
    parcel_type: "general",
    box_size: "",
    parcel_weight: "",
    shipping_cost: "", // ຄ່າຂົນສົ່ງ
    payment_type: "pay_start",
    id_rider: "",
    cancel_code: "",
    cancel_parcel: "",
    cancel_by: "",
    cancel_reason: "",
    currency_express: "",
    exchange_thb: "",
    exchange_usd: "",
    comment: "",
    status_parcel: "success",
    warehouse_now: "",
    status_tracking: "",

    //========================
    cod: "",
    currency_cod: "",
    phone_branch_end: "",
    village_name: "",
    city_name: "",
    province_name: "",
    createdAt: "",

    province_join: [],
    city_join: [],
    cod_join: [],
    userbranch_end_join: [],
    branch_end_join: [],
    branch_start_join: [],
  });

  const {
    serial_parcel,
    cus_receive_name,
    cus_receive_phone,

    cus_sender_name,
    cus_sender_phone,
    status_tracking,
    express_type,
    p_poste,
    c_poste,
    address_receive,
    branch_start,
    location_parcel,
    branch_end,
    name_branch_end,
    parcel_type,
    box_size,
    parcel_weight,
    shipping_cost,
    payment_type,
    id_rider,
    cancel_code,
    cancel_parcel,
    cancel_by,
    cancel_reason,
    currency_express,
    status_parcel,
    warehouse_now,

    phone_branch_end,
    village_name,
    city_name,
    comment,
    createdAt,

    province_join,
    city_join,
    cod_join,
    userbranch_end_join,
    branch_end_join,
    branch_start_join,
  } = parcel;

  const [serialParcel, setSerialParcel] = useState({
    serial_parcel: "",
    branch_end: "",
  });
  const inputElement = useRef(null);
  useEffect(() => {
    setSerialParcel({ ...serialParcel, branch_end: user.branch_code });
    setBranch({ ...branch, branch_now: user.branch_code });

    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [inputElement.current]);

  const handleSearchParcel = (e) => {
    setSerialParcel({ ...serialParcel, [e.target.name]: e.target.value });
  };

  const [getMoney, setGetMoney] = useState({
    serial_parcel,
    get_money_by: user.id,
    get_money_date: new Date(),
    status_parcel: "success",
    cod_status: "process",
    branch_code: user.branch_code,
  });

  const handleSearchParcelSubmit = (e) => {
    e.preventDefault();

    if (serialParcel === "") {
      Notice("error", "ກະລຸນາປ້ອນໝາຍເລກ ພັດສະດຸ");
    } else {
      getParcelBySerialParcel(serialParcel, token)
        .then((res) => {
          if (res.data.parcels.length > 0) {
            setParcel(res.data.parcels[0]);
            setCOD(res.data.COD);

            setGetMoney({
              ...getMoney,
              serial_parcel: serialParcel.serial_parcel,
            });

            setShowParcel(true);
            setNoData(false);
            setSerialParcel({ ...serialParcel, serial_parcel: "" });
          } else {
            setShowParcel(false);
            setNoData(true);
          }
        })
        .catch((err) => {
          Alert("error", err.response.data.error);
          setShowParcel(false);
        });
    }
  };

  const currencyCod = (currency_cod) => {
    if (currency_cod === "lak") {
      return " ກີບ";
    } else if (currency_cod === "thb") {
      return " ບາດ";
    } else if (currency_cod === "usd") {
      return " ໂດລາ";
    }
  };

  const totalCod = (cod_lak, cod_thb, cod_usd) => {
    if (cod_lak !== null) {
      return cod_lak;
    } else if (cod_thb !== null) {
      return cod_thb;
    } else if (cod_usd !== null) {
      return cod_usd;
    } else {
      return null;
    }
  };

  const handleUpdateParcelStatus = (e) => {
    e.preventDefault();
    updateStatusParcel(getMoney, token)
      .then((res) => {
        if (res.data.success) {
          Notice("success", res.data.success);
          setSerialParcel({ ...serialParcel, serial_parcel: "" });
          setShowParcel(false);
          inputElement.current.focus();
        } else {
          Notice("error", res.data.error);
        }
      })
      .catch((err) => {
        Notice("error", err.response.data.error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="card border-warning border-3 card-body mb-3">
          <form onSubmit={handleSearchParcelSubmit}>
            <div className="h3 mt-2 pt-2 mb-3 text-danger">ຄຳນວນເງິນ</div>
            <div className="row">
              <div className="col-md-5 col-lg-4 col-11  mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    name="serial_parcel"
                    value={serialParcel.serial_parcel}
                    className="form-control "
                    placeholder="ລະຫັດພັດສະດຸ"
                    onChange={handleSearchParcel}
                    ref={inputElement}
                  />

                  <div className="col-auto">
                    <button type="submit" className="btn btn-danger">
                      <SearchIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {showParcel && warehouse_now !== user.branch_code && (
          // branch_end === branch.branch_now &&
          // status_tracking === "truck" &&()
          <div className="row ">
            <div className="col-12">
              <div className="card border-danger mb-3 alert-danger ">
                <form onSubmit={handleSearchParcelSubmit}>
                  <div className="h2 mt-2 m-3 text-center text-dark pt-3">
                    ພັດສະດຸນີ້ ບໍ່ໄດ້ຢູ່ໃນສາງ
                  </div>

                  <div className="text-center text-dark h5">
                    <Link to="/dashboard/parcel/receive-parcel">
                      ຮັບພັດສະດຸ
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {showParcel &&
          warehouse_now !== user.branch_code &&
          branch_end === branch.branch_now &&
          status_tracking === "truck" && (
            <div className="row ">
              <div className="col-12">
                <div className="card border-danger mb-3 alert-danger ">
                  <form onSubmit={handleSearchParcelSubmit}>
                    <div className="h2 mt-2 m-3 text-center text-dark pt-3">
                      ພັດສະດຸນີ້ ບໍ່ໄດ້ຢູ່ໃນສາງ
                    </div>

                    <div className="text-center text-dark h5">
                      <Link to="/dashboard/parcel/receive-parcel">
                        ຮັບພັດສະດຸ
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

        {showParcel &&
          branch_end === branch.branch_now &&
          warehouse_now === user.branch_code && (
            <div className="row">
              <div className="col-md-4 col-12"></div>
              <div className="col-md-5 col-lg-3  mb-3 col-12 d-flex justify-content-center">
                <div className="send-box-bill px-1">
                  <div className="title text-center">Cloud Express</div>
                  <div className="customer">
                    <div className="sender">
                      <div className="name">ຜູ້ສົ່ງ:{cus_sender_name}</div>
                      <div className="name">ເບີໂທ: {cus_sender_phone}</div>
                      <div className="name">ທີຢູ່:</div>
                    </div>
                    <div className="receive">
                      <div className="name">ຜູ້ຮັບ: {cus_receive_name}</div>
                      <div className="name">ເບີໂທ: {cus_receive_phone}</div>
                      <div className="name">ທີຢູ່: {address_receive}</div>
                    </div>
                  </div>
                  <div className="to_branch">
                    <div className="start">
                      <div className="">{branch_start_join[0].name}</div>
                      <div className="">{branch_start}</div>
                    </div>
                    <div className="start">
                      <FontAwesomeIcon icon="fa-solid fa-truck-fast" />
                    </div>
                    <div className="end">
                      <div className="">{branch_end_join[0].name}</div>
                      <div className="">{branch_end}</div>
                    </div>
                  </div>
                  <div className="customer">
                    <div className="sender">
                      <div className="name">
                        ຕົ້ນທາງ:
                        <span className="float-end me-1">
                          {" "}
                          {payment_type === "pay_start" &&
                            Number(shipping_cost).toLocaleString() + " ກີບ"}
                        </span>
                      </div>
                    </div>
                    <div className="receive">
                      <div className="name">
                        ປາຍທາງ:
                        <span className="float-end">
                          {payment_type !== "pay_start" &&
                            Number(shipping_cost).toLocaleString() + " ກີບ"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="cod">
                    <span>COD : </span>
                    <span className="float-end">
                      {totalCod(
                        COD.cod_lak,
                        COD.cod_thb,
                        COD.cod_usd
                      ).toLocaleString()}
                      {currencyCod(currency_cod)}
                      {/* {currencyCod(cod_join[0].currency_cod)} */}
                      {}
                      {/* {currency_cod === "thb"
                        ? "( " +
                          Number(exchange_thb) +
                          " ) * " +
                          " " +
                          Number(cod).toLocaleString() +
                          " ບາດ"
                        : currency_cod === "usd"
                        ? "( " +
                          Number(exchange_usd) +
                          " ) * " +
                          " " +
                          Number(cod).toLocaleString() +
                          " ໂດລາ"
                        : Number(cod).toLocaleString() + " ກີບ"} */}
                    </span>
                  </div>
                  <div className="sum"></div>
                  <div className="detail">
                    <div className="parcel">
                      <div className="text-1">
                        <div className="">ປະເພດເຄື່ອງ : </div>
                        <div className="">ຂະໜາດ : </div>
                        <div className="">
                          {parcel_type === "general" ? "ນ້ຳໝັກ :" : "ຈຳນວນ :"}
                        </div>
                      </div>
                      <div className="text-2">
                        <div className="">{parcelType(parcel_type)}</div>
                        <div className="">
                          {parcel_type !== "general" ? "-" : box_size}
                        </div>
                        <div className="">
                          {parcel_type !== "general"
                            ? parcel_weight
                            : parcel_weight + " kg"}
                        </div>
                      </div>
                    </div>
                    <div className="qr">
                      <QRCode size={50} value={serial_parcel} />
                      <div className="">{serial_parcel}</div>
                      <div className="">
                        {moment(createdAt).format("YYYY-MM-DD H:m:s")}
                      </div>
                    </div>
                  </div>
                  <div className="comment">
                    <span className="c_comment line-break">
                      ໝາຍເຫດ {comment}
                    </span>
                    :
                  </div>
                  <div className="info_branch">
                    <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                    <span className="ms-1">
                      {branch_end_join[0].village +
                        ", " +
                        city_join[0].name +
                        ", " +
                        province_join[0].name}
                    </span>
                    <div className="">
                      <FontAwesomeIcon icon="fa-solid fa-mobile-retro" />:
                      <span className="ms-1">
                        {userbranch_end_join[0].phone}
                      </span>
                    </div>
                  </div>
                  <div className="text-center ">ຂໍຂອບໃຈ ທີ່ໃຊ້ບໍລິການ</div>
                </div>
              </div>
              <div className="col-md-3 col-lg-2 col-12"></div>

              <div className="col-md-4"></div>

              <div className="col-md-5 col-lg-3">
                <div className="card border-warning">
                  <form onSubmit={handleUpdateParcelStatus}>
                    {status_parcel === "waite" && (
                      <div className="row m-2">
                        <div className="col-7">
                          <button className="btn btn-success col-12">
                            ຮັບເງິນ
                          </button>
                        </div>
                        <div className="col-5">
                          <Link
                            to="/dashboard/parcel/add"
                            className="btn btn-warning col-12"
                          >
                            ຕີກັບ
                          </Link>
                        </div>
                      </div>
                    )}
                    {status_parcel !== "waite" && (
                      <div className="row m-2">
                        <p className="text-danger text-center">
                          ໃບບິນນີ້ຮັບເງິນແລ້ວ
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              <div className="col-md-4"></div>
            </div>
          )}
      </div>

      {showParcel && branch_end !== branch.branch_now && (
        <div className="container ">
          <div className="card border-danger mb-3 alert-danger ">
            <form onSubmit={handleSearchParcelSubmit}>
              <div className="h2 mt-2 m-3 text-center text-dark pt-3">
                ພັດສະດຸນີ້ ບໍ່ໄດ້ຢູ່ໃນຄວາມຮັບຜິດຊອບຂອງທ່ານ
              </div>

              <div className="text-center text-dark h5">
                ກະລຸນານຳສົ່ງສາຂາ
                <span className="text-danger">
                  {" " + branch_end_join[0].name + " "}
                </span>
                {"( " + branch_end_join[0].branch_code + " )"}
              </div>
            </form>
          </div>
        </div>
      )}
      {noData && (
        <div>
          <div className="d-flex justify-content-center mt-5">
            <h3 className="text-danger">ບໍ່ພົບລາຍການ</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default SendParcel;
