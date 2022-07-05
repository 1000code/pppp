import axios from "axios";

export const setUser = async (data, auth_token) => {
  console.log("process.env.REACT_API_PATH");

  return await axios.post(process.env.REACT_API_PATH + "/user/add", data, {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};
export const getUserByID = async (id, auth_token) => {
  return await axios.get(process.env.REACT_API_PATH + "/user/add/" + id, {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};
export const getAllUser = async (data, auth_token) => {
  return await axios.get(process.env.REACT_API_PATH + "/user/add", data, {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};
export const removeUser = async (id, auth_token) => {
  return await axios.delete(process.env.REACT_API_PATH + "/user/add/" + id, {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};

export const updateUser = async (data, auth_token) => {
  return await axios.put(process.env.REACT_API_PATH + "/user/add/", data, {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};
