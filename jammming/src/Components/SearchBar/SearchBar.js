import React from 'react';
import './SearchBar.css';

// SearchBar Presentational Component
export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: ''}
    // bind current instance of this to .search()
    this.search = this.search.bind(this);
    // bind current instance of .handleTermChange()
    this.handleTermChange = this.handleTermChange.bind(this);
    // bind current instance of .handleSearch()
    this.handleSearch = this.handleSearch.bind(this);
    // bind current instance of .returnSearch()
    this.returnSearch = this.returnSearch.bind(this);
  }

  // passes the current state of term to this.props.onSearch
  search(term) {
    this.props.onSearch(term);
  }

  // sets the state of the searchbar's term to the event target's value
  handleTermChange(e) {
    this.setState({searchTerm: e.target.value});
    //console.log(`Search Bar input: ${this.state.searchTerm}`);
  }

  handleSearch() {
    this.search(this.state.searchTerm);
  }

  returnSearch(event) {
    if(event.key === 'Enter') {
      this.search(this.state.searchTerm);
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} onKeyPress={this.returnSearch} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}
