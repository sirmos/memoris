import pg from 'pg'
const { Client } = pg

const client = new Client({
  host: process.env.DB_HOST,
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'Bookmark111',
  ssl: { rejectUnauthorized: false }
})

async function setup() {
  console.log('Connecting to database...')
  await client.connect()
  console.log('Connected!')

  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
  console.log('users table created')

  await client.query(`
    CREATE TABLE IF NOT EXISTS assets (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      asset_type VARCHAR(50),
      label VARCHAR(255),
      assigned_to VARCHAR(255),
      disposal VARCHAR(50),
      notes TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
  console.log('assets table created')

  await client.query(`
    CREATE TABLE IF NOT EXISTS beneficiaries (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255),
      email VARCHAR(255),
      relationship VARCHAR(100),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
  console.log('beneficiaries table created')

  await client.query(`
    CREATE TABLE IF NOT EXISTS verifiers (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255),
      email VARCHAR(255),
      relationship VARCHAR(100),
      confirmed BOOLEAN DEFAULT FALSE,
      token VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
  console.log('verifiers table created')

  await client.query(`
    CREATE TABLE IF NOT EXISTS wishes (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
      content TEXT,
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `)
  console.log('wishes table created')

  await client.end()
  console.log('All tables created successfully!')
}

setup().catch(console.error)
