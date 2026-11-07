import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, CheckCircle2, ChevronDown, Hammer, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { submitLeadToCrafmanOS } from "../lib/crafmanLeadIntake.js";
import "../styles/lead-generation.css";

const FORM_ENDPOINT = "https://formspree.io/f/mojpjokd";
const PHONE = "07858815820";
const PHONE_DISPLAY = "07858 815820";

const BUDGETS = [
  { label: "Under £30,000", low: 0, high: 30000 },
  { label: "£30,000–£50,000", low: 30000, high: 50000 },
  { label: "£50,000–£75,000", low: 50000, high: 75000 },
  { label: "£75,000–£100,000", low: 75000, high: 100000 },
  { label: "£100,000–£150,000", low: 100000, high: 150000 },
  { label: "£150,000+", low: 150000, high: undefined },
  { label: "Not sure yet", low: undefined, high: undefined },
];

const TIMINGS = ["As soon as possible", "Within 1–3 months", "Within 3–6 months", "Within 6–12 months", "Just exploring" ];

function pushEvent(event, details = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...details });
}


async function sendFallbackEmail(values, config) {
  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: values.name,
      phone: values.phone,
      email: values.email,
      postcode: values.postcode,
      projectType: values.projectType,
      budget: values.budget,
      timeframe: values.timeframe,
      propertyStatus: values.propertyStatus,
      message: values.message,
      submittedFrom: config.formName,
      submittedAt: new Date().toISOString(),
      pageUrl: window.location.href,
      referrer: document.referrer,
    }),
  });
  if (!response.ok) throw new Error("The enquiry could not be submitted. Please call us instead.");
  return response.json().catch(() => ({}));
}

