import axios from "axios";

export const getLastExchangeRate = async (auth_token) => {
  return await axios.get(
    process.env.REACT_APP_API_PATH + "/exchange_rate_last",
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
