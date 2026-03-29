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
    };

    function handleLeadChange(e) {
        const { name, value } = e.target;

        setLead((prev) => ({
            ...prev,
            [name]: value,
        }));

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
        setSubmitStatus({
            loading: true,
            success: false,
            error: "",
        });

        const flatProjectFields = {};
        projectResults.forEach((project, index) => {
            const number = index + 1;

            flatProjectFields[`project_${number}_type`] = project.label;
            flatProjectFields[`project_${number}_type_key`] = project.type;
            flatProjectFields[`project_${number}_size_m2`] = project.size;
            flatProjectFields[`project_${number}_spec`] = project.specLabel;
            flatProjectFields[`project_${number}_spec_key`] = project.spec;
            flatProjectFields[`project_${number}_base_rate_per_m2`] = project.baseRate;
            flatProjectFields[`project_${number}_spec_multiplier`] = project.multiplier;
            flatProjectFields[`project_${number}_base_price`] = Math.round(project.basePrice);
            flatProjectFields[`project_${number}_adjusted_price`] = Math.round(project.adjusted);
            flatProjectFields[`project_${number}_estimate_low`] = Math.round(project.low);
            flatProjectFields[`project_${number}_estimate_high`] = Math.round(project.high);
        });

        const payload = {
            name: lead.name,
            email: lead.email,
            phone: lead.phone,

            projectCount: projects.length,

            totalBasePrice: Math.round(totals.base),
            totalAdjustedPrice: Math.round(totals.adjusted),
            totalEstimateLow: Math.round(totals.low),
            totalEstimateHigh: Math.round(totals.high),

            projects: projectResults.map((project, index) => ({
                number: index + 1,
                type: project.label,
                typeKey: project.type,
                size: project.size,
                spec: project.specLabel,
                specKey: project.spec,
                baseRatePerM2: project.baseRate,
                specMultiplier: project.multiplier,
                basePrice: Math.round(project.basePrice),
                adjustedPrice: Math.round(project.adjusted),
                estimateLow: Math.round(project.low),
                estimateHigh: Math.round(project.high),
            })),

            projectsSummary: projectResults
                .map(
                    (project, index) =>
                        `${index + 1}. ${project.label} | ${project.size} m² | ${project.specLabel
                        } | Base £${Math.round(project.basePrice).toLocaleString()} | Adjusted £${Math.round(
                            project.adjusted
                        ).toLocaleString()} | Range £${Math.round(project.low).toLocaleString()} - £${Math.round(
                            project.high
                        ).toLocaleString()}`
                )
                .join("\n"),

            ...flatProjectFields,
        };

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.errors?.[0]?.message || "Something went wrong. Please try again."
                );
            }

            setShowResult(true);
            setSubmitStatus({
                loading: false,
                success: true,
                error: "",
            });

            console.log("Lead captured:", payload);
        } catch (err) {
            setSubmitStatus({
                loading: false,
                success: false,
                error: err.message || "Something went wrong. Please try again.",
            });
        }
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
                    Add one or more projects to get individual guide prices and a combined
                    estimated total for your London project.
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
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "12px",
                                    flexWrap: "wrap",
                                    marginBottom: "12px",
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: "700",
                                        fontSize: "15px",
                                    }}
                                >
                                    1. Add your project types
                                </div>

                                <button
                                    type="button"
                                    onClick={addProject}
                                    style={{
                                        background: "#fff",
                                        color: "#1c1917",
                                        border: "1px solid #d6d3d1",
                                        padding: "10px 14px",
                                        borderRadius: "12px",
                                        fontWeight: "700",
                                        cursor: "pointer",
                                    }}
                                >
                                    + Add another project
                                </button>
                            </div>

                            <div style={{ display: "grid", gap: "16px" }}>
                                {projects.map((project, index) => (
                                    <div
                                        key={project.id}
                                        style={{
                                            border: "1px solid #e7e5e4",
                                            borderRadius: "18px",
                                            padding: isMobile ? "16px" : "18px",
                                            background: "#fafaf9",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                gap: "12px",
                                                flexWrap: "wrap",
                                                marginBottom: "14px",
                                            }}
                                        >
                                            <strong style={{ fontSize: "15px" }}>
                                                Project {index + 1}
                                            </strong>

                                            {projects.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeProject(project.id)}
                                                    style={{
                                                        border: "none",
                                                        background: "transparent",
                                                        color: "#b42318",
                                                        fontWeight: "700",
                                                        cursor: "pointer",
                                                        padding: 0,
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            )}
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
                                                    onClick={() =>
                                                        updateProject(project.id, "type", key)
                                                    }
                                                    style={pillButton(project.type === key)}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>

                                        <div style={{ marginTop: "18px" }}>
                                            <div
                                                style={{
                                                    fontWeight: "700",
                                                    marginBottom: "12px",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Approximate size
                                            </div>

                                            <div
                                                style={{
                                                    background: "#fff",
                                                    border: "1px solid #e7e5e4",
                                                    borderRadius: "16px",
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
                                                    {project.size} m²
                                                </div>

                                                <input
                                                    type="range"
                                                    min="5"
                                                    max="80"
                                                    step="1"
                                                    value={project.size}
                                                    onChange={(e) =>
                                                        updateProject(
                                                            project.id,
                                                            "size",
                                                            Number(e.target.value)
                                                        )
                                                    }
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

                                        <div style={{ marginTop: "18px" }}>
                                            <div
                                                style={{
                                                    fontWeight: "700",
                                                    marginBottom: "12px",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Finish level
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
                                                        onClick={() =>
                                                            updateProject(project.id, "spec", key)
                                                        }
                                                        style={pillButton(project.spec === key)}
                                                    >
                                                        {label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
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
                                2. Enter your details to view your estimate
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

                                {submitStatus.error ? (
                                    <div
                                        style={{
                                            color: "#b42318",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {submitStatus.error}
                                    </div>
                                ) : null}

                                {submitStatus.success ? (
                                    <div
                                        style={{
                                            color: "#166534",
                                            fontSize: "14px",
                                        }}
                                    >
                                        Your details and full pricing breakdown were sent successfully.
                                    </div>
                                ) : null}

                                <button
                                    type="submit"
                                    disabled={submitStatus.loading}
                                    style={{
                                        background: "#1c1917",
                                        color: "#fff",
                                        padding: isMobile ? "15px 18px" : "14px 20px",
                                        border: "none",
                                        borderRadius: "12px",
                                        fontWeight: "700",
                                        cursor: submitStatus.loading ? "not-allowed" : "pointer",
                                        fontSize: "15px",
                                        width: "100%",
                                        opacity: submitStatus.loading ? 0.7 : 1,
                                    }}
                                >
                                    {submitStatus.loading ? "Sending..." : "Show my estimate"}
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
                                        £{Math.round(totals.low).toLocaleString()} – £
                                        {Math.round(totals.high).toLocaleString()}
                                    </div>

                                    <div
                                        style={{
                                            marginTop: "8px",
                                            color: "#d6d3d1",
                                            fontSize: "14px",
                                        }}
                                    >
                                        Combined guide price for {projects.length}{" "}
                                        {projects.length === 1 ? "project" : "projects"}
                                    </div>

                                    <div
                                        style={{
                                            marginTop: "20px",
                                            display: "grid",
                                            gap: "12px",
                                        }}
                                    >
                                        {projectResults.map((project, index) => (
                                            <div
                                                key={project.id}
                                                style={{
                                                    padding: "16px",
                                                    borderRadius: "16px",
                                                    background: "rgba(255,255,255,0.08)",
                                                    color: "#f5f5f4",
                                                    lineHeight: "1.8",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontWeight: "700",
                                                        marginBottom: "6px",
                                                    }}
                                                >
                                                    Project {index + 1}: {project.label}
                                                </div>
                                                <div>
                                                    <strong>Size:</strong> {project.size} m²
                                                </div>
                                                <div>
                                                    <strong>Finish:</strong> {project.specLabel}
                                                </div>
                                                <div>
                                                    <strong>Estimate:</strong> £
                                                    {Math.round(project.low).toLocaleString()} – £
                                                    {Math.round(project.high).toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
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
                                        Enter your details to unlock your combined guide price
                                    </div>

                                    <div
                                        style={{
                                            marginTop: "20px",
                                            display: "grid",
                                            gap: "12px",
                                        }}
                                    >
                                        {projectResults.map((project, index) => (
                                            <div
                                                key={project.id}
                                                style={{
                                                    padding: "16px",
                                                    borderRadius: "16px",
                                                    background: "rgba(255,255,255,0.08)",
                                                    color: "#f5f5f4",
                                                    lineHeight: "1.8",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontWeight: "700",
                                                        marginBottom: "6px",
                                                    }}
                                                >
                                                    Project {index + 1}: {project.label}
                                                </div>
                                                <div>
                                                    <strong>Size:</strong> {project.size} m²
                                                </div>
                                                <div>
                                                    <strong>Finish:</strong> {project.specLabel}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <p
                                        style={{
                                            marginTop: "18px",
                                            fontSize: "13px",
                                            color: "#d6d3d1",
                                            lineHeight: "1.7",
                                        }}
                                    >
                                        We’ll send your lead details, specs, and full pricing
                                        breakdown to Formspree.
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