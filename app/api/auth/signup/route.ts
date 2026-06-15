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
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }
    const password_hash = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password_hash]
    )
    return NextResponse.json({ user: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}