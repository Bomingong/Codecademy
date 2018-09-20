import React from 'react';
import './Playlist.css';

import { TrackList } from '../TrackList/TrackList';

// Playlist Presentational Component
export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    const name = e.target.value;
    this.props.onNameChange(name);

  }
  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={this.props.playlistName} />
        <TrackList onRemove={this.props.onRemove} tracks={this.props.playlistTracks} isRemoval={true} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
