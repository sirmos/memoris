'use client'
import { useEffect, useState } from 'react'
import { ShieldCheck, Folder, Heart, ArrowRight, Lock } from 'lucide-react'

export default function LandingPage() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('av_user'))
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0908; font-family: 'Inter', -apple-system, sans-serif; }
        .page { min-height: 100vh; background: #0a0908; color: #F5F1EA; }
        .nav { max-width: 1200px; margin: 0 auto; padding: 18px 40px; display: flex; align-items: center; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #F5F1EA; font-size: 16px; font-weight: 600; }
        .logo-icon { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid #C9A86A; display: flex; align-items: center; justify-content: center; color: #C9A86A; }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a { color: #9a8e80; text-decoration: none; font-size: 14px; }
        .nav-links a:hover { color: #F5F1EA; }
        .nav-right { display: flex; align-items: center; gap: 20px; }
        .signin { color: #9a8e80; text-decoration: none; font-size: 14px; }
        .nav-cta { background: #C9A86A; color: #0a0908; padding: 9px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; }
        .dashboard-btn { background: #C9A86A; color: #0a0908; padding: 9px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; }
        .hero { max-width: 780px; margin: 0 auto; padding: 52px 40px; text-align: center; }
        .badge { display: inline-flex; align-items: center; gap: 8px; border: 1px solid #3a3328; color: #C9A86A; padding: 7px 18px; border-radius: 50px; font-size: 13px; margin-bottom: 32px; }
        .hero h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 72px; font-weight: 700; line-height: 1.08; color: #F5F1EA; letter-spacing: -2px; }
        .hero h1 .gold { color: #C9A86A; font-style: italic; }
        .hero p { margin-top: 22px; font-size: 16px; color: #b5a898; line-height: 1.75; }
        .hero-btns { margin-top: 32px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .cta-btn { display: inline-flex; align-items: center; gap: 10px; background: transparent; color: #C9A86A; border: 1.5px solid #C9A86A; padding: 13px 32px; border-radius: 50px; font-size: 15px; font-weight: 500; text-decoration: none; }
        .cta-sub { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #8a7e72; }
        .cards { max-width: 1100px; margin: 0 auto; padding: 8px 40px 80px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .card { background: #141210; border: 1px solid #2e2820; border-radius: 14px; padding: 28px 26px; }
        .card-icon { width: 44px; height: 44px; border-radius: 50%; border: 1px solid #3a3328; display: flex; align-items: center; justify-content: center; color: #C9A86A; margin-bottom: 20px; }
        .card h3 { font-size: 15px; font-weight: 600; color: #F5F1EA; margin-bottom: 10px; }
        .card p { font-size: 13px; color: #b5a898; line-height: 1.65; }
        .footer { border-top: 1px solid #1e1a16; }
        .footer-inner { max-width: 1200px; margin: 0 auto; padding: 22px 40px; display: flex; justify-content: space-between; font-size: 12px; color: #3a3530; }
      `}</style>

      <div className="page">
        <nav className="nav">
          <a href="/" className="logo">
            <div className="logo-icon"><ShieldCheck size={15} /></div>
            Memoris
          </a>
          <ul className="nav-links">
            <li><a href="#how">How it works</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#resources">Resources</a></li>
          </ul>
          <div className="nav-right">
            {loggedIn ? (
              <a href="/dashboard" className="dashboard-btn">Go to my vault →</a>
            ) : (
              <>
                <a href="/signin" className="signin">Sign in</a>
                <a href="/signup" className="nav-cta">Create your vault</a>
              </>
            )}
          </div>
        </nav>

        <div className="hero">
          <div className="badge"><Heart size={13} /> Thoughtful end-of-life planning</div>
          <h1>Your digital life,<br/>passed on <span className="gold">with care.</span></h1>
          <p>Memoris helps you organize your accounts, assign them to loved ones, and ensure your wishes are carried out.</p>
          <div className="hero-btns">
            <a href={loggedIn ? '/dashboard' : '/signup'} className="cta-btn">
              {loggedIn ? 'Go to my vault' : 'Create your vault'} <ArrowRight size={16} />
            </a>
            <span className="cta-sub"><Lock size={13} /> Private, encrypted, and yours to control.</span>
          </div>
        </div>

        <div className="cards">
          <div className="card">
            <div className="card-icon"><Folder size={22} /></div>
            <h3>Organize with intention</h3>
            <p>Gather every account in one calm, secure place, from email to banking to subscriptions.</p>
          </div>
          <div className="card">
            <div className="card-icon"><ShieldCheck size={22} /></div>
            <h3>Assign to loved ones</h3>
            <p>Choose who receives what, so the people you trust are never left guessing.</p>
          </div>
          <div className="card">
            <div className="card-icon"><Heart size={22} /></div>
            <h3>Honor your wishes</h3>
            <p>Note how each account should be handled, whether transferred, closed, or kept in memory.</p>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-inner">
            <span>Memoris</span>
            <span>Made with care for life&apos;s hardest moments.</span>
          </div>
        </footer>
      </div>
    </>
  )
}
