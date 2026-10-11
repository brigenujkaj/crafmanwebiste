import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight, ArrowLeft, Check, ChevronDown, FileCheck2,
  MapPin, Phone, Ruler, ShieldCheck, ClipboardCheck, PencilRuler,
  MessageCircle, Clock3, Building2
} from "lucide-react";
import Layout from "../components/DrawingsLayout.jsx";
import DrawingsPlanningForm from "../components/DrawingsPlanningForm.jsx";

// This page leaves DrawingsPlanningForm.jsx entirely unchanged.
// Keep your existing global GTM installation. Do not install GTM twice here.
const PHONE = "02081914122";
const FORM_ENDPOINT = "https://formspree.io/f/maqlqgzz";
const GOLD = "#C6A243";
const DARK = "#171714";

const PACKAGES = [
  { name: "Extension / Loft Planning Package", price: "From £1,149", bestFor: "House extensions & lofts", popular: true,
    intro: "For homeowners who need measured drawings and a planning submission for a proposed extension or loft.",
    includes: ["Measured survey", "Existing scaled plans", "Proposed scaled plans", "Elevations", "Council submission", "Planning guidance"] },
  { name: "Garden Room Package", price: "From £649", bestFor: "Garden offices, gyms & studios",
    intro: "Drawings and advice for an outbuilding, including an initial permitted development assessment.",
    includes: ["Measured survey", "Site and boundary mapping", "Proposed drawings", "Elevations", "Permitted development assessment"] },
  { name: "Layout Alteration Package", price: "From £549", bestFor: "Internal layouts & knock-throughs",
    intro: "Explore a more practical internal layout before committing to construction.",
    includes: ["Measured survey", "Existing floor plans", "Proposed layout options", "Structural opening indicators"] },
  { name: "Building Control Package", price: "From £649", bestFor: "Technical / Building Regulations drawings",
    intro: "Detailed architectural information for a project that is proceeding to the Building Regulations stage.",
    includes: ["Measured survey", "Existing scaled drawings", "Proposed scaled drawings", "Detailed Building Regulations drawings", "Building Control submission", "Compliance guidance"] },
  { name: "Bespoke Package", price: "Price on request", bestFor: "Larger or unusual projects",
    intro: "A tailored design and documentation service for projects requiring a different level of support.",
    includes: ["Project-specific scope", "Concept and layout development", "Feasibility review", "Specialist coordination as agreed", "Custom quotation"] },
];

const GALLERY = [
  { src: "/images/approvals/barkingApproval.jpeg", label: "Planning decision – Barking" },
  { src: "/images/approvals/greenwichApproval.jpeg", label: "Planning decision – Greenwich" },
  { src: "/images/approvals/southwarkApproval.jpeg", label: "Planning decision – Southwark" },
  { src: "/images/approvals/croydonApproval.jpeg", label: "Planning decision – Croydon" },
  { src: "/images/drawingsex14.png", label: "3D visual" },
  { src: "/images/drawingsex15.png", label: "3D visual" },
  { src: "/images/drawingsex13.png", label: "Floor plan" },
  { src: "/images/drawingsex16.png", label: "Floor plans" },
  { src: "/images/drawingsex17.png", label: "Floor plans" },
  { src: "/images/drawingsex18.png", label: "Roof plan" },
  { src: "/images/drawingsex19.png", label: "Elevation drawing" },
  { src: "/images/drawingsex20.png", label: "Elevation drawing" },
  { src: "/images/drawingsex21.png", label: "Roof plan" },
  { src: "/images/drawingsex22.png", label: "Site plan" },
  { src: "/images/drawingsex2.jpeg", label: "Elevation drawing" },
  { src: "/images/drawingsex4.jpeg", label: "Layout drawing" },
  { src: "/images/drawingsex8.jpeg", label: "Roof plan" },
  { src: "/images/drawingsex10.png", label: "Roof plan" },
  { src: "/images/drawingsex11.png", label: "Elevation drawing" },
  { src: "/images/drawingsex12.png", label: "Elevation drawing" },
];

