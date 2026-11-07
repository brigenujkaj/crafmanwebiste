import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FORM_ENDPOINT = "https://formspree.io/f/mnjlqwgn";

const EXTENSION_FORM_STYLES = String.raw`.extension-lead-card{padding:clamp(22px,4vw,38px);background:#fff;color:#24231e;border:1px solid #e3ded2;box-shadow:0 22px 55px rgba(0,0,0,.16)}
.extension-lead-heading{margin-bottom:25px}
.extension-lead-kicker{color:#9b7b36;font-size:9px;font-weight:850;letter-spacing:.19em}
.extension-lead-heading h3{margin:10px 0 6px;font-size:clamp(25px,3vw,32px);line-height:1.08;letter-spacing:-.04em}
.extension-lead-heading p{margin:0;color:#777267;font-size:13px}
.extension-lead-form{display:grid;gap:15px}
.extension-lead-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}
.extension-lead-form label{display:grid;gap:7px;min-width:0}
.extension-lead-form label>span{font-size:11px;font-weight:800;color:#38362f}
.extension-lead-form label b{color:#a07e32}
.extension-lead-form label small{color:#8c887e;font-weight:500}
.extension-lead-form input,.extension-lead-form select,.extension-lead-form textarea{width:100%;min-height:48px;padding:12px 13px;border:1px solid #ddd8ce;border-radius:3px;background:#fff;color:#26251f;font:inherit;font-size:13px;outline:none;box-sizing:border-box;transition:border-color .18s ease,box-shadow .18s ease}
.extension-lead-form textarea{min-height:106px;resize:vertical}
.extension-lead-form input:focus,.extension-lead-form select:focus,.extension-lead-form textarea:focus{border-color:#b18d3d;box-shadow:0 0 0 3px rgba(198,162,67,.13)}
.extension-lead-form button{min-height:52px;padding:12px 18px;display:flex;align-items:center;justify-content:center;gap:14px;border:0;border-radius:3px;background:#c6a243;color:#181713;font:inherit;font-size:12px;font-weight:850;cursor:pointer;transition:background .2s ease,transform .2s ease}
.extension-lead-form button:hover{background:#e1c574;transform:translateY(-2px)}
.extension-lead-form button:disabled{opacity:.65;cursor:wait;transform:none}
.extension-lead-note{margin:0;text-align:center;color:#8a867c;font-size:10px}
.extension-lead-error{margin:0;padding:11px 13px;background:#fff0ee;color:#a12c22;font-size:12px}
@media(max-width:560px){.extension-lead-card{padding:22px 17px}.extension-lead-grid{grid-template-columns:1fr}}
.extension-success-page{min-height:68vh;padding:70px 20px;display:grid;place-items:center;background:#f5f3ee}
.extension-success-card{width:min(620px,100%);padding:clamp(28px,5vw,52px);background:#fff;border:1px solid #e5dfd2;text-align:center;box-shadow:0 20px 60px rgba(20,18,13,.07)}
.extension-success-mark{width:70px;height:70px;margin:0 auto 22px;display:grid;place-items:center;border-radius:50%;background:#f1ead8;color:#9b7b36;font-size:34px;font-weight:500}
.extension-success-card h1{margin:12px 0;font-size:clamp(30px,5vw,43px);line-height:1.06;letter-spacing:-.05em;color:#181713}
.extension-success-card p{max-width:470px;margin:0 auto 26px;color:#777267;font-size:14px;line-height:1.75}
.extension-success-button{display:inline-flex;align-items:center;justify-content:center;gap:15px;min-height:50px;padding:0 22px;background:#c6a243;color:#181713;text-decoration:none;font-size:12px;font-weight:850}


/* CRAF​​MAN BLACK & GOLD FORM THEME */
.extension-lead-card{
  background:linear-gradient(145deg,#171714,#0d0d0b);
  color:#f4ecd8;
  border:1px solid rgba(200,166,75,.6);
  box-shadow:0 24px 65px rgba(0,0,0,.38);
}
.extension-lead-heading h3{color:#e6cd83}
.extension-lead-heading p{color:#c0b38f}
.extension-lead-kicker{color:#d6b65d}
.extension-lead-form label>span{color:#ead9ac}
.extension-lead-form label b{color:#e6cd83}
.extension-lead-form label small{color:#b6a77e}
.extension-lead-form input,
.extension-lead-form select,
.extension-lead-form textarea{
  background:#090908;
  border:1px solid rgba(200,166,75,.42);
  color:#f4ecd8;
  caret-color:#e6cd83;
}
.extension-lead-form input::placeholder,
.extension-lead-form textarea::placeholder{color:#8f866f;opacity:1}
.extension-lead-form select option{background:#10100e;color:#f4ecd8}
.extension-lead-form input:focus,
.extension-lead-form select:focus,
.extension-lead-form textarea:focus{
  border-color:#e6cd83;
  box-shadow:0 0 0 3px rgba(200,166,75,.18);
}
.extension-lead-form button{
  background:#c8a64b;
  color:#090909;
  border:1px solid #e6cd83;
}
.extension-lead-form button:hover{background:#e6cd83;color:#090909}
.extension-lead-form button:disabled{background:#806a35;color:#111}
.extension-lead-note{color:#b6a77e}
.extension-lead-error{background:#321a16;color:#ffd1c9;border:1px solid #9c5144}
.extension-success-page{background:#090908;color:#f4ecd8}
.extension-success-card{
  background:linear-gradient(145deg,#171714,#0d0d0b);
  border:1px solid rgba(200,166,75,.6);
  box-shadow:0 22px 60px rgba(0,0,0,.4);
}
.extension-success-mark{background:rgba(200,166,75,.13);color:#e6cd83;border:1px solid rgba(200,166,75,.45)}
.extension-success-card h1{color:#e6cd83}
.extension-success-card p{color:#c0b38f}
.extension-success-button{background:#c8a64b;color:#090909;border:1px solid #e6cd83}
.extension-success-button:hover{background:#e6cd83}

`;

