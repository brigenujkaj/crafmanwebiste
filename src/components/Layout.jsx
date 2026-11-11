import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// Shared design tokens are kept exported because existing forms and pages use them.
export const siteStyles = {
    // Preserve the existing shared tokens so other pages keep their current styling.
    page: {
        minHeight: "100vh",
        background: "#f7f5f2",
        color: "#1f1f1f",
        fontFamily: "Arial, sans-serif",
    },
    section: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "60px 20px",
    },
    card: {
        background: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
    },
    buttonPrimary: {
        display: "inline-block",
        background: "#1c1917",
        color: "#fff",
        padding: "14px 22px",
        borderRadius: "12px",
        textDecoration: "none",
        fontWeight: "600",
    },
    buttonSecondary: {
        display: "inline-block",
        background: "#fff",
        color: "#1c1917",
        padding: "14px 22px",
        borderRadius: "12px",
        border: "1px solid #d6d3d1",
        textDecoration: "none",
        fontWeight: "600",
    },
    tag: {
        display: "inline-block",
        padding: "8px 14px",
        borderRadius: "999px",
        border: "1px solid #d6d3d1",
        background: "#fff",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#78716c",
        marginBottom: "16px",
    },
};

const services = [
    { to: "/house-extensions-london", label: "House Extensions" },
    { to: "/renovations-london", label: "Renovations" },
    { to: "/commercial-fit-outs-london", label: "Commercial Fit-Outs" },
    { to: "/drawings-planning", label: "Drawings & Planning" },
    { to: "/landscaping", label: "Landscaping" },
];

