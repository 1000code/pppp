import axios from "axios";

export const setCustomer = async (data, auth_token) => {
  return await axios.post(process.env.REACT_APP_API_PATH + "/customer", data, {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};
export const setAccountCustomer = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/account-customer",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
export const getCustomerById = async (id, auth_token) => {
  //console.log(id, auth_token);
  return await axios.get(process.env.REACT_APP_API_PATH + "/customer/" + id, {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};
export const getAccountCustomerByCustomerId = async (id, auth_token) => {
  //console.log(id, auth_token);
  return await axios.get(
    process.env.REACT_APP_API_PATH + "/account-customer/" + id,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
export const getCustomerByPhone = async (phone, auth_token) => {
  return await axios.get(
    process.env.REACT_APP_API_PATH + "/customer-phone/" + phone,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

//=====work===
export const getAllCustomer = async (auth_token) => {
  return await axios.get(process.env.REACT_APP_API_PATH + "/customers", {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};

////work
export const removeCustomer = async (id, auth_token) => {
  // console.log(auth_token)
  return await axios.delete(
    process.env.REACT_APP_API_PATH + "/customer/" + id,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

export const updateCustomerById = async (id, data, auth_token) => {
  return await axios.put(
    process.env.REACT_APP_API_PATH + "/customer/" + id,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
export const updateAccountCustomerByCustomerId = async (
  id,
  data,
  auth_token
) => {
  return await axios.put(
    process.env.REACT_APP_API_PATH + "/account-customer/" + id,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

export const getAllBankAccount = async (auth_token) => {
  // console.log(auth_token);
  return await axios.get(process.env.REACT_APP_API_PATH + "/bank_account", {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};
