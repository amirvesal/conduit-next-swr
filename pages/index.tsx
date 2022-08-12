import type { NextPage } from "next";
import React from "react";
import Head from "next/head";

import Banner from "../components/home/Banner";
import MainView from "../components/home/MainView";
import Tags from "../components/home/Tags";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>HOME | NEXT REALWORLD</title>
        <meta
          name="description"
          content="Next.js + SWR codebase containing realworld examples (CRUD, auth, advanced patterns, etc) that adheres to the realworld spec and API"
        />
      </Head>
      <div className="">
        <Banner />
        <div className="container">
          <div className="flex flex-col md:flex-row md:divide-x-4 justify-between">
            <MainView />
            <div className="p-2">
              <div className="">
                <p className="font-bold badge badge-lg">Popular&nbsp;Tags</p>
                <div className="btn-group">
                  <Tags />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
