// @flow
import React from 'react';
import Usage1 from './react-patterns-course/01';
import Usage2 from './react-patterns-course/02';
import Usage3 from './react-patterns-course/03';

function Div(props) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2>{props.title}</h2>
      {props.children}
      <hr />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Advanced React Patterns</h1>
      <hr />
      <Div title="Build a Toggle Component">
        <Usage1 />
      </Div>
      <Div title="Compound Component">
        <Usage2 />
      </Div>
      <Div title="Using Context">
        <Usage3 />
      </Div>
    </div>
  );
}

export default App;
