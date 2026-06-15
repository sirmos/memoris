'use client'
import { useState } from 'react'
import { ShieldCheck, Eye, EyeOff } from 'lucide-react'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0908; font-family: 'Inter', -apple-system, sans-serif; }
        .page { min-height: 100vh; background: #0a0908; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; }
        .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #F5F1EA; font-size: 18px; font-weight: 600; margin-bottom: 40px; }
        .logo-icon { width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid #C9A86A; display: flex; align-items: center; justify-content: center; color: #C9A86A; }
        .box { background: #141210; border: 1px solid #2e2820; border-radius: 16px; padding: 40px; width: 100%; max-width: 420px; }
        .box h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 28px; color: #F5F1EA; margin-bottom: 8px; }
        .box p { font-size: 14px; color: #8a7e72; margin-bottom: 32px; }
        .field { margin-bottom: 20px; }
        .field label { display: block; font-size: 13px; color: #b5a898; margin-bottom: 8px; font-weight: 500; }
        .input-wrap { position: relative; }
        .field input { width: 100%; background: #0a0908; border: 1px solid #2e2820; border-radius: 8px; padding: 12px 16px; font-size: 14px; color: #F5F1EA; outline: none; font-family: 'Inter', sans-serif; }
        .field input:focus { border-color: #C9A86A; }
        .field input::placeholder { color: #4a4540; }
        .eye-btn { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #6b6058; cursor: pointer; display: flex; align-items: center; padding: 0; }
        .eye-btn:hover { color: #C9A86A; }
        .forgot { text-align: right; margin-top: 6px; }
        .forgot a { font-size: 12px; color: #C9A86A; text-decoration: none; }
        .error { background: rgba(180,60,60,0.1); border: 1px solid rgba(180,60,60,0.3); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #e08080; margin-bottom: 16px; }
        .submit { width: 100%; background: #C9A86A; color: #0a0908; border: none; border-radius: 8px; padding: 13px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 8px; font-family: 'Inter', sans-serif; }
        .divider { display: flex; align-items: center; gap: 12px; margin: 24px 0; }
        .divider span { font-size: 12px; color: #3a3530; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #2e2820; }
        .switch { text-align: center; font-size: 13px; color: #8a7e72; margin-top: 24px; }
        .switch a { color: #C9A86A; text-decoration: none; font-weight: 500; }
      `}</style>
      <div className="page">
        <a href="/" className="logo"><div className="logo-icon"><ShieldCheck size={15} /></div>Memoris</a>
        <div className="box">
          <h1>Welcome back</h1>
          <p>Sign in to access your vault</p>
          {error && <div className="error">{error}</div>}
          <div className="field">
            <label>Email address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Password</label>
            <div className="input-wrap">
              <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{paddingRight:'44px'}} />
              <button className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <div className="forgot"><a href="#">Forgot password?</a></div>
          </div>
          <button className="submit" onClick={async () => {
            if (!email || !password) { setError('Please enter your email and password.'); return }
            const res = await fetch('/api/auth/signin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            if (data.error) { setError(data.error); return }
            localStorage.setItem('av_user', data.user.email)
            localStorage.setItem('av_name', data.user.name)
            localStorage.setItem('av_id', String(data.user.id))
            window.location.href = '/dashboard'
          }}>Sign in to Memoris</button>
          <div className="divider"><span>or</span></div>
          <div className="switch">Don&apos;t have an account? <a href="/signup">Create one free</a></div>
        </div>
      </div>
    </>
  )
}
