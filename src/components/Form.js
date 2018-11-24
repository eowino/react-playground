import React from 'react';
import styled from 'react-emotion';
import Input from './Input';
import Button from './Button';

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
    const { name, value } = evt.target;
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
    });
  }
}

const FormGroup = props => (
  <StyledFormGroup>
    <StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>
    <Input
      type="text"
      id={props.id}
      name={props.id}
      value={props.value}
      onChange={props.onChange}
    />
  </StyledFormGroup>
);

export default class extends React.Component {
  get initialValues() {
    return {
      name: '',
      surname: '',
      age: '',
    };
  }

  handleSubmit = (evt, values) => {
    evt.preventDefault();
    alert(JSON.stringify(values, null, 2));
  };

  render() {
    return (
      <Form initialValues={this.initialValues}>
        {({ values, handleChange }) => (
          <form onSubmit={e => this.handleSubmit(e, values)}>
            <FormGroup
              id="name"
              label="name"
              value={values.name}
              onChange={handleChange}
            />
            <FormGroup
              id="surname"
              label="surname"
              value={values.surname}
              onChange={handleChange}
            />
            <FormGroup
              id="age"
              label="age"
              value={values.age}
              onChange={handleChange}
            />
            <Button type="submit">Save</Button>
          </form>
        )}
      </Form>
    );
  }
}
