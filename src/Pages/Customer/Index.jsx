import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../Functions/Functions";
import Swal from "sweetalert2";
import { getAllCustomer } from "../../API/Customer";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Index = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = user;

  const headers = [
    { label: "ເບີໂທ", key: "phone" },
    { label: "ຊື່", key: "name" },
    { label: "ທີ່ຢູ່", key: "village" },
    { label: "COD", key: "cod_type" },
    { label: "ວັນເວລາລົງທະບຽນ", key: "createdAt" },
  ];
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [customer, setCustomer] = useState([]);

  const path = "/dashboard/customer/";

  const csvReport = {
    data: data,
    headers: headers,
    filename: "customer.csv",
  };

  useEffect(() => {
    Loading(token);
  }, []);

  const columns = [
    {
      title: "ເບີໂທ",
      render: (row) => (
        <div>
          <Link
            className="btn text-success"
            to={"/dashboard/customer/" + row._id}
          >
            {row.phone}
          </Link>
        </div>
      ),
      key: "phone",
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
      // onFilter: (value, record) => record.phone.indexOf(value) === 0,
      // sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "ຊື່",
      dataIndex: "name",
      key: "name",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "ທີ່ຢູ່",
      key: "name",
      render: (row) => (
        <div>
          <p>
            {row.village +
              "," +
              row.city_join[0].name +
              "," +
              row.province_join[0].name}
          </p>
        </div>
      ),
      onFilter: (value, record) => record.village.indexOf(value) === 0,
      sorter: (a, b) => a.village.length - b.village.length,
    },
    {
      title: "COD",
      key: "name",
      render: (row) => <div>{row.get_cod === true ? "ເກັບ" : "ບໍ່ເກັບ"}</div>,
    },
    {
      title: "ວັນທີລົງທະບຽນ",
      key: "name",
      render: (row) => <div>{formatDate(row.createdAt)}</div>,
    },
    {
      title: "ແກ້ໄຂ",
      key: "tool",
      render: (row) => (
        <Link
          className="btn btn-sm btn-outline-warning"
          to={"/dashboard/customer/update/" + row._id}
        >
          <i className="far fa-edit "></i>
        </Link>
      ),
    },
  ];

  const Loading = (token) => {
    getAllCustomer(token)
      .then((res) => {
        setData(res.data);
        setCustomer(res.data);
      })
      .catch((err) => {
        //toast.error(err.response.data.error);
      });
  };

  // ======================== input search =================================
  return (
    <div className="card border-danger">
      <div className="p-2">
        <div className="row">
          <div className="col-12 col-md-5 mb-3">
            <Link to="/dashboard/customer/add/20" className="btn btn-danger">
              ເພີ່ມຜູ້ສົ່ງພັດສະດຸ
            </Link>
            <button className="btn btn-warning m-2 ">
              <CSVLink className="text-danger" {...csvReport}>
                Export CSV
              </CSVLink>
            </button>
          </div>
          <div className="pt-2 pb-3 h3 col-12 col-md-3 mb-2">
            ລາຍລະອຽດລູກຄ້າ
          </div>
          <div className="pt-2 col-12 col-md-4 mb-2"></div>
        </div>

        <div className="table-responsive text-nowrap mb-3">
          <Table
            columns={columns}
            dataSource={customer}
            bordered
            filters
            sorter
            pagination={{
              total: customer,
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
  );
};

export default Index;
