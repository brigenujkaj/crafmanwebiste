import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { siteStyles } from "./Layout.jsx";

const initialFormState = {
    contactPreference: "", 
    callbackDate: "",
    callbackTimeSlot: "",
    postcode: "",
    serviceInterest: "",
    message: "",
    name: "",
    phone: "",
};

const callbackTimeOptions = [
    "Morning (7 AM – 12 PM)",
    "Afternoon (12 PM – 5 PM)",
    "Evening (5 PM – 8 PM)",
];

export default function LandscapingConsultationForm({
    endpoint = "https://formspree.io/f/mnjlqwgn",
    selectedTier = "",
    buttonText = "Confirm My Consultation",
    title = "",
    intro = "We hate pushy sales calls as much as you do. You'll consult directly with a practical landscape site technician—just straight answers, clear configuration data, and zero pressure.",
}) {
    const { buttonPrimary, buttonSecondary, card } = siteStyles;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        ...initialFormState,
        serviceInterest: selectedTier || "",
    });

    const [submittedSummary, setSubmittedSummary] = useState(null);
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [submitStatus, setSubmitStatus] = useState({
        loading: false,
        success: false,
        error: "",
    });
    const [isMobile, setIsMobile] = useState(false);

    const formTopRef = useRef(null);

    // 💎 FIXED SCROLLING INTERCEPTOR
    const prevStepRef = useRef(step);

    useLayoutEffect(() => {
        if (prevStepRef.current !== step) {
            prevStepRef.current = step;
            const timeout = setTimeout(() => {
                if (formTopRef.current) {
                    const HEADER_OFFSET = window.innerWidth <= 768 ? 90 : 110;
                    const y = formTopRef.current.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
                    window.scrollTo({ top: y, behavior: "smooth" });
                }
            }, 60);
            return () => clearTimeout(timeout);
        }
    }, [step]);

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
        if (!selectedTier || submitStatus.success) return;
        setForm((prev) => ({
            ...prev,
            serviceInterest: selectedTier,
        }));
    }, [selectedTier, submitStatus.success]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (submitStatus.error) setSubmitStatus((prev) => ({ ...prev, error: "" }));
    }

    function setField(name, value) {
        setForm((prev) => ({ ...prev, [name]: value }));
        if (submitStatus.error) setSubmitStatus((prev) => ({ ...prev, error: "" }));
    }

    function nextStep() {
        setDirection(1);
        setStep((prev) => prev + 1);
    }

    function prevStep() {
        setDirection(-1);
        setStep((prev) => prev - 1);
    }

    const maxSteps = 3;

    const stepIsValid = useMemo(() => {
        if (step === 1) return !!form.contactPreference;
        if (step === 2) return !!form.callbackDate && !!form.callbackTimeSlot;
        if (step === 3) return !!form.name.trim() && !!form.phone.trim() && !!form.postcode.trim();
        return true;
    }, [step, form]);

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
        setSubmitStatus({ loading: true, success: false, error: "" });

        try {
            const payload = {
                formType: "Bespoke Landscaping Inquiry",
                contactPreference: form.contactPreference,
                chosenFocus: form.serviceInterest || "General Layout Inquiry",
                name: form.name,
                phone: form.phone,
                postcode: form.postcode,
                message: form.message,
                preferredDate: form.callbackDate,
                preferredTimeSlot: form.callbackTimeSlot,
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
                throw new Error(result?.errors?.[0]?.message || "Something went wrong. Please try again.");
            }

            setSubmittedSummary({
                ...form,
                displayDate: formattedDisplayDate,
            });
            setSubmitStatus({ loading: false, success: true, error: "" });

            trackConversionEvent("bespoke_landscape_submit", {
                contact_preference: form.contactPreference,
                chosen_focus: form.serviceInterest || "General Layout Inquiry",
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
    };

    const labelStyle = { display: "grid", gap: "8px", minWidth: 0 };

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

    const renderProgressHeader = () => {
        if (!form.contactPreference || form.contactPreference === "call_now") return null;
        return (
            <div style={{ display: "grid", gap: "12px", padding: isMobile ? "14px" : "16px 18px", borderRadius: "16px", background: "#fafaf9", border: "1px solid #ece7df" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#1f1f1f" }}>Connect with our engineering team</div>
                    <div style={{ fontSize: "13px", color: "#78716c", fontWeight: "600" }}>
                        Step {step} of {maxSteps}
                    </div>
                </div>
                <div style={{ width: "100%", height: "6px", background: "#e7e5e4", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{ width: `${(step / maxSteps) * 100}%`, height: "100%", background: "#1c1917", transition: "width 0.3s ease" }} />
                </div>
            </div>
        );
    };

    const renderStepContent = () => {
        if (step === 1) {
            return (
                <div style={{ display: "grid", gap: "20px" }}>
                    <div style={{ textAlign: "center", padding: "4px 0" }}>
                        <span style={{ fontSize: "13px", fontWeight: "700", color: "#A67C00", textTransform: "uppercase", letterSpacing: "1px" }}>
                            Desk Operations Open: Mon–Sat 7AM–8PM
                        </span>
                    </div>

                    {form.serviceInterest && (
                        <div style={{ padding: "12px 14px", borderRadius: "12px", background: "#f8f5ef", border: "1px solid #eadfcb", fontSize: "14px", color: "#44403c" }}>
                            Identified Focus Base: <strong>{form.serviceInterest}</strong>
                        </div>
                    )}

                    <div style={{ display: "grid", gap: "14px" }}>
                        <button
                            type="button"
                            onClick={() => setField("contactPreference", "call_now")}
                            style={optionCardStyle(form.contactPreference === "call_now")}
                        >
                            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                <span style={{ fontSize: "24px" }}>☎</span>
                                <div>
                                    <div style={{ fontSize: "16px", fontWeight: "700" }}>Call our estimator line directly now</div>
                                    <div style={{ fontSize: "13px", fontWeight: "400", color: "#57534e", marginTop: "2px" }}>
                                        Instant routing — discuss scope metrics straight over the phone.
                                    </div>
                                </div>
                            </div>
                        </button>

                        <a
                            href={`https://wa.me/447858815820?text=Hi%20Crafman,%20I'd%20like%20to%20arrange%20a%20turnkey%20bespoke%20landscaping%20survey%20for%20my%20property${form.serviceInterest ? `%20focusing%20on%20${encodeURIComponent(form.serviceInterest)}` : ''}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                trackConversionEvent("whatsapp_landscape_click", {
                                    chosen_focus: form.serviceInterest || "General Layout Inquiry"
                                });
                            }}
                            style={{ ...optionCardStyle(false, true), textDecoration: "none", display: "block" }}
                        >
                            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="#25D366">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.447 5.36 1.448 5.517 0 10.003-4.479 10.006-9.994.001-2.672-1.03-5.184-2.903-7.06C17.18 1.67 14.685 1.04 12.012 1.04c-5.526 0-10.01 4.484-10.014 10.001-.001 2.124.566 4.135 1.644 5.943l-.995 3.633 3.744-.973zm13.102-6.42c-.299-.15-1.772-.875-2.046-.975-.275-.102-.475-.15-.675.15-.2.299-.775.975-.95 1.174-.175.2-.35.226-.65.075-1.207-.604-2.115-.98-2.964-2.433-.225-.386.225-.359.644-1.196.112-.224.056-.423-.028-.574-.084-.15-.675-1.626-.925-2.228-.243-.585-.491-.507-.675-.516-.174-.008-.374-.01-.574-.01-.2 0-.526.075-.802.374-.275.3-.1.524 1.05 1.349.113.149.224.299.374.423.824.675 1.822 1.147 2.896 1.622.3.15.524.225.774.15.249-.075.772-.324.872-.649.1-.324.1-.599.075-.649-.03-.05-.125-.075-.425-.226z"/>
                                </svg>
                                <div>
                                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#128C7E" }}>Chat via WhatsApp Securely</div>
                                    <div style={{ fontSize: "13px", fontWeight: "400", color: "#57534e", marginTop: "2px" }}>
                                        Instant text routing — dispatch blueprint ideas over message hooks.
                                    </div>
                                </div>
                            </div>
                        </a>

                        <button
                            type="button"
                            onClick={() => {
                                setForm((prev) => ({ ...prev, contactPreference: "schedule_callback" }));
                                setDirection(1);
                                setStep(2);
                            }}
                            style={optionCardStyle(form.contactPreference === "schedule_callback")}
                        >
                            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                <span style={{ fontSize: "24px" }}>📅</span>
                                <div>
                                    <div style={{ fontSize: "16px", fontWeight: "700" }}>Schedule a preferred callback survey</div>
                                    <div style={{ fontSize: "13px", fontWeight: "400", color: "#57534e", marginTop: "2px" }}>
                                        Lock in a specific date frame across the upcoming month.
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>

                    {form.contactPreference === "call_now" && (
                        <div style={{ marginTop: "12px", padding: "20px", background: "#fcfbf8", borderRadius: "16px", border: "2px dashed #A67C00", textAlign: "center" }}>
                            <h4 style={{ margin: "0 0 6px", color: "#1f1f1f", fontSize: "18px", fontWeight: "800" }}>Zero Data Entry Demanded</h4>
                            <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#57534e", lineHeight: "1.5" }}>
                                Connect directly with our hardscaping estimation desk to map layouts out manually.
                            </p>
                            <a
                                href="tel:02036335634"
                                onClick={() => {
                                    trackConversionEvent("direct_landscape_phone_click", {
                                        service_interest: form.serviceInterest || "General Landscape Interest"
                                    });
                                }}
                                style={{
                                    ...buttonPrimaryStyle,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    background: "linear-gradient(135deg, #A67C00, #C6A243)",
                                    border: "none",
                                    textDecoration: "none",
                                    color: "#fff",
                                    fontSize: "16px",
                                    fontWeight: "800",
                                    padding: "14px 28px",
                                    borderRadius: "12px",
                                    boxShadow: "0 8px 20px rgba(166,124,0,0.2)"
                                }}
                            >
                                📞 Call 0203 633 5634
                            </a>
                        </div>
                    )}
                </div>
            );
        }

        if (form.contactPreference === "schedule_callback") {
            if (step === 2) {
                return (
                    <div style={{ display: "grid", gap: "20px" }}>
                        <div>
                            <h3 style={{ margin: "0 0 6px", fontSize: "20px" }}>Select survey target timelines</h3>
                            <p style={{ margin: 0, color: "#57534e", fontSize: "14px" }}>Choose any convenient date within 30 operational days.</p>
                        </div>
                        
                        <div style={labelStyle}>
                            <label htmlFor="callbackDate" style={{ fontWeight: "700", fontSize: "14px", color: "#1f1f1f" }}>Preferred Survey Date</label>
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
                            <span style={{ fontWeight: "700", fontSize: "14px", color: "#1f1f1f" }}>Ideal Allocation Window</span>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
                                {callbackTimeOptions.map((time) => (
                                    <button key={time} type="button" onClick={() => setField("callbackTimeSlot", time)} style={optionCardStyle(form.callbackTimeSlot === time)}>
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }

            if (step === 3) {
                return (
                    <div style={{ display: "grid", gap: "18px" }}>
                        <div>
                            <h3 style={{ margin: "0 0 6px", fontSize: "20px" }}>Your information</h3>
                            <p style={{ margin: 0, color: "#57534e", fontSize: "14px" }}>Provide your contact parameters to secure your callback reference window.</p>
                        </div>
                        {form.serviceInterest && (
                            <div style={{ padding: "10px 12px", background: "#fafaf9", borderRadius: "10px", border: "1px solid #e7e5e4", fontSize: "13px", color: "#78716c" }}>
                                Tracked Specification: <strong>{form.serviceInterest}</strong>
                            </div>
                        )}
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle} required />
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Primary phone number" style={inputStyle} required />
                        <input name="postcode" value={form.postcode} onChange={handleChange} placeholder="Project site postcode" style={inputStyle} required />
                        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Briefly specify special access restrictions, layout preferences, or custom patio sizes (Optional)" rows="4" style={{ ...inputStyle, resize: "vertical" }} />
                    </div>
                );
            }
        }
    };

    if (submitStatus.success && submittedSummary) {
        return (
            <div style={{ ...cardStyle, display: "grid", gap: "24px", padding: "28px" }}>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#166534", color: "#fff", display: "grid", placeItems: "center", fontSize: "28px" }}>✓</div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: "24px", color: "#14532d" }}>Bespoke Survey Slot Secured</h2>
                        <p style={{ margin: "4px 0 0", color: "#166534", fontSize: "14px" }}>
                            We will call you on {submittedSummary.displayDate} during the {submittedSummary.callbackTimeSlot.toLowerCase()}.
                        </p>
                    </div>
                </div>

                <div style={{ borderTop: "1px solid #e7e5e4", paddingTop: "14px" }}>
                    <h4 style={{ margin: "0 0 10px", fontSize: "15px" }}>Submission Summary</h4>
                    <div style={{ background: "#fafaf9", padding: "14px", borderRadius: "12px", display: "grid", gap: "8px", fontSize: "14px" }}>
                        <div><strong>Client Name:</strong> {submittedSummary.name}</div>
                        <div><strong>Linked Phone Line:</strong> {submittedSummary.phone}</div>
                        <div><strong>Site Vector:</strong> {submittedSummary.postcode.toUpperCase()}</div>
                        <div><strong>Tracked Focus:</strong> {submittedSummary.serviceInterest || "General Bespoke Scope"}</div>
                        <div><strong>Callback Date:</strong> {submittedSummary.displayDate} ({submittedSummary.callbackTimeSlot})</div>
                    </div>
                </div>
                
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button type="button" onClick={() => { setSubmittedSummary(null); setSubmitStatus({ loading: false, success: false, error: "" }); setForm({ ...initialFormState }); setStep(1); }} style={buttonSecondaryStyle}>Configure Alternative Area</button>
                    <button type="button" onClick={() => navigate("/")} style={buttonPrimaryStyle}>Return to Home Portal</button>
                </div>
            </div>
        );
    }

    return (
        <form ref={formTopRef} onSubmit={handleSubmit} style={{ ...cardStyle, display: "grid", gap: "20px", width: "100%", position: "relative" }}>
            <style>
                {`
                    @keyframes slideInFromRight { 0% { opacity: 0; transform: translateX(20px); } 100% { opacity: 1; transform: translateX(0); } }
                    @keyframes slideInFromLeft { 0% { opacity: 0; transform: translateX(-20px); } 100% { opacity: 1; transform: translateX(0); } }
                `}
            </style>

            <div style={{ minWidth: 0 }}>
                <h2 style={{ fontSize: isMobile ? "28px" : "36px", marginTop: 0, marginBottom: "8px" }}>{title}</h2>
                {intro && <p style={{ color: "#57534e", fontSize: "14px", margin: 0 }}>{intro}</p>}
            </div>

            {renderProgressHeader()}

            <div key={step} style={{ animation: `${direction === 1 ? 'slideInFromRight' : 'slideInFromLeft'} 0.3s cubic-bezier(0.25, 1, 0.5, 1)`, minWidth: 0 }}>
                {renderStepContent()}
            </div>

            {submitStatus.error && <p style={{ color: "#b91c1c", fontWeight: "600", fontSize: "14px", margin: 0 }}>{submitStatus.error}</p>}

            {!(step === 1 && (form.contactPreference === "call_now" || !form.contactPreference)) && (
                <div style={{ display: "flex", flexDirection: isMobile ? "column-reverse" : "row", justifyContent: "space-between", gap: "12px", marginTop: "8px" }}>
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={step === 1 || submitStatus.loading}
                        style={{ ...buttonSecondaryStyle, height: "48px", minWidth: "100px", opacity: step === 1 ? 0.4 : 1, cursor: step === 1 ? "not-allowed" : "pointer" }}
                    >
                        Back
                    </button>

                    {step < maxSteps ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            disabled={!stepIsValid}
                            style={{ ...buttonPrimaryStyle, background: !stepIsValid ? '#78716c' : '#1c1917', cursor: !stepIsValid ? 'not-allowed' : 'pointer' }}
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={!stepIsValid || submitStatus.loading}
                            style={{ ...buttonPrimaryStyle, background: !stepIsValid ? '#78716c' : '#1c1917', cursor: !stepIsValid ? 'not-allowed' : 'pointer' }}
                        >
                            {submitStatus.loading ? "Transmitting Requirements..." : buttonText}
                        </button>
                    )}
                </div>
            )}
        </form>
    );
}