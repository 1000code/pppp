import axios from "axios";

export const getAllProvinces = async (auth_token) => {
  return await axios.get(process.env.REACT_APP_API_PATH + "/provinces", {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};
export const getCityByP_poste = async (p_post, auth_token) => {
  // console.log(auth_token)
  return await axios.get(process.env.REACT_APP_API_PATH + "/cities/" + p_post, {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};
