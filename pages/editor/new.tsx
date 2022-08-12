import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import ListErrors from "../../components/common/ListErrors";
import TagInput from "../../components/editor/TagInput";
import ArticleAPI from "../../lib/api/article";
import storage from "../../lib/utils/storage";
import editorReducer from "../../lib/utils/editorReducer";

const PublishArticleEditor: NextPage = () => {
  const initialState = {
    title: "",
    description: "",
    body: "",
    tagList: [""],
  };

  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [posting, dispatch] = React.useReducer(editorReducer, initialState);
  const { data: currentUser } = useSWR("user", storage);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "SET_TITLE", text: e.target.value });
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "SET_DESCRIPTION", text: e.target.value });
  const handleBody = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch({ type: "SET_BODY", text: e.target.value });
  const addTag = (tag: string) => dispatch({ type: "ADD_TAG", tag: tag });
  const removeTag = (tag: string) => dispatch({ type: "REMOVE_TAG", tag: tag });

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ArticleAPI.create(posting, currentUser?.token);
      Router.push("/");
    } catch (err) {
      setErrors(err.response.data.errors);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center p-10 my-8">
      <div className="flex flex-col gap-4 w-3/4 border border-accent border-opacity-50  p-5 rounded-lg  input-group-lg">
        <ListErrors errors={errors} />
        <form className="form-control gap-4">
          <fieldset>
            <input
              type="text"
              placeholder="Artilce Title"
              value={posting.title}
              onChange={handleTitle}
              className="input input-primary w-full"
            />
          </fieldset>

          <fieldset>
            <input
              type="text"
              placeholder="What's this article about?"
              value={posting.description}
              onChange={handleDescription}
              className="input input-primary w-full"
            />
          </fieldset>

          <fieldset>
            <textarea
              rows={8}
              placeholder="Write your article (in markdown)"
              value={posting.body}
              onChange={handleBody}
              className="textarea input-primary  w-full"
            />
          </fieldset>

          <TagInput
            tagList={posting.tagList}
            addTag={addTag}
            removeTag={removeTag}
          />

          <button
            className="btn btn-ghost"
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Publish Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublishArticleEditor;
