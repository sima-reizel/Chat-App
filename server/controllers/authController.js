import { readUsers, writeUsers } from '../services/userService.js'

export function login(req, res) {
  const { userName, password } = req.body
  const users = readUsers()

  const foundUser = users.find(
    u => u.userName === userName && u.password === password
  )

  if (!foundUser) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  res.status(200).json({
    message: 'Login successful',
    user: {
      userName: foundUser.userName,
      email: foundUser.email,
    },
  })
}

export function register(req, res) {
  const { userName, password, email } = req.body

  if (!userName || !password || !email) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  const users = readUsers()

  const userExists = users.find(user => user.email === email || user.userName === userName && user.password === password)
  if (userExists) {
    return res.status(409).json({ message: 'User already exists' })
  }

  const newUser = { userName, password, email }
  users.push(newUser)
  writeUsers(users)

  res.status(201).json({ message: 'User registered and saved successfully' })
}