import { Link } from "react-router-dom";

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
  const navLinkStyle = {
    color: "#1f1f1f",
    textDecoration: "none",
    fontSize: "15px",
  };

  const selectStyle = {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #d6d3d1",
    background: "#fff",
    color: "#1f1f1f",
    fontSize: "15px",
    cursor: "pointer",
  };

  function handleServiceChange(e) {
    const value = e.target.value;
    if (value) {
      window.location.href = value;
    }
  }

  return (
    <div style={siteStyles.page}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #e7e5e4",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "inline-flex", flexDirection: "column", gap: "4px" }}>
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
    <span style={{ color: "#A67C00" }}>Design and Build</span>
  </Link>

  <div
    style={{
      fontSize: "12px",
      color: "#78716C",
      letterSpacing: "2.5px",
      textTransform: "uppercase",
      fontWeight: "600",
    }}
  >
    Design. Build. Deliver.
  </div>
</div>

          <nav
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/" style={navLinkStyle}>
              Home
            </Link>

            <select
              defaultValue=""
              onChange={handleServiceChange}
              style={selectStyle}
            >
                         
                              <option value="" disabled>
                                  Services
                              </option>
                              <option value="/house-extensions-london">House Extensions</option>
                              <option value="/renovations-london">Renovations</option>
                              <option value="/commercial-fit-outs-london">Commercial Fit-Outs</option>
                              <option value="/drawings-planning">Drawings & Planning</option>
                          </select>

            <Link to="/projects" style={navLinkStyle}>
              Projects
            </Link>

            <Link to="/about" style={navLinkStyle}>
              About
            </Link>

            <Link to="/contact" style={navLinkStyle}>
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}