import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    ArrowRight, ArrowLeft, Check, ChevronDown, FileCheck2,
    MapPin, Phone, Ruler, ShieldCheck, ClipboardCheck, PencilRuler,
    MessageCircle, Clock3, Building2, Menu, X, ChevronRight
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
    {
        name: "Extension / Loft Planning Package", price: "From £1,149", bestFor: "House extensions & lofts", popular: true,
        intro: "For homeowners who need measured drawings and a planning submission for a proposed extension or loft.",
        includes: ["Measured survey", "Existing scaled plans", "Proposed scaled plans", "Elevations", "Council submission", "Planning guidance"]
    },
    {
        name: "Garden Room Package", price: "From £649", bestFor: "Garden offices, gyms & studios",
        intro: "Drawings and advice for an outbuilding, including an initial permitted development assessment.",
        includes: ["Measured survey", "Site and boundary mapping", "Proposed drawings", "Elevations", "Permitted development assessment"]
    },
    {
        name: "Layout Alteration Package", price: "From £549", bestFor: "Internal layouts & knock-throughs",
        intro: "Explore a more practical internal layout before committing to construction.",
        includes: ["Measured survey", "Existing floor plans", "Proposed layout options", "Structural opening indicators"]
    },
    {
        name: "Building Control Package", price: "From £649", bestFor: "Technical / Building Regulations drawings",
        intro: "Detailed architectural information for a project that is proceeding to the Building Regulations stage.",
        includes: ["Measured survey", "Existing scaled drawings", "Proposed scaled drawings", "Detailed Building Regulations drawings", "Building Control submission", "Compliance guidance"]
    },
    {
        name: "Bespoke Package", price: "Price on request", bestFor: "Larger or unusual projects",
        intro: "A tailored design and documentation service for projects requiring a different level of support.",
        includes: ["Project-specific scope", "Concept and layout development", "Feasibility review", "Specialist coordination as agreed", "Custom quotation"]
    },
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

