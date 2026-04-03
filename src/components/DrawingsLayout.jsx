import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const siteStyles = {
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

export default function Layout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [servicesOpen, setServicesOpen] = useState(false);

    const navLinkStyle = (to) => ({
        color: location.pathname === to ? "#1c1917" : "#44403c",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: location.pathname === to ? "700" : "500",
        padding: "10px 14px",
        borderRadius: "10px",
        background: location.pathname === to ? "#f1ede7" : "transparent",
        border: location.pathname === to ? "1px solid #e7e5e4" : "1px solid transparent",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
    });

    const callLinkStyle = {
        display: "inline-block",
        background: "#A67C00",
        color: "#fff",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "700",
        padding: "11px 18px",
        borderRadius: "12px",
        border: "1px solid #A67C00",
        whiteSpace: "nowrap",
        boxShadow: "0 8px 18px rgba(166,124,0,0.18)",
    };

    const contactLinkStyle = {
        display: "inline-block",
        background: "#1c1917",
        color: "#fff",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "600",
        padding: "11px 18px",
        borderRadius: "12px",
        border: "1px solid #1c1917",
        whiteSpace: "nowrap",
    };

    const dropdownButtonStyle = {
        color: ["/house-extensions-london", "/renovations-london", "/commercial-fit-outs-london", "/drawings-planning"].includes(location.pathname)
            ? "#1c1917"
            : "#44403c",
        fontSize: "15px",
        fontWeight: ["/house-extensions-london", "/renovations-london", "/commercial-fit-outs-london", "/drawings-planning"].includes(location.pathname)
            ? "700"
            : "500",
        padding: "10px 14px",
        borderRadius: "10px",
        background: ["/house-extensions-london", "/renovations-london", "/commercial-fit-outs-london", "/drawings-planning"].includes(location.pathname)
            ? "#f1ede7"
            : "transparent",
        border: ["/house-extensions-london", "/renovations-london", "/commercial-fit-outs-london", "/drawings-planning"].includes(location.pathname)
            ? "1px solid #e7e5e4"
            : "1px solid transparent",
        cursor: "pointer",
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
    };

    const dropdownMenuStyle = {
        position: "absolute",
        top: "calc(100% + 10px)",
        left: 0,
        minWidth: "240px",
        background: "#fff",
        border: "1px solid #e7e5e4",
        borderRadius: "14px",
        boxShadow: "0 14px 34px rgba(0,0,0,0.08)",
        padding: "8px",
        zIndex: 100,
    };

    const dropdownItemStyle = (to) => ({
        display: "block",
        width: "100%",
        textAlign: "left",
        textDecoration: "none",
        color: location.pathname === to ? "#1c1917" : "#44403c",
        fontSize: "14px",
        fontWeight: location.pathname === to ? "700" : "500",
        padding: "11px 12px",
        borderRadius: "10px",
        background: location.pathname === to ? "#f7f5f2" : "transparent",
        border: "none",
        cursor: "pointer",
        boxSizing: "border-box",
    });

    const services = [
        { to: "/house-extensions-london", label: "House Extensions" },
        { to: "/renovations-london", label: "Renovations" },
        { to: "/commercial-fit-outs-london", label: "Commercial" },
        { to: "/drawings-planning", label: "Drawings & Planning" },
    ];

    function goToService(to) {
        setServicesOpen(false);
        navigate(to);
    }

    return (
        <div style={siteStyles.page}>
            <header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    background: "rgba(255,255,255,0.94)",
                    backdropFilter: "blur(10px)",
                    borderBottom: "1px solid #e7e5e4",
                    boxShadow: "0 4px 18px rgba(0,0,0,0.03)",
                }}
            >
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "16px 24px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            flexDirection: "column",
                            gap: "4px",
                            minWidth: "220px",
                        }}
                    >
                        <Link
                            to="/"
                            style={{
                                fontSize: "30px",
                                fontWeight: "800",
                                textDecoration: "none",
                                lineHeight: "1.05",
                                letterSpacing: "-0.6px",
                            }}
                        >
                            <span style={{ color: "#0F0F0F" }}>Crafman</span>{" "}
                            <span style={{ color: "#A67C00" }}>Planning & Drawings</span>
                        </Link>

                        <div
                            style={{
                                fontSize: "11px",
                                color: "#78716C",
                                letterSpacing: "2.5px",
                                textTransform: "uppercase",
                                fontWeight: "700",
                            }}
                        >
                            Extension & Planning Drawings Made Simple
                        </div>
                    </div>

                    <nav
                        style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            flexWrap: "wrap",
                            flex: 1,
                        }}
                    >
                        <Link to="/" style={navLinkStyle("/")}>
                            Home
                        </Link>

                        <div
                            style={{ position: "relative" }}
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <button
                                type="button"
                                onClick={() => setServicesOpen((prev) => !prev)}
                                style={dropdownButtonStyle}
                            >
                                Services
                                <span style={{ fontSize: "12px" }}>{servicesOpen ? "▲" : "▼"}</span>
                            </button>

                            {servicesOpen && (
                                <div style={dropdownMenuStyle}>
                                    {services.map((service) => (
                                        <button
                                            key={service.to}
                                            type="button"
                                            onClick={() => goToService(service.to)}
                                            style={dropdownItemStyle(service.to)}
                                        >
                                            {service.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link to="/projects" style={navLinkStyle("/projects")}>
                            Projects
                        </Link>

                        <Link to="/about" style={navLinkStyle("/about")}>
                            About
                        </Link>

                        <a href="tel:02036335634" style={callLinkStyle}>
                            Call Now
                        </a>

                        <Link to="/contact" style={contactLinkStyle}>
                            Contact
                        </Link>
                    </nav>
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
}