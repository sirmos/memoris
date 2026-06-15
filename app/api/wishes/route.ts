import { NextRequest, NextResponse } from 'next/server'
import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
})

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id')
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const result = await pool.query('SELECT * FROM wishes WHERE user_id = $1', [userId])
    return NextResponse.json({ wishes: result.rows[0] || null })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id')
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { content } = await req.json()
    const result = await pool.query(
      `INSERT INTO wishes (user_id, content) VALUES ($1, $2)
       ON CONFLICT (user_id) DO UPDATE SET content = $2, updated_at = NOW()
       RETURNING *`,
      [userId, content]
    )
    return NextResponse.json({ wishes: result.rows[0] })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}