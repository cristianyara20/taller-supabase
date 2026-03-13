// src/pages/Dashboard.tsx
import { useDashboard }  from '../hooks/useDashboard'
import { useAuthContext } from '../context/AuthContext'
import { StatCard }      from '../components/Dashboard/StatCard'
import { TaskChart }     from '../components/Dashboard/TaskChart'
import { DonutChart }    from '../components/Dashboard/DonutChart'
import { ActivityFeed }  from '../components/Dashboard/ActivityFeed'
import { Link }          from 'react-router-dom'

export function Dashboard() {
  const { stats, activity, distribution, recentFeed,
    loading, lastUpdated, refresh } = useDashboard()
  const { signOut } = useAuthContext()

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center',
      justifyContent:'center',
      background:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)' }}>
      <p style={{ color:'white', fontSize:'1.2rem' }}>⏳ Cargando dashboard...</p>
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
          📊 Dashboard
        </span>
        <div style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
          {lastUpdated && (
            <span style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.7)' }}>
              Actualizado: {lastUpdated.toLocaleTimeString('es-CO')}
              {' '}<span style={{ color:'#6ee7b7' }}>● Activo</span>
            </span>
          )}
          <Link to='/' style={{ color:'white', fontWeight:600, textDecoration:'none',
            fontSize:'0.9rem', background:'rgba(255,255,255,0.15)',
            padding:'0.4rem 0.9rem', borderRadius:'8px',
            border:'1px solid rgba(255,255,255,0.3)' }}>
            📋 Mis Tareas
          </Link>
          <button onClick={refresh} style={{ background:'rgba(255,255,255,0.15)',
            border:'1px solid rgba(255,255,255,0.3)', borderRadius:'8px',
            padding:'0.4rem 0.9rem', cursor:'pointer', color:'white', fontSize:'0.9rem' }}>
            🔄 Actualizar
          </button>
          <button onClick={signOut} style={{ background:'rgba(239,68,68,0.2)',
            border:'1px solid rgba(239,68,68,0.4)', borderRadius:'8px',
            padding:'0.4rem 0.9rem', cursor:'pointer', color:'#fca5a5',
            fontSize:'0.9rem', fontWeight:600 }}>
            🚪 Cerrar sesión
          </button>
        </div>
      </nav>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'2rem 1rem' }}>

        {/* Título */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <h1 style={{ color:'white', fontSize:'2rem', fontWeight:800, margin:0 }}>
            📊 Panel de control
          </h1>
          <p style={{ color:'rgba(255,255,255,0.7)', margin:'0.5rem 0 0', fontSize:'0.9rem' }}>
            Resumen en tiempo real de tus tareas
          </p>
        </div>

        {/* KPIs */}
        {stats && (
          <div style={{ display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(170px, 1fr))',
            gap:'1rem', marginBottom:'1.5rem' }}>
            <StatCard titulo='Total'       valor={stats.total}
              icono='📓' color='#1a56a0' subtitulo='Todas las tareas' />
            <StatCard titulo='Completadas' valor={stats.completadas}
              icono='✅' color='#10b981' subtitulo={`${stats.porcentaje}%`} />
            <StatCard titulo='Pendientes'  valor={stats.pendientes}
              icono='⏳' color='#f59e0b' subtitulo='Por completar' />
            <StatCard titulo='Progreso'    valor={`${stats.porcentaje}%`}
              icono='🏁' color='#8b5cf6' subtitulo='Completitud' />
            <StatCard titulo='Hoy'         valor={stats.creadasHoy}
              icono='🆕' color='#0f766e' subtitulo='Nuevas hoy' />
          </div>
        )}

        {/* Barra de progreso */}
        {stats && (
          <div style={{ background:'rgba(255,255,255,0.95)', borderRadius:'14px',
            padding:'1.5rem', marginBottom:'1.5rem',
            boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display:'flex', justifyContent:'space-between',
              marginBottom:'0.75rem' }}>
              <span style={{ fontWeight:700, color:'#1e293b' }}>Progreso global</span>
              <span style={{ fontWeight:800, color:'#6366f1', fontSize:'1.1rem' }}>
                {stats.porcentaje}%
              </span>
            </div>
            <div style={{ background:'#e2e8f0', borderRadius:'999px',
              height:'14px', overflow:'hidden' }}>
              <div style={{ width:`${stats.porcentaje}%`, height:'100%',
                background:'linear-gradient(90deg,#6366f1,#764ba2)',
                borderRadius:'999px', transition:'width 0.8s ease' }} />
            </div>
          </div>
        )}

        {/* Gráficas */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr',
          gap:'1.5rem', marginBottom:'1.5rem' }}>
          <div style={{ background:'rgba(255,255,255,0.95)', borderRadius:'14px',
            padding:'1rem', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
            <TaskChart data={activity} />
          </div>
          <div style={{ background:'rgba(255,255,255,0.95)', borderRadius:'14px',
            padding:'1rem', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
            <DonutChart data={distribution} />
          </div>
        </div>

        {/* Actividad reciente */}
        <div style={{ background:'rgba(255,255,255,0.95)', borderRadius:'14px',
          padding:'1rem', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
          <ActivityFeed tareas={recentFeed} />
        </div>

      </div>
    </div>
  )
}