const FAQS = [
  { q: "Do I need planning permission for my extension?", a: "Not always. Some extensions may qualify as permitted development, depending on the house, dimensions, previous alterations and planning constraints. We can assess the likely route before preparing drawings." },
  { q: "Can you submit the application to my council?", a: "Yes. Council planning submission is included in the Extension / Loft Planning Package as listed. Other applications and specialist reports are quoted according to your project." },
  { q: "Are council application fees included?", a: "Council application charges and any third-party reports or specialist fees are separate unless explicitly included in your written quotation." },
  { q: "What if my property is in a conservation area?", a: "Additional restrictions may apply. We review the property details and advise on the appropriate planning route before confirming scope." },
  { q: "Do I need structural calculations and Building Regulations drawings?", a: "Many construction projects need Building Regulations approval. Structural calculations may also be required. These are separate from planning permission and we can advise on the documents your project needs." },
  { q: "How soon can we begin?", a: "Tell us about the property and the proposed works. We'll discuss availability, the survey, deliverables and an estimated programme before you proceed." },
];

const sendEvent = (event, details = {}) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...details });
  }
};

function Cta({ href, children, secondary = false, onClick, full = false }) {
  return <a href={href} onClick={onClick} className={`dp-btn ${secondary ? "dp-btn-outline" : "dp-btn-gold"} ${full ? "dp-btn-full" : ""}`}>{children}<ArrowRight size={17} aria-hidden="true" /></a>;
}

