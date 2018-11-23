// @flow

import React from 'react';
import styled from 'react-emotion';

type IInput = {
  type?: string,
  className?: string,
};

const StyledInput = styled('input')({
  minHeight: 30,
  fontSize: '.9em',
  paddingLeft: 10,
  border: '1px solid #ccc',
  borderRadius: 3,
  '&:disabled': {
    background: '#f2f2f2',
    border: 'none',
  },
});

function Input({ type = 'text', className = '', ...rest }: IInput) {
  return <StyledInput type={type} className={className} {...rest} />;
}

export default Input;
