import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";

import Layout from "../components/common/Layout";
import ContextProvider from "../lib/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </>
  );
}

export default MyApp;
