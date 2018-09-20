import React from 'react';
import './SearchResults.css';

import { TrackList } from '../TrackList/TrackList';

// SearchResults Presentational component
export class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList onAdd={this.props.onAdd} tracks={this.props.searchResults} isRemoval={false} />
      </div>
    );
  }
}
