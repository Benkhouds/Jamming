import TrackList from '../TrackList/TrackList'
import './SearchResults.css'

export default function SearchResults(props) {
  console.log(props.data)
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList isRemoval={false} data={props.data} onAdd={props.onAdd} />
    </div>
  )
}
