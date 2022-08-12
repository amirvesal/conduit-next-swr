import Head from "next/head";
import React from "react";

import CustomeLink from "../../components/common/CustomeLink";
import LoginForm from "../../components/profile/LoginForm";

const Login = () => {
  return (
    <>
      <Head>
        <title>LOGIN | NEXT REALWORLD</title>
        <meta
          name="description"
          content="Please login to use fully-featured next-realworld site. (Post articles, comments, and like, follow etc.)"
        />
      </Head>

      <div className="flex justify-center p-10 my-8">
        <div className="flex flex-col gap-4 w-96 border border-accent border-opacity-50  p-5 rounded-lg relative input-group-lg">
          <h1 className="font-bold transform -translate-y-10 bg-base-100 text-center absolute px-1">Sign in</h1>
          <p>
            <CustomeLink className="link text-sm" href="/user/register" as="/user/register">
              Need an account?
            </CustomeLink>
          </p>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
