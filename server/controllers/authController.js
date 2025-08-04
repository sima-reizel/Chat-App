import { readUsers, writeUsers } from '../services/userService.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/tokenUtils.js'

export const register = async (req, res) => {
  try {
    const { userName, password, email } = req.body

    if (!userName || !password || !email) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    const users = await readUsers()
    const userExists = users.find(
      user => user.email === email || user.userName === userName
    )

    if (userExists) {
      return res.status(409).json({ message: 'User with same credentials already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = { userName, email, password: hashedPassword }
    users.push(newUser)
    await writeUsers(users)
    const token = generateToken(newUser)

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        userName: newUser.userName,
        email: newUser.email,
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body
    const users = await readUsers()

    const foundUser = users.find(user => user.userName === userName)
     if (!foundUser) {
      return res.status(401).json({ message: 'Invalid userName or password' })
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = generateToken(foundUser)

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        userName: foundUser.userName,
        email: foundUser.email,
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
