import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getOneUserBranch, updateUserById } from "../../API/UserBranch";
import { useSelector } from "react-redux";
import Alert from "../../Components/Alert";
import NumberFormat from "react-number-format";

const UpdateUser = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    isCounter: "",
    branch_code: "",
    p_poste: "",
    phone: "",
    WhatsApp: "",
    password: "",
    cPassword: "",
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
    role_sub_branch,
  } = form;

  useEffect(() => {
    LoadData(params.id, token);
    setForm({
      ...form,
      branch_code: user.branch_code,
      p_poste: user.p_poste,
    });
  }, []);

  const LoadData = (id, token) => {
    getOneUserBranch(id, token)
      .then((res) => {
        setForm(res.data);
      })
      .catch((error) => {
        Alert("error", error.response.data.error);
      });
  };

  const handleChange = (e) => {
    let value = e.target.value;

    setForm({
      ...form,
      [e.target.name]: e.target.value,
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

  console.log(form);
  const onSubmit = (e) => {
    e.preventDefault();

    if (username === "") {
      Alert("error", "???????????????????????????????????????");
    } else if (phone === "") {
      Alert("error", "??????????????????????????? ???????????????????????????????????????");
    } else if (phone.length < 10) {
      Alert("error", "??????????????????????????????????????? ???????????????????????????");
    } else if (phone.length > 10) {
      Alert("error", "??????????????????????????????????????? ???????????????????????????");
    } else if (role_sub_branch === "") {
      Alert("error", "?????????????????? ????????????????????????");
    } else {
      updateUserById(params.id, form, token)
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
  };
  const [checkPass, setCheckPass] = useState(true);

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <div className="col-md-2"></div>
        <div className="card card-body mt-3 col-md-8">
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="h3 mb-3 text-danger ms-3 ">?????????????????? ??????????????????</div>
              <div className=" col-md-12 position-center mb-3">
                <label className="mb-1">
                  ???????????????????????????<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="?????????"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group col-md-6 mb-3">
                <label className="mb-1">
                  ???????????????<span className="text-danger"> *</span>
                </label>
                <NumberFormat
                  placeholder="20 ..."
                  className="form-control"
                  value={form.phone}
                  maxLength={10}
                  name="phone"
                  thousandSeparator={false}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    // formattedValue = $2,223
                    // value ie, 2223
                    setForm({
                      ...form,
                      phone: value,
                    });
                  }}
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="mb-1">????????? Whatsapp</label>
                <NumberFormat
                  placeholder="20 ..."
                  className="form-control"
                  maxLength={10}
                  value={form.WhatsApp}
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

              <h6 className="">
                ?????????????????????????????????????????? <span className="text-danger"> *</span>
              </h6>
              <div className="col-md-12 mb-2">
                <select
                  className="form-select"
                  value={form.role_sub_branch}
                  name="role_sub_branch"
                  onChange={handleChange}
                >
                  <option value="counter">Counter</option>
                  <option value="rider">Rider</option>
                  <option value="truck">Truck</option>
                </select>
              </div>

              <br />
              <div className="form-group  mb-3 col-md-6">
                <label className="mb-1">
                  ???????????????????????????<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="********"
                  name="password"
                  disabled={checkPass}
                  onChange={handleChange}
                />
                <small className="form-text text-muted">
                  ????????? 8 ?????????????????????????????????????????????
                </small>
              </div>
              <div className="form-group mb-3 col-md-6">
                <label className="mb-1">
                  ?????????????????????????????????????????????<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="********"
                  name="cPassword"
                  disabled={checkPass}
                  onChange={handleChange}
                />
                <small className="form-text text-muted">
                  ????????? 8 ?????????????????????????????????????????????
                </small>
              </div>
              <div className="form-check ms-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked
                  defaultValue
                  onClick={() => setCheckPass(!checkPass)}
                  id="checkPass"
                />
                <label className="form-check-label mb-3" htmlFor="checkPass">
                  ???????????????????????????????????????
                </label>
              </div>
            </div>
            <Link
              className="btn btn-secondary me-2"
              to="/dashboard/user-branch"
            >
              ?????????????????????
            </Link>
            <button className="btn btn-success" type="submit">
              ?????????????????????????????????????????????????????????
            </button>
          </form>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default UpdateUser;
