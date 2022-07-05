import React, { useLayoutEffect, useState } from "react";
import Alert from "../../Components/Alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import NumberFormat from "react-number-format";
import moment from "moment";
import { Notice } from "../../Components/Notice";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { currencyCOD, parcelType } from "../../Functions/Functions";

import { useSelector } from "react-redux";

import { getAllProvinces, getCityByP_poste } from "../../API/Address";
import { getBranchesByC_poste } from "../../API/Branches";
import {
  getAllChargeSpecial,
  getAllChargeGeneral,
  getAllChargeFruit,
  getAllChargeByWeight,
  getAllChargeAnimal,
} from "../../API/Charge";

import {
  getParcelForResent,
  getSerialParcel,
  setResentParcel,
} from "../../API/Parcel";

const Resent = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const param = useParams();
  const navigate = useNavigate();

  const _date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const _today = moment(new Date()).format("YYYY-MM-DD");

  const initialState = {
    serial_parcel: param.serialParcel,
    cancel_parcel: false,
    warehouse_now: user.branch_code,
    branch_code: user.branch_code.substr(0, 3),
    type: "p",
  };

  const [getData, setGetData] = useState(initialState);
  const [oldParcel, setOldParcel] = useState([]);
  const [newParcel, setNewParcel] = useState({
    serial_parcel: null,
    old_serial_parcel: null,
    user_id: null,
    cus_receive_name: null,
    cus_receive_phone: null,
    status_tracking: null,
    cus_sender_name: null,
    cus_sender_phone: null,

    express_type: null,
    p_poste: null,
    c_poste: null,
    address_receive: null,
    branch_start: null,
    location_parcel: null,
    branch_end: null,
    name_branch_end: null,
    branch_end_village_name: null,
    branch_end_branch_end_city_name: null,
    branch_end_province_name: null,
    parcel_type: null,
    box_size: null,
    parcel_weight: null,
    shipping_cost: null,
    payment_type: null,
    id_rider: null,
    cancel_code: null,
    cancel_parcel: null,
    currency_express: null,

    exchange_thb: null,
    exchange_usd: null,
    comment: null,
    branch_type: null,

    //========================
    today: null,
    cod: null,
    phone_branch_end: null,
    village_name: null,
    city_name: null,
    province_name: null,

    cod: null,
    currency_cod: null,
    get_cod: false,
    createdAt: Date.now(),
    created_at: _date,
    customer_sender_id: null,
  });
  const [infoSerial, setInfoSerial] = useState(initialState);
  const [serialParcel, setSerialParcel] = useState("");
  const [showBill, setShowBill] = useState(false);
  const [showNoParcel, setShowNoParcel] = useState(false);
  const [getCOD, setGetCOD] = useState(false);
  const [sent, setSent] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [city, setCity] = useState([]);
  const [branches, setBranches] = useState([]);
  const [load, setLoad] = useState(false);
  const [checkSubmit, setCheckSubmit] = useState({
    p_poste: null,
    c_poste: null,
    branch_end: null,
    cod: null,
    currency_cod: null,
  });

  const [chargeGeneral, setChargeGeneral] = useState([]);
  const [chargeWeight, setChargeWeight] = useState([]);
  const [chargeSpecial, setChargeSpecial] = useState([]);
  const [chargeAnimal, setChargeAnimal] = useState([]);
  const [chargeFruit, setChargeFruit] = useState([]);

  const [chargeStart, setChargeStart] = useState({
    price_in_province: 0,
    price_out_province: 0,
  });

  useLayoutEffect(() => {
    _getSerialParcel(getData, user.token);
    _getParcelForResent(getData, user.token);
    _loadProvince(user.token);
  }, []);

  const _getSerialParcel = (data, token) => {
    getSerialParcel(data, token)
      .then((res) => {
        setNewParcel({ ...newParcel, serial_parcel: res.data });
      })
      .catch((err) => {
        Alert("error", err.response.data.error);
      });
  };

  const _loadAllCharge = (parcel_type, token) => {
    getAllChargeGeneral(token)
      .then((res) => {
        setChargeGeneral(res.data);
        setChargeStart({
          ...chargeStart,
          price_in_province: res.data[0].price_in_province,
          price_out_province: res.data[0].price_out_province,
        });
      })
      .catch((err) => {
        Alert("error", err.response.data.error);
      });

    if (parcel_type === "special") {
      getAllChargeSpecial(token)
        .then((res) => {
          setChargeSpecial(res.data);
        })
        .catch((err) => {
          Alert("error", err.response.data.error);
        });
    } else if (parcel_type === "fruit") {
      getAllChargeFruit(token)
        .then((res) => {
          setChargeFruit(res.data);
        })
        .catch((err) => {
          Alert("error", err.response.data.error);
        });
    } else if (parcel_type === "weight") {
      getAllChargeByWeight(token)
        .then((res) => {
          setChargeWeight(res.data);
        })
        .catch((err) => {
          Alert("error", err.response.data.error);
        });
    } else if (parcel_type === "animal") {
      getAllChargeAnimal(token)
        .then((res) => {
          setChargeAnimal(res.data);
        })
        .catch((err) => {
          Alert("error", err.response.data.error);
        });
    }
  };

  const _getParcelForResent = (getData, token) => {
    getParcelForResent(getData, token)
      .then((res) => {
        res.data.length <= 0 && setShowNoParcel(true);
        setOldParcel(res.data);
        if (res.data.length > 0 && res.data[0].cod_join.length > 0) {
          setGetCOD(true);
          _loadAllCharge(res.data[0].parcel_type, user.token);
        } else {
          setGetCOD(false);
        }
      })
      .catch((err) => {
        Notice("error", err.response.data.error);
      });
  };

  const chooseSentParcel = (oldParcel, sent) => {
    setShowBill(true);
    if (sent === "resent") {
      setSent(true);
    }
    if (sent === "return") {
      setSent(false);
    }

    let {
      cus_receive_name,
      cus_receive_phone,
      status_tracking,
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
      currency_express,

      exchange_thb,
      exchange_usd,
      comment,
      branch_type,

      //========================
      today,
      phone_branch_end,
      village_name,
      city_name,
      province_name,
    } = oldParcel[0];

    let _cod = null;
    let _currency_cod = null;
    let _get_cod = true;

    if (oldParcel[0].cod_join.length > 0) {
      if (oldParcel[0].cod_join[0].cod_lak !== null) {
        _cod = oldParcel[0].cod_join[0].cod_lak;
      } else if (oldParcel[0].cod_join[0].cod_thb !== null) {
        _cod = oldParcel[0].cod_join[0].cod_thb;
      } else if (oldParcel[0].cod_join[0].cod_usd !== null) {
        _cod = oldParcel[0].cod_join[0].cod_usd;
      }

      _currency_cod = oldParcel[0].cod_join[0].currency_cod;
      _get_cod = oldParcel[0].cod_join[0].get_cod;

      setCheckSubmit({
        ...checkSubmit,
        cod: _cod,
        currency_cod: oldParcel[0].cod_join[0].currency_cod,
      });
    }

    setNewParcel({
      ...newParcel,

      user_id: user.id,
      status_tracking: user.status_tracking,
      warehouse_now: user.branch_code,
      old_serial_parcel: param.serialParcel,

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

      phone_branch_end: oldParcel[0].branch_start_join.phone,
      name_branch_end: oldParcel[0].branch_start_join.name,
      branch_end_village_name: oldParcel[0].branch_start_join.name,
      branch_end_branch_end_city_name:
        oldParcel[0].branch_start_city_join[0].name,
      branch_end_province_name: oldParcel[0].branch_start_province_join[0].name,

      parcel_type,
      box_size,
      parcel_weight,
      shipping_cost,
      payment_type,
      id_rider,
      cancel_code,
      cancel_parcel,
      currency_express,

      exchange_thb,
      exchange_usd,
      comment,
      branch_type,

      //========================
      today: _today,
      village_name,
      city_name,
      province_name,

      cod: _cod,
      currency_cod: _currency_cod,
      get_cod: _get_cod,
      customer_sender_id: oldParcel[0].customer_join[0]._id,
      createdAt: _date,
      created_at: _today,
    });
  };

  const _setGetCOD = (boolean) => {
    setGetCOD(boolean);

    if (boolean) {
      setNewParcel({
        ...newParcel,
        cod: checkSubmit.cod,
        currency_cod: checkSubmit.currency_cod,
      });
    } else {
      setNewParcel({ ...newParcel, cod: null, currency_cod: null });
    }
  };

  const handleParcelChange = (e) => {
    const arr = e.target.value.split("|");
    const name_branch_end = arr[0];
    const branch_end = arr[1];
    const phone_branch_end = arr[2];
    const branch_end_village_name = arr[3];
    const branch_end_city_name = arr[4];
    const branch_end_province_name = arr[5];

    setNewParcel({
      ...newParcel,
      name_branch_end,
      phone_branch_end,
      branch_end,
      branch_end_village_name,
      branch_end_city_name,
      branch_end_province_name,
    });

    setCheckSubmit({ ...checkSubmit, branch_end });
  };

  const _loadProvince = (token) => {
    getAllProvinces(token)
      .then((res) => {
        setProvinces(res.data);
      })
      .catch((err) => {
        Alert(err.response.data.error);
      });
  };

  const handleProvinceChange = (e) => {
    let _p_poste = e.target.value;
    _loadCity(_p_poste, user.token);
    _calculator(_p_poste);
    setCheckSubmit({ ...checkSubmit, p_poste: e.target.value });
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

  const _loadCity = (p_poste, token) => {
    getCityByP_poste(p_poste, token)
      .then((res) => {
        setCity(res.data);
      })
      .catch((err) => {
        Alert(err.response.data.error);
      });
  };

  const handleCityChange = (e) => {
    setNewParcel({ ...newParcel, c_poste: e.target.value });
    setCheckSubmit({ ...checkSubmit, c_poste: e.target.value });
    _getBranchByC_poste(e.target.value, user.token);
    // --------------------------------------------
  };

  const _calculator = (p_poste) => {
    let parcel_weight = newParcel.parcel_weight;
    let box_size = newParcel.box_size;
    let parcel_type = newParcel.parcel_type;
    let total = 0;

    if (parcel_type === "animal") {
      total = _chargeAnimal(box_size, parcel_weight, p_poste);
    } else if (parcel_type === "fruit") {
      total = _chargeFruit(box_size, parcel_weight, p_poste);
    } else if (parcel_type === "special") {
      total = _chargeSpecial(box_size, parcel_weight, p_poste);
    } else if (parcel_type === "general") {
      if (parcel_weight <= 30) {
        total = _chargeGeneral(box_size, parcel_weight, p_poste);
      } else {
        total = _chargeWeight(box_size, parcel_weight, p_poste);
      }
    }

    setNewParcel({
      ...newParcel,
      shipping_cost: total,
    });
  };

  const _chargeGeneral = (box_size, parcel_weight, p_poste) => {
    const _weight = 30;
    let p_poste_start = user.p_poste;
    let total = 0;

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
          // setShowPrice(total);
        } else if (
          (Number(box_size) >= item.size &&
            Number(parcel_weight) <= item.weight &&
            p_poste !== p_poste_start) ||
          (Number(box_size) <= item.size &&
            Number(parcel_weight) >= item.weight &&
            p_poste !== p_poste_start)
        ) {
          total = item.price_out_province;
          // setShowPrice(total);
        }
      });
    } else {
      chargeWeight.map((item) => {
        if (Number(parcel_weight) >= item.weight && p_poste === p_poste_start) {
          total = item.price_in_province * parcel_weight;
          // setShowPrice(total);
        } else if (
          Number(parcel_weight) >= item.weight &&
          p_poste !== p_poste_start
        ) {
          total = item.price_out_province * parcel_weight;
          // setShowPrice(total);
        }
      });
    }
    return total;
  };

  const _chargeAnimal = (box_size, parcel_weight, p_poste) => {
    let p_poste_start = user.p_poste;
    let total = 0;

    // in province -----------------------------------------
    if (p_poste === p_poste_start) {
      total = box_size * parcel_weight + Number(chargeStart.price_in_province);
      // setShowPrice(total);
      setNewParcel({
        ...newParcel,
        shipping_cost: total,
        box_size: box_size,
        parcel_weight: parcel_weight,
      });
    }

    // out province  -----------------------------------------
    else {
      total = box_size * parcel_weight + Number(chargeStart.price_out_province);
      // setShowPrice(total);
      setNewParcel({
        ...newParcel,
        box_size: box_size,
        shipping_cost: total,
        parcel_weight: parcel_weight,
      });
    }

    return total;
  };

  const _chargeFruit = (box_size, parcel_weight, p_poste) => {
    let p_poste_start = user.p_poste;
    let total = 0;
    chargeFruit.map((item) => {
      if (parcel_weight >= item.weight && p_poste === p_poste_start) {
        total =
          item.price * parcel_weight + Number(chargeStart.price_in_province);
        //setShowPrice(total);
        setNewParcel({
          ...newParcel,
          shipping_cost: total,
          parcel_weight: parcel_weight,
        });
      }
      // out province
      else if (parcel_weight >= item.weight && p_poste !== p_poste_start) {
        total =
          item.price * parcel_weight + Number(chargeStart.price_out_province);
        //setShowPrice(total);
        setNewParcel({
          ...newParcel,
          shipping_cost: total,
          parcel_weight: parcel_weight,
        });
      }
      // out province (amount <= 14)
      // else if (parcel_weight <= _amount && p_poste !== p_poste_start) {
      //   total =
      //     priceAmount14 * parcel_weight + Number(chargeStart.price_out_province);
      //   // setShowPrice(total);
      //   setNewParcel({
      //     ...newParcel,
      //     shipping_cost: total,
      //     parcel_weight: parcel_weight,
      //   });
      // }
      // // out province (amount > 14)
      // else if (parcel_weight > _amount && p_poste !== p_poste_start) {
      //   total =
      //     priceAmount15 * parcel_weight + Number(chargeStart.price_out_province);
      //   // setShowPrice(total);
      //   setNewParcel({
      //     ...newParcel,
      //     shipping_cost: total,
      //     parcel_weight: parcel_weight,
      //   });
      // }
    });

    return total;
  };
  //console.log(chargeFruit);
  const _chargeWeight = (box_size, parcel_weight, p_poste) => {
    const p_poste_start = user.p_poste;
    const _weight = 30;
    let total = 0;

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
          // setShowPrice(total);
        } else if (
          (Number(box_size) >= item.size &&
            Number(parcel_weight) <= item.weight &&
            p_poste !== p_poste_start) ||
          (Number(box_size) <= item.size &&
            Number(parcel_weight) >= item.weight &&
            p_poste !== p_poste_start)
        ) {
          total = item.price_out_province;
          // setShowPrice(total);
        }
      });
    } else {
      chargeWeight.map((item) => {
        if (Number(parcel_weight) >= item.weight && p_poste === p_poste_start) {
          total = item.price_in_province * parcel_weight;
          // setShowPrice(total);
        } else if (
          Number(parcel_weight) >= item.weight &&
          p_poste !== p_poste_start
        ) {
          total = item.price_out_province * parcel_weight;
          // setShowPrice(total);
        }
      });
    }

    return total;
  };

  const _chargeSpecial = (box_size, parcel_weight, p_poste) => {
    let p_poste_start = user.p_poste;
    let total = 0;

    // in province -----------------------------------------
    if (p_poste === p_poste_start) {
      total = box_size * parcel_weight + Number(chargeStart.price_in_province);
      // setShowPrice(total);
      setNewParcel({
        ...newParcel,
        shipping_cost: total,
        box_size: box_size,
        parcel_weight: parcel_weight,
      });
    }
    // out province  -----------------------------------------
    else {
      total = box_size * parcel_weight + Number(chargeStart.price_out_province);
      // setShowPrice(total);
      setNewParcel({
        ...newParcel,
        box_size: box_size,
        shipping_cost: total,
        parcel_weight: parcel_weight,
      });
    }

    return total;
  };

  const handleSubmit = () => {
    if (!load) {
      if (sent && checkSubmit.p_poste === null) {
        Alert("error", "ກະລຸນາເລືອກ ແຂວງ");
      } else if (sent && checkSubmit.c_poste === null) {
        Alert("error", "ກະລຸນາເລືອກ ເມືອງ");
      } else if (sent && checkSubmit.branch_end === null) {
        Alert("error", "ກະລຸນາເລືອກ ຈຸດບໍລິການ");
      } else {
        setLoad(true);
        setResentParcel(newParcel, user.token)
          .then((res) => {
            if (res.data.success) {
              window.print();
              navigate("/dashboard/parcel-in-warehouse");
            } else {
              Alert("error", res.data.error);
            }
          })
          .catch((err) => {
            Alert("error", err.response.data.error);
          });
      }
    }
  };

  return (
    <>
      <div className="container"></div>
      {showNoParcel ? (
        <div className="card card-body mt-5 border border-danger border-2 d-flex justify-content-center align-items-center">
          <div className="text-danger h4 text-center mt-2">
            ໝາຍເລກພັດສະດຸນີ້
          </div>
          <div className="text-center mb-2">​{param.serialParcel}</div>
          <div className="text-center h5 text-danger">ບໍ່ມິໃນລະບົບ</div>
          <Link
            to="/dashboard/parcel-in-warehouse"
            className="btn btn-secondary"
          >
            ກັບຄືນ
          </Link>
        </div>
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-center my-3 gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="return"
                name="sent"
                onChange={() => chooseSentParcel(oldParcel, "return")}
              />
              <label
                className="form-check-label h5 text-danger"
                htmlFor="return"
              >
                ຕີກັບ
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sent"
                id="resent"
                onChange={() => chooseSentParcel(oldParcel, "resent")}
              />
              <label
                className="form-check-label h5 text-danger"
                htmlFor="resent"
              >
                ປ່ຽນສາຂາປາຍທາງ
              </label>
            </div>
          </div>
          {showBill && (
            <>
              {sent && (
                <div className="container mb-3">
                  <div className="row ">
                    <div className="col-12 col-md-4 mb-3">
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
                    <div className="col-12 col-md-4 mb-3">
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
                    <div className="col-12 col-md-4 mb-3">
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
                    <div className="col-auto mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="nocod"
                          name="checkCOD"
                          onChange={() => _setGetCOD(false)}
                          checked={!getCOD}
                        />
                        <label className="form-check-label" htmlFor="nocod">
                          ບໍ່ເກັບ COD
                        </label>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="checkCOD"
                          id="cod"
                          onChange={() => _setGetCOD(true)}
                          checked={getCOD}
                        />
                        <label className="form-check-label" htmlFor="cod">
                          ເກັບ COD
                        </label>
                      </div>
                    </div>
                    <div className="col-12"></div>
                    <div className="col-12 col-md-6 mb-3">
                      <label>ຈຳນວນເງິນ</label>
                      <NumberFormat
                        type="text"
                        name="cod"
                        min={0}
                        disabled={!getCOD}
                        value={newParcel.cod}
                        placeholder="ຈຳນວນເງິນ"
                        className="form-control"
                        thousandSeparator={true}
                        onValueChange={(values) => {
                          const { value } = values;
                          setNewParcel({
                            ...newParcel,
                            cod: value,
                          });
                        }}
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-5">
                      <label>ຈຳນວນເງິນ</label>
                      <select
                        name="currency_cod"
                        className="form-select"
                        defaultValue={newParcel.currency_cod}
                        disabled={!getCOD}
                        onChange={(e) =>
                          setNewParcel({
                            ...newParcel,
                            currency_cod: e.target.value,
                          })
                        }
                      >
                        <option value="lak">ກີບ</option>
                        <option value="thb">ບາດ</option>
                        <option value="usd">ໂດລາ</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="container">
                <div className="row d-print">
                  <div className="col-6 mb-3">
                    <div
                      className="btn-danger btn d-block"
                      onClick={handleSubmit}
                    >
                      {load ? "ກຳລັງສົ່ງຂໍ້ມູນ ..." : "ບັນທຶກ"}
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    {!load ? (
                      <Link
                        to="/dashboard/parcel-in-warehouse"
                        className="btn-secondary btn d-block"
                      >
                        ຍົກເລີກ
                      </Link>
                    ) : (
                      <Link to="" className="btn-secondary btn d-block">
                        ຍົກເລີກ
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="box-billl">
                  <div className="title text-center">Cloud Express</div>
                  <div className="customer">
                    <div className="sender">
                      <div className="name">
                        ຜູ້ສົ່ງ: {newParcel.cus_sender_name}
                      </div>
                      <div className="name">
                        ເບີໂທ: {newParcel.cus_sender_phone}
                      </div>
                      <div className="name">ທີຢູ່: </div>
                    </div>
                    <div className="receive">
                      <div className="name">
                        ຜູ້ຮັບ: {newParcel.cus_receive_name}
                      </div>
                      <div className="name">
                        ເບີໂທ: {newParcel.cus_receive_phone}
                      </div>
                      <div className="name">ທີຢູ່: </div>
                    </div>
                  </div>
                  <div className="to_branch">
                    <div className="start">
                      <div className="">{user.name}</div>
                      <div className="">{user.branch_code}</div>
                    </div>
                    <div className="icon-truck">
                      <FontAwesomeIcon icon="fa-solid fa-truck-fast" />
                    </div>
                    <div className="end">
                      <div className="">{newParcel.name_branch_end}</div>
                      <div className="">{newParcel.branch_end}</div>
                    </div>
                  </div>
                  <div className="customer">
                    <div className="sender">
                      <div className="name">
                        ຕົ້ນທາງ:
                        <span className="float-end me-1">
                          {newParcel.payment_type === "pay_start" &&
                            Number(newParcel.shipping_cost).toLocaleString()}
                          {" ກີບ"}
                        </span>
                      </div>
                    </div>
                    <div className="receive">
                      <div className="name">
                        ປາຍທາງ:
                        <span className="float-end">
                          {newParcel.payment_type === "pay_end" &&
                            Number(newParcel.shipping_cost).toLocaleString()}
                          {" ກີບ"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="cod">
                    <span>COD :</span>
                    <span className="float-end">
                      {newParcel.cod !== null && newParcel.cod.toLocaleString()}
                      {newParcel.cod !== null &&
                        currencyCOD(newParcel.currency_cod)}{" "}
                    </span>
                  </div>

                  <div className="detail">
                    <div className="parcel">
                      <div className="text-1">
                        <div className="">ປະເພດເຄື່ອງ : </div>
                        <div className="">ຂະໜາດ : </div>
                        <div className="">
                          {newParcel.parcel_type === "general"
                            ? "ນ້ຳໝັກ :"
                            : "ຈຳນວນ"}
                        </div>
                      </div>
                      <div className="text-2">
                        <div className="">
                          {parcelType(newParcel.parcel_type)}
                        </div>
                        <div className="">
                          {newParcel.parcel_type !== "general"
                            ? "-"
                            : newParcel.box_size}
                        </div>
                        <div className="">
                          {newParcel.parcel_type !== "general"
                            ? newParcel.parcel_weight
                            : newParcel.parcel_weight + " kg"}
                        </div>
                      </div>
                    </div>
                    <div className="qr">
                      <QRCode value={newParcel.serial_parcel} size={50} />
                      <div className="">{newParcel.serial_parcel}</div>
                      <div className=""> {newParcel.createdAt}</div>
                    </div>
                  </div>
                  <div className="comment">
                    <span className="c_comment">ໝາຍເຫດ </span>:
                    {newParcel.comment}
                  </div>
                  <div className="info_branch">
                    <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                    <span> ປາຍທາງ : </span>
                    <span className="ms-1">
                      {newParcel.branch_end_village_name +
                        ", " +
                        newParcel.branch_end_branch_end_city_name +
                        ", " +
                        newParcel.branch_end_province_name}
                    </span>
                    <div className="">
                      <FontAwesomeIcon icon="fa-solid fa-mobile-retro" />:
                      {newParcel.phone_branch_end}
                    </div>
                  </div>
                  <div className="text-center ">ຂໍຂອບໃຈ ທີ່ໃຊ້ບໍລິການ</div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Resent;
