import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="loading">
        <div className="overlay ">
          <i className="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>
      </div>
    </div>
  );
};

export default Loading;
