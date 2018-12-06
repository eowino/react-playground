// Compound Components
import React from 'react';
import Switch from './Switch';

const lesson = '05';

const ToggleContext = React.createContext();

function ContextConsumer(props) {
  return (
    <ToggleContext.Consumer>
      {context => {
        if (!context) {
          throw new Error(
            'Toggle compound components must be rendered within the Toggle component'
          );
        }
        return props.children(context);
      }}
    </ToggleContext.Consumer>
  );
}

class Toggle extends React.Component {
  static On = ({ children }) => (
    <ContextConsumer>
      {contextValue => (contextValue.on ? children : null)}
    </ContextConsumer>
  );

  static Off = ({ children }) => (
    <ContextConsumer>
      {contextValue => (contextValue.on ? null : children)}
    </ContextConsumer>
  );

  static Button = props => (
    <ContextConsumer>
      {contextValue => (
        <Switch on={contextValue.on} onClick={contextValue.toggle} {...props} />
      )}
    </ContextConsumer>
  );

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );

  state = {
    on: false,
    toggle: this.toggle,
  };

  render() {
    return (
      <ToggleContext.Provider value={this.state}>
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
      <Toggle.Off>
        <p>The button is off</p>
      </Toggle.Off>
    </Toggle>
  );
}

export default Usage;

/**
 * There's a flaw with 04.js implementation.

 * The way the Provider works, anytime the 'value' prop changes, it will re-render the Consumers 
 i.e. the Compount Components.
 * Due to the way the 'value' is set in 04.js, the 'value' prop changes in every single render.
 * The only time a re-render is issued is when 'this.state.on' changes

 What we want is for 'value' to be updated only when the state is updated. One way to do that,
 is to add the 'toggle' function to the state and then simply pass 'this.state' as the value
 to the Provider.

 It might be feel strange adding an event handler in state, but in this case its a nice trade off
 in favour of avoiding unecessary re-renders
 */
