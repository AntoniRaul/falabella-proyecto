import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [docType, setDocType] = useState('DNI');
  const [docMenu, setDocMenu] = useState(false);
  const [dniVal, setDniVal] = useState('');
  const [claveVal, setClaveVal] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetLogin = () => {
    setLoginOpen(false);
    setErrMsg('');
    setSuccess(false);
    setDniVal('');
    setClaveVal('');
    setDocMenu(false);
  };

  const handleLogin = async () => {
    if (!dniVal || !claveVal) {
      setErrMsg(`Ingresa tu ${docType} y clave de internet.`);
      return;
    }
    setLoading(true);
    setErrMsg('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        tipoDocumento: docType,
        numeroDocumento: dniVal,
        claveInternet: claveVal
      });

      localStorage.setItem('user', JSON.stringify(response.data));
      setSuccess(true);
      setTimeout(() => {
        resetLogin();
        navigate('/dashboard');
      }, 700);
    } catch (err) {
      setLoading(false);
      setErrMsg('DNI o clave de internet incorrectos. Verifica tus datos.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <header>
      {/* Super bar */}
      <div className="header-super">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="header-super-links">
            {['Falabella', 'Viajes Falabella', 'Seguros Falabella', 'Sodimac', 'Tottus', 'Maestro'].map(l => (
              <span key={l}>{l}</span>
            ))}
          </div>
          <span className="header-super-help">ⓘ Ayuda y Contacto</span>
        </div>
      </div>

      {/* Main header */}
      <div className="header-main">
        <div className="logo-falabella" onClick={() => navigate('/')}>
          <svg width="42" height="42" viewBox="0 0 42 42" className="logo-svg">
            <ellipse cx="17" cy="27" rx="11" ry="15" transform="rotate(-20 17 27)" />
            <ellipse cx="25" cy="17" rx="11" ry="15" transform="rotate(20 25 17)" />
          </svg>
          <div>
            <div className="logo-text-banco">BANCO</div>
            <div className="logo-text-falabella">Falabella</div>
          </div>
        </div>

        <div className="header-actions">
          {!loginOpen ? (
            <>
              <button className="header-search">
                🔍 Buscar
              </button>
              <button className="btn-cliente">Hazte Cliente</button>
              <button className="btn-banca" onClick={() => setLoginOpen(true)}>
                Banca Internet
              </button>
            </>
          ) : (
            <button className="btn-cerrar" onClick={resetLogin}>✕ Cerrar</button>
          )}
        </div>
      </div>

      {/* Login inline bar */}
      {loginOpen && (
        <div className="login-bar">
          <div className="login-select-wrapper">
            <div className="login-select" onClick={() => setDocMenu(!docMenu)}>
              <span>{docType}</span>
              <span>▾</span>
            </div>
            {docMenu && (
              <div className="login-select-menu">
                {['DNI', 'Carnet Extranjería'].map(d => (
                  <div
                    key={d}
                    className={`login-select-option ${docType === d ? 'active' : ''}`}
                    onClick={() => { setDocType(d); setDocMenu(false); }}
                  >
                    {docType === d ? '✓ ' : ''}{d}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            className="login-input"
            placeholder={`Ingresa tu ${docType}`}
            value={dniVal}
            onChange={e => setDniVal(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Clave Internet"
            value={claveVal}
            onChange={e => setClaveVal(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: 160 }}
          />
          <button
            className={`btn-login-circle ${success ? 'success' : ''}`}
            onClick={handleLogin}
            disabled={loading || success}
          >
            {loading ? '⏳' : success ? '✓' : '›'}
          </button>
          <button className="login-recover">Recupera tu clave</button>
        </div>
      )}

      {/* Messages */}
      {errMsg && loginOpen && (
        <div className="msg-error">
          <span>⚠️</span> <span>{errMsg}</span>
        </div>
      )}
      {success && loginOpen && (
        <div className="msg-success">
          <span>✅</span> <span>Credenciales correctas. Redirigiendo al dashboard...</span>
        </div>
      )}
      {loginOpen && !errMsg && !success && (
        <div className="msg-hint">
          💡 <strong>Demo:</strong> DNI <code>12345678</code> / Clave <code>clave123</code>
        </div>
      )}

      {/* Navigation */}
      <nav className="header-nav">
        {['TARJETAS DE CRÉDITO', 'CRÉDITOS', 'CUENTAS', 'CMR PUNTOS', 'SEGUROS', 'PROMOCIONES', 'SOSTENIBILIDAD', 'EDUCACIÓN FINANCIERA'].map(n => (
          <div key={n} className="nav-item">{n}</div>
        ))}
      </nav>
    </header>
  );
};

export default Header;
