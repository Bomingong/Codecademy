import React from 'react';
import { TrackList } from './TrackList/TrackList';
import { TrackContainer } from '../TrackContainer/TrackContainer'

// TrackList container component
export class TrackListContainer extends React.Component {
  render() {
    // maps an array of TrackContainer Components from Playlist and SearchResults tracks
    const tracks = this.props.tracks.map(track => {
      return <TrackContainer key={track.id} onRemove={this.props.onRemove} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} track={track} />
    });

    return <TrackList tracks={this.tracks} />;
  }
}
