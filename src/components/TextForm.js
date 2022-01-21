import React from "react";

const TextForm = ({ id, name, value, onChangeHandler, formTitle }) => {
  return (
    <div className="shadow appearance-none border rounded w-full py-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <div className="text-xl">
        <label htmlFor={name}>{formTitle} : </label>
      </div>
      <input
        className="border-2 border-black"
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default TextForm;
