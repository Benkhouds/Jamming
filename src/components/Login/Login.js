import './Login.css'

export default function Login() {
  function loginHandler() {
    const authUrl =
      'https://accounts.spotify.com/authorize?client_id=b54f0314b1eb482faf5f9f7a7257cc08&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:3000/'
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
