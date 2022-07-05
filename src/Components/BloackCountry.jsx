import React from "react";

const BlockCountry = ({ visit }) => {
  return (
    <div className="country-container">
      <div className="load">
        <div className="loading"></div>
      </div>
      <div className="block-country h2">
        <span> Your Country </span>
        has been access denied to this site
      </div>
    </div>
  );
};

export default BlockCountry;
