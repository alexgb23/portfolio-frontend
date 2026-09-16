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
  const key = `${item?.icon_key ?? ""} ${item?.platform ?? ""} ${
    item?.label ?? ""
  }`.toLowerCase();

  if (key.includes("github")) return <FaGithub aria-hidden="true" />;
  if (key.includes("linkedin")) return <FaLinkedin aria-hidden="true" />;
  if (key.includes("email") || key.includes("mail")) {
    return <FaEnvelope aria-hidden="true" />;
  }
  if (key.includes("instagram")) return <FaInstagram aria-hidden="true" />;

  return <FaGlobe aria-hidden="true" />;
}

function normalizeHref(item) {
  const raw = typeof item?.url === "string" ? item.url.trim() : "";

  if (!raw) {
    return "";
  }

  const platform = String(item?.platform ?? "").toLowerCase();
  const iconKey = String(item?.icon_key ?? "").toLowerCase();

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

function Footer({
  socialLinks = [],
  loading = false,
  isRefreshing = false,
  isRetrying = false,
}) {
  const currentYear = new Date().getFullYear();
  const [shouldRenderFooter, setShouldRenderFooter] = useState(false);

  useEffect(() => {
    let idleCallbackId = null;
    let timeoutId = null;

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
      if (idleCallbackId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const footerLinks = useMemo(() => {
    const baseLinks = Array.isArray(socialLinks) ? socialLinks : [];

    const cleanedLinks = baseLinks
      .filter((item) => {
        const key = `${item?.platform ?? ""} ${item?.icon_key ?? ""} ${
          item?.label ?? ""
        }`.toLowerCase();

        return !key.includes("facebook");
      })
      .map((item) => ({
        href: normalizeHref(item),
        icon: getSocialIcon(item),
        label: item?.label || item?.platform || "Enlace",
      }))
      .filter((item) => item.href);

    /*
     * Este enlace siempre existe, aunque Render esté iniciando.
     */
    cleanedLinks.push({
      href: "https://syskovex.com",
      icon: <FaGlobe aria-hidden="true" />,
      label: "Home Lab",
    });

    const ordered = [
      ...cleanedLinks.filter((link) => link.label === "Home Lab"),
      ...cleanedLinks.filter((link) => link.label !== "Home Lab"),
    ];

    return ordered.filter(
      (item, index, array) =>
        array.findIndex((entry) => entry.href === item.href) === index,
    );
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

  const isConnecting = Boolean(
    isRetrying || (loading && footerLinks.length <= 1),
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

          {isConnecting ? (
            <span className="footer-sync-status" aria-live="polite">
              Conectando…
            </span>
          ) : isRefreshing ? (
            <span className="footer-sync-status" aria-live="polite">
              Actualizando…
            </span>
          ) : null}
        </div>

        <div className="footer-links">
          {footerLinks.map((link, index) => {
            const isMail = link.href.startsWith("mailto:");

            return (
              <a
                key={`${link.href}-${index}`}
                href={link.href}
                className="footer-link"
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                title={link.label}
              >
                {link.icon}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
