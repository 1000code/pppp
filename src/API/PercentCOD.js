import axios from "axios";

export const getAllPercentage = async (auth_token) => {
  return await axios.get(process.env.REACT_APP_API_PATH + "/percentage", {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};
