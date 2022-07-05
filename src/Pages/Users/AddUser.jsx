import React, { useState, useEffect } from "react";
import { setUserBranch } from "../../API/UserBranch";
import { useSelector } from "react-redux";
import Alert from "../../Components/Alert";
import NumberFormat from "react-number-format";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    isCounter: true,
    branch_code: "",
    p_poste: "",
    phone: "",
    WhatsApp: "",
    password: "",
    cPassword: "",
    user_type: "sub_branch",
    status_tracking: "",
    role_sub_branch: "",
  });

  const {
    username,
    branch_code,
    p_poste,
    isCounter,
    phone,
    WhatsApp,
    password,
    cPassword,
    status_tracking,
    role_sub_branch,
  } = form;

  useEffect(() => {
    setForm({
      ...form,
      branch_code: user.branch_code,
      p_poste: user.p_poste,
    });
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });

    if (value === "counter") {
      setForm({
        ...form,
        [e.target.name]: value,
        status_tracking: value,
        role_sub_branch: value,
      });
    } else if (value === "rider") {
      setForm({
        ...form,
        [e.target.name]: value,
        status_tracking: value,
        role_sub_branch: value,
      });
    } else if (value === "truck") {
      setForm({
        ...form,
        [e.target.name]: value,
        status_tracking: value,
        role_sub_branch: value,
      });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (username === "") {
      Alert("error", "ກະລຸນາປ້ອນຊື່");
    } else if (phone === "") {
      Alert("error", "ກະລຸນລະບຸ ໝາຍເລກໂທລະສັບ");
    } else if (phone.length < 10) {
      Alert("error", "ໝາຍເລກໂທລະສັບ ຍັງບໍ່ຄົບ");
    } else if (phone.length > 10) {
      Alert("error", "ໝາຍເລກໂທລະສັບ ຍາວເກີນໄປ");
    } else if (password === "") {
      Alert("error", "ກະລຸນລະບຸ ລະຫັດຜ່ານ");
    } else if (password.length < 8) {
      Alert("error", " ລະຫັດຜ່ານ 8 ຕົວອັກສອນຂຶ້ນໄປ");
    } else if (password !== cPassword) {
      Alert("error", "ລະຫັດຜ່ານ ບໍ່ກົງກັນ");
    } else if (role_sub_branch === "") {
      Alert("error", "ກະລຸນາ ເລືອກສິດການໃຊ້ງານ");
    } else {
      Swal.fire({
        title: "ເພີ່ມຜູ້ໃຊ້ ຫຼື ບໍ່?",
        icon: "warning",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "ຢືນຢັນ",
        confirmButtonColor: "#ff2000",
        cancelButtonColor: "#b8b8b8",
        cancelButtonText: "ຍົກເລີກ",
      }).then((result) => {
        if (result.isConfirmed) {
          //
          setUserBranch(form, token)
            .then((res) => {
              if (res.data.success) {
                Alert("success", res.data.success);
                navigate("/dashboard/user-branch");
              } else {
                Alert("error", res.data.error);
              }
            })
            .catch((err) => {
              Alert("error", err.response.data.error);
            });
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <div className="col-md-2"></div>
        <div className="card card-body mt-3 col-md-8 border-wanning">
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="h3 mb-3 text-danger ms-3 ">ເພີ່ມຜູ້ໃຊ້</div>
              <div className=" col-md-12 position-center mb-3">
                <label>
                  ຊື່ຜູ້ໃຊ້<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ຊື່"
                  name="username"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group col-md-6 mb-3">
                <label>
                  ເບີໂທ<span className="text-danger"> *</span>
                </label>
                <NumberFormat
                  placeholder="20 ..."
                  className="form-control"
                  maxLength={10}
                  name="phone"
                  thousandSeparator={false}
                  onValueChange={(values) => {
                    const { value } = values;

                    setForm({
                      ...form,
                      phone: value,
                    });
                  }}
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label>ເບີ Whatsapp</label>
                <NumberFormat
                  placeholder="20 ..."
                  className="form-control"
                  maxLength={10}
                  name="WhatsApp"
                  thousandSeparator={false}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    // formattedValue = $2,223
                    // value ie, 2223
                    setForm({
                      ...form,
                      WhatsApp: value,
                    });
                  }}
                />

                <small className="form-text text-muted" />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label>
                  ລະຫັດຜ່ານ<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="********"
                  name="password"
                  onChange={handleChange}
                />
                <small className="form-text text-muted">
                  ໃສ່ 8 ຕົວອັກສອນຂື້ນໄປ
                </small>
              </div>
              <div className="form-group col-md-6 mb-3">
                <label>
                  ຢືນຢັນລະຫັດຜ່ານ<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="********"
                  name="cPassword"
                  onChange={handleChange}
                />
                <small className="form-text text-muted">
                  ໃສ່ 8 ຕົວອັກສອນຂື້ນໄປ
                </small>
              </div>
              <h6 className="">
                ສິດເຂົ້າໃຊ້ງານ <span className="text-danger"> *</span>
              </h6>
              <div className="col-md-12 mb-4">
                <select
                  className="form-select"
                  defaultValue={"role"}
                  name="role_sub_branch"
                  onChange={handleChange}
                >
                  <option disabled value="role">
                    -- ເລືອກ --
                  </option>
                  <option value="counter">Counter</option>
                  <option value="rider">Rider</option>
                  <option value="truck">Truck</option>
                </select>
              </div>
            </div>

            <Link
              to="/dashboard/user-branch"
              className="btn btn-secondary me-3"
            >
              ຍົກເລິກ
            </Link>
            <button className="btn btn-success" type="submit">
              ເພີ່ມຜູ້ໃຊ້
            </button>
          </form>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default AddUser;
