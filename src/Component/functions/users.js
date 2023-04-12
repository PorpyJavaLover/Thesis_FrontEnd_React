import axios from "axios";

export const listUser = async (authtoken) => {
  return await axios.get(process.env.REACT_APP + "/member/anonymous/login", {
    headers: {
      authtoken,
    },
  });
};

export const changeStatus = async (authtoken, value) => {
  return await axios.post(
    process.env.REACT_APP + "/member/anonymous/login",
    value,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const changeRole = async (authtoken, value) => {
  return await axios.post(
    process.env.REACT_APP + "/member/anonymous/login",
    value,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeUser = async (authtoken, id) => {
  return await axios.delete(
    process.env.REACT_APP + "/member/anonymous/login" + id,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const resetPassword = async (authtoken, id, values) => {
  return await axios.put(
    process.env.REACT_APP_API + "/member/anonymous/login" + id,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};
