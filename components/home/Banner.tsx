import React from "react";
import { APP_NAME } from "../../lib/utils/constant";

const Banner = () => {
  return (
    <div className="bg-primary text-primary-content text-center py-4 select-none">
      <div className="">
        <div className="prose md:prose-lg min-w-full">
          <h1>{APP_NAME.toLowerCase()}</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
