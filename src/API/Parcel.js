import axios from "axios";

export const getSerialParcel = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/serial-parcel",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

export const setNewParcel = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/parcel-add",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
export const updateStatusParcel = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/update-parcel",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

export const getParcelBySerialParcel = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/parcel-delivery",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

export const getParcelBySerial = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/serial-parcels/" + data,

    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

export const getAllParcelsByUserId = async (data, auth_token) => {
  // console.log(data);
  return await axios.post(process.env.REACT_APP_API_PATH + "/my-parcel", data, {
    headers: {
      "Content-Type": "application/json",
      auth_token,
    },
  });
};

export const updateCancelParcel = async (data, auth_token) => {
  return await axios.put(
    process.env.REACT_APP_API_PATH + "/cancel-parcel",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

// incoming
export const setTrackingParcel = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/receive-parcel",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
export const setTrackingParcelTruck = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/receive-parcel-truck",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

export const getParcelTracking = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/receive-parcel-tracking",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
export const getParcelTrackingByTruck = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/receive-parcel-tracking-truck",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
export const getParcelTrackIngByDate = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/receive-parcel-tracking-by-date",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
export const getParcelForSentCustomer = async (branch_code, auth_token) => {
  return await axios.get(
    process.env.REACT_APP_API_PATH + "/parcel-sent-customer/" + branch_code,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

export const getTotalDividendsABranch = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/dividends-a-branch",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

export const setReturnParcel = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/return-parcel",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};

export const getParcelForResent = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/resent-parcel",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
export const setResentParcel = async (data, auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/resent-new-parcel",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
