import './Track.css'

export default function Track(props) {
  function addOrRemove() {
    props.onAction(props.track)
  }
  function renderAction() {
    return (
      <button type="submit" className="Track-action" onClick={addOrRemove}>
        {props.isRemoval ? '-' : '+'}
      </button>
    )
  }
  const button = renderAction()
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.title}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>

      {button}
    </div>
  )
}
