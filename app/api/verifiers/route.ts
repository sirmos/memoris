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
    const result = await pool.query('SELECT * FROM verifiers WHERE user_id = $1 ORDER BY created_at DESC', [userId])
    return NextResponse.json({ verifiers: result.rows })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id')
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { name, email, relationship } = await req.json()
    const result = await pool.query(
      'INSERT INTO verifiers (user_id, name, email, relationship) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, name, email, relationship]
    )
    return NextResponse.json({ verifier: result.rows[0] }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id')
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await req.json()
    await pool.query('DELETE FROM verifiers WHERE id = $1 AND user_id = $2', [id, userId])
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
