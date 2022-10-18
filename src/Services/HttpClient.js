import axios from "axios";
import { Alert } from "reactstrap";
import { CommonTypes } from "../Types/Common";

class HttpClientService {
  constructor() {
    localStorage.removeItem("user");

    const token = JSON.parse(localStorage.getItem("user") || "{}")["token"];
    this.axiosInstance = axios.create({
      baseURL: "/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  get(url) {
    return this.axiosInstance
      .get(url)
      .then((resp) => {
        return Promise.resolve(resp);
      })
      .catch((resp) => {
        if (resp.response !== undefined && resp.response.status === 401) {
          localStorage.removeItem("user");
          window.location.replace("http://localhost:3000");
        } else {
          return Promise.reject(resp);
        }
      });
  }

  post(url, data) {
    return this.axiosInstance
      .post(url, data)
      .then((resp) => {
        return Promise.resolve(resp);
      })
      .catch((resp) => {
        if (resp.response !== undefined && resp.response.status === 401) {
          alert("unauthorized!!");
          localStorage.removeItem("user");
          window.location.replace(CommonTypes.WebURLaddress);
        }
        return Promise.reject(resp);
      });
  }

  put(url,data){
    return this.axiosInstance
    .put(url,data)
    .then( res => {
      return Promise.resolve(res);
    })
    .catch( resp => {
      if (resp.response !== undefined && resp.response.status === 401) {
        alert("unauthorized!!");
        localStorage.removeItem("user");
        window.location.replace(CommonTypes.WebURLaddress);
      }
      return Promise.reject(resp);
    })
  }

  setTokenOnLogin = (token = "") => {
    // const tokens = JSON.parse(localStorage.getItem("user") || "{}")["token"];
    this.axiosInstance.defaults.headers = { Authorization: `Bearer ${token}` };
  };
  clearTokenOnLogout = () => {
    localStorage.removeItem("user");
    this.axiosInstance.defaults.headers = {};
  };
}

export const HttpClientServiceInstance = new HttpClientService();
