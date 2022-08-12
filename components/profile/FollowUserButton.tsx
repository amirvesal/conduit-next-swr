import React from "react";

const FollowUserButton = ({
  isUser,
  following,
  username,
  follow,
  unfollow,
}) => {
  if (isUser) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    following ? unfollow(username) : follow(username);
  };

  return (
    <button className="btn-ghost btn" onClick={handleClick}>
      <i />
      &nbsp;
      {following ? "Unfollow" : "Follow"} {username}
    </button>
  );
};

export default FollowUserButton;
