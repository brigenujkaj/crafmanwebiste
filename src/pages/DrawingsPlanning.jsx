import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    ArrowRight, ArrowLeft, Check, ChevronDown, FileCheck2,
    MapPin, Phone, Ruler, ShieldCheck, ClipboardCheck, PencilRuler,
    MessageCircle, Clock3, Building2, Menu, X, ChevronRight, Compass, Home
} from "lucide-react";
import Layout from "../components/DrawingsLayout.jsx";
import DrawingsPlanningForm from "../components/DrawingsPlanningForm.jsx";

// Conversion-optimized configuration for North London PPC
const PHONE = "02081914122";
const GOLD = "#C6A243";
const DARK = "#171714";

// PPC SPECIFICATION: Only Extension & Loft packages shown with starting prices
const PACKAGES = [
    {
        name: "House Extension Package",
        price: "From £1,150",
        bestFor: "Single & double storey rear/side extensions",
        popular: true,
        intro: "Complete architectural measured survey, planning drawings, and council submission for North London homes.",
        includes: [
            "Full on-site laser measured survey",
            "Existing & proposed scaled architectural floor plans",
            "External elevations and key sectional drawings",
            "Permitted development & full planning application submission",
            "Council management",
            "Unlimited design revisions until planning approval"
        ]
    },
    {
        name: "Loft Conversion Package",
        price: "From £1,150",
        bestFor: "Dormer, hip-to-gable, L-shaped & mansard lofts",
        popular: false,
        intro: "Bespoke architectural drawings engineered to maximize headroom and comply with council volume limits.",
        includes: [
            "Full on-site laser measured survey",
            "Existing & proposed scaled architectural floor plans",
            "External elevations and key sectional drawings",
            "Permitted development & full planning application submission",
            "Council management",
            "Unlimited design revisions until planning approval"
        ]
    }
];

const GALLERY = [
    
    { src: "/images/drawingsex14.png", label: "3D architectural render" },
    { src: "/images/drawingsex13.png", label: "Extension floor plan" },
    { src: "/images/drawingsex16.png", label: "Open-plan kitchen layout" },
    { src: "/images/drawingsex19.png", label: "Rear elevation drawing" },
    { src: "/images/drawingsex20.png", label: "Dormer sectional elevation" },
    { src: "/images/drawingsex22.png", label: "Full site location block plan" }
];

const TESTIMONIALS = [
    { name: "David K.", role: "Rear Extension Architectural Plans – Muswell Hill (N10)", text: "Crafman made securing approval from Haringey Council effortless. The drawings were delivered in 7 days, accurate to the millimeter, and the builders loved the clarity." },
    { name: "Elena R.", role: "Dormer Loft Conversion Drawings – Barnet (EN5)", text: "We needed an architect who understood Barnet Council's strict ridge height and volume rules. Crafman maximized our bedroom space and got our Certificate of Lawfulness with zero fuss." },
    { name: "Marcus P.", role: "Kitchen Extension Planning Approval – Islington (N1)", text: "Excellent communication from the initial survey to planning sign-off. Transparent starting rates and no hidden extras. Would highly recommend them for any North London renovation." },
    { name: "Sarah & Tom L.", role: "Single Storey Extension Plans – Finchley (N3)", text: "Very responsive, professional, and knowledgeable about local conservation boundaries. The turnaround was super quick and our planning application went through on the first pass." },
    { name: "Amir H.", role: "Wrap-around Extension Drawings – Camden (NW1)", text: "From the laser survey to the final drawings, the process was seamless. Having a dedicated strategist handle the council portal directly saved us weeks." }
];

const FAQS = [
    { q: "Do I need planning permission for an extension or loft in North London?", a: "Not always. Many single-storey extensions up to 3m (or 6m via Prior Approval) and loft conversions up to 40m³ (terraced) or 50m³ (semi-detached) qualify under Permitted Development in Barnet, Enfield, Haringey, Camden, and Islington. We assess your exact address to confirm the quickest legal route." },
    { q: "How much do architectural drawings cost in North London?", a: "Our fixed architectural drawing packages start from £950 for extensions and from £1,150 for loft conversions, with zero hidden hourly fees. We provide a full transparent written quote before beginning any work." },
    { q: "How fast can you survey my property and complete the drawings?", a: "We can typically carry out the on-site laser survey within 48–72 hours across North London. Your completed planning drawings will be delivered within 7 working days." },
    { q: "Do you handle the council application directly on our behalf?", a: "Yes. We act as your planning agent. We prepare the architectural packages, OS location maps, and planning documentation, submitting and managing the application directly with your local authority." },
    { q: "What if my property is in a North London Conservation Area?", a: "Boroughs like Camden, Islington, and Haringey have specific conservation zones and Article 4 directions. We review your property's specific restrictions and draft bespoke drawings tailored to satisfy local conservation conservation officers." },
    { q: "Do you supply structural calculations and Building Regulations drawings?", a: "Yes. Once planning is granted, we offer complete technical Building Regulations packs including structural steel (RSJ) calculations, foundation specs, and thermal compliance for construction sign-off." }
];

const sendEvent = (event, details = {}) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event, ...details });
    }
};

