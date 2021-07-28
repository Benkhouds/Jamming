let accessToken = ''

const Spotify = {
  getAccessToken() {
    if (!accessToken) {
      const accessTokenMatch =
        window.location.href.match(/access_token=([^&]*)/)
      const expiresInToken = window.location.href.match(/expires_in=([^&]*)/)
      if (accessTokenMatch && expiresInToken) {
        accessToken = accessTokenMatch[1]
        const expiresIn = +expiresInToken[1]
        window.setTimeout(() => {
          accessToken = ''
        }, expiresIn * 1000)
        window.history.pushState('Access Token', null, '/')
      }
    }
    return accessToken
  },
  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        return data.tracks.items.map((track) => ({
          id: track.id,
          title: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }))
      })
      .catch((err) => console.log(err))
  },
  savePlaylist(name, trackURIs) {
    const headers = { Authorization: `Bearer ${accessToken}` }
    return fetch('https://api.spotify.com/v1/me', { headers })
      .then((res) => res.json())
      .then((user) => {
        return fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
          headers,
          method: 'POST',
          body: JSON.stringify({
            name,
            public: true,
          }),
        })
          .then((res) => res.json())
          .then((playlist) => {
            return fetch(
              `https://api.spotify.com/v1/playlists/${
                playlist.id
              }/tracks?uris=${trackURIs.join()}`,
              {
                headers,
                method: 'POST',
              },
            ).catch((err) => console.log(err))
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  },
}
export default Spotify
