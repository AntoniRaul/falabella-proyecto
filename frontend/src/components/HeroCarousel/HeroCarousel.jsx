import { useState, useEffect } from 'react';
import './HeroCarousel.css';

const SLIDES = [
  { titulo: "Traslada tu Cuenta Sueldo\ny recibe 4.6% TREA", desc: "¡Hazlo hoy y disfruta de este y más beneficios!", btn: "¡ABRE TU CUENTA AQUÍ!", bg: "#1a3a1a" },
  { titulo: "¡Pronto tu CVV\nserá dinámico!", desc: "Las compras con tu CMR serán más seguras", btn: "MÁS INFO AQUÍ", bg: "#2d2d2d" },
  { titulo: "¡Aprovecha 30% dto\ntodos los días!", desc: "En pollo + papas + complemento", btn: "CONOCE MÁS AQUÍ", bg: "#0d2e0d" },
];

const HeroCarousel = () => {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const cur = SLIDES[slideIdx];

  return (
    <section className="hero-section">
      <div style={{ background: cur.bg, borderRadius: 10, overflow: 'hidden' }}>
        <div className="hero-slide">
          <div className="hero-slide-content">
            <h2>{cur.titulo}</h2>
            <p>{cur.desc}</p>
            <button className="hero-btn">{cur.btn}</button>
          </div>
          <div className="hero-slide-image">
            <span>🏦</span>
          </div>
        </div>
      </div>

      <button className="hero-nav-btn prev" onClick={() => setSlideIdx(i => (i - 1 + SLIDES.length) % SLIDES.length)}>
        ‹
      </button>
      <button className="hero-nav-btn next" onClick={() => setSlideIdx(i => (i + 1) % SLIDES.length)}>
        ›
      </button>

      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`hero-dot ${i === slideIdx ? 'active' : ''}`}
            onClick={() => setSlideIdx(i)}
          />
        ))}
      </div>

      <div className="promo-bar">
        <div className="promo-text">
          <h3>¡No te lo pierdas!</h3>
          <p>Obtén tu CMR S/1500 a 18 cuotas con interés preferencial</p>
        </div>
        <button className="btn-promo">¡La quiero!</button>
      </div>
    </section>
  );
};

export default HeroCarousel;
