import { useState } from "react";

const mainCards = [
  {
    id: 1,
    icon: "🚀",
    title: "Performance",
    subtitle: "Ultra Fast",
    description:
      "Optimized rendering engine with 60fps animations and zero layout shifts.",
    stat: "99.9%",
    statLabel: "Uptime",
    gradient: "linear-gradient(135deg,#7c3aed,#6366f1)",
    glow: "rgba(139,92,246,0.55)",
    accent: "#a78bfa",
    barW: "82%",
  },
  {
    id: 2,
    icon: "🛡️",
    title: "Security",
    subtitle: "End-to-End",
    description:
      "Military-grade encryption with zero-knowledge architecture for your data.",
    stat: "256-bit",
    statLabel: "Encryption",
    gradient: "linear-gradient(135deg,#0891b2,#059669)",
    glow: "rgba(20,184,166,0.55)",
    accent: "#5eead4",
    barW: "70%",
  },
  {
    id: 3,
    icon: "⚡",
    title: "AI Powered",
    subtitle: "Smart Engine",
    description:
      "Machine learning algorithms that adapt and evolve with your workflow.",
    stat: "10x",
    statLabel: "Faster",
    gradient: "linear-gradient(135deg,#f59e0b,#ef4444)",
    glow: "rgba(249,115,22,0.55)",
    accent: "#fb923c",
    barW: "91%",
  },
  {
    id: 4,
    icon: "🌐",
    title: "Global CDN",
    subtitle: "Worldwide",
    description:
      "Deploy to 200+ edge locations for blazing-fast global distribution.",
    stat: "200+",
    statLabel: "Regions",
    gradient: "linear-gradient(135deg,#ec4899,#f43f5e)",
    glow: "rgba(244,63,94,0.55)",
    accent: "#fb7185",
    barW: "76%",
  },
  {
    id: 5,
    icon: "🎨",
    title: "Design System",
    subtitle: "Pixel Perfect",
    description:
      "Comprehensive component library with dark mode and theme customization.",
    stat: "500+",
    statLabel: "Components",
    gradient: "linear-gradient(135deg,#3b82f6,#06b6d4)",
    glow: "rgba(56,189,248,0.55)",
    accent: "#7dd3fc",
    barW: "88%",
  },
  {
    id: 6,
    icon: "📊",
    title: "Analytics",
    subtitle: "Real-time",
    description:
      "Deep insights and intelligent dashboards to track every metric that matters.",
    stat: "∞",
    statLabel: "Data Points",
    gradient: "linear-gradient(135deg,#22c55e,#14b8a6)",
    glow: "rgba(34,197,94,0.55)",
    accent: "#86efac",
    barW: "65%",
  },
];

const classicCards = [
  {
    id: "c1",
    name: "ChatGPT Plus",
    sub: "Subscription",
    price: "20",
    period: "month",
    badge: "Popular",
    featured: true,
    icon: "✳️",
    iconClass: "green",
    features: [
      "GPT-4o acceso completo",
      "DALL·E generación",
      "Memoria personalizada",
    ],
  },
  {
    id: "c2",
    name: "Claude Pro",
    sub: "Subscription",
    price: "20",
    period: "month",
    icon: "✦",
    iconClass: "orange",
    features: [
      "Claude 3.5 Sonnet",
      "Contexto 200k tokens",
      "Artefactos visuales",
    ],
  },
  {
    id: "c3",
    name: "Perplexity Pro",
    sub: "Subscription",
    price: "20",
    period: "month",
    icon: "✺",
    iconClass: "teal",
    features: ["Búsqueda con IA", "Fuentes citadas", "Modo Pro ilimitado"],
  },
  {
    id: "c4",
    name: "Gemini Advanced",
    sub: "Subscription",
    price: "19.99",
    period: "month",
    icon: "✦",
    iconClass: "blue",
    features: ["Gemini 1.5 Pro", "1 TB Google One", "Integración Workspace"],
  },
  {
    id: "c5",
    name: "Notion AI",
    sub: "Subscription",
    price: "10",
    period: "month",
    icon: "N",
    iconClass: "gray",
    features: [
      "Escritura asistida",
      "Resúmenes automáticos",
      "Búsqueda IA global",
    ],
  },
  {
    id: "c6",
    name: "Copilot Pro",
    sub: "Subscription",
    price: "20",
    period: "month",
    icon: "◧",
    iconClass: "purple",
    features: ["Office 365 integrado", "Designer IA", "GPT-4 Turbo"],
  },
];

