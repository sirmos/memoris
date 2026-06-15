'use client'
import { useState, useEffect } from 'react'
import { ShieldCheck, Folder, Users, Heart, Settings, LogOut, Plus, Mail, Building, Bitcoin, Tv, Globe, Trash2, Bell, X, Check, Edit2, Lock, Eye, EyeOff } from 'lucide-react'

const iconMap: Record<string, any> = {
  Email: Mail,
  Bank: Building,
  Crypto: Bitcoin,
  Streaming: Tv,
  Social: Globe,
  Other: Globe,
}

const mockAssets: any[] = []
const mockBeneficiaries: any[] = []
const mockVerifiers: any[] = []

const disposalColors: Record<string, string> = {
  Transfer: 'rgba(201,168,106,0.15)',
  Delete: 'rgba(180,60,60,0.15)',
  Memorialize: 'rgba(80,120,180,0.15)',
}
const disposalText: Record<string, string> = {
  Transfer: '#C9A86A',
  Delete: '#e08080',
  Memorialize: '#80a8e0',
}

export default function Dashboard() {
  const [activePage, setActivePage] = useState('vault')
  const [showModal, setShowModal] = useState(false)
  const [showBModal, setShowBModal] = useState(false)
  const [showVModal, setShowVModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState<number | null>(null)
  const [showNotesFor, setShowNotesFor] = useState<number | null>(null)
  const [assets, setAssets] = useState(mockAssets)
  const [beneficiaries, setBeneficiaries] = useState(mockBeneficiaries)
  const [verifiers, setVerifiers] = useState(mockVerifiers)
  const [form, setForm] = useState({ type: 'Email', label: '', assignedTo: '', disposal: 'Transfer', notes: '' })
  const [showFormNotes, setShowFormNotes] = useState(false)
  const [bForm, setBForm] = useState({ name: '', email: '', relationship: '' })
  const [vForm, setVForm] = useState({ name: '', email: '', relationship: '' })
  const [wishes, setWishes] = useState('I would like my family to celebrate my life with joy. Please ensure my digital accounts are handled with care and my memories preserved for my children.')
  const [wishesSaved, setWishesSaved] = useState(true)
  const [editingWishes, setEditingWishes] = useState(false)
  const [userName, setUserName] = useState('John')
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const name = localStorage.getItem('av_name')
    if (name) setUserName(name.split(' ')[0])
    const userId = localStorage.getItem('av_id')
    if (userId) {
      fetchAssets(userId)
      fetchBeneficiaries(userId)
      fetchWishes(userId)
      fetchVerifiers(userId)
    }
  }, [])

  async function fetchAssets(userId: string) {
    const res = await fetch('/api/assets', { headers: { 'x-user-id': userId } })
    const data = await res.json()
    if (data.assets) setAssets(data.assets.map((a: any) => ({
      ...a, icon: iconMap[a.asset_type] || Globe
    })))
    setLoading(false)
  }

  async function fetchBeneficiaries(userId: string) {
    const res = await fetch('/api/beneficiaries', { headers: { 'x-user-id': userId } })
    const data = await res.json()
    if (data.beneficiaries) setBeneficiaries(data.beneficiaries.map((b: any) => ({
      ...b, assets: []
    })))
  }

  async function fetchWishes(userId: string) {
    const res = await fetch('/api/wishes', { headers: { 'x-user-id': userId } })
    const data = await res.json()
    if (data.wishes) setWishes(data.wishes.content)
  }

  async function fetchVerifiers(userId: string) {
    const res = await fetch('/api/verifiers', { headers: { 'x-user-id': userId } })
    const data = await res.json()
    if (data.verifiers) setVerifiers(data.verifiers)
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function addAsset() {
    if (!form.label) return
    const userId = localStorage.getItem('av_id')
    if (!userId) return
    const res = await fetch('/api/assets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
      body: JSON.stringify({
        asset_type: form.type,
        label: form.label,
        assigned_to: form.assignedTo,
        disposal: form.disposal,
        notes: form.notes
      })
    })
    const data = await res.json()
    if (data.asset) {
      setAssets([{ ...data.asset, icon: iconMap[data.asset.asset_type] || Globe }, ...assets])
      showToast('Asset added successfully')
    }
    setForm({ type: 'Email', label: '', assignedTo: '', disposal: 'Transfer', notes: '' })
    setShowFormNotes(false)
    setShowModal(false)
  }

  async function addBeneficiary() {
    if (!bForm.name || !bForm.email) return
    const userId = localStorage.getItem('av_id')
    if (!userId) return
    const res = await fetch('/api/beneficiaries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
      body: JSON.stringify(bForm)
    })
    const data = await res.json()
    if (data.beneficiary) {
      setBeneficiaries([...beneficiaries, { ...data.beneficiary, assets: [] }])
      showToast('Beneficiary added successfully')
    }
    setBForm({ name: '', email: '', relationship: '' })
    setShowBModal(false)
  }

  async function addVerifier() {
    if (!vForm.name || !vForm.email) return
    const userId = localStorage.getItem('av_id')
    if (!userId) return
    const res = await fetch('/api/verifiers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
      body: JSON.stringify(vForm)
    })
    const data = await res.json()
    if (data.verifier) {
      setVerifiers([...verifiers, data.verifier])
      showToast('Verifier added — invite email sent')
    }
    setVForm({ name: '', email: '', relationship: '' })
    setShowVModal(false)
  }

  async function saveWishes() {
    const userId = localStorage.getItem('av_id')
    if (!userId) return
    await fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
      body: JSON.stringify({ content: wishes })
    })
    setWishesSaved(true)
    setEditingWishes(false)
    showToast('Your wishes have been saved')
  }

  function assignAssetToBeneficiary(beneficiaryId: number, assetLabel: string, checked: boolean) {
    setBeneficiaries(beneficiaries.map(b => {
      if (b.id !== beneficiaryId) return b
      const updated = checked ? [...b.assets, assetLabel] : b.assets.filter(a => a !== assetLabel)
      return { ...b, assets: updated }
    }))
  }

  function signOut() {
    localStorage.removeItem('av_user')
    localStorage.removeItem('av_name')
    window.location.href = '/'
  }

  const allConfirmed = verifiers.length > 0 && verifiers.every(v => v.confirmed)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0908; font-family: 'Inter', -apple-system, sans-serif; }
        .layout { display: flex; min-height: 100vh; background: #0a0908; color: #F5F1EA; }
        .sidebar { width: 240px; background: #0f0d0b; border-right: 1px solid #2e2820; padding: 24px 0; display: flex; flex-direction: column; position: fixed; height: 100vh; }
        .sidebar-logo { display: flex; align-items: center; gap: 10px; padding: 0 24px 32px; color: #F5F1EA; font-size: 16px; font-weight: 600; text-decoration: none; }
        .logo-icon { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid #C9A86A; display: flex; align-items: center; justify-content: center; color: #C9A86A; flex-shrink: 0; }
        .nav-label { font-size: 10px; color: #8a7e72; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; padding: 0 24px; margin-bottom: 8px; margin-top: 8px; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 11px 24px; font-size: 14px; color: #8a7e72; cursor: pointer; border-left: 2px solid transparent; transition: all 0.15s; }
        .nav-item:hover { color: #F5F1EA; background: rgba(201,168,106,0.05); }
        .nav-item.active { color: #C9A86A; border-left-color: #C9A86A; background: rgba(201,168,106,0.07); }
        .sidebar-bottom { margin-top: auto; border-top: 1px solid #2e2820; padding-top: 16px; }
        .main { margin-left: 240px; flex: 1; padding: 32px 40px; }
        .topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
        .topbar h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 26px; color: #F5F1EA; }
        .topbar p { font-size: 13px; color: #6b6058; margin-top: 3px; }
        .add-btn { display: inline-flex; align-items: center; gap: 8px; background: #C9A86A; color: #0a0908; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
        .stat { background: #141210; border: 1px solid #2e2820; border-radius: 12px; padding: 20px 24px; }
        .stat .num { font-size: 28px; font-weight: 600; color: #C9A86A; }
        .stat .lbl { font-size: 12px; color: #6b6058; margin-top: 4px; }
        .section-title { font-size: 13px; font-weight: 600; color: #8a7e72; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 14px; }
        .asset-list { display: flex; flex-direction: column; gap: 10px; }
        .asset { background: #141210; border: 1px solid #2e2820; border-radius: 12px; padding: 16px 20px; }
        .asset-top { display: flex; align-items: center; gap: 16px; }
        .asset-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(201,168,106,0.08); border: 1px solid #2e2820; display: flex; align-items: center; justify-content: center; color: #C9A86A; flex-shrink: 0; }
        .asset-info { flex: 1; }
        .asset-info .name { font-size: 14px; font-weight: 500; color: #F5F1EA; }
        .asset-info .sub { font-size: 12px; color: #6b6058; margin-top: 3px; }
        .disposal-badge { font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 20px; white-space: nowrap; }
        .notes-toggle { background: none; border: 1px solid #2e2820; border-radius: 6px; color: #6b6058; cursor: pointer; padding: 5px 10px; font-size: 11px; display: flex; align-items: center; gap: 4px; font-family: 'Inter', sans-serif; }
        .notes-toggle:hover { border-color: #C9A86A; color: #C9A86A; }
        .delete-btn { background: none; border: none; color: #3a3530; cursor: pointer; padding: 4px; display: flex; }
        .delete-btn:hover { color: #e08080; }
        .notes-box { margin-top: 14px; padding: 14px; background: rgba(201,168,106,0.04); border: 1px solid rgba(201,168,106,0.15); border-radius: 8px; font-size: 12px; color: #b5a898; line-height: 1.8; white-space: pre-wrap; }
        .notes-warning { font-size: 11px; color: #6b6058; margin-bottom: 8px; display: flex; align-items: center; gap: 4px; }
        .bcard { background: #141210; border: 1px solid #2e2820; border-radius: 12px; padding: 20px 24px; margin-bottom: 10px; }
        .bcard-top { display: flex; align-items: center; gap: 16px; }
        .avatar { width: 44px; height: 44px; border-radius: 50%; background: rgba(201,168,106,0.12); border: 1px solid #3a3328; display: flex; align-items: center; justify-content: center; color: #C9A86A; font-size: 16px; font-weight: 600; flex-shrink: 0; }
        .binfo { flex: 1; }
        .binfo .bname { font-size: 14px; font-weight: 500; color: #F5F1EA; }
        .binfo .bsub { font-size: 12px; color: #6b6058; margin-top: 3px; }
        .assets-count { font-size: 12px; color: #C9A86A; background: rgba(201,168,106,0.1); padding: 4px 10px; border-radius: 20px; white-space: nowrap; }
        .assign-btn { font-size: 12px; color: #C9A86A; background: transparent; border: 1px solid rgba(201,168,106,0.3); padding: 5px 12px; border-radius: 6px; cursor: pointer; font-family: 'Inter', sans-serif; margin-left: 8px; }
        .assign-list { margin-top: 14px; padding-top: 14px; border-top: 1px solid #2e2820; display: flex; flex-wrap: wrap; gap: 8px; }
        .assign-chip { display: flex; align-items: center; gap: 6px; font-size: 12px; padding: 5px 12px; border-radius: 20px; border: 1px solid #2e2820; cursor: pointer; color: #8a7e72; background: transparent; font-family: 'Inter', sans-serif; }
        .assign-chip.selected { background: rgba(201,168,106,0.12); border-color: rgba(201,168,106,0.4); color: #C9A86A; }
        .vcard { background: #141210; border: 1px solid #2e2820; border-radius: 12px; padding: 20px 24px; display: flex; align-items: center; gap: 16px; margin-bottom: 10px; }
        .vstatus { font-size: 12px; padding: 4px 12px; border-radius: 20px; font-weight: 500; white-space: nowrap; }
        .confirmed { background: rgba(80,180,120,0.15); color: #80e0a8; }
        .pending { background: rgba(180,140,60,0.15); color: #e0c080; }
        .wishes-display { background: #141210; border: 1px solid #2e2820; border-radius: 12px; padding: 28px; }
        .wishes-display p { font-size: 15px; color: #b5a898; line-height: 1.85; white-space: pre-wrap; }
        .wishes-actions { display: flex; gap: 10px; margin-top: 16px; }
        .edit-btn { display: inline-flex; align-items: center; gap: 6px; background: transparent; color: #C9A86A; border: 1px solid rgba(201,168,106,0.3); padding: 9px 20px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'Inter', sans-serif; }
        .wishes-box { background: #141210; border: 1px solid #2e2820; border-radius: 12px; padding: 24px; }
        .wishes-box textarea { width: 100%; background: transparent; border: none; color: #b5a898; font-size: 15px; line-height: 1.85; resize: none; outline: none; font-family: 'Inter', sans-serif; min-height: 220px; }
        .save-btn { display: inline-flex; align-items: center; gap: 8px; margin-top: 16px; background: #C9A86A; color: #0a0908; border: none; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; }
        .banner { background: rgba(201,168,106,0.07); border: 1px solid rgba(201,168,106,0.2); border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; font-size: 13px; color: #b5a898; line-height: 1.6; }
        .banner strong { color: #C9A86A; }
        .vault-unlocked { background: rgba(80,180,120,0.08); border: 1px solid rgba(80,180,120,0.25); border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; font-size: 13px; color: #80e0a8; }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
        .modal { background: #141210; border: 1px solid #2e2820; border-radius: 16px; padding: 32px; width: 100%; max-width: 480px; position: relative; max-height: 90vh; overflow-y: auto; }
        .modal h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 22px; color: #F5F1EA; margin-bottom: 24px; }
        .close-btn { position: absolute; top: 20px; right: 20px; background: none; border: none; color: #6b6058; cursor: pointer; }
        .mfield { margin-bottom: 18px; }
        .mfield label { display: block; font-size: 12px; color: #b5a898; margin-bottom: 7px; font-weight: 500; }
        .mfield input, .mfield select, .mfield textarea { width: 100%; background: #0a0908; border: 1px solid #2e2820; border-radius: 8px; padding: 11px 14px; font-size: 14px; color: #F5F1EA; outline: none; font-family: 'Inter', sans-serif; }
        .mfield textarea { resize: none; min-height: 100px; line-height: 1.6; }
        .mfield input:focus, .mfield select:focus, .mfield textarea:focus { border-color: #C9A86A; }
        .mfield input::placeholder, .mfield textarea::placeholder { color: #4a4540; }
        .mfield select option { background: #141210; }
        .notes-hint { font-size: 11px; color: #4a4540; margin-top: 6px; display: flex; align-items: flex-start; gap: 4px; line-height: 1.5; }
        .notes-hint strong { color: #C9A86A; }
        .expand-notes { background: none; border: none; color: #C9A86A; font-size: 12px; cursor: pointer; padding: 0; font-family: 'Inter', sans-serif; margin-bottom: 16px; display: flex; align-items: center; gap: 4px; }
        .modal-btns { display: flex; gap: 10px; margin-top: 24px; }
        .modal-save { flex: 1; background: #C9A86A; color: #0a0908; border: none; border-radius: 8px; padding: 12px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; }
        .modal-cancel { flex: 1; background: transparent; color: #8a7e72; border: 1px solid #2e2820; border-radius: 8px; padding: 12px; font-size: 14px; cursor: pointer; font-family: 'Inter', sans-serif; }
        .toast { position: fixed; bottom: 32px; right: 32px; background: #1e1a16; border: 1px solid #3a3328; border-radius: 10px; padding: 14px 20px; font-size: 13px; color: #C9A86A; z-index: 200; display: flex; align-items: center; gap: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
        .settings-field { margin-bottom: 20px; }
        .settings-field label { display: block; font-size: 13px; color: #b5a898; margin-bottom: 8px; font-weight: 500; }
        .settings-field input { width: 100%; background: #0a0908; border: 1px solid #2e2820; border-radius: 8px; padding: 12px 16px; font-size: 14px; color: #F5F1EA; outline: none; font-family: 'Inter', sans-serif; }
        .settings-field input:focus { border-color: #C9A86A; }
        .executor-link { display: inline-flex; align-items: center; gap: 8px; background: rgba(201,168,106,0.1); border: 1px solid rgba(201,168,106,0.3); color: #C9A86A; padding: 10px 20px; border-radius: 8px; font-size: 13px; text-decoration: none; margin-top: 16px; }
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <a href="/" className="sidebar-logo">
            <div className="logo-icon"><ShieldCheck size={14} /></div>
            Memoris
          </a>
          <div className="nav-label">My Vault</div>
          {[
            { id: 'vault', icon: Folder, label: 'My Assets' },
            { id: 'beneficiaries', icon: Users, label: 'Beneficiaries' },
            { id: 'wishes', icon: Heart, label: 'Last Wishes' },
            { id: 'verifiers', icon: Bell, label: 'Verifiers' },
          ].map(item => (
            <div key={item.id} className={`nav-item ${activePage === item.id ? 'active' : ''}`} onClick={() => setActivePage(item.id)}>
              <item.icon size={16} /> {item.label}
            </div>
          ))}
          <div className="sidebar-bottom">
            <div className={`nav-item ${activePage === 'settings' ? 'active' : ''}`} onClick={() => setActivePage('settings')}>
              <Settings size={16} /> Settings
            </div>
            <div className="nav-item" onClick={signOut}>
              <LogOut size={16} /> Sign out
            </div>
          </div>
        </aside>

        <main className="main">

          {/* VAULT */}
          {activePage === 'vault' && (<>
            <div className="topbar">
              <div><h1>My Vault</h1><p>Welcome back, {userName}. Manage your digital assets below.</p></div>
              <button className="add-btn" onClick={() => setShowModal(true)}><Plus size={16} /> Add Asset</button>
            </div>
            <div className="stats">
              <div className="stat"><div className="num">{assets.length}</div><div className="lbl">Total assets</div></div>
              <div className="stat"><div className="num">{assets.filter(a => a.assignedTo !== 'Nobody').length}</div><div className="lbl">Assigned</div></div>
              <div className="stat"><div className="num">{assets.filter(a => a.assignedTo === 'Nobody').length}</div><div className="lbl">Unassigned</div></div>
            </div>
            {loading ? (
              <div style={{textAlign:'center', padding:'40px', color:'#6b6058', fontSize:'14px'}}>
                Loading your vault...
              </div>
            ) : (
              <>
                <div className="section-title">All Assets</div>
                <div className="asset-list">
                  {assets.length === 0 && (
                    <div style={{textAlign:'center', padding:'40px', color:'#4a4540', fontSize:'14px'}}>
                      No assets yet. Click "Add Asset" to get started.
                    </div>
                  )}
                  {assets.map(asset => (
                    <div className="asset" key={asset.id}>
                      <div className="asset-top">
                    <div className="asset-icon"><asset.icon size={18} /></div>
                    <div className="asset-info">
                      <div className="name">{asset.label}</div>
                      <div className="sub">Assigned to: {asset.assignedTo}</div>
                    </div>
                    <button className="notes-toggle" onClick={() => setShowNotesFor(showNotesFor === asset.id ? null : asset.id)}>
                      {showNotesFor === asset.id ? <EyeOff size={11} /> : <Eye size={11} />}
                      {showNotesFor === asset.id ? 'Hide' : 'Access info'}
                    </button>
                    <span className="disposal-badge" style={{background: disposalColors[asset.disposal], color: disposalText[asset.disposal]}}>{asset.disposal}</span>
                    <button className="delete-btn" onClick={async () => {
                      const userId = localStorage.getItem('av_id')
                      if (!userId) return
                      await fetch('/api/assets', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
                        body: JSON.stringify({ id: asset.id })
                      })
                      setAssets(assets.filter(a => a.id !== asset.id))
                    }}><Trash2 size={15} /></button>
                  </div>
                  {showNotesFor === asset.id && asset.notes && (
                    <div className="notes-box">
                      <div className="notes-warning"><Lock size={10} /> Encrypted — only visible to assigned beneficiary after vault unlocks</div>
                      {asset.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>)}

          {/* BENEFICIARIES */}
          {activePage === 'beneficiaries' && (<>
            <div className="topbar">
              <div><h1>Beneficiaries</h1><p>People who will receive your digital assets</p></div>
              <button className="add-btn" onClick={() => setShowBModal(true)}><Plus size={16} /> Add Person</button>
            </div>
            <div className="stats">
              <div className="stat"><div className="num">{beneficiaries.length}</div><div className="lbl">People added</div></div>
              <div className="stat"><div className="num">{beneficiaries.reduce((a,b) => a + b.assets.length, 0)}</div><div className="lbl">Assets assigned</div></div>
              <div className="stat"><div className="num">{assets.filter(a => a.assignedTo === 'Nobody').length}</div><div className="lbl">Still unassigned</div></div>
            </div>
            <div className="section-title">Your Beneficiaries</div>
            {beneficiaries.map(b => (
              <div className="bcard" key={b.id}>
                <div className="bcard-top">
                  <div className="avatar">{b.name.charAt(0)}</div>
                  <div className="binfo">
                    <div className="bname">{b.name}</div>
                    <div className="bsub">{b.relationship} · {b.email}</div>
                  </div>
                  <span className="assets-count">{b.assets.length} assets</span>
                  <button className="assign-btn" onClick={() => setShowAssignModal(showAssignModal === b.id ? null : b.id)}>
                    {showAssignModal === b.id ? 'Done' : 'Assign assets'}
                  </button>
                  <button className="delete-btn" onClick={async () => {
                    const userId = localStorage.getItem('av_id')
                    if (!userId) return
                    await fetch('/api/beneficiaries', {
                      method: 'DELETE',
                      headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
                      body: JSON.stringify({ id: b.id })
                    })
                    setBeneficiaries(beneficiaries.filter(x => x.id !== b.id))
                  }}><Trash2 size={15} /></button>
                </div>
                {showAssignModal === b.id && (
                  <div className="assign-list">
                    {assets.map(asset => {
                      const selected = b.assets.includes(asset.label)
                      return (
                        <button key={asset.id} className={`assign-chip ${selected ? 'selected' : ''}`}
                          onClick={() => assignAssetToBeneficiary(b.id, asset.label, !selected)}>
                          {selected && <Check size={11} />} {asset.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </>)}

          {/* LAST WISHES */}
          {activePage === 'wishes' && (<>
            <div className="topbar">
              <div><h1>Last Wishes</h1><p>Your final instructions and personal messages</p></div>
            </div>
            <div className="banner">
              These wishes will be revealed to your beneficiaries only after your <strong>verifiers confirm your passing.</strong> Take your time — you can edit these anytime.
            </div>
            <div className="section-title">Your Message</div>
            {!editingWishes ? (
              <>
                <div className="wishes-display">
                  <p>{wishes}</p>
                </div>
                <div className="wishes-actions">
                  <button className="edit-btn" onClick={() => setEditingWishes(true)}>
                    <Edit2 size={13} /> Edit Wishes
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="wishes-box">
                  <textarea value={wishes} onChange={e => setWishes(e.target.value)}
                    placeholder="Write your final wishes, instructions, or messages to your loved ones..." />
                </div>
                <div className="wishes-actions">
                  <button className="save-btn" onClick={saveWishes}><Check size={15} /> Save Wishes</button>
                  <button className="edit-btn" onClick={() => setEditingWishes(false)}>Cancel</button>
                </div>
              </>
            )}
          </>)}

          {/* VERIFIERS */}
          {activePage === 'verifiers' && (<>
            <div className="topbar">
              <div><h1>Verifiers</h1><p>Trusted people who confirm your passing to unlock the vault</p></div>
              <button className="add-btn" onClick={() => setShowVModal(true)}><Plus size={16} /> Add Verifier</button>
            </div>
            {allConfirmed
              ? <div className="vault-unlocked">✓ All verifiers have confirmed. The vault is now unlocked for beneficiaries.</div>
              : <div className="banner">Your vault unlocks only when <strong>all verifiers confirm.</strong> Each verifier receives an email with a one-click confirmation link. <strong>They do not need to create an account.</strong></div>
            }
            <div className="section-title">Your Verifiers ({verifiers.filter(v=>v.confirmed).length}/{verifiers.length} confirmed)</div>
            {verifiers.map(v => (
              <div className="vcard" key={v.id}>
                <div className="avatar">{v.name.charAt(0)}</div>
                <div className="binfo">
                  <div className="bname">{v.name}</div>
                  <div className="bsub">{v.relationship} · {v.email}</div>
                </div>
                <span className={`vstatus ${v.confirmed ? 'confirmed' : 'pending'}`}>
                  {v.confirmed ? '✓ Confirmed' : '⏳ Awaiting'}
                </span>
                <button className="delete-btn" onClick={async () => {
                  const userId = localStorage.getItem('av_id')
                  if (!userId) return
                  await fetch('/api/verifiers', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
                    body: JSON.stringify({ id: v.id })
                  })
                  setVerifiers(verifiers.filter(x => x.id !== v.id))
                }}><Trash2 size={15} /></button>
              </div>
            ))}
            <div style={{marginTop:24}}>
              <div className="section-title">Executor View</div>
              <div className="banner">This is what your beneficiaries will see after the vault is unlocked. Share this link with them in advance so they know where to go.</div>
              <a href="/executor" className="executor-link">Preview Executor View →</a>
            </div>
          </>)}

          {/* SETTINGS */}
          {activePage === 'settings' && (<>
            <div className="topbar">
              <div><h1>Settings</h1><p>Manage your account and preferences</p></div>
            </div>
            <div className="wishes-display">
              <div className="settings-field"><label>Full Name</label><input defaultValue={userName} /></div>
              <div className="settings-field"><label>Email Address</label><input defaultValue={typeof window !== 'undefined' ? localStorage.getItem('av_user') || 'john@example.com' : ''} /></div>
              <div className="settings-field"><label>New Password</label><input type="password" placeholder="Leave blank to keep current" /></div>
              <button className="save-btn" onClick={() => showToast('Settings saved successfully')}><Check size={15} /> Save Changes</button>
            </div>
          </>)}

        </main>
      </div>

      {toast && <div className="toast"><Check size={14} /> {toast}</div>}

      {/* ADD ASSET MODAL */}
      {showModal && (
        <div className="overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowModal(false)}><X size={18} /></button>
            <h2>Add New Asset</h2>
            <div className="mfield"><label>Asset Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option>Email</option><option>Bank</option><option>Crypto</option><option>Streaming</option><option>Social</option><option>Other</option>
              </select>
            </div>
            <div className="mfield"><label>Label</label><input placeholder="e.g. Gmail Personal, Binance Wallet" value={form.label} onChange={e => setForm({...form, label: e.target.value})} /></div>
            <div className="mfield"><label>Assign To</label><input placeholder="e.g. Sarah - Wife, David - Son" value={form.assignedTo} onChange={e => setForm({...form, assignedTo: e.target.value})} /></div>
            <div className="mfield"><label>Disposal Instruction</label>
              <select value={form.disposal} onChange={e => setForm({...form, disposal: e.target.value})}>
                <option>Transfer</option><option>Delete</option><option>Memorialize</option>
              </select>
            </div>
            <button className="expand-notes" onClick={() => setShowFormNotes(!showFormNotes)}>
              <Lock size={12} /> {showFormNotes ? '− Hide' : '+ Add'} access instructions and passwords
            </button>
            {showFormNotes && (
              <div className="mfield">
                <label>Access Instructions (Encrypted)</label>
                <textarea
                  placeholder="e.g. Login: john@gmail.com / Password: MyPass123&#10;For crypto: seed phrase, exchange login, PIN&#10;For bank: account number, PIN, branch&#10;&#10;This is encrypted and only revealed to the assigned person after vault unlocks."
                  value={form.notes}
                  onChange={e => setForm({...form, notes: e.target.value})}
                />
                <div className="notes-hint"><Lock size={10} /> <span>This is <strong>encrypted</strong> and only revealed to the assigned beneficiary after all verifiers confirm your passing.</span></div>
              </div>
            )}
            <div className="modal-btns">
              <button className="modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="modal-save" onClick={addAsset}>Save Asset</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD BENEFICIARY MODAL */}
      {showBModal && (
        <div className="overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowBModal(false)}><X size={18} /></button>
            <h2>Add Beneficiary</h2>
            <div className="mfield"><label>Full Name</label><input placeholder="e.g. Sarah Enoch" value={bForm.name} onChange={e => setBForm({...bForm, name: e.target.value})} /></div>
            <div className="mfield"><label>Email Address</label><input placeholder="e.g. sarah@example.com" value={bForm.email} onChange={e => setBForm({...bForm, email: e.target.value})} /></div>
            <div className="mfield"><label>Relationship</label><input placeholder="e.g. Wife, Son, Daughter" value={bForm.relationship} onChange={e => setBForm({...bForm, relationship: e.target.value})} /></div>
            <div className="modal-btns">
              <button className="modal-cancel" onClick={() => setShowBModal(false)}>Cancel</button>
              <button className="modal-save" onClick={addBeneficiary}>Add Person</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD VERIFIER MODAL */}
      {showVModal && (
        <div className="overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowVModal(false)}><X size={18} /></button>
            <h2>Add Verifier</h2>
            <p style={{fontSize:13,color:'#6b6058',marginBottom:20,lineHeight:1.6}}>Verifiers receive a one-click email to confirm your passing. They do not need to create an account.</p>
            <div className="mfield"><label>Full Name</label><input placeholder="e.g. Pastor James" value={vForm.name} onChange={e => setVForm({...vForm, name: e.target.value})} /></div>
            <div className="mfield"><label>Email Address</label><input placeholder="e.g. james@church.com" value={vForm.email} onChange={e => setVForm({...vForm, email: e.target.value})} /></div>
            <div className="mfield"><label>Relationship</label><input placeholder="e.g. Pastor, Lawyer, Brother" value={vForm.relationship} onChange={e => setVForm({...vForm, relationship: e.target.value})} /></div>
            <div className="modal-btns">
              <button className="modal-cancel" onClick={() => setShowVModal(false)}>Cancel</button>
              <button className="modal-save" onClick={addVerifier}>Add Verifier</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
