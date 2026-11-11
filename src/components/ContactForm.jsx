import { useEffect, useMemo, useState } from "react";
import { siteStyles } from "./Layout.jsx";

const STORAGE_KEY = "crafman_contact_form_v4";

const initialFormState = {
    services: [],
    otherService: "",
    postcode: "",
    startTime: "",
    ownsProperty: "",
    message: "",

    loftType: "",
    loftBedrooms: "",
    loftBathroom: "",
    loftStaircase: "",

    extensionType: "",
    extensionStoreys: "",

    kitchenScope: "",

    bathroomCount: "",
    bathroomLayoutChanges: "",

    commercialType: "",
    commercialSize: "",

    contactDays: [],
    contactTime: "",
    replyMethod: "",

    name: "",
    email: "",
    phone: "",
};

export default function ContactForm({
    endpoint = "https://formspree.io/f/mojpjokd",
    buttonText = "Send Enquiry",
    cardStyle,
}) {
    const { card, buttonPrimary } = siteStyles;

    const [form, setForm] = useState(initialFormState);
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [loadedDraft, setLoadedDraft] = useState(false);
    const [showRestoreNotice, setShowRestoreNotice] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        loading: false,
        success: false,
        error: "",
    });

    const totalSteps = 5;

    const serviceOptions = [
        "House Extensions",
        "Loft Conversions",
        "Home Renovations",
        "Refurbishments",
        "Commercial Fit-Outs",
        "Internal Reconfiguration",
        "Planning Permission Support",
        "Project Management",
        "Kitchen Renovation",
        "Bathroom Renovation",
        "Other",
    ];

    const dayOptions = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const startOptions = [
        "As soon as possible",
        "Within 1 month",
        "Within 3 months",
        "Within 6 months",
        "Just exploring for now",
    ];

    const contactTimeOptions = [
        "Morning",
        "Afternoon",
        "Evening",
        "Any time",
    ];

    const replyMethodOptions = ["Call", "Email", "WhatsApp"];

    const loftTypeOptions = [
        "Rear dormer",
        "Hip-to-gable",
        "Mansard",
        "Velux / rooflight",
        "Not sure yet",
    ];

    const loftBedroomOptions = [
        "1 extra room",
        "2 extra rooms",
        "3+ extra rooms",
        "Not sure yet",
    ];

    const extensionTypeOptions = [
        "Rear extension",
        "Side extension",
        "Wraparound extension",
        "Front extension",
        "Not sure yet",
    ];

    const kitchenScopeOptions = [
        "Supply and fit",
        "Full remodel",
        "Layout reconfiguration",
        "Not sure yet",
    ];

    const bathroomCountOptions = [
        "1 bathroom",
        "2 bathrooms",
        "3+ bathrooms",
        "Not sure yet",
    ];

    const commercialTypeOptions = [
        "Office",
        "Retail",
        "Restaurant / café",
        "Clinic / studio",
        "Other",
    ];

    const commercialSizeOptions = [
        "Under 1,000 sq ft",
        "1,000–2,500 sq ft",
        "2,500+ sq ft",
        "Not sure yet",
    ];

    const hasService = (serviceName) => form.services.includes(serviceName);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved) {
                const parsed = JSON.parse(saved);

                if (parsed?.form) {
                    setForm({ ...initialFormState, ...parsed.form });
                }

                if (parsed?.step) {
                    setStep(Math.min(Math.max(parsed.step, 1), totalSteps));
                }

                setShowRestoreNotice(true);
            }
        } catch (error) {
            console.error("Unable to restore saved form:", error);
        } finally {
            setLoadedDraft(true);
        }
    }, []);

    useEffect(() => {
        if (!loadedDraft) return;

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    form,
                    step,
                    savedAt: new Date().toISOString(),
                })
            );
        } catch (error) {
            console.error("Unable to save form draft:", error);
        }
    }, [form, step, loadedDraft]);

    function clearFieldsForRemovedService(serviceName, draft) {
        const updated = { ...draft };

        if (serviceName === "Other") {
            updated.otherService = "";
        }

        if (serviceName === "Loft Conversions") {
            updated.loftType = "";
            updated.loftBedrooms = "";
            updated.loftBathroom = "";
            updated.loftStaircase = "";
        }

        if (serviceName === "House Extensions") {
            updated.extensionType = "";
            updated.extensionStoreys = "";
        }

        if (serviceName === "Kitchen Renovation") {
            updated.kitchenScope = "";
        }

        if (serviceName === "Bathroom Renovation") {
            updated.bathroomCount = "";
            updated.bathroomLayoutChanges = "";
        }

        if (serviceName === "Commercial Fit-Outs") {
            updated.commercialType = "";
            updated.commercialSize = "";
        }

        return updated;
    }

    function toggleService(serviceName) {
        setForm((prev) => {
            const isSelected = prev.services.includes(serviceName);

            if (isSelected) {
                const updated = {
                    ...prev,
                    services: prev.services.filter((item) => item !== serviceName),
                };
                return clearFieldsForRemovedService(serviceName, updated);
            }

            return {
                ...prev,
                services: [...prev.services, serviceName],
            };
        });

        if (submitStatus.error) {
            setSubmitStatus((prev) => ({
                ...prev,
                error: "",
            }));
        }
    }

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

    function toggleDay(day) {
        setForm((prev) => ({
            ...prev,
            contactDays: prev.contactDays.includes(day)
                ? prev.contactDays.filter((d) => d !== day)
                : [...prev.contactDays, day],
        }));
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

    function clearSavedDraft() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error("Unable to clear saved draft:", error);
        }

        setShowRestoreNotice(false);
    }

    function getLeadScore(data) {
        let score = 0;

        if (data.services.length > 0) score += 2;
        if (data.services.length > 1) score += 1;
        if (data.postcode.trim()) score += 1;
        if (data.ownsProperty === "Yes") score += 2;
        if (data.startTime === "As soon as possible" || data.startTime === "Within 1 month") {
            score += 2;
        }
        if (data.startTime === "Within 3 months") {
            score += 1;
        }
        if (data.message.trim().length >= 30) score += 1;
        if (data.phone.trim()) score += 1;
        if (data.replyMethod) score += 1;

        return score;
    }

    function getLeadQuality(score) {
        if (score >= 8) return "Hot";
        if (score >= 5) return "Warm";
        return "Cold";
    }

    const leadScore = getLeadScore(form);
    const leadQuality = getLeadQuality(leadScore);

    const serviceAreaNote = useMemo(() => {
        if (!form.postcode.trim()) return "";
        return "We’ll confirm service area coverage in our reply if needed.";
    }, [form.postcode]);

    const stepIsValid = useMemo(() => {
        if (step === 1) {
            return form.services.length > 0 && !!form.postcode.trim();
        }

        if (step === 2) {
            if (hasService("Other") && !form.otherService.trim()) return false;

            if (hasService("Loft Conversions")) {
                if (!form.loftType || !form.loftBedrooms || !form.loftBathroom || !form.loftStaircase) {
                    return false;
                }
            }

            if (hasService("House Extensions")) {
                if (!form.extensionType || !form.extensionStoreys) return false;
            }

            if (hasService("Kitchen Renovation")) {
                if (!form.kitchenScope) return false;
            }

            if (hasService("Bathroom Renovation")) {
                if (!form.bathroomCount || !form.bathroomLayoutChanges) return false;
            }

            if (hasService("Commercial Fit-Outs")) {
                if (!form.commercialType || !form.commercialSize) return false;
            }

            return !!form.message.trim();
        }

        if (step === 3) {
            return !!form.contactTime && !!form.replyMethod;
        }

        if (step === 4) {
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
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    postcode: form.postcode,

                    services: form.services.join(", "),
                    servicesArray: form.services,
                    otherService: form.otherService,

                    startTime: form.startTime,
                    ownsProperty: form.ownsProperty,
                    message: form.message,

                    loftType: form.loftType,
                    loftBedrooms: form.loftBedrooms,
                    loftBathroom: form.loftBathroom,
                    loftStaircase: form.loftStaircase,

                    extensionType: form.extensionType,
                    extensionStoreys: form.extensionStoreys,

                    kitchenScope: form.kitchenScope,

                    bathroomCount: form.bathroomCount,
                    bathroomLayoutChanges: form.bathroomLayoutChanges,

                    commercialType: form.commercialType,
                    commercialSize: form.commercialSize,

                    contactDays: form.contactDays.join(", "),
                    contactTime: form.contactTime,
                    replyMethod: form.replyMethod,

                    leadScore,
                    leadQuality,
                    submittedFrom: "Contact form",
                    submittedAt: new Date().toISOString(),
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

            setForm(initialFormState);
            setStep(1);
            clearSavedDraft();
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
        border: "1px solid #4a432f",
        fontSize: "15px",
        boxSizing: "border-box",
        background: "#10100e",
        outline: "none",
    };

    const labelStyle = {
        display: "grid",
        gap: "8px",
    };

    const pillStyle = (active) => ({
        padding: "12px 14px",
        minHeight: "46px",
        borderRadius: "8px",
        border: active ? "1px solid #e6cd83" : "1px solid rgba(200,166,75,.28)",
        background: active ? "linear-gradient(135deg,#e0c16e,#c8a64b)" : "#151511",
        color: active ? "#11110e" : "#e9dfc7",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "13px",
        textAlign: "center",
        transition: "transform .22s ease, border-color .22s ease, background .22s ease, box-shadow .22s ease",
        boxShadow: active ? "0 9px 24px rgba(200,166,75,.16)" : "none",
    });

    const serviceCardStyle = (active) => ({
        position: "relative",
        minHeight: "66px",
        padding: "16px 16px 16px 42px",
        borderRadius: "8px",
        border: active ? "1px solid #e6cd83" : "1px solid rgba(200,166,75,.28)",
        background: active ? "linear-gradient(135deg,rgba(200,166,75,.2),rgba(200,166,75,.08))" : "#151511",
        color: active ? "#f6e8bd" : "#e9dfc7",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "13px",
        textAlign: "left",
        transition: "transform .22s ease, border-color .22s ease, background .22s ease, box-shadow .22s ease",
        transform: active ? "translateY(-2px)" : "translateY(0)",
        boxShadow: active ? "0 12px 28px rgba(200,166,75,.1)" : "0 4px 12px rgba(0,0,0,.12)",
    });

    const stepButtonStyle = (active, current) => ({
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        fontWeight: "800",
        fontSize: "12px",
        border: active ? "1px solid #e6cd83" : "1px solid #4a432f",
        background: active ? "#c8a64b" : "#151511",
        color: active ? "#11110e" : "#aa9e80",
        boxShadow: current ? "0 0 0 5px rgba(200,166,75,.1)" : "none",
        transition: "all 0.24s ease",
        flexShrink: 0,
    });

    const reviewItemStyle = {
        padding: "14px 0",
        borderBottom: "1px solid #373225",
        display: "grid",
        gap: "4px",
    };

    const trustPillStyle = {
        padding: "11px 13px",
        borderRadius: "7px",
        background: "#151511",
        border: "1px solid rgba(200,166,75,.24)",
        fontSize: "11px",
        fontWeight: "700",
        color: "#d8cba9",
        textAlign: "center",
    };

    const stepMeta = {
        1: {
            eyebrow: "Step 1",
            title: "Your project",
            text: "Choose one or more project types and tell us where the property is.",
        },
        2: {
            eyebrow: "Step 2",
            title: "Project details",
            text: "The more relevant detail you share, the more useful our first reply will be.",
        },
        3: {
            eyebrow: "Step 3",
            title: "Contact preferences",
            text: "Let us know the best way and time to get in touch.",
        },
        4: {
            eyebrow: "Step 4",
            title: "Your details",
            text: "Leave your details at the end. No pushy sales calls.",
        },
        5: {
            eyebrow: "Step 5",
            title: "Review enquiry",
            text: "Check everything before sending your enquiry.",
        },
    };

    const progress = (step / totalSteps) * 100;
    const animationName = direction === 1 ? "slideInFromRight" : "slideInFromLeft";

    const displayServices = form.services.length ? form.services.join(", ") : "—";

    const renderServiceSpecificQuestions = () => {
        return (
            <div style={{ display: "grid", gap: "18px" }}>
                {hasService("Other") && (
                    <label style={labelStyle}>
                        <span>Tell us the service you need</span>
                        <input
                            name="otherService"
                            value={form.otherService}
                            onChange={handleChange}
                            placeholder="Describe the type of work"
                            style={inputStyle}
                            required
                        />
                    </label>
                )}

                {hasService("Loft Conversions") && (
                    <div
                        style={{
                            display: "grid",
                            gap: "16px",
                            padding: "18px",
                            border: "1px solid rgba(200,166,75,.24)",
                            borderRadius: "8px",
                            background: "#141411",
                        }}
                    >
                        <div>
                            <h4 style={{ margin: "0 0 6px", fontSize: "18px" }}>Loft-specific details</h4>
                            <p style={{ margin: 0, color: "#b7ad95", lineHeight: "1.7" }}>
                                These help us qualify the project properly before we reply.
                            </p>
                        </div>

                        <label style={labelStyle}>
                            <span>What kind of loft conversion are you considering?</span>
                            <select
                                name="loftType"
                                value={form.loftType}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="">Select loft type</option>
                                {loftTypeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label style={labelStyle}>
                            <span>How much extra space do you want?</span>
                            <select
                                name="loftBedrooms"
                                value={form.loftBedrooms}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="">Select option</option>
                                {loftBedroomOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div style={labelStyle}>
                            <span>Would you like a bathroom in the loft?</span>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                                    gap: "10px",
                                }}
                            >
                                {["Yes", "No", "Not sure"].map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setField("loftBathroom", option)}
                                        style={pillStyle(form.loftBathroom === option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={labelStyle}>
                            <span>Are you expecting a new staircase to be required?</span>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                                    gap: "10px",
                                }}
                            >
                                {["Yes", "No", "Not sure"].map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setField("loftStaircase", option)}
                                        style={pillStyle(form.loftStaircase === option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {hasService("House Extensions") && (
                    <div
                        style={{
                            display: "grid",
                            gap: "16px",
                            padding: "18px",
                            border: "1px solid rgba(200,166,75,.24)",
                            borderRadius: "8px",
                            background: "#141411",
                        }}
                    >
                        <div>
                            <h4 style={{ margin: "0 0 6px", fontSize: "18px" }}>
                                Extension-specific details
                            </h4>
                            <p style={{ margin: 0, color: "#b7ad95", lineHeight: "1.7" }}>
                                A little more detail helps us understand the scope faster.
                            </p>
                        </div>

                        <label style={labelStyle}>
                            <span>What kind of extension are you considering?</span>
                            <select
                                name="extensionType"
                                value={form.extensionType}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="">Select extension type</option>
                                {extensionTypeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div style={labelStyle}>
                            <span>How many storeys will the extension be?</span>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                                    gap: "10px",
                                }}
                            >
                                {["Single storey", "Double storey", "Not sure yet"].map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setField("extensionStoreys", option)}
                                        style={pillStyle(form.extensionStoreys === option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {hasService("Kitchen Renovation") && (
                    <div
                        style={{
                            display: "grid",
                            gap: "16px",
                            padding: "18px",
                            border: "1px solid rgba(200,166,75,.24)",
                            borderRadius: "8px",
                            background: "#141411",
                        }}
                    >
                        <div>
                            <h4 style={{ margin: "0 0 6px", fontSize: "18px" }}>Kitchen details</h4>
                            <p style={{ margin: 0, color: "#b7ad95", lineHeight: "1.7" }}>
                                A quick scope check helps us respond more accurately.
                            </p>
                        </div>

                        <label style={labelStyle}>
                            <span>What kind of kitchen project is this?</span>
                            <select
                                name="kitchenScope"
                                value={form.kitchenScope}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="">Select kitchen scope</option>
                                {kitchenScopeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                )}

                {hasService("Bathroom Renovation") && (
                    <div
                        style={{
                            display: "grid",
                            gap: "16px",
                            padding: "18px",
                            border: "1px solid rgba(200,166,75,.24)",
                            borderRadius: "8px",
                            background: "#141411",
                        }}
                    >
                        <div>
                            <h4 style={{ margin: "0 0 6px", fontSize: "18px" }}>Bathroom details</h4>
                            <p style={{ margin: 0, color: "#b7ad95", lineHeight: "1.7" }}>
                                These answers help us understand complexity and likely workflow.
                            </p>
                        </div>

                        <label style={labelStyle}>
                            <span>How many bathrooms are involved?</span>
                            <select
                                name="bathroomCount"
                                value={form.bathroomCount}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="">Select option</option>
                                {bathroomCountOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div style={labelStyle}>
                            <span>Will the layout change?</span>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                                    gap: "10px",
                                }}
                            >
                                {["Yes", "No", "Not sure"].map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setField("bathroomLayoutChanges", option)}
                                        style={pillStyle(form.bathroomLayoutChanges === option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {hasService("Commercial Fit-Outs") && (
                    <div
                        style={{
                            display: "grid",
                            gap: "16px",
                            padding: "18px",
                            border: "1px solid rgba(200,166,75,.24)",
                            borderRadius: "8px",
                            background: "#141411",
                        }}
                    >
                        <div>
                            <h4 style={{ margin: "0 0 6px", fontSize: "18px" }}>
                                Commercial fit-out details
                            </h4>
                            <p style={{ margin: 0, color: "#b7ad95", lineHeight: "1.7" }}>
                                This helps us understand the type and scale of the space.
                            </p>
                        </div>

                        <label style={labelStyle}>
                            <span>What kind of commercial space is it?</span>
                            <select
                                name="commercialType"
                                value={form.commercialType}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="">Select commercial type</option>
                                {commercialTypeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label style={labelStyle}>
                            <span>Approximate size of the space</span>
                            <select
                                name="commercialSize"
                                value={form.commercialSize}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="">Select size</option>
                                {commercialSizeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                )}
            </div>
        );
    };

    const renderStepContent = () => {
        if (step === 1) {
            return (
                <div style={{ display: "grid", gap: "18px" }}>
                    <div>
                        <p
                            style={{
                                margin: "0 0 6px",
                                color: "#aa9e80",
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
                        <p style={{ margin: 0, color: "#b7ad95", lineHeight: "1.7" }}>
                            {stepMeta[1].text}
                        </p>
                    </div>

                    <div
                        style={{
                            padding: "18px",
                            borderRadius: "8px",
                            background: "#141411",
                            border: "1px solid #373225",
                            display: "grid",
                            gap: "10px",
                        }}
                    >
                        <strong style={{ fontSize: "16px" }}>
                            Tell us about your project and we’ll come back with practical next steps.
                        </strong>
                        <span style={{ color: "#b7ad95", lineHeight: "1.7" }}>
                            Select all that apply. Many enquiries involve more than one type of work.
                        </span>
                    </div>

                    <div style={labelStyle}>
                        <span>Project required</span>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                gap: "12px",
                            }}
                        >
                            {serviceOptions.map((service) => (
                                <button
                                    key={service}
                                    type="button"
                                    onClick={() => toggleService(service)}
                                    style={serviceCardStyle(hasService(service))}
                                >
                                    {service}
                                </button>
                            ))}
                        </div>
                    </div>

                    {form.services.length > 0 && (
                        <p style={{ margin: 0, color: "#b7ad95", lineHeight: "1.7" }}>
                            Selected: <strong>{form.services.join(", ")}</strong>
                        </p>
                    )}

                    <label style={labelStyle}>
                        <span>Project postcode</span>
                        <input
                            name="postcode"
                            value={form.postcode}
                            onChange={handleChange}
                            placeholder="e.g. SW11 2AB"
                            style={inputStyle}
                            required
                        />
                    </label>

                    {serviceAreaNote && (
                        <p style={{ margin: 0, color: "#aa9e80", fontSize: "14px" }}>
                            {serviceAreaNote}
                        </p>
                    )}
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
                                color: "#aa9e80",
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
                        <p style={{ margin: 0, color: "#b7ad95", lineHeight: "1.7" }}>
                            {stepMeta[2].text}
                        </p>
                    </div>

                    {renderServiceSpecificQuestions()}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "14px",
                        }}
                    >
                        <label style={labelStyle}>
                            <span>When would you like to start?</span>
                            <select
                                name="startTime"
                                value={form.startTime}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="">Choose timing</option>
                                {startOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label style={labelStyle}>
                            <span>Do you own the property?</span>
                            <select
                                name="ownsProperty"
                                value={form.ownsProperty}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="In progress">In progress</option>
                            </select>
                        </label>
                    </div>

                    <label style={labelStyle}>
                        <span>Brief project details</span>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Tell us what you are planning, what stage you’re at, and anything important we should know."
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
                                color: "#aa9e80",
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
                        <p style={{ margin: 0, color: "#b7ad95", lineHeight: "1.7" }}>
                            {stepMeta[3].text}
                        </p>
                    </div>

                    <div style={labelStyle}>
                        <span>Preferred contact days</span>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                                gap: "10px",
                            }}
                        >
                            {dayOptions.map((day) => (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => toggleDay(day)}
                                    style={pillStyle(form.contactDays.includes(day))}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={labelStyle}>
                        <span>Preferred contact time</span>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                                gap: "10px",
                            }}
                        >
                            {contactTimeOptions.map((time) => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => setField("contactTime", time)}
                                    style={pillStyle(form.contactTime === time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={labelStyle}>
                        <span>Preferred reply method</span>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                                gap: "10px",
                            }}
                        >
                            {replyMethodOptions.map((method) => (
                                <button
                                    key={method}
                                    type="button"
                                    onClick={() => setField("replyMethod", method)}
                                    style={pillStyle(form.replyMethod === method)}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        if (step === 4) {
            return (
                <div style={{ display: "grid", gap: "18px" }}>
                    <div>
                        <p
                            style={{
                                margin: "0 0 6px",
                                color: "#aa9e80",
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
                        <p style={{ margin: 0, color: "#b7ad95", lineHeight: "1.7" }}>
                            {stepMeta[4].text}
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                            gap: "10px",
                        }}
                    >
                        <div style={trustPillStyle}>Trusted local design & build team</div>
                        <div style={trustPillStyle}>Clear advice, no pressure</div>
                        <div style={trustPillStyle}>Planning and build support</div>
                        <div style={trustPillStyle}>Tailored first response</div>
                    </div>

                    <div
                        style={{
                            padding: "16px",
                            borderRadius: "8px",
                            background: "#141411",
                            border: "1px solid #373225",
                            color: "#b7ad95",
                            lineHeight: "1.7",
                        }}
                    >
                        Leave your details and we’ll reply with practical next steps. No pushy sales calls.
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "14px",
                        }}
                    >
                        <label style={labelStyle}>
                            <span>Name</span>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                style={inputStyle}
                                required
                            />
                        </label>

                        <label style={labelStyle}>
                            <span>Phone number</span>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Your phone number"
                                style={inputStyle}
                            />
                        </label>
                    </div>

                    <label style={labelStyle}>
                        <span>Email</span>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Your email address"
                            style={inputStyle}
                            required
                        />
                    </label>
                </div>
            );
        }

        return (
            <div style={{ display: "grid", gap: "18px" }}>
                <div>
                    <p
                        style={{
                            margin: "0 0 6px",
                            color: "#aa9e80",
                            fontSize: "13px",
                            fontWeight: "700",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                        }}
                    >
                        {stepMeta[5].eyebrow}
                    </p>
                    <h3 style={{ margin: "0 0 8px", fontSize: "24px" }}>
                        {stepMeta[5].title}
                    </h3>
                    <p style={{ margin: 0, color: "#b7ad95", lineHeight: "1.7" }}>
                        {stepMeta[5].text}
                    </p>
                </div>

                <div
                    style={{
                        padding: "16px",
                        borderRadius: "8px",
                        background: "#201d15",
                        border: "1px solid #373225",
                    }}
                >
                    <strong style={{ display: "block", marginBottom: "6px" }}>
                        Thanks — you’ve given us enough detail to provide a useful first response.
                    </strong>
                    <span style={{ color: "#b7ad95", lineHeight: "1.7" }}>
                        We aim to reply within 1 working day.
                    </span>
                </div>

                <div
                    style={{
                        border: "1px solid #373225",
                        borderRadius: "8px",
                        padding: "6px 18px",
                        background: "#141411",
                    }}
                >
                    <div style={reviewItemStyle}>
                        <strong>Project required</strong>
                        <span>{displayServices}</span>
                    </div>

                    <div style={reviewItemStyle}>
                        <strong>Postcode</strong>
                        <span>{form.postcode || "—"}</span>
                    </div>

                    {hasService("Other") && (
                        <div style={reviewItemStyle}>
                            <strong>Other service</strong>
                            <span>{form.otherService || "—"}</span>
                        </div>
                    )}

                    {hasService("Loft Conversions") && (
                        <>
                            <div style={reviewItemStyle}>
                                <strong>Loft type</strong>
                                <span>{form.loftType || "—"}</span>
                            </div>
                            <div style={reviewItemStyle}>
                                <strong>Extra space needed</strong>
                                <span>{form.loftBedrooms || "—"}</span>
                            </div>
                            <div style={reviewItemStyle}>
                                <strong>Bathroom in loft</strong>
                                <span>{form.loftBathroom || "—"}</span>
                            </div>
                            <div style={reviewItemStyle}>
                                <strong>New staircase required</strong>
                                <span>{form.loftStaircase || "—"}</span>
                            </div>
                        </>
                    )}

                    {hasService("House Extensions") && (
                        <>
                            <div style={reviewItemStyle}>
                                <strong>Extension type</strong>
                                <span>{form.extensionType || "—"}</span>
                            </div>
                            <div style={reviewItemStyle}>
                                <strong>Extension storeys</strong>
                                <span>{form.extensionStoreys || "—"}</span>
                            </div>
                        </>
                    )}

                    {hasService("Kitchen Renovation") && (
                        <div style={reviewItemStyle}>
                            <strong>Kitchen scope</strong>
                            <span>{form.kitchenScope || "—"}</span>
                        </div>
                    )}

                    {hasService("Bathroom Renovation") && (
                        <>
                            <div style={reviewItemStyle}>
                                <strong>Bathrooms involved</strong>
                                <span>{form.bathroomCount || "—"}</span>
                            </div>
                            <div style={reviewItemStyle}>
                                <strong>Layout change</strong>
                                <span>{form.bathroomLayoutChanges || "—"}</span>
                            </div>
                        </>
                    )}

                    {hasService("Commercial Fit-Outs") && (
                        <>
                            <div style={reviewItemStyle}>
                                <strong>Commercial space type</strong>
                                <span>{form.commercialType || "—"}</span>
                            </div>
                            <div style={reviewItemStyle}>
                                <strong>Commercial size</strong>
                                <span>{form.commercialSize || "—"}</span>
                            </div>
                        </>
                    )}

                    <div style={reviewItemStyle}>
                        <strong>Start time</strong>
                        <span>{form.startTime || "—"}</span>
                    </div>

                    <div style={reviewItemStyle}>
                        <strong>Owns property</strong>
                        <span>{form.ownsProperty || "—"}</span>
                    </div>

                    <div style={reviewItemStyle}>
                        <strong>Preferred contact days</strong>
                        <span>{form.contactDays.length ? form.contactDays.join(", ") : "—"}</span>
                    </div>

                    <div style={reviewItemStyle}>
                        <strong>Preferred contact time</strong>
                        <span>{form.contactTime || "—"}</span>
                    </div>

                    <div style={reviewItemStyle}>
                        <strong>Preferred reply method</strong>
                        <span>{form.replyMethod || "—"}</span>
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

                    <div style={reviewItemStyle}>
                        <strong>Lead quality</strong>
                        <span>
                            {leadQuality} ({leadScore}/10)
                        </span>
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
        <div
            className="crafman-contact-form"
            style={{
                ...(cardStyle || card),
                position: "relative",
                overflow: "hidden",
                padding: "clamp(22px, 3vw, 34px)",
                borderRadius: "10px",
                border: "1px solid rgba(200,166,75,.34)",
                background: "radial-gradient(ellipse at 90% 0%, rgba(200,166,75,.10), transparent 34%), linear-gradient(145deg,#11110f,#090908)",
                color: "#f4ecd8",
                boxShadow: "0 22px 60px rgba(0,0,0,.28)",
            }}
        >
            <style>
                {`

                    .crafman-contact-form {
                        isolation: isolate;
                        font-family: Inter, Arial, sans-serif;
                    }
                    .crafman-contact-form::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 2px;
                        background: linear-gradient(90deg, transparent, #c8a64b 22%, #f0d98e 50%, #c8a64b 78%, transparent);
                        opacity: .9;
                        pointer-events: none;
                    }
                    .crafman-contact-form__eyebrow {
                        display: block;
                        margin-bottom: 11px;
                        color: #c8a64b;
                        font-size: 9px;
                        font-weight: 850;
                        letter-spacing: .2em;
                        line-height: 1.5;
                        text-transform: uppercase;
                    }
                    .crafman-contact-form__heading {
                        margin-bottom: 10px !important;
                        color: #f5ecd6;
                        font-size: clamp(27px, 3vw, 36px) !important;
                        line-height: 1.06;
                        letter-spacing: -.055em;
                        font-weight: 800;
                    }
                    .crafman-contact-form__heading span { color: #e2c16b; }
                    .crafman-contact-form__intro {
                        max-width: 560px;
                        margin-top: 0;
                        color: #b7ad95 !important;
                        font-size: 13px;
                        line-height: 1.75 !important;
                    }
                    .crafman-contact-form p { color: #b7ad95; }
                    .crafman-contact-form h3,
                    .crafman-contact-form h4 { color: #f0e5c9; letter-spacing: -.025em; }
                    .crafman-contact-form strong { color: #e8d9b5; }
                    .crafman-contact-form label { color: #e4d8bd; font-size: 12px; font-weight: 700; }
                    .crafman-contact-form input,
                    .crafman-contact-form select,
                    .crafman-contact-form textarea {
                        min-height: 48px;
                        padding: 13px 14px !important;
                        border: 1px solid rgba(200,166,75,.28) !important;
                        border-radius: 7px !important;
                        background: #0b0b09 !important;
                        color: #f4ecd8 !important;
                        font: 500 14px Inter, Arial, sans-serif !important;
                        box-shadow: inset 0 1px 0 rgba(255,255,255,.025) !important;
                        transition: border-color .2s ease, box-shadow .2s ease, background .2s ease !important;
                    }
                    .crafman-contact-form textarea { min-height: 125px; line-height: 1.65 !important; }
                    .crafman-contact-form input::placeholder,
                    .crafman-contact-form textarea::placeholder { color: #82785f !important; opacity: 1; }
                    .crafman-contact-form input:focus,
                    .crafman-contact-form select:focus,
                    .crafman-contact-form textarea:focus {
                        outline: none !important;
                        border-color: #d6b65d !important;
                        box-shadow: 0 0 0 3px rgba(200,166,75,.12) !important;
                        background: #11110d !important;
                    }
                    .crafman-contact-form select option { background: #11110e; color: #f4ecd8; }
                    .crafman-contact-form__restore-notice {
                        border: 1px solid rgba(200,166,75,.35) !important;
                        border-radius: 7px !important;
                        background: rgba(200,166,75,.08) !important;
                    }
                    .crafman-contact-form__progress {
                        padding: 17px 17px 14px;
                        border: 1px solid rgba(200,166,75,.2);
                        border-radius: 8px;
                        background: rgba(255,255,255,.018);
                    }
                    .crafman-contact-form__step-count {
                        color: #e6cd83 !important;
                        font-size: 11px;
                        letter-spacing: .12em;
                        text-transform: uppercase;
                    }
                    .crafman-contact-form__step-count span { color: #8f846b; }
                    .crafman-contact-form__autosave { color: #9e947d !important; font-size: 10px !important; }
                    .crafman-contact-form__autosave span { color: #c8a64b; margin-right: 5px; }
                    .crafman-contact-form__progress-track {
                        background: #302b20 !important;
                        border-radius: 99px !important;
                    }
                    .crafman-contact-form__progress-fill {
                        background: linear-gradient(90deg,#a7832e,#e8cc79) !important;
                        border-radius: 99px !important;
                        box-shadow: 0 0 12px rgba(200,166,75,.22);
                    }
                    .crafman-contact-form__step-labels {
                        display: grid;
                        grid-template-columns: repeat(5,minmax(0,1fr));
                        gap: 5px;
                        color: #77705d;
                        font-size: 9px;
                        font-weight: 700;
                        letter-spacing: .02em;
                        text-align: center;
                    }
                    .crafman-contact-form__step-labels span.is-current { color: #e6cd83; }
                    .crafman-contact-form__step-labels span.is-complete { color: #c6a34d; }
                    .crafman-contact-form__step-content { min-width: 0; }
                    .crafman-contact-form__step-content > div { min-width: 0; }
                    .crafman-contact-form button {
                        font-family: Inter, Arial, sans-serif;
                        transition: transform .2s ease, border-color .2s ease, background .2s ease, box-shadow .2s ease, opacity .2s ease;
                    }
                    .crafman-contact-form button:hover:not(:disabled) { transform: translateY(-2px); }
                    .crafman-contact-form button:focus-visible {
                        outline: 2px solid #e6cd83;
                        outline-offset: 3px;
                    }
                    .crafman-contact-form button:disabled { transform: none !important; }
                    .crafman-contact-form button[type="submit"],
                    .crafman-contact-form__form > div:last-child button:last-child {
                        min-height: 49px;
                        padding: 0 23px !important;
                        border: 1px solid #e6cd83 !important;
                        border-radius: 6px !important;
                        background: linear-gradient(135deg,#e2c16b,#c8a64b) !important;
                        color: #12110d !important;
                        font-size: 12px !important;
                        font-weight: 850 !important;
                        letter-spacing: .04em;
                        box-shadow: 0 10px 28px rgba(200,166,75,.13) !important;
                    }
                    .crafman-contact-form__form > div:last-child button:first-child {
                        min-height: 49px;
                        padding: 0 20px !important;
                        border: 1px solid rgba(200,166,75,.3) !important;
                        border-radius: 6px !important;
                        background: #151511 !important;
                        color: #e9dfc7 !important;
                        font-size: 12px !important;
                    }
                    .crafman-contact-form [style*="background: rgb(20, 20, 17)"],
                    .crafman-contact-form [style*="background: rgb(21, 21, 17)"] {
                        border-color: rgba(200,166,75,.22) !important;
                    }
                    .crafman-contact-form__form > div:last-child {
                        padding-top: 15px;
                        border-top: 1px solid rgba(200,166,75,.2);
                    }
                    @media (max-width: 600px) {
                        .crafman-contact-form { padding: 19px !important; border-radius: 8px !important; }
                        .crafman-contact-form__progress { padding: 13px 11px 11px; gap: 10px !important; }
                        .crafman-contact-form__step-track { gap: 5px !important; }
                        .crafman-contact-form__step-item { gap: 5px !important; }
                        .crafman-contact-form__step-labels { font-size: 8px; letter-spacing: -.02em; }
                        .crafman-contact-form__autosave { max-width: 150px; text-align: right; }
                        .crafman-contact-form__form > div:last-child { gap: 8px !important; }
                        .crafman-contact-form__form > div:last-child button { flex: 1; padding: 0 12px !important; }
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .crafman-contact-form *, .crafman-contact-form *::before, .crafman-contact-form *::after {
                            animation-duration: .01ms !important;
                            transition-duration: .01ms !important;
                            scroll-behavior: auto !important;
                        }
                    }

                    @keyframes slideInFromRight {
                        0% {
                            opacity: 0;
                            transform: translateX(18px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes slideInFromLeft {
                        0% {
                            opacity: 0;
                            transform: translateX(-18px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                `}
            </style>

            <span className="crafman-contact-form__eyebrow">CRAFMAN DESIGN & BUILD · PROJECT ENQUIRY</span>
            <h2 className="crafman-contact-form__heading" style={{ marginTop: 0, fontSize: "30px" }}>Let’s talk about your project<span>.</span></h2>
            <p className="crafman-contact-form__intro" style={{ color: "#b7ad95", lineHeight: "1.8", marginBottom: "22px" }}>
                Share a few details about your plans. We’ll review your enquiry and come back with practical next steps.
            </p>

            {showRestoreNotice && (
                <div
                    className="crafman-contact-form__restore-notice"
                    style={{
                        marginBottom: "18px",
                        padding: "14px 16px",
                        borderRadius: "7px",
                        border: "1px solid #373225",
                        background: "#141411",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <span style={{ color: "#b7ad95", fontSize: "14px", lineHeight: "1.6" }}>
                        Your progress was restored automatically.
                    </span>

                    <button
                        type="button"
                        onClick={clearSavedDraft}
                        style={{
                            border: "none",
                            background: "transparent",
                            color: "#c8a64b",
                            fontWeight: "700",
                            cursor: "pointer",
                            padding: 0,
                        }}
                    >
                        Clear saved draft
                    </button>
                </div>
            )}

            <div className="crafman-contact-form__progress" style={{ display: "grid", gap: "14px", marginBottom: "26px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <p className="crafman-contact-form__step-count" style={{ margin: 0, color: "#b7ad95", fontWeight: "700" }}>
                        STEP {step} <span>/ {totalSteps}</span>
                    </p>

                    <p className="crafman-contact-form__autosave" style={{ margin: 0, color: "#aa9e80", fontSize: "12px" }}>
                        <span aria-hidden="true">✓</span> Progress saved automatically
                    </p>
                </div>

                <div
                    className="crafman-contact-form__step-track"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gap: "10px",
                        alignItems: "center",
                    }}
                >
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="crafman-contact-form__step-item"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                minWidth: 0,
                            }}
                        >
                            <div style={stepButtonStyle(step >= item, step === item)}>{item}</div>
                            {item < 5 && (
                                <div
                                    style={{
                                        height: "4px",
                                        background: step > item ? "#c8a64b" : "#373225",
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
                    className="crafman-contact-form__progress-track"
                    style={{
                        width: "100%",
                        height: "6px",
                        background: "#373225",
                        borderRadius: "999px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        className="crafman-contact-form__progress-fill"
                        style={{
                            width: `${progress}%`,
                            height: "100%",
                            background: "#c8a64b",
                            transition: "width 0.3s ease",
                        }}
                    />
                </div>

                <div className="crafman-contact-form__step-labels">
                    {["Project", "Details", "Preferences", "Contact", "Review"].map((label, index) => (
                        <span key={label} className={step === index + 1 ? "is-current" : step > index + 1 ? "is-complete" : ""}>{label}</span>
                    ))}
                </div>
            </div>

            <form className="crafman-contact-form__form" onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
                <div
                    className="crafman-contact-form__step-content"
                    key={step}
                    style={{
                        animation: `${animationName} 0.35s cubic-bezier(0.22, 1, 0.36, 1)`,
                        willChange: "transform, opacity",
                    }}
                >
                    {renderStepContent()}
                </div>

                {submitStatus.success && (
                    <p style={{ margin: 0, color: "#a7d4a0", fontWeight: "600" }}>
                        Thanks — your enquiry has been sent successfully.
                    </p>
                )}

                {submitStatus.error && (
                    <p style={{ margin: 0, color: "#ff9c91", fontWeight: "600" }}>
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
                            border: "1px solid #4a432f",
                            background: "#10100e",
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
                                boxShadow: !stepIsValid
                                    ? "none"
                                    : "0 16px 35px rgba(28,25,23,0.15)",
                            }}
                        >
                            {step === 1 && "Next: Project details"}
                            {step === 2 && "Next: Contact preferences"}
                            {step === 3 && "Next: Your details"}
                            {step === 4 && "Review enquiry"}
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
        </div>
    );
}