const stackCards = [
  {
    id: "s1",
    cls: "stack-card-1",
    name: "ChatGPT Plus",
    sub: "Subscription",
    price: "20",
    period: "month",
    icon: "✳️",
  },
  {
    id: "s2",
    cls: "stack-card-2",
    name: "Claude Pro",
    sub: "Subscription",
    price: "20",
    period: "month",
    icon: "✦",
  },
  {
    id: "s3",
    cls: "stack-card-3",
    name: "Perplexity Pro",
    sub: "Subscription",
    price: "20",
    period: "month",
    icon: "✺",
  },
  {
    id: "s4",
    cls: "stack-card-4",
    name: "Gemini Advanced",
    sub: "Subscription",
    price: "19.99",
    period: "month",
    icon: "✦",
  },
  {
    id: "s5",
    cls: "stack-card-5",
    name: "Notion AI",
    sub: "Subscription",
    price: "10",
    period: "month",
    icon: "N",
  },
  {
    id: "s6",
    cls: "stack-card-6 stack-card-more",
    name: "And more...",
    sub: "More subscriptions,\nmore complexity.",
    price: "",
    period: "",
    icon: "",
  },
  {
    id: "s7",
    cls: "stack-card-7",
    name: "Microsoft Copilot Pro",
    sub: "Subscription",
    price: "20",
    period: "month",
    icon: "◧",
  },
];