function LeadForm({ config }) {
  const [values, setValues] = useState({
    name: "", phone: "", email: "", postcode: "", projectType: config.projectTypes[0],
    budget: "£50,000–£75,000", timeframe: "Within 3–6 months", propertyStatus: "I own the property", message: "",
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: "", crmPending: false });

  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ loading: true, success: false, error: "", crmPending: false });

    const selectedBudget = BUDGETS.find((item) => item.label === values.budget) || {};
    const description = [
      `Budget: ${values.budget}`,
      `Preferred start: ${values.timeframe}`,
      `Property status: ${values.propertyStatus}`,
      values.message ? `Project details: ${values.message}` : "",
    ].filter(Boolean).join("\n");

    let crmSynced = false;
    let crmError = null;
    try {
      await submitLeadToCrafmanOS({
        client_name: values.name,
        phone: values.phone,
        email: values.email,
        postcode: values.postcode,
        project_type: values.projectType,
        description,
        owned_property: values.propertyStatus === "I own the property",
        desired_start: values.timeframe,
        estimated_value_low: selectedBudget.low,
        estimated_value_high: selectedBudget.high,
        form_name: config.formName,
      });
      crmSynced = true;
    } catch (error) {
      crmError = error;
      console.error("[Crafman] CRM intake failed; attempting email backup.", error);
    }

    if (!crmSynced) {
      try {
        await sendFallbackEmail(values, config);
      } catch (fallbackError) {
        console.error("[Crafman] Both CRM and email submission failed.", { crmError, fallbackError });
        setStatus({ loading: false, success: false, error: "We couldn't send your enquiry just now. Please call us on 07858 815820 and we'll be happy to help.", crmPending: false });
        return;
      }
    }

    pushEvent("generate_lead", {
      lead_type: config.leadType,
      project_type: values.projectType,
      budget_range: values.budget,
      timeframe: values.timeframe,
      form_name: config.formName,
      crm_sync_status: crmSynced ? "success" : "email_fallback",
      lead_source: "website",
    });
    if (!crmSynced) {
      pushEvent("crafman_os_lead_sync_failed", { form_name: config.formName, lead_type: config.leadType });
    }

    setStatus({ loading: false, success: true, error: "", crmPending: !crmSynced });
    setValues({ name: "", phone: "", email: "", postcode: "", projectType: config.projectTypes[0], budget: "£50,000–£75,000", timeframe: "Within 3–6 months", propertyStatus: "I own the property", message: "" });
  }

  if (status.success) {
    return (
      <div className="crafman-lead-success" role="status" aria-live="polite">
        <span className="crafman-lead-success-icon"><CheckCircle2 size={28} /></span>
        <p className="crafman-eyebrow">ENQUIRY RECEIVED</p>
        <h3>Thank you. Let's talk about your project.</h3>
        <p>Our team has received your details and will be in touch to discuss the next steps.</p>
        {status.crmPending && <p className="crafman-lead-note">Your enquiry has been securely received through our backup notification route. Our team will add it to the project system.</p>}
        <a className="crafman-btn crafman-btn-dark" href={`tel:${PHONE}`}><Phone size={17} /> Call {PHONE_DISPLAY}</a>
      </div>
    );
  }

  return (
    <form className="crafman-lead-form" onSubmit={handleSubmit}>
      <div className="crafman-form-heading">
        <span className="crafman-eyebrow">YOUR PROJECT STARTS HERE</span>
        <h2>Tell us what you have in mind.</h2>
        <p>A few details help us understand your project and prepare a useful first conversation.</p>
      </div>
      <div className="crafman-form-grid">
        <label className="crafman-field"><span>Your name *</span><input autoComplete="name" name="name" value={values.name} onChange={update} placeholder="Full name" required /></label>
        <label className="crafman-field"><span>Phone number *</span><input autoComplete="tel" type="tel" name="phone" value={values.phone} onChange={update} placeholder="Best contact number" required /></label>
        <label className="crafman-field"><span>Email address</span><input autoComplete="email" type="email" name="email" value={values.email} onChange={update} placeholder="name@example.com" /></label>
        <label className="crafman-field"><span>Property postcode *</span><input autoComplete="postal-code" name="postcode" value={values.postcode} onChange={update} placeholder="e.g. IG7 5XX" required /></label>
        <label className="crafman-field"><span>Project type *</span><span className="crafman-select-wrap"><select name="projectType" value={values.projectType} onChange={update}>{config.projectTypes.map((type) => <option key={type}>{type}</option>)}</select><ChevronDown size={16}/></span></label>
        <label className="crafman-field"><span>Estimated project budget *</span><span className="crafman-select-wrap"><select name="budget" value={values.budget} onChange={update}>{BUDGETS.map((budget) => <option key={budget.label}>{budget.label}</option>)}</select><ChevronDown size={16}/></span></label>
        <label className="crafman-field"><span>When would you like to start?</span><span className="crafman-select-wrap"><select name="timeframe" value={values.timeframe} onChange={update}>{TIMINGS.map((timing) => <option key={timing}>{timing}</option>)}</select><ChevronDown size={16}/></span></label>
        <label className="crafman-field"><span>Property status</span><span className="crafman-select-wrap"><select name="propertyStatus" value={values.propertyStatus} onChange={update}><option>I own the property</option><option>In the process of purchasing</option><option>Other / not yet confirmed</option></select><ChevronDown size={16}/></span></label>
        <label className="crafman-field crafman-field-full"><span>Tell us a little about the project <em>Optional</em></span><textarea name="message" value={values.message} onChange={update} rows="3" placeholder="What would you like to change or build?" /></label>
      </div>
      {status.error && <p className="crafman-form-error" role="alert">{status.error}</p>}
      <button className="crafman-btn crafman-btn-gold crafman-submit" type="submit" disabled={status.loading}>
        {status.loading ? "Sending your enquiry…" : "Request a project consultation"}<ArrowRight size={18}/>
      </button>
      <p className="crafman-form-privacy">By submitting, you agree that Crafman may contact you about this enquiry. Your details are handled in accordance with our <a href="/privacy-policy">Privacy Policy</a>.</p>
      <p className="crafman-form-required">* Required fields</p>
    </form>
  );
}

