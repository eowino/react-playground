// @flow
import React from 'react';
import Usage1 from './react-patterns-course/01';
import Usage2 from './react-patterns-course/02';
import Usage3 from './react-patterns-course/03';
import Usage4 from './react-patterns-course/04';
import Usage5 from './react-patterns-course/05';
import Usage6 from './react-patterns-course/06';
import Usage7 from './react-patterns-course/07';
import Usage8 from './react-patterns-course/08';
import Usage9 from './react-patterns-course/09';
import Usage10 from './react-patterns-course/10';
import Usage11 from './react-patterns-course/11';
import Usage12 from './react-patterns-course/12';
import Usage13 from './react-patterns-course/13';
import Usage14 from './react-patterns-course/14';
// import Usage15 from './react-patterns-course/15';
// import Usage16 from './react-patterns-course/16';
// import Usage17 from './react-patterns-course/17';
// import Usage18 from './react-patterns-course/18';

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
      <Div title="Validate Compound Components with Context Consumers">
        <Usage4 />
      </Div>
      <Div title="Prevent Unnecessary Rerenders of Compound Components using React Context">
        <Usage5 />
      </Div>
      <Div title="Render Props">
        <Usage6 />
      </Div>
      <Div title="Prop collections with Render Props">
        <Usage7 />
      </Div>
      <Div title="Use Prop Getters with Render Props">
        <Usage8 />
      </Div>
      <Div title="Use Component State Initializers">
        <Usage9 />
      </Div>
      <Div title="Implement Component State Reducers">
        <Usage10 />
      </Div>
      <Div title="Improve the usability of Component State Reducers with state change types">
        <Usage11 />
      </Div>
      <Div title="Improve the usability of Component State Reducers with state change types">
        <Usage12 />
      </Div>
      <Div title="Support Control Props for all state">
        <Usage13 />
      </Div>
      <Div title="Support a state change handler for all control props">
        <Usage14 />
      </Div>
    </div>
  );
}

export default App;
