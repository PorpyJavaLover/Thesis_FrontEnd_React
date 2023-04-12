import axios from "axios";
import jwt_decode from "jwt-decode";

const API_REST_URL = "http://localhost:8080";

//const API_REST_URL = 'http://192.168.1.19:8080';

const headers = {
  Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
};

// export const register = async (value) =>
//   await axios.post(process.env.REACT_APP_API + "/registerr", value);

export const login = async (value) =>
  await axios
    .post(API_REST_URL + "/member/anonymous/login")
    .then((response) => {
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem(
        "user",
        JSON.stringify(jwt_decode(JSON.parse(localStorage.getItem("token"))))
      );
    })
    .catch((test) => {
      console.log(test.response.data.error);
    }, value);

export const currentUser = async (authtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
