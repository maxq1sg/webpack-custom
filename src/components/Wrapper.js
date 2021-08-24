import React from "react";
import data from "./../data";

const Wrapper = () => {
  return (
    <div>
      {data.map((item) => (
        <img src="./../images/image1.jpg" />
      ))}
    </div>
  );
};

export default Wrapper;
