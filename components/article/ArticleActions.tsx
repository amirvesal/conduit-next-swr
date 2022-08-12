import Router, { useRouter } from "next/router";
import React from "react";
import useSWR, { useSWRConfig } from "swr";

import CustomeLink from "../common/CustomeLink";
import checkLogin from "../../lib/utils/checkLogin";
import ArticleAPI from "../../lib/api/article";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";
import Maybe from "../common/Maybe";
import { Article, ArticleType } from "../../lib/types/articlesType";

const ArticleActions = ({ article }: Article) => {
  const { mutate } = useSWRConfig();
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const handleDelete = async () => {
    if (!isLoggedIn) return;

    const result = window.confirm("Do you really want to delete it?");

    if (!result) return;

    mutate(
      `${SERVER_BASE_URL}/articles/${pid}`,
      ArticleAPI.delete(pid, currentUser?.token)
    );

    Router.push("/");
  };

  const canModify =
    isLoggedIn && currentUser?.username === article?.author?.username;

  return (
    <Maybe test={canModify}>
      <span className="ml-auto">
        <CustomeLink className="btn btn-outline text-base-300" href="/editor/[pid]" as={`/editor/${article.slug}`}>
          <i /> Edit Article
        </CustomeLink>

        <button className="btn btn-error ml-4" onClick={handleDelete}>
          <i /> Delete Article
        </button>
      </span>
    </Maybe>
  );
};

export default ArticleActions;
