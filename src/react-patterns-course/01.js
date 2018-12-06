// Compound Components
import React from 'react';
import Switch from './Switch';

const lesson = '01';

class Toggle extends React.Component {
  state = {
    on: false,
  };

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );

  render() {
    return <Switch on={this.state.on} onClick={this.toggle} />;
  }
}

function Usage({
  onToggle = (...args) => console.log(lesson + ' onToggle', ...args),
}) {
  return <Toggle onToggle={onToggle} />;
}

export default Usage;
