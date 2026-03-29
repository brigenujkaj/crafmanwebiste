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

    const pillStyle = (active) => ({
        padding: "12px 14px",
        borderRadius: "12px",
        border: active ? "1px solid #1c1917" : "1px solid #d6d3d1",
        background: active ? "#1c1917" : "#fff",
        color: active ? "#fff" : "#1f1f1f",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "14px",
        textAlign: "center",
        transition: "all 0.2s ease",
        boxShadow: active ? "0 10px 24px rgba(28,25,23,0.14)" : "none",
    });

    const serviceCardStyle = (active) => ({
        padding: "16px",
        borderRadius: "14px",
        border: active ? "1px solid #1c1917" : "1px solid #d6d3d1",
        background: active ? "#f5f5f4" : "#fff",
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
                            border: "1px solid #e7e5e4",
                            borderRadius: "16px",
                            background: "#fafaf9",
                        }}
                    >
                        <div>
                            <h4 style={{ margin: "0 0 6px", fontSize: "18px" }}>Loft-specific details</h4>
                            <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
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
                            border: "1px solid #e7e5e4",
                            borderRadius: "16px",
                            background: "#fafaf9",
                        }}
                    >
                        <div>
                            <h4 style={{ margin: "0 0 6px", fontSize: "18px" }}>
                                Extension-specific details
                            </h4>
                            <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
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
                            border: "1px solid #e7e5e4",
                            borderRadius: "16px",
                            background: "#fafaf9",
                        }}
                    >
                        <div>
                            <h4 style={{ margin: "0 0 6px", fontSize: "18px" }}>Kitchen details</h4>
                            <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
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
                            border: "1px solid #e7e5e4",
                            borderRadius: "16px",
                            background: "#fafaf9",
                        }}
                    >
                        <div>
                            <h4 style={{ margin: "0 0 6px", fontSize: "18px" }}>Bathroom details</h4>
                            <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
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
                            border: "1px solid #e7e5e4",
                            borderRadius: "16px",
                            background: "#fafaf9",
                        }}
                    >
                        <div>
                            <h4 style={{ margin: "0 0 6px", fontSize: "18px" }}>
                                Commercial fit-out details
                            </h4>
                            <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
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
                            Tell us about your project and we’ll come back with practical next steps.
                        </strong>
                        <span style={{ color: "#57534e", lineHeight: "1.7" }}>
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
                        <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
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
                        <p style={{ margin: 0, color: "#78716c", fontSize: "14px" }}>
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
                            borderRadius: "16px",
                            background: "#fafaf9",
                            border: "1px solid #e7e5e4",
                            color: "#57534e",
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
                            color: "#78716c",
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
                    <p style={{ margin: 0, color: "#57534e", lineHeight: "1.7" }}>
                        {stepMeta[5].text}
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
                        Thanks — you’ve given us enough detail to provide a useful first response.
                    </strong>
                    <span style={{ color: "#57534e", lineHeight: "1.7" }}>
                        We aim to reply within 1 working day.
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
            style={{
                ...(cardStyle || card),
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

            <h2 style={{ marginTop: 0, fontSize: "30px" }}>Start your enquiry</h2>
            <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: "22px" }}>
                Tell us about your project and we’ll reply with practical next steps and the best
                way to move things forward.
            </p>

            {showRestoreNotice && (
                <div
                    style={{
                        marginBottom: "18px",
                        padding: "14px 16px",
                        borderRadius: "14px",
                        border: "1px solid #e7e5e4",
                        background: "#fafaf9",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <span style={{ color: "#57534e", fontSize: "14px", lineHeight: "1.6" }}>
                        Your progress was restored automatically.
                    </span>

                    <button
                        type="button"
                        onClick={clearSavedDraft}
                        style={{
                            border: "none",
                            background: "transparent",
                            color: "#1c1917",
                            fontWeight: "700",
                            cursor: "pointer",
                            padding: 0,
                        }}
                    >
                        Clear saved draft
                    </button>
                </div>
            )}

            <div style={{ display: "grid", gap: "14px", marginBottom: "26px" }}>
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

                    <p style={{ margin: 0, color: "#78716c", fontSize: "14px" }}>
                        Auto-saved as you go
                    </p>
                </div>

                <div
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
                    <span>Preferences</span>
                    <span>Contact</span>
                    <span>Review</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
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
                        Thanks — your enquiry has been sent successfully.
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