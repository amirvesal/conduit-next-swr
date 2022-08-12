import { ServerResponse } from "http";
import { NextPage } from "next";
import Router from "next/router";
import React from "react";
import useSWR, { useSWRConfig } from "swr";

import SettingsForm from "../../components/profile/SettingsForm";
import checkLogin from "../../lib/utils/checkLogin";
import storage from "../../lib/utils/storage";

const Settings: NextPage<{ res: ServerResponse }> = ({ res }) => {
  const { data: currentUser } = useSWR("user", storage);
  const { mutate } = useSWRConfig();
  const isLoggedIn = checkLogin(currentUser);

  if (!isLoggedIn) {
    if (res) {
      res.writeHead(302, {
        Location: "/",
      });
      res.end();
    }
  }

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    window.localStorage.removeItem("user");
    mutate("user", null, { optimisticData: null, revalidate: true });
    Router.push("/");
  };

  return (
    <div className="flex justify-center p-10 my-8">
      <div className="flex flex-col gap-4 w-96 border border-accent border-opacity-50  p-5 rounded-lg relative input-group-lg">
        <h1 className="font-bold transform -translate-y-10 bg-base-100 text-center absolute px-1">Your Settings</h1>
        <SettingsForm />
        <hr />
        <button className="btn btn-outline" onClick={handleLogout}>Or click here to logout</button>
      </div>
    </div>
  );
};

Settings.getInitialProps = async ({ res }) => {
  return {
    res,
  };
};

export default Settings;
