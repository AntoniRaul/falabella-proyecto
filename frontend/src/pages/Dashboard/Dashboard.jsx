import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Trophy, CreditCard, Mail, User } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="dashboard-page">
      {/* Header verde */}
      <div className="dashboard-header-green">
        <div className="container dashboard-header-content">
          <div className="logo-falabella" onClick={() => navigate('/')}>
            <svg width="42" height="42" viewBox="0 0 42 42">
              <ellipse cx="17" cy="27" rx="11" ry="15" fill="#8DC63F" transform="rotate(-20 17 27)"/>
              <ellipse cx="25" cy="17" rx="11" ry="15" fill="#00A550" transform="rotate(20 25 17)"/>
            </svg>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.7)', letterSpacing:3, textTransform:'uppercase' }}>BANCO</div>
              <div style={{ fontSize:20, fontWeight:800, color:'#fff', lineHeight:1 }}>Falabella</div>
            </div>
          </div>
          <div className="dashboard-user-info">
            <span className="user-name">👤 {user.nombreCompleto}</span>
            <button className="btn-logout-header" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
        <div className="container">
          <h1 className="dashboard-welcome">
            ¡Bienvenido, {user.nombreCompleto.split(' ')[0]}! 👋
          </h1>
          <p className="dashboard-session">
            {user.tipoDocumento}: {user.numeroDocumento} &nbsp;·&nbsp; 
            Sesión activa hoy {new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      <main className="dashboard-main">
        <button onClick={() => navigate('/')} className="btn-back">
          <ArrowLeft size={16} /> Volver al inicio
        </button>

        {/* Saldo */}
        <div className="card card-saldo">
          <div className="card-label">Saldo disponible</div>
          <div className="card-value-big">
            S/ {user.saldo?.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
          </div>
          <div className="card-sublabel">Cuenta principal · Actualizado ahora</div>
        </div>

        <div className="dashboard-grid">
          {/* Puntos CMR */}
          <div className="card card-puntos">
            <div className="card-label">CMR Puntos</div>
            <div className="card-value-orange">🏆 12,450</div>
            <div className="card-sublabel">Canjea en tiendas afiliadas</div>
          </div>

          {/* Datos de sesión */}
          <div className="card">
            <div className="card-label">Datos de sesión</div>
            <div className="card-info-list">
              <div><Mail size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> {user.email}</div>
              <div><User size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> {user.tipoDocumento}: <strong>{user.numeroDocumento}</strong></div>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="card card-productos">
          <h3>💳 Mis productos</h3>
          <div className="productos-list">
            <div className="producto-tag">{user.productoPrincipal}</div>
            <div className="producto-tag">Tarjeta CMR Visa</div>
          </div>
        </div>

        <button onClick={handleLogout} className="btn-logout">
          <LogOut size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Cerrar sesión
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
