import axios from "axios";

export const getMyMoney = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/get-my-money",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
export const getMoneyFromCounter = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/get-money-from-counter",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

// export const getParcelsInBranch = async (data, auth_token) => {
//   return await axios.post(
//     process.env.REACT_APP_API_PATH + "/dividends-for-branch",
//     data,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         auth_token,
//       },
//     }
//   );
// };
