import React from "react";

const RatingForm = ({
  name,
  id,
  value,
  changeHandler,
  optionsArr,
  defaultSelection,
}) => {
  return (
    <div className="shadow appearance-none border rounded w-full py-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <div>
        <label className="text-xl" htmlFor={name}>
          Rating :
        </label>
      </div>
      <div className=" text-lg text-purple-600">
        <select value={value} name={name} id={id} onChange={changeHandler}>
          <option value="">{defaultSelection}</option>
          {optionsArr.map((rating, index) => {
            return (
              <option key={index} value={rating}>
                {rating}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default RatingForm;
