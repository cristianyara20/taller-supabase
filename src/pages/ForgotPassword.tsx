// src/pages/ForgotPassword.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export function ForgotPassword() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const handleEnviar = async () => {
    if (!email.trim()) return
    setLoading(true); setError(null)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    if (error) setError(error.message)
    else setEnviado(true)
    setLoading(false)
  }

  if (enviado) return (
    <div style={s.container}>
      <div style={s.card}>
        <p style={{ fontSize:'2.5rem', textAlign:'center', margin:0 }}>📬</p>
        <h2 style={s.title}>Revisa tu correo</h2>
        <p style={{ color:'#64748b', textAlign:'center', fontSize:'0.9rem' }}>
          Enviamos un enlace a <strong>{email}</strong>
        </p>
        <Link to='/login' style={s.button}>Volver al login</Link>
      </div>
    </div>
  )

  return (
    <div style={s.container}>
      <div style={s.card}>
        <p style={{ fontSize:'2.5rem', textAlign:'center', margin:0 }}>🔑</p>
        <h2 style={s.title}>Recuperar contraseña</h2>
        <p style={{ color:'#64748b', textAlign:'center', fontSize:'0.85rem', margin:0 }}>
          Escribe tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {error && (
          <div style={{ background:'#fef2f2', border:'1px solid #fca5a5',
            borderRadius:'8px', padding:'0.75rem', color:'#ef4444',
            fontSize:'0.85rem', textAlign:'center' }}>
            ⚠️ {error}
          </div>
        )}

        <div>
          <label style={s.label}>Correo electrónico</label>
          <input type='email' placeholder='tu@correo.com' value={email}
            onChange={e => setEmail(e.target.value)}
            style={s.input}
            onFocus={e => e.target.style.borderColor='#6366f1'}
            onBlur={e  => e.target.style.borderColor='#e2e8f0'} />
        </div>

        <button onClick={handleEnviar} disabled={loading}
          style={{ ...s.button, opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? '⏳ Enviando...' : 'Enviar enlace →'}
        </button>

        <p style={{ textAlign:'center', fontSize:'0.85rem', color:'#64748b', margin:0 }}>
          <Link to='/login' style={{ color:'#6366f1', textDecoration:'none' }}>
            ← Volver al login
          </Link>
        </p>
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
  button: { display:'block', textAlign:'center', padding:'0.85rem',
    borderRadius:'10px', border:'none',
    background:'linear-gradient(135deg,#6366f1,#764ba2)',
    color:'white', fontSize:'1rem', fontWeight:700,
    textDecoration:'none', boxShadow:'0 4px 14px rgba(99,102,241,0.4)' }
}