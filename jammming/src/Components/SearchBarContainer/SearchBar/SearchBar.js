import React from 'react';
import './SearchBar.css';

// SearchBar Presentational Component
export class SearchBar extends React.Component {
  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.props.onChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.props.onClick}>SEARCH</a>
      </div>
    );
  }
}
