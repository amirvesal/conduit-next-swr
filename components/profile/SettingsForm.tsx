import axios from "axios";
import Router from "next/router";
import React from "react";
import useSWR, { useSWRConfig } from "swr";

import ListErrors from "../common/ListErrors";
import checkLogin from "../../lib/utils/checkLogin";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";

const SettingsForm = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  });

  const { mutate } = useSWRConfig();

  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    setUserInfo({ ...userInfo, ...currentUser });
  }, []);

  const updateState =
    (field: keyof typeof userInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const state = userInfo;
      const newState = { ...state, [field]: e.target.value };
      setUserInfo(newState);
    };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const user = { ...userInfo };

    if (!user.password) {
      delete user.password;
    }

    const { data, status } = await axios.put(
      `${SERVER_BASE_URL}/user`,
      JSON.stringify({ user }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${currentUser?.token}`,
        },
      }
    );

    setLoading(false);

    if (status !== 200) {
      setErrors(data.errors.body);
    }

    if (data?.user) {
      window.localStorage.setItem("user", JSON.stringify(data.user));
      mutate("user", data.user);
      Router.push("/");
    }
  };

  return (
    <>
      <ListErrors errors={errors} />
      <form onSubmit={submitForm} className="form-control gap-4">
        <fieldset>
          <input
            type="text"
            placeholder="URL of profile picture"
            value={userInfo.image}
            onChange={updateState("image")}
            className="input input-primary w-full"
          />
        </fieldset>

        <fieldset>
          <input
            type="text"
            placeholder="Username"
            value={userInfo.username}
            onChange={updateState("username")}
            className="input input-primary w-full"
          />
        </fieldset>

        <fieldset>
          <textarea
            rows={8}
            placeholder="Short bio about you"
            value={userInfo.bio}
            onChange={updateState("bio")}
            className=" w-full textarea input-primary"
          />
        </fieldset>

        <fieldset>
          <input
            type="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={updateState("email")}
            className="input input-primary w-full"
          />
        </fieldset>

        <fieldset>
          <input
            type="password"
            placeholder="New Password"
            value={userInfo.password}
            onChange={updateState("password")}
            className="input input-primary w-full"
          />
        </fieldset>

        <button className="btn btn-ghost" type="submit" disabled={isLoading}>
          Update Settings
        </button>
      </form>
    </>
  );
};

export default SettingsForm;
