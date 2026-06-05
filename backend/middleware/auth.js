import jwt from "jsonwebtoken"
import { User } from "../models/User.js"

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "")
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" })
  }
  try {
    // POSITIVT: Verifierar token mot hemlig nyckel (JWT_SECRET) innan åtkomst godkänns
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId)
    // SÄKERHETSBRIST (User Enumeration): Filen returnerar olika felmeddelanden beroende på varför autentisering misslyckas ("No token provided", "User not found", "Invalid token").
    // Kan avslöja info för angriparen om varför åtkomst nekades. Enligt säkerhetskrav från fas 1 bör samma generiska felmeddelande returneras oavsett orsak.
        if (!user) {
      return res.status(401).json({ success: false, message: "User not found" })
    }
    req.user = user
    next()
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" })
  }
}
