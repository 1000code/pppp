import React, { useEffect, useState } from "react";
import Alert from "../../Components/Alert";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import NumberFormat from "react-number-format";
import moment from "moment";
import { Notice } from "../../Components/Notice";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parcelType } from "../../Functions/Functions";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { useSelector } from "react-redux";

import { getCustomerByPhone } from "../../API/Customer";
import { getAllProvinces, getCityByP_poste } from "../../API/Address";
import { getBranchesByC_poste } from "../../API/Branches";
import {
  getAllChargeSpecial,
  getAllChargeGeneral,
  getAllChargeFruit,
  getAllChargeByWeight,
  getAllChargeAnimal,
  getGeneralChargeStart,
} from "../../API/Charge";

import { getSerialParcel, setNewParcel } from "../../API/Parcel";

import { getLastExchangeRate } from "../../API/ExchangeRate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddParcel = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const _date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const _today = moment(new Date()).format("YYYY-MM-DD");

  const [checkCOD, setCheckCOD] = useState(true);
  const [exchangeRate, setExchangeRate] = useState([]);
  const [branches, setBranches] = useState([]);
  const [chargeStart, setChargeStart] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [dateNow, setDateNow] = useState("");
  const [load, setLoad] = useState(false);

  const [chargeGeneral, setChargeGeneral] = useState([]);
  const [chargeWeight, setChargeWeight] = useState([]);
  const [chargeSpecial, setChargeSpecial] = useState([]);
  const [chargeAnimal, setChargeAnimal] = useState([]);
  const [chargeFruit, setChargeFruit] = useState([]);
  const [infoSerial, setInfoSerial] = useState({
    branch_code: "",
    type: "",
  });

  const [serialParcel, setSerialParcel] = useState("");

  const [showInfoCustomer, setShowInfoCustomer] = useState(false);
  const [btnAddCustomer, setBtnAddCustomer] = useState(false);

  // ---------------------------------------
  const [customerSender, setCustomerSender] = useState({
    phone: "",
  });
  const { phone } = customerSender;

  // ------------------ material modal ----------------
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [infoSender, setInfoSender] = useState([]);

  // -------------- parcel ----------------------
  const [provinces, setProvinces] = useState([]);
  const [city, setCity] = useState([]);
  const [delivery, setDelivery] = useState("branch");
  const [exchange, setExchange] = useState({
    _exchange_thb: "",
    _exchange_usd: "",
  });

  const { _exchange_thb, _exchange_usd } = exchange;

  const [parcel, setParcel] = useState({
    user_id: "",
    serial_parcel: "",
    serial_bag: "",
    cus_receive_name: "",
    cus_receive_phone: "",
    status_tracking: "",
    cus_sender_name: "",
    cus_sender_phone: "",

    express_type: "branch",
    p_poste: "",
    c_poste: "",
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
    currency_express: "lak",
    exchange_thb: "",
    exchange_usd: "",
    comment: "",
    branch_type: user.user_type,

    //========================
    today: "",
    cod: "",
    currency_cod: "",
    phone_branch_end: "",
    village_name: "",
    city_name: "",
    province_name: "",
    created_at: "",
  });

  const {
    user_id,
    serial_parcel,
    serial_bag,
    cus_receive_name,
    cus_receive_phone,

    cus_sender_name,
    cus_sender_phone,

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
    exchange_thb,
    exchange_usd,
    comment,
    today,
    cod,
    currency_cod,

    phone_branch_end,
    village_name,
    city_name,
    province_name,
    created_at,
  } = parcel;

  //######################################################

  useEffect(() => {
    setInfoSerial({
      ...infoSerial,
      branch_code: user.branch_code.substr(0, 3),
      type: "p",
    });
  }, [showInfoCustomer, parcel]);

  const handleChangeCOD = (e) => {
    setCheckCOD(e);
    if (!e) {
      setParcel({ ...parcel, currency_cod: "", cod: "" });
    }
  };

  const handleSubmitCheckCustomer = (e) => {
    e.preventDefault();

    if (phone === "") {
      Alert("error", "ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ");
    } else if (!Number(phone)) {
      Alert("error", " ໝາຍເລກໂທລະສັບ ຕ້ອງເປັນຕົວເລກເທົານັ້ນ");
    } else if (phone.length < 10) {
      Alert("error", " ໝາຍເລກໂທລະສັບ ບໍ່ຄົບ");
    } else {
      setDateNow(_date);

      getCustomerByPhone(phone, token)
        .then((res) => {
          setInfoSender(res.data[0]);

          const min = 1000;
          const max = 9999;
          const _cancel_code =
            Math.floor(Math.random() * (max - min + 1)) + min;

          if (res.data.length >= 1) {
            setShowInfoCustomer(true);
            setBtnAddCustomer(false);
            setParcel({
              ...parcel,
              today: _today,
              created_at: _date,
              exchange_thb: _exchange_thb,
              exchange_usd: _exchange_usd,
              cancel_code: _cancel_code,
              branch_start: user.branch_code,
              location_parcel: user.branch_code,
              cus_sender_name: res.data[0].name,
              cus_sender_phone: res.data[0].phone,
              get_cod: res.data[0].get_cod,
              customer_sender_id: res.data[0]._id,
            });

            getSerialParcel(infoSerial, token)
              .then((res) => {
                setSerialParcel(res.data);
              })
              .catch((err) => {
                Alert("error", err.response.data.error);
              });
            getGeneralChargeStart(token)
              .then((res) => {
                setChargeStart(res.data);
              })
              .catch((err) => {
                Alert("error", err.response.data.error);
              });

            getAllProvinces(token)
              .then((res) => {
                setProvinces(res.data);
              })
              .catch((err) => {
                Alert("error", err.response.data.error);
              });
          } else {
            setShowInfoCustomer(false);
            setOpen(true);
          }
        })
        .catch((err) => {
          Alert("error", err.response.data.error);
          setShowInfoCustomer(false);
        });

      // --------------- call function get Charge ------------------------
      handleChangeTypeExpress("general");
    }
  };

  //------------------------ calculate cod and shipping  ----------------------------------
  const calculateCod = (
    payment_type,
    currency_cod,
    cod,
    shipping_cost,
    exchange_thb,
    exchange_usd
  ) => {
    if (payment_type === "pay_end" && currency_cod === "thb") {
      setTotalPrice(Number(exchange_thb) * Number(cod) + Number(shipping_cost));
    } else if (payment_type === "pay_end" && currency_cod === "usd") {
      setTotalPrice(Number(exchange_usd) * Number(cod) + Number(shipping_cost));
    } else if (payment_type === "pay_end" && currency_cod === "lak") {
      setTotalPrice(Number(cod) + Number(shipping_cost));
    } else if (payment_type === "pay_start" && currency_cod === "thb") {
      setTotalPrice(Number(exchange_thb) * Number(cod));
    } else if (payment_type === "pay_start" && currency_cod === "usd") {
      setTotalPrice(Number(exchange_usd) * Number(cod));
    } else if (payment_type === "pay_start" && currency_cod === "lak") {
      setTotalPrice(Number(cod));
    }
  };

  const handlePhoneChange = (e) => {
    setCustomerSender({ ...customerSender, [e.target.name]: e.target.value });
  };

  const handleProvinceChange = async (e) => {
    let _p_poste = e.target.value;
    await LoadCity(_p_poste, token);
    _calculator(box_size, parcel_weight, _p_poste);
  };

  const handleParcelChange = (e) => {
    if (e.target.name === "parcel_type") {
      handleChangeTypeExpress(e.target.value);
    } else if (e.target.name === "box_size") {
      _calculator(e.target.value, parcel_weight, p_poste);
    } else if (e.target.name === "branch_end") {
      const arrBranch = e.target.value.split("|");
      setParcel({
        ...parcel,
        name_branch_end: arrBranch[0],
        branch_end: arrBranch[1],
        phone_branch_end: arrBranch[2],
        village_name: arrBranch[3],
        city_name: arrBranch[4],
        province_name: arrBranch[5],
      });
    } else if (e.target.name === "box_size") {
      _calculator(e.target.value, parcel_weight, p_poste);
    } else {
      setParcel({ ...parcel, [e.target.name]: e.target.value });
    }
  };

  const LoadCity = (p_poste, token) => {
    getCityByP_poste(p_poste, token)
      .then((res) => {
        setCity(res.data);

        setParcel({
          ...parcel,
          user_id: user.id,
          serial_parcel: serialParcel,
          p_poste: p_poste,
          c_poste: res.data[0].c_poste,
          status_tracking: user.status_tracking,
        });
      })
      .catch((err) => {
        Alert(err.response.data.error);
      });
  };

  const handleCityChange = (e) => {
    setParcel({ ...parcel, c_poste: e.target.value });
    _getBranchByC_poste(e.target.value, token);
    // --------------------------------------------
  };

  const _getBranchByC_poste = (c_poste, token) => {
    c_poste !== "" &&
      getBranchesByC_poste(c_poste, token)
        .then((res) => {
          setBranches(res.data);
        })
        .catch((err) => {
          Alert(err.response.data.error);
        });
  };

  const handleChangeTypeExpress = (parcel_type) => {
    setParcel({
      ...parcel,
      parcel_weight: "",
      box_size: "",
      parcel_type: parcel_type,
    });

    if (parcel_type === "animal") {
      getAllChargeAnimal(token)
        .then((res) => {
          setChargeAnimal(res.data);

          setChargeFruit([]);
          setChargeSpecial([]);
          setChargeGeneral([]);
          setChargeWeight([]);
          setShowPrice("");
        })
        .catch((err) => {
          Alert(err.response.data.error);
        });
    } else if (parcel_type === "fruit") {
      getAllChargeFruit(token)
        .then((res) => {
          setChargeFruit(res.data);

          setChargeAnimal([]);
          setChargeSpecial([]);
          setChargeGeneral([]);
          setChargeWeight([]);
          setShowPrice("");
        })
        .catch((err) => {
          Alert(err.response.data.error);
        });
    } else if (parcel_type === "special") {
      getAllChargeSpecial(token)
        .then((res) => {
          setChargeSpecial(res.data);

          setChargeFruit([]);
          setChargeAnimal([]);
          setChargeGeneral([]);
          setChargeWeight([]);
          setShowPrice("");
        })
        .catch((err) => {
          Alert(err.response.data.error);
        });
    } else {
      getAllChargeGeneral(token)
        .then((res) => {
          setChargeGeneral(res.data);
          setChargeFruit([]);
          setChargeAnimal([]);
          setChargeSpecial([]);
          setShowPrice("");
        })
        .catch((err) => {
          Alert(err.response.data.error);
        });

      getAllChargeByWeight(token)
        .then((res) => {
          setChargeWeight(res.data);
          setChargeFruit([]);
          setChargeAnimal([]);
          setChargeSpecial([]);
          setShowPrice("");
        })
        .catch((err) => {
          Alert(err.response.data.error);
        });
    }
  };

  const handleChangeDelivery = (e) => {
    setDelivery(e.target.value);
    setParcel({ ...parcel, express_type: e.target.value });
  };

  // ======================== calculator shipping cost =====================================
  const [showPrice, setShowPrice] = useState(null);

  const _calculator = async (box_size, parcel_weight, p_poste) => {
    setShowPrice(null);
    const p_poste_start = user.p_poste;

    let total = 0;

    const _calcChargeGeneral = () => {};

    if (chargeGeneral.length > 0 && chargeWeight.length > 0) {
      const _weight = 30;

      if (parcel_weight <= _weight) {
        chargeGeneral.map((item) => {
          if (
            (Number(box_size) >= item.size &&
              Number(parcel_weight) <= item.weight &&
              p_poste === p_poste_start) ||
            (Number(box_size) <= item.size &&
              Number(parcel_weight) >= item.weight &&
              p_poste === p_poste_start)
          ) {
            total = item.price_in_province;
            setShowPrice(total);
            setParcel({
              ...parcel,
              shipping_cost: total,
              box_size: box_size,
              parcel_weight: parcel_weight,
            });
          } else if (
            (Number(box_size) >= item.size &&
              Number(parcel_weight) <= item.weight &&
              p_poste !== p_poste_start) ||
            (Number(box_size) <= item.size &&
              Number(parcel_weight) >= item.weight &&
              p_poste !== p_poste_start)
          ) {
            total = item.price_out_province;
            setShowPrice(total);
            setParcel({
              ...parcel,
              shipping_cost: total,
              box_size: box_size,
              parcel_weight: parcel_weight,
            });
          }
        });
      } else {
        chargeWeight.map((item) => {
          if (
            Number(parcel_weight) >= item.weight &&
            p_poste === p_poste_start
          ) {
            total = item.price_in_province * parcel_weight;
            setShowPrice(total);
            setParcel({
              ...parcel,
              shipping_cost: total,
              box_size: box_size,
              parcel_weight: parcel_weight,
            });
          } else if (
            Number(parcel_weight) >= item.weight &&
            p_poste !== p_poste_start
          ) {
            total = item.price_out_province * parcel_weight;
            setShowPrice(total);
            setParcel({
              ...parcel,
              shipping_cost: total,
              box_size: box_size,
              parcel_weight: parcel_weight,
            });
          }
        });
      }
    } else if (chargeFruit.length > 0) {
      chargeFruit.map((item) => {
        // in province
        if (parcel_weight >= item.weight && p_poste === p_poste_start) {
          total =
            item.price * parcel_weight + Number(chargeStart.price_in_province);
          setShowPrice(total);
          setParcel({
            ...parcel,
            shipping_cost: total,
            parcel_weight: parcel_weight,
          });
        }
        // out province
        else if (parcel_weight >= item.weight && p_poste !== p_poste_start) {
          total =
            item.price * parcel_weight + Number(chargeStart.price_out_province);
          setShowPrice(total);
          setParcel({
            ...parcel,
            shipping_cost: total,
            parcel_weight: parcel_weight,
          });
        }
      });
    } else if (chargeAnimal.length > 0) {
      // in province -----------------------------------------
      if (p_poste === p_poste_start) {
        total =
          box_size * parcel_weight + Number(chargeStart.price_in_province);
        setShowPrice(total);
        setParcel({
          ...parcel,
          shipping_cost: total,
          box_size: box_size,
          parcel_weight: parcel_weight,
        });
      }

      // out province  -----------------------------------------
      else {
        total =
          box_size * parcel_weight + Number(chargeStart.price_out_province);
        setShowPrice(total);
        setParcel({
          ...parcel,
          box_size: box_size,
          shipping_cost: total,
          parcel_weight: parcel_weight,
        });
      }
    } else if (chargeSpecial.length > 0) {
      // in province -----------------------------------------
      if (p_poste === p_poste_start) {
        total =
          box_size * parcel_weight + Number(chargeStart.price_in_province);
        setShowPrice(total);
        setParcel({
          ...parcel,
          shipping_cost: total,
          box_size: box_size,
          parcel_weight: parcel_weight,
        });
      }
      // out province  -----------------------------------------
      else {
        total =
          box_size * parcel_weight + Number(chargeStart.price_out_province);
        setShowPrice(total);
        setParcel({
          ...parcel,
          box_size: box_size,
          shipping_cost: total,
          parcel_weight: parcel_weight,
        });
      }
    }
  };

  const handleParcelOnsubmit = (e) => {
    e.preventDefault();

    if (cus_receive_name === "") {
      Alert("error", "ກະລຸນາປ້ອນຊື່ຜູ້ຮັບ");
    } else if (cus_receive_phone === "") {
      Alert("error", "ກະລຸນາປ້ອນເບີໂທຜູ້ຮັບ");
    } else if (cus_receive_phone.length < 10) {
      Alert("error", "ໝາຍເລກໂທລະສັບຍັງບໍ່ຄົບ");
    } else if (express_type === "") {
      Alert("error", "ກະລຸນາປ້ອນປະເພດການຈັດສົ່ງ");
    } else if (p_poste === "") {
      Alert("error", "ກະລຸນາເລືອກແຂວງ");
    } else if (c_poste === "") {
      Alert("error", "ກະລຸນາເລືອກເມືອງ");
    } else if (express_type === "tohome" && address_receive === "") {
      Alert("error", "ກະລຸນາປ້ອນທີ່ຢູ່ຜູ້ຮັບ");
    } else if (branch_end === "") {
      Alert("error", "ກະລຸນາເລືອກສາຂາ");
    } else if (parcel_type === "") {
      Alert("error", "ກະລຸນາເລືອກປະເພດພັດສະດຸ");
    } else if (
      box_size === "" &&
      Number(parcel_weight) < 31 &&
      parcel_type !== "fruit"
    ) {
      Alert("error", "ກະລຸນາປ້ອນຂະໜາດ");
    } else if (
      !Number(box_size) &&
      Number(parcel_weight) < 31 &&
      parcel_type !== "fruit"
    ) {
      Alert("error", "ຂະໜາດກ່ອງຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ");
    } else if (parcel_weight === "") {
    } else if (payment_type === "") {
      Alert("error", "ກະລຸນາເລືອກການຊຳລະເງິນ");
    } else if (checkCOD && cod === "") {
      Alert("error", "ກະລຸນາປ້ອນຈຳນວນເງິນ COD");
    } else if (checkCOD && cod !== "" && currency_cod === "") {
      Alert("error", "ກະລຸນາເລືອກສະກຸນເງິນ COD");
    } else {
      setLoad(true);
      Swal.fire({
        title: "ຕ້ອງການເພີ່ມພັດສະດຸ ຫຼື ບໍ່?",
        icon: "warning",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "ຢືນຢັນ",
        confirmButtonColor: "#ff2000",
        cancelButtonColor: "#b8b8b8",
        cancelButtonText: "ຍົກເລີກ",
      }).then((result) => {
        if (result.isConfirmed) {
          setNewParcel(parcel, token)
            .then((res) => {
              if (res.data.success) {
                setTimeout(() => {
                  window.print();
                  setShowInfoCustomer(false);
                  setCheckCOD(true);
                  setLoad(false);
                  setParcel({
                    user_add: "",
                    serial_parcel: "",
                    serial_bag: "",
                    cus_receive_name: "",
                    cus_receive_phone: "",
                    cus_sender_name: "",
                    cus_sender_phone: "",
                    express_type: "branch",
                    p_poste: "",
                    c_poste: "",
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
                    currency_express: "lak",
                    exchange_thb: "",
                    exchange_usd: "",
                    comment: "",
                    branch_type: user.user_type,
                    //========================
                    cod: "",
                    currency_cod: "",
                    phone_branch_end: "",
                    village_name: "",
                    city_name: "",
                    province_name: "",
                    created_at: "",
                  });
                }, 500);
              } else {
                Notice("error", res.data.error);
                setLoad(false);
              }
            })
            .catch((err) => {
              Notice("error", err.response.data.error);
              setLoad(false);
            });
        } else {
          setLoad(false);
        }
      });
    }
  };

  const checkParcelChangeInput = (parcel_type) => {
    let weight = "ນ້ຳໜັກ";
    let Amount = "ຈຳນວນ";

    if (parcel_type === "general" || parcel_type === "fruit") {
      return weight;
    } else {
      return Amount;
    }
  };

  return (
    <>
      <div className="d-print container">
        {!showInfoCustomer && (
          <form onSubmit={handleSubmitCheckCustomer}>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-body mt-3 border-3 border-warning">
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <div className="h3 text-danger">ຜູ້ສົ່ງພັດສະດຸ</div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-5 col-12">
                      <label className="form-label">ໝາຍເລກ ໂທລະສັບ :</label>
                      <div className="input-group">
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="20xxxxxxxx"
                          onChange={handlePhoneChange}
                          maxLength={10}
                        />
                        <button
                          className="btn btn-outline-danger"
                          type="submit"
                        >
                          ຄົ້ນຫາ
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
        {showInfoCustomer && (
          <>
            <form onSubmit={(e) => handleParcelOnsubmit(e)}>
              <div className="row ">
                <div className="col-md-12 mt-3">
                  <div className="card card-body border-warning border-3">
                    <div className="col-md-12 mb-2">
                      <div className="h3 text-danger">ຂໍ້ມູນຜູ້ສົ່ງ</div>
                    </div>
                    <div className="d-flex">
                      <div className="box-left">
                        <div className="mr-3 mb-2">ຊື່</div>
                        <div className="mr-3 mb-2">ເບີໂທ</div>
                        <div className="mr-3 mb-2">ທີ່ຢູ່</div>
                      </div>

                      <div className="box-right">
                        <div className="text-muted mb-2">
                          <span>: </span>
                          {infoSender.name}
                        </div>
                        <div className="text-muted mb-2">
                          <span>: </span>
                          {infoSender.phone}
                        </div>
                        <div className="text-muted mb-2">
                          <span>: </span>
                          {infoSender.village +
                            ", " +
                            infoSender.city[0].name +
                            ", " +
                            infoSender.province[0].name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mt-3">
                  <div className="card card-body ">
                    <div className="row">
                      <div className="col-md-12 mb-2">
                        <div className="h3 text-danger">ຜູ້ຮັບພັດສະດຸ</div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">
                          ຊື່ຜູ້ຮັບ <span className="text-danger">*</span>
                        </label>
                        <input
                          autoComplete="off"
                          name="cus_receive_name"
                          type="text"
                          className="form-control"
                          onChange={handleParcelChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">
                          ເບີໂທລະສັບ <span className="text-danger">*</span>
                        </label>
                        <input
                          name="cus_receive_phone"
                          type="text"
                          className="form-control"
                          maxLength={10}
                          onChange={handleParcelChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">
                          ການຈັດສົ່ງ <span className="text-danger">*</span>
                        </label>
                        <select
                          name="express_type"
                          className="form-control"
                          defaultValue={"branch"}
                          onChange={handleChangeDelivery}
                        >
                          <option value="branch">ສົ່ງສາຂາ</option>
                          <option disabled value="tohome">
                            ສົ່ງຮອດເຮືອນ
                          </option>
                        </select>
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">
                          ແຂວງ <span className="text-danger">*</span>
                        </label>
                        <select
                          name="p_post"
                          className="form-control"
                          defaultValue={"province"}
                          onChange={handleProvinceChange}
                        >
                          <option disabled value="province">
                            --- ເລືອກ ---
                          </option>
                          {provinces.map((item) => (
                            <option key={item._id} value={item.p_poste}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">
                          ເມືອງ <span className="text-danger">*</span>
                        </label>
                        <select
                          name="c_post"
                          className="form-control"
                          defaultValue={"city"}
                          onChange={handleCityChange}
                        >
                          <option value="city">--- ເລືອກ ---</option>
                          {city.map((item) => (
                            <option key={item._id} value={item.c_poste}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label">ທີ່ຢູ່ </label>
                        <input
                          disabled={delivery === "branch"}
                          name="address_receive"
                          type="text"
                          className="form-control"
                          onChange={handleParcelChange}
                        />
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">
                          ຈຸດບໍລິການ,ສາຂາ <span className="text-danger">*</span>
                        </label>
                        <select
                          name="branch_end"
                          className="form-control"
                          defaultValue={"default_branch"}
                          onChange={handleParcelChange}
                        >
                          <option value="default_branch">--- ເລືອກ ---</option>
                          {branches.map((item) => (
                            <option
                              disabled={!item.active}
                              key={item._id}
                              value={
                                item.name +
                                "|" +
                                item.branch_code +
                                "|" +
                                item.user_join[0].phone +
                                "|" +
                                item.village +
                                "|" +
                                item.city_join[0].name +
                                "|" +
                                item.province_join[0].name
                              }
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-body mt-3">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">
                      ປະເພດພັດສະດຸ <span className="text-danger">*</span>
                    </label>
                    <select
                      name="parcel_type"
                      className="form-select"
                      defaultValue={"default"}
                      onChange={(e) => {
                        handleParcelChange(e);
                      }}
                    >
                      <option value="general">ສິນຄ້າທົ່ວໄປ</option>
                      <option value="animal">ສັດລ້ຽງ</option>
                      <option value="fruit">ຜັກ ໝາກໄມ້</option>
                      <option value="special">ສິນຄ້າ ພິເສດ</option>
                    </select>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">
                      ຂະໜາດ <span className="text-danger">*</span>
                    </label>
                    {chargeGeneral.length > 0 || parcel_type === "general" ? (
                      <NumberFormat
                        type="text"
                        name="box_size"
                        min={35}
                        placeholder="... cm"
                        className="form-control"
                        thousandSeparator={false}
                        onValueChange={(values) => {
                          const { value } = values;
                          setParcel({ ...parcel, box_size: value });
                          _calculator(value, parcel_weight, p_poste);
                        }}
                      />
                    ) : chargeAnimal.length > 0 || parcel_type === "animal" ? (
                      <select
                        name="box_size"
                        className="form-select"
                        defaultValue={"default"}
                        onChange={handleParcelChange}
                      >
                        <option value="default">--- ເລືອກ ---</option>
                        {chargeAnimal.map((item) => (
                          <option key={item._id} value={item.price}>
                            {item.name + " ( " + item.size + ")"}
                          </option>
                        ))}
                      </select>
                    ) : chargeSpecial.length > 0 ||
                      parcel_type === "special" ? (
                      <select
                        name="box_size"
                        className="form-select"
                        defaultValue={"default"}
                        onChange={handleParcelChange}
                      >
                        <option value="default">--- ເລືອກ ---</option>
                        {chargeSpecial.map((item) => (
                          <option key={item._id} value={item.price}>
                            {item.name + " ( " + item.size + ")"}
                          </option>
                        ))}
                      </select>
                    ) : (
                      chargeFruit.length > 0 && (
                        <select
                          disabled
                          name="box_size"
                          className="form-select"
                          defaultValue={"default"}
                        ></select>
                      )
                    )}
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">
                      {checkParcelChangeInput(parcel_type)}
                      <span className="text-danger">*</span>
                    </label>

                    <input
                      autoComplete="off"
                      name="parcel_weight"
                      type="number"
                      min={0}
                      value={parcel_weight}
                      className="form-control"
                      onChange={(e) => {
                        handleParcelChange(e);
                        _calculator(box_size, e.target.value, p_poste);
                      }}
                    />
                  </div>

                  <div className="col-md-2 mb-3">
                    <label className="form-label">ລາຄາຂົນສົ່ງ </label>
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      value={Number(showPrice).toLocaleString()}
                    />
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">
                      ເກັບຄ່າຂົນສົ່ງ <span className="text-danger">*</span>
                    </label>
                    <select
                      name="payment_type"
                      className="form-select"
                      defaultValue={"lak"}
                      onChange={(e) => {
                        handleParcelChange(e);
                        calculateCod(
                          e.target.value,
                          currency_cod,
                          cod,
                          shipping_cost,
                          exchange_thb,
                          exchange_usd
                        );
                      }}
                    >
                      <option value="pay_start">ຕົ້ນທາງ</option>
                      <option value="pay_end">ປາຍທາງ</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">ໝາຍເຫດ</label>
                    <input
                      name="comment"
                      maxLength={190}
                      className="form-control"
                      placeholder="ໝາຍເຫດ"
                      onChange={(e) => handleParcelChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="card card-body">
                    <div className="row mb-2">
                      <div className="col-md-4">
                        <div className="h3 text-danger">ເກັບເງິນປາຍທາງ COD</div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="checkCOD"
                            id="checkCOD1"
                            defaultChecked
                            onChange={() => handleChangeCOD(true)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkCOD1"
                          >
                            ເກັບ
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="checkCOD"
                            onChange={() => handleChangeCOD(false)}
                            id="checkCOD2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkCOD2"
                          >
                            ບໍ່ເກັບ
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 col-12 mb-3">
                        <label className="form-label">ຈຳນວນເງິນ</label>
                        <NumberFormat
                          autoComplete="off"
                          name="cod"
                          min={0}
                          type="text"
                          className="form-control"
                          disabled={!checkCOD}
                          thousandSeparator={true}
                          onValueChange={(values) => {
                            const { value } = values;
                            setParcel({ ...parcel, cod: value });

                            calculateCod(
                              payment_type,
                              currency_cod,
                              value,
                              shipping_cost,
                              exchange_thb,
                              exchange_usd
                            );
                          }}
                        />
                      </div>
                      <div className="col-md-4 col-12">
                        <label className="form-label">ເລືອກສະກຸນເງິນ</label>
                        <select
                          name="currency_cod"
                          className="form-select"
                          disabled={!checkCOD}
                          defaultValue={"cod"}
                          onChange={(e) => {
                            handleParcelChange(e);
                            calculateCod(
                              payment_type,
                              e.target.value,
                              cod,
                              shipping_cost,
                              exchange_thb,
                              exchange_usd
                            );
                          }}
                        >
                          <option disabled value="cod">
                            --- ເລືອກ ---
                          </option>
                          <option value="lak">ກີບ</option>
                          <option value="thb">ບາດ</option>
                          <option value="usd">ໂດລາ</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-body mt-3 mb-4">
                <div className="row">
                  <div className="col-7">
                    <button
                      className="btn btn-danger btn-lg col-12"
                      disabled={load}
                    >
                      {load ? "ກຳລັງສົ່ງຂໍ້ມູນ...." : "ເພີ່ມພັດສະດຸ"}
                    </button>
                  </div>
                  <div className="col-5">
                    <button
                      type="reset"
                      className="btn btn-warning btn-lg col-12"
                      disabled={load}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              <div className="space"></div>
            </form>

            {/* ---------------- print bill ------------------ */}
          </>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h4 className={" text-danger text-center"}>
              ໝາຍເລກໂທລະສັບ ບໍ່ມີໃນລະບົບ
            </h4>
            <p className={"text-center"}>ຕ້ອງການລົງທະບຽນ ລູກຄ້າໃໝ່ ຫຼື ບໍ່ ?</p>
            <div className="d-flex justify-content-evenly">
              <div onClick={handleClose} className={"btn text-danger"}>
                ບໍ່ຕ້ອງການ
              </div>
              <Link
                to={"/dashboard/customer/add/" + phone}
                className={"btn text-success"}
              >
                ຕ້ອງການ
              </Link>
            </div>
          </Box>
        </Modal>
      </div>
      {parcel.cus_sender_name && (
        <div className="container-print">
          <div className="box-bill">
            <div className="title text-center">Cloud Express</div>
            <div className="customer">
              <div className="sender">
                <div className="name">ຜູ້ສົ່ງ: {infoSender.name} </div>
                <div className="name">ເບີໂທ: {infoSender.phone} </div>
                <div className="name">ທີຢູ່: </div>
              </div>
              <div className="receive">
                <div className="name">ຜູ້ຮັບ: {cus_receive_name}</div>
                <div className="name">ເບີໂທ: {cus_receive_phone}</div>
                <div className="name">ທີຢູ່: </div>
              </div>
            </div>
            <div className="to_branch">
              <div className="start">
                <div className="">{user.name}</div>
                <div className="">{user.branch_code}</div>
              </div>
              <div className="start">
                <FontAwesomeIcon icon="fa-solid fa-truck-fast" />
              </div>
              <div className="end">
                <div className="">{name_branch_end}</div>
                <div className="">{branch_end}</div>
              </div>
            </div>
            <div className="customer">
              <div className="sender">
                <div className="name">
                  ຕົ້ນທາງ:
                  <span className="float-end me-1">
                    {payment_type === "pay_start" &&
                      Number(shipping_cost).toLocaleString()}
                    ກີບ
                  </span>
                </div>
              </div>
              <div className="receive">
                <div className="name">
                  ປາຍທາງ:
                  <span className="float-end">
                    {payment_type === "pay_end" &&
                      Number(shipping_cost).toLocaleString()}{" "}
                    ກີບ
                  </span>
                </div>
              </div>
            </div>
            <div className="cod">
              <span>COD :</span>
              <span className="float-end">
                {Number(cod).toLocaleString()}
                {currency_cod === "lak"
                  ? " ກີບ"
                  : currency_cod === "thb"
                  ? " ບາດ"
                  : currency_cod === "usd"
                  ? " ໂດລາ"
                  : ""}
              </span>
            </div>
            <div className="sum">
              {/* <span>ລວມ :</span>
            <span className="float-end">
              {payment_type === "pay_start"
                ? "-"
                : Number(shipping_cost).toLocaleString() + " ກີບ"}
            </span> */}
            </div>
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
                <QRCode value={serial_parcel} size={50} />
                <div className="">{serial_parcel}</div>
                <div className=""> {dateNow}</div>
              </div>
            </div>
            <div className="comment">
              <span className="c_comment">ໝາຍເຫດ </span>: {comment}
            </div>
            <div className="info_branch">
              <FontAwesomeIcon icon="fa-solid fa-location-dot" />
              <span> ປາຍທາງ : </span>
              <span className="ms-1">
                {village_name + ", " + city_name + ", " + province_name}
              </span>
              <div className="">
                <FontAwesomeIcon icon="fa-solid fa-mobile-retro" />:{" "}
                {phone_branch_end}
              </div>
            </div>
            <div className="text-center ">ຂໍຂອບໃຈ ທີ່ໃຊ້ບໍລິການ</div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddParcel;
