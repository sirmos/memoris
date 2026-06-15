import { NextRequest, NextResponse } from 'next/server'
import pkg from 'pg'
const { Pool } = pkg
import bcrypt from 'bcryptjs'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
})

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }
    const user = result.rows[0]
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}