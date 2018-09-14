import React from 'react';
import { SearchBar } from './SearchBar/SearchBar';

// SearchBar container component
export class SearchBarContainer extends React.Component {
  constructor(props) {
    super(props);
    // bind current instance of this to .search()
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  // passes the current state of term to this.props.onSearch
  search(term) {
    this.props.onSearch(term);
  }

  // sets the state of the searchbar's term to the event target's value
  handleTermChange(event) {
    const searchTerm = event.target.value;
    this.search(searchTerm);
  }

  render() {
    return <SearchBar onChange={this.handleTermChange} />;
  }
}
