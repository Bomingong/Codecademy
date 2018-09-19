import React from 'react';
import { SearchBar } from './SearchBar/SearchBar';

// SearchBar container component
export class SearchBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: ''}
    // bind current instance of this to .search()
    this.search = this.search.bind(this);
    // bind current instance of .handleTermChange()
    this.handleTermChange = this.handleTermChange.bind(this);
    // bind current instance of .handleSearch()
    this.handleSearch = this.handleSearch.bind(this);
  }

  // passes the current state of term to this.props.onSearch
  search(term) {
    this.props.onSearch(term);
  }

  // sets the state of the searchbar's term to the event target's value
  handleTermChange(event) {
    this.setState({searchTerm: event.target.value});
    //console.log(`Search Bar input: ${this.state.searchTerm}`);
  }

  handleSearch() {
    this.search(this.state.searchTerm);
  }

  render() {
    return <SearchBar onClick={this.handleSearch} onChange={this.handleTermChange} />;
  }
}
