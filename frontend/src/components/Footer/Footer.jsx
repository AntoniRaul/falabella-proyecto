import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <p>Usamos cookies para mejorar tu experiencia. Consulta más aquí.</p>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <span className="footer-cookies">Entendido</span>
          <button className="btn-contacto">
            <span>💬</span> Contáctanos
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
