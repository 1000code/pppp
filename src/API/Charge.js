import axios from "axios";

export const getAllChargeAnimal = async (auth_token) => {
  return await axios.get(process.env.REACT_APP_API_PATH + "/charge-animals", {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};

export const getAllChargeByWeight = async (auth_token) => {
  return await axios.get(process.env.REACT_APP_API_PATH + "/charge-by-weight", {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};
export const getAllChargeFruit = async (auth_token) => {
  return await axios.get(process.env.REACT_APP_API_PATH + "/charge-fruits", {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};

export const getAllChargeGeneral = async (auth_token) => {
  return await axios.get(process.env.REACT_APP_API_PATH + "/charge-generals", {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};

export const getAllChargeSpecial = async (auth_token) => {
  return await axios.get(process.env.REACT_APP_API_PATH + "/charge-specials", {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};

export const getGeneralChargeStart = async (auth_token) => {
  return await axios.get(
    process.env.REACT_APP_API_PATH + "/charge-general-start",
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
