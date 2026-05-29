import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGlobe,
} from 'react-icons/fa'

function Contact() {
  return (
    <section className="section section-spaced">
      <div className="section-head-centered">
        <span className="section-kicker">Contacto</span>
        <h1>Canales profesionales y colaboración</h1>
        <p>
          Disponible para colaboraciones, soporte técnico, desarrollo,
          automatización, infraestructura y soluciones integradas.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Enlaces</h3>

          <ul className="contact-links">
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <FaGithub /> GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin /> LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:tu-correo@empresa.com">
                <FaEnvelope /> Correo profesional
              </a>
            </li>
            <li>
              <a href="https://tuempresa.com" target="_blank" rel="noreferrer">
                <FaGlobe /> Sitio corporativo
              </a>
            </li>
          </ul>
        </div>

        <div className="neo-terminal">
          <div className="term-top-bar">
            <div className="term-controls">
              <span className="c-red"></span>
              <span className="c-yellow"></span>
              <span className="c-green"></span>
            </div>
            <span className="term-tab-title">contact@alex-sys:~</span>
          </div>

          <div className="term-content-area">
            <p className="cmd-input">
              <span className="prompt-color">guest@portfolio:~$</span> iniciar_contacto
            </p>

            <p className="cmd-output">
              Canal disponible para consultas y propuestas técnicas.
            </p>

            <form className="cmd-form" onSubmit={(e) => e.preventDefault()}>
              <div className="cmd-input-line">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  placeholder="tu-correo@empresa.com"
                  required
                />
              </div>

              <div className="cmd-input-line">
                <label htmlFor="msg">MENSAJE</label>
                <input
                  type="text"
                  id="msg"
                  placeholder="Describe brevemente el proyecto"
                  required
                />
              </div>

              <button type="submit" className="cmd-submit-btn">
                enviar()
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact