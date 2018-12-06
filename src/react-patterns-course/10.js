// Implement Component State Reducers
import React from 'react';
import Switch from './Switch';

const lesson = '10';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
    stateReducer: (state, changes) => changes,
  };

  initialState = { on: this.props.initialOn };
  state = this.initialState;

  internalSetState(changes, callback) {
    this.setState(state => {
      // handle function setState call
      const changesObject =
        typeof changes === 'function' ? changes(state) : changes;

      // apply state reducer
      const reducedChanges =
        this.props.stateReducer(state, changesObject) || {};

      // return null if there are no changes to be made
      // (to avoid an unecessary rerender)
      return Object.keys(reducedChanges).length ? reducedChanges : null;
    }, callback);
  }

  reset = () =>
    this.internalSetState(this.initialState, () =>
      this.props.onReset(this.state.on)
    );

  toggle = () =>
    this.internalSetState(
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

class Usage extends React.Component {
  static defaultProps = {
    onToggle: (...args) => console.log(lesson + ' onToggle', ...args),
    onReset: (...args) => console.log(lesson + ' onReset', ...args),
  };

  initialState = { timesClicked: 0 };
  state = this.initialState;

  handleToggle = (...args) => {
    this.setState(({ timesClicked }) => ({
      timesClicked: timesClicked + 1,
    }));
    this.props.onToggle(...args);
  };

  handleReset = (...args) => {
    this.setState(this.initialState);
    this.props.onReset(...args);
  };

  toggleStateReducer = (state, changes) => {
    if (this.state.timesClicked >= 4) {
      return { ...changes, on: false };
    }
    return changes;
  };

  render() {
    const { timesClicked } = this.state;
    return (
      <Toggle
        stateReducer={this.toggleStateReducer}
        onToggle={this.handleToggle}
        onReset={this.handleReset}>
        {toggle => (
          <div>
            <Switch
              {...toggle.getTogglerProps({
                on: toggle.on,
              })}
            />
            {timesClicked > 4 ? (
              <div data-testid="notice">
                Whoa, you clicked too much!
                <br />
              </div>
            ) : timesClicked > 0 ? (
              <div data-testid="click-count">Click count: {timesClicked}</div>
            ) : null}
            <button onClick={toggle.reset}>Reset</button>
          </div>
        )}
      </Toggle>
    );
  }
}
Usage.title = 'State Reducers';

export default Usage;

/**
 * Often with reusable components, the logic needs to be adjusted to handle various use cases.
 * Rather than filling our component event handlers with if statements and loading our state
 * with one-off properties, we can expose our state directly to users of our reusable component
 * in a way that's flexible and simple with a state reducer.
 */
