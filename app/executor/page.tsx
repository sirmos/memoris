'use client'
import { useState } from 'react'
import { ShieldCheck, Mail, Building, Bitcoin, Tv, Globe, Lock, Heart, ChevronDown, ChevronUp } from 'lucide-react'

const executorAssets = [
  { id: 1, label: 'Gmail - Personal', type: 'Email', icon: Mail, disposal: 'Transfer', notes: 'Email: johnenoch@gmail.com\nPassword: MyP@ss2024\nRecovery email: sarah@example.com', assignedTo: 'Sarah (Wife)' },
  { id: 2, label: 'GTBank Account', type: 'Bank', icon: Building, disposal: 'Transfer', notes: 'Account Number: 0123456789\nBVN: 12345678901\nOnline banking PIN: 4521\nBranch: Victoria Island Lagos', assignedTo: 'Sarah (Wife)' },
]

const wishes = 'I would like my family to celebrate my life with joy. Please ensure my digital accounts are handled with care and my memories preserved for my children. Sarah — please transfer the Gmail and bank accounts. David — the Binance wallet seed phrase is in the access notes. I love you all.'

export default function ExecutorPage() {
  const [expandedAsset, setExpandedAsset] = useState<number | null>(null)
  const [showWishes, setShowWishes] = useState(false)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0908; font-family: 'Inter', -apple-system, sans-serif; }
        .page { min-height: 100vh; background: #0a0908; color: #F5F1EA; }
        .header { border-bottom: 1px solid #2e2820; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #F5F1EA; font-size: 16px; font-weight: 600; }
        .logo-icon { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid #C9A86A; display: flex; align-items: center; justify-content: center; color: #C9A86A; }
        .unlocked-badge { display: flex; align-items: center; gap: 6px; background: rgba(80,180,120,0.12); border: 1px solid rgba(80,180,120,0.3); color: #80e0a8; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 500; }
        .content { max-width: 720px; margin: 0 auto; padding: 40px 40px 80px; }
        .condolence { background: rgba(201,168,106,0.06); border: 1px solid rgba(201,168,106,0.15); border-radius: 14px; padding: 24px 28px; margin-bottom: 36px; }
        .condolence h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 22px; color: #F5F1EA; margin-bottom: 8px; }
        .condolence p { font-size: 14px; color: #8a7e72; line-height: 1.7; }
        .section-title { font-size: 12px; font-weight: 600; color: #6b6058; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 14px; }
        .wishes-toggle { width: 100%; background: #141210; border: 1px solid rgba(201,168,106,0.2); border-radius: 12px; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; margin-bottom: 24px; font-family: 'Inter', sans-serif; }
        .wishes-toggle span { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 500; color: #C9A86A; }
        .wishes-content { background: #141210; border: 1px solid #2e2820; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
        .wishes-content p { font-size: 15px; color: #b5a898; line-height: 1.85; white-space: pre-wrap; font-style: italic; }
        .asset { background: #141210; border: 1px solid #2e2820; border-radius: 12px; margin-bottom: 10px; overflow: hidden; }
        .asset-top { padding: 18px 20px; display: flex; align-items: center; gap: 14px; cursor: pointer; }
        .asset-top:hover { background: rgba(201,168,106,0.03); }
        .asset-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(201,168,106,0.08); border: 1px solid #2e2820; display: flex; align-items: center; justify-content: center; color: #C9A86A; flex-shrink: 0; }
        .asset-info { flex: 1; }
        .asset-info .name { font-size: 14px; font-weight: 500; color: #F5F1EA; }
        .asset-info .sub { font-size: 12px; color: #6b6058; margin-top: 3px; }
        .disposal-badge { font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 20px; white-space: nowrap; background: rgba(201,168,106,0.15); color: #C9A86A; }
        .expand-icon { color: #6b6058; }
        .asset-notes { padding: 0 20px 20px; border-top: 1px solid #2e2820; margin-top: 0; }
        .notes-label { font-size: 11px; color: #6b6058; display: flex; align-items: center; gap: 4px; padding: 14px 0 10px; }
        .notes-content { background: #0a0908; border: 1px solid #2e2820; border-radius: 8px; padding: 14px; font-size: 13px; color: #b5a898; line-height: 1.8; white-space: pre-wrap; }
        .checklist-item { display: flex; align-items: center; gap: 10px; padding: 12px 0; border-bottom: 1px solid #1e1a16; font-size: 13px; color: #8a7e72; }
        .check-box { width: 18px; height: 18px; border-radius: 4px; border: 1px solid #3a3328; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .check-box.done { background: #C9A86A; border-color: #C9A86A; }
      `}</style>

      <div className="page">
        <header className="header">
          <a href="/" className="logo">
            <div className="logo-icon"><ShieldCheck size={14} /></div>
            Memoris
          </a>
          <div className="unlocked-badge">✓ Vault Unlocked</div>
        </header>

        <div className="content">
          <div className="condolence">
            <h2>A message from John Enoch</h2>
            <p>This vault was prepared with love and care. The assets and instructions below have been left specifically for you. Please follow the instructions for each item.</p>
          </div>

          <div className="section-title">Last Wishes</div>
          <button className="wishes-toggle" onClick={() => setShowWishes(!showWishes)}>
            <span><Heart size={15} /> Read John's last wishes</span>
            {showWishes ? <ChevronUp size={16} color="#6b6058" /> : <ChevronDown size={16} color="#6b6058" />}
          </button>
          {showWishes && (
            <div className="wishes-content"><p>{wishes}</p></div>
          )}

          <div className="section-title">Your Assigned Assets ({executorAssets.length})</div>
          {executorAssets.map(asset => (
            <div className="asset" key={asset.id}>
              <div className="asset-top" onClick={() => setExpandedAsset(expandedAsset === asset.id ? null : asset.id)}>
                <div className="asset-icon"><asset.icon size={18} /></div>
                <div className="asset-info">
                  <div className="name">{asset.label}</div>
                  <div className="sub">Instruction: {asset.disposal}</div>
                </div>
                <span className="disposal-badge">{asset.disposal}</span>
                {expandedAsset === asset.id
                  ? <ChevronUp size={16} className="expand-icon" />
                  : <ChevronDown size={16} className="expand-icon" />
                }
              </div>
              {expandedAsset === asset.id && (
                <div className="asset-notes">
                  <div className="notes-label"><Lock size={10} /> Access instructions from John</div>
                  <div className="notes-content">{asset.notes}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
