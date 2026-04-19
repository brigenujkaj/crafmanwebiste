import { useEffect, useMemo, useState, useRef } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/xzdkevbg";

export default function ExtensionCalculator() {
    const [size, setSize] = useState(18); 
    const [screenWidth, setScreenWidth] = useState(1200);
    const [showValuationModal, setShowValuationModal] = useState(false);
    const resultsRef = useRef(null);

    const [lead, setLead] = useState({
        name: "",
        email: "",
        phone: "",
        postcode: "", // Fixed property name
        addKitchen: false,
        addBathroom: false,
        addFlooring: false,
        addSkylights: false,
        doorType: "standard"
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

    const baseRates = {
        shell: 1800,
        kitchenInstall: 3200,
        bathroomInstall: 5700,
        flooringInstallPerSqm: 30,
        skylightInstall: 300,
        standardDoor: 300,
        standardDoorWindow: 500,
        bifoldDoor: 700,
        addedValuePerSqm: 1500 
    };

    const totals = useMemo(() => {
        const shellCost = size * baseRates.shell;
        const kitchenCost = lead.addKitchen ? baseRates.kitchenInstall : 0;
        const bathroomCost = lead.addBathroom ? baseRates.bathroomInstall : 0;
        const flooringCost = lead.addFlooring ? (size * baseRates.flooringInstallPerSqm) : 0;
        const skylightCost = lead.addSkylights ? baseRates.skylightInstall : 0;
        
        let doorCost = baseRates.standardDoor;
        if (lead.doorType === "bifold") doorCost = baseRates.bifoldDoor;
        if (lead.doorType === "standard_window") doorCost = baseRates.standardDoorWindow;

        const grandTotal = shellCost + kitchenCost + bathroomCost + flooringCost + skylightCost + doorCost;
        const estimatedAddedValue = size * baseRates.addedValuePerSqm;

        return {
            shell: shellCost,
            kitchenCost,
            bathroomCost,
            flooringCost,
            skylightCost,
            doorCost,
            grandTotal,
            estimatedAddedValue
        };
    }, [size, lead, baseRates]);

    const scrollToResults = () => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitStatus({ loading: true, success: false });
        
        // REVEAL INSTANTLY so user doesn't wait for the server
        setShowResult(true);
        if (isMobile) setTimeout(scrollToResults, 300);

        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ ...lead, totals, size }),
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

    const getDoorLabel = () => {
        if (lead.doorType === "bifold") return "Bifolds / Sliders";
        if (lead.doorType === "standard_window") return "Standard Door + Window";
        return "Standard External Door";
    };

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
                        <h3 style={{ color: '#A67C00', marginBottom: '15px' }}>Equity Calculation</h3>
                        <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444' }}>
                            Based on local market trends, habitable space is valued at an average baseline of <strong>£1,500 per sqm</strong>.
                        </p>
                        <div style={{ background: '#fafaf9', padding: '20px', borderRadius: '16px', border: '1px solid #e7e5e4', margin: '20px 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>Planned Area:</span>
                                <strong>{size}m²</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Est. Value Increase:</span>
                                <strong style={{ color: '#16a34a' }}>+ £{totals.estimatedAddedValue.toLocaleString()}</strong>
                            </div>
                        </div>
                        <p style={{ fontSize: '12px', color: '#78716c' }}>*Disclaimer: We are designers and builders, not RICS surveyors. Values fluctuate based on location and finish.</p>
                    </div>
                </div>
            )}

            <div style={{ background: "#ffffff", border: "1px solid #e7e5e4", borderRadius: "24px", padding: isMobile ? "16px" : "32px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr", gap: "32px" }}>

                    <div>
                        <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "20px" }}>1. Build Size (sqm)</h3>
                        <div style={{ background: "#fafaf9", padding: "24px", borderRadius: "16px", marginBottom: "24px", textAlign: "center" }}>
                            <div style={{ fontSize: "36px", fontWeight: "900", color: "#A67C00", marginBottom: "15px" }}>{size} m²</div>
                            <input type="range" min="10" max="60" step="1" value={size} onChange={(e) => setSize(Number(e.target.value))} className="square-slider" style={{ width: "100%", height: "12px", background: "#d6d3d1", outline: "none", cursor: "pointer", WebkitAppearance: "none" }} />
                        </div>

                        <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "15px" }}>2. Project Options</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                            <button type="button" onClick={() => setLead({...lead, addKitchen: !lead.addKitchen})} style={{ padding: "14px", borderRadius: "12px", border: lead.addKitchen ? "2px solid #1c1917" : "1px solid #d6d3d1", background: lead.addKitchen ? "#1c1917" : "#fff", color: lead.addKitchen ? "#fff" : "#1c1917", fontWeight: "700", cursor: "pointer" }}>Kitchen Install</button>
                            <button type="button" onClick={() => setLead({...lead, addBathroom: !lead.addBathroom})} style={{ padding: "14px", borderRadius: "12px", border: lead.addBathroom ? "2px solid #1c1917" : "1px solid #d6d3d1", background: lead.addBathroom ? "#1c1917" : "#fff", color: lead.addBathroom ? "#fff" : "#1c1917", fontWeight: "700", cursor: "pointer" }}>Bathroom Install</button>
                            <button type="button" onClick={() => setLead({...lead, addSkylights: !lead.addSkylights})} style={{ padding: "14px", borderRadius: "12px", border: lead.addSkylights ? "2px solid #1c1917" : "1px solid #d6d3d1", background: lead.addSkylights ? "#1c1917" : "#fff", color: lead.addSkylights ? "#fff" : "#1c1917", fontWeight: "700", cursor: "pointer" }}>Skylights</button>
                            <button type="button" onClick={() => setLead({...lead, addFlooring: !lead.addFlooring})} style={{ padding: "14px", borderRadius: "12px", border: lead.addFlooring ? "2px solid #1c1917" : "1px solid #d6d3d1", background: lead.addFlooring ? "#1c1917" : "#fff", color: lead.addFlooring ? "#fff" : "#1c1917", fontWeight: "700", cursor: "pointer" }}>Flooring Install</button>
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <label style={{ fontSize: "12px", fontWeight: "700", color: "#78716c", marginBottom: "12px", display: "block" }}>EXTERNAL DOORS</label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {["standard", "standard_window", "bifold"].map((type) => (
                                    <button key={type} type="button" onClick={() => setLead({...lead, doorType: type})} style={{ padding: "12px", borderRadius: "10px", border: lead.doorType === type ? "2px solid #1c1917" : "1px solid #d6d3d1", background: lead.doorType === type ? "#1c1917" : "#fff", color: lead.doorType === type ? "#fff" : "#1c1917", fontWeight: "600", cursor: "pointer", textAlign: "left" }}>
                                        {type === "standard" ? "Standard Doors" : type === "standard_window" ? "Standard Door + Window" : "Bifolds / Sliders"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} style={{ borderTop: "2px solid #f5f5f4", paddingTop: "20px" }}>
                            <input placeholder="Your Name" onChange={(e) => setLead({ ...lead, name: e.target.value })} style={inputStyle} required />
                            <input placeholder="Email Address" type="email" onChange={(e) => setLead({ ...lead, email: e.target.value })} style={inputStyle} required />
                            <input placeholder="Post Code" onChange={(e) => setLead({ ...lead, postcode: e.target.value })} style={inputStyle} required />
                            <input placeholder="Phone Number" type="tel" onChange={(e) => setLead({ ...lead, phone: e.target.value })} style={inputStyle} required />
                            <button type="submit" disabled={submitStatus.loading} style={{ width: "100%", background: "#1c1917", color: "#fff", padding: "20px", borderRadius: "14px", fontWeight: "800", border: "none", cursor: submitStatus.loading ? "not-allowed" : "pointer", fontSize: "17px" }}>
                                {submitStatus.loading ? "Calculating..." : "Reveal My Full Estimate"}
                            </button>
                        </form>
                    </div>

                    <div ref={resultsRef}>
                        <div style={{ background: "#1c1917", color: "#fff", borderRadius: "24px", padding: isMobile ? "24px" : "35px", height: "100%", position: 'relative' }}>
                            
                            <div style={{ marginBottom: '25px', background: 'rgba(255,255,255,0.04)', padding: '18px', borderRadius: '18px', border: '1px dashed rgba(166, 124, 0, 0.4)' }}>
                                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#A67C00', fontWeight: '800' }}>Property Equity Growth</div>
                                <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '5px', color: '#A67C00', filter: showResult ? 'none' : 'blur(10px)' }}>
                                    + £{totals.estimatedAddedValue.toLocaleString()}
                                </div>
                                <button onClick={() => setShowValuationModal(true)} style={{ background: 'none', border: 'none', color: '#a8a29e', fontSize: '12px', textDecoration: 'underline', padding: '5px 0', cursor: 'pointer' }}>How is this calculated?</button>
                            </div>

                            <div style={{ fontSize: "12px", textTransform: "uppercase", color: "#a8a29e" }}>Turnkey Investment</div>
                            <div style={{ fontSize: isMobile ? "40px" : "52px", fontWeight: "900", marginTop: "12px", filter: showResult ? "none" : "blur(16px)" }}>
                                FROM £{Math.round(totals.grandTotal).toLocaleString()}
                            </div>

                            <div style={{ marginTop: "30px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                <div style={{ fontWeight: "800", marginBottom: "20px", color: "#A67C00", fontSize: "14px" }}>ITEMIZED BREAKDOWN:</div>
                                
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", fontSize: "15px" }}>
                                    <span>Base Build Shell ({size}m²):</span>
                                    <span style={{ filter: showResult ? "none" : "blur(8px)" }}>£{totals.shell.toLocaleString()}</span>
                                </div>

                                <IncludedItem label="15-Year Guarantee" />
                                <IncludedItem label="Architectural Drawings" />
                                <IncludedItem label="External Rendering" />
                                <IncludedItem label="Electrical & Plumbing" />
                                <IncludedItem label="Painting & Skirting" />

                                <div style={{ display: "flex", justifyContent: "space-between", margin: "14px 0", fontSize: "15px", color: "#d6d3d1" }}>
                                    <span>{getDoorLabel()}:</span>
                                    <span style={{ filter: showResult ? "none" : "blur(8px)" }}>£{totals.doorCost.toLocaleString()}</span>
                                </div>

                                {lead.addSkylights && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", fontSize: "15px", color: "#d6d3d1" }}><span>Skylights:</span><span>£{totals.skylightCost.toLocaleString()}</span></div>}
                                {lead.addKitchen && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", fontSize: "15px", color: "#d6d3d1" }}><span>Kitchen Install:</span><span>£{baseRates.kitchenInstall.toLocaleString()}</span></div>}
                                {lead.addBathroom && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", fontSize: "15px", color: "#d6d3d1" }}><span>Bathroom Install:</span><span>£{baseRates.bathroomInstall.toLocaleString()}</span></div>}
                                {lead.addFlooring && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", fontSize: "15px", color: "#d6d3d1" }}><span>Flooring Install:</span><span>£{totals.flooringCost.toLocaleString()}</span></div>}

                                {showResult && (
                                    <div style={{ marginTop: "30px" }}>
                                        <div style={{ background: "rgba(166, 124, 0, 0.15)", padding: "18px", borderRadius: "14px", fontSize: "13px", lineHeight: "1.6", borderLeft: "4px solid #A67C00", marginBottom: "25px" }}>
                                            <strong>Pro Tip:</strong> Free meetings often identify layout optimizations that <strong>save £3,000–£5,000</strong>.
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                            <a href="https://calendar.app.google/NBBKg6BiESkgfsJ5A" target="_blank" rel="noopener noreferrer" style={{ background: "#A67C00", color: "#fff", padding: "18px", borderRadius: "12px", textDecoration: "none", fontWeight: "800", textAlign: "center" }}>📅 Book Free Concept Meeting</a>
                                            <a href="https://calendar.app.google/khdhBvuq446KCp1V9" target="_blank" rel="noopener noreferrer" style={{ background: "transparent", border: "2px solid #fff", color: "#fff", padding: "18px", borderRadius: "12px", textDecoration: "none", fontWeight: "800", textAlign: "center" }}>🏢 Meet at Rainham Office</a>
                                            <a href="https://www.crafman.co.uk/case-studies" target="_blank" rel="noopener noreferrer" style={{ background: "transparent", border: "2px solid #fff", color: "#fff", padding: "18px", borderRadius: "12px", textDecoration: "none", fontWeight: "800", textAlign: "center" }}>VIEW CASE STUDIES</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .square-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 30px; height: 30px; background: #1c1917; border: 3px solid #A67C00; cursor: pointer; border-radius: 4px; }
                .square-slider::-moz-range-thumb { width: 30px; height: 30px; background: #1c1917; border: 3px solid #A67C00; cursor: pointer; border-radius: 4px; }
            `}</style>
        </section>
    );
}