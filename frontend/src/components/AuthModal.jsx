import { useState } from "react"
import { BASE_URL } from "../api"

export const AuthModal = ({ mode, onClose, onSuccess }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const url = mode === "register" ? `${BASE_URL}/register` : `${BASE_URL}/login`
      const body = mode === "register"
        ? { username, email, password }
        : { login, password }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Something went wrong")

        // SÄKERHETSBRIST (Information Disclosure): console.log("Auth successful:", data) och console.log(err) loggar känslig autentiseringsdata i webbläsarens konsol, synligt för vem som helst med tillgång till dev-verktygen.
      console.log("Auth successful:", data)
      onSuccess(data)
    } catch (err) {
      console.log(err)
      // SÄKERHETSBRIST (User Enumeration): setError(err.message) visar exakta felmeddelanden från backend direkt i gränssnittet vilket kan avslöja för en angripare om ett konto existerar eller inte.
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div onClick={onClose}>
      {/* SÄKERHETSBRIST (Brute Force): Saknar begränsning av antal inloggningsförsök i formuläret, kan skickas hur många gånger som helst utan blockering. */}
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="auth-form"
      >
        <h2>{mode === "register" ? "Register" : "Login"}</h2>

        {mode === "register" ? (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              autoComplete="username"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              autoComplete="email"
            />
          </>
        ) : (
          <input
            type="text"
            placeholder="Username or email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            name="login"
            autoComplete="username"
          />
        )}

{/* POSITIVT: Använder type="password" för lösenordsfältet så att texten döljs. autoComplete är korrekt satt för respektive fält.*/}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          autoComplete={mode === "register" ? "new-password" : "current-password"}
        />

        {error && <p className="error">{error}</p>}

        <button
          type="submit"
          className="auth-button"
          disabled={submitting}
        >
          {mode === "register" ? "Register" : "Login"}
        </button>
      </form>
    </div>
  )
}
