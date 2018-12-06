// Use Prop Getters with Render Props
import React from 'react';
import Switch from './Switch';

const lesson = '08';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

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
      getTogglerProps: this.getTogglerProps,
    };
  }

  getTogglerProps = ({ onClick, ...props }) => {
    return {
      'aria-pressed': this.state.on,
      onClick: callAll(onClick, this.toggle),
      ...props,
    };
  };

  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

function Usage({
  onToggle = (...args) => console.log(lesson + ' onToggle', ...args),
  onButtonClick = () => alert('onButtonClick'),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({ on, getTogglerProps }) => (
        <div>
          <Switch {...getTogglerProps({ on })} />
          <hr />
          <div>
            <button
              {...getTogglerProps({
                'aria-label': 'custom-btn',
                id: 'my-custom-id',
                onClick: onButtonClick,
              })}>
              {on ? 'on' : 'off'}
            </button>
          </div>
        </div>
      )}
    </Toggle>
  );
}

export default Usage;

/**
 * When you're using prop collections, sometimes you can run into trouble with exposing
 * implementation details of your prop collections. This demonstrates how we can
 * abstract that away by simply creating a function called a prop getter that will compose
 * the user's props with our prop collection
 */
