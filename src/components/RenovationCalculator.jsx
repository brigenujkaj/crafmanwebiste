import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export default function RenovationCalculator() {
    const [projectType, setProjectType] = useState("light");
    const [size, setSize] = useState(60);
    const [spec, setSpec] = useState("standard");

    const [bathroomSpec, setBathroomSpec] = useState("standard");

    const [kitchenLength, setKitchenLength] = useState(4);
    const [kitchenDesign, setKitchenDesign] = useState("standard");
    const [addElectrics, setAddElectrics] = useState(false);
    const [addPlumbing, setAddPlumbing] = useState(false);
    const [addBoiler, setAddBoiler] = useState(false);
    const [boilerType, setBoilerType] = useState("standard");
    const [addSplashback, setAddSplashback] = useState(false);
    const [surfaceType, setSurfaceType] = useState("none");
    const [surfaceSqm, setSurfaceSqm] = useState(10);
    const [tileSpec, setTileSpec] = useState("standard");

    const [lead, setLead] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [showResult, setShowResult] = useState(false);
    const [error, setError] = useState("");
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;

    const BOILER_COSTS = {
        standard: 1800,
        premium: 2800,
    };

    const TILE_SUPPLY_COSTS_PER_SQM = {
        standard: 25,
        mid: 45,
        high: 70,
    };

    const renovationRates = {
        light: {
            standard: 600,
            mid: 900,
            high: 1200,
        },
        backToBrick: {
            standard: 900,
            mid: 1300,
            high: 1500,
        },
    };

    const projectLabels = {
        light: "Light Renovation",
        backToBrick: "Full Strip-Out / Back-to-Brick",
        bathroom: "Bathroom Remodelling",
        kitchen: "Kitchen",
    };

    const projectDescriptions = {
        light:
            "A lighter renovation option focused on cosmetic improvements and general upgrades.",
        backToBrick:
            "A full strip-out / back-to-brick renovation including kitchen supply, bathroom supply, and design by our team.",
        bathroom:
            "Bathroom remodelling with fixed-price standard and medium options, plus bespoke POA.",
        kitchen:
            "Kitchen estimate based on total cabinet run length. Kitchen supply cost depends on design and is not included in this guide price.",
    };

    const specLabels = {
        standard: "Standard",
        mid: "Mid-Range",
        high: "High-End",
    };

    const bathroomLabels = {
        standard: "Standard (£6500)",
        medium: "Medium (£7900)",
        bespoke: "Fully Bespoke (POA)",
    };

    const kitchenDesignLabels = {
        standard: "Standard Design",
        mid: "Mid-Range Design",
        premium: "Premium Design",
    };

    const tileSpecLabels = {
        standard: "Standard Tile",
        mid: "Mid-Range Tile",
        high: "High-End Tile",
    };

    const result = useMemo(() => {
        let baseLow = 0;
        let baseHigh = 0;
        let isPOA = false;

        if (projectType === "light" || projectType === "backToBrick") {
            const rate = renovationRates[projectType][spec];
            const base = rate * size;
            baseLow = base * 0.9;
            baseHigh = base * 1.15;
        }

        if (projectType === "bathroom") {
            if (bathroomSpec === "standard") {
                baseLow = 6500;
                baseHigh = 6500;
            } else if (bathroomSpec === "medium") {
                baseLow = 7900;
                baseHigh = 7900;
            } else {
                isPOA = true;
            }
        }

        if (projectType === "kitchen") {
            const installationCost = Math.min(kitchenLength, 20) * 550;

            baseLow = installationCost * 0.9;
            baseHigh = installationCost * 1.15;

            let extras = 0;

            if (addElectrics) extras += 1200;
            if (addPlumbing) extras += 900;
            if (addSplashback) extras += 650;
            if (addBoiler) extras += 1400 + BOILER_COSTS[boilerType];

            if (surfaceType === "flooring") {
                extras += surfaceSqm * 80;
            }

            if (surfaceType === "tiling") {
                extras += surfaceSqm * 80;
                extras += surfaceSqm * TILE_SUPPLY_COSTS_PER_SQM[tileSpec];
            }

            baseLow += extras;
            baseHigh += extras;
        }

        return {
            low: Math.round(baseLow),
            high: Math.round(baseHigh),
            isPOA,
        };
    }, [
        projectType,
        spec,
        size,
        bathroomSpec,
        kitchenLength,
        addElectrics,
        addPlumbing,
        addBoiler,
        boilerType,
        addSplashback,
        surfaceType,
        surfaceSqm,
        tileSpec,
    ]);

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

        console.log("Renovation lead:", {
            ...lead,
            projectType,
            spec,
            size,
            bathroomSpec,
            kitchenLength,
            kitchenDesign,
            addElectrics,
            addPlumbing,
            addBoiler,
            boilerType,
            addSplashback,
            surfaceType,
            surfaceSqm,
            tileSpec,
            estimateLow: result.low,
            estimateHigh: result.high,
            isPOA: result.isPOA,
        });
    }

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
        textAlign: "left",
        width: "100%",
        minHeight: isMobile ? "54px" : "auto",
    });

    const inputStyle = {
        width: "100%",
        padding: isMobile ? "14px" : "14px",
        borderRadius: "12px",
        border: "1px solid #d6d3d1",
        fontSize: isMobile ? "16px" : "15px",
        boxSizing: "border-box",
        appearance: "none",
    };

    const checkboxWrap = {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: isMobile ? "14px" : "12px 14px",
        border: "1px solid #e7e5e4",
        borderRadius: "12px",
        background: "#fff",
    };

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
                    Renovation, Bathroom & Kitchen Cost Calculator
                </h2>

                <p
                    style={{
                        color: "#57534e",
                        lineHeight: "1.8",
                        maxWidth: "760px",
                        marginTop: 0,
                        fontSize: isMobile ? "15px" : "16px",
                    }}
                >
                    Use this calculator to get rough guide prices for renovation,
                    bathroom, and kitchen works in London. A lot depends on the state of
                    the house and how much work it requires, so these are rough prices
                    only.
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
                                        : "repeat(auto-fit, minmax(210px, 1fr))",
                                    gap: "10px",
                                }}
                            >
                                {Object.entries(projectLabels).map(([key, label]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => {
                                            setProjectType(key);
                                            setShowResult(false);
                                        }}
                                        style={pillButton(projectType === key)}
                                    >
                                        <div style={{ fontWeight: 700 }}>{label}</div>
                                        <div
                                            style={{
                                                fontSize: "13px",
                                                marginTop: "4px",
                                                opacity: projectType === key ? 0.9 : 0.7,
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {projectDescriptions[key]}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {(projectType === "light" || projectType === "backToBrick") && (
                            <>
                                <div style={{ marginBottom: "24px" }}>
                                    <div
                                        style={{
                                            fontWeight: "700",
                                            marginBottom: "12px",
                                            fontSize: "15px",
                                        }}
                                    >
                                        2. Select property size
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
                                            min="30"
                                            max="250"
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
                                            <span>30 m²</span>
                                            <span>250 m²</span>
                                        </div>
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
                            </>
                        )}

                        {projectType === "bathroom" && (
                            <div style={{ marginBottom: "24px" }}>
                                <div
                                    style={{
                                        fontWeight: "700",
                                        marginBottom: "12px",
                                        fontSize: "15px",
                                    }}
                                >
                                    2. Choose bathroom finish
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: isMobile
                                            ? "1fr"
                                            : "repeat(auto-fit, minmax(180px, 1fr))",
                                        gap: "10px",
                                    }}
                                >
                                    {Object.entries(bathroomLabels).map(([key, label]) => (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => setBathroomSpec(key)}
                                            style={pillButton(bathroomSpec === key)}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {projectType === "kitchen" && (
                            <>
                                <div style={{ marginBottom: "24px" }}>
                                    <div
                                        style={{
                                            fontWeight: "700",
                                            marginBottom: "12px",
                                            fontSize: "15px",
                                        }}
                                    >
                                        2. Total kitchen cabinet run length
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
                                            {kitchenLength} m
                                        </div>

                                        <input
                                            type="range"
                                            min="2"
                                            max="20"
                                            value={kitchenLength}
                                            onChange={(e) => setKitchenLength(Number(e.target.value))}
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
                                            <span>2 m</span>
                                            <span>20 m</span>
                                        </div>
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
                                        3. Kitchen design level
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
                                        {Object.entries(kitchenDesignLabels).map(([key, label]) => (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setKitchenDesign(key)}
                                                style={pillButton(kitchenDesign === key)}
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
                                        4. Optional kitchen extras
                                    </div>

                                    <div style={{ display: "grid", gap: "10px" }}>
                                        <label style={checkboxWrap}>
                                            <input
                                                type="checkbox"
                                                checked={addElectrics}
                                                onChange={(e) => setAddElectrics(e.target.checked)}
                                            />
                                            Add electrics
                                        </label>

                                        <label style={checkboxWrap}>
                                            <input
                                                type="checkbox"
                                                checked={addPlumbing}
                                                onChange={(e) => setAddPlumbing(e.target.checked)}
                                            />
                                            Add plumbing
                                        </label>

                                        <label style={checkboxWrap}>
                                            <input
                                                type="checkbox"
                                                checked={addSplashback}
                                                onChange={(e) => setAddSplashback(e.target.checked)}
                                            />
                                            Add splashback tiling
                                        </label>

                                        <div
                                            style={{
                                                ...checkboxWrap,
                                                flexDirection: "column",
                                                alignItems: "stretch",
                                            }}
                                        >
                                            <label
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={addBoiler}
                                                    onChange={(e) => setAddBoiler(e.target.checked)}
                                                />
                                                Add boiler change
                                            </label>

                                            {addBoiler && (
                                                <div
                                                    style={{
                                                        marginTop: "10px",
                                                        display: "grid",
                                                        gap: "10px",
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => setBoilerType("standard")}
                                                        style={pillButton(boilerType === "standard")}
                                                    >
                                                        Standard Boiler
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setBoilerType("premium")}
                                                        style={pillButton(boilerType === "premium")}
                                                    >
                                                        Premium Boiler
                                                    </button>
                                                </div>
                                            )}
                                        </div>
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
                                        5. Flooring or tiling
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
                                        <button
                                            type="button"
                                            onClick={() => setSurfaceType("none")}
                                            style={pillButton(surfaceType === "none")}
                                        >
                                            None
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSurfaceType("flooring")}
                                            style={pillButton(surfaceType === "flooring")}
                                        >
                                            Flooring
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSurfaceType("tiling")}
                                            style={pillButton(surfaceType === "tiling")}
                                        >
                                            Tiling
                                        </button>
                                    </div>

                                    {surfaceType !== "none" && (
                                        <div style={{ marginTop: "14px", display: "grid", gap: "12px" }}>
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
                                                    {surfaceSqm} m²
                                                </div>

                                                <input
                                                    type="range"
                                                    min="5"
                                                    max="100"
                                                    value={surfaceSqm}
                                                    onChange={(e) => setSurfaceSqm(Number(e.target.value))}
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
                                                    <span>100 m²</span>
                                                </div>
                                            </div>

                                            {surfaceType === "tiling" && (
                                                <div
                                                    style={{
                                                        display: "grid",
                                                        gridTemplateColumns: isMobile
                                                            ? "1fr"
                                                            : "repeat(auto-fit, minmax(140px, 1fr))",
                                                        gap: "10px",
                                                    }}
                                                >
                                                    {Object.entries(tileSpecLabels).map(([key, label]) => (
                                                        <button
                                                            key={key}
                                                            type="button"
                                                            onClick={() => setTileSpec(key)}
                                                            style={pillButton(tileSpec === key)}
                                                        >
                                                            {label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div
                                style={{
                                    fontWeight: "700",
                                    marginBottom: "12px",
                                    fontSize: "15px",
                                }}
                            >
                                Final step — enter your details
                            </div>

                            <div style={{ display: "grid", gap: "12px" }}>
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
                                    <div style={{ color: "#b42318", fontSize: "14px" }}>{error}</div>
                                ) : null}

                                <button
                                    type="submit"
                                    style={{
                                        background: "#1c1917",
                                        color: "#fff",
                                        padding: "14px 20px",
                                        border: "none",
                                        borderRadius: "12px",
                                        fontWeight: "700",
                                        cursor: "pointer",
                                        fontSize: "15px",
                                        width: "100%",
                                    }}
                                >
                                    Show Estimate
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
                                Estimated Total
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
                                        {result.isPOA
                                            ? "POA"
                                            : `£${result.low.toLocaleString()} – £${result.high.toLocaleString()}`}
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
                                            <strong>Project:</strong> {projectLabels[projectType]}
                                        </div>

                                        {(projectType === "light" || projectType === "backToBrick") && (
                                            <>
                                                <div>
                                                    <strong>Finish:</strong> {specLabels[spec]}
                                                </div>
                                                <div>
                                                    <strong>Size:</strong> {size} m²
                                                </div>
                                            </>
                                        )}

                                        {projectType === "bathroom" && (
                                            <div>
                                                <strong>Bathroom finish:</strong> {bathroomLabels[bathroomSpec]}
                                            </div>
                                        )}

                                        {projectType === "kitchen" && (
                                            <>
                                                <div>
                                                    <strong>Kitchen length:</strong> {kitchenLength} m
                                                </div>
                                                <div>
                                                    <strong>Kitchen design:</strong> {kitchenDesignLabels[kitchenDesign]}
                                                </div>
                                                {surfaceType !== "none" && (
                                                    <div>
                                                        <strong>Surface:</strong>{" "}
                                                        {surfaceType === "flooring" ? "Flooring" : "Tiling"} (
                                                        {surfaceSqm} m²)
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    <p
                                        style={{
                                            marginTop: "18px",
                                            fontSize: "13px",
                                            color: "#d6d3d1",
                                            lineHeight: "1.7",
                                        }}
                                    >
                                        {projectType === "kitchen"
                                            ? "Guide price based on installation and selected extras only. Kitchen supply cost depends on design and is not included in this estimate."
                                            : "These are rough prices only. A lot depends on the state of the house, how much work it requires, access, layout, specification, and site conditions."}
                                    </p>

                                    <Link
                                        to="/contact"
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
                                    </Link>
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
                                        Enter your details to unlock your rough total
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
                                            <strong>Project:</strong> {projectLabels[projectType]}
                                        </div>
                                        <div>
                                            <strong>Total only</strong>
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
                                        We only show the total guide price here based on the options
                                        selected.
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