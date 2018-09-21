import React, { Component } from 'react';
import './App.css';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // receives query results from Spotify API
      searchResults: [],
      playlistName: 'New Playlist',
      // array of track objects
      playlistTracks: []
    }

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
      let newPlaylistTracks = this.state.playlistTracks.concat(track);
      this.setState({playlistTracks: newPlaylistTracks});
    }
  }

  // remove a track from the playlist array
  removeTrack(track) {
    const playlist = this.state.playlistTracks;
    const filteredResult = playlist.filter(result => result.id !== track.id);
    this.setState({playlistTracks: filteredResult});
  }

  // change the playlist name
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  // saves playlist track URIs to an array, executes Spotify.savePlaylist(), resets playlist state
  savePlaylist() {
    const trackURI = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURI);
    this.setState({playlistName: 'New Playlist', playlistTracks: []});
  }

  // update the state of searchResults with the value resolved from Yelp.search()'s promise
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
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName}
            onRemove={this.removeTrack} playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
