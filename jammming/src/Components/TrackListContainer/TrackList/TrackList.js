import React from 'react';
import './TrackList.css';

// TrackList Presentational Component
export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks}
      </div>
    );
  }
}
