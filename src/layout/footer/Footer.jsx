import { useEffect, useMemo, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";
import "./Footer.css";

function getSocialIcon(item) {
  const key =
    `${item.icon_key ?? ""} ${item.platform ?? ""} ${item.label ?? ""}`.toLowerCase();

  if (key.includes("github")) return <FaGithub />;
  if (key.includes("linkedin")) return <FaLinkedin />;
  if (key.includes("email") || key.includes("mail")) return <FaEnvelope />;
  if (key.includes("instagram")) return <FaInstagram />;
  if (
    key.includes("web") ||
    key.includes("website") ||
    key.includes("syskovex") ||
    key.includes("laboratorio")
  ) {
    return <FaGlobe />;
  }

  return <FaGlobe />;
}

function normalizeHref(item) {
  const raw = item?.url?.trim() ?? "";
  if (!raw) return "";

  const platform = (item?.platform ?? "").toLowerCase();
  const iconKey = (item?.icon_key ?? "").toLowerCase();

  if (
    raw.includes("@") &&
    !raw.startsWith("http://") &&
    !raw.startsWith("https://") &&
    !raw.startsWith("mailto:")
  ) {
    return `mailto:${raw}`;
  }

  if (platform.includes("email") || iconKey.includes("email")) {
    return raw.startsWith("mailto:") ? raw : `mailto:${raw}`;
  }

  if (!raw.startsWith("http://") && !raw.startsWith("https://")) {
    return `https://${raw}`;
  }

  return raw;
}

function Footer({ socialLinks = [] }) {
  const currentYear = new Date().getFullYear();
  const [shouldRenderFooter, setShouldRenderFooter] = useState(false);

  useEffect(() => {
    let idleCallbackId;
    let timeoutId;

    const enableFooter = () => {
      setShouldRenderFooter(true);
    };

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(enableFooter, {
        timeout: 2500,
      });
    } else {
      timeoutId = window.setTimeout(enableFooter, 1000);
    }

    return () => {
      if (idleCallbackId) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const footerLinks = useMemo(() => {
    const baseLinks = Array.isArray(socialLinks) ? socialLinks : [];

    const cleanedLinks = baseLinks
      .filter((item) => {
        const key =
          `${item?.platform ?? ""} ${item?.icon_key ?? ""} ${item?.label ?? ""}`.toLowerCase();
        return !key.includes("facebook");
      })
      .map((item) => ({
        href: normalizeHref(item),
        icon: getSocialIcon(item),
        label: item.label || item.platform || "Enlace",
      }))
      .filter((item) => item.href);

    // Añade Home Lab explícito
    cleanedLinks.push({
      href: "https://syskovex.com",
      icon: <FaGlobe />,
      label: "Home Lab",
    });

    // Orden: Home Lab primero, luego el resto
    const ordered = [
      ...cleanedLinks.filter((l) => l.label === "Home Lab"),
      ...cleanedLinks.filter((l) => l.label !== "Home Lab"),
    ];

    // Evita duplicados por href
    const unique = ordered.filter(
      (item, index, array) =>
        array.findIndex((entry) => entry.href === item.href) === index,
    );

    return unique;
  }, [socialLinks]);

  const footerSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://alex.syskovex.com/#footer",
      name: "Portfolio técnico de Alexander Galvez",
      url: "https://alex.syskovex.com/",
      author: {
        "@type": "Person",
        name: "Alexander Galvez",
        url: "https://alex.syskovex.com/",
      },
      copyrightYear: currentYear,
    }),
    [currentYear],
  );

  const safeJsonLd = useMemo(
    () => JSON.stringify(footerSchema).replace(/<\//g, "<\\/"),
    [footerSchema],
  );

  if (!shouldRenderFooter) {
    return null;
  }

  return (
    <footer className="site-footer">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-copyright">
            &copy; 2025–{currentYear} Alexander Galvez
          </span>
          <span className="footer-domain">alex.syskovex.com</span>
        </div>

        <div className="footer-links">
          {footerLinks.map((link, index) => (
            <a
              key={`${link.href}-${index}`}
              href={link.href}
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
