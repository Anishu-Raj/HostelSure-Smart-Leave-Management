const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  // Authorization: Bearer TOKEN — se token nikalo

  if (!token) {
    return res.status(401).json({ message: "No token — login first" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.student = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

module.exports = authMiddleware