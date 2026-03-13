// src/pages/Login.tsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export function Login() {
  const { signIn } = useAuthContext()
  const navigate   = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Credenciales incorrectas')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center',
      justifyContent:'center',
      background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)' }}>
      <div style={{ background:'white', borderRadius:'16px', padding:'2.5rem',
        width:'100%', maxWidth:'400px',
        boxShadow:'0 20px 60px rgba(0,0,0,0.2)',
        display:'flex', flexDirection:'column', gap:'1.2rem' }}>

        <div style={{ textAlign:'center' }}>
          <p style={{ fontSize:'2.5rem', margin:0 }}>📋</p>
          <h1 style={{ margin:'0.5rem 0 0', fontSize:'1.6rem',
            color:'#1e293b', fontWeight:800 }}>Bienvenido</h1>
          <p style={{ margin:'0.3rem 0 0', color:'#94a3b8', fontSize:'0.9rem' }}>
            Inicia sesión para continuar
          </p>
        </div>

        {error && (
          <div style={{ background:'#fef2f2', border:'1px solid #fca5a5',
            borderRadius:'8px', padding:'0.75rem', color:'#ef4444',
            fontSize:'0.85rem', textAlign:'center' }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          <div>
            <label style={{ fontSize:'0.8rem', fontWeight:600,
              color:'#475569', marginBottom:'0.3rem', display:'block' }}>
              Correo electrónico
            </label>
            <input type='email' placeholder='tu@correo.com' value={email}
              onChange={e => setEmail(e.target.value)} required
              style={{ width:'100%', padding:'0.75rem 1rem', borderRadius:'8px',
                border:'1.5px solid #e2e8f0', fontSize:'0.95rem',
                outline:'none', boxSizing:'border-box' }}
              onFocus={e => e.target.style.borderColor='#6366f1'}
              onBlur={e  => e.target.style.borderColor='#e2e8f0'} />
          </div>
          <div>
            <label style={{ fontSize:'0.8rem', fontWeight:600,
              color:'#475569', marginBottom:'0.3rem', display:'block' }}>
              Contraseña
            </label>
            <input type='password' placeholder='••••••••' value={password}
              onChange={e => setPassword(e.target.value)} required
              style={{ width:'100%', padding:'0.75rem 1rem', borderRadius:'8px',
                border:'1.5px solid #e2e8f0', fontSize:'0.95rem',
                outline:'none', boxSizing:'border-box' }}
              onFocus={e => e.target.style.borderColor='#6366f1'}
              onBlur={e  => e.target.style.borderColor='#e2e8f0'} />
          </div>
        </div>

        <div style={{ textAlign:'right', marginTop:'-0.5rem' }}>
          <Link to='/forgot-password'
            style={{ fontSize:'0.82rem', color:'#6366f1', textDecoration:'none' }}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button onClick={handleSubmit} disabled={loading}
          style={{ padding:'0.85rem', borderRadius:'10px', border:'none',
            background:'linear-gradient(135deg,#6366f1,#764ba2)',
            color:'white', fontSize:'1rem', fontWeight:700,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            boxShadow:'0 4px 14px rgba(99,102,241,0.4)' }}>
          {loading ? '⏳ Entrando...' : 'Iniciar sesión →'}
        </button>

        <p style={{ textAlign:'center', fontSize:'0.85rem', color:'#64748b', margin:0 }}>
          ¿No tienes cuenta?{' '}
          <Link to='/register' style={{ color:'#6366f1', fontWeight:700, textDecoration:'none' }}>
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  )
}