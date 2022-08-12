import axios from "axios";
import { GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import ListErrors from "../../components/common/ListErrors";
import TagInput from "../../components/editor/TagInput";
import ArticleAPI from "../../lib/api/article";
import { Article } from "../../lib/types/articlesType";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import editorReducer from "../../lib/utils/editorReducer";
import storage from "../../lib/utils/storage";

const UpdateArticleEditor = ({ article: initialArticle }: Article) => {
  const initialState = {
    title: initialArticle.title,
    description: initialArticle.description,
    body: initialArticle.body,
    tagList: initialArticle.tagList,
  };

  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [posting, dispatch] = React.useReducer(editorReducer, initialState);
  const { data: currentUser } = useSWR("user", storage);
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "SET_TITLE", text: e.target.value });
  const hanldeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "SET_DESCRIPTION", text: e.target.value });
  const handleBody = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch({ type: "SET_BODY", text: e.target.value });
  const addTag = (tag) => dispatch({ type: "ADD_TAG", tag: tag });
  const removeTag = (tag) => dispatch({ type: "REMOVE_TAG", tag: tag });

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);

    const { data, status } = await axios.put(
      `${SERVER_BASE_URL}/articles/${pid}`,
      JSON.stringify({ article: posting }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(currentUser?.token)}`,
        },
      }
    );
    setLoading(false);

    if (status !== 200) {
      setErrors(data.errors);
    }

    Router.push("/");
  };

  return (
    <div className="editor-page">
      <div className="continer page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ListErrors errors={errors} />

            <form>
              <fieldset className="form-group">
                <input
                  type="text"
                  placeholder="Article Title"
                  value={posting.title}
                  onChange={handleTitle}
                />
              </fieldset>

              <fieldset>
                <input
                  type="text"
                  placeholder="What's this article about?"
                  value={posting.description}
                  onChange={hanldeDescription}
                />
              </fieldset>

              <fieldset>
                <textarea
                  rows={8}
                  placeholder="Write your article (in markdown)"
                  value={posting.body}
                  onChange={handleBody}
                />
              </fieldset>

              <TagInput
                tagList={posting.tagList}
                addTag={addTag}
                removeTag={removeTag}
              />

              <button type="button" disabled={isLoading} onClick={handleSubmit}>
                Update Article
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO : fix error when page not found - 404
export const getServerSideProps: GetServerSideProps = async ({
  query: { pid },
}) => {
  const {
    data: { article },
  } = await ArticleAPI.get(pid);

  return {
    props: article,
  };
};

export default UpdateArticleEditor;
