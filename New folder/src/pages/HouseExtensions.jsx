import { useEffect } from "react";
import Layout, { siteStyles } from "../components/Layout.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, House, Maximize2, Layers3, Building2, PencilRuler, ClipboardCheck, HardHat, ShieldCheck, Phone, Ruler } from "lucide-react";

export default function HouseExtensions() {
    const { section, buttonPrimary, buttonSecondary } = siteStyles;

    useEffect(() => {
        const root = document.querySelector(".crafman-extensions-page");
        if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        root.classList.add("motion-ready");
        const items = root.querySelectorAll(".crafman-reveal");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -45px 0px" }
        );

        items.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    const handleLeadSuccess = () => {
        // Keep the existing Google Ads conversion event. The site-wide GTM container
        // remains responsible for loading the tracking libraries.
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("event", "conversion", {
                send_to: "AW-16534080284/ooPfCN2175McEJyWiMw9",
                value: 1.0,
                currency: "GBP",
            });
        }

        if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({
                event: "house_extension_lead_submit",
                service: "house_extensions",
            });
        }
    };

    const styles = {
        page: {
            background: "#101010",
            color: "#f5f2ec",
            overflow: "hidden",
        },
        eyebrow: {
            color: "#c9a54a",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
        },
        gold: "#c9a54a",
        muted: "#b8b3aa",
        panel: {
            background: "#191919",
            border: "1px solid rgba(201,165,74,.24)",
            borderRadius: "18px",
            padding: "28px",
        },
        sectionTitle: {
            color: "#f7f4ed",
            fontSize: "clamp(30px, 4vw, 46px)",
            lineHeight: 1.12,
            letterSpacing: "-1.2px",
            margin: "12px 0 16px",
        },
        paragraph: {
            color: "#c3beb5",
            lineHeight: 1.8,
            fontSize: "16px",
        },
        goldButton: {
            ...buttonPrimary,
            background: "#c9a54a",
            color: "#111111",
            border: "1px solid #c9a54a",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: ".7px",
            justifyContent: "center",
        },
        outlineButton: {
            ...buttonSecondary,
            color: "#f5f2ec",
            border: "1px solid rgba(245,242,236,.55)",
            background: "rgba(16,16,16,.35)",
            justifyContent: "center",
        },
    };

    return (
        <Layout>
            <Helmet>
                <title>House Extensions North London | Design &amp; Build | Crafman</title>
                <meta
                    name="description"
                    content="Planning a house extension in North London? Crafman Design & Build delivers rear, side return, wraparound and double-storey extensions. Request a consultation."
                />
                <link
                    rel="canonical"
                    href="https://crafman.co.uk/house-extensions"
                />
                <meta property="og:title" content="House Extensions North London | Crafman Design & Build" />
                <meta
                    property="og:description"
                    content="Planning a house extension in North London? Speak to Crafman about rear, side return, wraparound and double-storey extensions."
                />
                <meta property="og:type" content="website" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "GeneralContractor",
                            name: "Crafman Design & Build",
                            legalName: "Crafman Building and Landscaping Ltd",
                            url: "https://crafman.co.uk/house-extensions",
                            image: "https://crafman.co.uk/images/extensionBackground.jpeg",
                            areaServed: [
                                { "@type": "AdministrativeArea", name: "North London" },
                                { "@type": "Place", name: "Barnet, London" },
                                { "@type": "Place", name: "Enfield, London" },
                                { "@type": "Place", name: "Finchley, London" },
                                { "@type": "Place", name: "Muswell Hill, London" },
                                { "@type": "Place", name: "Haringey, London" },
                                { "@type": "Place", name: "Islington, London" },
                            ],
                            description:
                                "House extension design and build services focused on North London, including rear, side return, wraparound, single-storey and double-storey extensions.",
                            knowsAbout: [
                                "House extensions",
                                "Rear extensions",
                                "Side return extensions",
                                "Wraparound extensions",
                                "Double-storey extensions",
                                "Design and build",
                            ],
                        }),
                    }}
                />
            </Helmet>

            <main className="crafman-extensions-page" style={styles.page}>
                {/* HERO — mirrors the Google Ads headline and core promise */}
                <section
                    className="crafman-extension-hero"
                    style={{
                        position: "relative",
                        minHeight: "min(760px, 82vh)",
                        display: "flex",
                        alignItems: "center",
                        backgroundImage:
                            "linear-gradient(90deg, rgba(8,8,8,.94) 0%, rgba(8,8,8,.82) 48%, rgba(8,8,8,.30) 100%), url('/images/extensionBackground.jpeg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderBottom: "1px solid rgba(201,165,74,.28)",
                    }}
                >
                    <div
                        style={{
                            ...section,
                            width: "100%",
                            paddingTop: "clamp(76px, 10vw, 132px)",
                            paddingBottom: "clamp(76px, 10vw, 132px)",
                        }}
                    >
                        <div className="crafman-hero-copy" style={{ maxWidth: "760px" }}>
                            <div style={styles.eyebrow}>Crafman Design &amp; Build · North London</div>
                            <h1
                                style={{
                                    color: "#fff",
                                    fontSize: "clamp(42px, 6.4vw, 76px)",
                                    lineHeight: 1.02,
                                    letterSpacing: "-2.4px",
                                    margin: "22px 0",
                                    maxWidth: "780px",
                                }}
                            >
                                House Extensions North London
                                <span style={{ color: styles.gold }}> | Design &amp; Build Specialists</span>
                            </h1>
                            <p
                                style={{
                                    color: "#e1ddd5",
                                    fontSize: "clamp(17px, 2vw, 21px)",
                                    lineHeight: 1.7,
                                    maxWidth: "650px",
                                    margin: "0 0 30px",
                                }}
                            >
                                Planning a house extension in North London? Our team brings architectural
                                design and construction together, helping you move from the first
                                ideas to a well-coordinated build.
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "14px",
                                    alignItems: "center",
                                }}
                            >
                                <a className="crafman-gold-cta" href="#enquiry" style={styles.goldButton}>
                                    Request a consultation
                                </a>
                                <a href="#extension-types" style={styles.outlineButton}>
                                    Explore extension services
                                </a>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "18px 28px",
                                    marginTop: "34px",
                                    color: "#e0d9ca",
                                    fontSize: "13px",
                                }}
                            >
                                <span>Family-run business</span>
                                <span>20+ years of industry experience</span>
                                <span>North London focus</span>
                            </div>
                        </div>
                    </div>
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            right: "5%",
                            bottom: "0",
                            width: "1px",
                            height: "100px",
                            background: "linear-gradient(transparent, #c9a54a)",
                        }}
                    />
                </section>

                {/* TRUST / POSITIONING STRIP */}
                <section
                    style={{
                        borderBottom: "1px solid rgba(201,165,74,.22)",
                        background: "#171717",
                    }}
                >
                    <div
                        style={{
                            ...section,
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                            gap: "22px",
                            paddingTop: "25px",
                            paddingBottom: "25px",
                        }}
                    >
                        {[
                            ["20+ YEARS", "Industry experience"],
                            ["ONE TEAM", "Design through construction"],
                            ["LONDON & ESSEX", "Local project coverage"],
                            ["YOUR PROJECT", "A considered, tailored approach"],
                        ].map(([heading, detail]) => (
                            <div key={heading} className="crafman-reveal crafman-stat" style={{ borderLeft: "2px solid #c9a54a", paddingLeft: "15px" }}>
                                <div style={{ color: styles.gold, fontWeight: 800, letterSpacing: "1px", fontSize: "13px" }}>
                                    {heading}
                                </div>
                                <div style={{ color: "#c3beb5", marginTop: "5px", fontSize: "14px" }}>
                                    {detail}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* VISUAL PROJECT SHOWCASE */}
                <section style={{ ...section, paddingTop: "76px", paddingBottom: "74px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: "24px", flexWrap: "wrap" }}>
                        <div>
                            <div style={styles.eyebrow}>Built with care</div>
                            <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>See what more space can look like.</h2>
                        </div>
                        <a href="#enquiry" style={{ ...styles.goldButton, display: "inline-flex", alignItems: "center", gap: "9px" }}>Start your project <ArrowUpRight size={17} /></a>
                    </div>
                    <div className="crafman-project-gallery" style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr 1fr", gap: "14px", marginTop: "30px" }}>
                        <figure className="crafman-image-tile crafman-reveal" style={{ margin: 0, position: "relative", minHeight: "340px", overflow: "hidden", borderRadius: "16px" }}>
                            <img src="/images/greenwichExt/rendering.png" alt="Crafman house extension project" loading="lazy" style={{ width: "100%", height: "100%", minHeight: "340px", objectFit: "cover", display: "block" }} />
                            <figcaption>Extension project</figcaption>
                        </figure>
                        <figure className="crafman-image-tile crafman-reveal" style={{ margin: 0, position: "relative", minHeight: "340px", overflow: "hidden", borderRadius: "16px" }}>
                            <img src="/images/greenwichExt/shellCompleted.png" alt="Rear extension exterior during construction" loading="lazy" style={{ width: "100%", height: "100%", minHeight: "340px", objectFit: "cover", display: "block" }} />
                            <figcaption>On-site construction</figcaption>
                        </figure>
                        <figure className="crafman-image-tile crafman-reveal" style={{ margin: 0, position: "relative", minHeight: "340px", overflow: "hidden", borderRadius: "16px" }}>
                            <img src="/images/greenwichExt/foundation.png" alt="House extension foundation works" loading="lazy" style={{ width: "100%", height: "100%", minHeight: "340px", objectFit: "cover", display: "block" }} />
                            <figcaption>Built from the ground up</figcaption>
                        </figure>
                    </div>
                </section>

                {/* EXTENSION TYPES — VISUAL ICON GRID */}
                <section id="extension-types" style={{ background: "#171717", borderTop: "1px solid rgba(201,165,74,.2)", borderBottom: "1px solid rgba(201,165,74,.2)" }}>
                    <div style={{ ...section, paddingTop: "72px", paddingBottom: "76px" }}>
                        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 34px" }}>
                            <div style={styles.eyebrow}>Extension types</div>
                            <h2 style={styles.sectionTitle}>More room. Better living.</h2>
                        </div>
                        <div className="crafman-type-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "14px" }}>
                            {[
                                [House, "Rear extensions", "More room to live"],
                                [Maximize2, "Side returns", "Make use of every metre"],
                                [Layers3, "Wraparound", "A bigger ground floor"],
                                [Building2, "Double-storey", "Space across two levels"],
                                [Ruler, "Single-storey", "A seamless extra room"],
                                [PencilRuler, "Kitchen extensions", "Room to cook and gather"],
                            ].map(([Icon, title, sub]) => (
                                <a key={title} href="#enquiry" className="crafman-type-card crafman-reveal" style={{ textDecoration: "none", color: "inherit", ...styles.panel, minHeight: "178px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                    <Icon size={34} strokeWidth={1.45} color={styles.gold} />
                                    <div><h3 style={{ color: "#fff", fontSize: "19px", margin: "22px 0 5px" }}>{title}</h3><span style={{ color: styles.muted, fontSize: "13px" }}>{sub}</span></div>
                                    <ArrowUpRight className="crafman-type-arrow" size={18} color={styles.gold} />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* DESIGN, PLANNING AND TECHNICAL SUPPORT — ICON LED */}
                <section style={{ ...section, paddingTop: "76px", paddingBottom: "76px" }}>
                    <div className="crafman-capabilities" style={{ display: "grid", gridTemplateColumns: "minmax(0, .85fr) minmax(0, 1.15fr)", gap: "46px", alignItems: "center" }}>
                        <div>
                            <div style={styles.eyebrow}>One coordinated service</div>
                            <h2 style={styles.sectionTitle}>From first sketch to final build.</h2>
                            <p style={{ ...styles.paragraph, maxWidth: "440px" }}>Design, planning and technical coordination — brought together around your extension.</p>
                            <a href="#enquiry" style={{ ...styles.goldButton, display: "inline-flex", alignItems: "center", gap: "9px", marginTop: "12px" }}>Talk to our team <ArrowUpRight size={17} /></a>
                        </div>
                        <div className="crafman-capability-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}>
                            {[
                                [PencilRuler, "In-house architectural service"],
                                [ClipboardCheck, "Planning permission guidance"],
                                [HardHat, "Structural coordination"],
                                [ShieldCheck, "Building control coordination"],
                            ].map(([Icon, label]) => (
                                <div key={label} className="crafman-capability crafman-reveal" style={{ background: "#191919", border: "1px solid rgba(201,165,74,.24)", borderRadius: "15px", padding: "24px 20px", minHeight: "142px" }}>
                                    <Icon size={31} strokeWidth={1.5} color={styles.gold} />
                                    <h3 style={{ color: "#f7f4ed", fontSize: "16px", lineHeight: 1.35, margin: "20px 0 0" }}>{label}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p style={{ ...styles.paragraph, fontSize: "12px", marginTop: "22px", opacity: .8 }}>Project requirements vary by property and proposed works.</p>
                </section>

                {/* SIMPLE THREE-STEP PROCESS */}
                <section style={{ background: "#1a1a1a", borderTop: "1px solid rgba(201,165,74,.2)", borderBottom: "1px solid rgba(201,165,74,.2)" }}>
                    <div style={{ ...section, paddingTop: "64px", paddingBottom: "64px" }}>
                        <div style={{ textAlign: "center", marginBottom: "30px" }}><div style={styles.eyebrow}>Getting started</div><h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Three simple steps.</h2></div>
                        <div className="crafman-process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "14px" }}>
                            {[[Phone, "01", "Tell us your plans"], [PencilRuler, "02", "Explore the design"], [HardHat, "03", "Plan your build"]].map(([Icon, number, label]) => (
                                <div key={number} className="crafman-process-card crafman-reveal" style={{ textAlign: "center", padding: "28px 18px", border: "1px solid rgba(201,165,74,.2)", borderRadius: "15px", background: "#202020" }}>
                                    <Icon size={32} color={styles.gold} strokeWidth={1.5} /><div style={{ color: styles.gold, fontSize: "11px", letterSpacing: "2px", marginTop: "16px" }}>{number}</div><h3 style={{ color: "#fff", fontSize: "17px", margin: "7px 0 0" }}>{label}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ENQUIRY */}
                <section id="enquiry" style={{ ...section, paddingTop: "88px", paddingBottom: "88px" }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                            gap: "42px",
                            alignItems: "start",
                        }}
                    >
                        <div>
                            <div style={styles.eyebrow}>Start your project</div>
                            <h2 style={styles.sectionTitle}>
                                Tell us about the extension you have in mind.
                            </h2>
                            <p style={styles.paragraph}>
                                Tell us where your property is and what you would like to create.
                                Our team will be in touch to discuss the next step.
                            </p>
                            <div style={{ ...styles.panel, marginTop: "28px" }}>
                                <div style={{ color: styles.gold, fontSize: "12px", letterSpacing: "1.8px", fontWeight: 800 }}>
                                    PREFER TO CALL?
                                </div>
                                <a
                                    href="tel:02081914122"
                                    style={{ display: "block", color: "#fff", fontSize: "25px", fontWeight: 800, textDecoration: "none", marginTop: "10px" }}
                                >
                                    020 8191 4122
                                </a>
                                <a
                                    href="mailto:sales@crafman.co.uk"
                                    style={{ display: "inline-block", color: styles.gold, marginTop: "8px", textDecoration: "none" }}
                                >
                                    sales@crafman.co.uk
                                </a>
                                <div style={{ color: styles.muted, fontSize: "14px", marginTop: "14px" }}>
                                    North London and surrounding areas
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                background: "#f7f5f0",
                                color: "#171717",
                                borderRadius: "18px",
                                padding: "clamp(20px, 4vw, 34px)",
                                boxShadow: "0 22px 60px rgba(0,0,0,.25)",
                            }}
                        >
                            <h3 style={{ fontSize: "25px", margin: "0 0 8px", color: "#171717" }}>
                                Request a consultation
                            </h3>
                            <p style={{ color: "#5b554b", lineHeight: 1.65, marginTop: 0 }}>
                                Leave your details and tell us briefly what you would like to build.
                            </p>
                            <ContactForm
                                endpoint="https://formspree.io/f/mnjlqwgn"
                                onSuccess={handleLeadSuccess}
                            />
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section
                    style={{
                        background: "linear-gradient(110deg, #c9a54a, #9f7b31)",
                        color: "#111",
                    }}
                >
                    <div
                        style={{
                            ...section,
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "24px",
                            paddingTop: "44px",
                            paddingBottom: "44px",
                        }}
                    >
                        <div style={{ maxWidth: "700px" }}>
                            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2px" }}>
                                CRAFTMAN DESIGN &amp; BUILD
                            </div>
                            <h2 style={{ fontSize: "clamp(27px, 4vw, 38px)", lineHeight: 1.15, margin: "10px 0" }}>
                                Ready to discuss your house extension?
                            </h2>
                            <p style={{ margin: 0, lineHeight: 1.65 }}>
                                Speak to our team about your property and house extension plans in North London.
                            </p>
                        </div>
                        <a
                            href="#enquiry"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "15px 23px",
                                borderRadius: "6px",
                                background: "#111",
                                color: "#fff",
                                textDecoration: "none",
                                fontWeight: 800,
                                letterSpacing: ".5px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            REQUEST A CONSULTATION
                        </a>
                    </div>
                </section>

                {/* Mobile consultation action */}
                <div
                    className="crafman-mobile-cta"
                    style={{
                        position: "fixed",
                        zIndex: 50,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: "10px 14px calc(10px + env(safe-area-inset-bottom))",
                        background: "rgba(15,15,15,.96)",
                        borderTop: "1px solid rgba(201,165,74,.35)",
                        display: "none",
                    }}
                >
                    <a
                        href="#enquiry"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            minHeight: "48px",
                            borderRadius: "6px",
                            background: "#c9a54a",
                            color: "#111",
                            textDecoration: "none",
                            fontWeight: 800,
                            letterSpacing: ".6px",
                        }}
                    >
                        REQUEST A CONSULTATION
                    </a>
                </div>
                <style>{`
          .crafman-extensions-page { scroll-behavior: smooth; }
          .crafman-extension-hero { background-size: 100% auto; animation: crafmanHeroDrift 22s ease-in-out infinite alternate; }
          .crafman-hero-copy { animation: crafmanHeroEnter 900ms cubic-bezier(.2,.7,.2,1) both; }
          .crafman-image-tile img { transition: transform 700ms cubic-bezier(.2,.7,.2,1); }
          .crafman-image-tile:hover img { transform: scale(1.055); }
          .crafman-image-tile figcaption { position: absolute; left: 0; right: 0; bottom: 0; padding: 34px 18px 17px; color: #fff; font-size: 14px; font-weight: 700; background: linear-gradient(transparent, rgba(0,0,0,.78)); }
          .crafman-type-card { transition: transform 260ms ease, border-color 260ms ease, background 260ms ease; position: relative; }
          .crafman-type-card:hover { transform: translateY(-6px); border-color: rgba(201,165,74,.8) !important; background: #222 !important; }
          .crafman-type-arrow { position: absolute; top: 22px; right: 20px; transition: transform 220ms ease; }
          .crafman-type-card:hover .crafman-type-arrow { transform: translate(3px,-3px); }
          .crafman-capability, .crafman-process-card { transition: transform 250ms ease, border-color 250ms ease; }
          .crafman-capability:hover, .crafman-process-card:hover { transform: translateY(-5px); border-color: rgba(201,165,74,.72) !important; }
          .crafman-hover-card { transition: transform 280ms ease, border-color 280ms ease, box-shadow 280ms ease, background 280ms ease; }
          .crafman-hover-card:hover { transform: translateY(-8px); border-color: rgba(201,165,74,.72) !important; box-shadow: 0 22px 48px rgba(0,0,0,.28); background: #202020 !important; }
          .crafman-stat { transition: transform 250ms ease; }
          .crafman-stat:hover { transform: translateX(6px); }
          .crafman-gold-cta, .crafman-outline-cta { transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease !important; }
          .crafman-gold-cta:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(201,165,74,.24); filter: brightness(1.08); }
          .crafman-outline-cta:hover { transform: translateY(-3px); border-color: #c9a54a !important; color: #c9a54a !important; }
          .crafman-faq { transition: border-color 220ms ease, background 220ms ease; }
          .crafman-faq:hover, .crafman-faq[open] { border-color: rgba(201,165,74,.65) !important; background: #27231b !important; }
          .crafman-faq summary { list-style: none; display: flex; justify-content: space-between; gap: 18px; align-items: center; }
          .crafman-faq summary::-webkit-details-marker { display: none; }
          .crafman-faq summary::after { content: '+'; color: #c9a54a; font-size: 24px; line-height: 1; transition: transform 220ms ease; }
          .crafman-faq[open] summary::after { content: '−'; transform: rotate(180deg); }
          .crafman-extensions-page.motion-ready .crafman-reveal { opacity: 0; transform: translateY(28px); transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.7,.2,1); }
          .crafman-extensions-page.motion-ready .crafman-reveal.is-visible { opacity: 1; transform: translateY(0); }
          @keyframes crafmanHeroEnter { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes crafmanHeroDrift { from { background-size: 100% auto; } to { background-size: 110% auto; } }
          @media (max-width: 760px) {
            .crafman-project-gallery { grid-template-columns: 1fr 1fr !important; }
            .crafman-project-gallery figure:first-child { grid-column: 1 / -1; }
            .crafman-project-gallery figure, .crafman-project-gallery img { min-height: 220px !important; }
            .crafman-type-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .crafman-capabilities { grid-template-columns: 1fr !important; gap: 28px !important; }
            .crafman-process-grid { grid-template-columns: 1fr !important; }
            .crafman-extension-hero { background-size: cover; animation: none; }
            .crafman-extensions-page.motion-ready .crafman-reveal { transform: translateY(18px); }
            .crafman-hover-card:hover { transform: none; }
          }
          @media (max-width: 420px) { .crafman-project-gallery { grid-template-columns: 1fr !important; } .crafman-project-gallery figure:first-child { grid-column: auto; } .crafman-type-grid, .crafman-capability-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (prefers-reduced-motion: reduce) {
            .crafman-extensions-page *, .crafman-extensions-page *::before, .crafman-extensions-page *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
            .crafman-extensions-page.motion-ready .crafman-reveal { opacity: 1; transform: none; }
          }
          @media (max-width: 760px) {
            .crafman-mobile-cta { display: block !important; }
            body { padding-bottom: 72px; }
          }
        `}</style>
            </main>
        </Layout>
    );
}
