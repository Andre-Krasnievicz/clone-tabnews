function Home() {
  const [petals, setPetals] = React.useState([]);

  function rain() {
    const count = 24;
    const items = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,                 // posição horizontal (vw)
      duration: 6 + Math.random() * 4,           // 6–10s
      delay: Math.random() * 0.8,                // pequeno atraso
      size: 22 + Math.random() * 18,             // 22–40px
      emoji: Math.random() > 0.5 ? "🌹" : "💖",
      drift: (Math.random() - 0.5) * 60          // leve desvio horizontal
    }));
    setPetals(items);

    // limpar após a animação
    const maxDuration = Math.max(...items.map(i => i.duration)) + 1;
    setTimeout(() => setPetals([]), maxDuration * 1000);
  }

  return (
    <main className="wrap">
      <h1 className="title">
        Ei, vida! Que nosso encontro seja verso livre — 
        onde a coragem dança com o tempo e o amor aprende novos silêncios. Amo-te ❤️
      </h1>

      <button className="cta" onClick={rain}>
        Fazer chover rosas e corações
      </button>

      {petals.map(p => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}vw`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            fontSize: `${p.size}px`,
            transform: `translateX(${p.drift}px)`
          }}
        >
          {p.emoji}
        </span>
      ))}

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 24px;
          position: relative;
          overflow: hidden; /* esconde itens fora da tela */
          background: #fff;
        }
        .title {
          max-width: 900px;
          line-height: 1.35;
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          margin: 0 0 20px;
        }
        .cta {
          padding: 12px 18px;
          font-size: 1rem;
          border-radius: 10px;
          border: 1px solid #ddd;
          cursor: pointer;
          transition: transform .08s ease, box-shadow .2s ease;
          background: #f9f9f9;
        }
        .cta:hover { box-shadow: 0 6px 20px rgba(0,0,0,.08); }
        .cta:active { transform: translateY(1px) scale(.99); }

        .petal {
          position: fixed;
          top: -10vh;
          user-select: none;
          pointer-events: none;
          animation-name: fall, sway;
          animation-timing-function: linear, ease-in-out;
          animation-iteration-count: 1, infinite;
        }

        @keyframes fall {
          to {
            transform: translateY(110vh);
            opacity: 0.1;
          }
        }
        @keyframes sway {
          0%   { margin-left: -10px; }
          50%  { margin-left: 10px; }
          100% { margin-left: -10px; }
        }

        /* combina as animações: queda + balanço */
        .petal {
          animation-duration: var(--fall, 8s), 2.2s;
        }
      `}</style>
    </main>
  );
}

export default Home;
