// @flow
import React from "react";
import styled from "react-emotion";

export interface IInput {
  type?: string;
  className?: string;
}

const StyledInput = styled("input")({
  minHeight: 30,
  fontSize: 13,
  paddingLeft: 10,
});

function Input({ type = "text", className = "", ...rest }: IInput) {
  return <StyledInput type={type} className={className} {...rest} />;
}

export default Input;
