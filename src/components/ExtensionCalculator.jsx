import { useEffect, useMemo, useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/xzdkevbg";

function createProject(id = Date.now()) {
    return {
        id,
        type: "rear",
        size: 20,
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
        addKitchen: false,
        addBathroom: false
    });

    const [showResult, setShowResult] = useState(false);
    const [error, setError] = useState("");
    const [submitStatus, setSubmitStatus] = useState({
        loading: false,
        success: false,
        error: "",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            setScreenWidth(window.innerWidth);
            const handleResize = () => setScreenWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const isMobile = screenWidth < 768;

    // Pricing Logic
    const baseRates = {
        rear: 1700, side: 1700, wrap: 1700, double: 1700, loft: 1500,
        kitchenBase: 3200, bathroomBase: 5700
    };

    const typeLabels = {
        rear: "Rear Extension", side: "Side Return", wrap: "Wraparound",
        double: "Double Storey", loft: "Loft Conversion"
    };

    const totals = useMemo(() => {
        const extTotal = projects.reduce((acc, p) => acc + (baseRates[p.type] * p.size), 0);
        const kitchenCost = lead.addKitchen ? baseRates.kitchenBase : 0;
        const bathroomCost = lead.addBathroom ? baseRates.bathroomBase : 0;
        const grandTotal = extTotal + kitchenCost + bathroomCost;

        const drawingsFee = 750;
        const structuralFee = 500;
        const totalFees = drawingsFee + structuralFee + 1000; // 1000 for other fees

        return {
            low: grandTotal * 0.9,
            high: grandTotal * 1.1,
            construction: extTotal > totalFees ? extTotal - totalFees : extTotal,
            kitchenCost,
            bathroomCost,
            grandTotal
        };
    }, [projects, lead.addKitchen, lead.addBathroom]);

    function updateProject(projectId, field, value) {
        setProjects((prev) =>
            prev.map((project) =>
                project.id === projectId ? { ...project, [field]: value } : project
            )
        );
    }

    const inputStyle = {
        width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #d6d3d1",
        fontSize: "15px", boxSizing: "border-box", backgroundColor: "#ffffff", marginBottom: "12px"
    };

    const checkboxStyle = (active) => ({
        display: "flex", alignItems: "center", gap: "10px", padding: "14px",
        borderRadius: "12px", border: active ? "2px solid #1c1917" : "1px solid #e7e5e4",
        background: active ? "#fafaf9" : "#fff",
        cursor: "pointer", transition: "0.2s"
    });

    async function handleSubmit(e) {
        e.preventDefault();
        if (!lead.name || !lead.email || !lead.phone) {
            setError("Please fill in your contact details.");
            return;
        }
        setSubmitStatus({ loading: true, success: false, error: "" });
        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ ...lead, totals }),
            });
            if (response.ok) {
                setShowResult(true);
                setSubmitStatus({ loading: false, success: true, error: "" });
            }
        } catch (err) {
            setSubmitStatus({ loading: false, success: false, error: "Submission failed." });
        }
    }

    return (
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
            <div style={{ background: "#ffffff", border: "1px solid #ddd", borderRadius: "24px", padding: isMobile ? "20px" : "32px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr", gap: "28px" }}>

                    {/* CONFIGURATION */}
                    <div>
                        <div style={{ fontWeight: "700", marginBottom: "16px", fontSize: "18px" }}>1. Structural Design</div>
                        {projects.map((project) => (
                            <div key={project.id} style={{ border: "1px solid #e7e5e4", borderRadius: "18px", padding: "20px", background: "#fafaf9", marginBottom: "20px" }}>
                                <label style={{ fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px" }}>Extension Type</label>
                                <select value={project.type} onChange={(e) => updateProject(project.id, "type", e.target.value)} style={inputStyle}>
                                    {Object.entries(typeLabels).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
                                </select>
                             
                                <label style={{ fontSize: "14px", fontWeight: "700", display: "block", marginBottom: "8px" }}>
                                    Approx Sizze: {project.size}m²
                                </label>
                                <input
                                    type="range"
                                    min="5"
                                    max="80"
                                    step="1"
                                    value={project.size}
                                    onChange={(e) => updateProject(project.id, "size", Number(e.target.value))}
                                    className="calculator-slider" // Optional: add a class if you want to be specific
                                    style={{
                                        width: "100%",
                                        cursor: "pointer",
                                        touchAction: "manipulation"
                                    }}
                                />
                            </div>
                        ))}

                        <div style={{ fontWeight: "700", marginBottom: "12px", fontSize: "18px" }}>2. Optional Add-ons</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "30px" }}>
                            <label style={checkboxStyle(lead.addKitchen)}>
                                <input type="checkbox" checked={lead.addKitchen} onChange={(e) => setLead({ ...lead, addKitchen: e.target.checked })} />
                                <span style={{ fontSize: "14px", fontWeight: "600" }}>Add Kitchen</span>
                            </label>
                            <label style={checkboxStyle(lead.addBathroom)}>
                                <input type="checkbox" checked={lead.addBathroom} onChange={(e) => setLead({ ...lead, addBathroom: e.target.checked })} />
                                <span style={{ fontSize: "14px", fontWeight: "600" }}>Add Bathroom</span>
                            </label>
                        </div>

                        <form onSubmit={handleSubmit} style={{ borderTop: "1px solid #e7e5e4", paddingTop: "24px" }}>
                            <div style={{ fontWeight: "700", marginBottom: "15px" }}>3. Receive Your Breakdown</div>
                            <input placeholder="Name" onChange={(e) => setLead({ ...lead, name: e.target.value })} style={inputStyle} required />
                            <input placeholder="Email" type="email" onChange={(e) => setLead({ ...lead, email: e.target.value })} style={inputStyle} required />
                            <input placeholder="Phone" type="tel" onChange={(e) => setLead({ ...lead, phone: e.target.value })} style={inputStyle} required />
                            <button type="submit" style={{ width: "100%", background: "#1c1917", color: "#fff", padding: "16px", borderRadius: "12px", fontWeight: "700", border: "none", cursor: "pointer" }}>
                                {submitStatus.loading ? "Processing..." : "View Detailed Estimates"}
                            </button>
                        </form>
                    </div>

                    {/* RESULTS COLUMN */}
                    <div style={{ minWidth: 0 }}>
                        <div style={{ background: "#1c1917", color: "#fff", borderRadius: "24px", padding: "32px", height: "100%", position: isMobile ? "static" : "sticky", top: "24px" }}>
                            <div style={{ fontSize: "12px", textTransform: "uppercase", color: "#d6d3d1", letterSpacing: "1px" }}>Total Estimated Range</div>
                            <div style={{ fontSize: "36px", fontWeight: "700", marginTop: "12px", filter: showResult ? "none" : "blur(7px)", transition: "0.3s" }}>
                                £{Math.round(totals.low).toLocaleString()} – £{Math.round(totals.high).toLocaleString()}
                            </div>

                            <div style={{ marginTop: "30px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                <div style={{ fontWeight: "700", marginBottom: "20px", color: "#fbbf24" }}>Itemized Breakdown:</div>

                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}>
                                    <span>Completed Shell:</span>
                                    <span style={{ filter: showResult ? "none" : "blur(5px)" }}>£{Math.round(totals.construction).toLocaleString()}</span>
                                </div>

                                {lead.addKitchen && (
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px", color: "#e7e5e4" }}>
                                        <span>Kitchen Fit-out:</span>
                                        <span style={{ filter: showResult ? "none" : "blur(5px)" }}>from £{baseRates.kitchenBase.toLocaleString()}</span>
                                    </div>
                                )}

                                {lead.addBathroom && (
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px", color: "#e7e5e4" }}>
                                        <span>Bathroom Fit-out:</span>
                                        <span style={{ filter: showResult ? "none" : "blur(5px)" }}>from £{baseRates.bathroomBase.toLocaleString()}</span>
                                    </div>
                                )}

                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px", color: "#a8a29e" }}>
                                    <span>Drawings & Structural:</span>
                                    <span style={{ filter: showResult ? "none" : "blur(5px)" }}>£1,250</span>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "18px", marginTop: "18px", fontWeight: "700", fontSize: "18px", color: "#fbbf24" }}>
                                    <span>Estimated Total:</span>
                                    <span style={{ filter: showResult ? "none" : "blur(6px)" }}>£{Math.round(totals.grandTotal).toLocaleString()}*</span>
                                </div>
                            </div>

                            {showResult && (
                                <div style={{ marginTop: "24px" }}>
                                    <div style={{ fontSize: "16px", color: "#d6d3d1", marginBottom: "20px", lineHeight: "1.5" }}>
                                        *Includes electrical, internal finishes, and flooring as standard.
                                    </div>
                                    <a
                                        href="https://calendar.app.google/NBBKg6BiESkgfsJ5A"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "block",
                                            background: "#fbbf24",
                                            color: "#1c1917",
                                            padding: "16px",
                                            borderRadius: "12px",
                                            textAlign: "center",
                                            textDecoration: "none",
                                            fontWeight: "800",
                                            boxShadow: "0 4px 15px rgba(251, 191, 36, 0.3)"
                                        }}
                                    >
                                        📞 Book a Call
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}