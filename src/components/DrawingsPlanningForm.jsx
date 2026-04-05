import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { siteStyles } from "./Layout.jsx";

const initialFormState = {
    postcode: "",
    projectTypes: [],
    extensionTypes: [],
    loftTypes: [],
    packageInterest: "",
    message: "",
    name: "",
    email: "",
    phone: "",
};

const packageOptions = [
    {
        name: "Starter Package",
        price: "From £450",
        intro: "A simple package for straightforward drawing requirements.",
        includes: [
            "Measured survey",
            "Current scaled drawings",
            "Proposed scaled drawings",
            "Elevations",
        ],
    },
    {
        name: "Planning Package",
        price: "From £650",
        intro: "Ideal for projects that need planning drawings and submission support.",
        includes: [
            "Measured survey",
            "Current scaled drawings",
            "Proposed scaled drawings",
            "Elevations",
            "Planning submission support",
        ],
        featured: true,
    },
    {
        name: "Technical Package",
        price: "From £1150",
        intro: "A fuller package for projects moving beyond planning into technical delivery.",
        includes: [
            "Measured survey",
            "Current scaled drawings",
            "Proposed scaled drawings",
            "Elevations",
            "Planning submission support",
            "Building control drawings",
            "Structural calculations",
        ],
    },
];

const projectTypeOptions = [
    "Extension",
    "Loft Conversion",
    "Internal Reconfiguration",
];

const extensionTypeOptions = [
    "Rear extension",
    "Side return extension",
    "Wraparound extension",
    "Single-storey extension",
    "Double-storey extension",
    "Front extension",
    "Kitchen extension",
    "Lean-to extension",
    "Orangery / garden room extension",
    "Other extension type",
];

const loftTypeOptions = [
    "Dormer loft conversion",
    "Hip-to-gable loft conversion",
    "Mansard loft conversion",
    "L-shaped dormer loft conversion",
    "Velux / rooflight loft conversion",
    "Side dormer loft conversion",
    "Rear dormer loft conversion",
    "Bungalow loft conversion",
    "Other loft type",
];

