import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import useSWR, { useSWRConfig } from "swr";
import Moment from "moment";

import CustomeLink from "../common/CustomeLink";
import CustomeImage from "../common/CustomeImage";
import { usePageDispatch } from "../../lib/context/PageContext";
import checkLogin from "../../lib/utils/checkLogin";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";
import { Article } from "../../lib/types/articlesType";

import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-accent btn-outline";

const ArticlePreview = ({ article }: Article) => {
  const setPage = usePageDispatch();

  const [preview, setPreview] = React.useState(article);
  const [hover, setHover] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(-1);

  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);

  const handleClickFavorite = async (slug: string | string[]) => {
    if (!isLoggedIn) {
      Router.push(`/user/login`);
      return;
    }

    setPreview({
      ...preview,
      favorited: !preview.favorited,
      favoritesCount: preview.favorited
        ? preview.favoritesCount - 1
        : preview.favoritesCount + 1,
    });

    try {
      if (preview.favorited) {
        await axios.delete(`${SERVER_BASE_URL}/articles/${slug}/favorite`, {
          headers: {
            Authorization: `Token ${currentUser?.token}`,
          },
        });
      } else {
        await axios.post(
          `${SERVER_BASE_URL}/articles/${slug}/favorite`,
          {},
          {
            headers: {
              Authorization: `Token ${currentUser?.token}`,
            },
          }
        );
      }
    } catch (error) {
      setPreview({
        ...preview,
      });
    }
  };

  if (!article) return null;

  return (
    <div>
      <div className="flex">
        <div className="flex items-center gap-2">
          <CustomeLink
            href="/profile/[pid]"
            as={`/profile/${preview.author.username}`}
          >
            <CustomeImage
              className="mask mask-squircle"
              src={preview.author.image}
              alt="author's profile image"
            />
          </CustomeLink>

          <div className="flex flex-col">
            <CustomeLink
              className="font-bold"
              href="/profile/[pid]"
              as={`/profile/${preview.author.username}`}
            >
              <span onClick={() => setPage(0)}>{preview.author.username}</span>
            </CustomeLink>
            <span className="text-xs font-thin text-gray-300">
              {Moment(preview.createdAt).format("dd-MMM-YYYY")}
            </span>
          </div>
        </div>

        <div className="ml-auto">
          <button
            className={
              preview.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS
            }
            onClick={() => handleClickFavorite(preview.slug)}
          >
            {preview.favorited ? (
              <HeartIcon className="w-4 h-4" />
            ) : (
              <HeartIconOutline className="w-4 h-4" />
            )}
            &nbsp;
            <i /> {preview.favoritesCount}
          </button>
        </div>
      </div>

      <CustomeLink href="/article/[pid]" as={`/article/${preview.slug}`}>
        <div className="prose min-w-full">
          <h2>{preview.title}</h2>
          <p>{preview.description}</p>
          <span>Read more...</span>
          <ul className="flex justify-end gap-3">
            {preview.tagList.map((tag, index) => {
              return (
                <Link href={`/?tag=${tag}`} as={`/?tag=${tag}`} key={index}>
                  <li
                    className="badge badge-ghost"
                    onClick={(e) => e.stopPropagation()}
                    onMouseOver={() => {
                      setHover(true);
                      setCurrentIndex(index);
                    }}
                    onMouseLeave={() => {
                      setHover(false);
                      setCurrentIndex(-1);
                    }}
                  >
                    <span
                      onClick={() => {
                        setPage(0);
                      }}
                    >
                      {tag}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </CustomeLink>
    </div>
  );
};

export default ArticlePreview;
