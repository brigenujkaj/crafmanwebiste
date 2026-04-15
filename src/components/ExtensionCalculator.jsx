import { useEffect, useMemo, useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/xzdkevbg";

function createProject(id = Date.now()) {
    return {
        id,
        type: "rear",
        width: 6,
        depth: 3,
        size: 18,
        spec: "standard",
    };
}

export default function ExtensionCalculator() {
    const [projects, setProjects] = useState([createProject(1)]);
    const [screenWidth, setScreenWidth] = useState(1200);

    const [lead, setLead] = useState({
        name: "",
        email: "",
        phone: "",
        postcode: "",
        houseType: "semidetached",
        addKitchen: false,
        addBathroom: false
    });

    const [showResult, setShowResult] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false });

    useEffect(() => {
        if (typeof window !== "undefined") {
            setScreenWidth(window.innerWidth);
            const handleResize = () => setScreenWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const isMobile = screenWidth < 768;

    // Fixed pricing logic for London/Essex
    const baseRates = {
        rear: 1700,
        side: 1700,
        wrap: 1700,
        double: 1700,
        loft: 1400,
        kitchenBase: 3200,
        bathroomBase: 5700
    };

    const typeLabels = {
        rear: "Rear Extension",
        side: "Side Return",
        wrap: "Wraparound",
        double: "Double Storey",
        loft: "Loft Conversion"
    };

    const totals = useMemo(() => {
        const extTotal = projects.reduce((acc, p) => acc + (baseRates[p.type] * p.size), 0);
        const kitchenCost = lead.addKitchen ? baseRates.kitchenBase : 0;
        const bathroomCost = lead.addBathroom ? baseRates.bathroomBase : 0;
        const drawingsFee = 1250;
        const grandTotal = extTotal + kitchenCost + bathroomCost + drawingsFee;

        return {
            construction: extTotal,
            kitchenCost,
            bathroomCost,
            fees: drawingsFee,
            grandTotal
        };
    }, [projects, lead.addKitchen, lead.addBathroom]);

    function updateProject(projectId, field, value) {
        setProjects((prev) =>
            prev.map((p) => {
                if (p.id === projectId) {
                    const val = (field === "width" || field === "depth" || field === "size") ? Number(value) : value;
                    const updated = { ...p, [field]: val };
                    return updated;
                }
                return p;
            })
        );
    }

    const inputStyle = {
        width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #d6d3d1",
        fontSize: "16px", boxSizing: "border-box", backgroundColor: "#ffffff", marginBottom: "12px",
        outline: "none"
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitStatus({ loading: true, success: false });
        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ ...lead, totals, projects }),
            });
            if (res.ok) {
                setShowResult(true);
                setSubmitStatus({ loading: false, success: true });
            }
        } catch (err) {
            setSubmitStatus({ loading: false, success: false });
        }
    }

    return (
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif", color: "#1c1917" }}>
            <div style={{ background: "#ffffff", border: "1px solid #e7e5e4", borderRadius: "24px", padding: isMobile ? "20px" : "32px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr", gap: "32px" }}>

                    {/* CONFIGURATION COLUMN */}
                    <div>
                        <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>1. Build Dimensions</h3>
                        {projects.map((project) => (
                            <div key={project.id} style={{ border: "1px solid #e7e5e4", borderRadius: "18px", padding: "20px", background: "#fafaf9", marginBottom: "20px" }}>
                                <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "8px", color: "#78716c" }}>EXTENSION TYPE</label>
                                <select value={project.type} onChange={(e) => updateProject(project.id, "type", e.target.value)} style={inputStyle}>
                                    {Object.entries(typeLabels).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
                                </select>

                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: "11px", fontWeight: "700", color: "#a8a29e", marginBottom: "4px", display: "block" }}>WIDTH (M)</label>
                                        <input type="number" value={project.width} onChange={(e) => updateProject(project.id, "width", e.target.value)} style={{ ...inputStyle, marginBottom: 0 }} />
                                    </div>
                                    <div style={{ fontSize: "20px", marginTop: "18px", color: "#d6d3d1" }}>×</div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: "11px", fontWeight: "700", color: "#a8a29e", marginBottom: "4px", display: "block" }}>DEPTH (M)</label>
                                        <input type="number" value={project.depth} onChange={(e) => updateProject(project.id, "depth", e.target.value)} style={{ ...inputStyle, marginBottom: 0 }} />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => updateProject(project.id, "size", project.width * project.depth)}
                                    style={{ width: "100%", marginTop: "15px", padding: "12px", background: "#e7e5e4", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "700", cursor: "pointer", color: "#444" }}
                                >
                                    Calculate Area: {project.width * project.depth}m²
                                </button>
                            </div>
                        ))}

                        <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "15px" }}>2. Property & Fit-out</h3>
                        <select value={lead.houseType} onChange={(e) => setLead({ ...lead, houseType: e.target.value })} style={inputStyle}>
                            <option value="terraced">Terraced</option>
                            <option value="semidetached">Semi-Detached</option>
                            <option value="detached">Detached</option>
                            <option value="bungalow">Bungalow</option>
                        </select>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "30px" }}>
                            <button type="button" onClick={() => setLead({ ...lead, addKitchen: !lead.addKitchen })} style={{ padding: "14px", borderRadius: "12px", border: lead.addKitchen ? "2px solid #1c1917" : "1px solid #d6d3d1", background: lead.addKitchen ? "#f5f5f4" : "#fff", fontWeight: "700", cursor: "pointer" }}>{lead.addKitchen ? "✓ Kitchen" : "+ Kitchen"}</button>
                            <button type="button" onClick={() => setLead({ ...lead, addBathroom: !lead.addBathroom })} style={{ padding: "14px", borderRadius: "12px", border: lead.addBathroom ? "2px solid #1c1917" : "1px solid #d6d3d1", background: lead.addBathroom ? "#f5f5f4" : "#fff", fontWeight: "700", cursor: "pointer" }}>{lead.addBathroom ? "✓ Bathroom" : "+ Bathroom"}</button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ borderTop: "1px solid #e7e5e4", paddingTop: "24px" }}>
                            <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "15px" }}>3. Contact Information</h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                <input placeholder="Name" onChange={(e) => setLead({ ...lead, name: e.target.value })} style={inputStyle} required />
                                <input placeholder="Postcode" onChange={(e) => setLead({ ...lead, postcode: e.target.value })} style={inputStyle} required />
                            </div>
                            <input placeholder="Email Address" type="email" onChange={(e) => setLead({ ...lead, email: e.target.value })} style={inputStyle} required />
                            <input placeholder="Phone" type="tel" onChange={(e) => setLead({ ...lead, phone: e.target.value })} style={inputStyle} required />
                            <button type="submit" style={{ width: "100%", background: "#1c1917", color: "#fff", padding: "18px", borderRadius: "12px", fontWeight: "800", border: "none", cursor: "pointer", fontSize: "16px" }}>
                                {submitStatus.loading ? "Processing..." : "Reveal My Estimate"}
                            </button>
                        </form>
                    </div>

                    {/* RESULTS COLUMN */}
                    <div style={{ minWidth: 0 }}>
                        <div style={{ background: "#1c1917", color: "#fff", borderRadius: "24px", padding: "35px", height: "100%", position: isMobile ? "static" : "sticky", top: "24px" }}>
                            <div style={{ fontSize: "12px", textTransform: "uppercase", color: "#a8a29e", letterSpacing: "1px" }}>Estimated Investment</div>
                            <div style={{ fontSize: "42px", fontWeight: "800", marginTop: "12px", filter: showResult ? "none" : "blur(8px)", transition: "0.4s" }}>
                                £{Math.round(totals.grandTotal).toLocaleString()}*
                            </div>

                            <div style={{ marginTop: "30px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                <div style={{ fontWeight: "700", marginBottom: "20px", color: "#fbbf24", fontSize: "13px" }}>ITEMIZED BREAKDOWN:</div>

                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}>
                                    <span>Build Shell ({projects[0].size}m²):</span>
                                    <span style={{ filter: showResult ? "none" : "blur(5px)" }}>£{Math.round(totals.construction).toLocaleString()}</span>
                                </div>

                                {lead.addKitchen && (
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px", color: "#e7e5e4" }}>
                                        <span>Kitchen Fit-out:</span>
                                        <span style={{ filter: showResult ? "none" : "blur(5px)" }}>£{baseRates.kitchenBase.toLocaleString()}</span>
                                    </div>
                                )}

                                {lead.addBathroom && (
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px", color: "#e7e5e4" }}>
                                        <span>Bathroom Fit-out:</span>
                                        <span style={{ filter: showResult ? "none" : "blur(5px)" }}>£{baseRates.bathroomBase.toLocaleString()}</span>
                                    </div>
                                )}

                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "14px", color: "#a8a29e" }}>
                                    <span>Planning & Structural:</span>
                                    <span style={{ filter: showResult ? "none" : "blur(5px)" }}>£{totals.fees.toLocaleString()}</span>
                                </div>

                                {/* TURNKEY NOTE */}
                                <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "15px", borderRadius: "12px", fontSize: "12px", lineHeight: "1.6", color: "#d6d3d1", borderLeft: "3px solid #fbbf24", marginBottom: "25px" }}>
                                    <strong>Turnkey Service Included:</strong> Covers all Planning, Architecture,
                                    external/internal finishes, flooring, electrical, plumbing, skirting and painting.
                                </div>

                                {showResult && (
                                    <div style={{ animation: "fadeIn 0.5s" }}>
                                        <div style={{ fontSize: "12px", color: "#fbbf24", marginBottom: "20px" }}>
                                            Project: {lead.houseType} | {lead.postcode.toUpperCase()}
                                        </div>
                                        <a href="https://calendar.app.google/NBBKg6BiESkgfsJ5A" target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "#fbbf24", color: "#1c1917", padding: "18px", borderRadius: "14px", textAlign: "center", textDecoration: "none", fontWeight: "800", boxShadow: "0 4px 15px rgba(251, 191, 36, 0.3)" }}>📞 Book a Call</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}