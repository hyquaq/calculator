import React from "react";
import PropTypes from "prop-types";

Screen.propTypes = {
  value: PropTypes.number.isRequired,
  preValue: PropTypes.number.isRequired,
  operator: PropTypes.string,
};

Screen.defaultProps = {
  value: 0,
  preValue: 0,
  operator: "",
};

function Screen({ value, preValue, operator }) {
  return (
    <>
      <p className="output">{value}</p>
      <p className="output__mini">{`${preValue} ${operator}`}</p>
    </>
  );
}

export default Screen;
