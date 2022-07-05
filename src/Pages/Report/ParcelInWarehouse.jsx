import React, { useState, useEffect } from "react";
import { getParcelForSentCustomer } from "../../API/Parcel";
import Alert from "../../Components/Alert";
import { useSelector } from "react-redux";
import { parcelType } from "../../Functions/Functions";
import ReactWhatsapp from "react-whatsapp";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CopyToClipboard from "react-copy-to-clipboard";

const ParcelInWarehouse = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const [copy, setCopy] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const loadParcel = (branch_code, token) => {
    getParcelForSentCustomer(branch_code, token)
      .then((res) => {
        setFilterData(res.data);
        if (res.data.length > 0) {
          setShowData(true);
        } else {
          setShowData(false);
        }
      })
      .catch((err) => {
        Alert.error(err.response.data.msg);
      });
  };

  useEffect(() => {
    loadParcel(user.branch_code, token);
  }, []);

  useEffect(() => {
    if (copy !== null) {
      setTimeout(() => {
        setCopy("");
      }, 1000);
    }
  }, [copy]);
  ///================show data in table

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
        //if data is number (record.number == value)
        return record.serial_parcel.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "ຜູ້ຮັບ",
      key: "2",
      render: (row) => (
        <div>
          <p>{row.cus_receive_name}</p>
          <ReactWhatsapp
            className="link-chat"
            number={"856" + row.cus_receive_phone}
            //   message={text}
            message={`ສະບາຍດີ ບໍລິສັດ ຄຣາວຂົນສົ່ງດ່ວນ ແຈ້ງໃຫ້ລູກຄ້າຊາບວ່າ ພັດສະດຸຂອງທ່ານ ${
              "( " + row.serial_parcel + " )"
            }  ໄດ້ມາເຖິງສາຂາ ${
              row.branch_join[0].village +
              ", " +
              row.city_join[0].name +
              ", " +
              row.province_join[0].name
            }   ແລ້ວສາມາດເຂົ້າມາຮັບໄດ້, ລູກຄ້າສາມາດມາຮັບເຄື່ອງໄດ້ບໍ່ໃຫ້ເກີນພາຍໃນ 7 ວັນ, ຂໍຂອບໃຈ ທີ່ໃຊ້ບໍລິການ`}
          >
            {row.cus_receive_phone}
          </ReactWhatsapp>
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
        return record.cus_receive_name
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "ຜູ້ສົ່ງ",
      key: "3",
      render: (row) => (
        <div>
          <p>{row.cus_sender_name}</p>
          <ReactWhatsapp
            className="link-chat"
            number={"856" + row.cus_sender_phone}
            //   message={text}
            message={`ສະບາຍດີ ບໍລິສັດ ຄຣາວຂົນສົ່ງດ່ວນ ແຈ້ງໃຫ້ລູກຄ້າຊາບວ່າ ພັດສະດຸຂອງທ່ານ ${
              "( " + row.serial_parcel + " )"
            }  ໄດ້ມາເຖິງສາຂາ ${
              row.branch_join[0].village +
              ", " +
              row.city_join[0].name +
              ", " +
              row.province_join[0].name
            }   ແລ້ວ, ພວກເຮົາບໍ່ສາມາດຕິດຕໍ່ລູກຄ້າປາຍທາງໄດ້ ຈຶ່ງແຈ້ງມາຍັງລູກຄ້າຕົ້ນທາງໃຫ້ຮັບຊາບ ແລະ ກະລຸນາຕິດຕໍ່ກັບດ້ວຍ  ບໍ່ໃຫ້ເກີນພາຍໃນ 3 ວັນ, ຂໍຂອບໃຈ ທີ່ໃຊ້ບໍລິການ`}
          >
            {row.cus_sender_phone}
          </ReactWhatsapp>
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
        return record.cus_sender_name
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "ປະເພດພັດສະດຸ",
      key: "4",
      render: (row) => <div>{parcelType(row.parcel_type)}</div>,
    },
    {
      title: "ຄ່າຂົນສົ່ງ",
      key: "5",
      render: (row) => (
        <div>{Number(row.shipping_cost).toLocaleString() + " ກີບ"}</div>
      ),
    },
  ];

  return (
    <>
      {showData ? (
        <div className="container">
          <div className="card card-body">
            <h3 className="text-danger mb-3">ພັດສະດຸທີ່ຕ້ອງສົ່ງ ລູກຄ້າ {} </h3>
            <div className="mt-3">
              <div className="mb-3 table-responsive text-nowrap">
                <Table
                  columns={columns}
                  dataSource={filterData}
                  bordered
                  filters
                  sorter
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
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="card card-body mt-4 border-3 border-warning">
            <div className=" text-center h3 text-danger p-4 ">
              ບໍ່ມີພັດສະດຸທີ່ຕ້ອງສົ່ງ
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ParcelInWarehouse;