const TESTIMONIALS = [
    { name: "James R.", role: "Rear Extension Planning Drawings", text: "Crafman made the whole process straightforward. The drawings were clear, professional, and exactly what we needed to move ahead with our extension plans." },
    { name: "Sophie M.", role: "Loft Conversion Drawings", text: "Really impressed with the communication and speed. They explained each step clearly and delivered a drawing package that gave us confidence to proceed." },
    { name: "Daniel T.", role: "Planning Application Support", text: "We wanted a reliable service for our home project and Crafman delivered. The drawings looked great and the advice throughout the process was very helpful." },
    { name: "Aisha K.", role: "Single Storey Extension Plans", text: "Professional, responsive, and easy to work with. Everything was laid out clearly and the drawings captured exactly what we discussed." },
    { name: "Michael B.", role: "House Extension Drawings", text: "From the survey to the final plans, everything felt organised and well handled. It made a stressful part of the project much easier." },
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedPackage, setExpandedPackage] = useState("");
    const [activeImage, setActiveImage] = useState(0);
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [openFaq, setOpenFaq] = useState(0);
    const [postcode, setPostcode] = useState("");
    const [postcodeStatus, setPostcodeStatus] = useState("idle");
    const [postcodeResult, setPostcodeResult] = useState("");

    useEffect(() => {
        // Install this original page's GTM container only if the site has not already installed it.
        // Existing event names and the form component's tracking are preserved.
        const id = "GTM-PLFBQMWH";
        if (document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${id}"]`)) return;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
        document.head.appendChild(script);
    }, []);

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
            { "@type": "FAQPage", "mainEntity": FAQS.map(({ q, a }) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) }
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
            {/* This is the conversion-only header for this landing page. The shared header is hidden. */}
            <header className="dp-site-nav">
                <div className="dp-wrap dp-nav-inner">
                    <a href="/" className="dp-brand" aria-label="Crafman home">
                        <strong>CRAF<span>MAN</span></strong>
                        <small>ARCHITECTURAL</small>
                    </a>
                    <nav className={`dp-nav-links ${mobileMenuOpen ? "dp-nav-open" : ""}`} aria-label="Landing page navigation">
                        <a href="#packages" onClick={() => setMobileMenuOpen(false)}>Packages</a>
                        <a href="#portfolio-showcase" onClick={() => setMobileMenuOpen(false)}>Our work</a>
                        <a href="#coverage" onClick={() => setMobileMenuOpen(false)}>Service areas</a>
                        <a href="#faqs" onClick={() => setMobileMenuOpen(false)}>FAQs</a>
                        <a href={`tel:${PHONE}`} className="dp-nav-phone" onClick={() => { setMobileMenuOpen(false); sendEvent("direct_phone_click", { phone_number: PHONE, location: "Landing Page Header" }); }}><Phone size={15} /> {PHONE}</a>
                        <a href="#contact-form" className="dp-nav-cta" onClick={() => { setMobileMenuOpen(false); sendEvent("header_cta_click", { action: "request_quote" }); }}>Get a quote <ArrowRight size={16} /></a>
                    </nav>
                    <div className="dp-nav-mobile-actions">
                        <a href={`tel:${PHONE}`} aria-label="Call Crafman" onClick={() => sendEvent("direct_phone_click", { phone_number: PHONE, location: "Mobile Header" })}><Phone size={21} /></a>
                        <button type="button" onClick={() => setMobileMenuOpen(v => !v)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}</button>
                    </div>
                </div>
            </header>

            <main>
                <section className="dp-hero" aria-label="Architectural drawings and planning">
                    <div className="dp-wrap dp-hero-grid">
                        <div className="dp-hero-copy">
                            <div className="dp-kicker"><span className="dp-pulse" /> LONDON & ESSEX ARCHITECTURAL SERVICES</div>
                            <h1>Planning an <em>extension</em> or loft conversion?</h1>
                            <p className="dp-hero-lead">Professional architectural drawings, practical planning advice and council submission support — so you can move forward with confidence.</p>
                            <div className="dp-hero-bullets"><span><Check size={17} /> Measured surveys</span><span><Check size={17} /> Planning & technical drawings</span><span><Check size={17} /> Council submission support</span></div>
                            <div className="dp-hero-actions">
                                <Cta href="#contact-form" onClick={() => sendEvent("hero_cta_click", { action: "request_review" })}>Get my project reviewed</Cta>
                                <Cta href="#packages" secondary onClick={() => sendEvent("hero_cta_click", { action: "view_packages" })}>View packages & prices</Cta>
                            </div>
                            <p className="dp-hero-assurance"><ShieldCheck size={16} /> No-obligation enquiry. Clear scope before you proceed.</p>
                        </div>
                        <div className="dp-hero-visual" role="img" aria-label="Architectural plans transitioning into a modern completed house extension">
                            {/* Reuses your existing image but crops away its embedded text on desktop. */}
                            <img src="/images/heroImage.png" fetchPriority="high" alt="" />
                            <div className="dp-visual-stamp"><PencilRuler size={16} /> FROM CONCEPT TO PLANNING</div>
                        </div>
                    </div>
                    <div className="dp-hero-bottom-glow" aria-hidden="true" />
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
                        <div className="dp-section-heading"><div><span className="dp-eyebrow">CLEAR STARTING PRICES</span><h2>Choose the right package for your project</h2><p>Pricing begins at the amounts shown. We'll confirm your exact scope, inclusions and third-party charges before you proceed.</p></div><a className="dp-text-link" href="#contact-form">Not sure? Ask us <ArrowRight size={17} /></a></div>
                        <div className="dp-package-grid">
                            {PACKAGES.map(pkg => <article className={`dp-package ${pkg.popular ? "dp-package-featured" : ""}`} key={pkg.name}>
                                {pkg.popular && <div className="dp-ribbon">Popular for extensions & lofts</div>}
                                <div className="dp-package-top"><span className="dp-mini">{pkg.bestFor}</span><h3>{pkg.name}</h3><div className="dp-price">{pkg.price}</div><p>{pkg.intro}</p></div>
                                <button type="button" className="dp-package-toggle" aria-expanded={expandedPackage === pkg.name} onClick={() => { const next = expandedPackage === pkg.name ? "" : pkg.name; setExpandedPackage(next); if (next) sendEvent("package_details_toggle", { package_name: pkg.name, action: "expand", device: window.innerWidth <= 768 ? "mobile" : "desktop" }); }}>
                                    What's included <ChevronDown size={17} className={expandedPackage === pkg.name ? "dp-chevron-open" : ""} />
                                </button>
                                {expandedPackage === pkg.name && <div className="dp-package-includes">{pkg.includes.map(value => <div key={value}><Check size={16} /><span>{value}</span></div>)}</div>}
                                <button type="button" className={`dp-btn ${pkg.popular ? "dp-btn-gold" : "dp-btn-dark"} dp-btn-full`} onClick={() => selectPackage(pkg)}>Enquire about this package <ArrowRight size={17} /></button>
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
                                <button type="button" className="dp-gallery-arrow dp-gallery-prev" aria-label="Previous drawing" onClick={() => { setActiveImage(i => (i + GALLERY.length - 1) % GALLERY.length); sendEvent("portfolio_nav_click", { direction: "prev", item_index: activeImage }); }}><ArrowLeft size={20} /></button>
                                <button type="button" className="dp-gallery-arrow dp-gallery-next" aria-label="Next drawing" onClick={() => { setActiveImage(i => (i + 1) % GALLERY.length); sendEvent("portfolio_nav_click", { direction: "next", item_index: activeImage }); }}><ArrowRight size={20} /></button>
                            </div>
                            <div className="dp-thumbnails">{GALLERY.map((img, i) => <button type="button" key={`${img.src}-${i}`} className={i === activeImage ? "dp-thumb dp-thumb-active" : "dp-thumb"} onClick={() => { setActiveImage(i); sendEvent("portfolio_thumbnail_click", { item_index: i }); }} aria-label={`View ${img.label} ${i + 1}`} aria-pressed={i === activeImage}><img src={img.src} alt="" loading="lazy" /></button>)}</div>
                        </div>
                        <div className="dp-centered dp-section-cta"><Cta href="#contact-form">Get drawings for my property</Cta></div>
                    </div>
                </section>

                <section className="dp-section dp-testimonials" id="testimonials">
                    <div className="dp-wrap">
                        <div className="dp-section-heading">
                            <div><span className="dp-eyebrow">CLIENT FEEDBACK</span><h2>What homeowners say about working with us</h2><p>Feedback from clients about the drawings and planning process.</p></div>
                            <div className="dp-testimonial-controls">
                                <button type="button" aria-label="Previous testimonial" onClick={() => setTestimonialIndex(i => (i + TESTIMONIALS.length - 1) % TESTIMONIALS.length)}><ArrowLeft size={20} /></button>
                                <button type="button" aria-label="Next testimonial" onClick={() => setTestimonialIndex(i => (i + 1) % TESTIMONIALS.length)}><ArrowRight size={20} /></button>
                            </div>
                        </div>
                        <div className="dp-testimonial-grid">
                            {[0, 1, 2].map(offset => { const item = TESTIMONIALS[(testimonialIndex + offset) % TESTIMONIALS.length]; return <blockquote key={`${testimonialIndex}-${offset}`} className={`dp-testimonial ${offset > 0 ? "dp-testimonial-secondary" : ""}`}><div className="dp-testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div><p>“{item.text}”</p><footer><strong>{item.name}</strong><span>{item.role}</span></footer></blockquote>; })}
                        </div>
                    </div>
                </section>

                <section className="dp-section dp-white" id="contact-form">
                    <div className="dp-wrap dp-form-layout">
                        
                           
                          
                            {selectedPackage && <div className="dp-selected"><strong>Selected package</strong><div>{selectedPackage}</div><span>{PACKAGES.find(p => p.name === selectedPackage)?.price}</span></div>}
                           
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
                            <div className="dp-postcode-row"><input id="dp-postcode" type="text" autoComplete="postal-code" value={postcode} onChange={e => { setPostcode(e.target.value); setPostcodeStatus("idle"); }} placeholder="e.g. RM8 2BY" aria-describedby="dp-postcode-result" /><button type="submit" disabled={postcodeStatus === "loading"}>{postcodeStatus === "loading" ? "Checking…" : "Check area"}</button></div>
                            <div id="dp-postcode-result" aria-live="polite" className="dp-postcode-result">{postcodeStatus === "success" ? `District identified: ${postcodeResult}. Ask us to confirm service availability and planning requirements.` : postcodeStatus === "error" ? "We couldn't validate that postcode. Please check it and try again." : "District lookup only — not an assessment of planning permission or availability."}</div>
                        </form>
                    </div>
                </section>

                <section className="dp-section dp-light" id="faqs">
                    <div className="dp-wrap dp-faq-layout">
                        <div><span className="dp-eyebrow">FREQUENT QUESTIONS</span><h2>Answers before you get started</h2><p>Planning can be confusing. Here are the questions we hear most often.</p><Cta href="#contact-form">Ask about my property</Cta></div>
                        <div className="dp-faq-list">{FAQS.map((item, i) => <div className="dp-faq" key={item.q}><button type="button" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{item.q}</span><ChevronDown size={19} className={openFaq === i ? "dp-chevron-open" : ""} /></button>{openFaq === i && <p>{item.a}</p>}</div>)}</div>
                    </div>
                </section>

                <section className="dp-bottom-cta"><div className="dp-wrap dp-bottom-cta-inner"><div><span className="dp-eyebrow dp-gold">READY TO GET STARTED?</span><h2>Make the next step clear.</h2><p>Tell us about your extension, loft or renovation and we'll help you work out the drawing package you need.</p></div><div className="dp-bottom-actions"><Cta href="#contact-form">Start my enquiry</Cta><a href={`tel:${PHONE}`} className="dp-call-link" onClick={() => sendEvent("phone_click", { location: "bottom_cta" })}><Phone size={17} /> {PHONE}</a></div></div></section>
            </main>
            <footer className="dp-footer"><div className="dp-wrap dp-footer-inner"><div><strong>Crafman <span>Architectural</span></strong><p>Architectural drawings & planning support across London and Essex.</p><small>© {new Date().getFullYear()} Crafman Building and Landscaping Ltd.</small></div><div className="dp-footer-links"><a href="#packages">Packages</a><a href="#portfolio-showcase">Our work</a><a href="#faqs">FAQs</a><a href="#contact-form">Enquire</a><a href={`tel:${PHONE}`}>Call {PHONE}</a></div></div></footer>
            <div className="dp-mobile-sticky" aria-label="Quick enquiry actions"><a href="#contact-form">Get a project review <ArrowRight size={17} /></a><a href={`tel:${PHONE}`} aria-label="Call Crafman"><Phone size={20} /></a></div>
        </div>
        <style>{`
      .dp-page{--gold:#C6A243;--gold-light:#E8CB82;--ink:#0b0d0d;--panel:#151818;--panel2:#1c2020;--muted:#aeb2ae;--line:rgba(232,203,130,.15);background:var(--ink);color:#f3f3ed;font-family:Arial,Helvetica,sans-serif;overflow-x:clip}
      .dp-page *{box-sizing:border-box}.dp-page img{max-width:100%}.dp-page a:focus-visible,.dp-page button:focus-visible,.dp-page input:focus-visible{outline:3px solid #e8cb82;outline-offset:3px}
      .dp-wrap{width:min(1180px,calc(100% - 48px));margin-inline:auto}.dp-section{padding:86px 0;scroll-margin-top:90px}.dp-centered{text-align:center}.dp-narrow{max-width:720px;margin:0 auto}.dp-eyebrow{color:var(--gold-light);font-size:11px;letter-spacing:2.2px;font-weight:850}.dp-gold{color:var(--gold-light)}
      .dp-page h1,.dp-page h2,.dp-page h3{letter-spacing:-.7px}.dp-page h2{font-size:clamp(29px,3.8vw,46px);line-height:1.14;margin:13px 0 15px;color:#f7f6f1}.dp-page h3{line-height:1.3}.dp-page p{line-height:1.68}.dp-page p,.dp-narrow p,.dp-section-heading p{color:#b8bcb8}
      .dp-btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:51px;border-radius:8px;padding:15px 22px;font:inherit;font-size:14px;font-weight:800;text-decoration:none;cursor:pointer;border:1px solid transparent;transition:background .2s,transform .2s,box-shadow .2s}.dp-btn:hover{transform:translateY(-2px)}.dp-btn-gold{background:linear-gradient(115deg,#b28a2b,#e1be69);color:#15120a;box-shadow:0 8px 25px #b28a2b2b}.dp-btn-outline{color:#f3f1e8;border-color:#82724c;background:#ffffff08}.dp-btn-dark{background:#242727;border-color:#474440;color:#fff}.dp-btn-full{width:100%}
      .dp-site-nav{position:sticky;top:0;z-index:100;background:rgba(11,13,13,.96);border-bottom:1px solid var(--line);backdrop-filter:blur(16px)}.dp-nav-inner{display:flex;align-items:center;justify-content:space-between;gap:26px;min-height:75px}.dp-brand{text-decoration:none;display:flex;flex-direction:column;gap:4px;line-height:1}.dp-brand strong{font-size:24px;letter-spacing:3px;color:#f5f4ef;font-weight:900}.dp-brand strong span{color:#d8b45b}.dp-brand small{letter-spacing:3.6px;font-size:9px;color:#bab6a6}.dp-nav-links{display:flex;align-items:center;gap:21px}.dp-nav-links>a{color:#e2e0d7;font-size:13px;font-weight:750;text-decoration:none;white-space:nowrap}.dp-nav-links>a:hover{color:#e8cb82}.dp-nav-links .dp-nav-phone{display:inline-flex;align-items:center;gap:6px}.dp-nav-links .dp-nav-cta{display:flex;align-items:center;gap:8px;padding:12px 18px;background:#c6a243;color:#141310;border-radius:7px}.dp-nav-mobile-actions{display:none}
      .dp-hero{position:relative;background:radial-gradient(ellipse at 67% 30%,#3a3220 0%,#151717 36%,#0b0d0d 78%);overflow:hidden;border-bottom:1px solid var(--line)}.dp-hero-grid{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);align-items:center;gap:42px;padding:76px 0 84px;min-height:595px;position:relative;z-index:1}.dp-hero-copy{position:relative;z-index:2}.dp-kicker{color:#e7c875;font-size:11px;font-weight:850;letter-spacing:1.7px;display:flex;gap:9px;align-items:center}.dp-pulse{height:7px;width:7px;border-radius:50%;background:#d8b35a;box-shadow:0 0 16px #d8b35a}.dp-hero h1{font-size:clamp(42px,5vw,68px);line-height:1.055;font-weight:900;color:#faf9f5;margin:21px 0 23px}.dp-hero h1 em{color:#dcb65b;font-style:normal}.dp-hero-lead{font-size:clamp(15px,1.5vw,18px);max-width:590px}.dp-hero-bullets{display:flex;flex-wrap:wrap;gap:12px 20px;margin:25px 0 30px}.dp-hero-bullets span{display:flex;gap:7px;align-items:center;color:#dadbd5;font-weight:700;font-size:12px}.dp-hero-bullets svg{color:#dcb65b}.dp-hero-actions{display:flex;gap:11px;flex-wrap:wrap}.dp-hero-assurance{font-size:12px!important;display:flex;align-items:center;gap:8px;margin-top:22px!important;color:#adb0a9!important}.dp-hero-assurance svg{color:#c6a243}.dp-hero-visual{height:470px;position:relative;isolation:isolate;overflow:hidden;border-radius:18px;border:1px solid #86734870;box-shadow:0 32px 80px #0009,0 0 38px #dcb65b12;background:#181a19}.dp-hero-visual img{position:absolute;width:215%;height:100%;max-width:none;object-fit:cover;top:0;left:-110%;filter:saturate(.85) contrast(1.08)}.dp-hero-visual:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#10121042,transparent 45%),linear-gradient(0deg,#0008,transparent 35%);pointer-events:none}.dp-visual-stamp{position:absolute;bottom:21px;left:22px;display:flex;gap:8px;align-items:center;color:#f8e7b6;font-size:10px;font-weight:900;letter-spacing:1.3px;z-index:1;background:#101210c9;border:1px solid #c6a24366;padding:10px 13px;border-radius:6px}.dp-hero-bottom-glow{position:absolute;width:550px;height:200px;bottom:-180px;left:18%;border-radius:50%;background:#c6a24333;filter:blur(100px);pointer-events:none}
      .dp-proof-strip{background:#151717;border-bottom:1px solid var(--line)}.dp-proof-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding:20px 0}.dp-proof-grid span{display:flex;align-items:center;justify-content:center;gap:9px;color:#d5d3c9;font-size:12px;font-weight:750}.dp-proof-grid svg{color:#d4ad4c;flex-shrink:0}
      .dp-light{background:#111414}.dp-white{background:#0d1010}.dp-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:38px}.dp-step{position:relative;padding:31px;border:1px solid var(--line);border-radius:14px;background:linear-gradient(145deg,#1b1e1e,#141616)}.dp-step-icon{display:inline-flex;padding:13px;border-radius:10px;background:#c6a24318;color:#e1bd68}.dp-step-num{position:absolute;top:29px;right:25px;color:#786843;font-size:17px;font-weight:900}.dp-step h3{font-size:19px;color:#f5f3ed;margin:20px 0 10px}.dp-step p{font-size:14px;margin:0}.dp-section-cta{margin-top:35px}
      .dp-section-heading{display:flex;justify-content:space-between;align-items:end;gap:25px;margin-bottom:33px}.dp-section-heading>div{max-width:710px}.dp-section-heading p{margin:0}.dp-text-link{color:#e8c875;text-decoration:none;font-weight:800;display:flex;align-items:center;gap:7px;white-space:nowrap}.dp-package-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.dp-package{background:#191c1c;border:1px solid #424035;border-radius:14px;position:relative;display:flex;flex-direction:column;min-width:0;padding:25px;box-shadow:0 16px 40px #0002}.dp-package-featured{border-color:#c6a243;box-shadow:0 0 0 1px #c6a24366,0 16px 55px #c6a24315;background:linear-gradient(165deg,#29271f,#161a1a 47%)}.dp-ribbon{color:#e9c777;font-size:11px;font-weight:850;letter-spacing:.3px;margin-bottom:13px}.dp-mini{color:#cba95d;font-size:11px;text-transform:uppercase;font-weight:850;letter-spacing:1px}.dp-package h3{font-size:21px;color:#f8f6f0;margin:12px 0}.dp-price{font-size:30px;color:#e6c77a;font-weight:900;margin-bottom:10px}.dp-package-top p{color:#bdbdb6;font-size:14px;margin:0}.dp-package-toggle{display:flex;justify-content:space-between;align-items:center;width:100%;padding:17px 0;margin-top:22px;background:transparent;border:0;border-top:1px solid #514b37;color:#e8c875;cursor:pointer;font:inherit;font-size:13px;font-weight:800;text-align:left}.dp-package-toggle svg{transition:transform .2s}.dp-chevron-open{transform:rotate(180deg)}.dp-package-includes{display:grid;gap:10px;margin:3px 0 22px;font-size:13px}.dp-package-includes>div{display:flex;gap:10px;align-items:flex-start;color:#d5d5ce}.dp-package-includes svg{flex:0 0 auto;color:#d8b55e}.dp-package>.dp-btn{margin-top:auto}.dp-fineprint{font-size:12px;color:#9b9e96;margin-top:25px}
      .dp-gallery-section{background:#151818}.dp-gallery{max-width:960px;margin:35px auto 0}.dp-gallery-stage{height:min(52vw,490px);min-height:240px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;border-radius:15px;background:#252827;border:1px solid #4a4435}.dp-gallery-stage>img{width:100%;height:100%;object-fit:contain}.dp-gallery-label{position:absolute;top:15px;left:15px;font-size:11px;font-weight:850;background:#101110e8;border:1px solid #847044;color:#e8c875;padding:9px 13px;border-radius:7px}.dp-gallery-arrow{position:absolute;top:50%;transform:translateY(-50%);height:43px;width:43px;display:grid;place-items:center;border:1px solid #a48c57;background:#101211ec;color:#efd18b;border-radius:50%;cursor:pointer}.dp-gallery-prev{left:12px}.dp-gallery-next{right:12px}.dp-thumbnails{display:flex;gap:9px;overflow-x:auto;padding:13px 0}.dp-thumb{flex:0 0 86px;height:63px;padding:0;border:2px solid #393c38;border-radius:8px;overflow:hidden;background:#252827;opacity:.7;cursor:pointer}.dp-thumb-active{opacity:1;border-color:#dbb963}.dp-thumb img{display:block;height:100%;width:100%;object-fit:cover}
      .dp-form-layout{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:45px;align-items:start}.dp-form-intro{padding-top:18px}.dp-form-intro>p{font-size:16px;color:#c0c0ba}.dp-form-benefits{display:grid;gap:16px;margin-top:28px}.dp-form-benefits>div{display:flex;gap:11px;align-items:flex-start;color:#e2e1d7;font-size:14px;font-weight:650}.dp-form-benefits svg{color:#dab85e;flex-shrink:0}.dp-selected{margin-top:25px;padding:18px;background:#27261d;border:1px solid #75653f;border-radius:10px}.dp-selected strong{display:block;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#e1bd68}.dp-selected div{font-weight:800;margin:6px 0}.dp-selected span{color:#e3c16d}.dp-call-box{display:flex;gap:12px;margin-top:28px;padding-top:25px;border-top:1px solid #393c38}.dp-call-box svg{color:#d5af59}.dp-call-box strong,.dp-call-box a{display:block}.dp-call-box a{font-size:21px;color:#e5c46e;font-weight:850;text-decoration:none;margin-top:4px}.dp-form-card{min-width:0;border-radius:16px;padding:26px;background:#f8f7f4;color:#1b1b19;border:1px solid #c4aa6c;box-shadow:0 22px 70px #0006}.dp-form-card h3{color:#1b1b19;font-size:23px;margin:0 0 4px}.dp-form-card>p{color:#615d54;font-size:14px;margin:0 0 20px}
      .dp-postcode-section{background:#1b1e1d;border-block:1px solid var(--line)}.dp-postcode-layout{display:grid;grid-template-columns:1fr 1fr;gap:42px;align-items:center}.dp-postcode-layout p{max-width:540px}.dp-postcode-card{padding:25px;background:#121515;border:1px solid #6b5a37;border-radius:13px;min-width:0}.dp-postcode-card label{display:block;font-weight:800;font-size:13px;margin-bottom:11px}.dp-postcode-row{display:flex;gap:9px}.dp-postcode-row input{flex:1;min-width:0;border-radius:7px;border:1px solid #6e6654;background:#f4f3ee;color:#191a18;padding:13px;font-size:15px}.dp-postcode-row button{padding:10px 17px;background:#d5b35d;border-radius:7px;color:#1b1912;border:0;font-weight:850;cursor:pointer}.dp-postcode-row button:disabled{opacity:.6}.dp-postcode-result{font-size:12px;margin-top:12px;color:#c8c7be;line-height:1.5}
      .dp-faq-layout{display:grid;grid-template-columns:minmax(0,.83fr) minmax(0,1.17fr);gap:60px}.dp-faq-layout>div:first-child>p{margin-bottom:25px}.dp-faq-list{display:grid;gap:12px}.dp-faq{background:#1b1e1e;border:1px solid #46443c;border-radius:12px;overflow:hidden}.dp-faq button{border:0;background:transparent;width:100%;display:flex;gap:12px;align-items:center;justify-content:space-between;text-align:left;padding:20px;color:#f0eee5;font:inherit;font-size:15px;font-weight:800;cursor:pointer}.dp-faq button svg{flex-shrink:0;transition:transform .2s;color:#d9b963}.dp-faq p{margin:0;padding:0 20px 20px;color:#c4c4ba;font-size:14px}
      .dp-bottom-cta{padding:60px 0;background:radial-gradient(ellipse at right,#39311f,#111413 67%);border-top:1px solid var(--line)}.dp-bottom-cta-inner{display:flex;align-items:center;justify-content:space-between;gap:30px}.dp-bottom-cta h2{font-size:38px;margin:10px 0}.dp-bottom-cta p{max-width:620px;margin:0}.dp-bottom-actions{display:grid;gap:13px;justify-items:center;flex-shrink:0}.dp-call-link{display:flex;align-items:center;gap:9px;font-weight:850;text-decoration:none;color:#e5c46e}.dp-footer{background:#090b0b;color:#aeb1a9;border-top:1px solid var(--line)}.dp-footer-inner{padding:35px 0;display:flex;justify-content:space-between;gap:25px}.dp-footer strong{color:#f4f2ed}.dp-footer strong span{color:#d8b45b}.dp-footer p{margin:7px 0;font-size:13px}.dp-footer small{font-size:12px}.dp-footer-links{display:flex;align-content:center;flex-wrap:wrap;gap:16px}.dp-footer-links a{font-size:13px;color:#d5d1c2;text-decoration:none}.dp-mobile-sticky{display:none}
      .dp-testimonials{background:#111414;border-block:1px solid var(--line)}.dp-testimonial-controls{display:flex;gap:10px}.dp-testimonial-controls button{height:43px;width:43px;display:grid;place-items:center;border:1px solid #847046;border-radius:50%;background:#222522;color:#e7c577;cursor:pointer}.dp-testimonial-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:17px}.dp-testimonial{margin:0;padding:25px;background:#1c201f;border:1px solid #504b3f;border-radius:14px;display:flex;flex-direction:column;min-height:235px}.dp-testimonial-stars{color:#dcb967;letter-spacing:3px}.dp-testimonial p{font-size:14px;line-height:1.8;flex:1}.dp-testimonial footer{display:grid;gap:4px;font-size:13px}.dp-testimonial footer strong{color:#f1f0e9}.dp-testimonial footer span{color:#aeb2aa;font-size:12px}
      @media(max-width:1100px){.dp-nav-links{gap:12px}.dp-nav-links>a{font-size:12px}.dp-nav-phone{display:none!important}.dp-hero-grid{gap:26px}.dp-package-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.dp-testimonial-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.dp-testimonial-secondary:last-child{display:none}}
      @media(max-width:800px){.dp-wrap{width:min(100% - 36px,1180px)}.dp-section{padding:58px 0;scroll-margin-top:76px}.dp-nav-inner{min-height:66px}.dp-brand strong{font-size:21px}.dp-brand small{font-size:8px}.dp-nav-mobile-actions{display:flex;align-items:center;gap:12px}.dp-nav-mobile-actions a,.dp-nav-mobile-actions button{height:38px;width:38px;display:grid;place-items:center;border:1px solid #5b5036;background:#191b19;color:#e2c26e;border-radius:7px;cursor:pointer}.dp-nav-links{display:none;position:absolute;top:65px;left:0;right:0;padding:15px 18px 20px;background:#111413;border-bottom:1px solid #5b5036;box-shadow:0 20px 30px #0008;flex-direction:column;align-items:stretch;gap:0}.dp-nav-open{display:flex}.dp-nav-links>a{padding:12px 6px;font-size:14px}.dp-nav-links .dp-nav-phone{display:flex!important}.dp-nav-links .dp-nav-cta{justify-content:center;margin-top:9px}.dp-hero-grid{grid-template-columns:1fr;gap:25px;padding:52px 0 43px;min-height:0}.dp-hero h1{font-size:clamp(36px,9vw,55px)}.dp-hero-bullets{gap:10px 18px}.dp-hero-visual{height:320px}.dp-hero-visual img{width:210%;left:-107%}.dp-hero-actions{display:grid;grid-template-columns:1fr 1fr}.dp-hero-actions .dp-btn{padding:13px 9px;font-size:12px}.dp-proof-grid{grid-template-columns:1fr;gap:11px;padding:17px 0}.dp-proof-grid span{justify-content:flex-start}.dp-steps,.dp-form-layout,.dp-postcode-layout,.dp-faq-layout,.dp-testimonial-grid{grid-template-columns:1fr}.dp-testimonial-secondary{display:none}.dp-section-heading,.dp-bottom-cta-inner{flex-direction:column;align-items:flex-start}.dp-form-layout{gap:23px}.dp-postcode-layout,.dp-faq-layout{gap:22px}.dp-gallery-stage{height:330px}.dp-footer-inner{flex-direction:column}.dp-bottom-cta{padding-bottom:95px}.dp-mobile-sticky{display:flex;position:fixed;bottom:0;left:0;right:0;z-index:150;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:#0b0d0df5;border-top:1px solid #6b5933;gap:9px;box-shadow:0 -8px 30px #0008}.dp-mobile-sticky a:first-child{flex:1;min-height:49px;display:flex;align-items:center;justify-content:center;gap:8px;background:#d1aa52;color:#17140c;text-decoration:none;border-radius:8px;font-size:14px;font-weight:900}.dp-mobile-sticky a:last-child{width:54px;display:grid;place-items:center;border:1px solid #816c3b;border-radius:8px;color:#eed189}.dp-page{padding-bottom:65px}}
      @media(max-width:520px){.dp-hero-grid{padding-top:36px}.dp-hero-visual{height:235px}.dp-hero h1{margin:15px 0 18px}.dp-kicker{font-size:9px;letter-spacing:1px}.dp-hero-lead{font-size:15px}.dp-hero-actions{grid-template-columns:1fr}.dp-hero-actions .dp-btn{font-size:14px}.dp-hero-bullets{display:grid;gap:8px}.dp-page h2{font-size:30px}.dp-package-grid{grid-template-columns:1fr}.dp-package{padding:22px}.dp-gallery-stage{height:250px}.dp-form-card{padding:16px}.dp-postcode-row{flex-direction:column}.dp-postcode-row button{min-height:45px}.dp-visual-stamp{bottom:12px;left:12px;font-size:9px}.dp-gallery-label{font-size:10px}}
      @media(prefers-reduced-motion:reduce){.dp-page *{scroll-behavior:auto!important;transition:none!important}}
    `}</style>
    </Layout>;
}
