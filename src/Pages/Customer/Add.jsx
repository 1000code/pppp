import React, { useState, useEffect } from "react";
import { setCustomer } from "../../API/Customer";
import { getAllProvinces, getCityByP_poste } from "../../API/Address";

import { Notice } from "../../Components/Notice";
import Alert from "../../Components/Alert";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Add = () => {
  const params = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const navigate = useNavigate();

  const [checkBank, setCheckBank] = useState(false);

  const [provinces, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [data, setData] = useState({
    phone: "",
    name: "",
    create_by: user.id,
    branch_code: user.branch_code,
    get_cod: "",
    p_poste: "",
    c_poste: "",
    village: "",
  });

  const { phone, name, get_cod, p_poste, c_poste, village } = data;

  const handleCheck = () => {
    setCheckBank(!checkBank);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (phone === "") {
      Alert("error", "ກະລຸນາປ້ອນເບີໂທ");
    } else if (!Number(phone)) {
      Alert("error", "ໝາຍເລກໂທລະສັບຕ້ອງເປັນ ຕົວເລກເທົ່ານັ້ນ");
    } else if (phone.length < 10) {
      Alert("error", "ໝາຍເລກໂທລະສັບ ບໍ່ຄົບ");
    } else if (name === "") {
      Alert("error", "ກະລຸນາປ້ອນຊື່");
    } else if (get_cod === "") {
      Alert("error", "ກະລຸນາເລືອກປະເພດ COD");
    } else if (p_poste === "") {
      Alert("error", "ກະລຸນາເລືອກແຂວງ");
    } else if (c_poste === "") {
      Alert("error", "ກະລຸນາເລືອກເມືອງ");
    } else if (village === "") {
      Alert("error", " ກະລຸນາປ້ອນທີ່ຢູ່");
    } else {
      setCustomer(data, token)
        .then((res) => {
          if (res.data.success) {
            Notice("success", res.data.success);
            navigate("/dashboard/parcel/add");
          } else {
            Notice("error", res.data.error);
          }
        })
        .catch((err) => {
          Notice("error", err.response.data.error);
        });
    }
  };

  useEffect(() => {
    getAllProvinces(token)
      .then((res) => {
        setProvince(res.data);
      })
      .catch((err) => {
        Notice("error", err.response.data.error);
      });

    setData({ ...data, phone: params.phone });
  }, []);

  const LoadCity = (_p_poste, _token) => {
    getCityByP_poste(_p_poste, _token)
      .then((res) => {
        setCity(res.data);
      })
      .catch((err) => {
        Notice("error", err.response.data.error);
      });
  };

  const handleChangeProvince = (e) => {
    let _p_poste = e.target.value;
    setData({ ...data, p_poste: _p_poste });
    LoadCity(_p_poste, token);
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className=" mt-4"></div>
          <div className="col-md-12">
            <div className="card card-body">
              <div className="h3 text-danger mb-4">ເພີ່ມຂໍ້ມູນລູກຄ້າ</div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="" className="form-label">
                    ເບີໂທລະສັບ
                  </label>
                  <input
                    name="phone"
                    onChange={handleChange}
                    type="text"
                    value={phone}
                    className="form-control"
                    placeholder="20 XXXX XXXX"
                    maxLength={10}
                    autoFocus
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="" className="form-label">
                    ຊື່ບຸກຄົນ,ຮ້ານ,ບໍລິສັດ
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="" className="form-label">
                    COD
                  </label>
                  <select
                    name="get_cod"
                    className="form-select"
                    onChange={handleChange}
                    defaultValue={"default"}
                  >
                    <option disabled value="default">
                      --- ເລືອກ ---
                    </option>
                    <option value="0">ບໍ່ເກັບ</option>
                    <option value="1">ເກັບ</option>
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="" className="form-label">
                    ແຂວງ
                  </label>
                  <select
                    name="p_poste"
                    onChange={handleChangeProvince}
                    className="form-select"
                    defaultValue={"default"}
                  >
                    <option disabled value="default">
                      --- ເລືອກ ---
                    </option>
                    {provinces.map((val, key) => (
                      <option key={val.p_poste} value={val.p_poste}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="" className="form-label">
                    ເມືອງ
                  </label>
                  <select
                    name="c_poste"
                    className="form-select"
                    onChange={handleChange}
                    defaultValue={"default"}
                  >
                    <option disabled value="default">
                      --- ເລືອກ ---
                    </option>
                    {city.map((val, key) => (
                      <option key={key} value={val.c_poste}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="" className="form-label">
                    ທີ່ຢູ່
                  </label>
                  <input
                    type="text"
                    name="village"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="card card-body">
              <div className="row">
                <div className="col-7">
                  <button className="btn btn-danger btn-lg col-12">
                    ບັນທຶກ
                  </button>
                </div>
                <div className="col-5">
                  <Link
                    to="/dashboard/customers"
                    className="btn btn-danger btn-lg col-12"
                  >
                    ຍົກເລີກ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;
