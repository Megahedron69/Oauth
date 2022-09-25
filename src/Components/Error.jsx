import React from "react";
import { Link } from "react-router-dom";

export const Error = (props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src="https://images-na.ssl-images-amazon.com/images/I/41DYRKCLjPL._SL500_AC_SS350_.jpg"
        alt=""
      />
      <h1 className="font-extrabold text-2xl">Error {props.errorcode} !</h1>
      <p className="font-bold text-xl">
        Despair is only for those who see the <s>end beyond all doubt</s> error
        {props.errorcode}. We do not.
      </p>
      <Link to="/">
        <button className="m-4 py-3 px-5 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Return Back
        </button>
      </Link>
    </div>
  );
};
