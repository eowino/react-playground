// Compound Components
import React from 'react';
import Switch from './Switch';

const lesson = '02';

class Toggle extends React.Component {
  static On = ({ on, children }) => (on ? children : null);
  static Off = ({ on, children }) => (on ? null : children);
  static Button = ({ on, toggle, ...props }) => (
    <Switch on={on} onClick={toggle} {...props} />
  );

  state = {
    on: false,
  };

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );

  render() {
    return React.Children.map(this.props.children, childElement => {
      return React.cloneElement(childElement, {
        on: this.state.on,
        toggle: this.toggle,
      });
    });
  }
}

function Usage({
  onToggle = (...args) => console.log(lesson + ' onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.Off>
        <p>Other area dependant on switch being "off"</p>
      </Toggle.Off>
      <Toggle.On>
        <p>The button is on</p>
      </Toggle.On>
      <Toggle.Button />
      <Toggle.Off>
        <p>The button is off</p>
      </Toggle.Off>
    </Toggle>
  );
}

export default Usage;

/**
 * Allows users of this component to render things the way they like without the need for render props
 * State is shared tacitly inside the render method using
 */
