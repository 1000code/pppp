import axios from "axios";


export const setUserBranch = async(data, auth_token) => {
    return await axios.post(process.env.REACT_APP_API_PATH + "/u_branch", data, {
        headers: {
            "Content-Type": "application/json",
            auth_token,
        },
    });
};

export const getOneUserBranch = async(id, auth_token) => {
    return await axios.get(
        process.env.REACT_APP_API_PATH + "/u_branch/" + id, {
            headers: {
                "content-type": "application/json",
                auth_token,
            }
        }
    )
}

////=====work===
export const getUserBranchByBranchCode = async(branch_code, auth_token) => {
    return await axios.get(process.env.REACT_APP_API_PATH + "/user-branches/" + branch_code, {
        headers: {
            "Content-Type": "application/json",
            auth_token,
        },
    });
};

////work
export const removeUserBranch = async(id, auth_token) => {
    // console.log(auth_token)
    return await axios.delete(
        process.env.REACT_APP_API_PATH + "/u_branch/" + id, {
            headers: {
                "Content-Type": "application/json",
                auth_token,
            },
        }
    );
};


export const updateUserById = async(id, data, auth_token) => {
    return await axios.put(
        process.env.REACT_APP_API_PATH + "/u_branch/" + id, data, {
            headers: {
                "Content-Type": "application/json",
                auth_token,
            },
        }
    );
};