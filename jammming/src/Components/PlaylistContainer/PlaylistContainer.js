import React from 'react';
import { Playlist } from './Playlist/Playlist';

// Playlist container component
export class PlaylistContainer extends React.Component {
  constructor(props) {
    super(props);
    // bind current instance of this to .handleNameChange()
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  // sets the state of the playlistName to the event target's value
  handleNameChange(e) {
    const name = e.target.value;
    this.props.onNameChange(name);
  }

  render() {
    return <Playlist onSave={this.props.onSave} onChange={this.handleNameChange}
    onRemove={this.props.onRemove} playlistName={this.props.playlistName}
    playlistTracks={this.props.playlistTracks} />;
  }
}
