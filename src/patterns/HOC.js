import React from 'react';

export function WithResizer(Component) {
  return class extends React.Component {
    state = {
      innerWidth: '',
      innerHeight: '',
      scrollY: '',
    };

    componentDidMount = () => {
      this.setState(() => ({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        scrollY: window.scrollY,
      }));

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
      return <Component {...this.state} />;
    }
  };
}

export function Consumer({ innerWidth, innerHeight, scrollY }) {
  return (
    <>
      <p>Inner Width: {innerWidth}</p>
      <p>Inner Height: {innerHeight}</p>
      <p>ScrollY: {scrollY}</p>
    </>
  );
}

export default WithResizer(Consumer);
