import React from 'react';
import './Playlist.css';

import { TrackList } from '../TrackList/TrackList';

// Playlist Component
export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  // passes App.updatePlaylistName the current value of the playlist name input field
  handleNameChange(event) {
    const name = event.target.value;
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
