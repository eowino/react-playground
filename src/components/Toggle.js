import React from 'react';

type IToggle = {
  defaultOn?: boolean,
  on: boolean,
  onToggle: Function,
};

class Toggle extends React.Component<IToggle> {
  constructor(props) {
    super(props);
    this.state = {
      on: this.props.defaultOn || false,
    };
  }

  onToggle = () => {
    this.setState(() => ({
      on: !this.state.on,
    }));
  };

  render() {
    return this.props.children({
      on: this.state.on,
      onToggle: this.onToggle,
    });
  }
}

export default Toggle;
