const client_id = '29c1af92451d4b06b189a301422f7e69';
const redirect_uri = 'https://jammmingwithchrisong.surge.sh';
//const redirect_uri = 'http://localhost:3000/';

// Spotify access token
let accesstoken;
// API URL
const queryURL = 'https://api.spotify.com/v1';

// Spotify module
const Spotify = {
  getAccessToken: function() {
    const regExpAccessToken = /access_token=([^&]*)/;
    const regExpExpiration = /expires_in=([^&]*)/;

    // first condition --> access token is already set
    if(accesstoken) {
      return accesstoken;
      // second condition --> accessToken is not set and user has authenticated
    } else if(!accesstoken && regExpAccessToken.test(window.location.href)) {
        // returns an array, index 0 including the whole match,
        // [1] only incuding the returned match within the () --> the token
        accesstoken = window.location.href.match(regExpAccessToken)[1];
        const expiresIn = window.location.href.match(regExpExpiration)[1];
        //window.location = `${redirect_uri}/callback#access_token=${accessToken}&token_type=Bearer&expires_in=${expiresIn}&state=123`
        window.setTimeout(() => accesstoken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accesstoken;
      // third condition --> accessToken is empty and is not in the URL
      // used else in case the first two conditions failed, therefore just have the user reauthenticate
    } else {
      const scope = '&scope=playlist-modify-public user-read-private';
        window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token`;
    }

  },

  search: function(term) {
    const accessToken = Spotify.getAccessToken();
    // information to reach Spotify API
    const endpoint = `${queryURL}/search?type=album,artist,track&q=${term}&limit=50`;
    //console.log(accessToken);

    // create spotify request, return response as a list of tracks in JSON
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      } else {
        return [];
      }
    });

  },

  savePlaylist: function(playlistName, trackURI) {
    const accessToken = Spotify.getAccessToken();

    if(!playlistName && !trackURI) {
      return;
    } else {
      let usrId;
      let playlistId;

      const usrEndpoint = `${queryURL}/me`;

      // GET user_id
      return fetch(usrEndpoint, {
        method: 'GET',
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        usrId = jsonResponse.id;
        const playlstEndpoint = `${queryURL}/users/${usrId}/playlists`;

        // POST a new playlist and receive playlist ID from request
        return fetch(playlstEndpoint, {
          method: 'POST',
          headers: {Authorization: `Bearer ${accessToken}`},
          body: JSON.stringify({name: playlistName})
        }).then(response => {
          return response.json();
        }).then(jsonResponse => {
          playlistId = jsonResponse.id;
          const trackEndpoint = `${queryURL}/users/${usrId}/playlists/${playlistId}/tracks`;

          // POST trackURIs to new playlist
          return fetch(trackEndpoint, {
            method: 'POST',
            headers: {Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify({uris: trackURI})
          }).then(response => {
            if(response.status === 201) {
              window.alert(`Your playlist: '${playlistName}' was created with the selected tracks!`);
            } else if(response.status === 202) {
              window.alert(`Attention:  Your request to create '${playlistName}' playlist was accepted, but not yet processed.`);
            } else {
              window.alert(`Error:  '${playlistName}' playlist was not saved.`);
            }
            return response.json();
          }).then(jsonResponse => {
            playlistId = jsonResponse.id;
          });

        });

      });

    }

  }

};

export default Spotify;