export default function Layout({ children }) {
    const location = useLocation();
    const [servicesOpen, setServicesOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const closeTimer = useRef(null);

    const clearCloseTimer = () => {
        if (closeTimer.current) {
            window.clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };

    const openServices = () => {
        clearCloseTimer();
        setServicesOpen(true);
    };

    const scheduleServicesClose = () => {
        clearCloseTimer();
        closeTimer.current = window.setTimeout(() => setServicesOpen(false), 180);
    };

    useEffect(() => {
        setServicesOpen(false);
        setMobileMenuOpen(false);
        return () => clearCloseTimer();
    }, [location.pathname]);

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setServicesOpen(false);
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, []);

    const isServiceActive = services.some((service) => service.to === location.pathname);

    return (
        <div style={siteStyles.page}>
            <style>{`
        .crafman-site-header{position:sticky;top:0;z-index:1000;width:100%;background:rgba(8,8,7,.97);backdrop-filter:blur(14px);border-bottom:1px solid rgba(200,166,75,.38);color:#f4ecd8}
        .crafman-site-header *{box-sizing:border-box}
        .crafman-site-header-inner{width:min(1240px,100%);min-height:80px;margin:0 auto;padding:12px clamp(18px,3.5vw,42px);display:flex;align-items:center;justify-content:space-between;gap:24px}
        .crafman-site-brand{display:flex;flex-direction:column;gap:5px;min-width:0;text-decoration:none}
        .crafman-site-brand-name{color:#fff;font-size:24px;font-weight:900;letter-spacing:.13em;line-height:1}
        .crafman-site-brand-name span{color:#d8b85f}
        .crafman-site-brand-tag{color:#b8a779;font-size:8px;font-weight:800;letter-spacing:.19em;text-transform:uppercase}
        .crafman-site-nav{display:flex;align-items:center;justify-content:flex-end;gap:clamp(10px,1.7vw,23px);flex:1}
        .crafman-site-nav a,.crafman-services-trigger{color:#e7dfca;text-decoration:none;font:700 11px/1.2 Inter,Arial,sans-serif;white-space:nowrap;transition:color .18s ease,background .18s ease}
        .crafman-site-nav a:hover,.crafman-services-trigger:hover,.crafman-site-nav a.is-active{color:#e6cd83}
        .crafman-services-wrap{position:relative;display:flex;align-items:center;height:44px}
        .crafman-services-trigger{display:inline-flex;align-items:center;gap:9px;height:42px;padding:0 3px;border:0;background:transparent;cursor:pointer}
        .crafman-services-trigger.is-active{color:#e6cd83}
        .crafman-services-chevron{color:#c8a64b;font-size:10px;transition:transform .2s ease}
        .crafman-services-trigger[aria-expanded="true"] .crafman-services-chevron{transform:rotate(180deg)}
        /* The menu touches the trigger: no 10px hover gap. */
        .crafman-services-menu{position:absolute;top:100%;left:-14px;min-width:248px;padding:8px;border:1px solid rgba(200,166,75,.45);border-radius:3px;background:#10100e;box-shadow:0 20px 48px rgba(0,0,0,.42);z-index:1100;animation:crafmanMenuIn .16s ease both}
        .crafman-services-menu a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 12px;border-bottom:1px solid rgba(200,166,75,.13);color:#e9e0ca;font-size:11px;white-space:normal}
        .crafman-services-menu a:last-child{border-bottom:0}
        .crafman-services-menu a:hover,.crafman-services-menu a.is-active{background:rgba(200,166,75,.1);color:#e6cd83}
        .crafman-site-phone{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:0 15px;border:1px solid #c8a64b;background:#c8a64b;color:#0b0b09!important;font-size:11px!important;font-weight:900!important;letter-spacing:.02em}
        .crafman-site-phone:hover{background:#e6cd83;color:#0b0b09!important}
        .crafman-site-contact{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:0 15px;border:1px solid rgba(230,205,131,.55);color:#f4ecd8!important}
        .crafman-site-contact:hover{border-color:#e6cd83;background:rgba(200,166,75,.1)}
        .crafman-mobile-toggle{display:none;width:43px;height:43px;align-items:center;justify-content:center;border:1px solid rgba(200,166,75,.55);background:transparent;color:#e6cd83;cursor:pointer}
        .crafman-mobile-panel{display:none}
        @keyframes crafmanMenuIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:850px){
          .crafman-site-header-inner{min-height:72px;padding:10px 17px;gap:12px}
          .crafman-site-brand-name{font-size:21px}
          .crafman-site-brand-tag{font-size:7px;letter-spacing:.14em}
          .crafman-site-nav{display:none}
          .crafman-mobile-toggle{display:inline-flex;flex:none}
          .crafman-mobile-panel{display:grid;grid-template-rows:0fr;background:#0d0d0b;border-top:1px solid transparent;transition:grid-template-rows .24s ease,border-color .24s ease}
          .crafman-mobile-panel.is-open{grid-template-rows:1fr;border-top-color:rgba(200,166,75,.3)}
          .crafman-mobile-panel-inner{overflow:hidden;min-height:0;display:grid;padding:0 19px}
          .crafman-mobile-panel.is-open .crafman-mobile-panel-inner{padding:8px 19px 17px}
          .crafman-mobile-panel a,.crafman-mobile-services-trigger{padding:13px 2px;border:0;border-bottom:1px solid rgba(200,166,75,.15);background:transparent;color:#eee4ca;text-decoration:none;text-align:left;font:750 12px/1.3 Inter,Arial,sans-serif;cursor:pointer}
          .crafman-mobile-services-list{display:grid;padding:3px 0 9px 15px}
          .crafman-mobile-services-list a{font-weight:600;color:#cdbd93;border-bottom:0;padding:10px 2px}
          .crafman-mobile-actions{display:flex;gap:9px;padding-top:13px}
          .crafman-mobile-actions a{flex:1;text-align:center;padding:12px 9px;border:1px solid #c8a64b;color:#111!important;background:#c8a64b}
          .crafman-mobile-actions a:last-child{background:transparent;color:#e6cd83!important}
        }
        @media(prefers-reduced-motion:reduce){.crafman-site-header *, .crafman-site-header *:before,.crafman-site-header *:after{animation:none!important;transition:none!important}}
      `}</style>

            <header className="crafman-site-header">
                <div className="crafman-site-header-inner">
                    <Link className="crafman-site-brand" to="/" aria-label="Crafman Design & Build home">
                        <span className="crafman-site-brand-name">CRAF<span>MAN</span></span>
                        <span className="crafman-site-brand-tag">Design · Build · Deliver</span>
                    </Link>

                    <nav className="crafman-site-nav" aria-label="Main navigation">
                        <Link to="/" className={location.pathname === "/" ? "is-active" : ""}>Home</Link>

                        <div
                            className="crafman-services-wrap"
                            onMouseEnter={openServices}
                            onMouseLeave={scheduleServicesClose}
                            onFocusCapture={openServices}
                            onBlurCapture={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget)) scheduleServicesClose();
                            }}
                        >
                            <button
                                type="button"
                                className={`crafman-services-trigger${isServiceActive ? " is-active" : ""}`}
                                aria-haspopup="true"
                                aria-expanded={servicesOpen}
                                aria-controls="crafman-services-menu"
                                onClick={openServices}
                            >
                                Services <span className="crafman-services-chevron" aria-hidden="true">⌄</span>
                            </button>
                            {servicesOpen && (
                                <div className="crafman-services-menu" id="crafman-services-menu">
                                    {services.map((service) => (
                                        <Link
                                            key={service.to}
                                            to={service.to}
                                            className={location.pathname === service.to ? "is-active" : ""}
                                            onClick={() => setServicesOpen(false)}
                                        >
                                            {service.label}<span aria-hidden="true">↗</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link to="/case-studies" className={location.pathname.startsWith("/case-studies") ? "is-active" : ""}>Projects</Link>
                        <Link to="/about" className={location.pathname === "/about" ? "is-active" : ""}>About</Link>
                        <a className="crafman-site-phone" href="tel:+442081914122">020 8191 4122</a>
                        <Link className="crafman-site-contact" to="/contact">Contact</Link>
                    </nav>

                    <button
                        type="button"
                        className="crafman-mobile-toggle"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen((open) => !open)}
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>

                <div className={`crafman-mobile-panel${mobileMenuOpen ? " is-open" : ""}`} aria-hidden={!mobileMenuOpen}>
                    <div className="crafman-mobile-panel-inner">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <button className="crafman-mobile-services-trigger" type="button" aria-expanded={servicesOpen} onClick={() => setServicesOpen((open) => !open)}>
                            Services {servicesOpen ? "−" : "+"}
                        </button>
                        {servicesOpen && (
                            <div className="crafman-mobile-services-list">
                                {services.map((service) => (
                                    <Link key={service.to} to={service.to} onClick={() => { setServicesOpen(false); setMobileMenuOpen(false); }}>{service.label} ↗</Link>
                                ))}
                            </div>
                        )}
                        <Link to="/case-studies" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
                        <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
                        <Link to="/drawings-planning" onClick={() => setMobileMenuOpen(false)}>Drawings & Planning</Link>
                        <div className="crafman-mobile-actions">
                            <a href="tel:+442081914122">Call Now</a>
                            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                        </div>
                    </div>
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
}
