import React from "react";

type TagInputProps = {
  tagList: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
};

const TagInput = ({ tagList, addTag, removeTag }: TagInputProps) => {
  const [tag, setTag] = React.useState("");

  const changeTagInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTag(e.target.value);

  const handleTagInputkeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // Comma
        if (e.keyCode !== 9) e.preventDefault();
        handleAddTag();
        break;
      default:
        break;
    }
  };

  const handleAddTag = () => {
    if (!!tag) {
      addTag(tag);
      setTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    removeTag(tag);
  };

  return (
    <>
      <fieldset>
        <input
          type="text"
          placeholder="Enter tags"
          value={tag}
          onChange={changeTagInput}
          onBlur={handleAddTag}
          onKeyDown={handleTagInputkeyDown}
          className="input input-primary w-full"
        />

        <div>
          {tagList.map((tag, index) => {
            return (
              <span key={index}>
                <i onClick={() => handleRemoveTag(tag)} />
                {tag}
              </span>
            );
          })}
        </div>
      </fieldset>
    </>
  );
};

export default TagInput;
