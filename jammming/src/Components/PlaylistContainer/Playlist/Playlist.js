import React from 'react';
import './Playlist.css';

import { TrackListContainer } from '../../TrackListContainer/TrackListContainer';

// Playlist Presentational Component
export class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input onChange={this.props.onChange} defaultValue={this.props.playlistName} />
        <TrackListContainer onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.playlistTracks} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
