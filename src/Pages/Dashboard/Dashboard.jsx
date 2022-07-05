import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../Assets/css/Dashboard.css";
import {
  getSumParcelByDateBranch,
  getSumUserBranchByBranch,
  getSumReceiveParcels,
  getSumParcelByMonthBranchChart,
  getSumParcelByYearBranchChart,
} from "../../API/Dashboard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [branchCode, setBranchCode] = useState({
    branch_code: "",
  });

  const [parcel, setParcel] = useState([]);
  const [users, setUsers] = useState([]);
  const [receiveParcel, setReceiveParcel] = useState([]);
  const [parcelMonthChart, setParcelMonthChart] = useState([]);
  const [parcelYearChart, setParcelYearChart] = useState([]);

  useEffect(() => {
    user && setBranchCode({ branch_code: user.branch_code });
  }, [user]);

  useEffect(() => {
    branchCode.branch_code !== "" && LoadBranchCode(branchCode);
    branchCode.branch_code !== "" && LoadUserBranch(branchCode);
    branchCode.branch_code !== "" && LoadReceiveParcel(branchCode);
    branchCode.branch_code !== "" && LoadParcelMonth(branchCode);
    branchCode.branch_code !== "" && LoadParcelYear(branchCode);
  }, [branchCode]);

  const LoadBranchCode = (branch_code) => {
    getSumParcelByDateBranch(branch_code)
      .then((res) => {
        if (res.data.length > 0) {
          setParcel(res.data[0]);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const LoadUserBranch = (branch_code) => {
    getSumUserBranchByBranch(branch_code)
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const LoadReceiveParcel = (branch_code) => {
    getSumReceiveParcels(branch_code)
      .then((res) => {
        if (res.data.length > 0) {
          setReceiveParcel(res.data[0]);
        }
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const LoadParcelMonth = (branch_code) => {
    getSumParcelByMonthBranchChart(branch_code)
      .then((res) => {
        if (res.data.length > 0) {
          setParcelMonthChart(res.data);
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const LoadParcelYear = (branch_code) => {
    getSumParcelByYearBranchChart(branch_code)
      .then((res) => {
        if (res.data.length > 0) {
          setParcelYearChart(res.data);
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const optionsM = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            beginAtZero: true,
            max: 200,
            min: 0,
          },
        },
      ],
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart Month",
      },
    },
  };

  const dataM = {
    // labels: [
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December"],
    labels: parcelMonthChart.map((data) => "ເດືອນ " + data.dateMonth),

    datasets: [
      {
        label: "ພັດສະດຸ",
        data: parcelMonthChart.map((data) => data.count),
        backgroundColor: ["#ff2000", "rgb(213,175,26)"],
      },
    ],
  };
  const optionsY = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            beginAtZero: true,
            max: 200,
            min: 0,
          },
        },
      ],
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart Year",
      },
    },
  };

  const dataY = {
    labels: parcelYearChart.map((data) => "ປີ " + data.dateYear),

    datasets: [
      {
        label: "ພັດສະດຸ",
        data: parcelYearChart.map((data) => data.count),
        backgroundColor: ["#ff2000", "rgb(213,175,26)"],
      },
    ],
  };
  return (
    <>
      <div className="container-xxl">
        <div className="row mt-4">
          <div className="col-lg-4 col-sm-4">
            <div className="d-card">
              <div className="d-card_icon">
                <i className="fas fa-archive"></i>
              </div>
              <div className="d-card_info">
                <h4 className="">
                  {parcel && parcel.count > 0 ? parcel.count : 0}
                </h4>
                <span>ພັດສະດຸທີ່ເພີ່ມໃໝ່ໃນມື້ນີ້</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-4">
            <div className="d-card">
              <div className="d-card_icon">
                <i className="fas fa-boxes"></i>
              </div>
              <div className="d-card_info">
                <h4 className="">
                  {receiveParcel && receiveParcel.totalReceiveParcel > 0
                    ? receiveParcel.totalReceiveParcel
                    : 0}
                </h4>
                <span>ພັດສະດຸທີ່ຮັບເຂົ້າໃນມື້ນີ້</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-4">
            <div className="d-card">
              <div className="d-card_icon">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="d-card_info">
                <h4 className="">
                  {users.length > 0 ? users[0].totalUser : 0}
                </h4>
                <span>ພະນັກງານສາຂາ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chart ">
        <div className="chart-box ">
          <Bar options={optionsM} data={dataM} />
        </div>
        <div className="chart-box">
          <Bar options={optionsY} data={dataY} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
