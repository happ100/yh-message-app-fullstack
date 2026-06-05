import { useState, useEffect } from "react"
import { BASE_URL } from "./api"
import { PostMessage } from "./components/PostMessage"
import { MessageList } from "./components/MessageList"
import { AuthModal } from "./components/AuthModal"

export const App = () => {
  const [loading, setLoading] = useState(false)
  const [messageList, setMessageList] = useState([])
  const [user, setUser] = useState(null)
  const [modal, setModal] = useState(null)
  const [error, setError] = useState(null)

  const fetchPosts = () => {
    setLoading(true)
    // SÄKERHETSBRIST (BAC): /messages-endpointen hämtas utan autentisering. Vem som helst kan se alla meddelanden utan att vara inloggad.
    fetch(`${BASE_URL}/messages`)
      .then((res) => res.json())
      .then((data) => setMessageList(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    fetchPosts()
  }, [])

    const addNewPost = (newMessage) => {
    setMessageList([newMessage, ...messageList])
  }

  //POSITIVT: handleUnauthorized nollställer användarsessionen när token går ut. Logout-funktionen finns och nollställer användaren korrekt.
  const handleUnauthorized = () => {
    setUser(null)
    // SÄKERHETSBRIST (User Enumeration): Felmeddelandet "Your session has expired, please log in again" avslöjar info om sessionshanteringen för användaren.
    setError("Your session has expired, please log in again")
  }

  return (
    <>
        {user ? (
          <div className="user-info">
            <span>{user.response.username}</span>
            <button
              onClick={() => setUser(null)}
              className="auth-button"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button
              onClick={() => setModal("login")}
              className="auth-button"
            >
              Login
            </button>
            <button
              onClick={() => setModal("register")}
              className="auth-button"
            >
              Register
            </button>
          </div>
        )}
      {modal && (
        <AuthModal
          mode={modal}
          onClose={() => setModal(null)}
          onSuccess={(data) => {
            // SÄKERHETSBRIST (Information Disclosure): console.log("User logged in:", data) loggar användardata i webbläsarens konsol vilket är synligt för vem som helst som öppnar dev-verktygen i webbläsaren. Bör tas bort i skarp miljö.
            console.log("User logged in:", data)
            setUser(data)
            setModal(null)
          }}
        />
      )}
      {error && <p className="error">{error}</p>}
      <PostMessage newMessage={addNewPost} fetchPosts={fetchPosts} user={user} onUnauthorized={handleUnauthorized} />
      <MessageList
        loading={loading}
        messageList={messageList}
        setMessageList={setMessageList}
        fetchPosts={fetchPosts}
        user={user}
        onUnauthorized={handleUnauthorized}
      />
    </>
  )
}
