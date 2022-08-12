import Head from "next/head";
import React from "react";

import CustomeLink from "../../components/common/CustomeLink";
import RegisterForm from "../../components/profile/RegisterForm";

const Register = () => {
  return (
    <>
      <Head>
        <title>REGISTER | NEXT REALWORLD</title>
        <meta name="description" content="Please register before login" />
      </Head>

      <div className="flex justify-center p-10 my-8">
        <div className="flex flex-col gap-4 w-96 border border-accent border-opacity-50  p-5 rounded-lg relative input-group-lg">
          <h1 className="font-bold transform -translate-y-10 bg-base-100 text-center absolute px-1">
            Sign Up
          </h1>
          <p>
            <CustomeLink className="link text-sm" href="/user/login" as="/user/login">
              Have an account?
            </CustomeLink>
          </p>

          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Register;
