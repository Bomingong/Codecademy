import React, { Component } from 'react';
import './App.css';

import { SearchBarContainer } from '../SearchBarContainer/SearchBarContainer';
import { SearchResultsContainer } from '../SearchResultsContainer/SearchResultsContainer';
import { PlaylistContainer } from '../PlaylistContainer/PlaylistContainer';

import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // receives query results from Spotify API
      searchResults: [{
        name: 'youre undefined',
        artist: 'stop it',
        album: 'seriously',
        id: 'id2'
      }],
      playlistName: 'My Playlist',
      // array of track objects
      playlistTracks: [{
        name: 'Anywhere',
        artist: 'Lucas & Steve',
        album: 'Anywhere In The World',
        id: 'id1'
      }]
    }
    // bind methods to current instance of this
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // add a track to the playlist array if it is not already in the playlist
  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.state.playlistTracks.push(track);
    }
  }

  // remove a track from the playlist array
  removeTrack(track) {
    for(let i = 0; i < this.state.playlistTracks.length - 1; i++){
      if(this.state.playlistTracks[i].id === track.id) {
        this.state.playlistTracks.splice(i, 1);
      }
    }
  }

  // change the playlist name
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  // saves playlist tracks to an array
  savePlaylist() {
    let trackURI = this.state.playlistTracks.URI;
    Spotify.savePlaylist(this.state.playlistName, trackURI);
    this.setState({playlistName: 'New Playlist', playlistTracks: []});
  }

  // update the state of searchResults with with the value resolved from Yelp.search()'s promise
  search(term) {
    Spotify.search(term).then(track => {
      this.setState({searchResults: track});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBarContainer onSearch={this.search} />
          <div className="App-playlist">
            <SearchResultsContainer onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <PlaylistContainer onSave={this.onSave} onNameChange={this.updatePlaylistName}
            onRemove={this.removeTrack} playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
