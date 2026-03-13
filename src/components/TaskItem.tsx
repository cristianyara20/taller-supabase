// src/components/TaskItem.tsx
import { useState } from 'react'
import type { Tarea } from '../types/database'

interface Props {
  tarea: Tarea
  onActualizar: (id: string, completada: boolean) => Promise<void>
  onEditar: (id: string, titulo: string, descripcion: string) => Promise<void>
  onEliminar: (id: string) => Promise<void>
}

export function TaskItem({ tarea, onActualizar, onEditar, onEliminar }: Props) {
  const [eliminando, setEliminando] = useState(false)
  const [editando,   setEditando]   = useState(false)
  const [titulo,     setTitulo]     = useState(tarea.titulo)
  const [descripcion,setDescripcion]= useState(tarea.descripcion ?? '')
  const [guardando,  setGuardando]  = useState(false)

  const handleEliminar = async () => {
    if (!confirm('¿Eliminar esta tarea?')) return
    setEliminando(true)
    await onEliminar(tarea.id)
  }

  const handleGuardar = async () => {
    if (!titulo.trim()) return
    setGuardando(true)
    await onEditar(tarea.id, titulo.trim(), descripcion.trim())
    setGuardando(false)
    setEditando(false)
  }

  if (editando) return (
    <div style={{ padding:'1rem', border:'2px solid #6366f1', borderRadius:'8px',
      marginBottom:'0.5rem', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
      <input value={titulo} onChange={e => setTitulo(e.target.value)}
        placeholder="Título *"
        style={{ padding:'0.5rem', borderRadius:'6px', border:'1px solid #e2e8f0',
          fontSize:'0.95rem' }} />
      <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)}
        placeholder="Descripción (opcional)" rows={2}
        style={{ padding:'0.5rem', borderRadius:'6px', border:'1px solid #e2e8f0',
          fontSize:'0.9rem', resize:'vertical' }} />
      <div style={{ display:'flex', gap:'0.5rem', justifyContent:'flex-end' }}>
        <button onClick={() => setEditando(false)}
          style={{ padding:'0.4rem 0.9rem', borderRadius:'6px', cursor:'pointer',
            border:'1px solid #e2e8f0', background:'white', color:'#64748b' }}>
          Cancelar
        </button>
        <button onClick={handleGuardar} disabled={guardando}
          style={{ padding:'0.4rem 0.9rem', borderRadius:'6px', cursor:'pointer',
            border:'none', background:'#6366f1', color:'white', fontWeight:600 }}>
          {guardando ? 'Guardando...' : '💾 Guardar'}
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ display:'flex', gap:'1rem', alignItems:'center',
      padding:'1rem', border:'1px solid #e2e8f0', borderRadius:'8px',
      marginBottom:'0.5rem', opacity: eliminando ? 0.5 : 1 }}>
      <input type='checkbox' checked={tarea.completada ?? false}
        onChange={() => onActualizar(tarea.id, !(tarea.completada ?? false))} />
      <div style={{ flex:1 }}>
        <strong style={{
          textDecoration: tarea.completada ? 'line-through' : 'none',
          color: tarea.completada ? '#94a3b8' : '#1a1a1a' }}>
          {tarea.titulo}
        </strong>
        {tarea.descripcion && (
          <p style={{ margin:0, color:'#64748b', fontSize:'0.9rem' }}>
            {tarea.descripcion}
          </p>
        )}
      </div>
      <button onClick={() => setEditando(true)}
        style={{ color:'#6366f1', cursor:'pointer', background:'none', border:'none',
          fontSize:'0.9rem' }}>
        ✏️ Editar
      </button>
      <button onClick={handleEliminar} disabled={eliminando}
        style={{ color:'red', cursor:'pointer', background:'none', border:'none' }}>
        🗑 Eliminar
      </button>
    </div>
  )
}