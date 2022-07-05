import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  getUserBranchByBranchCode,
  removeUserBranch,
} from "../../API/UserBranch";
import Alert from "../../Components/Alert";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { userType } from "../../Functions/Functions";
const ListStaff = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const [filterData, setFilterData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showRider, setShowRider] = useState(false);

  const loading = (token) => {
    getUserBranchByBranchCode(user.branch_code, token)
      .then((res) => {
        setFilterData(res.data);
      })
      .catch((err) => {
        Alert.error(err.response.data.msg);
      });
  };
  useEffect(() => {
    loading(token);
  }, []);

  console.log(filterData);
  //====================Alert delete confirm===========
  const handleClick = (id) => {
    Swal.fire({
      title: "ຕ້ອງການລົບຜູ້ໃຊ້ນີ້ບໍ່?",
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
        removeUserBranch(id, token)
          .then((res) => {
            if (res.data.success) {
              Alert("success", res.data.success);
              loading(token);
            } else {
              Alert("error", res.data.error);
            }
          })
          .catch((err) => {
            Alert("error", err.response.data.error);
          });
      }
    });
  };

  //======================Pagination====================

  ///================show data in table

  const columns = [
    {
      title: "ຊື່",
      dataIndex: "username",
      key: "1",
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
        return record.username.toLowerCase().includes(value.toLowerCase());
      },
      onFilter: (value, record) => record.username.indexOf(value) === 0,
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: "ຕຳແໜ່ງ",
      key: "2",
      render: (row) => (
        <div>
          <p className="btn btn-light">{row.role_}</p>
          <p className="btn btn-light">{userType(row.role_sub_branch)}</p>
        </div>
      ),
    },

    {
      title: "ເບີໂທລະສັບ",
      dataIndex: "phone",
      key: "3",
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
        return record.phone.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "ເບີ Whatsapp",
      dataIndex: "WhatsApp",
      key: "4",
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
        return record.WhatsApp.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "ເຄື່ອງມື",
      key: "5",
      render: (row) => (
        <div className="">
          <Link className="btn" to={"/dashboard/u_branch/update/" + row._id}>
            <i className="far fa-edit text-warning "></i>
          </Link>

          <button
            onClick={() => handleClick(row._id)}
            type="button"
            className="btn text-danger"
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="container py-4 position-relative">
        <div className="card card-body mx-1 ">
          <div className="row">
            <div className="col-12 col-md-4 mb-3">
              <Link to="/dashboard/u_branch/add-user">
                <button className="btn btn-danger">ເພີ່ມພະນັກງານ</button>
              </Link>
            </div>
            <div className="col-12 col-md-4 mb-2">
              <h3 className="text-danger ">ລາຍຊື່ພະນັກງານ</h3>
            </div>
            <div className="col-12 col-md-4 mb-2"></div>
          </div>

          <div className="table-responsive ">
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
    </>
  );
};

export default ListStaff;
