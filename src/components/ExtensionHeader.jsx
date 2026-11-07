import { useState } from "react";
import { Link } from "react-router-dom";

export default function ExtensionHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="extension-header">
      <style>{`
        .extension-header{position:sticky;top:0;z-index:1000;width:100%;background:rgba(8,8,7,.97);backdrop-filter:blur(14px);border-bottom:1px solid rgba(200,166,75,.38);color:#f6efdc}
        .extension-header *{box-sizing:border-box}
        .extension-header-inner{width:min(1240px,100%);min-height:82px;margin:0 auto;padding:12px clamp(18px,4vw,48px);display:flex;align-items:center;justify-content:space-between;gap:24px}
        .extension-header-brand{display:flex;flex-direction:column;gap:4px;min-width:0;text-decoration:none;color:#f7f0dd}
        .extension-header-brand-name{font-size:25px;font-weight:900;letter-spacing:.12em;line-height:1;color:#fff}
        .extension-header-brand-name span{color:#d5b45b}
        .extension-header-brand-tag{font-size:9px;font-weight:800;letter-spacing:.19em;text-transform:uppercase;color:#cbb779}
        .extension-header-nav{display:flex;align-items:center;gap:clamp(14px,2.4vw,30px)}
        .extension-header-nav a{color:#e8e0ca;text-decoration:none;font-size:12px;font-weight:700;transition:color .18s ease}
        .extension-header-nav a:hover{color:#e5c66e}
        .extension-header-actions{display:flex;align-items:center;gap:12px}
        .extension-header-phone{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:44px;padding:0 16px;border:1px solid #c8a64b;background:#c8a64b;color:#090908;text-decoration:none;font-size:12px;font-weight:900;letter-spacing:.035em;white-space:nowrap;transition:background .18s ease,transform .18s ease}
        .extension-header-phone:hover{background:#e6cd83;transform:translateY(-1px)}
        .extension-header-phone svg{width:15px;height:15px;flex:none}
        .extension-header-menu-button{display:none;width:43px;height:43px;align-items:center;justify-content:center;border:1px solid rgba(200,166,75,.55);background:transparent;color:#e6cd83;cursor:pointer}
        .extension-header-mobile-nav{display:none}
        @media(max-width:780px){
          .extension-header-inner{min-height:72px;padding:10px 16px;gap:10px}
          .extension-header-brand-name{font-size:21px;letter-spacing:.1em}
          .extension-header-brand-tag{font-size:8px;letter-spacing:.12em}
          .extension-header-nav{display:none}
          .extension-header-actions{gap:8px}
          .extension-header-phone{min-height:42px;padding:0 11px;font-size:11px}
          .extension-header-menu-button{display:inline-flex}
          .extension-header-mobile-nav{display:grid;grid-template-rows:0fr;background:#0d0d0b;border-top:1px solid transparent;transition:grid-template-rows .22s ease,border-color .22s ease}
          .extension-header-mobile-nav.is-open{grid-template-rows:1fr;border-top-color:rgba(200,166,75,.3)}
          .extension-header-mobile-nav-inner{overflow:hidden;display:grid;min-height:0;padding:0 18px}
          .extension-header-mobile-nav.is-open .extension-header-mobile-nav-inner{padding:9px 18px 17px}
          .extension-header-mobile-nav a{padding:12px 3px;color:#eee4ca;text-decoration:none;font-size:13px;font-weight:700;border-bottom:1px solid rgba(200,166,75,.13)}
          .extension-header-mobile-nav a:last-child{border-bottom:0}
        }
        @media(max-width:380px){
          .extension-header-brand-name{font-size:18px}
          .extension-header-brand-tag{font-size:7px}
          .extension-header-phone{font-size:0;gap:0;width:42px;padding:0}
          .extension-header-phone svg{width:17px;height:17px}
        }
        @media(prefers-reduced-motion:reduce){
          .extension-header *, .extension-header *:before,.extension-header *:after{transition:none!important}
        }
      `}</style>

      <div className="extension-header-inner">
        <Link className="extension-header-brand" to="/" onClick={closeMenu} aria-label="Crafman Design and Build home">
          <span className="extension-header-brand-name">CRAF<span>MAN</span></span>
          <span className="extension-header-brand-tag">North London Extension Specialists</span>
        </Link>

        <nav className="extension-header-nav" aria-label="Main navigation">
          <a href="#extension-types">Extensions</a>
          <a href="#capabilities">Design & planning</a>
          <a href="#process">Our process</a>
          <a href="#faqs">FAQs</a>
        </nav>

        <div className="extension-header-actions">
          <a className="extension-header-phone" href="tel:+442081914122" aria-label="Call Crafman on 020 8191 4122">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 3h4l2 5-2.5 1.6a15 15 0 0 0 5.9 5.9L16 13l5 2v4c0 1.1-.9 2-2 2C10 21 3 14 3 5c0-1.1.9-2 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            020 8191 4122
          </a>
          <button
            className="extension-header-menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            )}
          </button>
        </div>
      </div>

      <nav className={`extension-header-mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <div className="extension-header-mobile-nav-inner">
          <a href="#extension-types" onClick={closeMenu}>Extensions</a>
          <a href="#capabilities" onClick={closeMenu}>Design & planning</a>
          <a href="#process" onClick={closeMenu}>Our process</a>
          <a href="#faqs" onClick={closeMenu}>FAQs</a>
          <a href="#extension-enquiry" onClick={closeMenu}>Request a consultation</a>
        </div>
      </nav>
    </header>
  );
}
