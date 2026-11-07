import { useEffect, useMemo, useState, useRef } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/xzdkevbg";

export default function DrivewayCalculator() {
    const [screenWidth, setScreenWidth] = useState(1200);
    const [showValuationModal, setShowValuationModal] = useState(false);
    const resultsRef = useRef(null);

    // User-friendly archetype states instead of raw sliders
    const [gardenSize, setGardenSize] = useState("medium"); // small, medium, large
    const [primarySurface, setPrimarySurface] = useState("porcelain"); // porcelain, block_paving, mixed
    const [addTurf, setAddTurf] = useState(false);
    const [hasSlope, setHasSlope] = useState(false);

    const [lead, setLead] = useState({
        name: "",
        email: "",
        phone: "",
        postcode: "",
        flowerBeds: false,
        steps: false,
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

    // Smart baseline multi-variant calculator matrix
    const calculatedEstimate = useMemo(() => {
        let basePrice = 0;
        let areaMultiplier = 1;
        let description = "";

        // 1. Evaluate Garden Size Archetype
        if (gardenSize === "small") {
            basePrice += 2200;
            areaMultiplier = 25;
            description = "Urban Courtyard / Small Driveway Scope (~25m²)";
        } else if (gardenSize === "medium") {
            basePrice += 4800;
            areaMultiplier = 55;
            description = "Suburban Garden / Generous Family Driveway (~55m²)";
        } else {
            basePrice += 9500;
            areaMultiplier = 110;
            description = "Detached Estate Layout / Multi-Car Carriage Drive (~110m²)";
        }

        // 2. Adjust for primary finish material configurations
        if (primarySurface === "porcelain") basePrice += areaMultiplier * 105;
        if (primarySurface === "block_paving") basePrice += areaMultiplier * 85;
        if (primarySurface === "mixed") basePrice += areaMultiplier * 95;

        // 3. Conditional Feature Buffers
        if (addTurf) basePrice += areaMultiplier * 25;
        if (hasSlope) basePrice += 1800; // Structural masonry/retaining wall installation factor
        if (lead.flowerBeds) basePrice += 650;
        if (lead.steps) basePrice += 800;

        const grandTotalLower = Math.round(basePrice * 0.9);
        const grandTotalUpper = Math.round(basePrice * 1.1);
        const estimatedAddedValue = Math.round(grandTotalUpper * 1.25);

        return {
            range: `£${grandTotalLower.toLocaleString()} - £${grandTotalUpper.toLocaleString()}`,
            description,
            estimatedAddedValue
        };
    }, [gardenSize, primarySurface, addTurf, hasSlope, lead.flowerBeds, lead.steps]);

    const scrollToResults = () => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitStatus({ loading: true, success: false });
        
        setShowResult(true);
        if (isMobile) setTimeout(scrollToResults, 300);

        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ 
                    ...lead, 
                    configuration: { gardenSize, primarySurface, addTurf, hasSlope },
                    estimatedRange: calculatedEstimate.range,
                    scopeDetails: calculatedEstimate.description 
                }),
            });
            setSubmitStatus({ loading: false, success: res.ok });
        } catch (err) {
            setSubmitStatus({ loading: false, success: false });
        }
    }

    const inputStyle = {
        width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid #d6d3d1",
        fontSize: "16px", boxSizing: "border-box", backgroundColor: "#ffffff", marginBottom: "12px",
        outline: "none"
    };

    const tileStyle = (active) => ({
        padding: "16px",
        borderRadius: "14px",
        border: active ? "2px solid #1c1917" : "1px solid #d6d3d1",
        background: active ? "#1c1917" : "#fff",
        color: active ? "#fff" : "#1c1917",
        fontWeight: "700",
        fontSize: "14px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s"
    });

    const IncludedItem = ({ label }) => (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px", color: "#A67C00", fontWeight: "600" }}>
            <span>{label}:</span>
            <span style={{ filter: showResult ? "none" : "blur(6px)", transition: "0.6s" }}>INCLUDED</span>
        </div>
    );

    return (
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "10px" : "20px", color: "#1c1917", fontFamily: "sans-serif" }}>
            
            {showValuationModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div style={{ background: 'white', padding: '30px', borderRadius: '24px', maxWidth: '500px', width: '100%', position: 'relative' }}>
                        <button onClick={() => setShowValuationModal(false)} style={{ position: 'absolute', right: '20px', top: '20px', border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
                        <h3 style={{ color: '#A67C00', marginBottom: '15px' }}>Curb Appeal Value Returns</h3>
                        <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444' }}>
                            According to real estate data trackers, premium porcelain transformations and integrated driveways offer an exceptional yield multiplication ceiling, adding immediate value to residential properties.
                        </p>
                        <div style={{ background: '#fafaf9', padding: '20px', borderRadius: '16px', border: '1px solid #e7e5e4', margin: '20px 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>Configured Scale:</span>
                                <strong>{calculatedEstimate.description}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Est. Baseline Value Addition:</span>
                                <strong style={{ color: '#16a34a' }}>+ £{calculatedEstimate.estimatedAddedValue.toLocaleString()}</strong>
                            </div>
                        </div>
                        <p style={{ fontSize: '12px', color: '#78716c' }}>*Disclaimer: Regional returns depend significantly on localized location baselines and finish tolerances.</p>
                    </div>
                </div>
            )}

            <div style={{ background: "#ffffff", border: "1px solid #e7e5e4", borderRadius: "24px", padding: isMobile ? "16px" : "32px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr", gap: "32px" }}>

                    {/* Step Configuration Dashboard */}
                    <div>
                        <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "12px" }}>1. Estimate Your Garden / Driveway Scale</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "24px" }}>
                            <button type="button" onClick={() => setGardenSize("small")} style={tileStyle(gardenSize === "small")}>Small<br/><span style={{ fontSize: '11px', fontWeight: '400', opacity: 0.8 }}>Courtyard</span></button>
                            <button type="button" onClick={() => setGardenSize("medium")} style={tileStyle(gardenSize === "medium")}>Medium<br/><span style={{ fontSize: '11px', fontWeight: '400', opacity: 0.8 }}>Suburban</span></button>
                            <button type="button" onClick={() => setGardenSize("large")} style={tileStyle(gardenSize === "large")}>Large<br/><span style={{ fontSize: '11px', fontWeight: '400', opacity: 0.8 }}>Estate</span></button>
                        </div>

                        <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "12px" }}>2. Select Primary Paving Material Priority</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px", marginBottom: "24px" }}>
                            <button type="button" onClick={() => setPrimarySurface("porcelain")} style={tileStyle(primarySurface === "porcelain")}>✨ Vitrified Porcelain Slabs (Modern Terrace Style)</button>
                            <button type="button" onClick={() => setPrimarySurface("block_paving")} style={tileStyle(primarySurface === "block_paving")}>🚜 Interlocking Block Paving (Heavy-Duty Driveway Style)</button>
                            <button type="button" onClick={() => setPrimarySurface("mixed")} style={tileStyle(primarySurface === "mixed")}>🏡 Mixed Media Configuration (Patios & Pathways Combined)</button>
                        </div>

                        <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "12px" }}>3. Outline Ground Conditions & Custom Details</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
                            <button type="button" onClick={() => setAddTurf(!addTurf)} style={tileStyle(addTurf)}>🌿 Include Luxury Artificial Lawn</button>
                            <button type="button" onClick={() => setHasSlope(!hasSlope)} style={tileStyle(hasSlope)}>📐 Ground Sloped / Needs Retaining Walls</button>
                            <button type="button" onClick={() => setLead({...lead, flowerBeds: !lead.flowerBeds})} style={tileStyle(lead.flowerBeds)}>🌸 Raised Brick Flower Beds</button>
                            <button type="button" onClick={() => setLead({...lead, steps: !lead.steps})} style={tileStyle(lead.steps)}>🧱 Integrated Masonry Steps</button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ borderTop: "2px solid #f5f5f4", paddingTop: "20px" }}>
                            <input placeholder="Your Name" onChange={(e) => setLead({ ...lead, name: e.target.value })} style={inputStyle} required />
                            <input placeholder="Email Address" type="email" onChange={(e) => setLead({ ...lead, email: e.target.value })} style={inputStyle} required />
                            <input placeholder="Post Code" onChange={(e) => setLead({ ...lead, postcode: e.target.value })} style={inputStyle} required />
                            <input placeholder="Phone Number" type="tel" onChange={(e) => setLead({ ...lead, phone: e.target.value })} style={inputStyle} required />
                            <button type="submit" disabled={submitStatus.loading} style={{ width: "100%", background: "#1c1917", color: "#fff", padding: "20px", borderRadius: "14px", fontWeight: "800", border: "none", cursor: submitStatus.loading ? "not-allowed" : "pointer", fontSize: "17px" }}>
                                {submitStatus.loading ? "Generating Roadmap..." : "Reveal My Budget Assessment"}
                            </button>
                        </form>
                    </div>

                    {/* Interactive Real-Time Evaluation Dashboard Output */}
                    <div ref={resultsRef}>
                        <div style={{ background: "#1c1917", color: "#fff", borderRadius: "24px", padding: isMobile ? "24px" : "35px", height: "100%", position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            
                            <div>
                                <div style={{ marginBottom: '25px', background: 'rgba(255,255,255,0.04)', padding: '18px', borderRadius: '18px', border: '1px dashed rgba(166, 124, 0, 0.4)' }}>
                                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#A67C00', fontWeight: '800' }}>Property Equity Growth Direction</div>
                                    <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '5px', color: '#A67C00', filter: showResult ? 'none' : 'blur(10px)' }}>
                                        + £{calculatedEstimate.estimatedAddedValue.toLocaleString()}
                                    </div>
                                    <button onClick={() => setShowValuationModal(true)} style={{ background: 'none', border: 'none', color: '#a8a29e', fontSize: '12px', textDecoration: 'underline', padding: '5px 0', cursor: 'pointer' }}>How is this calculation verified?</button>
                                </div>

                                <div style={{ fontSize: "12px", textTransform: "uppercase", color: "#a8a29e" }}>Configured Investment Range Alignment</div>
                                <div style={{ fontSize: isMobile ? "32px" : "40px", fontWeight: "900", marginTop: "12px", filter: showResult ? "none" : "blur(16px)" }}>
                                    {calculatedEstimate.range}
                                </div>
                                <div style={{ fontSize: "13px", color: "#A67C00", fontWeight: "600", marginTop: "4px" }}>
                                    Scope: {calculatedEstimate.description}
                                </div>

                                <div style={{ marginTop: "30px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                    <div style={{ fontWeight: "800", marginBottom: "20px", color: "#A67C00", fontSize: "14px" }}>TURNKEY SPECIFICATION ANCHORS:</div>
                                    
                                    <IncludedItem label="5-Year Structural Workmanship Guarantee" />
                                    <IncludedItem label="Bulk Ground Machinery Excavation & Clearances" />
                                    <IncludedItem label="Heavy Sub-Base Compaction Layering" />
                                    <IncludedItem label="SuDS Legal Drainage Run-off Compliance Check" />
                                    <IncludedItem label="Commercial Disposal & Eco-Waste Clearance" />
                                    
                                    <div style={{ display: 'grid', gap: '8px', marginTop: '16px', fontSize: '13px', color: '#a8a29e' }}>
                                        <div>• Chosen Paving Matrix: <span style={{ color: '#fff', fontWeight: '600' }}>{primarySurface.replace('_', ' ').toUpperCase()}</span></div>
                                        <div>• Turf Layout Vector: <span style={{ color: '#fff', fontWeight: '600' }}>{addTurf ? "LUXURY ARTIFICIAL GRASS LAYER" : "NONE SELECTED"}</span></div>
                                        <div>• Gradient Profile Correction: <span style={{ color: '#fff', fontWeight: '600' }}>{hasSlope ? "STRUCTURAL RETAINING ENGINEERING" : "STANDARD LEVEL FIELD"}</span></div>
                                    </div>
                                </div>
                            </div>

                            {showResult && (
                                <div style={{ marginTop: "30px", paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ background: "rgba(166, 124, 0, 0.15)", padding: "18px", borderRadius: "14px", fontSize: "13px", lineHeight: "1.6", borderLeft: "4px solid #A67C00", marginBottom: "25px", color: '#fff' }}>
                                        <strong>Pro Tip:</strong> On-site level checks optimize base gradients to preserve existing sub-structures, frequently <strong>saving £1,200–£3,500</strong>.
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        <a href="https://calendar.app.google/NBBKg6BiESkgfsJ5A" target="_blank" rel="noopener noreferrer" style={{ background: "#A67C00", color: "#fff", padding: "18px", borderRadius: "12px", textDecoration: "none", fontWeight: "800", textAlign: "center" }}>📅 Book On-Site Design Survey</a>
                                        <a href="https://calendar.app.google/khdhBvuq446KCp1V9" target="_blank" rel="noopener noreferrer" style={{ background: "transparent", border: "2px solid #fff", color: "#fff", padding: "18px", borderRadius: "12px", textDecoration: "none", fontWeight: "800", textAlign: "center" }}>🏢 Consult at Rainham Office Workspace</a>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}