import axios from "axios";
export const getSumParcelByDateBranch = async (branch_code) => {
    return await axios.post(process.env.REACT_APP_API_PATH + "/parcel-sum-by-date-branch", branch_code, {
        headers: {
            "Content-Type": "application/json",

        },
    });
};
export const getSumParcelByMonthBranchChart = async (branch_code) => {
    return await axios.post(process.env.REACT_APP_API_PATH + "/parcel-sum-month", branch_code, {
        headers: {
            "Content-Type": "application/json",

        },
    });
};
export const getSumParcelByYearBranchChart = async (branch_code) => {
    return await axios.post(process.env.REACT_APP_API_PATH + "/parcel-sum-year", branch_code, {
        headers: {
            "Content-Type": "application/json",

        },
    });
};

export const getSumUserBranchByBranch = async (branch_code) => {
    return await axios.post(process.env.REACT_APP_API_PATH + "/user-count-by-branch", branch_code, {
        headers: {
            "Content-Type": "application/json",

        },
    });
};
export const getSumReceiveParcels = async (branch_code) => {
    return await axios.post(process.env.REACT_APP_API_PATH + "/parcel-sum-receive", branch_code, {
        headers: {
            "Content-Type": "application/json",

        },
    });
};
// export const getSumUserBranchByBranch = async (branch_code) => {
//     return await axios.post(process.env.REACT_APP_API_PATH + "/user-count-by-branch",branch_code, {
//         headers: {
//             "Content-Type": "application/json",
            
//         },
//     });
// };