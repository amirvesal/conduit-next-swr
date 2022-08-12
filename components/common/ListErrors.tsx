import React from "react";

const ListErrors = ({ errors }) => (
  <ul className="">
    {Object.keys(errors).map((key) => {
      return (
        <li className="text-warning text-xs" key={key}>
          {key}&nbsp;{errors[key]}
        </li>
      );
    })}
  </ul>
);

export default ListErrors;
