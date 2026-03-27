import { useEffect, useMemo, useState } from "react";

export default function ExtensionCalculator() {
    const [type, setType] = useState("rear");
    const [size, setSize] = useState(20);
    const [spec, setSpec] = useState("standard");
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [lead, setLead] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [showResult, setShowResult] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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

    const { low, high } = useMemo(() => {
        const basePrice = baseRates[type] * size;
        const adjusted = basePrice * specMultiplier[spec];

        return {
            low: adjusted * 0.85,
            high: adjusted * 1.15,
        };
    }, [type, size, spec]);

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
    };

    function handleLeadChange(e) {
        const { name, value } = e.target;
        setLead((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!lead.name.trim() || !lead.email.trim() || !lead.phone.trim()) {
            setError("Please complete your name, email, and phone number.");
            return;
        }

        setError("");
        setShowResult(true);

        console.log("Lead captured:", {
            ...lead,
            extensionType: typeLabels[type],
            size,
            spec: specLabels[spec],
            estimateLow: Math.round(low),
            estimateHigh: Math.round(high),
        });
    }

    return (
        <section
            style={{
                maxWidth: "1100px",
                margin: "0 auto",
                padding: isMobile ? "16px 14px 40px" : "20px 20px 60px",
            }}
        >
            <div
                style={{
                    background: "#ffffff",
                    border: "1px solid #ddd",
                    borderRadius: isMobile ? "18px" : "24px",
                    padding: isMobile ? "18px" : isTablet ? "24px" : "32px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                }}
            >
                <div
                    style={{
                        fontSize: "12px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "#78716c",
                        fontWeight: "700",
                    }}
                >
                    Cost Calculator
                </div>

                <h2
                    style={{
                        fontSize: isMobile ? "28px" : "clamp(28px, 4vw, 38px)",
                        lineHeight: 1.15,
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                >
                    Estimate your extension or loft conversion cost
                </h2>

                <p
                    style={{
                        color: "#57534e",
                        lineHeight: "1.8",
                        maxWidth: "700px",
                        marginTop: 0,
                        fontSize: isMobile ? "15px" : "16px",
                    }}
                >
                    Use this quick calculator to get a rough guide price for your project
                    in London based on type, size, and finish level.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
                        gap: isMobile ? "20px" : "28px",
                        marginTop: "28px",
                        alignItems: "start",
                    }}
                >
                    <div style={{ minWidth: 0 }}>
                        <div style={{ marginBottom: "24px" }}>
                            <div
                                style={{
                                    fontWeight: "700",
                                    marginBottom: "12px",
                                    fontSize: "15px",
                                }}
                            >
                                1. Choose project type
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: isMobile
                                        ? "1fr"
                                        : "repeat(auto-fit, minmax(160px, 1fr))",
                                    gap: "10px",
                                }}
                            >
                                {Object.entries(typeLabels).map(([key, label]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setType(key)}
                                        style={pillButton(type === key)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <div
                                style={{
                                    fontWeight: "700",
                                    marginBottom: "12px",
                                    fontSize: "15px",
                                }}
                            >
                                2. Select approximate size
                            </div>

                            <div
                                style={{
                                    background: "#f7f5f2",
                                    border: "1px solid #e7e5e4",
                                    borderRadius: "18px",
                                    padding: isMobile ? "16px" : "18px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: isMobile ? "24px" : "28px",
                                        fontWeight: "700",
                                        marginBottom: "8px",
                                    }}
                                >
                                    {size} m²
                                </div>

                                <input
                                    type="range"
                                    min="5"
                                    max="80"
                                    step="1"
                                    value={size}
                                    onChange={(e) => setSize(Number(e.target.value))}
                                    style={{ width: "100%" }}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "13px",
                                        color: "#78716c",
                                        marginTop: "6px",
                                    }}
                                >
                                    <span>5 m²</span>
                                    <span>80 m²</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: "28px" }}>
                            <div
                                style={{
                                    fontWeight: "700",
                                    marginBottom: "12px",
                                    fontSize: "15px",
                                }}
                            >
                                3. Choose finish level
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: isMobile
                                        ? "1fr"
                                        : "repeat(auto-fit, minmax(140px, 1fr))",
                                    gap: "10px",
                                }}
                            >
                                {Object.entries(specLabels).map(([key, label]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setSpec(key)}
                                        style={pillButton(spec === key)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div
                                style={{
                                    fontWeight: "700",
                                    marginBottom: "12px",
                                    fontSize: "15px",
                                }}
                            >
                                4. Enter your details to view your estimate
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gap: "12px",
                                }}
                            >
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={lead.name}
                                    onChange={handleLeadChange}
                                    style={inputStyle}
                                />

                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email address"
                                    value={lead.email}
                                    onChange={handleLeadChange}
                                    style={inputStyle}
                                />

                                <input
                                    name="phone"
                                    type="tel"
                                    placeholder="Phone number"
                                    value={lead.phone}
                                    onChange={handleLeadChange}
                                    style={inputStyle}
                                />

                                {error ? (
                                    <div
                                        style={{
                                            color: "#b42318",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {error}
                                    </div>
                                ) : null}

                                <button
                                    type="submit"
                                    style={{
                                        background: "#1c1917",
                                        color: "#fff",
                                        padding: isMobile ? "15px 18px" : "14px 20px",
                                        border: "none",
                                        borderRadius: "12px",
                                        fontWeight: "700",
                                        cursor: "pointer",
                                        fontSize: "15px",
                                        width: "100%",
                                    }}
                                >
                                    Show my estimate
                                </button>
                            </div>
                        </form>
                    </div>

                    <div style={{ minWidth: 0 }}>
                        <div
                            style={{
                                background: "#1c1917",
                                color: "#fff",
                                borderRadius: isMobile ? "18px" : "24px",
                                padding: isMobile ? "22px" : "28px",
                                height: "100%",
                                boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
                                position: isMobile ? "static" : "sticky",
                                top: "24px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "12px",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    color: "#d6d3d1",
                                    fontWeight: "700",
                                }}
                            >
                                Estimated Cost Range
                            </div>

                            {showResult ? (
                                <>
                                    <div
                                        style={{
                                            fontSize: isMobile ? "30px" : "clamp(28px, 4vw, 40px)",
                                            fontWeight: "700",
                                            marginTop: "12px",
                                            lineHeight: 1.15,
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        £{Math.round(low).toLocaleString()} – £
                                        {Math.round(high).toLocaleString()}
                                    </div>

                                    <div
                                        style={{
                                            marginTop: "20px",
                                            padding: "16px",
                                            borderRadius: "16px",
                                            background: "rgba(255,255,255,0.08)",
                                            color: "#f5f5f4",
                                            lineHeight: "1.8",
                                            fontSize: "14px",
                                        }}
                                    >
                                        <div>
                                            <strong>Project:</strong> {typeLabels[type]}
                                        </div>
                                        <div>
                                            <strong>Size:</strong> {size} m²
                                        </div>
                                        <div>
                                            <strong>Finish:</strong> {specLabels[spec]}
                                        </div>
                                    </div>

                                    <p
                                        style={{
                                            marginTop: "18px",
                                            fontSize: "13px",
                                            color: "#d6d3d1",
                                            lineHeight: "1.7",
                                        }}
                                    >
                                        Guide price only. Final costs depend on design, structure,
                                        access, specification, and site conditions.
                                    </p>

                                    <a
                                        href="/contact"
                                        style={{
                                            display: "inline-block",
                                            marginTop: "12px",
                                            background: "#fff",
                                            color: "#1c1917",
                                            padding: "12px 18px",
                                            borderRadius: "12px",
                                            textDecoration: "none",
                                            fontWeight: "700",
                                            width: isMobile ? "100%" : "auto",
                                            textAlign: "center",
                                            boxSizing: "border-box",
                                        }}
                                    >
                                        Request a tailored quote
                                    </a>
                                </>
                            ) : (
                                <>
                                    <div
                                        style={{
                                            marginTop: "14px",
                                            fontSize: isMobile ? "22px" : "20px",
                                            fontWeight: "700",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        Enter your details to unlock your guide price
                                    </div>

                                    <div
                                        style={{
                                            marginTop: "20px",
                                            padding: "16px",
                                            borderRadius: "16px",
                                            background: "rgba(255,255,255,0.08)",
                                            color: "#f5f5f4",
                                            lineHeight: "1.8",
                                            fontSize: "14px",
                                        }}
                                    >
                                        <div>
                                            <strong>Project:</strong> {typeLabels[type]}
                                        </div>
                                        <div>
                                            <strong>Size:</strong> {size} m²
                                        </div>
                                        <div>
                                            <strong>Finish:</strong> {specLabels[spec]}
                                        </div>
                                    </div>

                                    <p
                                        style={{
                                            marginTop: "18px",
                                            fontSize: "13px",
                                            color: "#d6d3d1",
                                            lineHeight: "1.7",
                                        }}
                                    >
                                        We’ll use your details to follow up with a more tailored
                                        estimate if needed.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}