export default function DrawingsPlanningForm({
    endpoint = "https://formspree.io/f/mojpjokd",
    selectedPackage = "",
    buttonText = "Get my quote",
    title = "Request your drawings quote",
    intro = "Answer a few quick questions and we’ll review your project and guide the next step.",
}) {
    const { buttonPrimary, buttonSecondary, card } = siteStyles;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        ...initialFormState,
        packageInterest: selectedPackage || "",
    });

    const [submittedSummary, setSubmittedSummary] = useState(null);
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [hoveredPackage, setHoveredPackage] = useState("");
    const [submitStatus, setSubmitStatus] = useState({
        loading: false,
        success: false,
        error: "",
    });
    const [isMobile, setIsMobile] = useState(false);
    const [infoPackage, setInfoPackage] = useState(null);

    const packageRefs = useRef({});
    const formTopRef = useRef(null);
    const isFirstRender = useRef(true);
    const autoAdvanceRef = useRef(null);

    const totalSteps = 5;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!selectedPackage || submitStatus.success) return;

        setForm((prev) => ({
            ...prev,
            packageInterest: selectedPackage,
        }));

        setDirection(-1);
        setStep(1);

        requestAnimationFrame(() => {
            const selectedEl = packageRefs.current[selectedPackage];
            if (selectedEl) {
                selectedEl.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
            }
        });
    }, [selectedPackage, submitStatus.success]);

    useLayoutEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            if (formTopRef.current) {
                const HEADER_OFFSET = isMobile ? 90 : 110;
                const y =
                    formTopRef.current.getBoundingClientRect().top +
                    window.pageYOffset -
                    HEADER_OFFSET;

                window.scrollTo({
                    top: y,
                    behavior: "smooth",
                });
            }
        }, 60);

        return () => clearTimeout(timeout);
    }, [step, isMobile]);

    useEffect(() => {
        if (autoAdvanceRef.current) {
            clearTimeout(autoAdvanceRef.current);
        }

        if (step === 2) {
            const validProjectSelection =
                form.projectTypes.length > 0 &&
                (!form.projectTypes.includes("Extension") || form.extensionTypes.length > 0) &&
                (!form.projectTypes.includes("Loft Conversion") || form.loftTypes.length > 0);

            if (validProjectSelection) {
                autoAdvanceRef.current = setTimeout(() => {
                    setDirection(1);
                    setStep(3);
                }, 350);
            }
        }

        return () => {
            if (autoAdvanceRef.current) {
                clearTimeout(autoAdvanceRef.current);
            }
        };
    }, [step, form.projectTypes, form.extensionTypes, form.loftTypes]);

    useEffect(() => {
        if (!infoPackage) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                setInfoPackage(null);
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [infoPackage]);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (submitStatus.error) {
            setSubmitStatus((prev) => ({
                ...prev,
                error: "",
            }));
        }
    }

    function setField(name, value) {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (submitStatus.error) {
            setSubmitStatus((prev) => ({
                ...prev,
                error: "",
            }));
        }
    }

    function toggleProjectType(item) {
        setForm((prev) => {
            const isSelected = prev.projectTypes.includes(item);

            const updatedProjectTypes = isSelected
                ? prev.projectTypes.filter((type) => type !== item)
                : [...prev.projectTypes, item];

            return {
                ...prev,
                projectTypes: updatedProjectTypes,
                extensionTypes: updatedProjectTypes.includes("Extension")
                    ? prev.extensionTypes
                    : [],
                loftTypes: updatedProjectTypes.includes("Loft Conversion")
                    ? prev.loftTypes
                    : [],
            };
        });

        if (submitStatus.error) {
            setSubmitStatus((prev) => ({
                ...prev,
                error: "",
            }));
        }
    }

    function toggleExtensionType(item) {
        setForm((prev) => {
            const isSelected = prev.extensionTypes.includes(item);

            return {
                ...prev,
                extensionTypes: isSelected
                    ? prev.extensionTypes.filter((type) => type !== item)
                    : [...prev.extensionTypes, item],
            };
        });

        if (submitStatus.error) {
            setSubmitStatus((prev) => ({
                ...prev,
                error: "",
            }));
        }
    }

    function toggleLoftType(item) {
        setForm((prev) => {
            const isSelected = prev.loftTypes.includes(item);

            return {
                ...prev,
                loftTypes: isSelected
                    ? prev.loftTypes.filter((type) => type !== item)
                    : [...prev.loftTypes, item],
            };
        });

        if (submitStatus.error) {
            setSubmitStatus((prev) => ({
                ...prev,
                error: "",
            }));
        }
    }

    function nextStep() {
        if (step < 4) {
            setDirection(1);
            setStep((prev) => prev + 1);
        }
    }

    function prevStep() {
        if (step > 1 && step <= 4) {
            setDirection(-1);
            setStep((prev) => prev - 1);
        }
    }

    function goHome() {
        navigate("/");
    }

    function startAnotherRequest() {
        setSubmittedSummary(null);
        setSubmitStatus({
            loading: false,
            success: false,
            error: "",
        });
        setForm({
            ...initialFormState,
            packageInterest: selectedPackage || "",
        });
        setDirection(-1);
        setStep(1);
    }

    const stepIsValid = useMemo(() => {
        if (step === 1) {
            return !!form.packageInterest;
        }

        if (step === 2) {
            if (form.projectTypes.length === 0) return false;
            if (
                form.projectTypes.includes("Extension") &&
                form.extensionTypes.length === 0
            ) {
                return false;
            }
            if (
                form.projectTypes.includes("Loft Conversion") &&
                form.loftTypes.length === 0
            ) {
                return false;
            }
            return true;
        }

        if (step === 3) {
            return !!form.name.trim() && !!form.email.trim();
        }

        return true;
    }, [step, form]);

    async function handleSubmit(e) {
        e.preventDefault();

        setSubmitStatus({
            loading: true,
            success: false,
            error: "",
        });

        try {
            const payload = {
                formType: "Drawings & Planning Quote",
                name: form.name,
                email: form.email,
                phone: form.phone,
                postcode: form.postcode,
                projectType: form.projectTypes.join(", "),
                projectTypes: form.projectTypes,
                extensionTypes: form.extensionTypes,
                loftTypes: form.loftTypes,
                packageInterest: form.packageInterest,
                message: form.message,
            };

            const response = await fetch(endpoint, {
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

            setSubmittedSummary({
                packageInterest: form.packageInterest,
                projectTypes: form.projectTypes,
                extensionTypes: form.extensionTypes,
                loftTypes: form.loftTypes,
                postcode: form.postcode,
                name: form.name,
                email: form.email,
                phone: form.phone,
                message: form.message,
            });

            setSubmitStatus({
                loading: false,
                success: true,
                error: "",
            });

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "drawings_planning_form_submit",
                form_name: "drawings_planning_quote",
                package_interest: form.packageInterest,
                project_types: form.projectTypes.join(", "),
            });

            setDirection(1);
            setStep(5);

            setForm({
                ...initialFormState,
                packageInterest: selectedPackage || "",
            });
        } catch (error) {
            setSubmitStatus({
                loading: false,
                success: false,
                error: error.message || "Something went wrong. Please try again.",
            });
        }
    }

    const inputStyle = {
        width: "100%",
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid #d6d3d1",
        fontSize: "15px",
        boxSizing: "border-box",
        background: "#fff",
        outline: "none",
        maxWidth: "100%",
    };

    const labelStyle = {
        display: "grid",
        gap: "8px",
        minWidth: 0,
    };

    const optionCardStyle = (active) => ({
        padding: "16px",
        borderRadius: "14px",
        border: active ? "1px solid #1c1917" : "1px solid #d6d3d1",
        background: active ? "#f5f5f4" : "#fff",
        color: "#1f1f1f",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "15px",
        textAlign: "left",
        transition: "all 0.22s ease",
        transform: active ? "translateY(-2px)" : "translateY(0)",
        boxShadow: active ? "0 14px 30px rgba(28,25,23,0.08)" : "0 1px 2px rgba(0,0,0,0.03)",
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        overflowWrap: "break-word",
    });

    const packageCardStyle = (pkg) => {
        const active = form.packageInterest === pkg.name;
        const hovered = hoveredPackage === pkg.name;

        return {
            ...card,
            padding: isMobile ? "20px" : "24px",
            background: active ? "#1f1f1f" : "#fff",
            color: active ? "#fff" : "#1f1f1f",
            border: active ? "1px solid #1f1f1f" : "1px solid #e7e5e4",
            borderRadius: "22px",
            transform:
                !isMobile && (active || hovered) ? "translateY(-6px)" : "translateY(0)",
            boxShadow:
                active || hovered
                    ? "0 20px 40px rgba(28,25,23,0.12)"
                    : "0 10px 24px rgba(0,0,0,0.05)",
            transition: "all 0.25s ease",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            textAlign: "left",
            width: "100%",
            minWidth: 0,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        };
    };

    const inlineInfoButtonStyle = (active) => ({
        width: "32px",
        height: "32px",
        borderRadius: "999px",
        border: active ? "1px solid rgba(255,255,255,0.22)" : "1px solid #d6d3d1",
        background: active ? "#2b2926" : "#fafaf9",
        color: active ? "#fff" : "#1c1917",
        display: "grid",
        placeItems: "center",
        fontSize: "14px",
        fontWeight: "800",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
    });

    const stepButtonStyle = (active, current) => ({
        width: isMobile ? "30px" : "36px",
        height: isMobile ? "30px" : "36px",
        borderRadius: "999px",
        display: "grid",
        placeItems: "center",
        fontWeight: "700",
        fontSize: isMobile ? "12px" : "14px",
        border: active ? "1px solid #1c1917" : "1px solid #d6d3d1",
        background: current ? "#1c1917" : active ? "#292524" : "#fff",
        color: active ? "#fff" : "#57534e",
        transition: "all 0.2s ease",
        flexShrink: 0,
    });

    const reviewItemStyle = {
        padding: "14px 0",
        borderBottom: "1px solid #e7e5e4",
        display: "grid",
        gap: "4px",
        minWidth: 0,
        overflowWrap: "break-word",
    };

    const trustPillStyle = {
        padding: "10px 12px",
        borderRadius: "999px",
        background: "#f5f5f4",
        border: "1px solid #e7e5e4",
        fontSize: "13px",
        fontWeight: "600",
        color: "#44403c",
        textAlign: "center",
        minWidth: 0,
    };

    const summaryBoxStyle = {
        padding: "12px 14px",
        borderRadius: "12px",
        background: "#f5f5f4",
        border: "1px solid #e7e5e4",
        color: "#44403c",
        lineHeight: "1.7",
        fontSize: "14px",
        minWidth: 0,
        overflowWrap: "break-word",
    };

    const backButtonStyle = {
        padding: isMobile ? "14px 18px" : "14px 20px",
        borderRadius: "12px",
        border: "1px solid #d6d3d1",
        background: "#fff",
        fontWeight: "600",
        maxWidth: "100%",
        minHeight: isMobile ? "52px" : "48px",
        width: isMobile ? "100%" : "auto",
    };

    const primaryNavButtonStyle = (disabled = false) => ({
        ...buttonPrimary,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.65 : 1,
        boxShadow: disabled ? "none" : "0 18px 40px rgba(28,25,23,0.22)",
        maxWidth: "100%",
        minHeight: isMobile ? "56px" : "50px",
        width: isMobile ? "100%" : "auto",
        fontSize: isMobile ? "16px" : "15px",
        fontWeight: "700",
    });

    const progress = (step / totalSteps) * 100;
    const animationName = direction === 1 ? "slideInFromRight" : "slideInFromLeft";

    const renderStepContent = () => {
        if (step === 1) {
            return (
                <div style={{ display: "grid", gap: "22px", minWidth: 0 }}>
                    <div style={{ minWidth: 0 }}>
                        <p
                            style={{
                                margin: "0 0 6px",
                                color: "#78716c",
                                fontSize: "13px",
                                fontWeight: "700",
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                            }}
                        >
                            Step 1
                        </p>
                        <h3 style={{ margin: "0 0 8px", fontSize: "24px" }}>
                            Choose your package
                        </h3>
                     
                    </div>

       

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: isMobile
                                ? "1fr"
                                : "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "18px",
                            minWidth: 0,
                        }}
                    >
                        {packageOptions.map((pkg) => {
                            const active = form.packageInterest === pkg.name;
                            const displayPrice = pkg.price.replace("From ", "");
                            const priceLabel = pkg.featured
                                ? "Recommended package"
                                : "Starting price";

                            return (
                                <button
                                    key={pkg.name}
                                    ref={(el) => {
                                        packageRefs.current[pkg.name] = el;
                                    }}
                                    type="button"
                                    onClick={() => {
                                        setField("packageInterest", pkg.name);
                                        setDirection(1);
                                        setTimeout(() => {
                                            setStep(2);
                                        }, 220);
                                    }}
                                    onMouseEnter={() => setHoveredPackage(pkg.name)}
                                    onMouseLeave={() => setHoveredPackage("")}
                                    style={packageCardStyle(pkg)}
                                >
                                    {pkg.featured && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "14px",
                                                right: "14px",
                                                padding: "7px 12px",
                                                borderRadius: "999px",
                                                fontSize: "11px",
                                                fontWeight: "800",
                                                letterSpacing: "0.04em",
                                                textTransform: "uppercase",
                                                background: active ? "#fff" : "#1f1f1f",
                                                color: active ? "#1f1f1f" : "#fff",
                                                maxWidth: "calc(100% - 28px)",
                                                boxShadow: active
                                                    ? "0 10px 24px rgba(0,0,0,0.12)"
                                                    : "none",
                                            }}
                                        >
                                            Most Popular
                                        </div>
                                    )}

                                    <div
                                        style={{
                                            display: "grid",
                                            gap: "18px",
                                            minWidth: 0,
                                        }}
                                    >
                                        <div style={{ display: "grid", gap: "12px", minWidth: 0 }}>
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    letterSpacing: "0.08em",
                                                    textTransform: "uppercase",
                                                    color: active ? "#d6d3d1" : "#78716c",
                                                    fontWeight: "700",
                                                }}
                                            >
                                                {priceLabel}
                                            </div>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    justifyContent: "space-between",
                                                    gap: "12px",
                                                    minWidth: 0,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "grid",
                                                        gap: "2px",
                                                        minWidth: 0,
                                                        flex: 1,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "baseline",
                                                            gap: "8px",
                                                            flexWrap: "wrap",
                                                            minWidth: 0,
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize: isMobile ? "34px" : "40px",
                                                                lineHeight: 1,
                                                                fontWeight: "800",
                                                                letterSpacing: "-0.04em",
                                                                color: active ? "#fff" : "#1c1917",
                                                            }}
                                                        >
                                                            {displayPrice}
                                                        </span>
                                                        <span
                                                            style={{
                                                                fontSize: "13px",
                                                                color: active ? "#d6d3d1" : "#78716c",
                                                                fontWeight: "600",
                                                            }}
                                                        >
                                                            starting from
                                                        </span>
                                                    </div>

                                                    <h4
                                                        style={{
                                                            margin: 0,
                                                            fontSize: isMobile ? "22px" : "24px",
                                                            lineHeight: "1.15",
                                                            overflowWrap: "break-word",
                                                        }}
                                                    >
                                                        {pkg.name}
                                                    </h4>
                                                </div>

                                                <button
                                                    type="button"
                                                    aria-label={`More information about ${pkg.name}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setInfoPackage(pkg);
                                                    }}
                                                    style={inlineInfoButtonStyle(active)}
                                                >
                                                    i
                                                </button>
                                            </div>

                                            <p
                                                style={{
                                                    margin: 0,
                                                    color: active ? "#f5f5f4" : "#57534e",
                                                    lineHeight: "1.7",
                                                }}
                                            >
                                                {pkg.intro}
                                            </p>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: "10px",
                                                minWidth: 0,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    padding: "9px 12px",
                                                    borderRadius: "999px",
                                                    border: active
                                                        ? "1px solid rgba(255,255,255,0.16)"
                                                        : "1px solid #e7e5e4",
                                                    background: active
                                                        ? "rgba(255,255,255,0.08)"
                                                        : "#fafaf9",
                                                    color: active ? "#fff" : "#44403c",
                                                    fontSize: "13px",
                                                    fontWeight: "700",
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                Typical turnaround • 7–10 working days
                                            </div>
                                        </div>

                                        <div style={{ display: "grid", gap: "10px", minWidth: 0 }}>
                                            {pkg.includes.slice(0, 4).map((item) => (
                                                <div
                                                    key={item}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "flex-start",
                                                        gap: "10px",
                                                        minWidth: 0,
                                                    }}
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            width: "22px",
                                                            height: "22px",
                                                            borderRadius: "999px",
                                                            display: "grid",
                                                            placeItems: "center",
                                                            flexShrink: 0,
                                                            fontSize: "12px",
                                                            fontWeight: "800",
                                                            border: active
                                                                ? "1px solid rgba(255,255,255,0.16)"
                                                                : "1px solid #e7e5e4",
                                                            background: active
                                                                ? "rgba(255,255,255,0.08)"
                                                                : "#fafaf9",
                                                            color: active ? "#fff" : "#1c1917",
                                                        }}
                                                    >
                                                        ✓
                                                    </span>

                                                    <span
                                                        style={{
                                                            color: active ? "#f5f5f4" : "#44403c",
                                                            lineHeight: "1.6",
                                                            fontSize: "14px",
                                                            overflowWrap: "break-word",
                                                        }}
                                                    >
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            marginTop: "20px",
                                            padding: "14px 16px",
                                            borderRadius: "14px",
                                            border: active
                                                ? "1px solid rgba(255,255,255,0.18)"
                                                : "1px solid #d6d3d1",
                                            background: active ? "#2b2926" : "#fafaf9",
                                            color: active ? "#fff" : "#1c1917",
                                            fontWeight: "800",
                                            textAlign: "center",
                                            boxShadow: active
                                                ? "inset 0 1px 0 rgba(255,255,255,0.06)"
                                                : "none",
                                        }}
                                    >
                                        {active ? "Selected — moving to project details..." : "Choose this package"}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {form.packageInterest && (
                        <div style={summaryBoxStyle}>
                            Selected package: <strong>{form.packageInterest}</strong>
                        </div>
                    )}
                </div>
            );
        }

        if (step === 2) {
            return (
                <div style={{ display: "grid", gap: "18px", minWidth: 0 }}>
                    <div style={{ minWidth: 0 }}>
                        <p
                            style={{
                                margin: "0 0 6px",
                                color: "#78716c",
                                fontSize: "13px",
                                fontWeight: "700",
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                            }}
                        >
                            Step 2
                        </p>
                        <h3 style={{ margin: "0 0 8px", fontSize: "24px" }}>
                            Your project
                        </h3>
                        <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
                            Tell us what type of project you’re planning.
                        </p>
                    </div>

                    <div
                        style={{
                            padding: "18px",
                            borderRadius: "16px",
                            background: "#fafaf9",
                            border: "1px solid #e7e5e4",
                            display: "grid",
                            gap: "10px",
                            minWidth: 0,
                        }}
                    >
                        <strong style={{ fontSize: "16px" }}>
                            Select your project type.
                        </strong>
                        <span style={{ color: "#57534e", lineHeight: "1.7" }}>
                            Once your project selections are complete, we’ll move you straight to
                            your details.
                        </span>
                    </div>

                    <div style={labelStyle}>
                        <span style={{ color: "#44403c", fontWeight: "600" }}>Project type</span>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile
                                    ? "1fr"
                                    : "repeat(auto-fit, minmax(180px, 1fr))",
                                gap: "12px",
                                minWidth: 0,
                            }}
                        >
                            {projectTypeOptions.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => toggleProjectType(item)}
                                    style={optionCardStyle(form.projectTypes.includes(item))}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        {form.projectTypes.length > 0 && (
                            <div style={summaryBoxStyle}>
                                Selected: <strong>{form.projectTypes.join(", ")}</strong>
                            </div>
                        )}
                    </div>

                    {form.projectTypes.includes("Extension") && (
                        <div style={labelStyle}>
                            <span style={{ color: "#44403c", fontWeight: "600" }}>
                                What type of extension?
                            </span>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: isMobile
                                        ? "1fr"
                                        : "repeat(auto-fit, minmax(220px, 1fr))",
                                    gap: "12px",
                                    minWidth: 0,
                                }}
                            >
                                {extensionTypeOptions.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => toggleExtensionType(item)}
                                        style={optionCardStyle(form.extensionTypes.includes(item))}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            {form.extensionTypes.length > 0 && (
                                <div style={summaryBoxStyle}>
                                    Extension selected: <strong>{form.extensionTypes.join(", ")}</strong>
                                </div>
                            )}
                        </div>
                    )}

                    {form.projectTypes.includes("Loft Conversion") && (
                        <div style={labelStyle}>
                            <span style={{ color: "#44403c", fontWeight: "600" }}>
                                What type of loft conversion?
                            </span>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: isMobile
                                        ? "1fr"
                                        : "repeat(auto-fit, minmax(220px, 1fr))",
                                    gap: "12px",
                                    minWidth: 0,
                                }}
                            >
                                {loftTypeOptions.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => toggleLoftType(item)}
                                        style={optionCardStyle(form.loftTypes.includes(item))}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            {form.loftTypes.length > 0 && (
                                <div style={summaryBoxStyle}>
                                    Loft selected: <strong>{form.loftTypes.join(", ")}</strong>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        }

        if (step === 3) {
            return (
                <div style={{ display: "grid", gap: "18px", minWidth: 0 }}>
                    <div style={{ minWidth: 0 }}>
                        <p
                            style={{
                                margin: "0 0 6px",
                                color: "#78716c",
                                fontSize: "13px",
                                fontWeight: "700",
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                            }}
                        >
                            Step 3
                        </p>
                        <h3 style={{ margin: "0 0 8px", fontSize: "24px" }}>
                            Your details
                        </h3>
                        <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
                            Leave your details and any extra project notes you want us to review.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: isMobile
                                ? "1fr 1fr"
                                : "repeat(auto-fit, minmax(140px, 1fr))",
                            gap: "10px",
                            minWidth: 0,
                        }}
                    >
                        <div style={trustPillStyle}>Clear next-step advice</div>
                        <div style={trustPillStyle}>Planning-focused support</div>
                        <div style={trustPillStyle}>Tailored package guidance</div>
                        <div style={trustPillStyle}>No pressure</div>
                    </div>

                    <div
                        style={{
                            padding: "16px",
                            borderRadius: "16px",
                            background: "#fafaf9",
                            border: "1px solid #e7e5e4",
                            color: "#57534e",
                            lineHeight: "1.7",
                            minWidth: 0,
                        }}
                    >
                        Name and email are the only required fields here. Everything else is
                        optional.
                    </div>

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        style={inputStyle}
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        style={inputStyle}
                        required
                    />

                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone number (optional)"
                        style={inputStyle}
                    />

                    <input
                        name="postcode"
                        value={form.postcode}
                        onChange={handleChange}
                        placeholder="Postcode (optional)"
                        style={inputStyle}
                    />

                    <label style={labelStyle}>
                        <span style={{ color: "#44403c", fontWeight: "600" }}>
                            Project details (optional)
                        </span>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Anything helpful to know about the project, timing, or what support you need"
                            rows="5"
                            style={{
                                ...inputStyle,
                                resize: "vertical",
                            }}
                        />
                    </label>
                </div>
            );
        }

        return (
            <div style={{ display: "grid", gap: "18px", minWidth: 0 }}>
                <div style={{ minWidth: 0 }}>
                    <p
                        style={{
                            margin: "0 0 6px",
                            color: "#78716c",
                            fontSize: "13px",
                            fontWeight: "700",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                        }}
                    >
                        Step 4
                    </p>
                    <h3 style={{ margin: "0 0 8px", fontSize: "24px" }}>
                        Review & send
                    </h3>
                    <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
                        Review everything before sending your request.
                    </p>
                </div>

                <div
                    style={{
                        padding: "16px",
                        borderRadius: "16px",
                        background: "#f5f5f4",
                        border: "1px solid #e7e5e4",
                        minWidth: 0,
                    }}
                >
                    <strong style={{ display: "block", marginBottom: "6px" }}>
                        Ready to send your request?
                    </strong>
                    <span style={{ color: "#57534e", lineHeight: "1.7" }}>
                        Send this form and we’ll review the project and come back to you with the
                        most suitable next step and quote guidance.
                    </span>
                </div>

                <div
                    style={{
                        border: "1px solid #e7e5e4",
                        borderRadius: "16px",
                        padding: "6px 18px",
                        background: "#fafaf9",
                        minWidth: 0,
                    }}
                >
                    <div style={reviewItemStyle}>
                        <strong>Package of interest</strong>
                        <span>{form.packageInterest || "—"}</span>
                    </div>

                    <div style={reviewItemStyle}>
                        <strong>Project type</strong>
                        <span>{form.projectTypes.length ? form.projectTypes.join(", ") : "—"}</span>
                    </div>

                    {form.projectTypes.includes("Extension") && (
                        <div style={reviewItemStyle}>
                            <strong>Extension type</strong>
                            <span>{form.extensionTypes.length ? form.extensionTypes.join(", ") : "—"}</span>
                        </div>
                    )}

                    {form.projectTypes.includes("Loft Conversion") && (
                        <div style={reviewItemStyle}>
                            <strong>Loft type</strong>
                            <span>{form.loftTypes.length ? form.loftTypes.join(", ") : "—"}</span>
                        </div>
                    )}

                    <div style={reviewItemStyle}>
                        <strong>Postcode</strong>
                        <span>{form.postcode || "—"}</span>
                    </div>

                    <div style={reviewItemStyle}>
                        <strong>Name</strong>
                        <span>{form.name || "—"}</span>
                    </div>

                    <div style={reviewItemStyle}>
                        <strong>Email</strong>
                        <span>{form.email || "—"}</span>
                    </div>

                    <div style={reviewItemStyle}>
                        <strong>Phone</strong>
                        <span>{form.phone || "—"}</span>
                    </div>

                    <div style={{ padding: "14px 0", display: "grid", gap: "4px", minWidth: 0 }}>
                        <strong>Project details</strong>
                        <span style={{ overflowWrap: "break-word" }}>{form.message || "—"}</span>
                    </div>
                </div>
            </div>
        );
    };

    if (step === 5 && submitStatus.success && submittedSummary) {
        return (
            <div
                ref={formTopRef}
                style={{
                    ...card,
                    background: "#fff",
                    border: "1px solid #ddd",
                    boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
                    display: "grid",
                    gap: "24px",
                    overflow: "hidden",
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        padding: "28px",
                        borderRadius: "20px",
                        background: "linear-gradient(135deg, #f0fdf4, #ffffff)",
                        border: "1px solid #bbf7d0",
                        display: "grid",
                        gap: "18px",
                        minWidth: 0,
                    }}
                >
                    <div
                        style={{
                            width: "72px",
                            height: "72px",
                            borderRadius: "20px",
                            background: "#166534",
                            color: "#fff",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "34px",
                            fontWeight: "700",
                        }}
                    >
                        ✓
                    </div>

                    <div style={{ minWidth: 0 }}>
                        <p
                            style={{
                                margin: "0 0 6px",
                                color: "#166534",
                                fontSize: "13px",
                                fontWeight: "700",
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                            }}
                        >
                            Success
                        </p>
                        <h2
                            style={{
                                margin: "0 0 10px",
                                fontSize: "clamp(28px, 5vw, 42px)",
                                color: "#14532d",
                                lineHeight: "1.08",
                            }}
                        >
                            Your request has been sent successfully
                        </h2>
                        <p style={{ margin: 0, color: "#166534", lineHeight: "1.8" }}>
                            We’ve received your drawings and planning enquiry. Our team will review
                            the package and project details, then come back to you with the most
                            suitable next step and quote guidance.
                        </p>
                    </div>
                </div>

                <div style={{ display: "grid", gap: "16px", minWidth: 0 }}>
                    <div
                        style={{
                            padding: "18px",
                            borderRadius: "16px",
                            background: "#fafaf9",
                            border: "1px solid #e7e5e4",
                            minWidth: 0,
                        }}
                    >
                        <strong style={{ display: "block", marginBottom: "6px" }}>
                            What you sent
                        </strong>
                        <span style={{ color: "#57534e", lineHeight: "1.7" }}>
                            Here is a summary of the request you just submitted.
                        </span>
                    </div>

                    <div
                        style={{
                            border: "1px solid #e7e5e4",
                            borderRadius: "16px",
                            padding: "6px 18px",
                            background: "#fafaf9",
                            minWidth: 0,
                        }}
                    >
                        <div style={reviewItemStyle}>
                            <strong>Package requested</strong>
                            <span>{submittedSummary.packageInterest || "—"}</span>
                        </div>

                        <div style={reviewItemStyle}>
                            <strong>Project type</strong>
                            <span>
                                {submittedSummary.projectTypes.length
                                    ? submittedSummary.projectTypes.join(", ")
                                    : "—"}
                            </span>
                        </div>

                        {submittedSummary.projectTypes.includes("Extension") && (
                            <div style={reviewItemStyle}>
                                <strong>Extension type</strong>
                                <span>
                                    {submittedSummary.extensionTypes.length
                                        ? submittedSummary.extensionTypes.join(", ")
                                        : "—"}
                                </span>
                            </div>
                        )}

                        {submittedSummary.projectTypes.includes("Loft Conversion") && (
                            <div style={reviewItemStyle}>
                                <strong>Loft type</strong>
                                <span>
                                    {submittedSummary.loftTypes.length
                                        ? submittedSummary.loftTypes.join(", ")
                                        : "—"}
                                </span>
                            </div>
                        )}

                        <div style={reviewItemStyle}>
                            <strong>Postcode</strong>
                            <span>{submittedSummary.postcode || "—"}</span>
                        </div>

                        <div style={reviewItemStyle}>
                            <strong>Name</strong>
                            <span>{submittedSummary.name || "—"}</span>
                        </div>

                        <div style={reviewItemStyle}>
                            <strong>Email</strong>
                            <span>{submittedSummary.email || "—"}</span>
                        </div>

                        <div style={reviewItemStyle}>
                            <strong>Phone</strong>
                            <span>{submittedSummary.phone || "—"}</span>
                        </div>

                        <div style={{ padding: "14px 0", display: "grid", gap: "4px", minWidth: 0 }}>
                            <strong>Project details</strong>
                            <span style={{ overflowWrap: "break-word" }}>
                                {submittedSummary.message || "—"}
                            </span>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "12px",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            type="button"
                            onClick={startAnotherRequest}
                            style={{
                                ...buttonSecondary,
                                cursor: "pointer",
                                maxWidth: "100%",
                            }}
                        >
                            Start another request
                        </button>

                        <div
                            style={{
                                display: "flex",
                                gap: "12px",
                                flexWrap: "wrap",
                                maxWidth: "100%",
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => navigate("/house-extensions-london#cost-calculator")}
                                style={{
                                    ...buttonSecondary,
                                    background: "#fff",
                                    border: "1px solid #d6d3d1",
                                    cursor: "pointer",
                                    maxWidth: "100%",
                                }}
                            >
                                Try our extension cost calculator
                            </button>

                            <button
                                type="button"
                                onClick={goHome}
                                style={{
                                    ...buttonPrimary,
                                    border: "none",
                                    cursor: "pointer",
                                    boxShadow: "0 16px 35px rgba(28,25,23,0.15)",
                                    maxWidth: "100%",
                                }}
                            >
                                Return to homepage
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {infoPackage && (
                <div
                    onClick={() => setInfoPackage(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(28,25,23,0.45)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: isMobile ? "16px" : "24px",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: "100%",
                            maxWidth: "560px",
                            maxHeight: "85vh",
                            overflowY: "auto",
                            background: "#fff",
                            borderRadius: "22px",
                            border: "1px solid #e7e5e4",
                            boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
                            padding: isMobile ? "20px" : "26px",
                            display: "grid",
                            gap: "16px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "start",
                                gap: "16px",
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontSize: "12px",
                                        letterSpacing: "2px",
                                        textTransform: "uppercase",
                                        color: "#78716c",
                                        fontWeight: "700",
                                        marginBottom: "8px",
                                    }}
                                >
                                    Package details
                                </div>
                                <h3 style={{ margin: 0, fontSize: "28px", color: "#1f1f1f" }}>
                                    {infoPackage.name}
                                </h3>
                                <p
                                    style={{
                                        margin: "8px 0 0",
                                        color: "#57534e",
                                        fontWeight: "700",
                                    }}
                                >
                                    {infoPackage.price}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setInfoPackage(null)}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "999px",
                                    border: "1px solid #d6d3d1",
                                    background: "#fff",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                    lineHeight: 1,
                                    flexShrink: 0,
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div
                            style={{
                                padding: "16px",
                                borderRadius: "16px",
                                background: "#fafaf9",
                                border: "1px solid #e7e5e4",
                                color: "#57534e",
                                lineHeight: "1.8",
                            }}
                        >
                            {infoPackage.intro}
                        </div>

                        <div style={{ display: "grid", gap: "10px" }}>
                            <strong style={{ fontSize: "16px", color: "#1f1f1f" }}>
                                What’s included
                            </strong>

                            <div style={{ display: "grid", gap: "10px" }}>
                                {infoPackage.includes.map((item) => (
                                    <div
                                        key={item}
                                        style={{
                                            padding: "12px 14px",
                                            borderRadius: "12px",
                                            background: "#fff",
                                            border: "1px solid #e7e5e4",
                                            color: "#44403c",
                                            lineHeight: "1.7",
                                        }}
                                    >
                                        ✓ {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "12px",
                                flexWrap: "wrap",
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => setInfoPackage(null)}
                                style={{
                                    ...buttonSecondary,
                                    cursor: "pointer",
                                }}
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setField("packageInterest", infoPackage.name);
                                    setInfoPackage(null);
                                    setDirection(1);
                                    setTimeout(() => {
                                        setStep(2);
                                    }, 180);
                                }}
                                style={{
                                    ...buttonPrimary,
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Choose this package
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <form
                ref={formTopRef}
                onSubmit={handleSubmit}
                style={{
                    ...card,
                    background: "#fff",
                    border: "1px solid #ddd",
                    boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
                    display: "grid",
                    gap: "20px",
                    position: "relative",
                    overflow: "hidden",
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    minWidth: 0,
                }}
            >
                <style>
                    {`
              @keyframes slideInFromRight {
                0% {
                  opacity: 0;
                  transform: translateX(34px);
                }
                100% {
                  opacity: 1;
                  transform: translateX(0);
                }
              }

              @keyframes slideInFromLeft {
                0% {
                  opacity: 0;
                  transform: translateX(-34px);
                }
                100% {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
            `}
                </style>

                <div style={{ minWidth: 0 }}>
                    <h2
                        style={{
                            fontSize: isMobile ? "32px" : "42px",
                            marginTop: 0,
                            marginBottom: "12px",
                        }}
                    >
                        {title}
                    </h2>

                    <p
                        style={{
                            color: "#57534e",
                            lineHeight: "1.8",
                            maxWidth: "560px",
                            margin: 0,
                        }}
                    >
                        {intro}
                    </p>
                </div>

                <div style={{ display: "grid", gap: "14px", minWidth: 0 }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <p style={{ margin: 0, color: "#57534e", fontWeight: "600" }}>
                            Step {step} of {totalSteps}
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)",
                            gap: isMobile ? "6px" : "10px",
                            alignItems: "center",
                            minWidth: 0,
                        }}
                    >
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: isMobile ? "6px" : "10px",
                                    minWidth: 0,
                                }}
                            >
                                <div style={stepButtonStyle(step >= item, step === item)}>{item}</div>
                                {item < 5 && (
                                    <div
                                        style={{
                                            height: "4px",
                                            background: step > item ? "#1c1917" : "#e7e5e4",
                                            borderRadius: "999px",
                                            flex: 1,
                                            transition: "background 0.2s ease",
                                            minWidth: 0,
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            width: "100%",
                            height: "8px",
                            background: "#e7e5e4",
                            borderRadius: "999px",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                width: `${progress}%`,
                                height: "100%",
                                background: "#1c1917",
                                transition: "width 0.3s ease",
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                            gap: "8px",
                            color: "#78716c",
                            fontSize: isMobile ? "11px" : "13px",
                            fontWeight: "600",
                            minWidth: 0,
                        }}
                    >
                        <span>Package</span>
                        <span>Project</span>
                        <span>Details</span>
                        <span>Review</span>
                        <span>Success</span>
                    </div>
                </div>

                <div
                    key={step}
                    style={{
                        animation: `${animationName} 0.35s cubic-bezier(0.22, 1, 0.36, 1)`,
                        willChange: "transform, opacity",
                        minWidth: 0,
                    }}
                >
                    {renderStepContent()}
                </div>

                {submitStatus.error && (
                    <p style={{ margin: 0, color: "#b91c1c", fontWeight: "600" }}>
                        {submitStatus.error}
                    </p>
                )}

                <div
                    style={{
                        display: "flex",
                        flexDirection: isMobile ? "column-reverse" : "row",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        gap: "12px",
                        marginTop: "10px",
                        position: isMobile ? "sticky" : "static",
                        bottom: isMobile ? "12px" : "auto",
                        background: isMobile ? "rgba(255,255,255,0.96)" : "transparent",
                        padding: isMobile ? "12px" : "0",
                        borderRadius: isMobile ? "16px" : "0",
                        boxShadow: isMobile ? "0 -8px 30px rgba(0,0,0,0.06)" : "none",
                        backdropFilter: isMobile ? "blur(8px)" : "none",
                        zIndex: 5,
                    }}
                >
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={step === 1 || submitStatus.loading}
                        style={{
                            ...backButtonStyle,
                            cursor: step === 1 || submitStatus.loading ? "not-allowed" : "pointer",
                            opacity: step === 1 || submitStatus.loading ? 0.5 : 1,
                        }}
                    >
                        Back
                    </button>

                    {step < 4 ? (
                        step === 3 && (
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!stepIsValid}
                                style={primaryNavButtonStyle(!stepIsValid)}
                            >
                                Review & send
                            </button>
                        )
                    ) : (
                        <button
                            type="submit"
                            disabled={submitStatus.loading}
                            style={primaryNavButtonStyle(submitStatus.loading)}
                        >
                            {submitStatus.loading ? "Sending..." : buttonText}
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}