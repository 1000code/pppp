import axios from "axios";

export const getBranchesByC_poste = async (c_post, auth_token) => {
  return await axios.get(
    process.env.REACT_APP_API_PATH + "/branches-by-city/" + c_post,
    {
      headers: {
        "Content-Type": "application/json",
        auth_token,
      },
    }
  );
};