function FaqItem({ item, index, active, onToggle }) {
  return (
    <div className={`crafman-faq-item ${active ? "is-open" : ""}`}>
      <button type="button" className="crafman-faq-question" aria-expanded={active} onClick={() => onToggle(active ? -1 : index)}>
        <span>{item.q}</span><ChevronDown size={19}/>
      </button>
      {active && <p className="crafman-faq-answer">{item.a}</p>}
    </div>
  );
}

export default function LeadGenerationLandingPage({ config }) {
  const [activeFaq, setActiveFaq] = useState(0);
  const trustPoints = useMemo(() => [
    { icon: ShieldCheck, title: "One accountable team", text: "Design, coordination and construction brought together." },
    { icon: Hammer, title: "Practical build experience", text: "Clear scope, considered details and organised delivery." },
    { icon: MapPin, title: "London & Essex", text: "Serving selected areas across Greater London and Essex." },
  ], []);

  return (
    <div className="crafman-lead-site">
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <link rel="canonical" href={`https://www.crafman.co.uk${config.path}`} />
        <meta property="og:title" content={config.metaTitle} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:image" content={`https://www.crafman.co.uk${config.heroImage}`} />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <header className="crafman-lead-header">
        <a className="crafman-wordmark" href="/" aria-label="Crafman Design and Build home"><span>CRAFMAN</span><small>DESIGN & BUILD</small></a>
        <nav className="crafman-lead-nav" aria-label="Main navigation"><a href="#services">Services</a><a href="#projects">Projects</a><a href="#process">Our approach</a></nav>
        <div className="crafman-header-actions"><a className="crafman-header-phone" href={`tel:${PHONE}`} onClick={() => pushEvent("crafman_phone_click", { page_type: config.leadType })}><Phone size={16}/>{PHONE_DISPLAY}</a><a className="crafman-btn crafman-btn-gold crafman-header-cta" href="#enquiry">Discuss your project <ArrowRight size={16}/></a></div>
      </header>

      <main>
        <section className="crafman-lead-hero" style={{ "--hero-image": `url('${config.heroImage}')` }}>
          <div className="crafman-hero-overlay" />
          <div className="crafman-hero-inner">
            <div className="crafman-hero-copy">
              <p className="crafman-eyebrow crafman-eyebrow-gold">{config.kicker}</p>
              <h1>{config.headline}</h1>
              <p className="crafman-hero-intro">{config.intro}</p>
              <div className="crafman-hero-bullets">{config.heroBullets.map((item) => <span key={item}><Check size={16}/>{item}</span>)}</div>
              <div className="crafman-hero-ctas"><a className="crafman-btn crafman-btn-gold" href="#enquiry">Arrange a consultation <ArrowRight size={18}/></a><a className="crafman-hero-call" href={`tel:${PHONE}`} onClick={() => pushEvent("crafman_phone_click", { page_type: config.leadType })}><Phone size={17}/> Speak to our team</a></div>
              <div className="crafman-hero-proof"><span><Sparkles size={15}/> Family-run business</span><span>20+ years' industry experience</span><span>London & Essex</span></div>
            </div>
            <div className="crafman-hero-form" id="enquiry"><LeadForm config={config}/></div>
          </div>
          <div className="crafman-hero-caption">{config.imageCaption}</div>
        </section>

        <section className="crafman-trust-strip" aria-label="How Crafman works">
          {trustPoints.map(({ icon: Icon, title, text }) => <div className="crafman-trust-item" key={title}><span className="crafman-trust-icon"><Icon size={21}/></span><div><strong>{title}</strong><p>{text}</p></div></div>)}
        </section>

        <section className="crafman-accreditations" aria-label="Accreditations and customer rating">
          <p className="crafman-accreditations-label">TRUSTED. RECOGNISED. REVIEWED.</p>
          <div className="crafman-accreditations-grid">
            <div className="crafman-accreditation-card crafman-fmb-card">
              <img src="/images/fmb.jpeg" alt="Federation of Master Builders" loading="lazy" />
              <span>Federation of Master Builders</span>
            </div>
            <div className="crafman-accreditation-card">
              <img src="/images/trustmark.jpeg" alt="TrustMark Government Endorsed Quality" loading="lazy" />
              <span>TrustMark</span>
            </div>
            <div className="crafman-accreditation-card crafman-google-card">
              <img src="/images/google5Star.jpeg" alt="Google five-star rating graphic" loading="lazy" />
              <span>5-star Google rating</span>
            </div>
          </div>
        </section>

        <section className="crafman-section crafman-services" id="services">
          <div className="crafman-section-heading"><p className="crafman-eyebrow">WHAT WE DO</p><h2>{config.servicesHeading}</h2><p>{config.servicesIntro}</p></div>
          <div className="crafman-service-grid">{config.services.map((service, index) => <article className="crafman-service-card" key={service.title}><span className="crafman-service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.text}</p></article>)}</div>
        </section>

        <section className="crafman-project-band" id="projects">
          <div className="crafman-project-image"><img src={config.projectImage} alt={config.projectImageAlt} loading="lazy"/><span>{config.projectCaption}</span></div>
          <div className="crafman-project-copy"><p className="crafman-eyebrow crafman-eyebrow-gold">PROJECT EXPERIENCE</p><h2>{config.projectHeading}</h2><p>{config.projectText}</p><a href="/case-studies" className="crafman-text-link">Explore project case studies <ArrowRight size={17}/></a></div>
        </section>

        <section className="crafman-section crafman-process" id="process">
          <div className="crafman-section-heading"><p className="crafman-eyebrow">A CLEARER WAY TO BUILD</p><h2>From first conversation to finished space.</h2><p>Good projects start with a clear brief, realistic expectations and a team that understands how the pieces fit together.</p></div>
          <div className="crafman-process-grid">{config.steps.map((step, index) => <div className="crafman-process-step" key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div>
        </section>

        <section className="crafman-faq-section">
          <div className="crafman-faq-layout"><div><p className="crafman-eyebrow crafman-eyebrow-gold">GOOD TO KNOW</p><h2>Questions before you get started?</h2><p>Every property and project is different. Here are a few useful starting points.</p><a className="crafman-btn crafman-btn-gold" href="#enquiry">Talk through your project <ArrowRight size={17}/></a></div><div className="crafman-faq-list">{config.faqs.map((item, index) => <FaqItem key={item.q} item={item} index={index} active={activeFaq === index} onToggle={setActiveFaq}/>)}</div></div>
        </section>

        <section className="crafman-final-cta"><div><p className="crafman-eyebrow crafman-eyebrow-gold">LET'S DISCUSS WHAT'S POSSIBLE</p><h2>{config.finalHeading}</h2><p>{config.finalText}</p></div><a className="crafman-btn crafman-btn-gold" href="#enquiry">Start a conversation <ArrowRight size={18}/></a></section>
      </main>

      <footer className="crafman-lead-footer"><a className="crafman-wordmark" href="/"><span>CRAFMAN</span><small>DESIGN & BUILD</small></a><p>Design. Build. Deliver. <span>London & Essex</span></p><div><a href="/privacy-policy">Privacy policy</a><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a><a href="mailto:admin@crafman.co.uk">admin@crafman.co.uk</a></div><small>© {new Date().getFullYear()} Crafman Building and Landscaping Ltd.</small></footer>
      <div className="crafman-mobile-bar"><a href={`tel:${PHONE}`} onClick={() => pushEvent("crafman_phone_click", { page_type: config.leadType })}><Phone size={17}/> Call</a><a href="#enquiry">Request a consultation <ArrowRight size={17}/></a></div>
    </div>
  );
}
