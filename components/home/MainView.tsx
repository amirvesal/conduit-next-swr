import React from "react";

import TabList from "./TabList";
import ArticleList from "../article/ArticleList";

const MainView = () => (
  <div className="p-8 md:px-36 flex-grow">
    <div className="">
      <TabList />
    </div>
    <div className="divider"></div>
    <ArticleList />
  </div>
);

export default MainView;
