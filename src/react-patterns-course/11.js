// Improve the usability of Component State Reducers with state change types
import React from 'react';
import Switch from './Switch';

const lesson = '11';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
    stateReducer: (state, changes) => changes,
  };

  static stateChangeTypes = {
    reset: '__toggle_reset__',
    toggle: '__toggle_toggle__',
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

      // remove the type so it's not set into state
      const { type: ignoredType, ...onlyChanges } = reducedChanges;

      // return null if there are no changes to be made
      return Object.keys(onlyChanges).length ? onlyChanges : null;
    }, callback);
  }

  reset = () =>
    this.internalSetState(
      { ...this.initialState, type: Toggle.stateChangeTypes.reset },
      () => this.props.onReset(this.state.on)
    );

  toggle = ({ type = Toggle.stateChangeTypes.toggle } = {}) =>
    this.internalSetState(
      ({ on }) => ({ type, on: !on }),
      () => this.props.onToggle(this.state.on)
    );

  getTogglerProps = ({ onClick, ...props } = {}) => ({
    onClick: callAll(onClick, () => this.toggle()),
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
    if (changes.type === 'forced') {
      return changes;
    }
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
        onReset={this.handleReset}
        ref={this.props.toggleRef}>
        {({ on, toggle, reset, getTogglerProps }) => (
          <div>
            <Switch
              {...getTogglerProps({
                on: on,
              })}
            />
            {timesClicked > 4 ? (
              <div data-testid="notice">
                Whoa, you clicked too much!
                <br />
                <button onClick={() => toggle({ type: 'forced' })}>
                  Force Toggle
                </button>
                <br />
              </div>
            ) : timesClicked > 0 ? (
              <div data-testid="click-count">Click count: {timesClicked}</div>
            ) : null}
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </Toggle>
    );
  }
}
Usage.title = 'State Reducers (with change types)';

export default Usage;

/**
 * Users of this component can make custom modifications to the state whenever it changes,
 * but in more complex components they may only want to change the state updates for certain
 * types of changes. Let's add a type property to our changes object so people providing a state
 * reducer have more insight into the source of the changes and can reduce the changes based on that information.
 */
