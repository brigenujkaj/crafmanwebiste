import { useEffect, useLayoutEffect, useState } from "react";
import Layout, { siteStyles } from "../components/Layout.jsx";
import DrivewayCalculator from "../components/DrivewayCalculator.jsx";
import LandscapingConsultationForm from "../components/LandscapingConsultationForm.jsx";
import { Helmet } from "react-helmet-async";

export default function Landscaping() {
    const { section, card, buttonPrimary, buttonSecondary, tag } = siteStyles;

    const [activeTab, setActiveTab] = useState("materials"); // "materials" or "siteVariables"
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [openFaq, setOpenFaq] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [customFocus, setCustomFocus] = useState("");

    useLayoutEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const galleryImages = [
        { src: "/images/landscape-porcelain.jpg", label: "Premium Porcelain Terrace Array" },
        { src: "/images/landscape-blockpaving.jpg", label: "SuDS Permeable Interlocking Driveway" },
        { src: "/images/landscape-artificialgrass.jpg", label: "Multi-Core High Density Artificial Lawn" },
        { src: "/images/landscape-retainingwall.jpg", label: "Structural Engineering Retaining Masonry" },
        { src: "/images/landscape-steps.jpg", label: "Granite Wide-Tread Level Transitions" },
        { src: "/images/landscape-planters.jpg", label: "Monolith Brick Raised Planter Configurations" },
    ];

    const specificationMatrix = {
        materials: [
            { name: "Vitrified Porcelain", costRank: "Premium", maintenance: "Near-Zero", lifeSpan: "30+ Years", bestFor: "Contemporary Patios & Living Extensions" },
            { name: "Interlocking Block Paving", costRank: "Moderate", maintenance: "Low (Weed Control)", lifeSpan: "25+ Years", bestFor: "Driveways & Heavy Vehicular Load Zones" },
            { name: "Natural Sandstone", costRank: "Moderate", maintenance: "Medium (Sealing Required)", lifeSpan: "20+ Years", bestFor: "Organic, Traditional Garden Paths" },
            { name: "Synthetic Luxury Turf", costRank: "Cost-Effective", maintenance: "Zero Mowing", lifeSpan: "12-15 Years", bestFor: "Low-Maintenance, Child & Pet Play Lawns" }
        ],
        siteVariables: [
            { factor: "Site Access & Machinery", impact: "High Impact", detail: "Narrow side passages require smaller machinery or manual labor, altering ground clearing speeds." },
            { factor: "Ground Topography & Grading", impact: "High Impact", detail: "Sloped gardens requiring technical leveling, structural steps, or retaining blocks increase excavation scale." },
            { factor: "Subsoil Density & Clay Mix", impact: "Moderate Impact", detail: "Heavy London or Essex clays demand thicker aggregate sub-bases to secure permanent load protection." },
            { factor: "Surface Drainage Infrastructure", impact: "Moderate Impact", detail: "Implementing legal SuDS compliance (soakaways/slot drains) shifts early installation configurations." }
        ]
    };

    const testimonials = [
        {
            name: "Marcus G.",
            role: "Porcelain Terrace Layout, Romford",
            text: "Crafman executed our porcelain patio flawlessly. Their level lines are razor sharp, and the team integrated surface linear slot drains perfectly into our current ground floor elevations.",
        },
        {
            name: "Clara H.",
            role: "Multi-Level Yard Reconstruction, Chigwell",
            text: "Exceptional engineering work on our heavy clay slopes. The masonry retaining block planters and integrated steps transformed our unusable garden grid completely.",
        },
        {
            name: "Thomas D.",
            role: "SuDS Driveway Block Paving, Hornchurch",
            text: "Clean transparent pricing guides, precise excavation machinery control, and pristine block interlocking accuracy. Absolute professional paving masters from sub-base drops to sand sweeps.",
        },
    ];

    const visibleTestimonials = isMobile ? [testimonials[testimonialIndex]] : testimonials;

    const landscapingSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LandscapingService",
                "@id": "https://www.crafman.co.uk/#organization",
                "name": "Crafman Design and Build",
                "legalName": "Crafman Building and Landscaping Ltd",
                "url": "https://www.crafman.co.uk",
                "image": "https://www.crafman.co.uk/images/landscape-porcelain.jpg",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Marsh Wy",
                    "addressLocality": "London",
                    "postalCode": "RM13 8EU",
                    "addressCountry": "GB"
                }
            }
        ]
    };

    return (
        <Layout>
            <Helmet>
                <title>Bespoke Landscaping, Porcelain Patios & Block Paving | Crafman</title>
                <meta name="description" content="Custom garden architectures, premium vitrified porcelain terraces, and SuDS block paving driveways across London & Essex. Plan your build specifications today." />
                <link rel="canonical" href="https://crafman.co.uk/landscaping" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(landscapingSchema) }} />
            </Helmet>

            <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden", position: "relative" }}>
                
                {/* Hero Section */}
                <section style={{ position: "relative", borderBottom: "1px solid #e7e5e4", backgroundImage: "url('/images/landscapingBackground.jpeg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(241,237,231,0.9), rgba(255,255,255,0.85), rgba(234,229,221,0.9))", zIndex: 1 }} />
                    <div style={{ position: "relative", zIndex: 2 }}>
                        <div style={{ ...section, paddingTop: "90px", paddingBottom: "90px" }}>
                            <div style={tag}>Bespoke Grounds Architecture</div>
                            <h1 style={{ fontSize: "clamp(38px, 6vw, 62px)", lineHeight: "1.05", margin: 0, maxWidth: "820px", color: "#A67C00" }}>
                                External spaces engineered for permanence
                            </h1>
                            <p style={{ fontSize: "clamp(16px, 3vw, 20px)", lineHeight: "1.3", marginTop: "12px", marginBottom: 0, maxWidth: "820px", color: "#44403c", fontWeight: "500" }}>
                                Tailored patio layouts, block paving, and ground engineering built to match your unique site requirements.
                            </p>
                            <div style={{ marginTop: "30px", display: "flex", gap: "14px", flexWrap: "wrap" }}>
                                <a href="#calculator" style={buttonPrimary}>Launch Cost Calculator</a>
                                <a href="#planner" style={buttonSecondary}>Explore Specification Guide</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fast-Scan Micro Process Indicator Row */}
                <section style={{ background: "#fcfbf8", padding: "32px 16px", borderBottom: "1px solid #e7e5e4" }}>
                    <div style={{ ...section, maxWidth: "800px", margin: "0 auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "20px" }}>
                            {[
                                { step: "01", title: "Laser Site Survey", desc: "Millimeter-precise boundary line and slope profiling checks." },
                                { step: "02", title: "Sub-Base Compaction", desc: "Engineered deep aggregate rock locks preventing sinking." },
                                { step: "03", title: "Vitrified Setting", desc: "Pristine joint line masonry arrays matching core house styles." }
                            ].map((item, i) => (
                                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "start" }}>
                                    <span style={{ fontSize: "20px", fontWeight: "900", color: "#A67C00", opacity: 0.4 }}>{item.step}</span>
                                    <div>
                                        <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "700", color: "#1c1917" }}>{item.title}</h4>
                                        <p style={{ margin: 0, fontSize: "13px", color: "#6b6661", lineHeight: "1.4" }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cost Slider Injection Spot */}
                <section id="calculator" style={{ background: "#fff", padding: "40px 0" }}>
                    <div style={section}>
                        <div style={{ textAlign: "center", marginBottom: "24px" }}>
                            <div style={tag}>Interactive Sizing Tool</div>
                            <h2 style={{ fontSize: "32px", margin: "6px 0 0", fontWeight: "800" }}>Configure Your Area Parameters</h2>
                        </div>
                        <DrivewayCalculator />
                    </div>
                </section>

                {/* Brand Trust Badges */}
                <section style={{ borderTop: "1px solid #e7e5e4", borderBottom: "1px solid #e7e5e4", background: "#fcfbf8" }}>
                    <div style={{ ...section, padding: isMobile ? "40px 16px" : "48px 20px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: isMobile ? "16px" : "24px" }}>
                            <div style={{ ...card, background: "#fff", border: "1px solid #e7e5e4", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                                    <svg viewBox="0 0 24 24" width="22" height="22"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                                    <span style={{ fontWeight: "800", fontSize: "16px" }}>Google Paving Feedback</span>
                                </div>
                                <div style={{ color: "#f59e0b", fontSize: "18px", marginBottom: "6px" }}>★★★★★</div>
                                <div style={{ fontSize: "22px", fontWeight: "800" }}>4.9 / 5.0 Rating</div>
                            </div>
                            <div style={{ ...card, background: "#fff", border: "1px solid #e7e5e4", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                <div style={{ width: "54px", height: "54px", marginBottom: "12px" }}>
                                    <img src="/images/fmb.jpeg" alt="FMB Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                </div>
                                <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "800" }}>Master Builder Inspected</h3>
                                <p style={{ margin: 0, fontSize: "13px", color: "#57534e" }}>Vetted and approved site preparation and drainage installations.</p>
                            </div>
                            <div style={{ ...card, background: "#fff", border: "1px solid #e7e5e4", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#16a34a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 11l2 2 4-4" /></svg>
                                </div>
                                <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "800" }}>TrustMark Endorsed</h3>
                                <p style={{ margin: 0, fontSize: "13px", color: "#57534e" }}>Government standards ensuring correct technical aggregate depths.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 💎 NEW REPLACEMENT: Interactive Bespoke Specification Planner */}
                <section id="planner" style={{ borderBottom: "1px solid #e7e5e4", background: "#fff" }}>
                    <div style={{ ...section, padding: isMobile ? "40px 16px" : "64px 20px" }}>
                        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 32px" }}>
                            <div style={tag}>Bespoke Project Parameters</div>
                            <h2 style={{ fontSize: isMobile ? "28px" : "38px", fontWeight: "800", margin: "10px 0 8px" }}>Custom Specification Guide</h2>
                            <p style={{ color: "#57534e", fontSize: "15px", lineHeight: "1.6" }}>
                                Landscaping budgets are dictated by your site's physical conditions and material choices rather than generic boxes. Use this guide to balance your design criteria.
                            </p>
                        </div>

                        {/* Interactive Tab Switchers */}
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "24px" }}>
                            <button 
                                onClick={() => setActiveTab("materials")}
                                style={{ ...buttonSecondary, background: activeTab === "materials" ? "#1c1917" : "#f5f5f4", color: activeTab === "materials" ? "#fff" : "#1c1917", border: "1px solid #d6d3d1", borderRadius: "12px", padding: "12px 20px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
                            >
                                Compare Material Options
                            </button>
                            <button 
                                onClick={() => setActiveTab("siteVariables")}
                                style={{ ...buttonSecondary, background: activeTab === "siteVariables" ? "#1c1917" : "#f5f5f4", color: activeTab === "siteVariables" ? "#fff" : "#1c1917", border: "1px solid #d6d3d1", borderRadius: "12px", padding: "12px 20px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
                            >
                                Structural Cost Drivers
                            </button>
                        </div>

                        {/* Tab Content 1: Materials Matrix */}
                        {activeTab === "materials" && (
                            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "16px" }}>
                                {specificationMatrix.materials.map((mat) => (
                                    <div key={mat.name} style={{ ...card, border: "1px solid #e7e5e4", borderRadius: "20px", padding: "20px", background: "#fcfbf8" }}>
                                        <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#A67C00", fontWeight: "800" }}>{mat.name}</h3>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "13px", color: "#57534e", marginBottom: "12px" }}>
                                            <div><strong>Cost Matrix:</strong> {mat.costRank}</div>
                                            <div><strong>Lifespan:</strong> {mat.lifeSpan}</div>
                                            <div style={{ gridColumn: "span 2" }}><strong>Maintenance:</strong> {mat.maintenance}</div>
                                        </div>
                                        <p style={{ margin: 0, fontSize: "14px", color: "#1c1917", fontWeight: "500", borderTop: "1px solid #e7e5e4", paddingTop: "8px" }}>
                                            <strong>Best Applied For:</strong> {mat.bestFor}
                                        </p>
                                        <button 
                                            onClick={() => { setCustomFocus(`Material: ${mat.name}`); document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" }); }}
                                            style={{ marginTop: "14px", width: "100%", padding: "10px", background: "#1c1917", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}
                                        >
                                            Select This Material Base
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tab Content 2: Site Variables Matrix */}
                        {activeTab === "siteVariables" && (
                            <div style={{ display: "grid", gap: "12px" }}>
                                {specificationMatrix.siteVariables.map((variable) => (
                                    <div key={variable.factor} style={{ ...card, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr", gap: "12px", border: "1px solid #e7e5e4", borderRadius: "16px", padding: "20px", background: "#fff", alignItems: "center" }}>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "800", color: "#1c1917" }}>{variable.factor}</h3>
                                            <span style={{ display: "inline-block", marginTop: "4px", padding: "2px 8px", background: "rgba(166,124,0,0.1)", color: "#A67C00", borderRadius: "999px", fontSize: "11px", fontWeight: "700" }}>{variable.impact}</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: "14px", color: "#57534e", lineHeight: "1.5" }}>{variable.detail}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Portfolio Visual Carousel */}
                <section style={{ borderBottom: "1px solid #e7e5e4", background: "#fff" }}>
                    <div style={{ ...section, padding: isMobile ? "48px 16px" : "64px 20px" }}>
                        <div style={{ fontSize: "17px", letterSpacing: "2px", textTransform: "uppercase", color: "#78716c", fontWeight: "700" }}>Example Project Realizations</div>
                        <div style={{ marginTop: "24px", borderRadius: "24px", overflow: "hidden", border: "1px solid #e7e5e4", background: "#f8f7f5", width: "100%" }}>
                            <div style={{ position: "relative", width: "100%", background: "#eceae6", height: isMobile ? "240px" : "480px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", boxSizing: "border-box", textAlign: "center" }}>
                                <span style={{ fontSize: "40px", marginBottom: "12px" }}>📸</span>
                                <strong style={{ color: "#1c1917" }}>{galleryImages[galleryIndex].label}</strong>
                                <span style={{ fontSize: "12px", color: "#78716c", marginTop: "4px" }}>Asset Reference: {galleryImages[galleryIndex].src}</span>
                            </div>
                            <div style={{ padding: "18px 20px", borderTop: "1px solid #e7e5e4", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", gap: "14px", alignItems: "center", background: "#fff" }}>
                                <div>
                                    <div style={{ fontWeight: "700", color: "#1f1f1f", fontSize: "16px" }}>{galleryImages[galleryIndex].label}</div>
                                    <div style={{ marginTop: "4px", color: "#78716c", fontSize: "14px" }}>Turnkey construction execution optimized for local ground elements.</div>
                                </div>
                                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                    <button type="button" onClick={() => setGalleryIndex((p) => (p === 0 ? galleryImages.length - 1 : p - 1))} style={{ height: "44px", width: "44px", borderRadius: "999px", border: "1px solid #d6d3d1", background: "#fff", cursor: "pointer" }}>←</button>
                                    <button type="button" onClick={() => setGalleryIndex((p) => (p + 1) % galleryImages.length)} style={{ height: "44px", width: "44px", borderRadius: "999px", border: "1px solid #1c1917", background: "#1c1917", color: "#fff", cursor: "pointer" }}>→</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Promotional CTA Strip Block */}
                <section style={{ borderTop: "1px solid #e7e5e4", borderBottom: "1px solid #e7e5e4", background: "linear-gradient(135deg, #1f1f1f 0%, #121212 100%)", color: "#fff" }}>
                    <div style={{ ...section, padding: isMobile ? "40px 16px" : "48px 24px", maxWidth: "1000px", margin: "0 auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", gap: "28px", alignItems: "center" }}>
                            <div>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "999px", background: "rgba(166, 124, 0, 0.15)", border: "1px solid #A67C00", color: "#C6A243", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
                                    ⚡ Active Survey Slot Promotion
                                </div>
                                <h2 style={{ margin: "0 0 10px", fontSize: isMobile ? "28px" : "38px", fontWeight: "800", color: "#fff" }}>
                                    Lock in an <span style={{ color: "#C6A243" }}>On-Site Layout Assessment</span> this week
                                </h2>
                                <p style={{ margin: 0, color: "#d6d3d1", fontSize: "15px", lineHeight: "1.6", maxWidth: "620px" }}>
                                    Speak directly with a practical landscape site technician. Claim an absolute project appraisal tracking reference without administrative friction.
                                </p>
                            </div>
                            <div>
                                <a href="tel:02036335634" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", minHeight: "54px", padding: "0 28px", borderRadius: "16px", background: "linear-gradient(135deg, #A67C00, #C6A243)", color: "#fff", fontSize: "16px", fontWeight: "800", textDecoration: "none", boxShadow: "0 12px 24px rgba(166, 124, 0, 0.25)" }}>
                                    Call Office: 0203 633 5634
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Form Placement Anchor Area */}
                <section id="contact-form" style={{ borderTop: "1px solid #e7e5e4", background: "#efebe6" }}>
                    <div style={{ maxWidth: "680px", margin: "0 auto", padding: isMobile ? "48px 16px" : "70px 24px" }}>
                        <LandscapingConsultationForm selectedTier={customFocus} title="Initiate Landscape Consultation" />
                    </div>
                </section>

                {/* Sticky Layout Dual Accordion FAQs Section */}
                <section style={{ borderTop: "1px solid #e7e5e4", borderBottom: "1px solid #e7e5e4", background: "linear-gradient(180deg, #ffffff 0%, #f8f5ef 100%)" }}>
                    <div style={section}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.9fr 1.1fr", gap: "36px", alignItems: "start" }}>
                            <div style={{ position: isMobile ? "relative" : "sticky", top: "110px", ...card, background: "#1f1f1f", color: "#fff", borderRadius: "24px" }}>
                                <div style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#d6d3d1", fontWeight: "700" }}>Information Blocks</div>
                                <h2 style={{ fontSize: "36px", marginTop: "12px", color: "#fff", fontWeight: "800" }}>Paving, retention, and lawn engineering queries resolved</h2>
                            </div>

                            <div style={{ display: "grid", gap: "14px" }}>
                                {[
                                    { q: "How deep must a residential sub-base drop extend?", a: "Standard foot-traffic porcelain terraces require a baseline of 100mm compressed limestone aggregate beneath mortar levels. Driveway block paving boundaries dictate structural depths down to 150mm minimum to comfortably counteract permanent vehicular mass vectors without structural displacement." },
                                    { q: "What metrics cause garden paving to shift or crack over time?", a: "Subsoil clay movements combined with structural failure to channel hydrostatic pressure away correctly causes structural failure. We pack robust granite screening sub-bases and wire structural geo-textiles lines down completely to stop block sink holes from manifesting." },
                                    { q: "Do front patio configurations demand planning permissions under regional codes?", a: "Front yard footprints exceeding 5 square meters demand fully functional porous permeable paving layouts or explicit track channelling lines routing runoff water straight onto interior lawns (SuDS rules). We guarantee absolute structural code compliance out of all hardscaping lines." },
                                    { q: "How long must vitrified porcelain installations cure before usage lines activate?", a: "We apply advanced structural resin polymers that handle initial dry boundaries inside 24 hours. Full multi-ton heavy wheel load cycles require approximately 48 to 72 hours of uninterrupted dry curing lines depending on ambient weather coefficients." }
                                ].map((item, index) => {
                                    const isOpen = openFaq === index;
                                    return (
                                        <div key={index} style={{ ...card, padding: 0, overflow: "hidden", border: "1px solid #e7e5e4", background: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,0.02)" }}>
                                            <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} style={{ width: "100%", border: "none", background: "transparent", padding: "20px", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span style={{ fontSize: "16px", fontWeight: "800", color: "#1c1917" }}>{item.q}</span>
                                                <span style={{ fontWeight: "800" }}>{isOpen ? "−" : "+"}</span>
                                            </button>
                                            {isOpen && <div style={{ padding: "0 20px 20px 20px", color: "#57534e", fontSize: "14px", lineHeight: "1.6" }}>{item.a}</div>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Universal Brand Footer */}
                <footer style={{ borderTop: "1px solid #e7e5e4", background: "#1f1f1f", color: "#d6d3d1" }}>
                    <div style={{ ...section, padding: isMobile ? "40px 16px 24px" : "60px 20px 30px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: "40px", paddingBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                            <div>
                                <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff", marginBottom: "12px" }}>Crafman <span style={{ color: "#C6A243", fontWeight: "400" }}>Design & Build</span></div>
                                <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#a8a29e", lineHeight: "1.5" }}>Turnkey grounds architectural paving, landscaping configurations, and structural earth mechanics built to code across London & Essex.</p>
                                <div style={{ fontSize: "13px", color: "#78716c" }}><strong>Main Operations Block:</strong> Crafman Building and Landscaping Ltd, Marsh Wy, RM13 8EU</div>
                            </div>
                            <div>
                                <div style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#fff", marginBottom: "14px" }}>System Sectors</div>
                                <div style={{ display: "grid", gap: "10px", fontSize: "14px" }}>
                                    <a href="#calculator" style={{ color: "#a8a29e", textDecoration: "none" }}>Interactive Estimator</a>
                                    <a href="#planner" style={{ color: "#a8a29e", textDecoration: "none" }}>Specification Matrices</a>
                                    <a href="#contact-form" style={{ color: "#a8a29e", textDecoration: "none" }}>Secure Booking Portal</a>
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#fff", marginBottom: "14px" }}>Comms Access</div>
                                <div style={{ display: "grid", gap: "10px", fontSize: "14px" }}>
                                    <a href="tel:02036335634" style={{ color: "#C6A243", textDecoration: "none", fontWeight: "700" }}>0203 633 5634</a>
                                    <span style={{ color: "#a8a29e" }}>Operational Hours: 8 AM – 6 PM</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingTop: "20px", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", fontSize: "12px", color: "#78716c", gap: "12px" }}>
                            <div>© {new Date().getFullYear()} Crafman Building and Landscaping Ltd. All rights reserved.</div>
                            <div style={{ display: "flex", gap: "16px" }}><span>Vetted Master Builder Network</span><span>SuDS Infrastructure Certified</span></div>
                        </div>
                    </div>
                </footer>

            </div>
        </Layout>
    );
}