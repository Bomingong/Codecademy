import React from 'react';
import { SearchResults } from './SearchResults/SearchResults';

// SearchResults container component
export class SearchResultsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return <SearchResults onAdd={this.props.onAdd} queriedTracks={this.props.searchResults} />;
  }
}