const PROJECT_TYPES = [
    "Rear extension",
    "Wraparound extension",
    "Single-storey extension",
    "Double-storey extension",
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

    function update(event) {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        if (status.error) setStatus({ loading: false, error: "" });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (status.loading) return;

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

            if (typeof window !== "undefined") {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: "extension_form_conversion",
                    form_name: "Extension Lead Form",
                    project_type: lead.project_type,
                });

                // Preserve the existing Google Ads conversion action used by the original extension form.
                if (typeof window.gtag === "function") {
                    window.gtag("event", "conversion", {
                        send_to: "AW-16534080284/ooPfCN2175McEJyWiMw9",
                        value: 1.0,
                        currency: "GBP",
                    });
                }
            }

            navigate("/extensionFormSuccess", { replace: true, state: { submitted: true } });
        } catch (error) {
            setStatus({
                loading: false,
                error: error?.message || "Something went wrong. Please try again.",
            });
        }
    }

    return (
        <div className="extension-lead-card">
            <style>{EXTENSION_FORM_STYLES}</style>
            <div className="extension-lead-heading">
                <span className="extension-lead-kicker">YOUR EXTENSION PROJECT</span>
                <h3>Let's get started.</h3>
                <p>Share a few details. We'll take it from there.</p>
            </div>

            <form className="extension-lead-form" onSubmit={handleSubmit}>
                <div className="extension-lead-grid">
                    <label>
                        <span>Name <b>*</b></span>
                        <input name="name" value={form.name} onChange={update} placeholder="Your full name" autoComplete="name" required />
                    </label>
                    <label>
                        <span>Email <b>*</b></span>
                        <input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" required />
                    </label>
                </div>

                <label>
                    <span>Property address <b>*</b></span>
                    <input name="address" value={form.address} onChange={update} placeholder="Address and postcode" autoComplete="street-address" required />
                </label>

                <label>
                    <span>Type of project <b>*</b></span>
                    <select name="projectType" value={form.projectType} onChange={update} required>
                        <option value="">Choose your project type</option>
                        {PROJECT_TYPES.map((type) => <option value={type} key={type}>{type}</option>)}
                    </select>
                </label>

                <label>
                    <span>Project description <small>(optional)</small></span>
                    <textarea name="description" value={form.description} onChange={update} rows={4} placeholder="What would you like to achieve?" />
                </label>

                {status.error && <p className="extension-lead-error" role="alert">{status.error}</p>}

                <button type="submit" disabled={status.loading}>
                    {status.loading ? "Sending enquiry…" : "Send enquiry"} <span aria-hidden="true">↗</span>
                </button>
                <p className="extension-lead-note">Your details are sent securely so our team can respond to your enquiry.</p>
            </form>
        </div>
    );
}
