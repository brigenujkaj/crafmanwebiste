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
    const [screenWidth, setScreenWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );

    const [lead, setLead] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [showResult, setShowResult] = useState(false);
    const [error, setError] = useState("");
    const [submitStatus, setSubmitStatus] = useState({
        loading: false,
        success: false,
        error: "",
    });

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;

    const baseRates = {
        rear: 1800,
        side: 1800,
        wrap: 1800,
        double: 1800,
        loft: 1500,
    };

    const specMultiplier = {
        standard: 1,
        mid: 1.2,
        high: 1.4,
    };

    const typeLabels = {
        rear: "Rear Extension",
        side: "Side Return",
        wrap: "Wraparound",
        double: "Double Storey",
        loft: "Loft Conversion",
    };

    const specLabels = {
        standard: "Standard",
        mid: "Mid-Range",
        high: "High-End",
    };

    const projectResults = useMemo(() => {
        return projects.map((project) => {
            const baseRate = baseRates[project.type];
            const multiplier = specMultiplier[project.spec];
            const basePrice = baseRate * project.size;
            const adjusted = basePrice * multiplier;
            const low = adjusted * 0.85;
            const high = adjusted * 1.15;

            return {
                ...project,
                label: typeLabels[project.type],
                specLabel: specLabels[project.spec],
                baseRate,
                multiplier,
                basePrice,
                adjusted,
                low,
                high,
            };
        });
    }, [projects]);

    const totals = useMemo(() => {
        return projectResults.reduce(
            (acc, project) => {
                acc.low += project.low;
                acc.high += project.high;
                acc.base += project.basePrice;
                acc.adjusted += project.adjusted;
                return acc;
            },
            { low: 0, high: 0, base: 0, adjusted: 0 }
        );
    }, [projectResults]);

    const pillButton = (active) => ({
        padding: isMobile ? "14px 12px" : "12px 14px",
        borderRadius: "12px",
        border: active ? "1px solid #1c1917" : "1px solid #d6d3d1",
        background: active ? "#1c1917" : "#fff",
        color: active ? "#fff" : "#1f1f1f",
        fontWeight: 600,
        cursor: "pointer",
        fontSize: isMobile ? "13px" : "14px",
        transition: "0.2s ease",
        minHeight: isMobile ? "52px" : "auto",
        width: "100%",
    });

    const inputStyle = {
        width: "100%",
        padding: isMobile ? "14px 14px" : "14px",
        borderRadius: "12px",
        border: "1px solid #d6d3d1",
        fontSize: isMobile ? "16px" : "15px",
        boxSizing: "border-box",
        appearance: "none",
        backgroundColor: "#ffffff",
    };

    function handleLeadChange(e) {
        const { name, value } = e.target;
        setLead((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
        if (submitStatus.error) {
            setSubmitStatus((prev) => ({ ...prev, error: "" }));
        }
    }

    function updateProject(projectId, field, value) {
        setProjects((prev) =>
            prev.map((project) =>
                project.id === projectId ? { ...project, [field]: value } : project
            )
        );
    }

    function addProject() {
        setProjects((prev) => [...prev, createProject(Date.now() + Math.random())]);
    }

    function removeProject(projectId) {
        setProjects((prev) => {
            if (prev.length === 1) return prev;
            return prev.filter((project) => project.id !== projectId);
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!lead.name.trim() || !lead.email.trim() || !lead.phone.trim()) {
            setError("Please complete your name, email, and phone number.");
            return;
        }

        setError("");
        setSubmitStatus({ loading: true, success: false, error: "" });

        const flatProjectFields = {};
        projectResults.forEach((project, index) => {
            const number = index + 1;
            flatProjectFields[`project_${number}_type`] = project.label;
            flatProjectFields[`project_${number}_size_m2`] = project.size;
            flatProjectFields[`project_${number}_spec`] = project.specLabel;
            flatProjectFields[`project_${number}_adjusted_price`] = Math.round(project.adjusted);
        });

        const payload = {
            ...lead,
            projectCount: projects.length,
            totalEstimateLow: Math.round(totals.low),
            totalEstimateHigh: Math.round(totals.high),
            ...flatProjectFields,
        };

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setShowResult(true);
                setSubmitStatus({ loading: false, success: true, error: "" });
            } else {
                throw new Error("Form submission failed.");
            }
        } catch (err) {
            setSubmitStatus({ loading: false, success: false, error: err.message });
        }
    }

    return (
        <section id="cost-calculator" style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "16px 14px 40px" : "20px 20px 60px" }}>
            <div style={{ background: "#ffffff", border: "1px solid #ddd", borderRadius: isMobile ? "18px" : "24px", padding: isMobile ? "18px" : "32px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#78716c", fontWeight: "700" }}>Cost Calculator</div>
                <h2 style={{ fontSize: isMobile ? "28px" : "38px", lineHeight: 1.15, marginTop: "10px" }}>Estimate your extension or loft cost</h2>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr", gap: "28px", marginTop: "28px", alignItems: "start" }}>

                    {/* LEFT COLUMN: INPUTS */}
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                            <div style={{ fontWeight: "700", fontSize: "15px" }}>1. Configure your project</div>
                            <button type="button" onClick={addProject} style={{ background: "#fff", border: "1px solid #d6d3d1", padding: "8px 12px", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}>+ Add Project</button>
                        </div>

                        {projects.map((project, index) => (
                            <div key={project.id} style={{ border: "1px solid #e7e5e4", borderRadius: "18px", padding: "20px", background: "#fafaf9", marginBottom: "16px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                                    <strong>Project {index + 1}</strong>
                                    {projects.length > 1 && <button onClick={() => removeProject(project.id)} style={{ background: "none", border: "none", color: "#b42318", fontWeight: "700", cursor: "pointer" }}>Remove</button>}
                                </div>

                                {/* DROPDOWN FOR SERVICE SELECTION */}
                                <div style={{ marginBottom: "20px" }}>
                                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>Service type</label>
                                    <div style={{ position: "relative" }}>
                                        <select
                                            value={project.type}
                                            onChange={(e) => updateProject(project.id, "type", e.target.value)}
                                            style={{ ...inputStyle, paddingRight: "40px", fontWeight: "600", color: "#1c1917" }}
                                        >
                                            {Object.entries(typeLabels).map(([key, label]) => (
                                                <option key={key} value={key}>{label}</option>
                                            ))}
                                        </select>
                                        <div style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#78716c" }}>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4l4 4 4-4" /></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* SIZE SLIDER */}
                                <div style={{ marginBottom: "20px" }}>
                                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>Approximate size: {project.size} m²</label>
                                    <input type="range" min="5" max="80" value={project.size} onChange={(e) => updateProject(project.id, "size", Number(e.target.value))} style={{ width: "100%" }} />
                                </div>

                                {/* SPECIFICATION LEVEL */}
                                <div>
                                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", marginBottom: "12px" }}>Finish level</label>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                                        {Object.entries(specLabels).map(([key, label]) => (
                                            <button key={key} type="button" onClick={() => updateProject(project.id, "spec", key)} style={pillButton(project.spec === key)}>{label}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <form onSubmit={handleSubmit} style={{ marginTop: "24px" }}>
                            <div style={{ fontWeight: "700", marginBottom: "12px" }}>2. Your contact details</div>
                            <div style={{ display: "grid", gap: "12px" }}>
                                <input name="name" type="text" placeholder="Your name" value={lead.name} onChange={handleLeadChange} style={inputStyle} />
                                <input name="email" type="email" placeholder="Email address" value={lead.email} onChange={handleLeadChange} style={inputStyle} />
                                <input name="phone" type="tel" placeholder="Phone number" value={lead.phone} onChange={handleLeadChange} style={inputStyle} />
                                {error && <div style={{ color: "#b42318", fontSize: "14px" }}>{error}</div>}
                                <button type="submit" disabled={submitStatus.loading} style={{ background: "#1c1917", color: "#fff", padding: "16px", border: "none", borderRadius: "12px", fontWeight: "700", cursor: "pointer", fontSize: "16px" }}>
                                    {submitStatus.loading ? "Calculating..." : "Get My Estimate"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: RESULTS */}
                    <div style={{ minWidth: 0 }}>
                        <div style={{ background: "#1c1917", color: "#fff", borderRadius: "24px", padding: "28px", height: "100%", position: isMobile ? "static" : "sticky", top: "24px", boxShadow: "0 10px 28px rgba(0,0,0,0.12)" }}>
                            <div style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#d6d3d1", fontWeight: "700" }}>Estimated Cost Range</div>

                            {showResult ? (
                                <>
                                    <div style={{ fontSize: isMobile ? "32px" : "40px", fontWeight: "700", marginTop: "12px" }}>
                                        £{Math.round(totals.low).toLocaleString()} – £{Math.round(totals.high).toLocaleString()}
                                    </div>
                                    <div style={{ marginTop: "20px", display: "grid", gap: "12px" }}>
                                        {projectResults.map((project, index) => (
                                            <div key={project.id} style={{ padding: "16px", borderRadius: "16px", background: "rgba(255,255,255,0.08)", fontSize: "14px" }}>
                                                <strong>{index + 1}. {project.label}</strong><br />
                                                {project.size} m² | {project.specLabel} Finish
                                            </div>
                                        ))}
                                    </div>
                                    <p style={{ marginTop: "20px", fontSize: "13px", color: "#d6d3d1", lineHeight: "1.6" }}>Note: This is a guide price. Final costs depend on site access, planning requirements, and structural complexity.</p>
                                    <a href="/contact" style={{ display: "block", marginTop: "20px", background: "#fff", color: "#1c1917", padding: "14px", borderRadius: "12px", textAlign: "center", fontWeight: "700", textDecoration: "none" }}>Book Free Survey</a>
                                </>
                            ) : (
                                <div style={{ marginTop: "20px", fontSize: "18px", color: "#d6d3d1", lineHeight: "1.5" }}>Complete the form to unlock your combined project estimate.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}