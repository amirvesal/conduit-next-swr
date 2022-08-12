import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";

class UserAPI {
  current = async () => {
    const user: any = window.localStorage.getItem("user");
    const token = user?.token;
    try {
      const response = await axios.get(`user`, {
        headers: {
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      });
      return response;
    } catch (err) {
      return err.response;
    }
  };
  login = async (email, password) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/users/login`,
        JSON.stringify({ user: { email, password } }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (err) {
      return err.response;
    }
  };
  register = async (username, email, password) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/users`,
        JSON.stringify({ user: { username, email, password } }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (err) {
      return err.response;
    }
  };
  save = async (user) => {
    try {
      const response = await axios.put(
        `${SERVER_BASE_URL}/user`,
        JSON.stringify({ user }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (err) {
      return err.response;
    }
  };
  follow = async (username) => {
    const user: any = JSON.parse(window.localStorage.getItem("user"));
    const token = user?.token;
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/profiles/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Token ${encodeURIComponent(token)}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return err.response;
    }
  };
  unfollow = async (username) => {
    const user: any = JSON.parse(window.localStorage.getItem("user"));
    console.log("user ------> ", user);

    const token = user?.token;
    try {
      const response = await axios.delete(
        `${SERVER_BASE_URL}/profiles/${username}/follow`,
        {
          headers: {
            Authorization: `Token ${encodeURIComponent(token)}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return err.response;
    }
  };
  get = async (username) => {
    return axios.get(`${SERVER_BASE_URL}/profiles/${username}`);
  };
}

export default new UserAPI();
