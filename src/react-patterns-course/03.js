// Using Context
import React from 'react';
import Switch from './Switch';

const lesson = '03';

const ToggleContext = React.createContext();

class Toggle extends React.Component {
  static On = ({ children }) => (
    <ToggleContext.Consumer>
      {contextValue => (contextValue.on ? children : null)}
    </ToggleContext.Consumer>
  );

  static Off = ({ children }) => (
    <ToggleContext.Consumer>
      {contextValue => (contextValue.on ? null : children)}
    </ToggleContext.Consumer>
  );

  static Button = props => (
    <ToggleContext.Consumer>
      {contextValue => (
        <Switch on={contextValue.on} onClick={contextValue.toggle} {...props} />
      )}
    </ToggleContext.Consumer>
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
    return (
      <ToggleContext.Provider
        value={{
          on: this.state.on,
          toggle: this.toggle,
        }}>
        {this.props.children}
      </ToggleContext.Provider>
    );
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
      <div className="we-can-nest-elements-unlike-02.js">
        <div className="and-still-get-the-shared-state">
          <Toggle.Off>
            <p>The button is off</p>
          </Toggle.Off>
        </div>
      </div>
    </Toggle>
  );
}

export default Usage;

/**
 * There's a flaw with 02.js implementation.
 * If the consumer of that Component were to nest an element/component that is not 
  one of the defined compound components, the state will not be shared correctly as React.cloneElement
  will not apply the state to the intended component.
 *
 * One approach around that is to use the Context API like above
 */
