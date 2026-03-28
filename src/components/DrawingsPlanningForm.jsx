import { useEffect, useState } from "react";
import { siteStyles } from "./Layout.jsx";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  postcode: "",
  projectType: "",
  packageInterest: "",
  message: "",
};

export default function DrawingsPlanningForm({
  endpoint = "https://formspree.io/f/mojpjokd",
  selectedPackage = "",
  buttonText = "Request Quote",
  title = "Request your drawings quote",
  intro = "Tell us what type of project you have and which package you are interested in. We’ll use that to guide the next step.",
}) {
  const { buttonPrimary, card } = siteStyles;

  const [form, setForm] = useState({
    ...initialFormState,
    packageInterest: selectedPackage,
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

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

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        ...card,
        background: "#fff",
        border: "1px solid #ddd",
        boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
        display: "grid",
        gap: "14px",
      }}
    >
      <div>
        <h2 style={{ fontSize: "42px", marginTop: 0, marginBottom: "12px" }}>
          {title}
        </h2>

        <p style={{ color: "#57534e", lineHeight: "1.8", maxWidth: "560px", margin: 0 }}>
          {intro}
        </p>
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

      <input
        name="postcode"
        value={form.postcode}
        onChange={handleChange}
        placeholder="Postcode"
        style={inputStyle}
      />

      <label style={labelStyle}>
        <span style={{ color: "#44403c", fontWeight: "600" }}>Project type</span>
        <select
          name="projectType"
          value={form.projectType}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">Select project type</option>
          <option value="Extension">Extension</option>
          <option value="Loft Conversion">Loft Conversion</option>
          <option value="Internal Reconfiguration">Internal Reconfiguration</option>
        </select>
      </label>

      <label style={labelStyle}>
        <span style={{ color: "#44403c", fontWeight: "600" }}>Package of interest</span>
        <select
          name="packageInterest"
          value={form.packageInterest}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select a package</option>
          <option value="Starter Package">Starter Package</option>
          <option value="Planning Package">Planning Package</option>
          <option value="Technical Package">Technical Package</option>
        </select>
      </label>

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell us a little about the project"
        rows="5"
        style={{
          ...inputStyle,
          resize: "vertical",
        }}
        required
      />

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
  );
}