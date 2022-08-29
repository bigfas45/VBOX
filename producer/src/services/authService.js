import axios from "axios";
import * as urls from "./urls";

export const signupHandler = (data) => {
  return axios({
    method: "post",
    url: urls.signupUrl,
    data,
  });
};

export const verifyRequest = (data) => {
  return axios({
    method: "post",
    url: urls.verifyRequestUrl,
    data,
  });
};

export const verifyHandler = (data) => {
  return axios({
    method: "post",
    url: urls.verifyUrl,
    data,
  });
};

export const loginHandler = (data) => {
  return axios({
    method: "post",
    url: urls.signinUrl,
    data,
  });
};
