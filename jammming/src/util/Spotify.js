const client_id = '29c1af92451d4b06b189a301422f7e69';
const redirect_uri = 'http://localhost:3000/';

// Spotify access token
let accessToken;

// Spotify module
const Spotify = {
  getAccessToken: function() {
    const hasAuthenticated = /access_token/;
    // first condition --> access token is already set
    if(accessToken) {
      return accessToken;
      // second condition --> accessToken is not set and user has authenticated
    } else if(!accessToken && hasAuthenticated.test(window.location.href)) {
        const regExpAccessToken = /access_token=([^&]*)/;
        const regExpExpiration = /expires_in=([^&]*)/;
        // returns an array, index 0 including the whole match,
        // [1] only incuding the returned match within the () --> the token
        accessToken = window.location.href.match(regExpAccessToken)[1];
        const expiresIn = window.location.href.match(regExpExpiration)[1];
        window.location = `${redirect_uri}/callback#access_token=${accessToken}&token_type=Bearer&expires_in=${expiresIn}&state=123`
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      // third condition --> accessToken is empty and is not in the URL
      // used else in case the first to conditions failed, therefore just have the user reauthenticate
    } else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  },

  search: function(term) {
    // information to reach Spotify API
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    // create spotify request, return response as a list of tracks in JSON
    return fetch(endpoint, {
      headers: {Authorization: `Bearer: ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.map(track => ({
        ID: track.id,
        Name: track.name,
        Artist: track.artist,
        Album: track.album,
        URI: track.uri
      }))
    })
  },

  savePlaylist: function(playlistName, trackURI) {
    if(playlistName && trackURI) {
    } else {
      return;
    }
    const currentUsrToken = accessToken;
    const headers = {'Authorization': 'Bearer ' + currentUsrToken};
    let usrId;
    // GET user_id
    fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
      return response.json();
    }).then(jsonResponse => {
      usrId = jsonResponse.id;
    });
    let playlistId;
    // POST a new playlist and receive playlist ID from request
    fetch(`https://api.spotify.com/v1/users/${usrId}/playlists`, {
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + currentUsrToken, 'Content-Type': 'application/json'},
      body: {'name': playlistName}
    }).then(response => {
      response.json();
      }).then(jsonResponse => {
      playlistId = jsonResponse.id;
    });

    // POST trackURIs to new playlist
    fetch(`https://api.spotify.com/v1/users/${usrId}/playlists/${playlistId}/tracks`, {
      headers: {'Authorization': 'Bearer ' + currentUsrToken, 'Content-Type': 'application/json'},
      method: 'POST',
      /*body: {'uris': trackURI.map(uri => {
        for(let i = 0; i < trackURI.length - 1; i++) {
          return 'spotify:track:' + uri + for(let c = 0; c < trackURI.length - 2; c++) {
            return ' ,';
          }
        }
      }).toString()}*/
      body: {'uris': trackURI}
    }).then(response => {
      response.json();
    }).then(jsonResponse => {
      playlistId = jsonResponse.id;
    });
  }
};



export default Spotify;
