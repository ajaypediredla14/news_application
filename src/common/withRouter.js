import React, { Component } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    return (
      <Component
        location={useLocation()}
        navigate={useNavigate()}
        params={useParams()}
        {...props}
      />
    );
  };

  return Wrapper;
};
