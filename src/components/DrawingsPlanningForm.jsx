import { useEffect, useMemo, useState } from "react";
import { siteStyles } from "./Layout.jsx";

const initialFormState = {
    postcode: "",
    projectType: "",
    drawingsNeeded: [],
    otherDrawing: "",
    packageInterest: "",
    message: "",
    name: "",
    email: "",
    phone: "",
};

export default function DrawingsPlanningForm({
    endpoint = "https://formspree.io/f/mojpjokd",
    selectedPackage = "",
    buttonText = "Send project for quote review",
    title = "Request your drawings quote",
    intro = "Answer a few quick questions and we’ll review your project and guide the next step.",
}) {
    const { buttonPrimary, card } = siteStyles;

    const [form, setForm] = useState({
        ...initialFormState,
        packageInterest: selectedPackage || "",
    });

    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [submitStatus, setSubmitStatus] = useState({
        loading: false,
        success: false,
        error: "",
    });

    const totalSteps = 4;

    const projectTypes = [
        "Extension",
        "Loft Conversion",
        "Internal Reconfiguration",
    ];

    const drawingOptions = [
        "Existing drawings",
        "Proposed drawings",
        "Planning drawings",
        "Building regulations drawings",
        "Structural coordination drawings",
        "Other",
    ];

    const packageOptions = [
        "Starter Package",
        "Planning Package",
        "Technical Package",
    ];

    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            packageInterest: selectedPackage || "",
        }));
    }, [selectedPackage]);

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

    function toggleDrawing(item) {
        setForm((prev) => {
            const isSelected = prev.drawingsNeeded.includes(item);

            const updatedDrawings = isSelected
                ? prev.drawingsNeeded.filter((drawing) => drawing !== item)
                : [...prev.drawingsNeeded, item];

            return {
                ...prev,
                drawingsNeeded: updatedDrawings,
                otherDrawing: item === "Other" && isSelected ? "" : prev.otherDrawing,
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
        if (step < totalSteps) {
            setDirection(1);
            setStep((prev) => prev + 1);
        }
    }

    function prevStep() {
        if (step > 1) {
            setDirection(-1);
            setStep((prev) => prev - 1);
        }
    }

    const stepIsValid = useMemo(() => {
        if (step === 1) {
            return !!form.projectType && form.drawingsNeeded.length > 0;
        }

        if (step === 2) {
            if (form.drawingsNeeded.includes("Other") && !form.otherDrawing.trim()) {
                return false;
            }

            return !!form.message.trim();
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
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    formType: "Drawings & Planning Quote",
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    postcode: form.postcode,
                    projectType: form.projectType,
                    drawingsNeeded: form.drawingsNeeded.join(", "),
                    drawingsNeededArray: form.drawingsNeeded,
                    otherDrawing: form.otherDrawing,
                    packageInterest: form.packageInterest,
                    message: form.message,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.errors?.[0]?.message || "Something went wrong. Please try again."
                );
            }

            setSubmitStatus({
                loading: false,
                success: true,
                error: "",
            });

            setForm({
                ...initialFormState,
                packageInterest: selectedPackage || "",
            });
            setStep(1);
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
    };

    const labelStyle = {
        display: "grid",
        gap: "8px",
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
    });

    const stepButtonStyle = (active, current) => ({
        width: "36px",
        height: "36px",
        borderRadius: "999px",
        display: "grid",
        placeItems: "center",
        fontWeight: "700",
        fontSize: "14px",
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
    };

    const stepMeta = {
        1: {
            eyebrow: "Step 1",
            title: "Your project",
            text: "Tell us what kind of project you’re planning and which drawings you need.",
        },
        2: {
            eyebrow: "Step 2",
            title: "Package & project details",
            text: "Help us understand what stage you’re at and which package may be relevant.",
        },
        3: {
            eyebrow: "Step 3",
            title: "Your details",
            text: "Leave your details at the end and we’ll review your project properly.",
        },
        4: {
            eyebrow: "Step 4",
            title: "Review request",
            text: "Check everything before sending your quote request.",
        },
    };

    const progress = (step / totalSteps) * 100;
    const animationName = direction === 1 ? "slideInFromRight" : "slideInFromLeft";

    const displayDrawings = form.drawingsNeeded.length
        ? form.drawingsNeeded.join(", ")
        : "—";

    const renderStepContent = () => {
        if (step === 1) {
            return (
                <div style={{ display: "grid", gap: "18px" }}>
                    <div>
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
                            {stepMeta[1].eyebrow}
                        </p>
                        <h3 style={{ margin: "0 0 8px", fontSize: "24px" }}>
                            {stepMeta[1].title}
                        </h3>
                        <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
                            {stepMeta[1].text}
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
                        }}
                    >
                        <strong style={{ fontSize: "16px" }}>
                            Tell us about your project and select all the drawing types you need.
                        </strong>
                        <span style={{ color: "#57534e", lineHeight: "1.7" }}>
                            Many projects need more than one drawing package, so you can choose multiple options here.
                        </span>
                    </div>

                    <div style={labelStyle}>
                        <span style={{ color: "#44403c", fontWeight: "600" }}>Project type</span>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                gap: "12px",
                            }}
                        >
                            {projectTypes.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setField("projectType", item)}
                                    style={optionCardStyle(form.projectType === item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={labelStyle}>
                        <span style={{ color: "#44403c", fontWeight: "600" }}>
                            Which drawings do you need?
                        </span>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                                gap: "12px",
                            }}
                        >
                            {drawingOptions.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => toggleDrawing(item)}
                                    style={optionCardStyle(form.drawingsNeeded.includes(item))}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {form.drawingsNeeded.length > 0 && (
                        <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
                            Selected: <strong>{form.drawingsNeeded.join(", ")}</strong>
                        </p>
                    )}

                    <label style={labelStyle}>
                        <span style={{ color: "#44403c", fontWeight: "600" }}>Postcode</span>
                        <input
                            name="postcode"
                            value={form.postcode}
                            onChange={handleChange}
                            placeholder="Your postcode"
                            style={inputStyle}
                        />
                    </label>
                </div>
            );
        }

        if (step === 2) {
            return (
                <div style={{ display: "grid", gap: "18px" }}>
                    <div>
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
                            {stepMeta[2].eyebrow}
                        </p>
                        <h3 style={{ margin: "0 0 8px", fontSize: "24px" }}>
                            {stepMeta[2].title}
                        </h3>
                        <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
                            {stepMeta[2].text}
                        </p>
                    </div>

                    {form.drawingsNeeded.includes("Other") && (
                        <label style={labelStyle}>
                            <span style={{ color: "#44403c", fontWeight: "600" }}>
                                Tell us what other drawings you need
                            </span>
                            <input
                                name="otherDrawing"
                                value={form.otherDrawing}
                                onChange={handleChange}
                                placeholder="Describe any additional drawing requirements"
                                style={inputStyle}
                                required
                            />
                        </label>
                    )}

                    <div style={labelStyle}>
                        <span style={{ color: "#44403c", fontWeight: "600" }}>Package of interest</span>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                gap: "12px",
                            }}
                        >
                            {packageOptions.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setField("packageInterest", item)}
                                    style={optionCardStyle(form.packageInterest === item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label style={labelStyle}>
                        <span style={{ color: "#44403c", fontWeight: "600" }}>
                            Tell us a little about the project
                        </span>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="What are you planning, what stage are you at, and what help do you need?"
                            rows="6"
                            style={{
                                ...inputStyle,
                                resize: "vertical",
                            }}
                            required
                        />
                    </label>
                </div>
            );
        }

        if (step === 3) {
            return (
                <div style={{ display: "grid", gap: "18px" }}>
                    <div>
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
                            {stepMeta[3].eyebrow}
                        </p>
                        <h3 style={{ margin: "0 0 8px", fontSize: "24px" }}>
                            {stepMeta[3].title}
                        </h3>
                        <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
                            {stepMeta[3].text}
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                            gap: "10px",
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
                        }}
                    >
                        Leave your details and we’ll review your project and respond with the most suitable next step.
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
                        placeholder="Phone number"
                        style={inputStyle}
                    />
                </div>
            );
        }

        return (
            <div style={{ display: "grid", gap: "18px" }}>
                <div>
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
                        {stepMeta[4].eyebrow}
                    </p>
                    <h3 style={{ margin: "0 0 8px", fontSize: "24px" }}>
                        {stepMeta[4].title}
                    </h3>
                    <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
                        {stepMeta[4].text}
                    </p>
                </div>

                <div
                    style={{
                        padding: "16px",
                        borderRadius: "16px",
                        background: "#f5f5f4",
                        border: "1px solid #e7e5e4",
                    }}
                >
                    <strong style={{ display: "block", marginBottom: "6px" }}>
                        Thanks — you’ve given us enough detail to review your project properly.
                    </strong>
                    <span style={{ color: "#57534e", lineHeight: "1.7" }}>
                        We’ll use this to guide the next step and the most suitable package.
                    </span>
                </div>

                <div
                    style={{
                        border: "1px solid #e7e5e4",
                        borderRadius: "16px",
                        padding: "6px 18px",
                        background: "#fafaf9",
                    }}
                >
                    <div style={reviewItemStyle}>
                        <strong>Project type</strong>
                        <span>{form.projectType || "—"}</span>
                    </div>

                    <div style={reviewItemStyle}>
                        <strong>Drawings needed</strong>
                        <span>{displayDrawings}</span>
                    </div>

                    {form.drawingsNeeded.includes("Other") && (
                        <div style={reviewItemStyle}>
                            <strong>Other drawing requirement</strong>
                            <span>{form.otherDrawing || "—"}</span>
                        </div>
                    )}

                    <div style={reviewItemStyle}>
                        <strong>Package of interest</strong>
                        <span>{form.packageInterest || "—"}</span>
                    </div>

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

                    <div style={{ padding: "14px 0", display: "grid", gap: "4px" }}>
                        <strong>Project details</strong>
                        <span>{form.message || "—"}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <form
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

            <div>
                <h2 style={{ fontSize: "42px", marginTop: 0, marginBottom: "12px" }}>
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

            <div style={{ display: "grid", gap: "14px" }}>
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
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "10px",
                        alignItems: "center",
                    }}
                >
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                minWidth: 0,
                            }}
                        >
                            <div style={stepButtonStyle(step >= item, step === item)}>{item}</div>
                            {item < 4 && (
                                <div
                                    style={{
                                        height: "4px",
                                        background: step > item ? "#1c1917" : "#e7e5e4",
                                        borderRadius: "999px",
                                        flex: 1,
                                        transition: "background 0.2s ease",
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
                        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                        gap: "8px",
                        color: "#78716c",
                        fontSize: "13px",
                        fontWeight: "600",
                    }}
                >
                    <span>Project</span>
                    <span>Details</span>
                    <span>Contact</span>
                    <span>Review</span>
                </div>
            </div>

            <div
                key={step}
                style={{
                    animation: `${animationName} 0.35s cubic-bezier(0.22, 1, 0.36, 1)`,
                    willChange: "transform, opacity",
                }}
            >
                {renderStepContent()}
            </div>

            {submitStatus.success && (
                <p style={{ margin: 0, color: "#166534", fontWeight: "600" }}>
                    Thanks — your quote request has been sent successfully.
                </p>
            )}

            {submitStatus.error && (
                <p style={{ margin: 0, color: "#b91c1c", fontWeight: "600" }}>
                    {submitStatus.error}
                </p>
            )}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginTop: "6px",
                }}
            >
                <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1 || submitStatus.loading}
                    style={{
                        padding: "14px 20px",
                        borderRadius: "12px",
                        border: "1px solid #d6d3d1",
                        background: "#fff",
                        cursor: step === 1 ? "not-allowed" : "pointer",
                        opacity: step === 1 ? 0.5 : 1,
                        fontWeight: "600",
                    }}
                >
                    Back
                </button>

                {step < totalSteps ? (
                    <button
                        type="button"
                        onClick={nextStep}
                        disabled={!stepIsValid}
                        style={{
                            ...buttonPrimary,
                            border: "none",
                            cursor: !stepIsValid ? "not-allowed" : "pointer",
                            opacity: !stepIsValid ? 0.6 : 1,
                            boxShadow: !stepIsValid ? "none" : "0 16px 35px rgba(28,25,23,0.15)",
                        }}
                    >
                        {step === 1 && "Next: Project details"}
                        {step === 2 && "Next: Your details"}
                        {step === 3 && "Review request"}
                    </button>
                ) : (
                    <button
                        type="submit"
                        disabled={submitStatus.loading}
                        style={{
                            ...buttonPrimary,
                            border: "none",
                            cursor: submitStatus.loading ? "not-allowed" : "pointer",
                            opacity: submitStatus.loading ? 0.7 : 1,
                            boxShadow: "0 16px 35px rgba(28,25,23,0.15)",
                        }}
                    >
                        {submitStatus.loading ? "Sending..." : buttonText}
                    </button>
                )}
            </div>
        </form>
    );
}