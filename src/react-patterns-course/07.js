// Prop collections with Render Props
import React from 'react';
import Switch from './Switch';

const lesson = '07';

class Toggle extends React.Component {
  state = {
    on: false,
  };

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );

  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      togglerProps: {
        onClick: this.toggle,
        'aria-pressed': this.state.on,
      },
    };
  }

  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

function Usage({
  onToggle = (...args) => console.log(lesson + ' onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({ on, togglerProps }) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} {...togglerProps} />
          <div>
            <button {...togglerProps}>{on ? 'on' : 'off'}</button>
          </div>
        </div>
      )}
    </Toggle>
  );
}

export default Usage;

/**
 * Sometimes you have common use cases that require common props to be applied to certain elements.
 * You can collect these props into an object for users to simply apply to their elements
 */
