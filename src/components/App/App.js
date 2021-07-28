import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Login from '../Login/Login'
import Spotify from '../../util/Spotify'
import './App.css'
function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [accessToken, setAccessToken] = useState('')

  function addTrack(track) {
    if (playlistTracks.every(({ id }) => id !== track.id)) {
      setPlaylistTracks([...playlistTracks, track])
    }
  }
  window.addEventListener('DOMContentLoaded', () => {
    setAccessToken(Spotify.getAccessToken())
  })
  function removeTrack(track) {
    const copy = [...playlistTracks]
    copy.splice(copy.indexOf(track), 1)
    setPlaylistTracks([...copy])
  }
  function updatePlaylistName(name) {
    setPlaylistName(name)
  }

  function search(term) {
    setIsLoading(true)
    Spotify.search(term).then((results) => {
      setSearchResults(results)
      setIsLoading(false)
    })
  }
  function savePlaylist() {
    const URIs = playlistTracks.map(({ uri }) => uri)
    Spotify.savePlaylist(playlistName, URIs).then(() => {
      setPlaylistName('New Playlist')
      setPlaylistTracks([])
      setSearchResults([])
    })
  }
  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        {accessToken ? <SearchBar onSearch={search} /> : <Login />}

        <div className="App-playlist">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <SearchResults data={searchResults} onAdd={addTrack} />
          )}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            updateName={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  )
}

export default App
