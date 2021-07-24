import TrackList from '../TrackList/TrackList'
import './Playlist.css'

export default function Playlist(props) {
  function handleName(e) {
    props.updateName(e.target.value)
  }
  return (
    <div className="Playlist">
      <input value={props.playlistName} onChange={handleName} />
      <TrackList
        isRemoval
        data={props.playlistTracks}
        onRemove={props.onRemove}
      />
      <button type="submit" className="Playlist-save" onClick={props.onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  )
}
