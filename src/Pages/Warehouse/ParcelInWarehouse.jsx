import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "../../Components/Alert";
import { Notice } from "../../Components/Notice";
import {
  setTrackingParcel,
  getParcelTracking,
  setReturnParcel,
  getSerialParcel,
} from "../../API/Parcel";
import {
  getAllChargeSpecial,
  getAllChargeGeneral,
  getAllChargeFruit,
  getAllChargeByWeight,
  getAllChargeAnimal,
  getGeneralChargeStart,
} from "../../API/Charge";
import { getAllProvinces, getCityByP_poste } from "../../API/Address";
import { getBranchesByC_poste } from "../../API/Branches";
import { useSelector } from "react-redux";
import moment from "moment";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import QRCode from "react-qr-code";
import { parcelType } from "../../Functions/Functions";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

const ParcelInWarehouse = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const _today = moment(new Date()).format("YYYY-MM-DD");
  const _date = moment(new Date()).format("YYYY-MM-DD H:m:s");
  const [copy, setCopy] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [provinces, setProvinces] = useState([]);
  const [city, setCity] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showBigData, setShowBigData] = useState(false);
  const [checkReturn, setCheckReturn] = useState(true);
  const [showNewBranch, setShowNewBranch] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState({
    p_poste: "",
    c_poste: "",
    branch_end: "",
  });
  const [infoSerial, setInfoSerial] = useState({
    branch_code: "",
    type: "",
  });
  const [serialParcel, setSerialParcel] = useState("");
  const [dateNow, setDateNow] = useState("");

  const [chargeGeneral, setChargeGeneral] = useState([]);
  const [chargeWeight, setChargeWeight] = useState([]);
  const [chargeSpecial, setChargeSpecial] = useState([]);
  const [chargeAnimal, setChargeAnimal] = useState([]);
  const [chargeFruit, setChargeFruit] = useState([]);
  const [chargeStart, setChargeStart] = useState([]);

  const [data, setData] = useState([]);
  const initialState = {
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
    name_branch_start: "",
    phone_branch_end: "",
    //========================
    today: "",
    cod: "",
    currency_cod: "",
    phone_branch_end: "",
    village_name: "",
    city_name: "",
    province_name: "",
    created_at: "",
  };
  const [newParcel, setNewParcel] = useState(initialState);

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
  } = newParcel;

  const [parcel, setParcel] = useState({
    serial_parcel: "",
    box_size: "",
    parcel_weight: "",
    parcel_type: "",
    shipping_cost: "",
    today: "",
    status_tracking: user.status_tracking,
    status_parcel: user.user_type,
    warehouse_now: user.branch_code,
    user_id: user.id,
    created_at: _date,
    p_poste: "",
    c_poste: "",
    branch_end: "",
    branch_start: "",

    village_name: "",
    city_name: "",
    province_name: "",
  });

  useEffect(() => {
    _date !== "" && loadParcelByTrackingDate(parcel, token);
    setInfoSerial({
      ...infoSerial,
      branch_code: user.branch_code.substr(0, 3),
      type: "p",
    });
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setSerialParcel("");
  };

  const loadParcelByTrackingDate = (parcel, token) => {
    getParcelTracking(parcel, token)
      .then((res) => {
        if (res.data.length > 0) {
          setFilterData(res.data);
          setData(res.data[0]);
        }
      })

      .catch((err) => {
        Notice("error", err.response.data.error);
        if (err.response.data.finish) Notice("info", err.response.data.finish);
      });
  };

  const LoadParcel = (parcel, token) => {
    setTrackingParcel(parcel, token)
      .then((res) => {
        setParcel({ ...parcel, serial_parcel: "" });
        loadParcelByTrackingDate(parcel, token);

        if (res.data.finish) {
          Notice("info", res.data.finish);
        } else if (res.data.inHouse) {
          Notice("warning", res.data.inHouse);
        } else if (res.data.success) {
          Notice("success", res.data.success);
        }
      })
      .catch((err) => {
        Notice("error", err.response.data.error);
        setParcel({ ...parcel, serial_parcel: "" });
      });
  };

  const handleSearchParcel = (e) => {
    setParcel({
      ...parcel,
      serial_parcel: e.target.value,
      today: _today,
    });
  };

  const handleCityChange = (e) => {
    setNewParcel({ ...newParcel, c_poste: e.target.value });
    _getBranchByC_poste(e.target.value, token);
    setError({
      ...error,
      p_poste: "",
      c_poste: "",
      branch_end: "ກະລຸນາ ຈຸດບໍລີການ",
    });
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

  const handleSearchParcelSubmit = (e) => {
    e.preventDefault();

    if (serial_parcel === "") {
      Notice("error", "ກະລຸນາປ້ອນໝາຍເລກ ພັດສະດຸ");
    } else {
      LoadParcel(parcel, token);
    }
  };

  const showStatusParcel = (status) => {
    if (status === "success") {
      return <div className="text-success">ສຳເລັດ</div>;
    } else {
      return <div className="text-warning">ລໍຖ້າ</div>;
    }
  };

  const handleShowModal = (serial_parcel) => {
    setSerialParcel(serial_parcel);
    setShowModal(true);
  };

  // ======================== calculator shipping cost =====================================
  const [showPrice, setShowPrice] = useState(null);

  const currencyCod = (cod) => {
    setShowModal(true);
  };

  const showCOD = (cod) => {
    let result = "";
    if (cod.cod_join && cod.cod_join.length > 0) {
      const { cod_lak, cod_thb, cod_usd, currency_cod } = cod.cod_join[0];

      if (cod_lak !== null) {
        result = cod_lak;
      } else if (cod_thb !== null) {
        result = cod_thb;
      } else if (cod_usd !== null) {
        result = cod_usd;
      } else {
        result = null;
      }
    }
    return result;
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #DC3545",
    boxShadow: 24,
    p: 4,
  };

  const columns = [
    {
      title: "ເລກພັດສະດຸ",
      key: "1",
      render: (row) => (
        <div className="text-danger">
          {row.serial_parcel}
          <span className="">
            <CopyToClipboard
              text={row.serial_parcel}
              onCopy={() => setCopy(row.serial_parcel)}
            >
              <span className="ms-2 text-warning btn">
                <i className="fa-solid fa-copy"></i>
              </span>
            </CopyToClipboard>
          </span>
          <span
            className={
              copy === row.serial_parcel
                ? "text-secondary ms-2"
                : "text-white ms-2"
            }
          >
            Copied
          </span>
        </div>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="ຄົ້ນຫາ..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        //if data is number (record.number == value)
        return record.serial_parcel.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "ສາຂາປາຍທາງ",
      key: "2",
      render: (row) => (
        <div>
          <p>{row.branch_join[0].name}</p>
          <p className="subtext">{row.branch_join[0].branch_code}</p>
        </div>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="ຄົ້ນຫາ..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        //if data is number (record.number == value)
        return record.branch_join[0].name
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      onFilter: (value, record) =>
        record.branch_join[0].name.indexOf(value) === 0,
      sorter: (a, b) =>
        a.branch_join[0].name.length - b.branch_join[0].name.length,
    },
    {
      title: "ຜູ້ຮັບ",
      key: "3",
      render: (row) => (
        <div>
          <p>{row.cus_receive_name}</p>
          <p className="subtext">{row.cus_receive_phone}</p>
        </div>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="ຄົ້ນຫາ..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.cus_receive_name
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      onFilter: (value, record) => record.cus_receive_name.indexOf(value) === 0,
      sorter: (a, b) => a.cus_receive_name.length - b.cus_receive_name.length,
    },
    {
      title: "ຜູ້ສົ່ງ",
      key: "4",
      render: (row) => (
        <div>
          <p>{row.cus_sender_name}</p>
          <p className="subtext">{row.cus_sender_phone}</p>
        </div>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="ຄົ້ນຫາ..."
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.cus_sender_name
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      onFilter: (value, record) => record.cus_sender_name.indexOf(value) === 0,
      sorter: (a, b) => a.cus_sender_name.length - b.cus_sender_name.length,
    },
    {
      title: "ປະເພດພັດສະດຸ",
      key: "5",
      render: (row) => (
        <div>
          <p>{parcelType(row.parcel_type)}</p>
        </div>
      ),
    },
    {
      title: "ຄ່າຂົນສົ່ງ",
      key: "6",
      render: (row) => (
        <div>
          <p>{Number(row.shipping_cost).toLocaleString() + " ກີບ"}</p>
        </div>
      ),
    },
    {
      title: "ສະຖານະ",
      key: "7",
      render: (row) => (
        <div>
          <p>{showStatusParcel(row.status_parcel)}</p>
        </div>
      ),
    },
    {
      title: "ຕີກັບ",
      key: "8",
      render: (row) => (
        <div
          className="btn text-warning btn-sm"
          onClick={() => {
            handleShowModal(row.serial_parcel);
          }}
          role="button"
          id="cancelparcel"
        >
          ຕີກັບ
        </div>
      ),
    },
  ];

  return (
    <div className="container card card-body">
      <div className="h2 text-danger">ພັດສະດຸ ໃນສາງ</div>
      <Table
        columns={columns}
        dataSource={filterData}
        bordered
        pagination={{
          total: filterData,
          showTotal: (total) => `ລາຍການທັງໝົດ ${total} ລາຍການ`,
          current: page,
          pageSize: pageSize,
          pageSizeOptions: ["5", "10", "20", "50", "100"],
          showPageSizeOptions: true,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modaldescription"
      >
        <Box sx={style}>
          <p className="text-center h2 mb-3 text-danger">ແຈ້ງເຕືອນ !</p>
          <p className="text-center h6 mb-2 ">
            ແນ່ໃຈຫຼືບໍ ທີ່ຈະປ່ຽນເສັ້ນທາງຂອງພັດສະດຸນີ້
          </p>
          <p className="text-center text-danger h6">{serialParcel}</p>
          <div className="d-flex justify-content-around mt-4">
            <Link
              to={`/dashboard/parcel/resent/${serialParcel}`}
              className=" btn btn-danger btn-modal"
            >
              ຢືນຢັນ
            </Link>

            <div onClick={handleClose} className="btn btn-secondary btn-modal ">
              ຍົກເລີກ
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ParcelInWarehouse;
