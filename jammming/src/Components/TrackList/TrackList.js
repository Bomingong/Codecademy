import React from 'react';
import './TrackList.css';

import { Track } from '../Track/Track';

// TrackList Component
export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track =>
        <Track key={track.id} onRemove={this.props.onRemove} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} track={track} />
        )}
      </div>
    );
  }
}
