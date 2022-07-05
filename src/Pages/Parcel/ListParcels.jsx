import React, { useState, useEffect } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { getAllParcelsByUserId, updateCancelParcel } from "../../API/Parcel";
import { Notice } from "../../Components/Notice";
import moment from "moment";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Alert from "../../Components/Alert";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parcelType } from "../../Functions/Functions";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CopyToClipboard from "react-copy-to-clipboard";

const ListParcels = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showBigData, setShowBigData] = useState(false);
  const [Parcels, setParcels] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [copy, setCopy] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [cancel, setCancel] = useState({
    cancel_code: "",
    serial_parcel: "",
    user_id: "",
    branch_start: "",
  });

  const [selectParcel, setSelectParcel] = useState({
    user_id: user.id,
    branch_code: user.branch_code,
  });

  const handleCancelCode = (e) => {
    setCancel({
      ...cancel,
      [e.target.name]: e.target.value,
      user_id: user.id,
      branch_start: user.branch_code,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateCancelParcel(cancel, token)
      .then((res) => {
        setShowBigData(false);
        setShowModal(false);

        if (res.data.success) {
          LoadParcels(selectParcel, token);
          Notice("success", res.data.success);
        } else {
          Notice("error", res.data.error);
        }
      })
      .catch((err) => {
        Alert("error", err.response.data.error);
      });
  };

  useEffect(() => {
    LoadParcels(selectParcel, token);
  }, []);

  useEffect(() => {
    if (copy !== null) {
      setTimeout(() => {
        setCopy("");
      }, 1000);
    }
  }, [copy]);

  const LoadParcels = (selectParcel, token) => {
    getAllParcelsByUserId(selectParcel, token)
      .then((res) => {
        setParcels(res.data);
        res.data.length > 0 ? setShowTable(true) : setShowTable(false);
      })
      .catch((err) => {
        Notice("error", err.response.data.error);
      });
  };

  const handleClose = () => setShowModal(false);
  const closeConfirm = () => setConfirm(false);

  const [data, setData] = useState({});
  const handleShowModal = (row) => {
    setData({
      ...data,
      row,
    });
    setShowBigData(true);
    setShowModal(true);
    setCancel({ ...cancel, serial_parcel: row.serial_parcel });
  };
  const currencyCod = (cod) => {
    let result = "-";
    if (cod.cod_join && cod.cod_join.length > 0) {
      const { currency_cod } = cod.cod_join[0];
      if (currency_cod === "lak") {
        result = " ກີບ";
      } else if (currency_cod === "thb") {
        result = " ບາດ";
      } else if (currency_cod === "usd") {
        result = " ໂດລາ";
      }
    }
    return result;
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
      title: "ໝາຍເລກພັດສະດຸ",
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
                <i class="fa-solid fa-copy"></i>
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
        return record.serial_parcel.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "ຜູ້ສົ່ງ",
      key: "2",
      render: (row) => (
        <div>
          {row.cus_sender_name}
          <br />
          <span className="text-muted">{row.cus_sender_phone}</span>
        </div>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="ປ້ອນຊື່ຜູ້ສົ່ງ."
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
        return record.cus_sender_name
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      onFilter: (value, record) => record.cus_sender_name.indexOf(value) === 0,
      sorter: (a, b) => a.cus_sender_name.length - b.cus_sender_name.length,
    },
    {
      title: "ຜູ້ຮັບ",
      key: "3",
      render: (row) => (
        <div>
          {row.cus_receive_name}
          <br />
          <span className="text-muted">{row.cus_receive_phone}</span>
        </div>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="ປ້ອນຊື່ຜູ້ຮັບ..."
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
        return record.cus_receive_name
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      onFilter: (value, record) => record.cus_receive_name.indexOf(value) === 0,
      sorter: (a, b) => a.cus_receive_name.length - b.cus_receive_name.length,
    },
    {
      title: "ລາຄາ",
      // dataIndex: 'shipping_cost',
      key: "4",
      render: (row) => (
        <div>
          <p>{Number(row.shipping_cost).toLocaleString() + " ກີບ"}</p>
        </div>
      ),
    },
    {
      title: "ປາຍທາງ",
      key: "5",
      render: (row) => (
        <div>
          {row.branch_end_join[0].name}
          <br />
          <span className="text-muted">
            {row.branch_end_city_join[0].name +
              "," +
              row.branch_end_province_join[0].name}
            ,
          </span>
        </div>
      ),
      onFilter: (value, record) =>
        record.branch_end_join[0].name.indexOf(value) === 0,
      sorter: (a, b) =>
        a.branch_end_join[0].name.length - b.branch_end_join[0].name.length,
    },
    {
      title: "ລະຫັດຍົກເລີກ",
      key: "6",
      render: (row) => <div className="text-danger">{row.cancel_code}</div>,
    },
    {
      title: "ເຄື່ອງມື",
      key: "7",
      render: (row) => (
        <div
          onClick={(e) => handleShowModal(row)}
          role="button"
          id="cancelparcel"
        >
          <RemoveRedEyeOutlinedIcon />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        {showTable ? (
          <div className="container card card-body">
            <div className="">
              <div className="h3 text-danger py-3">ປະຫວັດການເພີ່ມພັດສະດຸ</div>
            </div>
            <Table
              columns={columns}
              dataSource={Parcels}
              bordered
              pagination={{
                total: Parcels,
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
          </div>
        ) : (
          <div className="container">
            <div className="card card-body border-danger">
              <div className="d-flex justify-content-center">
                <div className="h3 text-danger">ຍັງບໍ່ມີ ການເພີ່ມພັດສະດຸ</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* modal */}

      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modaldescription"
      >
        <Box sx={style}>
          {showBigData && (
            <div className="row">
              <div className="col-md-4 col-12"></div>
              <div className="col-md-5 col-lg-3  mb-3 col-12 d-flex justify-content-center">
                <div className="send-box-bill px-1 ">
                  <div className="title text-center">Cloud Express</div>
                  <div className="customer">
                    <div className="sender">
                      <div className="name">
                        ຜູ້ສົ່ງ:{data.row.cus_sender_name}
                      </div>
                      <div className="name">
                        ເບີໂທ: {data.row.cus_sender_phone}
                      </div>
                      <div className="name">ທີຢູ່:</div>
                    </div>
                    <div className="receive">
                      <div className="name">
                        ຜູ້ຮັບ: {data.row.cus_receive_name}
                      </div>
                      <div className="name">
                        ເບີໂທ: {data.row.cus_receive_phone}
                      </div>
                      <div className="name">
                        ທີຢູ່: {data.row.address_receive}
                      </div>
                    </div>
                  </div>
                  <div className="to_branch">
                    <div className="start">
                      <div className="">
                        {data.row.branch_start_join[0].name}
                      </div>
                      <div className="">{data.row.branch_start}</div>
                    </div>
                    <div className="start">
                      <FontAwesomeIcon icon="fa-solid fa-truck-fast" />
                    </div>
                    <div className="end">
                      <div className="">{data.row.branch_end_join[0].name}</div>
                      <div className="">{data.row.branch_end}</div>
                    </div>
                  </div>
                  <div className="customer">
                    <div className="sender">
                      <div className="name">
                        ຕົ້ນທາງ:
                        <span className="float-end me-1">
                          {" "}
                          {data.row.payment_type === "pay_start" &&
                            Number(data.row.shipping_cost).toLocaleString() +
                              " ກີບ"}
                        </span>
                      </div>
                    </div>
                    <div className="receive">
                      <div className="name">
                        ປາຍທາງ:
                        <span className="float-end">
                          {data.row.payment_type !== "pay_start" &&
                            Number(data.row.shipping_cost).toLocaleString() +
                              " ກີບ"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="cod">
                    <span>COD :</span>
                    <span className="float-end">
                      {showCOD(data.row).toLocaleString()}
                      {currencyCod(data.row)}
                    </span>
                  </div>
                  <div className="sum"></div>
                  <div className="detail">
                    <div className="parcel">
                      <div className="text-1">
                        <div className="">ປະເພດເຄື່ອງ: </div>
                        <div className="">ຂະໜາດ: </div>
                        <div className="">ນ້ຳໜັກ:</div>
                      </div>
                      <div className="text-2">
                        <div className="">
                          {parcelType(data.row.parcel_type)}
                        </div>
                        <div className="">{data.row.box_size}</div>
                        <div className="">{data.row.parcel_weight}</div>
                      </div>
                    </div>
                    <div className="qr">
                      <QRCode size={50} value={data.row.serial_parcel} />
                      <div className="">{data.row.serial_parcel}</div>
                      <div className="">
                        {moment(data.row.createdAt).format("YYYY-MM-DD H:m:s")}
                      </div>
                    </div>
                  </div>
                  <div className="comment">
                    <span className="c_comment line-break">
                      ໝາຍເຫດ {data.row.comment}
                    </span>
                  </div>
                  <div className="info_branch">
                    <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                    <span className="ms-1">
                      {data.row.branch_end_join[0].village +
                        ", " +
                        data.row.branch_end_city_join[0].name +
                        ", " +
                        data.row.branch_end_province_join[0].name}
                    </span>
                    <div className="">
                      <FontAwesomeIcon icon="fa-solid fa-mobile-retro" />:
                      <span className="ms-1">
                        {data.row.user_branch_end_join[0].phone}
                      </span>
                    </div>
                  </div>
                  <div className="text-center ">ຂໍຂອບໃຈ ທີ່ໃຊ້ບໍລິການ</div>
                </div>
              </div>
              <div className="col-md-4 mb-3"></div>
              <div className="col-6">
                <div
                  className="bg-danger d-block btn text-white"
                  onClick={() => setConfirm(true)}
                >
                  ຍົກເລິກພັດສະດຸ
                </div>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-warning col-12"
                  onClick={() => window.print()}
                >
                  ພິມບິນ
                </button>
              </div>

              <Modal
                open={confirm}
                onClose={closeConfirm}
                aria-labelledby="modal-title"
                aria-describedby="modaldescription"
              >
                <Box sx={style}>
                  <h3 className="text-center text-danger">
                    ຕ້ອງການຍົກເລີກ ຫຼື ບໍ່ ?
                  </h3>
                  <div className="text-center  mb-1">
                    <span className="text-danger">ແຈ້ງເຕືອນ! </span>{" "}
                    ຫາກທ່ານຍົກເລີກ
                  </div>
                  <div className="text-center mb-1">
                    ພັດສະດຸໝາຍເລກ :
                    <span className="text-danger">
                      {data.row.serial_parcel}
                    </span>
                  </div>
                  <div className="text-center  mb-4">ຈະຖືກລົບອອກຈາກລະບົບ</div>
                  <form className="row" onSubmit={handleSubmit}>
                    <div className="col-12 mb-3">
                      <input
                        className="form-control me-3"
                        type="text"
                        name="cancel_code"
                        placeholder="ລະຫັດຍົກເລີກ"
                        autoComplete="off"
                        onChange={(e) => handleCancelCode(e)}
                      />
                    </div>
                    <div className="col-6">
                      <button
                        type="submit"
                        disabled={
                          Number(cancel.cancel_code) !== data.row.cancel_code
                        }
                        className="btn btn-danger col-12"
                      >
                        ຢືນຢັນ
                      </button>
                    </div>
                    <div className="col-6">
                      <div
                        className="btn btn-warning d-block"
                        onClick={() => {
                          setConfirm(false);
                          setShowModal(false);
                        }}
                      >
                        ຍົກເລີກ
                      </div>
                    </div>
                  </form>
                </Box>
              </Modal>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ListParcels;
