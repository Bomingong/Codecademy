import React from 'react';
import './SearchBar.css';

const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
};

class SearchBar extends React.Component {
  // Dynamically create the list items needed to display the sort items
  // future proof against changes to the Yelp API
  // Iterates through keys and values of sortByOptions object and returns a list item
  // List items element uses keys as attributes and values as content
  renderSortByOptions() {
    // Access keys through .keys() method
    // Iterate through keys with .map() method
    // callback function stores values in variable sortByOptionValue
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return <li key={sortByOptionValue}>{sortByOption}</li>;
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
          <input placeholder="Search Businesses" />
          <input placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a>Let&#39;s Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
