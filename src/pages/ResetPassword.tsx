// src/pages/ResetPassword.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export function ResetPassword() {
  const navigate = useNavigate()
  const [password,  setPassword]  = useState('')
  const [password2, setPassword2] = useState('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  const handleReset = async () => {
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres'); return
    }
    if (password !== password2) {
      setError('Las contraseñas no coinciden'); return
    }
    setLoading(true); setError(null)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) setError(error.message)
    else {
      alert('✅ Contraseña actualizada')
      navigate('/login')
    }
    setLoading(false)
  }

  return (
    <div style={s.container}>
      <div style={s.card}>
        <p style={{ fontSize:'2.5rem', textAlign:'center', margin:0 }}>🔒</p>
        <h2 style={s.title}>Nueva contraseña</h2>

        {error && (
          <div style={{ background:'#fef2f2', border:'1px solid #fca5a5',
            borderRadius:'8px', padding:'0.75rem', color:'#ef4444',
            fontSize:'0.85rem', textAlign:'center' }}>
            ⚠️ {error}
          </div>
        )}

        <div>
          <label style={s.label}>Nueva contraseña</label>
          <input type='password' placeholder='Mínimo 6 caracteres'
            value={password} onChange={e => setPassword(e.target.value)}
            style={s.input}
            onFocus={e => e.target.style.borderColor='#6366f1'}
            onBlur={e  => e.target.style.borderColor='#e2e8f0'} />
        </div>

        <div>
          <label style={s.label}>Confirmar contraseña</label>
          <input type='password' placeholder='Repite la contraseña'
            value={password2} onChange={e => setPassword2(e.target.value)}
            style={s.input}
            onFocus={e => e.target.style.borderColor='#6366f1'}
            onBlur={e  => e.target.style.borderColor='#e2e8f0'} />
        </div>

        <button onClick={handleReset} disabled={loading}
          style={{ ...s.button, opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? '⏳ Actualizando...' : 'Actualizar contraseña →'}
        </button>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  container: { minHeight:'100vh', display:'flex', alignItems:'center',
    justifyContent:'center',
    background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)' },
  card: { background:'white', borderRadius:'16px', padding:'2.5rem',
    width:'100%', maxWidth:'400px',
    boxShadow:'0 20px 60px rgba(0,0,0,0.2)',
    display:'flex', flexDirection:'column', gap:'1.2rem' },
  title: { margin:0, fontSize:'1.5rem', textAlign:'center',
    color:'#1e293b', fontWeight:800 },
  label: { fontSize:'0.8rem', fontWeight:600, color:'#475569',
    marginBottom:'0.3rem', display:'block' },
  input: { width:'100%', padding:'0.75rem 1rem', borderRadius:'8px',
    border:'1.5px solid #e2e8f0', fontSize:'0.95rem',
    outline:'none', boxSizing:'border-box' },
  button: { padding:'0.85rem', borderRadius:'10px', border:'none',
    background:'linear-gradient(135deg,#6366f1,#764ba2)',
    color:'white', fontSize:'1rem', fontWeight:700,
    boxShadow:'0 4px 14px rgba(99,102,241,0.4)' }
}