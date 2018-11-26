import React from 'react';

export default class Resizer extends React.Component {
  state = {
    innerWidth: '',
    innerHeight: '',
    scrollY: '',
  };

  componentDidMount = () => {
    this.listener = window.addEventListener('resize', e => {
      const window = e.target;
      this.setState(() => ({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        scrollY: window.scrollY,
      }));
    });
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.listener);
  };

  render() {
    return this.props.children({ ...this.state });
  }
}
