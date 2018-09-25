import React from 'react';
import './Track.css';

// Track Component
export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  // Determines whether anchor tag displays a remove or add symbol based on the bool isRemoval
  renderAction() {
    if(this.props.isRemoval) {
      return (<a className="Track-action" id={this.props.track.key} onClick={this.removeTrack}>-</a>);
    } else {
      return (<a className="Track-action" id={this.props.track.key} onClick={this.addTrack}>+</a>);
    }
  }

  // adds track to this.state.playlistTracks
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  // removes track from this.state.playlistTracks
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  render() {
    return (
      <div className="Track" >
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
          {this.renderAction()}
      </div>
    );
  }
}
