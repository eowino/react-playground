import React from 'react';
import styled from 'react-emotion';

const StyledButton = styled('button')({
  padding: '0 16px',
  border: 0,
  borderRadius: 3,
  minWidth: 64,
  minHeight: 36,
  fontSize: '0.9em',
  textTransform: 'capitalize',
  fontWeight: 600,
  backgroundColor: '#f2f2f2',
  transition:
    'box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1)',
  boxShadow:
    '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
  '&:hover:not(:disabled), &:focus:not(:disabled)': {
    backgroundColor: 'rgba(158,158,158,.4)',
    boxShadow: '0 0 8px rgba(0,0,0,.18), 0 8px 16px rgba(0,0,0,.36)',
    outline: 'none',
    cursor: 'pointer',
  },
  '&:disabled': {
    opacity: 0.6,
  },
});

function Button({ children, ...rest }) {
  return (
    <StyledButton type="button" {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
