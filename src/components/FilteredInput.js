import React from 'react';
import styled from 'react-emotion';
import Input from './Input';

type IFilteredInput = {
  results: string[],
  value: string,
  menuShowing: boolean,
};

const StyledList = styled('ul')(
  {
    listStyleType: 'none',
    padding: 0,
    maxHeight: 265,
    overflow: 'scroll',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
    margin: '3px 0 0',
    borderRadius: 3,
  },
  props => ({
    display: props.show ? 'block' : 'none',
  })
);

const StyledOption = styled('button')({
  padding: '10px 6px',
  fontSize: 13,
  background: '#fff',
  textAlign: 'left',
  border: 0,
  borderRadius: 0,
  width: '100%',
  '&:hover, &:focus': {
    background: '#0B5FFF',
    color: '#fff',
    outline: 'none',
  },
});

const StyledResults = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export default class FilteredInput extends React.Component {
  state: IFilteredInput = {
    value: '',
    results: this.props.results || [],
    menuShowing: false,
  };

  handleChange = (evt: Event) => {
    this.setState({
      value: evt.target.value,
      menuShowing: evt.target.value.length > 0 ? true : false,
    });
  };

  setSelected = newValue => {
    const value = newValue;
    this.setState({
      value,
      menuShowing: false,
    });
  };

  getFilteredresults() {
    const { value, results } = this.state;
    const filteredResults = results.filter(result =>
      result.match(new RegExp(value, 'i'))
    );
    return filteredResults.map((result, i) => (
      <li key={i}>
        <StyledOption onClick={() => this.setSelected(result)}>
          {result}
        </StyledOption>
      </li>
    ));
  }

  render() {
    const results = this.getFilteredresults();
    const { value, menuShowing } = this.state;

    return (
      <StyledResults>
        <Input
          onChange={this.handleChange}
          placeholder="Start typing to filter countries"
          value={value}
        />
        <StyledList show={menuShowing && results.length > 0}>
          {results}
        </StyledList>
        <p>results count: {results.length}</p>
      </StyledResults>
    );
  }
}
