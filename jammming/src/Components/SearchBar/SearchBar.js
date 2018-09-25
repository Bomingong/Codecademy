import React from 'react';
import './SearchBar.css';

// SearchBar Component
export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: ''};
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReturnSearch = this.handleReturnSearch.bind(this);
  }

  // passes the current state of term to this.props.onSearch
  search(term) {
    this.props.onSearch(term);
  }

  // sets the state of searchTerm to the search bar input field
  handleTermChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  // passes the current searchTerm to .search()
  handleSearch() {
    this.search(this.state.searchTerm);
  }

  // passes the current searchTerm to .search() when carriage return is pushed
  handleReturnSearch(event) {
    if(event.key === 'Enter') {
      this.search(this.state.searchTerm);
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} onKeyPress={this.handleReturnSearch} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}
