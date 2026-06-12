import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const callLinkStyle = {
        display: "inline-block",
        background: "linear-gradient(135deg, #A67C00 0%, #C6A243 100%)",
        color: "#fff",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "700",
        padding: "11px 20px",
        borderRadius: "12px",
        whiteSpace: "nowrap",
        boxShadow: "0 8px 18px rgba(166,124,0,0.18)",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.2s ease"
    };

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
                        padding: isMobile ? "12px 16px" : "16px 24px",
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
                            <span style={{ color: "#A67C00" }}>Architectural</span>
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
                        <a
                            href="tel:02036335634"
                            onClick={() => {
                                // 🎯 Keep conversion tracking active for your live Google Ads campaign optimization
                                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                    event: "direct_phone_click",
                                    phone_number: "02036335634",
                                    location: "Global Navbar Master Anchor Link"
                                });
                            }}
                            style={callLinkStyle}
                        >
                            📞 {isMobile ? "Call Office" : "Call Now: 0203 633 5634"}
                        </a>
                    </nav>
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
}