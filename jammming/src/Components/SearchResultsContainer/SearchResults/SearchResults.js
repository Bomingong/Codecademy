import React from 'react';
import './SearchResults.css';

import { TrackListContainer } from '../../TrackListContainer/TrackListContainer';

// SearchResults Presentational component
export class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackListContainer onAdd={this.props.onAdd} tracks={this.props.queriedTracks} isRemoval={false} />
      </div>
    );
  }
}
