// src/components/TaskForm.tsx
import { useState } from 'react'

interface Props {
  onCrear: (titulo: string, descripcion: string) => Promise<void>
}

export function TaskForm({ onCrear }: Props) {
  const [titulo,      setTitulo]      = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [submitting,  setSubmitting]  = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!titulo.trim()) return
    setSubmitting(true)
    try {
      await onCrear(titulo.trim(), descripcion.trim())
      setTitulo(''); setDescripcion('')
    } catch (err) { console.error(err) }
    finally { setSubmitting(false) }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background:'white', borderRadius:'12px', padding:'1.5rem',
      boxShadow:'0 4px 16px rgba(99,102,241,0.1)', marginBottom:'1.5rem',
      display:'flex', flexDirection:'column', gap:'0.75rem',
      border:'1px solid #ede9fe' }}>

      <h2 style={{ margin:0, fontSize:'1rem', color:'#6366f1', fontWeight:700 }}>
        ➕ Nueva tarea
      </h2>

      <input type='text' placeholder='Título *' value={titulo}
        onChange={e => setTitulo(e.target.value)} required
        style={{ padding:'0.7rem 1rem', borderRadius:'8px',
          border:'1.5px solid #e2e8f0', fontSize:'0.95rem', outline:'none' }}
        onFocus={e => e.target.style.borderColor='#6366f1'}
        onBlur={e  => e.target.style.borderColor='#e2e8f0'} />

      <textarea placeholder='Descripción (opcional)' value={descripcion}
        onChange={e => setDescripcion(e.target.value)} rows={2}
        style={{ padding:'0.7rem 1rem', borderRadius:'8px',
          border:'1.5px solid #e2e8f0', fontSize:'0.9rem',
          outline:'none', resize:'vertical', fontFamily:'inherit' }}
        onFocus={e => e.target.style.borderColor='#6366f1'}
        onBlur={e  => e.target.style.borderColor='#e2e8f0'} />

      <button type='submit' disabled={submitting || !titulo.trim()}
        style={{ padding:'0.75rem', borderRadius:'8px', border:'none',
          background: submitting || !titulo.trim()
            ? '#e2e8f0' : 'linear-gradient(135deg,#6366f1,#764ba2)',
          color: submitting || !titulo.trim() ? '#94a3b8' : 'white',
          fontSize:'0.95rem', fontWeight:700,
          cursor: submitting || !titulo.trim() ? 'not-allowed' : 'pointer',
          boxShadow: titulo.trim() ? '0 4px 12px rgba(99,102,241,0.3)' : 'none' }}>
        {submitting ? '⏳ Guardando...' : '+ Agregar tarea'}
      </button>
    </form>
  )
}