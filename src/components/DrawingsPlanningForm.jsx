import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Phone, ShieldCheck, MapPin, User, Loader2, Sparkles, Check } from "lucide-react";

// =====================================================================================
// 🎯 GOOGLE ADS & TRACKING MATRIX
// =====================================================================================
const GOOGLE_ADS_CONFIG = {
    FORM_SUCCESS_SEND_TO: "AW-18466429796",
    CALL_CLICK_SEND_TO: "AW-18466429796/HPHiCIbN6oMdEOS2veVE",
    WHATSAPP_SEND_TO: "",
};

export default function DrawingsPlanningForm({
    endpoint = "https://formspree.io/f/maqlqgzz",
    selectedPackage = "",
    buttonText = "Get Free Project Strategy",
    title = "Get your free project strategy",
    intro = "No pushy sales reps. Speak directly with a local architectural designer about planning rules, feasibility, and costs.",
}) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        postcode: "",
    });

    const [submitStatus, setSubmitStatus] = useState({
        loading: false,
        error: "",
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (submitStatus.error) setSubmitStatus((prev) => ({ ...prev, error: "" }));
    }

    const formIsValid = form.name.trim() && form.phone.trim() && form.postcode.trim();

    const trackConversionEvent = (eventName, params = {}) => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: eventName, ...params });
            if (typeof window.gtag === "function") {
                window.gtag("event", eventName, params);
            }
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formIsValid) return;

        trackConversionEvent("lead_form_submit_attempt", {
            package_interest: selectedPackage || "General Enquiry",
            postcode: form.postcode.toUpperCase().trim(),
        });

        setSubmitStatus({ loading: true, error: "" });

        try {
            const payload = {
                formType: "North London Architectural Lead Form",
                name: form.name.trim(),
                phone: form.phone.trim(),
                postcode: form.postcode.toUpperCase().trim(),
                packageInterest: selectedPackage || "Not Specified",
            };

            const response = await fetch(endpoint, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const result = await response.json().catch(() => null);
                throw new Error(result?.errors?.[0]?.message || "Submission failed. Please try again.");
            }

            trackConversionEvent("form_submission_success", {
                client_name: form.name.trim(),
                client_phone: form.phone.trim(),
                client_postcode: form.postcode.toUpperCase().trim(),
                package_interest: selectedPackage || "General Enquiry",
            });

            if (typeof window !== "undefined" && typeof window.gtag === "function") {
                window.gtag("event", "conversion", {
                    send_to: GOOGLE_ADS_CONFIG.FORM_SUCCESS_SEND_TO,
                });
            }

            navigate("/craffy-thank-you", {
                state: {
                    name: form.name.trim(),
                    phone: form.phone.trim(),
                    postcode: form.postcode.toUpperCase().trim(),
                    source: "North London Architectural Form",
                },
            });
        } catch (error) {
            setSubmitStatus({
                loading: false,
                error: error.message || "Something went wrong. Please call us directly.",
            });
        }
    }

    return (
        <form
            id="contact-form"
            onSubmit={handleSubmit}
            style={{
                width: "100%",
                maxWidth: "520px",
                margin: "0 auto",
                background: "linear-gradient(165deg, #201e17 0%, #151818 45%, #101212 100%)",
                borderRadius: "20px",
                padding: isMobile ? "24px 20px" : "32px 28px",
                border: "1px solid rgba(198, 162, 67, 0.35)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(198, 162, 67, 0.15)",
                boxSizing: "border-box",
                display: "grid",
                gap: "18px",
                position: "relative",
            }}
        >
            {/* Header Block */}
            <div style={{ textAlign: "left" }}>
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor: "rgba(198, 162, 67, 0.15)",
                        border: "1px solid rgba(198, 162, 67, 0.35)",
                        color: "#E8CB82",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "850",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                    }}
                >
                    <Sparkles size={13} color="#E8CB82" />
                    <span>Free Feasibility Review</span>
                </div>

                <h3
                    style={{
                        margin: "0 0 8px 0",
                        fontSize: isMobile ? "22px" : "26px",
                        fontWeight: "900",
                        color: "#FAF9F5",
                        letterSpacing: "-0.5px",
                        lineHeight: "1.2",
                    }}
                >
                    {title || "Get your free project strategy"}
                </h3>

                {intro && (
                    <p
                        style={{
                            margin: 0,
                            fontSize: "13.5px",
                            color: "#b8bcb8",
                            lineHeight: "1.55",
                        }}
                    >
                        {intro}
                    </p>
                )}
            </div>

            {/* Context Badge (if clicked from a package button) */}
            {selectedPackage && (
                <div
                    style={{
                        backgroundColor: "#1c201f",
                        border: "1px solid rgba(198, 162, 67, 0.3)",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "12px",
                    }}
                >
                    <span style={{ color: "#aeb2ae", fontWeight: "600" }}>Selected Package:</span>
                    <strong style={{ color: "#E8CB82" }}>{selectedPackage}</strong>
                </div>
            )}

            {/* 3 Core Fields Only */}
            <div style={{ display: "grid", gap: "14px" }}>
                <div>
                    <label
                        htmlFor="lead-name"
                        style={{
                            display: "block",
                            fontSize: "11.5px",
                            fontWeight: "800",
                            color: "#e2e0d7",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            marginBottom: "6px",
                        }}
                    >
                        Your Name *
                    </label>
                    <div style={{ position: "relative" }}>
                        <input
                            id="lead-name"
                            type="text"
                            name="name"
                            required
                            autoComplete="name"
                            placeholder="e.g. David Miller"
                            value={form.name}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <User size={16} color="#d4ad4c" style={styles.inputIcon} />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="lead-phone"
                        style={{
                            display: "block",
                            fontSize: "11.5px",
                            fontWeight: "800",
                            color: "#e2e0d7",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            marginBottom: "6px",
                        }}
                    >
                        Phone Number *
                    </label>
                    <div style={{ position: "relative" }}>
                        <input
                            id="lead-phone"
                            type="tel"
                            name="phone"
                            required
                            autoComplete="tel"
                            placeholder="07123 456789"
                            value={form.phone}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <Phone size={16} color="#d4ad4c" style={styles.inputIcon} />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="lead-postcode"
                        style={{
                            display: "block",
                            fontSize: "11.5px",
                            fontWeight: "800",
                            color: "#e2e0d7",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            marginBottom: "6px",
                        }}
                    >
                        Project Postcode *
                    </label>
                    <div style={{ position: "relative" }}>
                        <input
                            id="lead-postcode"
                            type="text"
                            name="postcode"
                            required
                            autoComplete="postal-code"
                            placeholder="e.g. EN5 4HJ, IG10 4PE, N10 3BL"
                            value={form.postcode}
                            onChange={handleChange}
                            style={{ ...styles.input, textTransform: "uppercase" }}
                        />
                        <MapPin size={16} color="#d4ad4c" style={styles.inputIcon} />
                    </div>
                </div>
            </div>

            {submitStatus.error && (
                <div
                    style={{
                        padding: "10px",
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "10px",
                        color: "#fca5a5",
                        fontSize: "12.5px",
                        textAlign: "center",
                    }}
                >
                    {submitStatus.error}
                </div>
            )}

            {/* Signature Gold Gradient Button */}
            <button
                type="submit"
                disabled={!formIsValid || submitStatus.loading}
                style={{
                    background: formIsValid
                        ? "linear-gradient(115deg, #b28a2b, #e1be69)"
                        : "#2a2d2d",
                    color: formIsValid ? "#15120a" : "#71717a",
                    border: "none",
                    borderRadius: "10px",
                    padding: "16px 20px",
                    fontSize: "14.5px",
                    fontWeight: "850",
                    cursor: formIsValid && !submitStatus.loading ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    transition: "all 0.2s ease",
                    boxShadow: formIsValid ? "0 8px 25px rgba(178, 138, 43, 0.35)" : "none",
                }}
            >
                {submitStatus.loading ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Connecting to Architectural Lead...</span>
                    </>
                ) : (
                    <>
                        <span>{buttonText}</span>
                        <ArrowRight size={17} />
                    </>
                )}
            </button>

            {/* Trust Assurances */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "11.5px",
                    color: "#aeb2ae",
                    paddingTop: "2px",
                    flexWrap: "wrap",
                }}
            >
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <ShieldCheck size={14} color="#E8CB82" /> No pushy calls
                </span>
                <span>•</span>
                <span>⚡ 15-min callback</span>
                <span>•</span>
                <span>Fixed price guarantee</span>
            </div>

            {/* Separator */}
            <div style={{ display: "flex", alignItems: "center", margin: "2px 0" }}>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(232, 203, 130, 0.15)" }} />
                <span style={{ padding: "0 10px", fontSize: "10.5px", fontWeight: "800", color: "#786843" }}>OR</span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(232, 203, 130, 0.15)" }} />
            </div>

            {/* Direct Bypass Routes */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <a
                    href="tel:02081914122"
                    onClick={() => {
                        trackConversionEvent("click_to_call", { method: "3-Field Form Header Call" });
                        if (typeof window !== "undefined" && typeof window.gtag === "function") {
                            window.gtag("event", "conversion", { send_to: GOOGLE_ADS_CONFIG.CALL_CLICK_SEND_TO });
                        }
                    }}
                    style={styles.quickContactBtn}
                >
                    <Phone size={14} color="#E8CB82" />
                    <span>020 8191 4122</span>
                </a>

                <a
                    href={`https://wa.me/447858815820?text=Hi%20Crafman,%20I'd%20like%20to%20discuss%20architectural%20drawings%20for%20my%20property.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversionEvent("whatsapp_click", { source: "3-Field Form" })}
                    style={{ ...styles.quickContactBtn, color: "#4ade80" }}
                >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="#4ade80">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.447 5.36 1.448 5.517 0 10.003-4.479 10.006-9.994.001-2.672-1.03-5.184-2.903-7.06C17.18 1.67 14.685 1.04 12.012 1.04c-5.526 0-10.01 4.484-10.014 10.001-.001 2.124.566 4.135 1.644 5.943l-.995 3.633 3.744-.973zm13.102-6.42c-.299-.15-1.772-.875-2.046-.975-.275-.102-.475-.15-.675.15-.2.299-.775.975-.95 1.174-.175.2-.35.226-.65.075-1.207-.604-2.115-.98-2.964-2.433-.225-.386.225-.359.644-1.196.112-.224.056-.423-.028-.574-.084-.15-.675-1.626-.925-2.228-.243-.585-.491-.507-.675-.516-.174-.008-.374-.01-.574-.01-.2 0-.526.075-.802.374-.275.3-.1.524 1.05 1.349.113.149.224.299.374.423.824.675 1.822 1.147 2.896 1.622.3.15.524.225.774.15.249-.075.772-.324.872-.649.1-.324.1-.599.075-.649-.03-.05-.125-.075-.425-.226z" />
                    </svg>
                    <span>WhatsApp</span>
                </a>
            </div>
        </form>
    );
}

const styles = {
    input: {
        width: "100%",
        padding: "13px 14px 13px 40px",
        borderRadius: "10px",
        border: "1px solid rgba(232, 203, 130, 0.25)",
        fontSize: "14.5px",
        color: "#FAF9F5",
        backgroundColor: "#111414",
        outline: "none",
        boxSizing: "border-box",
        transition: "all 0.2s ease",
    },
    inputIcon: {
        position: "absolute",
        left: "14px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
    },
    quickContactBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "7px",
        padding: "11px",
        backgroundColor: "#191c1c",
        border: "1px solid rgba(232, 203, 130, 0.2)",
        borderRadius: "8px",
        color: "#f3f3ed",
        fontSize: "12.5px",
        fontWeight: "800",
        textDecoration: "none",
        transition: "all 0.2s ease",
    },
};