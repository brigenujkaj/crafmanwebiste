import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { syncLeadToCrafmanOS } from "../lib/crafmanLeadIntake.js";

const FORM_ENDPOINT = "https://formspree.io/f/mojpjokd";

const PROJECT_TYPES = [
  "Rear extension",
  "Side-return extension",
  "Wraparound extension",
  "Single-storey extension",
  "Double-storey extension",
  "Loft conversion",
  "Hip-to-gable loft conversion",
  "New build",
  "Not sure yet",
];

export default function ExtensionLeadForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    projectType: "",
    description: "",
  });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (status.error) setStatus({ loading: false, error: "" });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.address.trim() || !form.projectType) {
      setStatus({ loading: false, error: "Please complete all required fields." });
      return;
    }

    setStatus({ loading: true, error: "" });
    const lead = {
      name: form.name.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      project_type: form.projectType,
      description: form.description.trim(),
      form_name: "Extension Lead Form",
      source: "website",
    };

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...lead,
          _subject: "New extension enquiry – Crafman Design & Build",
          submitted_at: new Date().toISOString(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.errors?.[0]?.message || "We couldn't send your enquiry. Please try again.");
      }

      // CRM sync is best-effort; Formspree remains the email backup.
      await syncLeadToCrafmanOS({
        client_name: lead.name,
        email: lead.email,
        address: lead.address,
        project_type: lead.project_type,
        description: lead.description,
        form_name: lead.form_name,
        source: lead.source,
      });

      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "extension_lead_submit",
          form_name: "Extension Lead Form",
          project_type: lead.project_type,
        });
      }
      navigate("/extensionFormSuccess", { replace: true });
    } catch (error) {
      setStatus({ loading: false, error: error.message || "Something went wrong. Please try again." });
    }
  }

  const fieldStyle = {
    width: "100%",
    minHeight: 54,
    padding: "14px 16px",
    border: "1px solid #dedbd3",
    borderRadius: 10,
    background: "#fff",
    color: "#201f1b",
    font: "inherit",
    outlineColor: "#c6a243",
    boxSizing: "border-box",
  };
  const labelStyle = { display: "grid", gap: 8, color: "#292820", fontSize: 13, fontWeight: 700 };

  return (
    <section className="extension-lead-form-wrap">
      <div className="extension-lead-form-heading">
        <span className="extension-lead-eyebrow">START YOUR PROJECT</span>
        <h2>Tell us about your extension.</h2>
        <p>Share a few details and our team will get back to you.</p>
      </div>

      <form className="extension-lead-form" onSubmit={handleSubmit}>
        <div className="extension-lead-form-grid">
          <label style={labelStyle}>
            Your name <span aria-hidden="true">*</span>
            <input style={fieldStyle} name="name" value={form.name} onChange={update} placeholder="Full name" autoComplete="name" required />
          </label>
          <label style={labelStyle}>
            Email address <span aria-hidden="true">*</span>
            <input style={fieldStyle} type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" required />
          </label>
        </div>

        <label style={labelStyle}>
          Property address <span aria-hidden="true">*</span>
          <input style={fieldStyle} name="address" value={form.address} onChange={update} placeholder="Enter the property address and postcode" autoComplete="street-address" required />
        </label>

        <label style={labelStyle}>
          Type of project <span aria-hidden="true">*</span>
          <select style={fieldStyle} name="projectType" value={form.projectType} onChange={update} required>
            <option value="">Select your project type</option>
            {PROJECT_TYPES.map((type) => <option value={type} key={type}>{type}</option>)}
          </select>
        </label>

        <label style={labelStyle}>
          Project description <span className="extension-lead-optional">(optional)</span>
          <textarea
            style={{ ...fieldStyle, minHeight: 125, resize: "vertical" }}
            name="description"
            value={form.description}
            onChange={update}
            placeholder="Tell us a little about what you'd like to achieve..."
            rows={4}
          />
        </label>

        {status.error && <p className="extension-lead-error" role="alert">{status.error}</p>}

        <button className="extension-lead-submit" type="submit" disabled={status.loading}>
          {status.loading ? <><LoaderCircle className="extension-lead-spinner" size={18}/> Sending enquiry...</> : <>Send my enquiry <ArrowRight size={18}/></>}
        </button>
        <p className="extension-lead-privacy">Your details are only used to respond to your enquiry.</p>
      </form>
    </section>
  );
}