export default function DrawingsPlanning() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [postcode, setPostcode] = useState("");
  const [postcodeStatus, setPostcodeStatus] = useState("idle");
  const [postcodeResult, setPostcodeResult] = useState("");

  useEffect(() => {
    // Respect normal anchor navigation; do not erase #contact-form or #packages.
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    }
  }, []);

  function selectPackage(pkg) {
    setSelectedPackage(pkg.name);
    sendEvent("package_button_click", {
      package_name: pkg.name,
      package_price: pkg.price,
      is_featured: pkg.popular ? "yes" : "no",
    });
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function checkPostcode(e) {
    e.preventDefault();
    const clean = postcode.toUpperCase().replace(/\s+/g, "").trim();
    if (!/^[A-Z]{1,2}\d[A-Z\d]?(?:\d[A-Z]{2})?$/.test(clean)) {
      setPostcodeStatus("error");
      return;
    }
    setPostcodeStatus("loading");
    try {
      const isOutcode = !/\d[A-Z]{2}$/.test(clean);
      const url = isOutcode
        ? `https://api.postcodes.io/outcodes/${encodeURIComponent(clean)}`
        : `https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Postcode lookup failed");
      const json = await res.json();
      if (json.status !== 200 || !json.result) throw new Error("Not found");
      const district = isOutcode
        ? (json.result.admin_district?.[0] || clean)
        : (json.result.admin_district || json.result.outcode);
      setPostcodeResult(district.replace(/^London Borough of /, ""));
      setPostcodeStatus("success");
      // Preserve the existing event name; do not collect a full household postcode in analytics.
      sendEvent("postcode_check_success", {
        submitted_postcode: isOutcode ? clean : json.result.outcode,
        resolved_council_hub: district,
      });
    } catch {
      setPostcodeStatus("error");
    }
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": "https://www.crafman.co.uk/#organization", "name": "Crafman Design and Build", "url": "https://www.crafman.co.uk" },
      { "@type": "Service", "name": "Architectural Drawings and Planning Support", "provider": { "@id": "https://www.crafman.co.uk/#organization" }, "areaServed": ["London", "Essex"], "description": "Measured surveys, extension and loft planning drawings, council submission and Building Regulations drawings." },
      { "@type": "FAQPage", "mainEntity": FAQS.map(({q, a}) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) }
    ]
  };

  return <Layout hideHeader>
    <Helmet>
      <title>Architectural Drawings & Planning London & Essex | Crafman</title>
      <meta name="description" content="Architectural drawings for extensions, lofts, garden rooms and renovations across London & Essex. Measured surveys, council submissions and Building Regulations packages. Request a quote." />
      <link rel="canonical" href="https://www.crafman.co.uk/drawings-planning" />
      <meta property="og:image" content="https://www.crafman.co.uk/images/heroImage.png" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>

    <div className="dp-page">
      {/* Your Layout component owns the site header, including its phone/navigation. */}
      <main>
        <section className="dp-hero" aria-label="Architectural drawings and planning">
          <div className="dp-hero-image">
            <img src="/images/heroImage.png" fetchPriority="high" alt="Crafman architectural drawings transitioning into a contemporary rear extension" />
          </div>
          {/* Real HTML heading for SEO/accessibility. The hero image contains decorative headline artwork. */}
          <h1 className="dp-visually-hidden">Architectural Drawings and Planning in London and Essex</h1>
          <div className="dp-hero-cta">
            <div className="dp-wrap dp-hero-cta-inner">
              <div>
                <div className="dp-eyebrow dp-gold">DRAWINGS • PLANNING • BUILDING REGULATIONS</div>
                <p>Tell us what you want to build. We'll help you identify the right drawings and approval route.</p>
              </div>
              <div className="dp-hero-actions">
                <Cta href="#contact-form" onClick={() => sendEvent("hero_cta_click", { action: "request_review" })}>Get a project review</Cta>
                <Cta href="#packages" secondary onClick={() => sendEvent("hero_cta_click", { action: "view_packages" })}>See packages & prices</Cta>
              </div>
            </div>
          </div>
        </section>

        <section className="dp-proof-strip">
          <div className="dp-wrap dp-proof-grid">
            <span><MapPin size={18} /> London & Essex projects</span>
            <span><Ruler size={18} /> Measured surveys & scaled drawings</span>
            <span><FileCheck2 size={18} /> Council submission support</span>
          </div>
        </section>

        <section className="dp-section dp-light" id="how-it-works">
          <div className="dp-wrap">
            <div className="dp-centered dp-narrow"><span className="dp-eyebrow">A SIMPLE WAY TO START</span><h2>From your idea to the right approval route</h2><p>Know what happens next before paying for the wrong drawings or application.</p></div>
            <div className="dp-steps">
              {[
                { icon: MessageCircle, n: "01", title: "Tell us about the property", text: "Share the postcode, the type of project and what you'd like to achieve." },
                { icon: PencilRuler, n: "02", title: "Choose the drawing package", text: "We'll discuss scope, survey requirements and the likely planning or technical route." },
                { icon: ClipboardCheck, n: "03", title: "Drawings & submission", text: "We prepare agreed documents and handle included submissions, keeping you informed." }
              ].map(item => <article className="dp-step" key={item.n}><div className="dp-step-icon"><item.icon size={24} /></div><span className="dp-step-num">{item.n}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
            </div>
            <div className="dp-centered dp-section-cta"><Cta href="#contact-form">Discuss my project</Cta></div>
          </div>
        </section>

        <section className="dp-section dp-white" id="packages">
          <div className="dp-wrap">
            <div className="dp-section-heading"><div><span className="dp-eyebrow">CLEAR STARTING PRICES</span><h2>Choose the right package for your project</h2><p>Pricing begins at the amounts shown. We'll confirm your exact scope, inclusions and third-party charges before you proceed.</p></div><a className="dp-text-link" href="#contact-form">Not sure? Ask us <ArrowRight size={17}/></a></div>
            <div className="dp-package-grid">
              {PACKAGES.map(pkg => <article className={`dp-package ${pkg.popular ? "dp-package-featured" : ""}`} key={pkg.name}>
                {pkg.popular && <div className="dp-ribbon">Popular for extensions & lofts</div>}
                <div className="dp-package-top"><span className="dp-mini">{pkg.bestFor}</span><h3>{pkg.name}</h3><div className="dp-price">{pkg.price}</div><p>{pkg.intro}</p></div>
                <div className="dp-package-includes"><strong>What's included</strong>{pkg.includes.map(value => <div key={value}><Check size={16}/><span>{value}</span></div>)}</div>
                <button type="button" className={`dp-btn ${pkg.popular ? "dp-btn-gold" : "dp-btn-dark"} dp-btn-full`} onClick={() => selectPackage(pkg)}>Enquire about this package <ArrowRight size={17}/></button>
              </article>)}
            </div>
            <p className="dp-fineprint">Council fees, structural engineering, specialist reports and VAT (if applicable) should be confirmed in the individual quotation. Planning decisions are made by the relevant local authority.</p>
          </div>
        </section>

        <section className="dp-section dp-gallery-section" id="portfolio-showcase">
          <div className="dp-wrap">
            <div className="dp-centered dp-narrow"><span className="dp-eyebrow">REAL PROJECT DOCUMENTATION</span><h2>See the drawings and planning work</h2><p>Browse examples of planning decisions, floor plans, elevations and 3D visuals from our gallery.</p></div>
            <div className="dp-gallery">
              <div className="dp-gallery-stage"><img src={GALLERY[activeImage].src} alt={GALLERY[activeImage].label} loading="lazy" /><span className="dp-gallery-label">{GALLERY[activeImage].label}</span>
                <button type="button" className="dp-gallery-arrow dp-gallery-prev" aria-label="Previous drawing" onClick={() => {setActiveImage(i => (i + GALLERY.length - 1) % GALLERY.length); sendEvent("portfolio_nav_click", { direction: "prev", item_index: activeImage });}}><ArrowLeft size={20}/></button>
                <button type="button" className="dp-gallery-arrow dp-gallery-next" aria-label="Next drawing" onClick={() => {setActiveImage(i => (i + 1) % GALLERY.length); sendEvent("portfolio_nav_click", { direction: "next", item_index: activeImage });}}><ArrowRight size={20}/></button>
              </div>
              <div className="dp-thumbnails">{GALLERY.map((img, i) => <button type="button" key={`${img.src}-${i}`} className={i === activeImage ? "dp-thumb dp-thumb-active" : "dp-thumb"} onClick={() => { setActiveImage(i); sendEvent("portfolio_thumbnail_click", { item_index: i }); }} aria-label={`View ${img.label} ${i + 1}`} aria-pressed={i === activeImage}><img src={img.src} alt="" loading="lazy" /></button>)}</div>
            </div>
            <div className="dp-centered dp-section-cta"><Cta href="#contact-form">Get drawings for my property</Cta></div>
          </div>
        </section>

        <section className="dp-section dp-white" id="contact-form">
          <div className="dp-wrap dp-form-layout">
            <aside className="dp-form-intro">
              <span className="dp-eyebrow">YOUR NEXT STEP</span>
              {selectedPackage && <div className="dp-selected"><strong>Selected package</strong><div>{selectedPackage}</div><span>{PACKAGES.find(p => p.name === selectedPackage)?.price}</span></div>}
             
            </aside>
            <div className="dp-form-card">
             
              {/* CRITICAL: preserve existing form component, props and Formspree destination */}
              <DrawingsPlanningForm endpoint={FORM_ENDPOINT} selectedPackage={selectedPackage} />
            </div>
          </div>
        </section>

        <section className="dp-section dp-postcode-section" id="coverage">
          <div className="dp-wrap dp-postcode-layout">
            <div><span className="dp-eyebrow dp-gold">LOCAL PLANNING KNOWLEDGE</span><h2>Check your council area</h2><p>Enter a London or Essex postcode to identify its district. We'll confirm whether we can take on your project when you enquire.</p></div>
            <form className="dp-postcode-card" onSubmit={checkPostcode}>
              <label htmlFor="dp-postcode">Property postcode</label>
              <div className="dp-postcode-row"><input id="dp-postcode" type="text" autoComplete="postal-code" value={postcode} onChange={e => {setPostcode(e.target.value); setPostcodeStatus("idle");}} placeholder="e.g. RM8 2BY" aria-describedby="dp-postcode-result" /><button type="submit" disabled={postcodeStatus === "loading"}>{postcodeStatus === "loading" ? "Checking…" : "Check area"}</button></div>
              <div id="dp-postcode-result" aria-live="polite" className="dp-postcode-result">{postcodeStatus === "success" ? `District identified: ${postcodeResult}. Ask us to confirm service availability and planning requirements.` : postcodeStatus === "error" ? "We couldn't validate that postcode. Please check it and try again." : "District lookup only — not an assessment of planning permission or availability."}</div>
            </form>
          </div>
        </section>

        <section className="dp-section dp-light" id="faqs">
          <div className="dp-wrap dp-faq-layout">
            <div><span className="dp-eyebrow">FREQUENT QUESTIONS</span><h2>Answers before you get started</h2><p>Planning can be confusing. Here are the questions we hear most often.</p><Cta href="#contact-form">Ask about my property</Cta></div>
            <div className="dp-faq-list">{FAQS.map((item,i) => <div className="dp-faq" key={item.q}><button type="button" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{item.q}</span><ChevronDown size={19} className={openFaq === i ? "dp-chevron-open" : ""}/></button>{openFaq === i && <p>{item.a}</p>}</div>)}</div>
          </div>
        </section>

        <section className="dp-bottom-cta"><div className="dp-wrap dp-bottom-cta-inner"><div><span className="dp-eyebrow dp-gold">READY TO GET STARTED?</span><h2>Make the next step clear.</h2><p>Tell us about your extension, loft or renovation and we'll help you work out the drawing package you need.</p></div><div className="dp-bottom-actions"><Cta href="#contact-form">Start my enquiry</Cta><a href={`tel:${PHONE}`} className="dp-call-link" onClick={() => sendEvent("phone_click", { location: "bottom_cta" })}><Phone size={17}/> {PHONE}</a></div></div></section>
      </main>
      <footer className="dp-footer"><div className="dp-wrap dp-footer-inner"><div><strong>Crafman <span>Architectural</span></strong><p>Architectural drawings & planning support across London and Essex.</p><small>© {new Date().getFullYear()} Crafman Building and Landscaping Ltd.</small></div><div className="dp-footer-links"><a href="#packages">Packages</a><a href="#portfolio-showcase">Our work</a><a href="#faqs">FAQs</a><a href="#contact-form">Enquire</a><a href={`tel:${PHONE}`}>Call {PHONE}</a></div></div></footer>
      <div className="dp-mobile-sticky" aria-label="Quick enquiry actions"><a href="#contact-form">Get a project review <ArrowRight size={17}/></a><a href={`tel:${PHONE}`} aria-label="Call Crafman"><Phone size={20}/></a></div>
    </div>
    <style>{`
      .dp-page{--gold:${GOLD};--dark:${DARK};font-family:inherit;color:#231f19;overflow-x:clip} .dp-page *{box-sizing:border-box} .dp-page img{max-width:100%} .dp-wrap{width:min(1160px,calc(100% - 40px));margin-inline:auto} .dp-section{padding:76px 0;scroll-margin-top:85px} .dp-light{background:#f8f6f1}.dp-white{background:#fff}.dp-centered{text-align:center}.dp-narrow{max-width:680px;margin:0 auto}.dp-eyebrow{font-size:11px;font-weight:800;letter-spacing:1.8px;color:#977018}.dp-gold{color:#e4bc67}.dp-page h2{font-size:clamp(29px,3.6vw,43px);line-height:1.13;letter-spacing:-.9px;margin:12px 0 16px}.dp-page h3{line-height:1.24}.dp-page p{line-height:1.65}.dp-narrow p,.dp-section-heading p{color:#666058}.dp-btn{border:0;cursor:pointer;display:inline-flex;gap:12px;align-items:center;justify-content:center;padding:15px 21px;font:inherit;font-size:14px;font-weight:800;text-decoration:none;border-radius:9px;transition:transform .2s,background .2s;min-height:48px}.dp-btn:hover{transform:translateY(-2px)}.dp-btn-gold{background:linear-gradient(115deg,#a67c00,#c6a243);color:#fff}.dp-btn-outline{background:transparent;border:1px solid #a58a48;color:#fff}.dp-btn-dark{background:#211e19;color:#fff}.dp-btn-full{width:100%}.dp-visually-hidden{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}.dp-hero{background:#0d0d0b}.dp-hero-image img{display:block;width:100%;height:auto}.dp-hero-cta{background:#141310;border-top:1px solid #413923}.dp-hero-cta-inner{padding:19px 0;display:flex;align-items:center;justify-content:space-between;gap:28px}.dp-hero-cta p{color:#e0d9ca;margin:7px 0 0;font-size:14px;max-width:520px}.dp-hero-actions{display:flex;gap:10px;flex-shrink:0}.dp-proof-strip{background:#fff;border-bottom:1px solid #ede9df}.dp-proof-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:18px 0}.dp-proof-grid span{display:flex;align-items:center;justify-content:center;gap:9px;font-size:13px;font-weight:700;color:#4d473e}.dp-proof-grid svg{color:#a67c00;flex-shrink:0}.dp-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:35px}.dp-step{position:relative;background:#fff;border:1px solid #eae4d9;border-radius:16px;padding:26px}.dp-step-icon{display:inline-flex;background:#f7f0df;color:#a67c00;padding:12px;border-radius:12px}.dp-step-num{position:absolute;top:27px;right:25px;color:#c6b895;font-weight:900}.dp-step h3{font-size:20px;margin:18px 0 9px}.dp-step p{font-size:14px;color:#655f55;margin:0}.dp-section-cta{margin-top:30px}.dp-section-heading{display:flex;justify-content:space-between;align-items:end;gap:25px;margin-bottom:28px}.dp-section-heading>div{max-width:670px}.dp-section-heading p{margin:0}.dp-text-link{color:#8d6916;font-weight:800;text-decoration:none;display:inline-flex;gap:6px;align-items:center;white-space:nowrap}.dp-package-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.dp-package{position:relative;display:flex;flex-direction:column;min-width:0;border:1px solid #e4ded3;border-radius:16px;padding:24px;background:#fff}.dp-package-featured{background:#211f1b;color:#fff;border-color:#c6a243}.dp-ribbon{font-size:11px;color:#e8c875;font-weight:800;letter-spacing:.3px;margin-bottom:12px}.dp-mini{color:#9c792d;text-transform:uppercase;font-size:11px;font-weight:800;letter-spacing:1px}.dp-package-featured .dp-mini{color:#e4bc67}.dp-package h3{font-size:19px;margin:10px 0}.dp-price{font-size:28px;font-weight:900;margin-bottom:8px}.dp-package-top p{color:#6d655a;font-size:14px;margin:0}.dp-package-featured .dp-package-top p{color:#d2ccc1}.dp-package-includes{display:grid;gap:10px;margin:24px 0;flex:1;font-size:14px}.dp-package-includes strong{margin-bottom:4px}.dp-package-includes>div{display:flex;gap:10px;align-items:start}.dp-package-includes svg{flex-shrink:0;color:#ba963a}.dp-fineprint{font-size:12px;color:#756b61;margin-top:20px}.dp-gallery-section{background:#f7f5f0}.dp-gallery{max-width:900px;margin:30px auto 0}.dp-gallery-stage{height:min(54vw,480px);min-height:240px;position:relative;background:#222;border-radius:16px;overflow:hidden;display:flex;align-items:center;justify-content:center}.dp-gallery-stage>img{width:100%;height:100%;object-fit:contain}.dp-gallery-label{position:absolute;top:15px;left:15px;background:#1b1b1be5;color:#edc873;padding:8px 12px;border-radius:8px;font-size:12px;font-weight:800}.dp-gallery-arrow{position:absolute;top:50%;transform:translateY(-50%);display:grid;place-items:center;background:#ffffffed;color:#201d17;border:0;border-radius:50%;width:42px;height:42px;cursor:pointer}.dp-gallery-prev{left:12px}.dp-gallery-next{right:12px}.dp-thumbnails{display:flex;gap:9px;overflow-x:auto;padding:12px 0}.dp-thumb{flex:0 0 86px;height:61px;border:2px solid transparent;border-radius:8px;overflow:hidden;padding:0;background:#211f1b;opacity:.66;cursor:pointer}.dp-thumb-active{border-color:#a67c00;opacity:1}.dp-thumb img{height:100%;width:100%;object-fit:cover}.dp-form-layout{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:46px;align-items:start}.dp-form-intro{padding-top:10px}.dp-form-intro>p{color:#655f56;font-size:16px}.dp-form-benefits{display:grid;gap:15px;margin-top:28px}.dp-form-benefits>div{display:flex;align-items:start;gap:10px;font-weight:650}.dp-form-benefits svg{color:#9b761d;flex-shrink:0}.dp-selected{margin-top:25px;padding:18px;background:#f7f3e9;border:1px solid #e9ddc4;border-radius:12px}.dp-selected strong{display:block;font-size:12px;text-transform:uppercase;letter-spacing:1px}.dp-selected div{font-weight:800;margin-top:5px}.dp-selected span{color:#977018}.dp-call-box{display:flex;gap:12px;margin-top:28px;padding-top:24px;border-top:1px solid #e8e2d9}.dp-call-box svg{color:#987319}.dp-call-box strong,.dp-call-box a{display:block}.dp-call-box a{font-size:21px;color:#987319;font-weight:800;text-decoration:none;margin-top:4px}.dp-form-card{padding:24px;border:1px solid #e9e2d5;background:#fdfcf9;border-radius:16px;box-shadow:0 14px 35px #1d1b1610;min-width:0}.dp-form-card h3{font-size:23px;margin:0 0 4px}.dp-form-card>p{color:#6d675f;font-size:14px;margin:0 0 20px}.dp-postcode-section{background:#211e19;color:#fff}.dp-postcode-layout{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}.dp-postcode-layout p{color:#d6cfc4;max-width:500px}.dp-postcode-card{background:#322e26;border:1px solid #554931;border-radius:13px;padding:22px;min-width:0}.dp-postcode-card label{display:block;font-size:13px;font-weight:750;margin-bottom:10px}.dp-postcode-row{display:flex;gap:9px}.dp-postcode-row input{min-width:0;flex:1;padding:13px;border-radius:7px;border:1px solid #746d5c;background:#fff;color:#231f19;font-size:15px}.dp-postcode-row button{border:0;background:#c6a243;color:#171714;border-radius:7px;font-weight:800;padding:10px 16px;cursor:pointer}.dp-postcode-row button:disabled{opacity:.6}.dp-postcode-result{font-size:12px;color:#d0c6b6;margin-top:12px;line-height:1.5}.dp-faq-layout{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:55px}.dp-faq-layout>div:first-child>p{margin-bottom:25px;color:#645d53}.dp-faq-list{display:grid;gap:11px}.dp-faq{border:1px solid #e3dccf;border-radius:12px;background:#fff;overflow:hidden}.dp-faq button{background:none;border:0;width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 20px;font:inherit;font-weight:800;font-size:15px;text-align:left;cursor:pointer;color:#231f19}.dp-faq svg{flex-shrink:0;transition:transform .2s}.dp-chevron-open{transform:rotate(180deg)}.dp-faq p{padding:0 20px 18px;margin:0;color:#625d54;font-size:14px}.dp-bottom-cta{background:#151411;color:#fff;padding:48px 0}.dp-bottom-cta-inner{display:flex;justify-content:space-between;align-items:center;gap:35px}.dp-bottom-cta h2{font-size:34px;margin:10px 0}.dp-bottom-cta p{color:#d6d0c6;max-width:590px;margin:0}.dp-bottom-actions{display:grid;gap:13px;justify-items:center;flex-shrink:0}.dp-call-link{color:#eac86c;display:flex;gap:9px;align-items:center;text-decoration:none;font-weight:800}.dp-footer{background:#11110f;color:#bcb7ae;border-top:1px solid #39352e}.dp-footer-inner{padding:32px 0;display:flex;justify-content:space-between;gap:25px}.dp-footer strong{color:#fff}.dp-footer strong span{color:#d5a93f}.dp-footer p{margin:7px 0;font-size:13px}.dp-footer small{font-size:12px}.dp-footer-links{display:flex;gap:15px;flex-wrap:wrap;align-content:center}.dp-footer-links a{color:#d6d0c4;text-decoration:none;font-size:13px}.dp-mobile-sticky{display:none}
      @media(max-width:1000px){.dp-package-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.dp-hero-cta-inner{flex-direction:column;text-align:center}.dp-hero-actions{justify-content:center}}
      @media(max-width:768px){.dp-wrap{width:min(100% - 32px,1160px)}.dp-section{padding:52px 0}.dp-proof-grid{grid-template-columns:1fr;gap:11px;padding:15px 0}.dp-proof-grid span{justify-content:start}.dp-steps,.dp-package-grid,.dp-form-layout,.dp-postcode-layout,.dp-faq-layout{grid-template-columns:1fr}.dp-section-heading,.dp-bottom-cta-inner{flex-direction:column;align-items:start}.dp-hero-cta-inner{padding:20px 0}.dp-hero-actions{display:grid;width:100%}.dp-gallery-stage{height:290px}.dp-form-layout{gap:26px}.dp-postcode-layout{gap:17px}.dp-faq-layout{gap:22px}.dp-footer-inner{flex-direction:column}.dp-bottom-cta{padding-bottom:80px}.dp-mobile-sticky{display:flex;position:fixed;bottom:0;left:0;right:0;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:#151411;z-index:999;gap:9px;box-shadow:0 -5px 20px #0003}.dp-mobile-sticky a:first-child{flex:1;display:flex;gap:9px;justify-content:center;align-items:center;background:#c6a243;color:#161510;text-decoration:none;font-size:14px;font-weight:850;border-radius:8px;min-height:47px}.dp-mobile-sticky a:last-child{width:52px;display:grid;place-items:center;color:#e6ca78;border:1px solid #7e692d;border-radius:8px}.dp-page{padding-bottom:65px}}
      @media(max-width:480px){.dp-hero-image img{width:100%;height:auto}.dp-page h2{font-size:29px}.dp-gallery-stage{height:245px}.dp-postcode-row{flex-direction:column}.dp-postcode-row button{min-height:45px}.dp-package{padding:20px}.dp-form-card{padding:16px}.dp-gallery-label{font-size:10px}}
      @media(prefers-reduced-motion:reduce){.dp-page *{scroll-behavior:auto!important;transition:none!important}}
    `}</style>
  </Layout>;
}
