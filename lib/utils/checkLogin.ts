const checkLogin = (currentUser) => {
  return (
    !!currentUser &&
    currentUser?.constructor === Object &&
    Object.keys(currentUser).length !== 0
  );
};

export default checkLogin;
