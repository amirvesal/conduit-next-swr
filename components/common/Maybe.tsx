import React from "react";

const Maybe = ({
  test,
  children,
}: {
  test: boolean;
  children: React.ReactNode;
}) => <>{test && children}</>;

export default Maybe;
