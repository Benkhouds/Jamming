//  import {useState} from react
import Track from '../Track/Track'
import './TrackList.css'

export default function TrackList(props) {
  return (
    <div className="TrackList">
      {props.data
        ? props.data.map((song) => {
            return (
              <Track
                key={song.id}
                track={song}
                isRemoval={props.isRemoval}
                onAction={props.isRemoval ? props.onRemove : props.onAdd}
              />
            )
          })
        : null}
    </div>
  )
}