function Cta({ href, children, secondary = false, onClick, full = false }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`dp-btn ${secondary ? "dp-btn-outline" : "dp-btn-gold"} ${full ? "dp-btn-full" : ""}`}
        >
            {children}
            <ArrowRight size={17} aria-hidden="true" />
        </a>
    );
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
        if (window.location.hash) {
            const id = decodeURIComponent(window.location.hash.slice(1));
            requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }));
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
            {
                "@type": "Organization",
                "@id": "https://www.crafman.co.uk/#organization",
                "name": "Crafman Architectural Services",
                "url": "https://www.crafman.co.uk"
            },
            {
                "@type": "Service",
                "name": "North London Residential Architectural Drawings & Planning",
                "provider": { "@id": "https://www.crafman.co.uk/#organization" },
                "areaServed": [
                    "North London", "Barnet", "Enfield", "Haringey", "Islington", "Camden",
                    "Finchley", "Muswell Hill", "Highgate", "Hampstead"
                ],
                "description": "Bespoke architectural drawings for extensions and loft conversions across North London. Fixed fee packages from £950."
            },
            {
                "@type": "FAQPage",
                "mainEntity": FAQS.map(({ q, a }) => ({
                    "@type": "Question",
                    "name": q,
                    "acceptedAnswer": { "@type": "Answer", "text": a }
                }))
            }
        ]
    };

    return (
        <Layout hideHeader>
            <Helmet>
                <title>Residential Architect North London | Extension & Loft Drawings | Crafman</title>
                <meta name="description" content="North London residential architectural drawings from £950. Laser surveys, extension & loft conversion plans, Barnet, Enfield, Haringey, Camden & Islington council approvals." />
                <link rel="canonical" href="https://www.crafman.co.uk/drawings-planning" />
                <meta property="og:image" content="https://www.crafman.co.uk/images/heroImage.png" />
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            </Helmet>

            <div className="dp-page">
                {/* CONVERSION HEADER */}
                <header className="dp-site-nav">
                    <div className="dp-wrap dp-nav-inner">
                        <a href="/" className="dp-brand" aria-label="Crafman home">
                            <strong>CRAF<span>MAN</span></strong>
                            <small>NORTH LONDON ARCHITECTURAL</small>
                        </a>
                        <nav className={`dp-nav-links ${mobileMenuOpen ? "dp-nav-open" : ""}`} aria-label="Landing page navigation">
                            <a href="#packages" onClick={() => setMobileMenuOpen(false)}>Architectural Packages</a>
                            <a href="#coverage" onClick={() => setMobileMenuOpen(false)}>North London Boroughs</a>
                            <a href="#faqs" onClick={() => setMobileMenuOpen(false)}>FAQs</a>
                            <a
                                href={`tel:${PHONE}`}
                                className="dp-nav-phone"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    sendEvent("direct_phone_click", { phone_number: PHONE, location: "Landing Page Header" });
                                }}
                            >
                                <Phone size={15} /> {PHONE}
                            </a>
                            <a
                                href="#contact-form"
                                className="dp-nav-cta"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    sendEvent("header_cta_click", { action: "request_quote" });
                                }}
                            >
                                Get Instant Quote <ArrowRight size={16} />
                            </a>
                        </nav>
                        <div className="dp-nav-mobile-actions">
                            <a href={`tel:${PHONE}`} aria-label="Call Crafman" onClick={() => sendEvent("direct_phone_click", { phone_number: PHONE, location: "Mobile Header" })}>
                                <Phone size={21} />
                            </a>
                            <button type="button" onClick={() => setMobileMenuOpen(v => !v)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen}>
                                {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
                            </button>
                        </div>
                    </div>
                </header>

                <main>
                    {/* TOP-LEVEL HERO WITH FORM DIRECTLY ABOVE THE FOLD */}
                    <section className="dp-hero" id="contact-form" aria-label="North London Architectural Services">
                        <div className="dp-wrap dp-hero-grid">

                            {/* LEFT COPY: TARGETED FOR NORTH LONDON PPC TRAFFIC */}
                            <div className="dp-hero-copy">
                                <div className="dp-kicker">
                                    <span className="dp-pulse" /> NORTH LONDON & WEST ESSEX ARCHITECTURAL
                                </div>

                                <h1>Architectural drawings designed for <em>council approval</em></h1>

                                <p className="dp-hero-lead">
                                    Specialist extension and loft conversion plans across <strong>Barnet, Enfield, Chingford, Woodford, Chigwell, Loughton & Epping</strong>. Fixed design fees from £950 with guaranteed 7-day draft turnaround.
                                </p>

                                <div className="dp-hero-bullets">
                                    <span><Check size={17} /> On-site 3D laser survey</span>
                                    <span><Check size={17} /> Fixed pricing from £950</span>
                                    <span><Check size={17} /> 100% Council approval track record</span>
                                </div>

                                {/* TRUST VALUE CARDS */}
                                <div className="dp-hero-trust-cards">
                                    <div className="dp-trust-pill">
                                        <Compass size={16} color={GOLD} />
                                        <div>
                                            <strong>North London Specialists</strong>
                                            <span>Full council planning & permitted development compliance</span>
                                        </div>
                                    </div>
                                    <div className="dp-trust-pill">
                                        <Clock3 size={16} color={GOLD} />
                                        <div>
                                            <strong>Guaranteed 7-Day Drafting</strong>
                                            <span>Fast measured plans so your project is never held up</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="dp-hero-direct-call">
                                    <span>Prefer to speak with an architect directly?</span>
                                    <a href={`tel:${PHONE}`} onClick={() => sendEvent("hero_phone_click", { location: "Hero Lead" })}>
                                        <Phone size={16} /> Call {PHONE}
                                    </a>
                                </div>
                            </div>

                            {/* RIGHT: FORM POSITIONED AT TOP LEVEL */}
                            <div className="dp-hero-form-container">
                                <DrawingsPlanningForm
                                    title="Get Your Free Planning Strategy"
                                    intro="Speak directly with an architectural designer. Straight answers on council limits, drawing packages, and fixed quotes."
                                    selectedPackage={selectedPackage}
                                />
                            </div>

                        </div>
                        <div className="dp-hero-bottom-glow" aria-hidden="true" />
                    </section>

                    {/* PROOF STRIP */}
                    <section className="dp-proof-strip">
                        <div className="dp-wrap dp-proof-grid">
                            <span><MapPin size={18} /> Barnet, Enfield, Haringey, Camden & Islington</span>
                            <span><Ruler size={18} /> Laser Surveys & Scaled CAD Drawings</span>
                            <span><FileCheck2 size={18} /> Full Council Submission & Planning Agent</span>
                        </div>
                    </section>

                    {/* PACKAGES SECTION: ONLY 2 PACKAGES WITH STARTING PRICES */}
                    <section className="dp-section dp-white" id="packages">
                        <div className="dp-wrap">
                            <div className="dp-section-heading">
                                <div>
                                    <span className="dp-eyebrow">STARTING RATES</span>
                                    <h2>North London Architectural Packages</h2>
                                    <p>Simple starting fees with zero hidden hourly surcharges. Includes laser surveys, planning drawings, and council liaison.</p>
                                </div>
                                <a className="dp-text-link" href="#contact-form">Custom project? Ask an architect <ArrowRight size={17} /></a>
                            </div>

                            <div className="dp-package-grid dp-package-grid-two">
                                {PACKAGES.map(pkg => (
                                    <article className={`dp-package ${pkg.popular ? "dp-package-featured" : ""}`} key={pkg.name}>
                                        {pkg.popular && <div className="dp-ribbon">Most Popular in North London</div>}
                                        <div className="dp-package-top">
                                            <span className="dp-mini">{pkg.bestFor}</span>
                                            <h3>{pkg.name}</h3>
                                            <div className="dp-price">{pkg.price} <small>+ VAT</small></div>
                                            <p>{pkg.intro}</p>
                                        </div>

                                        <button
                                            type="button"
                                            className="dp-package-toggle"
                                            aria-expanded={expandedPackage === pkg.name}
                                            onClick={() => {
                                                const next = expandedPackage === pkg.name ? "" : pkg.name;
                                                setExpandedPackage(next);
                                                if (next) sendEvent("package_details_toggle", { package_name: pkg.name, action: "expand" });
                                            }}
                                        >
                                            {expandedPackage === pkg.name ? "Hide package details" : "What's included in this package"}
                                            <ChevronDown size={17} className={expandedPackage === pkg.name ? "dp-chevron-open" : ""} />
                                        </button>

                                        {expandedPackage === pkg.name && (
                                            <div className="dp-package-includes">
                                                {pkg.includes.map(value => (
                                                    <div key={value}>
                                                        <Check size={16} />
                                                        <span>{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            className={`dp-btn ${pkg.popular ? "dp-btn-gold" : "dp-btn-dark"} dp-btn-full`}
                                            onClick={() => selectPackage(pkg)}
                                        >
                                            Learn More <ArrowRight size={17} />
                                        </button>
                                    </article>
                                ))}
                            </div>

                            <p className="dp-fineprint">
                                *Starting rates cover standard residential properties. Third-party council statutory planning fees and specialist tree/flood reports are billed separately where mandated by your council.
                            </p>
                        </div>
                    </section>

                    {/* HOW IT WORKS */}
                    <section className="dp-section dp-light" id="how-it-works">
                        <div className="dp-wrap">
                            <div className="dp-centered dp-narrow">
                                <span className="dp-eyebrow">STRAIGHTFORWARD PROCESS</span>
                                <h2>From concept to council sign-off in 3 steps</h2>
                                <p>We take the confusion out of North London planning permissions.</p>
                            </div>
                            <div className="dp-steps">
                                {[
                                    { icon: MessageCircle, n: "01", title: "Free Property Assessment", text: "Tell us your North London postcode and what you plan to build. We assess local council constraints." },
                                    { icon: PencilRuler, n: "02", title: "Laser Survey & 7-Day Drafting", text: "Our designer visits to complete a 3D laser survey and produces your scaled plans within 7 working days." },
                                    { icon: ClipboardCheck, n: "03", title: "Council Planning Submission", text: "We submit your application directly to your borough (Barnet, Camden, Enfield, etc.) and handle queries." }
                                ].map(item => (
                                    <article className="dp-step" key={item.n}>
                                        <div className="dp-step-icon"><item.icon size={24} /></div>
                                        <span className="dp-step-num">{item.n}</span>
                                        <h3>{item.title}</h3>
                                        <p>{item.text}</p>
                                    </article>
                                ))}
                            </div>
                            <div className="dp-centered dp-section-cta">
                                <Cta href="#contact-form">Start My Planning Review</Cta>
                            </div>
                        </div>
                    </section>

                    {/** PORTFOLIO & APPROVALS GALLERY 
                    <section className="dp-section dp-gallery-section" id="portfolio-showcase">
                        <div className="dp-wrap">
                            <div className="dp-centered dp-narrow">
                                <span className="dp-eyebrow">VERIFIED DOCUMENTATION</span>
                                <h2>Recent drawings and council approvals</h2>
                                <p>Inspect real drawing packages, planning certificates, and 3D floor plans produced for residential clients.</p>
                            </div>
                            <div className="dp-gallery">
                                <div className="dp-gallery-stage">
                                    <img src={GALLERY[activeImage].src} alt={GALLERY[activeImage].label} loading="lazy" />
                                    <span className="dp-gallery-label">{GALLERY[activeImage].label}</span>
                                    <button type="button" className="dp-gallery-arrow dp-gallery-prev" aria-label="Previous drawing" onClick={() => setActiveImage(i => (i + GALLERY.length - 1) % GALLERY.length)}>
                                        <ArrowLeft size={20} />
                                    </button>
                                    <button type="button" className="dp-gallery-arrow dp-gallery-next" aria-label="Next drawing" onClick={() => setActiveImage(i => (i + 1) % GALLERY.length)}>
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                                <div className="dp-thumbnails">
                                    {GALLERY.map((img, i) => (
                                        <button
                                            type="button"
                                            key={`${img.src}-${i}`}
                                            className={i === activeImage ? "dp-thumb dp-thumb-active" : "dp-thumb"}
                                            onClick={() => setActiveImage(i)}
                                            aria-label={`View ${img.label}`}
                                            aria-pressed={i === activeImage}
                                        >
                                            <img src={img.src} alt="" loading="lazy" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="dp-centered dp-section-cta">
                                <Cta href="#contact-form">Get Drawings for My Home</Cta>
                            </div>
                        </div>
                    </section>

                    **/}

                    {/* NORTH LONDON REVIEWS */}
                    <section className="dp-section dp-testimonials" id="testimonials">
                        <div className="dp-wrap">
                            <div className="dp-section-heading">
                                <div>
                                    <span className="dp-eyebrow">LOCAL REVIEWS</span>
                                    <h2>What North London homeowners say</h2>
                                    <p>Read genuine client feedback across Barnet, Haringey, Finchley, and Islington.</p>
                                </div>
                                <div className="dp-testimonial-controls">
                                    <button type="button" aria-label="Previous testimonial" onClick={() => setTestimonialIndex(i => (i + TESTIMONIALS.length - 1) % TESTIMONIALS.length)}>
                                        <ArrowLeft size={20} />
                                    </button>
                                    <button type="button" aria-label="Next testimonial" onClick={() => setTestimonialIndex(i => (i + 1) % TESTIMONIALS.length)}>
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="dp-testimonial-grid">
                                {[0, 1, 2].map(offset => {
                                    const item = TESTIMONIALS[(testimonialIndex + offset) % TESTIMONIALS.length];
                                    return (
                                        <blockquote key={`${testimonialIndex}-${offset}`} className={`dp-testimonial ${offset > 0 ? "dp-testimonial-secondary" : ""}`}>
                                            <div className="dp-testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
                                            <p>“{item.text}”</p>
                                            <footer>
                                                <strong>{item.name}</strong>
                                                <span>{item.role}</span>
                                            </footer>
                                        </blockquote>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* POSTCODE CHECKER */}
                    <section className="dp-section dp-postcode-section" id="coverage">
                        <div className="dp-wrap dp-postcode-layout">
                            <div>
                                <span className="dp-eyebrow dp-gold">NORTH LONDON COVERAGE</span>
                                <h2>Check your council borough</h2>
                                <p>Enter your N, NW, or EN postcode to identify your local planning authority and confirm coverage.</p>
                            </div>
                            <form className="dp-postcode-card" onSubmit={checkPostcode}>
                                <label htmlFor="dp-postcode">Property Postcode</label>
                                <div className="dp-postcode-row">
                                    <input
                                        id="dp-postcode"
                                        type="text"
                                        autoComplete="postal-code"
                                        value={postcode}
                                        onChange={e => { setPostcode(e.target.value); setPostcodeStatus("idle"); }}
                                        placeholder="e.g. N10 3BL or EN5 4HJ"
                                        aria-describedby="dp-postcode-result"
                                    />
                                    <button type="submit" disabled={postcodeStatus === "loading"}>
                                        {postcodeStatus === "loading" ? "Checking…" : "Check Borough"}
                                    </button>
                                </div>
                                <div id="dp-postcode-result" aria-live="polite" className="dp-postcode-result">
                                    {postcodeStatus === "success"
                                        ? `Borough identified: ${postcodeResult}. We have 100% active coverage in this authority area.`
                                        : postcodeStatus === "error"
                                            ? "Please enter a valid London postcode (e.g. N2, N10, EN4, NW3)."
                                            : "Instant borough verification for North London authorities."}
                                </div>
                            </form>
                        </div>
                    </section>

                    {/* FAQS */}
                    <section className="dp-section dp-light" id="faqs">
                        <div className="dp-wrap dp-faq-layout">
                            <div>
                                <span className="dp-eyebrow">NORTH LONDON PLANNING FAQ</span>
                                <h2>Answers before you build</h2>
                                <p>Have questions about conservation areas or build sizes in North London? Speak to our strategists directly.</p>
                                <Cta href="#contact-form">Ask an Architect</Cta>
                            </div>
                            <div className="dp-faq-list">
                                {FAQS.map((item, i) => (
                                    <div className="dp-faq" key={item.q}>
                                        <button
                                            type="button"
                                            aria-expanded={openFaq === i}
                                            onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                        >
                                            <span>{item.q}</span>
                                            <ChevronDown size={19} className={openFaq === i ? "dp-chevron-open" : ""} />
                                        </button>
                                        {openFaq === i && <p>{item.a}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* BOTTOM DIRECT CTA */}
                    <section className="dp-bottom-cta">
                        <div className="dp-wrap dp-bottom-cta-inner">
                            <div>
                                <span className="dp-eyebrow dp-gold">START YOUR NORTH LONDON PROJECT</span>
                                <h2>Speak with an architect today.</h2>
                                <p>Get clear guidance on council requirements and lock in your fixed architectural drawing fee from £950.</p>
                            </div>
                            <div className="dp-bottom-actions">
                                <Cta href="#contact-form">Book My Consultation</Cta>
                                <a
                                    href={`tel:${PHONE}`}
                                    className="dp-call-link"
                                    onClick={() => sendEvent("phone_click", { location: "bottom_cta" })}
                                >
                                    <Phone size={17} /> {PHONE}
                                </a>
                            </div>
                        </div>
                    </section>
                </main>

                {/* FOOTER */}
                <footer className="dp-footer">
                    <div className="dp-wrap dp-footer-inner">
                        <div>
                            <strong>Crafman <span>Architectural</span></strong>
                            <p>Residential architectural drawings & planning permission specialists across North London.</p>
                            <small>© {new Date().getFullYear()} Crafman Building and Landscaping Ltd.</small>
                        </div>
                        <div className="dp-footer-links">
                            <a href="#packages">Packages</a>
                            <a href="#portfolio-showcase">Our Work</a>
                            <a href="#coverage">North London Boroughs</a>
                            <a href="#faqs">FAQs</a>
                            <a href={`tel:${PHONE}`}>Call {PHONE}</a>
                        </div>
                    </div>
                </footer>

                {/* MOBILE FLOATING CTA BAR */}
                <div className="dp-mobile-sticky" aria-label="Quick enquiry actions">
                    <a href="#contact-form">
                        Get Instant Quote <ArrowRight size={17} />
                    </a>
                    <a href={`tel:${PHONE}`} aria-label="Call Crafman">
                        <Phone size={20} />
                    </a>
                </div>
            </div>

            <style>{`
                .dp-page{--gold:#C6A243;--gold-light:#E8CB82;--ink:#0b0d0d;--panel:#151818;--panel2:#1c2020;--muted:#aeb2ae;--line:rgba(232,203,130,.15);background:var(--ink);color:#f3f3ed;font-family:Arial,Helvetica,sans-serif;overflow-x:clip}
                .dp-page *{box-sizing:border-box}.dp-page img{max-width:100%}.dp-page a:focus-visible,.dp-page button:focus-visible,.dp-page input:focus-visible{outline:3px solid #e8cb82;outline-offset:3px}
                .dp-wrap{width:min(1240px,calc(100% - 48px));margin-inline:auto}.dp-section{padding:86px 0;scroll-margin-top:90px}.dp-centered{text-align:center}.dp-narrow{max-width:720px;margin:0 auto}.dp-eyebrow{color:var(--gold-light);font-size:11px;letter-spacing:2.2px;font-weight:850}.dp-gold{color:var(--gold-light)}
                .dp-page h1,.dp-page h2,.dp-page h3{letter-spacing:-.7px}.dp-page h2{font-size:clamp(29px,3.8vw,46px);line-height:1.14;margin:13px 0 15px;color:#f7f6f1}.dp-page h3{line-height:1.3}.dp-page p{line-height:1.68}.dp-page p,.dp-narrow p,.dp-section-heading p{color:#b8bcb8}
                
                .dp-btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:51px;border-radius:10px;padding:15px 22px;font:inherit;font-size:14px;font-weight:800;text-decoration:none;cursor:pointer;border:1px solid transparent;transition:background .2s,transform .2s,box-shadow .2s}
                .dp-btn:hover{transform:translateY(-2px)}.dp-btn-gold{background:linear-gradient(115deg,#b28a2b,#e1be69);color:#15120a;box-shadow:0 8px 25px #b28a2b2b}.dp-btn-outline{color:#f3f1e8;border-color:#82724c;background:#ffffff08}.dp-btn-dark{background:#242727;border-color:#474440;color:#fff}.dp-btn-full{width:100%}
                
                .dp-site-nav{position:sticky;top:0;z-index:100;background:rgba(11,13,13,.96);border-bottom:1px solid var(--line);backdrop-filter:blur(16px)}
                .dp-nav-inner{display:flex;align-items:center;justify-content:space-between;gap:26px;min-height:75px}
                .dp-brand{text-decoration:none;display:flex;flex-direction:column;gap:4px;line-height:1}
                .dp-brand strong{font-size:24px;letter-spacing:3px;color:#f5f4ef;font-weight:900}.dp-brand strong span{color:#d8b45b}
                .dp-brand small{letter-spacing:2.5px;font-size:9px;color:#bab6a6;font-weight:700}
                .dp-nav-links{display:flex;align-items:center;gap:21px}.dp-nav-links>a{color:#e2e0d7;font-size:13px;font-weight:750;text-decoration:none;white-space:nowrap}.dp-nav-links>a:hover{color:#e8cb82}
                .dp-nav-links .dp-nav-phone{display:inline-flex;align-items:center;gap:6px}
                .dp-nav-links .dp-nav-cta{display:flex;align-items:center;gap:8px;padding:12px 18px;background:#c6a243;color:#141310;border-radius:7px}
                .dp-nav-mobile-actions{display:none}

                /* HERO TWO-COLUMN TOP-LEVEL CONVERSION GRID */
                .dp-hero{position:relative;background:radial-gradient(ellipse at 65% 25%,#3a3220 0%,#151717 38%,#0b0d0d 80%);overflow:hidden;border-bottom:1px solid var(--line)}
                .dp-hero-grid{display:grid;grid-template-columns:1.05fr 0.95fr;align-items:center;gap:44px;padding:60px 0 75px;position:relative;z-index:2}
                .dp-hero-copy{position:relative;z-index:2}
                .dp-kicker{color:#e7c875;font-size:11px;font-weight:850;letter-spacing:1.7px;display:flex;gap:9px;align-items:center}
                .dp-pulse{height:7px;width:7px;border-radius:50%;background:#d8b35a;box-shadow:0 0 16px #d8b35a}
                .dp-hero h1{font-size:clamp(38px,4.5vw,58px);line-height:1.08;font-weight:900;color:#faf9f5;margin:18px 0 18px}
                .dp-hero h1 em{color:#dcb65b;font-style:normal}
                .dp-hero-lead{font-size:clamp(15px,1.4vw,17px);max-width:560px;line-height:1.6}
                .dp-hero-bullets{display:flex;flex-wrap:wrap;gap:10px 18px;margin:20px 0 24px}
                .dp-hero-bullets span{display:flex;gap:7px;align-items:center;color:#dadbd5;font-weight:700;font-size:12.5px}
                .dp-hero-bullets svg{color:#dcb65b}
                
                .dp-hero-trust-cards{display:grid;gap:10px;margin-bottom:22px}
                .dp-trust-pill{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:12px 16px;border-radius:12px}
                .dp-trust-pill strong{display:block;font-size:13px;color:#ffffff}
                .dp-trust-pill span{display:block;font-size:11.5px;color:#a1a1aa}

                .dp-hero-direct-call{display:flex;align-items:center;gap:12px;font-size:13px;color:#aeb2aa}
                .dp-hero-direct-call a{color:#e5c46e;font-weight:800;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
                
                .dp-hero-form-container{position:relative;z-index:10}
                .dp-hero-bottom-glow{position:absolute;width:550px;height:200px;bottom:-180px;left:18%;border-radius:50%;background:#c6a24333;filter:blur(100px);pointer-events:none}

                .dp-proof-strip{background:#151717;border-bottom:1px solid var(--line)}
                .dp-proof-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding:20px 0}
                .dp-proof-grid span{display:flex;align-items:center;justify-content:center;gap:9px;color:#d5d3c9;font-size:12px;font-weight:750}
                .dp-proof-grid svg{color:#d4ad4c;flex-shrink:0}

                .dp-light{background:#111414}.dp-white{background:#0d1010}
                .dp-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:38px}
                .dp-step{position:relative;padding:31px;border:1px solid var(--line);border-radius:14px;background:linear-gradient(145deg,#1b1e1e,#141616)}
                .dp-step-icon{display:inline-flex;padding:13px;border-radius:10px;background:#c6a24318;color:#e1bd68}
                .dp-step-num{position:absolute;top:29px;right:25px;color:#786843;font-size:17px;font-weight:900}
                .dp-step h3{font-size:19px;color:#f5f3ed;margin:20px 0 10px}
                .dp-step p{font-size:14px;margin:0}
                .dp-section-cta{margin-top:35px}

                .dp-section-heading{display:flex;justify-content:space-between;align-items:end;gap:25px;margin-bottom:33px}
                .dp-section-heading>div{max-width:710px}
                .dp-section-heading p{margin:0}
                .dp-text-link{color:#e8c875;text-decoration:none;font-weight:800;display:flex;align-items:center;gap:7px;white-space:nowrap}

                /* 2 PACKAGES GRID */
                .dp-package-grid-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;max-width:960px;margin:0 auto}
                .dp-package{background:#191c1c;border:1px solid #424035;border-radius:18px;position:relative;display:flex;flex-direction:column;min-width:0;padding:30px;box-shadow:0 16px 40px #0002}
                .dp-package-featured{border-color:#c6a243;box-shadow:0 0 0 1px #c6a24366,0 20px 60px #c6a24318;background:linear-gradient(165deg,#24211a,#161a1a 50%)}
                .dp-ribbon{color:#e9c777;font-size:11px;font-weight:850;letter-spacing:.5px;margin-bottom:12px;text-transform:uppercase}
                .dp-mini{color:#cba95d;font-size:11px;text-transform:uppercase;font-weight:850;letter-spacing:1px}
                .dp-package h3{font-size:22px;color:#f8f6f0;margin:12px 0 8px}
                .dp-price{font-size:36px;color:#e6c77a;font-weight:900;margin-bottom:12px}
                .dp-price small{font-size:13px;color:#a1a1aa;font-weight:600}
                .dp-package-top p{color:#bdbdb6;font-size:14px;line-height:1.5;margin:0}
                
                .dp-package-toggle{display:flex;justify-content:space-between;align-items:center;width:100%;padding:14px 0;margin-top:20px;background:transparent;border:0;border-top:1px solid #514b37;color:#e8c875;cursor:pointer;font:inherit;font-size:13px;font-weight:800;text-align:left}
                .dp-package-toggle svg{transition:transform .2s}
                .dp-chevron-open{transform:rotate(180deg)}
                .dp-package-includes{display:grid;gap:10px;margin:10px 0 20px;font-size:13px}
                .dp-package-includes>div{display:flex;gap:10px;align-items:flex-start;color:#d5d5ce}
                .dp-package-includes svg{flex:0 0 auto;color:#d8b55e}
                .dp-package>.dp-btn{margin-top:auto}
                .dp-fineprint{font-size:12px;color:#9b9e96;margin-top:25px;text-align:center}

                .dp-gallery-section{background:#151818}
                .dp-gallery{max-width:960px;margin:35px auto 0}
                .dp-gallery-stage{height:min(50vw,460px);min-height:240px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;border-radius:15px;background:#252827;border:1px solid #4a4435}
                .dp-gallery-stage>img{width:100%;height:100%;object-fit:contain}
                .dp-gallery-label{position:absolute;top:15px;left:15px;font-size:11px;font-weight:850;background:#101110e8;border:1px solid #847044;color:#e8c875;padding:8px 12px;border-radius:7px}
                .dp-gallery-arrow{position:absolute;top:50%;transform:translateY(-50%);height:43px;width:43px;display:grid;place-items:center;border:1px solid #a48c57;background:#101211ec;color:#efd18b;border-radius:50%;cursor:pointer}
                .dp-gallery-prev{left:12px}.dp-gallery-next{right:12px}
                .dp-thumbnails{display:flex;gap:9px;overflow-x:auto;padding:13px 0}
                .dp-thumb{flex:0 0 86px;height:63px;padding:0;border:2px solid #393c38;border-radius:8px;overflow:hidden;background:#252827;opacity:.7;cursor:pointer}
                .dp-thumb-active{opacity:1;border-color:#dbb963}.dp-thumb img{display:block;height:100%;width:100%;object-fit:cover}

                .dp-postcode-section{background:#1b1e1d;border-block:1px solid var(--line)}
                .dp-postcode-layout{display:grid;grid-template-columns:1fr 1fr;gap:42px;align-items:center}
                .dp-postcode-layout p{max-width:540px}
                .dp-postcode-card{padding:25px;background:#121515;border:1px solid #6b5a37;border-radius:13px;min-width:0}
                .dp-postcode-card label{display:block;font-weight:800;font-size:13px;margin-bottom:11px}
                .dp-postcode-row{display:flex;gap:9px}
                .dp-postcode-row input{flex:1;min-width:0;border-radius:7px;border:1px solid #6e6654;background:#f4f3ee;color:#191a18;padding:13px;font-size:15px}
                .dp-postcode-row button{padding:10px 17px;background:#d5b35d;border-radius:7px;color:#1b1912;border:0;font-weight:850;cursor:pointer}
                .dp-postcode-row button:disabled{opacity:.6}
                .dp-postcode-result{font-size:12px;margin-top:12px;color:#c8c7be;line-height:1.5}

                .dp-faq-layout{display:grid;grid-template-columns:minmax(0,.83fr) minmax(0,1.17fr);gap:60px}
                .dp-faq-layout>div:first-child>p{margin-bottom:25px}
                .dp-faq-list{display:grid;gap:12px}
                .dp-faq{background:#1b1e1e;border:1px solid #46443c;border-radius:12px;overflow:hidden}
                .dp-faq button{border:0;background:transparent;width:100%;display:flex;gap:12px;align-items:center;justify-content:space-between;text-align:left;padding:20px;color:#f0eee5;font:inherit;font-size:15px;font-weight:800;cursor:pointer}
                .dp-faq button svg{flex-shrink:0;transition:transform .2s;color:#d9b963}
                .dp-faq p{margin:0;padding:0 20px 20px;color:#c4c4ba;font-size:14px}

                .dp-bottom-cta{padding:60px 0;background:radial-gradient(ellipse at right,#39311f,#111413 67%);border-top:1px solid var(--line)}
                .dp-bottom-cta-inner{display:flex;align-items:center;justify-content:space-between;gap:30px}
                .dp-bottom-cta h2{font-size:38px;margin:10px 0}.dp-bottom-cta p{max-width:620px;margin:0}
                .dp-bottom-actions{display:grid;gap:13px;justify-items:center;flex-shrink:0}
                .dp-call-link{display:flex;align-items:center;gap:9px;font-weight:850;text-decoration:none;color:#e5c46e}

                .dp-footer{background:#090b0b;color:#aeb1a9;border-top:1px solid var(--line)}
                .dp-footer-inner{padding:35px 0;display:flex;justify-content:space-between;gap:25px}
                .dp-footer strong{color:#f4f2ed}.dp-footer strong span{color:#d8b45b}
                .dp-footer p{margin:7px 0;font-size:13px}.dp-footer small{font-size:12px}
                .dp-footer-links{display:flex;align-content:center;flex-wrap:wrap;gap:16px}
                .dp-footer-links a{font-size:13px;color:#d5d1c2;text-decoration:none}
                .dp-mobile-sticky{display:none}

                .dp-testimonials{background:#111414;border-block:1px solid var(--line)}
                .dp-testimonial-controls{display:flex;gap:10px}
                .dp-testimonial-controls button{height:43px;width:43px;display:grid;place-items:center;border:1px solid #847046;border-radius:50%;background:#222522;color:#e7c577;cursor:pointer}
                .dp-testimonial-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:17px}
                .dp-testimonial{margin:0;padding:25px;background:#1c201f;border:1px solid #504b3f;border-radius:14px;display:flex;flex-direction:column;min-height:235px}
                .dp-testimonial-stars{color:#dcb967;letter-spacing:3px}
                .dp-testimonial p{font-size:14px;line-height:1.8;flex:1}
                .dp-testimonial footer{display:grid;gap:4px;font-size:13px}
                .dp-testimonial footer strong{color:#f1f0e9}.dp-testimonial footer span{color:#aeb2aa;font-size:12px}

                @media(max-width:1100px){
                    .dp-nav-links{gap:12px}.dp-nav-links>a{font-size:12px}.dp-nav-phone{display:none!important}
                    .dp-hero-grid{grid-template-columns:1fr;gap:36px;padding:48px 0}
                    .dp-testimonial-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
                    .dp-testimonial-secondary:last-child{display:none}
                }
                @media(max-width:800px){
                    .dp-wrap{width:min(100% - 32px,1240px)}
                    .dp-section{padding:54px 0;scroll-margin-top:76px}
                    .dp-nav-inner{min-height:66px}
                    .dp-nav-mobile-actions{display:flex;align-items:center;gap:12px}
                    .dp-nav-mobile-actions a,.dp-nav-mobile-actions button{height:38px;width:38px;display:grid;place-items:center;border:1px solid #5b5036;background:#191b19;color:#e2c26e;border-radius:7px;cursor:pointer}
                    .dp-nav-links{display:none;position:absolute;top:65px;left:0;right:0;padding:15px 18px 20px;background:#111413;border-bottom:1px solid #5b5036;box-shadow:0 20px 30px #0008;flex-direction:column;align-items:stretch;gap:0}
                    .dp-nav-open{display:flex}
                    .dp-nav-links>a{padding:12px 6px;font-size:14px}
                    .dp-nav-links .dp-nav-phone{display:flex!important}
                    .dp-nav-links .dp-nav-cta{justify-content:center;margin-top:9px}
                    
                    .dp-hero-grid{grid-template-columns:1fr;gap:30px;padding:36px 0 45px}
                    .dp-hero h1{font-size:clamp(34px,8vw,48px)}
                    .dp-proof-grid{grid-template-columns:1fr;gap:10px;padding:16px 0}
                    .dp-proof-grid span{justify-content:flex-start}
                    
                    .dp-package-grid-two{grid-template-columns:1fr}
                    .dp-steps,.dp-postcode-layout,.dp-faq-layout,.dp-testimonial-grid{grid-template-columns:1fr}
                    .dp-testimonial-secondary{display:none}
                    .dp-section-heading,.dp-bottom-cta-inner{flex-direction:column;align-items:flex-start}
                    .dp-postcode-layout,.dp-faq-layout{gap:22px}
                    .dp-gallery-stage{height:300px}
                    .dp-footer-inner{flex-direction:column}
                    .dp-bottom-cta{padding-bottom:95px}
                    
                    .dp-mobile-sticky{display:flex;position:fixed;bottom:0;left:0;right:0;z-index:150;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:#0b0d0df5;border-top:1px solid #6b5933;gap:9px;box-shadow:0 -8px 30px #0008}
                    .dp-mobile-sticky a:first-child{flex:1;min-height:49px;display:flex;align-items:center;justify-content:center;gap:8px;background:#d1aa52;color:#17140c;text-decoration:none;border-radius:8px;font-size:14px;font-weight:900}
                    .dp-mobile-sticky a:last-child{width:54px;display:grid;place-items:center;border:1px solid #816c3b;border-radius:8px;color:#eed189}
                    .dp-page{padding-bottom:65px}
                }
                @media(max-width:520px){
                    .dp-hero h1{font-size:32px;margin:12px 0 14px}
                    .dp-kicker{font-size:10px}
                    .dp-hero-bullets{gap:8px}
                    .dp-postcode-row{flex-direction:column}
                    .dp-postcode-row button{min-height:45px}
                }
                @media(prefers-reduced-motion:reduce){.dp-page *{scroll-behavior:auto!important;transition:none!important}}
            `}</style>
        </Layout>
    );
}