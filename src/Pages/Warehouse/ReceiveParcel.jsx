import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Notice } from "../../Components/Notice";
import { setTrackingParcel, getParcelTracking } from "../../API/Parcel";
import { useSelector } from "react-redux";
import moment from "moment";
import { parcelType } from "../../Functions/Functions";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CopyToClipboard from "react-copy-to-clipboard";

const ReceiveParcel = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const _today = moment(new Date()).format("YYYY-MM-DD");
  const _date = moment(new Date()).format("YYYY-MM-DD H:m:s");
  const [copy, setCopy] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const [parcel, setParcel] = useState({
    serial_parcel: "",
    user_id: user.id,
    warehouse_now: user.branch_code,
    created_at: _date,
    today: _today,
    status_tracking: user.status_tracking,
  });

  const { serial_parcel, created_at } = parcel;

  useEffect(() => {
    created_at !== "" && loadParcelByTrackingDate(parcel, token);
  }, []);

  const loadParcelByTrackingDate = (parcel, token) => {
    getParcelTracking(parcel, token)
      .then((res) => {
        if (res.data.length > 0) {
          setFilterData(res.data);
        }
      })

      .catch((err) => {
        Notice("error", err.response.data.error);
        if (err.response.data.finish) Notice("info", err.response.data.finish);
      });
  };

  const LoadParcel = (_parcel, token) => {
    setTrackingParcel(_parcel, token)
      .then((res) => {
        loadParcelByTrackingDate(_parcel, token);

        if (res.data.finish) {
          Notice("info", res.data.finish);
        } else if (res.data.inHouse) {
          Notice("warning", res.data.inHouse);
        } else if (res.data.success) {
          Notice("success", res.data.success);
        }

        setParcel({ ...parcel, serial_parcel: "" });
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

  // ======================== calculator shipping cost =====================================

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
  ];

  return (
    <div className="container card card-body">
      <form onSubmit={handleSearchParcelSubmit} className="row mb-3">
        <div className="row">
          <div className="h2 text-danger mt-2 mb-3">ຮັບພັດສະດຸ</div>

          <div className="col-xl-3 col-lg-4 col-md-5 col-12">
            <div className="input-group">
              <input
                type="text"
                value={serial_parcel}
                name="serial_parcel"
                className="form-control"
                placeholder="ປ້ອນລະຫັດພັດສະດຸ "
                autoFocus
                onChange={(e) => handleSearchParcel(e)}
              />
              <div className="col-ms-2">
                <button type="submit" className="btn btn-danger">
                  <SearchIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
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
    </div>
  );
};

export default ReceiveParcel;
