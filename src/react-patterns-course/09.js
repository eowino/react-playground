// Use Component State Initializers
import React from 'react';
import Switch from './Switch';

const lesson = '09';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
  };

  initialState = { on: this.props.initialOn };
  state = this.initialState;

  reset = () =>
    this.setState(this.initialState, () => this.props.onReset(this.state.on));

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );

  getTogglerProps = ({ onClick, ...props } = {}) => ({
    onClick: callAll(onClick, this.toggle),
    'aria-pressed': this.state.on,
    ...props,
  });

  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      reset: this.reset,
      getTogglerProps: this.getTogglerProps,
    };
  }

  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

function Usage({
  initialOn = true,
  onToggle = (...args) => console.log(lesson + ' onToggle', ...args),
  onReset = (...args) => console.log(lesson + ' onReset', ...args),
}) {
  return (
    <Toggle initialOn={initialOn} onToggle={onToggle} onReset={onReset}>
      {({ getTogglerProps, on, reset }) => (
        <div>
          <Switch {...getTogglerProps({ on })} />
          <hr />
          <button onClick={() => reset()}>Reset</button>
        </div>
      )}
    </Toggle>
  );
}
Usage.title = 'State Initializers';

export default Usage;

/**
 * This shows how to allow users to initialize the component's state with their
 * own defaults and support a reset functionality to reset to the initial state.
 */
