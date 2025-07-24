import React from "react";

function Masthead() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center home-gradient">
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{ flexDirection: "column" }}
      >
        <div className="col-12 d-flex justify-content-center">
          <span className="text-white font-weight-bold display-1 text-center">SignPop!</span>
        </div>
        <div className="col-lg-4 divider my-4" />
        <div className="d-flex justify-content-center mt-5">
          <a className="btn btn-info btn-lg px-3" href="#intro">
            Get Started <i className="fa fa-angle-down" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Masthead;
