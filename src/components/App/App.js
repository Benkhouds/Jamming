import { useState, useEffect } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import './App.css'

function App() {
  const DUMMY_DATA = [
    {
      id: 1,
      title: 'Leave the door open',
      artist: 'Bruno Mars',
      album: 'Silc Sonic',
    },
    {
      id: 2,
      title: 'Superstition',
      artist: 'Stevie Wonder',
      album: 'Superstition',
    },
    {
      id: 3,
      title: "Isn't she lovely",
      artist: 'Stevie Wonder',
      album: 'Superstition',
    },
    {
      id: 4,
      title: 'Nocturne no 9',
      artist: 'Chopin',
      album: 'Nocturnes',
    },
  ]

  const [isLoading, setIsLoading] = useState(true)
  const [searchResults, setSearchResults] = useState(null)
  const [playlistName, setPlaylistName] = useState('playlist')
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 5, title: 'test', artist: 'test', album: 'test' },
  ])
  function addTrack(track) {
    if (playlistTracks.every(({ id }) => id !== track.id)) {
      setPlaylistTracks([...playlistTracks, track])
    }
  }
  function removeTrack(track) {
    const copy = [...playlistTracks]
    copy.splice(copy.indexOf(track), 1)
    setPlaylistTracks([...copy])
  }
  function updatePlaylistName(name) {
    setPlaylistName(name)
  }
  function savePlaylist() {
    const trackURIs = [...playlistTracks]
    return trackURIs.map(({ id }) => id)
  }
  function search(term) {
    console.log(term)
  }
  useEffect(() => {
    setIsLoading(true)
    setSearchResults(DUMMY_DATA)
    setIsLoading(false)
  }, [])

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
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
