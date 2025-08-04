import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const validAuth = (req, res, next) => {
  const {Authorization} = req.headers

  if (!Authorization || !Authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' })
  }

  const token = Authorization.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}
