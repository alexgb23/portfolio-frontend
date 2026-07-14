import styles from "./LaboratoryFooter.module.css";
export default function LaboratoryFooter() {
  return (
    <section className="laboratory-footer section">
      <div className="container">
        <div className="laboratory-footer__card">
          <div>
            <span className="laboratory-footer__kicker">Explorar más</span>
            <h2>Todo el laboratorio vive en SYSKOVEX.com</h2>
            <p>
              Ahí estará la documentación completa, las pruebas, recursos y el
              desarrollo continuo del laboratorio.
            </p>
          </div>

          <a
            href="https://syskovex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="laboratory-footer__cta"
          >
            Ir a SYSKOVEX
          </a>
        </div>
      </div>
    </section>
  );
}
