import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { siteStyles } from "./Layout.jsx";

const initialFormState = {
    contactPreference: "schedule_callback",
    callbackDate: "",
    callbackTimeSlot: "",
    postcode: "",
    packageInterest: "",
    message: "",
    name: "",
    phone: "",
};

const callbackTimeOptions = [
    "Morning (7 AM – 12 PM)",
    "Afternoon (12 PM – 5 PM)",
    "Evening (5 PM – 8 PM)",
];

export default function DrawingsPlanningForm({
    endpoint = "https://formspree.io/f/maqlqgzz",
    selectedPackage = "",
    buttonText = "Secure My Free Strategy Session",
    title = "Get your free project strategy",
    intro = "We hate pushy sales calls as much as you do. You’ll speak directly with a practical planning strategist—just straight answers, clear package guidance, and zero pressure.",
}) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        ...initialFormState,
        packageInterest: selectedPackage || "",
    });

    const [step, setStep] = useState(1);
    const [submittedSummary, setSubmittedSummary] = useState(null);
    const [submitStatus, setSubmitStatus] = useState({
        loading: false,
        success: false,
        error: "",
    });
    const [isMobile, setIsMobile] = useState(false);

    const formTopRef = useRef(null);

    const dateBounds = useMemo(() => {
        const today = new Date();
        const oneMonthOut = new Date();
        oneMonthOut.setMonth(today.getMonth() + 1);

        const formatDate = (date) => {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            return `${yyyy}-${mm}-${dd}`;
        };

        return {
            min: formatDate(today),
            max: formatDate(oneMonthOut),
        };
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (submitStatus.success) return;
        setForm((prev) => ({
            ...prev,
            packageInterest: selectedPackage || "I'm not sure yet (Let us help guide you)",
        }));
    }, [selectedPackage, submitStatus.success]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (submitStatus.error) setSubmitStatus((prev) => ({ ...prev, error: "" }));
    }

    function setField(name, value) {
        setForm((prev) => ({ ...prev, [name]: value }));
        if (submitStatus.error) setSubmitStatus((prev) => ({ ...prev, error: "" }));
    }

    // --- REVERSED PROGRESSIVE STEP VALIDATION LOGIC ---
    const isStep1Valid = useMemo(() => !!form.callbackDate && !!form.callbackTimeSlot, [form.callbackDate, form.callbackTimeSlot]);
    const isStep2Valid = useMemo(() => !!form.name.trim() && !!form.phone.trim(), [form.name, form.phone]);

    const formIsValid = useMemo(() => isStep1Valid && isStep2Valid, [isStep1Valid, isStep2Valid]);

    const trackConversionEvent = (eventName, params = {}) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: eventName, ...params });
        if (typeof window.gtag === "function") {
            window.gtag("event", eventName, params);
        }
    };

    const formattedDisplayDate = useMemo(() => {
        if (!form.callbackDate) return "";
        const parsedDate = new Date(form.callbackDate);
        return parsedDate.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
        });
    }, [form.callbackDate]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formIsValid) return;

        setSubmitStatus({ loading: true, success: false, error: "" });

        try {
            const payload = {
                formType: "Drawings Callback Request",
                contactPreference: form.contactPreference,
                packageInterest: form.packageInterest || "None Selected",
                name: form.name,
                phone: form.phone,
                postcode: form.postcode,
                message: form.message,
                preferredDate: form.callbackDate,
                preferredTimeSlot: form.callbackTimeSlot,
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

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.errors?.[0]?.message || "Something went wrong. Please try again.");
            }

            setSubmittedSummary({
                ...form,
                displayDate: formattedDisplayDate,
            });
            setSubmitStatus({ loading: false, success: true, error: "" });

            trackConversionEvent("form_submission_success", {
                contact_preference: form.contactPreference,
                package_interest: form.packageInterest || "None Selected",
            });

        } catch (error) {
            setSubmitStatus({
                loading: false,
                success: false,
                error: error.message || "Something went wrong. Please try again.",
            });
        }
    }

    const cardStyle = {
        padding: "24px",
        borderRadius: "24px",
        background: "#fff",
        border: "1px solid #e7e5e4",
        boxSizing: "border-box",
    };

    const buttonPrimaryStyle = {
        background: "#1c1917",
        color: "#fff",
        padding: "14px 24px",
        borderRadius: "14px",
        border: "none",
        fontSize: "15px",
        fontWeight: "700",
        cursor: "pointer",
        width: "100%",
        boxSizing: "border-box",
        transition: "background 0.2s ease",
    };

    const buttonSecondaryStyle = {
        background: "#f5f5f4",
        color: "#1c1917",
        padding: "14px 24px",
        borderRadius: "14px",
        border: "1px solid #d6d3d1",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
    };

    const inputStyle = {
        width: "100%",
        padding: "14px 16px",
        borderRadius: "14px",
        border: "1px solid #ddd6ce",
        fontSize: "15px",
        boxSizing: "border-box",
        background: "#fff",
        outline: "none",
        maxWidth: "100%",
        color: "#1c1917"
    };

    const labelStyle = { display: "grid", gap: "6px", minWidth: 0 };

    const optionCardStyle = (active, isWhatsApp = false) => ({
        padding: "16px",
        borderRadius: "16px",
        border: active ? (isWhatsApp ? "1px solid #25D366" : "1px solid #1c1917") : "1px solid #ddd6ce",
        background: active ? (isWhatsApp ? "#f0fdf4" : "#f5f5f4") : "#fff",
        color: "#1f1f1f",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "15px",
        textAlign: "left",
        transition: "all 0.22s ease",
        transform: active ? "translateY(-2px)" : "translateY(0)",
        boxShadow: active ? "0 14px 30px rgba(28,25,23,0.08)" : "0 1px 2px rgba(0,0,0,0.03)",
        width: "100%",
        boxSizing: "border-box",
    });

    if (submitStatus.success && submittedSummary) {
        return (
            <div style={{ ...cardStyle, display: "grid", gap: "24px", padding: "28px" }}>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#166534", color: "#fff", display: "grid", placeItems: "center", fontSize: "28px" }}>✓</div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: "24px", color: "#14532d" }}>Strategy Session Scheduled</h2>
                        <p style={{ margin: "4px 0 0", color: "#166534", fontSize: "14px" }}>
                            We will ring you back on {submittedSummary.displayDate} during the {submittedSummary.callbackTimeSlot.toLowerCase()}.
                        </p>
                    </div>
                </div>

                <div style={{ borderTop: "1px solid #e7e5e4", paddingTop: "14px" }}>
                    <h4 style={{ margin: "0 0 10px", fontSize: "15px" }}>Submission Summary</h4>
                    <div style={{ background: "#fafaf9", padding: "14px", borderRadius: "12px", display: "grid", gap: "8px", fontSize: "14px" }}>
                        <div><strong>Client Name:</strong> {submittedSummary.name}</div>
                        <div><strong>Linked Phone Line:</strong> {submittedSummary.phone}</div>
                        <div><strong>Target Track:</strong> {submittedSummary.packageInterest}</div>
                        <div><strong>Arranged Date:</strong> {submittedSummary.displayDate} ({submittedSummary.callbackTimeSlot})</div>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button type="button" onClick={() => { setSubmittedSummary(null); setSubmitStatus({ loading: false, success: false, error: "" }); setForm({ ...initialFormState }); setStep(1); }} style={buttonSecondaryStyle}>Schedule Another Call</button>
                    <button type="button" onClick={() => navigate("/")} style={buttonPrimaryStyle}>Return to Home</button>
                </div>
            </div>
        );
    }

    return (
        <form ref={formTopRef} onSubmit={handleSubmit} style={{ ...cardStyle, display: "grid", gap: "22px", width: "100%", position: "relative" }}>
            <div style={{ minWidth: 0 }}>
                <h2 style={{ fontSize: isMobile ? "28px" : "36px", marginTop: 0, marginBottom: "8px", fontWeight: "800" }}>{title}</h2>
                {intro && <p style={{ color: "#57534e", fontSize: "14px", margin: 0, lineHeight: "1.5" }}>{intro}</p>}
            </div>

            <div style={{ textAlign: "center", padding: "2px 0" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#A67C00", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Opening Hours: Mon–Sat 7AM–8PM
                </span>
            </div>

            {/* --- PROGRESS INDICATOR DOTS --- */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", margin: "2px 0" }}>
                <div style={{ width: "24px", height: "6px", borderRadius: "999px", background: step === 1 ? "#A67C00" : "#ece7df", transition: "all 0.2s" }} />
                <div style={{ width: "24px", height: "6px", borderRadius: "999px", background: step === 2 ? "#A67C00" : "#ece7df", transition: "all 0.2s" }} />
            </div>

            {/* --- PRIMARY MULTI-STEP ENGINE --- */}
            <div style={{ display: "grid", gap: "16px", background: "#fdfdfc", padding: isMobile ? "16px" : "20px", borderRadius: "20px", border: "1px solid #f5f2eb" }}>

                {/* STEP 1: INITIAL APPOINTMENT SELECTION MATRIX */}
                {step === 1 && (
                    <div style={{ display: "grid", gap: "14px", animation: "faqFadeDown 0.25s ease-out" }}>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: "#1c1917" }}>Step 1: Choose Callback Arrangement</div>

                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px", marginTop: "4px" }}>
                            <div style={labelStyle}>
                                <label htmlFor="callbackDate" style={{ fontWeight: "700", fontSize: "13px", color: "#44403c" }}>Preferred Callback Date</label>
                                <input
                                    id="callbackDate"
                                    type="date"
                                    name="callbackDate"
                                    min={dateBounds.min}
                                    max={dateBounds.max}
                                    value={form.callbackDate}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    required
                                />
                            </div>

                            <div style={labelStyle}>
                                <span style={{ fontWeight: "700", fontSize: "13px", color: "#44403c" }}>Preferred Time Window</span>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "6px" }}>
                                    {callbackTimeOptions.map((time) => (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => setField("callbackTimeSlot", time)}
                                            style={{
                                                ...optionCardStyle(form.callbackTimeSlot === time),
                                                padding: "10px 14px",
                                                fontSize: "13px",
                                                borderRadius: "10px"
                                            }}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={!isStep1Valid}
                            onClick={() => setStep(2)}
                            style={{
                                ...buttonPrimaryStyle,
                                background: !isStep1Valid ? '#a8a29e' : '#1c1917',
                                cursor: !isStep1Valid ? 'not-allowed' : 'pointer',
                                marginTop: "10px"
                            }}
                        >
                            Continue to Personal Information
                        </button>
                    </div>
                )}

                {/* STEP 2: ACCOUNT ASSIGNMENT & DATA CAPTURE */}
                {step === 2 && (
                    <div style={{ display: "grid", gap: "14px", animation: "faqFadeDown 0.25s ease-out" }}>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: "#1c1917" }}>Step 2: Confirm Information</div>

                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px" }}>
                            <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle} required autoComplete="name" />
                            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Primary phone line number" style={inputStyle} required type="tel" autoComplete="tel" />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", gap: "14px" }}>
                            <input name="postcode" value={form.postcode} onChange={handleChange} placeholder="Project site postcode" style={inputStyle} autoComplete="postal-code" />
                            <select
                                id="packageInterestDropdown"
                                name="packageInterest"
                                value={form.packageInterest}
                                onChange={handleChange}
                                style={{ ...inputStyle, cursor: "pointer" }}
                            >
                                <option value="Starter Package">Starter Package — From £950</option>
                                <option value="Planning Package">Planning Package — From £1250</option>
                                <option value="Technical Package">Technical Package — From £1650</option>
                                <option value="Bespoke Package">Bespoke Package — POA</option>
                                <option value="I'm not sure yet (Let us help guide you)">I'm not sure yet (Let us help guide you)</option>
                            </select>
                        </div>

                        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Briefly describe your property goals or design layout notes (Optional)" rows="2" style={{ ...inputStyle, resize: "vertical", marginTop: "4px" }} />

                        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                            <button type="button" onClick={() => setStep(1)} style={{ ...buttonSecondaryStyle, width: "35%", borderRadius: "14px" }}>Back</button>
                            <button
                                type="submit"
                                disabled={!formIsValid || submitStatus.loading}
                                style={{
                                    ...buttonPrimaryStyle,
                                    width: "65%",
                                    background: !formIsValid ? '#a8a29e' : '#1c1917',
                                    cursor: !formIsValid ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {submitStatus.loading ? "Processing..." : buttonText}
                            </button>
                        </div>
                    </div>
                )}

                {submitStatus.error && <p style={{ color: "#b91c1c", fontWeight: "600", fontSize: "14px", margin: "8px 0 0", textAlign: "center" }}>{submitStatus.error}</p>}
            </div>

            {/* --- SEPARATOR LINE --- */}
            <div style={{ display: "flex", alignItems: "center", textTransform: "uppercase", fontSize: "13px", fontWeight: "800", color: "#78716c", margin: "4px 0" }}>
                <div style={{ flex: 1, height: "1px", background: "#e7e5e4" }} />
                <span style={{ padding: "0 16px", letterSpacing: "1px" }}>OR</span>
                <div style={{ flex: 1, height: "1px", background: "#e7e5e4" }} />
            </div>

            {/* --- DIRECT ESCAPE FLOATING ROUTES --- */}
            <div style={{ display: "grid", gap: "12px" }}>
                <a
                    href="tel:02036335634"
                    onClick={() => trackConversionEvent("click_to_call", { method: "Enquiry Form Instant Call Bypass" })}
                    style={{ ...optionCardStyle(false), textDecoration: "none", display: "block" }}
                >
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <span style={{ fontSize: "22px" }}>☎</span>
                        <div>
                            <div style={{ fontSize: "15px", fontWeight: "700" }}>Call our planning office line directly now</div>
                            <div style={{ fontSize: "12px", fontWeight: "400", color: "#57534e", marginTop: "1px" }}>
                                Dial 0203 633 5634 for instant advice and layout consultations.
                            </div>
                        </div>
                    </div>
                </a>

                <a
                    href={`https://wa.me/447858815820?text=Hi%20Crafman,%20I'd%20like%20to%20discuss%20a%20free%20planning%20and%20architectural%20drawings%20consultation%20for%20my%20property${form.packageInterest && !form.packageInterest.includes("not sure") ? `%20regarding%20the%20${encodeURIComponent(form.packageInterest)}` : ''}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversionEvent("whatsapp_click", { package_interest: form.packageInterest || "None Selected" })}
                    style={{ ...optionCardStyle(false, true), textDecoration: "none", display: "block" }}
                >
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="#25D366">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.447 5.36 1.448 5.517 0 10.003-4.479 10.006-9.994.001-2.672-1.03-5.184-2.903-7.06C17.18 1.67 14.685 1.04 12.012 1.04c-5.526 0-10.01 4.484-10.014 10.001-.001 2.124.566 4.135 1.644 5.943l-.995 3.633 3.744-.973zm13.102-6.42c-.299-.15-1.772-.875-2.046-.975-.275-.102-.475-.15-.675.15-.2.299-.775.975-.95 1.174-.175.2-.35.226-.65.075-1.207-.604-2.115-.98-2.964-2.433-.225-.386.225-.359.644-1.196.112-.224.056-.423-.028-.574-.084-.15-.675-1.626-.925-2.228-.243-.585-.491-.507-.675-.516-.174-.008-.374-.01-.574-.01-.2 0-.526.075-.802.374-.275.3-.1.524 1.05 1.349.113.149.224.299.374.423.824.675 1.822 1.147 2.896 1.622.3.15.524.225.774.15.249-.075.772-.324.872-.649.1-.324.1-.599.075-.649-.03-.05-.125-.075-.425-.226z" />
                        </svg>
                        <div>
                            <div style={{ fontSize: "15px", fontWeight: "700", color: "#128C7E" }}>Chat via WhatsApp now</div>
                            <div style={{ fontSize: "12px", fontWeight: "400", color: "#57534e", marginTop: "1px" }}>
                                Instant text routing — skip filling out forms entirely.
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </form>
    );
}