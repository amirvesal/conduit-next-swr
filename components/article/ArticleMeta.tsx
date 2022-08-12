import React from "react";
import Moment from "moment";

import ArticleActions from "./ArticleActions";
import CustomeImage from "../common/CustomeImage";
import CustomeLink from "../common/CustomeLink";
import { Article } from "../../lib/types/articlesType";

const ArticleMeta = ({ article }: Article) => {
  if (!article) return null;

  return (
    <div className="flex items-center gap-2 mt-4">
      <CustomeLink
        href="/profile/[pid]"
        as={`/profile/${encodeURIComponent(article.author?.username)}`}
      >
        <CustomeImage
          className="mask mask-circle"
          src={article.author?.image}
          alt="author-profile-image"
        />
      </CustomeLink>

      <div className="flex flex-col">
        <CustomeLink
          href="/profile/[pid]"
          as={`/profile/${encodeURIComponent(article.author?.username)}`}
          className="font-bold"
        >
          {article.author?.username}
        </CustomeLink>
        <span className="text-xs font-thin ">
          {Moment(article.createdAt).format("dd-MMM-YYYY")}
        </span>
      </div>

      <ArticleActions article={article} />
    </div>
  );
};

export default ArticleMeta;
