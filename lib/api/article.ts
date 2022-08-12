import axios from "axios";
import { ArticleType } from "../types/articlesType";

import { SERVER_BASE_URL } from "../utils/constant";
import { getQuery } from "../utils/getQuery";

class ArticleAPI {
  all = (page: number, limit = 10) => {
    return axios.get(`${SERVER_BASE_URL}/articles?${getQuery(limit, page)}`);
  };

  byAuthor = (author: string, page = 0, limit = 5) => {
    return axios.get(
      `${SERVER_BASE_URL}/articles?author=${encodeURIComponent(
        author
      )}&${getQuery(limit, page)}`
    );
  };

  byTag = (tag: string, page = 0, limit = 10) => {
    return axios.get(
      `${SERVER_BASE_URL}/articles?tag=${encodeURIComponent(tag)}&${getQuery(
        limit,
        page
      )}`
    );
  };

  delete = (id: string | string[], token: string) => {
    return axios.delete(`${SERVER_BASE_URL}/articles/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  };

  favorite = (slug: string) => {
    return axios.post(`${SERVER_BASE_URL}/articles/${slug}/favorite`);
  };

  favoritedBy = (author: string, page: number) => {
    return axios.get(
      `${SERVER_BASE_URL}/articles?favorited=${encodeURIComponent(
        author
      )}&${getQuery(10, page)}`
    );
  };

  feed = (page: number, limit = 10) => {
    return axios.get(
      `${SERVER_BASE_URL}/articles/feed?${getQuery(limit, page)}`
    );
  };

  get = (slug: string | string[]) => {
    return axios.get(`${SERVER_BASE_URL}/articles/${slug}`);
  };

  unfavorite = (slug: string) => {
    return axios.delete(`${SERVER_BASE_URL}/articles/${slug}/favorite`);
  };

  update = async (article: ArticleType, token: string) => {
    const { data, status } = await axios.put(
      `${SERVER_BASE_URL}/articles/${article.slug}`,
      JSON.stringify({ article }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      }
    );
    return {
      data,
      status,
    };
  };

  create = async (article, token: string) => {
    const { data, status } = await axios.post(
      `${SERVER_BASE_URL}/articles`,
      JSON.stringify({ article }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      }
    );

    return {
      data,
      status,
    };
  };
}

export default new ArticleAPI();
