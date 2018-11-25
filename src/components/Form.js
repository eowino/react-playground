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
    canSubmit: false,
  };

  handleChange = evt => {
    const target = evt.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: {
          ...prevState.values[name],
          value,
        },
      },
      canSubmit: this.canSubmit(),
    }));
  };

  setDirty = evt => {
    const target = evt.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(prevState => ({
      touched: {
        ...prevState.touched,
        [name]: true,
      },
      errors: {
        ...prevState.errors,
        [name]: prevState.values.name.validator(value),
      },
    }));
  };

  canSubmit = () => {
    // @TODO: Fix this logic - does not work
    const { errors } = this.state;
    let valid = true;
    for (var prop in errors) {
      if (errors.hasOwnProperty(prop) && errors[prop]) {
        valid = false;
      }
    }
    return valid;
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

function isRequired(value: string) {
  return value.length < 1;
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

  get initialValuesTwo() {
    return {
      name: {
        value: '',
        validator: isRequired,
      },
      surname: {
        value: '',
        validator: isRequired,
      },
      age: {
        value: '',
        validator: isRequired,
      },
      terms: {
        value: '',
        validator: isRequired,
      },
    };
  }

  handleSubmit = values => {
    alert(JSON.stringify(values, null, 2));
  };

  render() {
    return (
      <Form initialValues={this.initialValuesTwo} onSubmit={this.handleSubmit}>
        {props => {
          const {
            values,
            handleChange,
            setDirty,
            handleSubmit,
            canSubmit,
            errors,
          } = props;
          return (
            <React.Fragment>
              <form onSubmit={handleSubmit}>
                <FormGroup
                  id="name"
                  label="name"
                  value={values.name.value}
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
                  value={values.surname.value}
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
                  value={values.age.value}
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
                  value={values.terms.value}
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
                <Button type="submit" disabled={!canSubmit}>
                  Save
                </Button>
              </form>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </React.Fragment>
          );
        }}
      </Form>
    );
  }
}
