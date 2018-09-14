import React from 'react';
import { Track } from './Track/Track';

// Track container component
export class TrackContainer extends React.Component {
  constructor(props) {
    super(props);
    // bind the current instance of this to .addTrack() and .removeTrack()
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

  }

  // Determines whether anchor tag displays a remove or add symbol based on the bool isRemoval
  renderAction(){
    const remove = '-';
    const add = '+';
    if(this.props.isRemoval) {
      return <a className="Track-action" id={this.props.key} onClick={this.removeTrack}>{remove}</a>;
    } else {
      return <a className="Track-action" id={this.props.key} onClick={this.addTrack}>{add}</a>;
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
    return <Track track={this.props.track} renderAction={this.renderAction} />;
  }
}
