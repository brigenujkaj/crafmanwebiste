import { useState } from "react";
import { siteStyles } from "./Layout.jsx";

const initialFormState = {
    name: "",
    email: "",
    phone: "",
    postcode: "",
    service: "",
    otherService: "",
    startTime: "",
    ownsProperty: "",
    contactDays: [],
    contactTime: "",
    message: "",
};

export default function ContactForm({
    endpoint = "https://formspree.io/f/mojpjokd",
    buttonText = "Send Enquiry",
    cardStyle,
}) {
    const { card, buttonPrimary } = siteStyles;

    const [form, setForm] = useState(initialFormState);
    const [submitStatus, setSubmitStatus] = useState({
        loading: false,
        success: false,
        error: "",
    });

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

    function toggleDay(day) {
        setForm((prev) => ({
            ...prev,
            contactDays: prev.contactDays.includes(day)
                ? prev.contactDays.filter((d) => d !== day)
                : [...prev.contactDays, day],
        }));
    }

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
                    service: form.service,
                    otherService: form.otherService,
                    startTime: form.startTime,
                    ownsProperty: form.ownsProperty,
                    contactDays: form.contactDays.join(", "),
                    contactTime: form.contactTime,
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

            setForm(initialFormState);
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
    });

    return (
        <div style={cardStyle || card}>
            <h2 style={{ marginTop: 0, fontSize: "30px" }}>Start your enquiry</h2>
            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                Keep it simple. The more we know, the more useful our first reply will be.
            </p>

            <form
                onSubmit={handleSubmit}
                style={{ display: "grid", gap: "18px", marginTop: "18px" }}
            >
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

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "14px",
                    }}
                >
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

                    <label style={labelStyle}>
                        <span>Postcode</span>
                        <input
                            name="postcode"
                            value={form.postcode}
                            onChange={handleChange}
                            placeholder="Your postcode"
                            style={inputStyle}
                        />
                    </label>
                </div>

                <label style={labelStyle}>
                    <span>Project required</span>
                    <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Select a service</option>
                        {serviceOptions.map((service) => (
                            <option key={service} value={service}>
                                {service}
                            </option>
                        ))}
                    </select>
                </label>

                {form.service === "Other" && (
                    <label style={labelStyle}>
                        <span>Tell us the service you need</span>
                        <input
                            name="otherService"
                            value={form.otherService}
                            onChange={handleChange}
                            placeholder="Describe your project"
                            style={inputStyle}
                        />
                    </label>
                )}

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
                                onClick={() =>
                                    setForm((prev) => ({ ...prev, contactTime: time }))
                                }
                                style={pillStyle(form.contactTime === time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                <label style={labelStyle}>
                    <span>Brief project details</span>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us what you are planning"
                        rows="5"
                        style={{
                            ...inputStyle,
                            resize: "vertical",
                        }}
                        required
                    />
                </label>

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

                <button
                    type="submit"
                    disabled={submitStatus.loading}
                    style={{
                        ...buttonPrimary,
                        border: "none",
                        cursor: submitStatus.loading ? "not-allowed" : "pointer",
                        opacity: submitStatus.loading ? 0.7 : 1,
                    }}
                >
                    {submitStatus.loading ? "Sending..." : buttonText}
                </button>
            </form>
        </div>
    );
}