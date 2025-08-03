import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const USERS_FILE = join(__dirname, '../data/users.json')

export function readUsers() {
  try {
    const data = readFileSync(USERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}

export function writeUsers(users) {
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}