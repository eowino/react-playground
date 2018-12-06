// Compound Components
import React from 'react';
import Switch from './Switch';

const lesson = '04';

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
      <Toggle.Off>
        <p>The button is off</p>
      </Toggle.Off>
    </Toggle>
  );
}

// function Usage({
//   onToggle = (...args) => console.log(lesson + ' onToggle', ...args),
// }) {
//   return (
//     <div>
//       <Toggle.Off>
//         <p>Other area dependant on switch being "off"</p>
//       </Toggle.Off>
//       <Toggle.On>
//         <p>The button is on</p>
//       </Toggle.On>
//       <Toggle.Button />
//       <Toggle.Off>
//         <p>The button is off</p>
//       </Toggle.Off>
//     </div>
//   );
// }

export default Usage;

/**
 * There's a flaw with 03.js implementation.
 * If a Consumer is rendered outside of a Provider, said Consumer would attempt to access values
 that do not exist (undefined) and the app will crash. Uncomment the 2nd Usage function and comment
 out the 1st one to see.
*
* The ToggleContext.Consumer doesn't make sense to me rendered outside the ToggleContext.Provider
* One way around this is to validate your compound components with context consumers and provide
useful error messages for the users of your components to ensure the context is provided.

* Sometimes having a default value can alleviate this, however, for Compound components this may not make sense
 */
