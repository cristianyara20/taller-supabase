// src/pages/Home.tsx
import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { TaskForm } from '../components/TaskForm'
import { TaskItem } from '../components/TaskItem'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export function Home() {
  const { tareas, loading, error, crearTarea, actualizarTarea, editarTarea, eliminarTarea } = useTasks()
  const { signOut } = useAuthContext()
  const [busqueda, setBusqueda] = useState('')

  const tareasFiltradas = tareas.filter(t =>
    t.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    (t.descripcion ?? '').toLowerCase().includes(busqueda.toLowerCase())
  )

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center',
      justifyContent:'center',
      background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)' }}>
      <p style={{ color:'white', fontSize:'1.2rem' }}>⏳ Cargando tareas...</p>
    </div>
  )

  if (error) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center',
      justifyContent:'center',
      background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)' }}>
      <p style={{ color:'#fca5a5' }}>Error: {error}</p>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh',
      background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)' }}>

      {/* Navbar */}
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
        padding:'1rem 2rem', background:'rgba(255,255,255,0.1)',
        backdropFilter:'blur(10px)', borderBottom:'1px solid rgba(255,255,255,0.2)' }}>
        <span style={{ fontWeight:800, fontSize:'1.1rem', color:'white' }}>
          📋 Mis Tareas
        </span>
        <div style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
          <Link to='/dashboard' style={{ color:'white', fontWeight:600,
            textDecoration:'none', fontSize:'0.9rem',
            background:'rgba(255,255,255,0.15)', padding:'0.4rem 0.9rem',
            borderRadius:'8px', border:'1px solid rgba(255,255,255,0.3)' }}>
            📊 Dashboard
          </Link>
          <button onClick={signOut} style={{ background:'rgba(255,255,255,0.15)',
            border:'1px solid rgba(255,255,255,0.3)', borderRadius:'8px',
            padding:'0.4rem 0.9rem', cursor:'pointer', color:'white',
            fontSize:'0.9rem', fontWeight:600 }}>
            🚪 Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Contenido centrado */}
      <div style={{ maxWidth:'700px', margin:'0 auto', padding:'2rem 1rem' }}>

        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <h1 style={{ color:'white', fontSize:'2rem', fontWeight:800, margin:0 }}>
            📋 Mis Tareas
          </h1>
          <p style={{ color:'rgba(255,255,255,0.7)', margin:'0.5rem 0 0' }}>
            {tareas.filter(t => t.completada).length} de {tareas.length} completadas
          </p>
        </div>

        <TaskForm
          onCrear={async (titulo, descripcion) => { await crearTarea({ titulo, descripcion }) }}
        />

        {/* Búsqueda */}
        <input value={busqueda} onChange={e => setBusqueda(e.target.value)}
          placeholder="🔍 Buscar tarea..."
          style={{ width:'100%', padding:'0.75rem 1rem', borderRadius:'10px',
            border:'none', fontSize:'0.95rem', outline:'none',
            marginBottom:'1rem', boxSizing:'border-box',
            boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }} />

        {tareasFiltradas.length === 0
          ? <div style={{ textAlign:'center', padding:'2rem',
              background:'rgba(255,255,255,0.1)', borderRadius:'12px',
              color:'rgba(255,255,255,0.7)' }}>
              {busqueda ? '🔍 No se encontraron tareas.' : '✨ No tienes tareas aún. ¡Crea una!'}
            </div>
          : tareasFiltradas.map(t => (
              <TaskItem key={t.id} tarea={t}
                onActualizar={async (id, completada) => { await actualizarTarea(id, { completada }) }}
                onEditar={async (id, titulo, descripcion) => { await editarTarea(id, { titulo, descripcion }) }}
                onEliminar={eliminarTarea}
              />
            ))
        }
      </div>
    </div>
  )
}