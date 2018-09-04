import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {term: '', location: '', sortBy: 'best_match'};

    //this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
  }

  // returns the current CSS class of the sort options,
  // should each one be styled as if it were selected
  getSortByClass(sortByOption) {
    if(this.state.sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    }
  };

  // sets the state of the sorting option
  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption
    });
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  }
  // Dynamically create the list items needed to display the sort items
  // future proof against changes to the Yelp API
  // Iterates through keys and values of sortByOptions object and returns a list item
  // List items element uses keys as attributes and values as content
  renderSortByOptions() {
    // Access keys through .keys() method
    // Iterate through keys with .map() method
    // callback function stores values in variable sortByOptionValue
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return <li
      className={this.getSortByClass(sortByOptionValue)}
      key={sortByOptionValue}
      onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
          {sortByOption}
      </li>;
    });
  }
  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange={this.handleTermChange} placeholder="Search Businesses" />
          <input onChange={this.handleLocationChange} placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Let&#39;s Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