function GlassCard({ card, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -13, y: dx * 13 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      style={{
        perspective: "900px",
        animationDelay: `${index * 0.09}s`,
        animation: "fadeUp 0.65s cubic-bezier(.23,1,.32,1) both",
      }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.04 : 1})`,
          transition: hovered
            ? "transform 0.08s linear"
            : "transform 0.55s cubic-bezier(.23,1,.32,1)",
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: 20,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -18,
            borderRadius: 28,
            background: card.glow,
            filter: "blur(28px)",
            opacity: hovered ? 0.9 : 0.35,
            transition: "opacity 0.4s",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius: 20,
            background: "rgba(255,255,255,0.045)",
            border: "1px solid rgba(255,255,255,0.13)",
            backdropFilter: "blur(22px) saturate(160%)",
            WebkitBackdropFilter: "blur(22px) saturate(160%)",
            overflow: "hidden",
          }}
        >
          <div
            style={{ height: 3, background: card.gradient, width: "100%" }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 30% 15%, rgba(255,255,255,0.22) 0%, transparent 60%)",
              opacity: hovered ? 1 : 0.5,
              transform: `translate(${tilt.y * 2.5}px, ${tilt.x * 2.5}px)`,
              transition: hovered
                ? "opacity 0.2s"
                : "opacity 0.4s, transform 0.55s",
              pointerEvents: "none",
              borderRadius: 20,
              zIndex: 2,
            }}
          />

          <div
            style={{
              padding: "26px 26px 22px",
              position: "relative",
              zIndex: 3,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0,
                  boxShadow: hovered ? `0 0 20px ${card.glow}` : "none",
                  transition: "box-shadow 0.4s",
                }}
              >
                {card.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.11em",
                    textTransform: "uppercase",
                    color: card.accent,
                    marginBottom: 3,
                  }}
                >
                  {card.subtitle}
                </div>
                <div
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {card.title}
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.48)",
                marginBottom: 18,
              }}
            >
              {card.description}
            </p>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${card.accent}28`,
                borderRadius: 12,
                padding: "13px 15px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: card.accent,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {card.stat}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.38)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginTop: 4,
                  }}
                >
                  {card.statLabel}
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  height: 6,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: hovered ? card.barW : "30%",
                    background: card.gradient,
                    borderRadius: 999,
                    transition: "width 0.75s cubic-bezier(.23,1,.32,1)",
                  }}
                />
              </div>
            </div>

            <button
              style={{
                width: "100%",
                padding: "12px 0",
                border: "none",
                borderRadius: 12,
                background: card.gradient,
                color: "#fff",
                fontSize: 13.5,
                fontWeight: 700,
                letterSpacing: "0.04em",
                cursor: "pointer",
                boxShadow: hovered ? `0 6px 28px ${card.glow}` : "none",
                transition: "box-shadow 0.35s, opacity 0.2s",
                opacity: hovered ? 1 : 0.88,
              }}
            >
              Explore →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardsSection({ label, title, subtitle, cards }) {
  return (
    <section style={{ marginTop: 70 }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            display: "inline-block",
            color: "rgba(255,255,255,0.45)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {label}
        </div>

        <h2
          style={{
            color: "#fff",
            fontSize: "clamp(24px,4vw,34px)",
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.42)",
            fontSize: 14.5,
            lineHeight: 1.7,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          {subtitle}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
          gap: 26,
        }}
      >
        {cards.map((card, i) => (
          <GlassCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}

function ClassicGlassSection() {
  return (
    <section style={{ marginTop: 90 }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div className="section-kicker">GLASS CARDS HTML V1</div>
        <h2 className="section-title">Grid clásico de suscripciones</h2>
        <p className="section-copy">
          Esta sección replica el estilo del primer HTML con tarjetas en
          rejilla, badges, estados destacados y una tarjeta ancha adicional.
        </p>
      </div>

      <div className="classic-grid">
        {classicCards.map((card) => (
          <div
            key={card.id}
            className={`classic-card ${card.featured ? "is-featured" : ""}`}
          >
            {card.badge && <div className="classic-badge">{card.badge}</div>}

            <div className="classic-header">
              <div className={`classic-icon classic-icon-${card.iconClass}`}>
                {card.icon}
              </div>
              <div className="classic-title-block">
                <span className="classic-name">{card.name}</span>
                <span className="classic-sub">{card.sub}</span>
              </div>
            </div>

            <div className="classic-price">
              <span className="classic-price-amount">{card.price}</span>
              <span className="classic-price-period">{card.period}</span>
            </div>

            <div className="classic-divider" />

            <ul className="classic-features">
              {card.features.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="classic-grid" style={{ marginTop: 24 }}>
        <div className="classic-card classic-card-wide is-featured">
          <div className="classic-icon classic-icon-purple classic-icon-large">
            ✦
          </div>

          <div className="classic-card-body">
            <div className="classic-header" style={{ marginBottom: 0 }}>
              <div className="classic-title-block">
                <span className="classic-name" style={{ fontSize: "1.1rem" }}>
                  nexos.ai All-in-One
                </span>
                <span className="classic-sub">
                  Todos los modelos · Una sola suscripción
                </span>
              </div>
            </div>

            <div className="classic-price" style={{ marginTop: 4 }}>
              <span className="classic-price-amount">19.99</span>
              <span className="classic-price-period">
                month · acceso ilimitado
              </span>
            </div>
          </div>

          <div className="classic-badge classic-badge-inline">Ahorra 90%</div>
        </div>
      </div>
    </section>
  );
}

function StackCardsSection() {
  return (
    <section style={{ marginTop: 110 }}>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div className="section-kicker">GLASS CARDS HTML V2</div>
        <h2 className="section-title">Stack visual tipo showcase</h2>
        <p className="section-copy">
          Este bloque conserva la composición apilada del segundo HTML, con
          rotaciones, profundidad y un panel lateral tipo hero.
        </p>
      </div>

      <div className="stack-scene">
        <div className="stack-cards-wrap">
          {stackCards.map((card) => (
            <div key={card.id} className={`stack-card ${card.cls}`}>
              <div className="stack-card-inner">
                {card.icon ? (
                  <>
                    <div className="stack-top">
                      <div className="stack-icon">{card.icon}</div>
                      <div className="stack-info">
                        <span className="stack-name">{card.name}</span>
                        <span className="stack-sub">{card.sub}</span>
                      </div>
                    </div>

                    <div className="stack-price">
                      <span className="stack-price-main">{card.price}</span>
                      <span className="stack-price-month">{card.period}</span>
                    </div>
                  </>
                ) : (
                  <div className="stack-info">
                    <span className="stack-name">{card.name}</span>
                    <span
                      className="stack-sub"
                      style={{ whiteSpace: "pre-line", marginTop: 6 }}
                    >
                      {card.sub}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="stack-side">
          <h3>Emptying your pockets for multiple AI tools?</h3>
          <p>nexos.ai does the same job, for less.</p>
          <button className="stack-btn">Get nexos.ai →</button>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07091299",
        backgroundColor: "#070912",
        fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #070912; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px) rotateX(6deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }

        @keyframes floatBlob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(28px,-28px) scale(1.06); }
          66% { transform: translate(-18px,20px) scale(0.96); }
        }

        @keyframes headerFade {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .section-kicker {
          display: inline-block;
          color: rgba(255,255,255,0.45);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .section-title {
          color: #fff;
          font-size: clamp(24px,4vw,34px);
          font-weight: 800;
          margin-bottom: 10px;
        }

        .section-copy {
          color: rgba(255,255,255,0.42);
          font-size: 14.5px;
          line-height: 1.7;
          max-width: 700px;
          margin: 0 auto;
        }

        .classic-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .classic-card {
          position: relative;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(180, 130, 255, 0.3);
          border-radius: 18px;
          padding: 20px 22px;
          width: 220px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          box-shadow:
            0 4px 30px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 0 0 0 rgba(150, 80, 255, 0);
          overflow: hidden;
        }

        .classic-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200, 160, 255, 0.6), transparent);
        }

        .classic-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 50%;
          background: radial-gradient(ellipse at top left, rgba(255,255,255,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .classic-card:hover {
          transform: translateY(-6px) scale(1.02);
          background: rgba(255, 255, 255, 0.1);
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            0 0 25px rgba(150, 80, 255, 0.35);
        }

        .classic-card.is-featured {
          background: rgba(130, 60, 255, 0.15);
          border-color: rgba(180, 120, 255, 0.55);
          box-shadow:
            0 4px 30px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            0 0 30px rgba(130, 60, 255, 0.25);
        }

        .classic-card.is-featured:hover {
          box-shadow:
            0 14px 45px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            0 0 45px rgba(150, 80, 255, 0.5);
        }

        .classic-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .classic-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .classic-icon-large {
          width: 52px;
          height: 52px;
          font-size: 24px;
        }

        .classic-icon-green { background: linear-gradient(135deg, #00c09a, #00876e); }
        .classic-icon-orange { background: linear-gradient(135deg, #ff6b35, #c44b1e); }
        .classic-icon-blue { background: linear-gradient(135deg, #4a9eff, #2060c0); }
        .classic-icon-purple { background: linear-gradient(135deg, #a855f7, #7c3aed); }
        .classic-icon-gray { background: linear-gradient(135deg, #6b7280, #374151); }
        .classic-icon-teal { background: linear-gradient(135deg, #14b8a6, #0d7a72); }

        .classic-title-block {
          display: flex;
          flex-direction: column;
        }

        .classic-name {
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          line-height: 1.2;
        }

        .classic-sub {
          color: rgba(200, 180, 255, 0.65);
          font-size: 0.72rem;
          margin-top: 2px;
        }

        .classic-price {
          display: flex;
          align-items: baseline;
          gap: 3px;
          margin-top: 8px;
        }

        .classic-price-amount {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
        }

        .classic-price-period {
          color: rgba(200, 180, 255, 0.55);
          font-size: 0.72rem;
        }

        .classic-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(150, 80, 255, 0.25);
          border: 1px solid rgba(180, 130, 255, 0.4);
          color: rgba(220, 200, 255, 0.9);
          font-size: 0.62rem;
          padding: 3px 8px;
          border-radius: 20px;
          backdrop-filter: blur(4px);
        }

        .classic-badge-inline {
          position: relative;
          top: auto;
          right: auto;
          align-self: flex-start;
          white-space: nowrap;
        }

        .classic-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180, 130, 255, 0.3), transparent);
          margin: 14px 0;
        }

        .classic-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 0;
        }

        .classic-features li {
          color: rgba(210, 200, 255, 0.7);
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .classic-features li::before {
          content: "●";
          color: rgba(160, 100, 255, 0.8);
          font-size: 0.55rem;
        }

        .classic-card-wide {
          width: 100%;
          max-width: 464px;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 22px 28px;
        }

        .classic-card-body {
          flex: 1;
        }

        .stack-scene {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 60px;
          max-width: 980px;
          width: 100%;
          margin: 0 auto;
          padding: 20px 0;
        }

        .stack-cards-wrap {
          position: relative;
          width: 280px;
          height: 460px;
          flex-shrink: 0;
        }

        .stack-card {
          position: absolute;
          width: 230px;
          background: rgba(30, 15, 65, 0.72);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 16px;
          padding: 14px 16px 16px 14px;
          cursor: pointer;
          transition: transform 0.35s ease, box-shadow 0.35s ease, filter 0.35s ease;
          overflow: hidden;
        }

        .stack-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(130deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0) 60%);
          border-radius: 16px;
          pointer-events: none;
        }

        .stack-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 10px;
          right: 10px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
        }

        .stack-card:hover {
          filter: brightness(1.15);
        }

        .stack-card-inner {
          position: relative;
          z-index: 3;
        }

        .stack-top {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 10px;
        }

        .stack-icon {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
          background: rgba(255,255,255,0.08);
          color: #fff;
        }

        .stack-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stack-name {
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.2px;
        }

        .stack-sub {
          color: rgba(200, 185, 230, 0.6);
          font-size: 11.5px;
          font-weight: 400;
        }

        .stack-price {
          display: flex;
          align-items: baseline;
          gap: 2px;
          line-height: 1;
        }

        .stack-price-main {
          color: #fff;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .stack-price-month {
          color: rgba(200, 185, 230, 0.55);
          font-size: 11px;
          font-weight: 400;
          margin-left: 1px;
        }

        .stack-card-more {
          width: 200px;
          opacity: 0.85;
        }

        .stack-card-1 { top: 0; left: 0; z-index: 1; transform: rotate(-4deg); box-shadow: 0 8px 32px rgba(0,0,0,0.55); }
        .stack-card-2 { top: 68px; left: 6px; z-index: 2; transform: rotate(3deg); box-shadow: 0 8px 32px rgba(0,0,0,0.55); }
        .stack-card-3 { top: 120px; left: 50px; z-index: 3; transform: rotate(-2.5deg); box-shadow: 0 8px 32px rgba(0,0,0,0.55); }
        .stack-card-4 { top: 200px; left: 10px; z-index: 4; transform: rotate(3.5deg); box-shadow: 0 8px 32px rgba(0,0,0,0.55); }
        .stack-card-5 { top: 268px; left: 4px; z-index: 5; transform: rotate(-3deg); box-shadow: 0 8px 32px rgba(0,0,0,0.55); }
        .stack-card-6 { top: 336px; left: 0; z-index: 3; transform: rotate(2deg); box-shadow: 0 8px 32px rgba(0,0,0,0.55); }
        .stack-card-7 { top: 310px; left: 55px; z-index: 7; transform: rotate(-1.5deg); box-shadow: 0 10px 40px rgba(0,0,0,0.65), 0 0 20px rgba(140,80,255,0.2); }

        .stack-side {
          color: #fff;
          max-width: 320px;
        }

        .stack-side h3 {
          font-size: 2.1rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 24px;
          letter-spacing: -0.5px;
        }

        .stack-side p {
          font-size: 1.2rem;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          line-height: 1.4;
          margin-bottom: 28px;
        }

        .stack-btn {
          display: inline-block;
          background: rgba(20, 10, 50, 0.85);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.25);
          border-radius: 12px;
          padding: 14px 32px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: background 0.25s, transform 0.2s;
        }

        .stack-btn:hover {
          background: rgba(40, 20, 90, 0.9);
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .stack-scene {
            flex-direction: column;
            gap: 40px;
          }

          .stack-side {
            text-align: center;
          }
        }

        @media (max-width: 520px) {
          .classic-card {
            width: 100%;
            max-width: 320px;
            padding: 16px;
          }

          .classic-card-wide {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      {[
        {
          c: "radial-gradient(circle,#7c3aed,#2563eb)",
          t: "-140px",
          l: "-120px",
          s: "580px",
          d: "0s",
          dur: "13s",
        },
        {
          c: "radial-gradient(circle,#0891b2,#059669)",
          b: "-110px",
          r: "-110px",
          s: "500px",
          d: "-5s",
          dur: "16s",
        },
        {
          c: "radial-gradient(circle,#f59e0b,#ec4899)",
          top: "42%",
          l: "50%",
          s: "420px",
          d: "-9s",
          dur: "19s",
          extra: { transform: "translate(-50%,-50%)" },
        },
      ].map((blob, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            width: blob.s,
            height: blob.s,
            top: blob.t || blob.top,
            left: blob.l,
            bottom: blob.b,
            right: blob.r,
            borderRadius: "50%",
            background: blob.c,
            filter: "blur(75px)",
            opacity: 0.16,
            animation: `floatBlob ${blob.dur} ease-in-out infinite`,
            animationDelay: blob.d,
            pointerEvents: "none",
            ...(blob.extra || {}),
          }}
        />
      ))}

      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "60px 22px 100px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            animation: "headerFade 0.7s ease both",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#a78bfa",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "8px 22px",
              borderRadius: 999,
              marginBottom: 24,
              backdropFilter: "blur(10px)",
            }}
          >
            ✦ Glass UI System
          </div>

          <h1
            style={{
              fontSize: "clamp(38px,7vw,70px)",
              fontWeight: 900,
              lineHeight: 1.08,
              color: "#fff",
              letterSpacing: "-0.025em",
              marginBottom: 18,
            }}
          >
            Tarjetas{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#a78bfa,#60a5fa,#34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              3D Glass
            </span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.42)",
              fontSize: 15.5,
              lineHeight: 1.7,
            }}
          >
            Mueve el cursor sobre cada tarjeta para ver el efecto de
            profundidad,
            <br />y compara varios estilos distintos en la misma página.
          </p>
        </div>

        <CardsSection
          label="SECCIÓN 1"
          title="Tarjetas 3D interactivas"
          subtitle="Este es tu bloque base con tilt, brillo dinámico y barras animadas al pasar el cursor."
          cards={mainCards}
        />

        <ClassicGlassSection />

        <StackCardsSection />

        <div
          style={{
            textAlign: "center",
            marginTop: 70,
            color: "rgba(255,255,255,0.22)",
            fontSize: 13,
          }}
        >
          Construido con{" "}
          <span style={{ color: "#a78bfa", fontWeight: 600 }}>
            múltiples sistemas de tarjetas
          </span>{" "}
          + React
        </div>
      </div>
    </div>
  );
}
