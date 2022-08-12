import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { marked } from "marked";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import ArticleMeta from "../../components/article/ArticleMeta";
import CommentList from "../../components/comment/CommentList";
import ArticleAPI from "../../lib/api/article";
import { Article, ArticleType } from "../../lib/types/articlesType";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";
import { AxiosError } from "axios";

const ArticlePage: NextPage<Article> = (initialArticle) => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const { data: fetchedArticle } = useSWR(
    `${SERVER_BASE_URL}/articles/${encodeURIComponent(String(pid))}`,
    fetcher,
    { fallbackData: initialArticle }
  );

  const { article }: Article = fetchedArticle || initialArticle;

  const markup = {
    __html: marked.parse(article?.body, { sanitize: true }),
  };

  return (
    <div className="">
      <div className="bg-slate-300 text-base-300 px-12 py-8">
        <h1 className="text-4xl font-bold">{article?.title}</h1>
        <ArticleMeta article={article} />
      </div>

      <div className="px-4 md:mx-12 mt-4">
        <div className="">
          <div
            className="prose prose-xl min-w-full mb-4"
            dangerouslySetInnerHTML={markup}
          />
          <ul>
            {article?.tagList.map((tag) => (
              <li className="badge mr-2" key={tag}>
                #&nbsp;{tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="divider" />

        <div className="my-8">
          <CommentList />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { pid },
}) => {
  try {
    const { data } = await ArticleAPI.get(pid);

    return {
      props: data,
    };
  } catch (err) {
    const error = err as AxiosError;

    if (error?.response.status === 404) {
      return {
        notFound: true,
      };
    }
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default ArticlePage;
