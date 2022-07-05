import React, { useState, useEffect } from "react";
import { SignIn } from "../../API/Auth";
import { useDispatch } from "react-redux";

import Logo from "../../Assets/Images/cloud-express.png";
import Alert from "../../Components/Alert";
import { useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";

const Login = () => {
  const dispatch = useDispatch();
  const { country } = useSelector((state) => ({ ...state }));

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const { phone, password } = formData;
  const [copy, setCopy] = useState("");
  const [statusCopy, setStatusCopy] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // show password
  const [passwordShown, setPasswordShown] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (phone == "") {
      Alert("error", "ກະລຸນາປ້ອນໝາຍເລກໂທລະສັບ");
    } else if (!Number(phone)) {
      Alert("error", "ໝາຍເລກໂທລະສັບຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ");
    } else if (password == "") {
      Alert("error", "ກະລຸນາປ້ອນລະຫັດຜ່ານ");
    } else if (phone.length < 10) {
      Alert("error", "ໝາຍເລກໂທລະສັບ ຍັງບໍ່ຄົບ");
    } else if (phone.length > 10) {
      Alert("error", "ໝາຍເລກໂທລະສັບ ຍາວເກີນໄປ");
    } else {
      SignIn(formData)
        .then((res) => {
          sessionStorage.setItem("AUTHORIZATION", res.data.token);

          const {
            phone,
            id,
            username,
            name,
            role_sub_branch,
            status_tracking,
            branch_code,
            user_type,
            p_poste,
          } = res.data.role;

          dispatch({
            type: "LOGIN",
            payload: {
              token: res.data.token,
              phone,
              id,
              username,
              name,
              role_sub_branch,
              status_tracking,
              branch_code,
              user_type,
              p_poste,
            },
          });
        })
        .catch((err) => {
          Alert("error", err.response.data.error);
        });
    }
  };

  useEffect(() => {
    statusCopy !== "" &&
      setTimeout(() => {
        setStatusCopy("");
      }, 3000);
  }, [statusCopy]);

  return (
    <div className="container-login">
      <div className="box-login">
        <div className="branch-name">ຄຣາວ ຂົນສົ່ງດ່ວນ</div>
        <div className="logo">
          <img src={Logo} alt="Cloud Express" />
        </div>
        <div className="text-center h4 mb-3"></div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              className="form-login"
              name="phone"
              type="text"
              placeholder="ຊື່ຜູ້ໃຊ້"
              maxLength={10}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-login"
              name="password"
              type={passwordShown ? "text" : "password"}
              placeholder="ລະຫັດຜ່ານ"
              onChange={onChange}
            />
          </div>
          <div className="mb-3 checkbox">
            <input
              className="form-checkbox"
              type="checkbox"
              id="checkbox"
              onClick={togglePassword}
            />
            <label htmlFor="checkbox">ສະແດງສະຫັດຜ່ານ</label>
          </div>
          {country && (
            <>
              <div className="">
                Country:{" "}
                <span>
                  <img src={country.country_flag} alt="flag" className="flag" />
                </span>
                <span className="text-danger">{country.country_name}</span>
                <span className="text-muted ms-2"> {" lat, lng: "}</span>
                <span className="text-danger">{country.latitude}</span>
                <span className="text-muted"> {",  "}</span>
                <span className="text-danger">{country.longitude}</span>
                <CopyToClipboard
                  text={country.latitude + "," + country.longitude}
                  onCopy={() => {
                    setCopy(country.latitude + "," + country.longitude);
                    setStatusCopy("Copied");
                  }}
                >
                  <span className="ms-2 text-warning btn">
                    <i className="fa-solid fa-copy"></i>
                  </span>
                </CopyToClipboard>
                <span className={"text-secondary ms-2"}>{statusCopy}</span>
              </div>
            </>
          )}
          <div className="mb-4 mt-2">
            <button type="submit" className="btn-login">
              ເຂົ້າສູ່ລະບົບ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
