import React, { useState, useEffect } from "react";
import {
  setAccountCustomer,
  getAllBankAccount,
  getAccountCustomerByCustomerId,
  updateAccountCustomerByCustomerId,
} from "../../API/Customer";
//import { getAllProvinces, getCityByP_poste } from "../../API/Address";
import Swal from "sweetalert2";

import { Notice } from "../../Components/Notice";
import Alert from "../../Components/Alert";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddAccount = () => {
  const params = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const navigate = useNavigate();

  const [allBank, setAllBank] = useState([]);

  const [accountLak, setAccountLak] = useState({
    customer_id: params.id,
    account_name_lak: "",
    account_number_lak: "",
    currency: "lak",
    bank_id_lak: "",
  });
  const { account_name_lak, account_number_lak, bank_id_lak } = accountLak;

  const [accountUpdateLak, setAccountUpdateLak] = useState([]);

  // console.log(accountUpdateLak.account_name);
  const [accountThb, setAccountThb] = useState({
    customer_id: params.id,
    account_name_thb: "",
    account_number_thb: "",
    currency: "thb",
    bank_id_thb: "",
  });

  const { account_name_thb, account_number_thb, bank_id_thb } = accountThb;

  const [accountUpdateThb, setAccountUpdateThb] = useState([]);
  //const { account_name, account_number, bank_id } = accountUpdateThb;

  console.log(accountUpdateLak);

  const [accountUsd, setAccountUsd] = useState({
    customer_id: params.id,
    account_name_usd: "",
    account_number_usd: "",
    currency: "usd",
    bank_id_usd: "",
  });

  const { account_name_usd, account_number_usd, bank_id_usd } = accountUsd;

  const [accountUpdateUsd, setAccountUpdateUsd] = useState([]);

  const handleChangeLak = (e) => {
    setAccountLak({
      ...accountLak,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeUpdateLak = (e) => {
    setAccountUpdateLak({
      ...accountUpdateLak,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  };

  const handleChangeThb = (e) => {
    setAccountThb({
      ...accountThb,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeUpdateThb = (e) => {
    setAccountUpdateThb({
      ...accountUpdateThb,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeUsd = (e) => {
    setAccountUsd({
      ...accountUsd,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeUpdateUsd = (e) => {
    setAccountUpdateUsd({
      ...accountUpdateUsd,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitLak = (e) => {
    e.preventDefault();
    if (account_name_lak === "") {
      Alert("error", "ກະລຸນາປ້ອນຊື່ບັນຊີ");
    } else if (account_number_lak === "") {
      Alert("error", "ກະລຸນາປ້ອນເລກບັນຊີ");
    } else if (bank_id_lak === "") {
      Alert("error", "ກະລຸນາເລືອກທະນາຄານ");
    } else {
      Swal.fire({
        title: "ຕ້ອງການເພີ່ມບັນຊີເງິນກີບ ຫຼື ບໍ່?",
        icon: "warning",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "ຢືນຢັນ",
        confirmButtonColor: "#ff2000",
        cancelButtonColor: "#b8b8b8",
        cancelButtonText: "ຍົກເລີກ",
      }).then((result) => {
        if (result.isConfirmed) {
          setAccountCustomer(accountLak, token)
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
      });
    }
  };
  const onSubmitUpdateLak = (e) => {
    e.preventDefault();
    if (accountUpdateLak.account_name === "") {
      Alert("error", "ກະລຸນາປ້ອນຊື່ບັນຊີ");
    } else if (accountUpdateLak.account_number === "") {
      Alert("error", "ກະລຸນາປ້ອນເລກບັນຊີ");
    } else if (accountUpdateLak.bank_id === "") {
      Alert("error", "ກະລຸນາເລືອກທະນາຄານ");
    } else {
      Swal.fire({
        title: "ຕ້ອງການອັບເດດບັນຊີເງິນກີບ ຫຼື ບໍ່?",
        icon: "warning",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "ຢືນຢັນ",
        confirmButtonColor: "#ff2000",
        cancelButtonColor: "#b8b8b8",
        cancelButtonText: "ຍົກເລີກ",
      }).then((result) => {
        if (result.isConfirmed) {
          updateAccountCustomerByCustomerId(params.id, accountUpdateLak, token)
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
      });
    }
  };
  const onSubmitThb = (e) => {
    e.preventDefault();
    if (account_name_thb === "") {
      Alert("error", "ກະລຸນາປ້ອນຊື່ບັນຊີ");
    } else if (account_number_thb === "") {
      Alert("error", "ກະລຸນາປ້ອນເລກບັນຊີ");
    } else if (bank_id_thb === "") {
      Alert("error", "ກະລຸນາເລືອກທະນາຄານ");
    } else {
      Swal.fire({
        title: "ຕ້ອງການເພີ່ມບັນຊີເງິນບາດ ຫຼື ບໍ່?",
        icon: "warning",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "ຢືນຢັນ",
        confirmButtonColor: "#ff2000",
        cancelButtonColor: "#b8b8b8",
        cancelButtonText: "ຍົກເລີກ",
      }).then((result) => {
        if (result.isConfirmed) {
          setAccountCustomer(accountThb, token)
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
      });
    }
  };
  const onSubmitUpdateThb = (e) => {
    e.preventDefault();
    if (accountUpdateThb.account_name === "") {
      Alert("error", "ກະລຸນາປ້ອນຊື່ບັນຊີ");
    } else if (accountUpdateThb.account_number === "") {
      Alert("error", "ກະລຸນາປ້ອນເລກບັນຊີ");
    } else if (accountUpdateThb.bank_id === "") {
      Alert("error", "ກະລຸນາເລືອກທະນາຄານ");
    } else {
      Swal.fire({
        title: "ຕ້ອງການອັບເດດບັນຊີເງິນບາດ ຫຼື ບໍ່?",
        icon: "warning",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "ຢືນຢັນ",
        confirmButtonColor: "#ff2000",
        cancelButtonColor: "#b8b8b8",
        cancelButtonText: "ຍົກເລີກ",
      }).then((result) => {
        if (result.isConfirmed) {
          updateAccountCustomerByCustomerId(params.id, accountUpdateThb, token)
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
      });
    }
  };
  const onSubmitUsd = (e) => {
    e.preventDefault();
    if (account_name_usd === "") {
      Alert("error", "ກະລຸນາປ້ອນຊື່ບັນຊີ");
    } else if (account_number_usd === "") {
      Alert("error", "ກະລຸນາປ້ອນເລກບັນຊີ");
    } else if (bank_id_usd === "") {
      Alert("error", "ກະລຸນາເລືອກທະນາຄານ");
    } else {
      Swal.fire({
        title: "ຕ້ອງການເພີ່ມບັນຊີເງິນໂດລາ ຫຼື ບໍ່?",
        icon: "warning",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "ຢືນຢັນ",
        confirmButtonColor: "#ff2000",
        cancelButtonColor: "#b8b8b8",
        cancelButtonText: "ຍົກເລີກ",
      }).then((result) => {
        if (result.isConfirmed) {
          setAccountCustomer(accountUsd, token)
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
      });
    }
  };
  const onSubmitUpdateUsd = (e) => {
    e.preventDefault();
    if (accountUpdateUsd.account_name === "") {
      Alert("error", "ກະລຸນາປ້ອນຊື່ບັນຊີ");
    } else if (accountUpdateUsd.account_number === "") {
      Alert("error", "ກະລຸນາປ້ອນເລກບັນຊີ");
    } else if (accountUpdateUsd.bank_id === "") {
      Alert("error", "ກະລຸນາເລືອກທະນາຄານ");
    } else {
      Swal.fire({
        title: "ຕ້ອງການອັບເດດບັນຊີເງິນໂດລາ ຫຼື ບໍ່?",
        icon: "warning",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "ຢືນຢັນ",
        confirmButtonColor: "#ff2000",
        cancelButtonColor: "#b8b8b8",
        cancelButtonText: "ຍົກເລີກ",
      }).then((result) => {
        if (result.isConfirmed) {
          updateAccountCustomerByCustomerId(params.id, accountUpdateUsd, token)
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
      });
    }
  };

  useEffect(() => {
    getAllBankAccount(token)
      .then((res) => {
        setAllBank(res.data);
      })
      .catch((err) => {
        Notice("error", err.response.data.error);
      });
    getAccountCustomerByCustomerId(params.id, token)
      .then((res) => {
        res.data.map((item) => {
          if (item.currency === "lak") {
            setAccountUpdateLak(item);
          } else if (item.currency === "thb") {
            setAccountUpdateThb(item);
          } else if (item.currency === "usd") {
            setAccountUpdateUsd(item);
          }
        });
      })
      .catch((err) => {
        Notice("error", err.response.data.error);
      });

    //setData({ ...data, phone: params.phone });
  }, []);
  //console.log("tttt", typeof accountUpdateLak.length);
  return (
    <div className="container">
      {typeof accountUpdateLak.length === "number" && (
        <div className="row">
          <form onSubmit={onSubmitLak}>
            <div className=" mt-4"></div>
            <div className="col-md-12">
              <div className="card card-body mb-3">
                <div className="h3 text-danger mb-4">ເພີມບັນຊີເງິນກີບ</div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ຊື່ບັນຊີ
                    </label>
                    <input
                      name="account_name_lak"
                      onChange={handleChangeLak}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ເລກບັນຊີ
                    </label>
                    <input
                      type="number"
                      name="account_number_lak"
                      onChange={handleChangeLak}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ທະນາຄານ
                    </label>
                    <select
                      name="bank_id_lak"
                      className="form-select"
                      onChange={handleChangeLak}
                      defaultValue={"default"}
                    >
                      <option disabled value="default">
                        --- ເລືອກ ---
                      </option>
                      {allBank.map((val) => (
                        <option key={val._id} value={val._id}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary col-12">ບັນທຶກ</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {/* if have data  */}
      {typeof accountUpdateLak.length === "undefined" && (
        <div className="row">
          <form onSubmit={onSubmitUpdateLak}>
            <div className=" mt-4"></div>
            <div className="col-md-12">
              <div className="card card-body mb-3">
                <div className="h3 text-danger mb-4">ອັບເດດບັນຊີເງິນກີບ</div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ຊື່ບັນຊີ
                    </label>
                    <input
                      value={accountUpdateLak.account_name}
                      name="account_name"
                      onChange={handleChangeUpdateLak}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ເລກບັນຊີ
                    </label>
                    <input
                      type="number"
                      name="account_number"
                      value={accountUpdateLak.account_number}
                      onChange={handleChangeUpdateLak}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ທະນາຄານ
                    </label>
                    <select
                      name="bank_id"
                      value={accountUpdateLak.bank_id}
                      className="form-select"
                      onChange={handleChangeUpdateLak}
                    >
                      {allBank.map((val, key) => (
                        <option key={val._id} value={val._id}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-warning col-12">ອັບເດດ</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {typeof accountUpdateThb.length === "number" && (
        <div className="row">
          <form onSubmit={onSubmitThb}>
            <div className=" mt-4"></div>
            <div className="col-md-12">
              <div className="card card-body mb-3">
                <div className="h3 text-danger mb-4">ເພີມບັນຊີເງິນບາດ</div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ຊື່ບັນຊີ
                    </label>
                    <input
                      name="account_name_thb"
                      onChange={handleChangeThb}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ເລກບັນຊີ
                    </label>
                    <input
                      type="number"
                      name="account_number_thb"
                      onChange={handleChangeThb}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ທະນາຄານ
                    </label>
                    <select
                      name="bank_id_thb"
                      className="form-select"
                      onChange={handleChangeThb}
                      defaultValue={"default"}
                    >
                      <option disabled value="default">
                        --- ເລືອກ ---
                      </option>
                      {allBank.map((val, key) => (
                        <option key={val._id} value={val._id}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary col-12">ບັນທຶກ</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {typeof accountUpdateThb.length === "undefined" && (
        <div className="row">
          <form onSubmit={onSubmitUpdateThb}>
            <div className=" mt-4"></div>
            <div className="col-md-12">
              <div className="card card-body mb-3">
                <div className="h3 text-danger mb-4">ອັບເດດບັນຊີເງິນບາດ</div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ຊື່ບັນຊີ
                    </label>
                    <input
                      name="account_name"
                      onChange={handleChangeUpdateThb}
                      type="text"
                      value={accountUpdateThb.account_name}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ເລກບັນຊີ
                    </label>
                    <input
                      type="number"
                      name="account_number"
                      value={accountUpdateThb.account_number}
                      onChange={handleChangeUpdateThb}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ທະນາຄານ
                    </label>
                    <select
                      name="bank_id"
                      value={accountUpdateThb.bank_id}
                      className="form-select"
                      onChange={handleChangeUpdateThb}
                    >
                      {allBank.map((val, key) => (
                        <option key={val._id} value={val._id}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-warning col-12">ອັບເດດ</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {typeof accountUpdateUsd.length === "number" && (
        <div className="row">
          <form onSubmit={onSubmitUsd}>
            <div className=" mt-4"></div>
            <div className="col-md-12">
              <div className="card card-body mb-3">
                <div className="h3 text-danger mb-4">ເພີມບັນຊີເງິນໂດລາ</div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ຊື່ບັນຊີ
                    </label>
                    <input
                      name="account_name_usd"
                      onChange={handleChangeUsd}
                      type="text"
                      value={accountUsd.account_name}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ເລກບັນຊີ
                    </label>
                    <input
                      type="number"
                      name="account_number_usd"
                      value={accountUsd.account_number}
                      onChange={handleChangeUsd}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ທະນາຄານ
                    </label>
                    <select
                      name="bank_id_usd"
                      value={accountLak.bank_id_usd}
                      className="form-select"
                      onChange={handleChangeUsd}
                      defaultValue={"default"}
                    >
                      <option disabled value="default">
                        --- ເລືອກ ---
                      </option>
                      {allBank.map((val, key) => (
                        <option key={val._id} value={val._id}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary col-12">ບັນທຶກ</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {typeof accountUpdateUsd.length === "undefined" && (
        <div className="row">
          <form onSubmit={onSubmitUpdateUsd}>
            <div className=" mt-4"></div>
            <div className="col-md-12">
              <div className="card card-body mb-3">
                <div className="h3 text-danger mb-4">ອັບເດດບັນຊີເງິນໂດລາ</div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ຊື່ບັນຊີ
                    </label>
                    <input
                      name="account_name"
                      onChange={handleChangeUpdateUsd}
                      type="text"
                      value={accountUpdateUsd.account_name}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ເລກບັນຊີ
                    </label>
                    <input
                      type="number"
                      name="account_number"
                      value={accountUpdateUsd.account_number}
                      onChange={handleChangeUpdateUsd}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="" className="form-label">
                      ທະນາຄານ
                    </label>
                    <select
                      name="bank_id"
                      value={accountUpdateUsd.bank_id}
                      className="form-select"
                      onChange={handleChangeUpdateUsd}
                    >
                      {allBank.map((val, key) => (
                        <option key={val._id} value={val._id}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-warning col-12">ອັບເດດ</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddAccount;
