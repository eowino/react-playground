import React from 'react';
import styled from 'react-emotion';
import Input from './Input';

type IFilteredInput = {
  results: string[],
};

const StyledList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
});

const StyledResults = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export default class extends React.Component<IFilteredInput> {
  state = {
    value: '',
    results: this.props.results || [],
  };

  handleChange = (evt: Event) => {
    this.setState({
      value: evt.target.value,
    });
  };

  getFilteredresults() {
    const { value, results } = this.state;
    const filteredResults = results.filter(result =>
      result.match(new RegExp(value, 'i'))
    );
    return filteredResults.map((result, i) => <li key={i}>{result}</li>);
  }

  render() {
    return (
      <StyledResults>
        <Input
          onChange={this.handleChange}
          placeholder="Start typing to filter countries"
        />
        <StyledList>{this.getFilteredresults()}</StyledList>
      </StyledResults>
    );
  }
}
