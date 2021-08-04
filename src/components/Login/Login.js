import './Login.css'

export default function Login() {
  function loginHandler() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_API_KEY_SPOTIFY}&response_type=token&scope=playlist-modify-public&redirect_uri=https://spotify-playlists-api.surge.sh/`
    window.location = authUrl
  }
  return (
    <div className="LoginWrapper">
      <button className="LoginButton" onClick={loginHandler}>
        Login
      </button>
    </div>
  )
}
