// Make Controlled React Components with Control Props
import React from 'react';
import Switch from './Switch';

class Toggle extends React.Component {
  state = { on: false };

  isControlled(prop) {
    return this.props[prop] !== undefined;
  }

  getState() {
    return {
      on: this.isControlled('on') ? this.props.on : this.state.on,
    };
  }

  toggle = () => {
    if (this.isControlled('on')) {
      this.props.onToggle(!this.getState().on);
    } else {
      this.setState(
        ({ on }) => ({ on: !on }),
        () => {
          this.props.onToggle(this.getState().on);
        }
      );
    }
  };

  render() {
    return <Switch on={this.getState().on} onClick={this.toggle} />;
  }
}

class Usage extends React.Component {
  state = { bothOn: false };

  handleToggle = on => {
    this.setState({ bothOn: on });
  };

  render() {
    const { bothOn } = this.state;
    const { toggle1Ref, toggle2Ref } = this.props;
    return (
      <div>
        <Toggle on={bothOn} onToggle={this.handleToggle} ref={toggle1Ref} />
        <Toggle on={bothOn} onToggle={this.handleToggle} ref={toggle2Ref} />
      </div>
    );
  }
}

Usage.title = 'Control Props';

export default Usage;

/**
 * While the state reducer pattern gives users total control over how the state is updated
 * internally to a component, it doesn't allow them to update state arbitrarily.
 * Let's implement the control props pattern (found in built-in components like <input />
 * through the value prop) to give users complete control over the state of our componentreducer
 * have more insight into the source of the changes and can reduce the changes based on that information.
 */
