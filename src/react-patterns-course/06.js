// Compound Components
import React from 'react';
import Switch from './Switch';

const lesson = '06';

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
    return this.props.children({
      on: this.state.on,
      toggle: this.toggle,
    });
  }
}

function CommonToggle(props) {
  return (
    <Toggle {...props}>
      {({ on, toggle }) => <Switch on={on} onClick={toggle} />}
    </Toggle>
  );
}

function Usage({
  onToggle = (...args) => console.log(lesson + ' onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({ on, toggle }) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <div>
            <button onClick={toggle}>{on ? 'on' : 'off'}</button>
          </div>
        </div>
      )}
    </Toggle>
  );
}

export default Usage;

/**
 * The render prop pattern gives you the most flexible capability as to how components are rendered.
 * Its the most primitive API as any other pattern can be implemented on top of it.
 * The previous API (Compound component - 05.js) can be implemented using this render prop API i.e. CommonToggle
 */
