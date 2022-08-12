import Router from "next/router";
import React from "react";
import { useSWRConfig } from "swr";

import ListErrors from "../common/ListErrors";
import UserAPI from "../../lib/api/user";

const RegisterForm = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { mutate } = useSWRConfig();

  const handleUsernameChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value),
    []
  );
  const hanldeEmailChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );
  const handlePasswordChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, status } = await UserAPI.register(
        username,
        email,
        password
      );
      if (status !== 200 && data?.errors) {
        setErrors(data.errors);
      }
      if (data?.user) {
        window.localStorage.setItem("user", JSON.stringify(data.user));
        mutate("user", data.user);
        Router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ListErrors errors={errors} />

      <form onSubmit={handleSubmit} className="form-control gap-4">
        <fieldset>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="input input-primary w-full"
          />
        </fieldset>

        <fieldset>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={hanldeEmailChange}
            className="input input-primary w-full"
          />
        </fieldset>

        <fieldset>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="input input-primary w-full"
          />
        </fieldset>

        <button className="btn btn-success" type="submit" disabled={isLoading}>
          Sign up
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
