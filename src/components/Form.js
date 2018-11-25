import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import Input from './Input';
import Button from './Button';

const Checkbox = css({
  flexDirection: 'row',
  flexFlow: 'row-reverse',
  justifyContent: 'flex-end',
  alignItems: 'baseline',
});

const StyledErrorMessage = styled('p')({
  color: 'red',
  fontSize: '0.8em',
});

const StyledFormGroup = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 20,
});

const StyledLabel = styled('label')({
  textTransform: 'uppercase',
  marginBottom: 6,
});

export class Form extends React.Component {
  state = {
    errors: {},
    touched: {},
    values: this.props.initialValues || {},
  };

  handleChange = evt => {
    const target = evt.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  setDirty = evt => {
    const { name } = evt.target;
    this.setState(prevState => ({
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.values);
  };

  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
      setDirty: this.setDirty,
      handleSubmit: this.handleSubmit,
    });
  }
}

const FormGroup = props => (
  <StyledFormGroup className={props.type === 'checkbox' && Checkbox}>
    <StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>
    <Input
      type={props.type || 'text'}
      id={props.id}
      name={props.id}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
    />
  </StyledFormGroup>
);

function ErrorMessage({ errors, target, children }) {
  return errors[target] ? children() : null;
}

export default class MyForm extends React.Component {
  get initialValues() {
    return {
      name: '',
      surname: '',
      age: '',
      terms: '',
    };
  }

  handleSubmit = values => {
    alert(JSON.stringify(values, null, 2));
  };

  render() {
    return (
      <Form initialValues={this.initialValues} onSubmit={this.handleSubmit}>
        {props => {
          const {
            values,
            handleChange,
            setDirty,
            handleSubmit,
            errors,
          } = props;
          return (
            <React.Fragment>
              <form onSubmit={handleSubmit}>
                <FormGroup
                  id="name"
                  label="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={setDirty}
                />
                <ErrorMessage errors={errors} target="name">
                  {() => (
                    <StyledErrorMessage>
                      Please provide your name
                    </StyledErrorMessage>
                  )}
                </ErrorMessage>
                <FormGroup
                  id="surname"
                  label="surname"
                  value={values.surname}
                  onChange={handleChange}
                  onBlur={setDirty}
                />
                <ErrorMessage errors={errors} target="surname">
                  {() => (
                    <StyledErrorMessage>
                      Please provide your surname
                    </StyledErrorMessage>
                  )}
                </ErrorMessage>
                <FormGroup
                  id="age"
                  label="age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={setDirty}
                />
                <ErrorMessage errors={errors} target="age">
                  {() => (
                    <StyledErrorMessage>
                      Please provide your age
                    </StyledErrorMessage>
                  )}
                </ErrorMessage>
                <FormGroup
                  id="terms"
                  label="accept terms and conditions"
                  type="checkbox"
                  value={values.terms}
                  onChange={handleChange}
                  onBlur={setDirty}
                />
                <ErrorMessage errors={errors} target="terms">
                  {() => (
                    <StyledErrorMessage>
                      You must acknowledge that you agree with the terms
                    </StyledErrorMessage>
                  )}
                </ErrorMessage>
                <Button type="submit">Save</Button>
              </form>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </React.Fragment>
          );
        }}
      </Form>
    );
  }
}
