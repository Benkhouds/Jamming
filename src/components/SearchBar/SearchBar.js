import { useRef } from 'react'
import './SearchBar.css'

export default function SearchBar(props) {
  const input = useRef()
  const form = useRef()
  function onSearch(e) {
    e.preventDefault()
    props.onSearch(input.current.value)
    form.current.reset()
  }
  return (
    <form className="SearchBar" onSubmit={onSearch} ref={form}>
      <input placeholder="Enter A Song, Album, or Artist" ref={input} />
      <button className="SearchButton">SEARCH</button>
    </form>
  )
}
