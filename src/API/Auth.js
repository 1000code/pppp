import axios from "axios";

export const SignIn = async (user) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/user-branch/login",
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const currentUserBranch = async (auth_token) => {
  return await axios.post(
    process.env.REACT_APP_API_PATH + "/current-user-branch",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
