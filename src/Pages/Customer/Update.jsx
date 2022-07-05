import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCustomerById, updateCustomerById } from "../../API/Customer";
import { getAllProvinces, getCityByP_poste } from "../../API/Address";

import { Notice } from "../../Components/Notice";
import Alert from "../../Components/Alert";
import Loading from "../../Components/Loading";
import { useSelector } from "react-redux";

const Add = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const params = useParams();
  const navigate = useNavigate();

  const [provinces, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [data, setData] = useState({
    phone: "",
    name: "",
    get_cod: "",
    p_poste: "",
    c_poste: "",
    village: "",
  });

  const { phone, name, get_cod, p_poste, c_poste, village } = data;

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
    } else if (name === "") {
      Alert("error", "ກະລຸນາປ້ອນຊື່");
    } else if (get_cod === "") {
      Alert("error", "ກະລຸນາເລືອກປະເພດ COD");
    } else if (p_poste === "") {
      Alert("error", "ກະລຸນາເລືອກແຂວງ");
    } else if (c_poste === "") {
      Alert("error", "ກະລຸນາເລືອກເມືອງ");
    } else if (village === "") {
      Alert("error", "ກະລຸນາປ້ອນທີ່ຢູ່");
    } else {
      updateCustomerById(data._id, data, token)
        .then((res) => {
          if (res.data.success) {
            Notice("success", res.data.success);
            navigate("/dashboard/customers");
          } else {
            Notice("error", res.data.error);
          }
        })
        .catch((err) => {
          Notice("error", err.response.data.error);
        });
    }
  };

  const [load, setLoad] = useState(false);

  useEffect(() => {
    getCustomerById(params.id, token)
      .then((res) => {
        console.log(res.data.p_poste);
        setData(res.data);
        LoadCity(res.data.p_poste, token);
        setLoad(true);
      })
      .catch((error) => {
        console.log(error);
        setLoad(false);
      });

    getAllProvinces(token)
      .then((res) => {
        setProvince(res.data);
      })
      .catch((err) => {
        Notice("error", err.response.data.error);
      });
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
      {/* {!load ? (
        <Loading />
      ) : ( */}
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body mb-3 mt-3">
              <div className="col-md-12 mb-2 mt-2">
                <div className="h4">ແກ້ໄຂຂໍ້ມູນລູກຄ້າ</div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="" className="form-label">
                    ເບີໂທລະສັບ
                  </label>
                  <input
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="02098888888"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="" className="form-label">
                    ຊື່ບຸກຄົນ,ຮ້ານ,ບໍລິສັດ
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="" className="form-label">
                    COD
                  </label>
                  <select
                    value={data.get_cod ? "1" : "0"}
                    name="get_cod"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option disabled value="">
                      -- ເລືອກ --
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
                    value={data.p_poste}
                    onChange={handleChangeProvince}
                    className="form-select"
                  >
                    {provinces.map((val, key) => (
                      <option key={key} value={val.p_poste}>
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
                    value={data.c_poste}
                    name="c_poste"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option disabled value="DEFAULT">
                      -- ເລືອກເມືອງ --
                    </option>
                    {city.map((val) => (
                      <option key={val._id} value={val.c_poste}>
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
                    value={data.village}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="card card-body">
              <div className="row">
                <div className="col-7">
                  <button className="btn btn-primary btn-lg col-12">
                    ແກ້ໄຂ
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
      {/* )} */}
    </div>
  );
};

export default Add;
