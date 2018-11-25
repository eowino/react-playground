import React, { Component } from 'react';
import TextInput from '../components/Input';

class Input extends Component {
  render() {
    return <TextInput />;
  }
}

class Option extends Component {
  render() {
    return <div>Option</div>;
  }
}

class Select extends Component {
  static Input = Input;
  static Option = Option;

  render() {
    const { children, ...rest } = this.props;
    return <div {...rest}>{children}</div>;
  }
}

export default Select;
