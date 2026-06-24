import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Layout, { siteStyles } from "../components/DrawingsLayout.jsx";
import DrawingsPlanningForm from "../components/DrawingsPlanningForm.jsx";
import { Helmet } from "react-helmet-async";
import { Ruler, PencilRuler, FileCheck, PoundSterling, Zap, ShieldCheck } from "lucide-react";

export default function DrawingsPlanning() {
    const { section, card, buttonPrimary, buttonSecondary, tag } = siteStyles;

    const [selectedPackage, setSelectedPackage] = useState("");
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [openFaq, setOpenFaq] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [drawingIndex, setDrawingIndex] = useState(0);
    const [expandedPackage, setExpandedPackage] = useState(null);

    // --- Interactive Postcode Hook State ---
    const [postcode, setPostcode] = useState('');
    const [checkerStatus, setCheckerStatus] = useState('idle'); // idle, loading, success, error
    const [resolvedArea, setResolvedArea] = useState("");

    useLayoutEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        if (window.location.hash) {
            const cleanPath = window.location.pathname + window.location.search;
            window.history.replaceState(null, "", cleanPath);
        }
    }, []);

    useEffect(() => {
        const handlePageShow = () => {
            window.scrollTo(0, 0);
        };
        window.addEventListener("pageshow", handlePageShow);
        return () => window.removeEventListener("pageshow", handlePageShow);
    }, []);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const handlePostcodeCheck = async (e) => {
        e.preventDefault();

        // Clean spaces and standardize to uppercase
        const cleanPostcode = postcode.trim().toUpperCase().replace(/\s+/g, '');

        if (!cleanPostcode) {
            setCheckerStatus('error');
            return;
        }

        setCheckerStatus('loading');

        try {
            // Evaluate if user entered an outcode or full household postcode
            const isOutcode = cleanPostcode.length <= 4;
            const endpoint = isOutcode
                ? `https://api.postcodes.io/outcodes/${cleanPostcode}`
                : `https://api.postcodes.io/postcodes/${cleanPostcode}`;

            const response = await fetch(endpoint);

            if (!response.ok) {
                setCheckerStatus('error');
                return;
            }

            const data = await response.json();

            if (data.status === 200 && data.result) {
                let councilOrDistrict = "";
                let outcodeDisplay = isOutcode ? cleanPostcode : data.result.outcode;

                if (isOutcode) {
                    // Outcodes return arrays for governing districts
                    councilOrDistrict = data.result.admin_district && data.result.admin_district.length > 0
                        ? data.result.admin_district[0]
                        : cleanPostcode;
                } else {
                    // Full household lookup returns standalone string properties
                    councilOrDistrict = data.result.admin_district || data.result.parliamentary_constituency || outcodeDisplay;
                }

                // Strips out bureaucratic clutter to make text punchy on mobile cards
                const humanReadableArea = councilOrDistrict
                    .replace("London Borough of ", "")
                    .replace("Borough of ", "")
                    .replace("District", "")
                    .trim();

                // Store result into state: "Havering (RM1)" or "Barking and Dagenham (RM8)"
                setResolvedArea(`${humanReadableArea} (${outcodeDisplay})`);
                setCheckerStatus('success');

                // Push precise tracking event to your live Google Ads optimizer baseline
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: "postcode_check_success",
                    submitted_postcode: cleanPostcode,
                    resolved_council_hub: humanReadableArea
                });
            } else {
                setCheckerStatus('error');
            }
        } catch (error) {
            console.error("Postcode API lookup engine failed:", error);
            setCheckerStatus('error');
        }
    };

    const drawingImages = [
        { src: "/images/drawingsex14.png", label: "3D Render" },
        { src: "/images/drawingsex15.png", label: "3D Render" },
        { src: "/images/drawingex1.jpeg", label: "Elevations" },
        { src: "/images/drawingsex2.jpeg", label: "Elevations" },
        { src: "/images/drawingex3.jpeg", label: "Drainage" },
        { src: "/images/drawingsex4.jpeg", label: "Layouts" },
        { src: "/images/drawingsex5.jpeg", label: "Detailed Elevations" },
        { src: "/images/drawingsex6.jpeg", label: "Floor Plans" },
        { src: "/images/drawingsex7.jpeg", label: "Detailed Elevations" },
        { src: "/images/drawingsex8.jpeg", label: "Roof Plan" },
        { src: "/images/drawingsex9.jpeg", label: "Block Plan" },
        { src: "/images/drawingsex10.png", label: "Roof Plan" },
        { src: "/images/drawingsex11.png", label: "Elevation" },
        { src: "/images/drawingsex12.png", label: "Elevation" },
        { src: "/images/drawingsex13.png", label: "Floorplan" },
    ];

    const packages = [
        {
            name: "Starter Package",
            price: "From £949",
            bestFor: "Feasibility & Ideas",
            intro: "Ideal if you want to see what is structurally possible on your plot, sketch out early layout ideas, or check your options before committing.",
            includes: [
                "Measured survey",
                "Current scaled drawings",
                "Proposed scaled drawings",
                "Elevations",
            ],
        },
        {
            name: "Garden Room Package",
            price: "From £649",
            bestFor: "Standalone Studios & Gyms",
            intro: "Tailored for detached outbuildings, home offices, or garden gyms. We'll ensure your design maximizes your garden space while sticking strictly to Permitted Development rules.",
            includes: [
                "Measured survey",
                "Site location & boundary mapping",
                "Proposed scaled drawings",
                "Elevations",
                "Permitted Development compliance check",
            ],
        },
        {
            name: "Extension /  Loft Planning Package",
            price: "From £1149",
            bestFor: "Lofts & Extensions",
            intro: "Our most popular tier. Perfect if you know exactly what you want to build (rear extension, dormer loft) and need full Council approval.",
            includes: [
                "Measured survey",
                "Current scaled drawings",
                "Proposed scaled drawings",
                "Elevations",
                "Submission to council",
                "Planning guidance",
            ],
            featured: true,
        },
       
        
        {
            name: "Building Control Package",
            price: "From £649",
            bestFor: "Building Regs Approval",
            intro: "Ideal if you already have planning approval (or are building under Permitted Development) and need the detailed architectural drawings required to clear Building Regulations.",
            includes: [
                "Measured survey",
                "Current scaled drawings",
                "Proposed scaled drawings",
                "Detailed building regulations drawings",
                "Submission to Building Control",
                "Building regulations compliance guidance",
            ],
        },
        {
            name: "Layout Alteration Package",
            price: "From £549",
            bestFor: "Internal Remodeling & Open-Plan",
            intro: "Perfect if you are modifying your home's interior layout without extending the footprint. Ideal for wall removals, kitchen knock-throughs, or converting spaces.",
            includes: [
                "Measured survey",
                "Current floor plans",
                "Proposed internal layout options",
                "Structural opening indicators",
            ],
        },
        {
            name: "Bespoke Package",
            price: "POA",
            bestFor: "Large & Custom Builds",
            intro: "For major renovations, new-build properties, premium smart-homes, or multi-unit residential developments requiring custom design consultation.",
            includes: [
                "Everything in Technical Package",
                "Custom architectural concept design",
                "Premium 3D spatial rendering layouts",
                "Site feasibility & planning analysis",
                "Direct specialist project advisory",
                "Fast-tracked application compilation",
            ],
        },
    ];

    function handlePackageSelect(packageName) {
        setSelectedPackage(packageName);
    }

    function showNextDrawing() {
        setDrawingIndex((prev) => (prev + 1) % drawingImages.length);
    }

    function showPrevDrawing() {
        setDrawingIndex((prev) =>
            prev === 0 ? drawingImages.length - 1 : prev - 1
        );
    }

    const testimonials = [
        {
            name: "James R.",
            role: "Rear Extension Planning Drawings",
            text: "Crafman made the whole process straightforward. The drawings were clear, professional, and exactly what we needed to move ahead with our extension plans.",
        },
        {
            name: "Sophie M.",
            role: "Loft Conversion Drawings",
            text: "Really impressed with the communication and speed. They explained each step clearly and delivered a drawing package that gave us confidence to proceed.",
        },
        {
            name: "Daniel T.",
            role: "Planning Application Support",
            text: "We wanted a reliable service for our home project and Crafman delivered. The drawings looked great and the advice throughout the process was very helpful.",
        },
        {
            name: "Aisha K.",
            role: "Single Storey Extension Plans",
            text: "Professional, responsive, and easy to work with. Everything was laid out clearly and the drawings captured exactly what we discussed.",
        },
        {
            name: "Michael B.",
            role: "House Extension Drawings",
            text: "From the survey to the final plans, everything felt organised and well handled. It made a stressful part of the project much easier.",
        },
    ];

    const visibleTestimonials = isMobile
        ? [testimonials[testimonialIndex]]
        : [
            testimonials[testimonialIndex],
            testimonials[(testimonialIndex + 1) % testimonials.length],
            testimonials[(testimonialIndex + 2) % testimonials.length],
        ];

    function showPrevTestimonials() {
        setTestimonialIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    }

    function showNextTestimonials() {
        setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }

    const postcodeToArea = {
        // Romford / Havering / Dagenham
        RM1: "Romford", RM2: "Gidea Park", RM3: "Harold Wood", RM4: "Havering-atte-Bower",
        RM5: "Collier Row", RM6: "Chadwell Heath", RM7: "Rush Green", RM8: "Dagenham",
        RM9: "Dagenham", RM10: "Dagenham", RM11: "Hornchurch", RM12: "Hornchurch",
        RM13: "Rainham", RM14: "Upminster", RM15: "South Ockendon", RM16: "Chafford Hundred",
        RM17: "Grays", RM19: "Purfleet", RM20: "West Thurrock",
        // Ilford / Redbridge / Epping Forest
        IG1: "Ilford", IG2: "Gants Hill", IG3: "Seven Kings", IG4: "Redbridge",
        IG5: "Clayhall", IG6: "Barkingside", IG7: "Chigwell", IG8: "Woodford Green",
        IG9: "Buckhurst Hill", IG10: "Loughton", IG11: "Barking",
        // East London Core
        E1: "Whitechapel", E2: "Bethnal Green", E3: "Bow", E4: "Chingford",
        E5: "Clapton", E6: "East Ham", E7: "Forest Gate", E8: "Hackney",
        E9: "Homerton", E10: "Leyton", E11: "Leytonstone", E12: "Manor Park",
        E13: "Plaistow", E14: "Canary Wharf", E15: "Stratford", E16: "Canning Town",
        E17: "Walthamstow", E18: "South Woodford",
        // Brentwood & Basildon Regions
        CM13: "Brentwood", CM14: "Brentwood", CM15: "Shenfield",
        SS14: "Basildon", SS15: "Laindon",
        // Kent / South London Border (Cross-River Targets)
        DA1: "Dartford", DA5: "Bexley", DA8: "Erith", DA14: "Sidcup",
        DA15: "Blackfen", DA16: "Welling", SE9: "Eltham", SE10: "Greenwich",
        SE18: "Woolwich", SE28: "Thamesmead"
    };

    const drawingsSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "GeneralContractor",
                "@id": "https://www.crafman.co.uk/#organization",
                "name": "Crafman Design and Build",
                "legalName": "Crafman Building and Landscaping Ltd",
                "url": "https://www.crafman.co.uk",
                "image": "https://www.crafman.co.uk/images/drawings-hero.jpg",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Marsh Wy",
                    "addressLocality": "London",
                    "postalCode": "RM13 8EU",
                    "addressCountry": "GB"
                }
            },
            {
                "@type": "Service",
                "name": "Planning Drawings & Permission Support London & Essex",
                "description": "Professional measured surveys, planning drawings, and building control packages for London and Essex homeowners.",
                "provider": { "@id": "https://www.crafman.co.uk/#organization" },
                "areaServed": ["London", "Essex"],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Architectural Drawing Packages",
                    "itemListElement": packages.map(pkg => ({
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": pkg.name,
                            "description": pkg.intro
                        },
                        "priceSpecification": {
                            "@type": "PriceSpecification",
                            "price": pkg.price.replace(/[^0-9]/g, ''),
                            "priceCurrency": "GBP"
                        }
                    }))
                }
            },
            {
                "@type": "FAQPage",
                "@id": "https://www.crafman.co.uk/drawings-planning#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Do I need planning permission for an extension in London?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Many London extensions fall under Permitted Development, but larger projects require full planning permission. Crafman provides professional architectural drawings and handles the entire council submission process."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is included in a Crafman planning drawing package?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Crafman drawing packages include a comprehensive measured survey, existing and proposed scaled floor plans, elevations, sections, and full support for council planning submissions."
                        }
                    }
                ]
            }
        ]
    };

    return (
        <Layout>
            <Helmet>
                <title>Planning Drawings & Permission London | Crafman | London & Essex</title>
                <meta
                    name="description"
                    content="Professional planning drawings and permission support in London & Essex. Fixed-price packages for extensions, lofts, and renovations starting from £950."
                />
                <link rel="canonical" href="https://crafman.co.uk/drawings-planning" />

                <script>
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-PLFBQMWH');
                    `}
                </script>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(drawingsSchema) }}
                />
            </Helmet>

            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-PLFBQMWH"
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                />
            </noscript>

            <div
                style={{
                    width: "100%",
                    maxWidth: "100%",
                    overflowX: "hidden",
                    position: "relative",
                }}
            >
                <>
                    {/* --- HERO & POSTCODE INTERACTIVE CHECKER SECTION --- */}
                    <section
                        style={{
                            position: "relative",
                            borderBottom: "1px solid #2e2a24",
                            backgroundImage: "url('/images/backgroundDrawings.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            overflow: "hidden",
                            backgroundAttachment: !isMobile ? "fixed" : "scroll",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(135deg, rgba(15,15,14,0.92) 0%, rgba(24,24,22,0.85) 60%, rgba(15,15,14,0.9) 100%)",
                                zIndex: 1,
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                top: "-20%",
                                left: "15%",
                                width: isMobile ? "300px" : "600px",
                                height: isMobile ? "300px" : "600px",
                                borderRadius: "50%",
                                background: "radial-gradient(circle, rgba(198, 162, 67, 0.08) 0%, transparent 70%)",
                                filter: "blur(50px)",
                                pointerEvents: "none",
                                zIndex: 1,
                            }}
                        />
                        <div style={{ position: "relative", zIndex: 2 }}>
                            <div style={{ ...section, paddingTop: isMobile ? "60px" : "90px", paddingBottom: isMobile ? "60px" : "90px" }}>
                                <div
                                    style={{
                                        ...tag,
                                        background: "rgba(166, 124, 0, 0.15)",
                                        border: "1px solid rgba(166, 124, 0, 0.4)",
                                        color: "#E2BA6E",
                                        padding: "4px 12px",
                                        borderRadius: "6px",
                                        fontSize: "11px",
                                        fontWeight: "800",
                                        letterSpacing: "1.5px",
                                        textTransform: "uppercase",
                                        width: "fit-content",
                                        marginBottom: "16px"
                                    }}
                                >
                                    Drawings & Planning
                                </div>
                                <h1
                                    style={{
                                        fontSize: "clamp(34px, 5.5vw, 56px)",
                                        lineHeight: "1.1",
                                        margin: 0,
                                        maxWidth: "820px",
                                        color: "#ffffff",
                                        fontWeight: "900",
                                        letterSpacing: "-0.5px"
                                    }}
                                >
                                    Architectural drawings <br className="hidden md:inline" />designed for <span style={{ background: "linear-gradient(120deg, #E2BA6E 0%, #C6A243 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>council approval</span>
                                </h1>
                                <p
                                    style={{
                                        fontSize: "clamp(15px, 2.5vw, 18px)",
                                        lineHeight: "1.5",
                                        marginTop: "16px",
                                        marginBottom: 0,
                                        maxWidth: "600px",
                                        color: "#d6d3d1",
                                        fontWeight: "400",
                                    }}
                                >
                                    Clear guidance on what’s needed and the next steps for your project
                                </p>

                               

                                {/* --- CTA ACTION LINKS (Gated until Postcode Check Success) --- */}
                                {checkerStatus === 'success' && (
                                    <div
                                        style={{
                                            marginTop: "24px",
                                            display: "flex",
                                            gap: "14px",
                                            flexWrap: "wrap",
                                            animation: "faqFadeDown 0.3s ease-out"
                                        }}
                                    >
                                        <a
                                            href="#packages"
                                            style={{
                                                ...buttonPrimary,
                                                background: "linear-gradient(135deg, #A67C00 0%, #C6A243 100%)",
                                                color: "#fff",
                                                border: "none",
                                                fontWeight: "800"
                                            }}
                                        >
                                            View Packages
                                        </a>
                                        <a
                                            href="#contact-form"
                                            style={{
                                                ...buttonSecondary,
                                                background: "rgba(255, 255, 255, 0.05)",
                                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                                color: "#fff",
                                                fontWeight: "700"
                                            }}
                                        >
                                            Get Free Permission Strategy
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section
                        id="packages"
                        style={{
                            borderTop: "1px solid #e7e5e4",
                            borderBottom: "1px solid #e7e5e4",
                            background: "#fff",
                        }}
                    >
                        <div style={{ ...section, padding: isMobile ? "40px 16px" : "64px 20px" }}>
                            <div style={{ maxWidth: "760px", minWidth: 0, textAlign: isMobile ? "center" : "left" }}>
                                <div style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#78716c", fontWeight: "700" }}>Packages</div>
                                <h2 style={{ margin: "10px 0 8px", fontSize: isMobile ? "28px" : "42px", lineHeight: "1.1", color: "#1f1f1f", letterSpacing: "-0.5px" }}>Choose your project tier</h2>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))", gap: isMobile ? "16px" : "20px", marginTop: isMobile ? "24px" : "36px", alignItems: "stretch" }}>
                                {packages.map((pkg) => {
                                    const isSelected = selectedPackage === pkg.name;
                                    const isExpanded = expandedPackage === pkg.name || !isMobile;

                                    return (
                                        <div
                                            key={pkg.name}
                                            style={{
                                                ...card,
                                                minWidth: 0,
                                                position: "relative",
                                                background: pkg.featured ? "#1f1f1f" : "#fff",
                                                color: pkg.featured ? "#fff" : "#1f1f1f",
                                                border: pkg.featured ? "1px solid #1f1f1f" : "1px solid #e7e5e4",
                                                borderRadius: "24px",
                                                padding: isMobile ? "20px" : "26px",
                                                boxSizing: "border-box",
                                                boxShadow: pkg.featured ? "0 20px 40px rgba(28,25,23,0.14)" : "0 10px 24px rgba(28,25,23,0.04)",
                                                transform: !isMobile && pkg.featured ? "translateY(-8px)" : "none",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                                                    <div>
                                                        <span style={{
                                                            display: "inline-block",
                                                            padding: "2px 8px",
                                                            borderRadius: "6px",
                                                            background: pkg.featured ? "rgba(166, 124, 0, 0.2)" : "#f5f5f4",
                                                            color: pkg.featured ? "#C6A243" : "#57534e",
                                                            fontSize: "11px",
                                                            fontWeight: "700",
                                                            marginBottom: "6px",
                                                            textTransform: "uppercase"
                                                        }}>
                                                            Best for: {pkg.bestFor}
                                                        </span>
                                                        <h3 style={{ margin: 0, fontSize: isMobile ? "20px" : "24px", fontWeight: "800" }}>{pkg.name}</h3>
                                                    </div>
                                                    {pkg.featured && (
                                                        <span style={{ padding: "4px 10px", borderRadius: "999px", background: "#A67C00", color: "#fff", fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>Popular</span>
                                                    )}
                                                </div>

                                                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "12px" }}>
                                                    <span style={{ fontSize: isMobile ? "28px" : "36px", fontWeight: "900", color: pkg.featured ? "#fff" : "#1f1f1f" }}>{pkg.price}</span>
                                                    <span style={{ fontSize: "12px", color: pkg.featured ? "#a8a29e" : "#78716c" }}>fixed cost</span>
                                                </div>

                                                <p style={{ margin: "0 0 16px", fontSize: "14px", lineHeight: "1.5", color: pkg.featured ? "#d6d3d1" : "#57534e" }}>{pkg.intro}</p>

                                                {isMobile && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setExpandedPackage(isExpanded ? null : pkg.name);
                                                            if (!isExpanded) {
                                                                window.dataLayer = window.dataLayer || [];
                                                                window.dataLayer.push({
                                                                    event: "package_details_toggle",
                                                                    package_name: pkg.name,
                                                                    action: "expand",
                                                                    device: "mobile"
                                                                });
                                                            }
                                                        }}
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            width: "100%",
                                                            background: "none",
                                                            border: "none",
                                                            padding: "12px 0",
                                                            color: pkg.featured ? "#C6A243" : "#A67C00",
                                                            fontWeight: "700",
                                                            fontSize: "13px",
                                                            cursor: "pointer",
                                                            borderTop: pkg.featured ? "1px solid #2e2a24" : "1px solid #f5f5f4",
                                                        }}
                                                    >
                                                        <span>{isExpanded ? "Hide package details" : "Show package details"}</span>
                                                        <span style={{ fontSize: "16px", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
                                                    </button>
                                                )}

                                                <div
                                                    style={{
                                                        display: isExpanded ? "grid" : "none",
                                                        gap: "10px",
                                                        paddingTop: isMobile ? "8px" : "16px",
                                                        borderTop: !isMobile ? (pkg.featured ? "1px solid rgba(255,255,255,0.1)" : "1px solid #ece7df") : "none",
                                                        animation: isMobile ? "faqFadeDown 0.2s ease" : "none",
                                                    }}
                                                >
                                                    <div style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: pkg.featured ? "#a8a29e" : "#78716c", marginBottom: "4px" }}>Includes:</div>
                                                    {pkg.includes.map((item) => (
                                                        <div key={item} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px" }}>
                                                            <span style={{ color: pkg.featured ? "#C6A243" : "#A67C00", fontWeight: "900" }}>✓</span>
                                                            <span style={{ color: pkg.featured ? "#f5f5f4" : "#44403c" }}>{item}</span>
                                                        </div>
                                                    ))}
                                                    <div style={{ fontSize: "12px", color: pkg.featured ? "#a8a29e" : "#78716c", marginTop: "4px", fontStyle: "italic" }}>
                                                        ⏱ Turnaround: 7–10 working days
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ marginTop: "24px" }}>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        handlePackageSelect(pkg.name);

                                                        window.dataLayer = window.dataLayer || [];
                                                        window.dataLayer.push({
                                                            event: "package_button_click",
                                                            package_name: pkg.name,
                                                            package_price: pkg.price,
                                                            is_featured: pkg.featured ? "yes" : "no"
                                                        });

                                                        document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                                                    }}
                                                    style={{
                                                        width: "100%",
                                                        minHeight: "48px",
                                                        borderRadius: "14px",
                                                        border: "none",
                                                        background: isSelected ? "#A67C00" : (pkg.featured ? "#fff" : "#1f1f1f"),
                                                        color: isSelected ? "#fff" : (pkg.featured ? "#1f1f1f" : "#fff"),
                                                        fontSize: "14px",
                                                        fontWeight: "800",
                                                        cursor: "pointer",
                                                        boxShadow: isSelected ? "0 8px 20px rgba(166,124,0,0.2)" : "none",
                                                        transition: "all 0.2s",
                                                    }}
                                                >
                                                    {isSelected ? "Selected" : "Get More Info"}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* --- INTERACTIVE POSTCODE CHECKER UNIT --- */}
                    <div
                        style={{
                            maxWidth: "460px",
                            marginTop: "28px",
                            background: "rgba(255, 255, 255, 0.02)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "16px",
                            padding: "14px 16px",
                            boxSizing: "border-box",
                        }}
                    >
                        {checkerStatus !== 'success' ? (
                            <form onSubmit={handlePostcodeCheck} style={{ margin: 0, width: "100%" }}>
                                <label
                                    htmlFor="hero-postcode-search"
                                    style={{
                                        display: "block",
                                        fontSize: "11px",
                                        fontWeight: "700",
                                        color: "#a8a29e",
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                        marginBottom: "8px"
                                    }}
                                >
                                    Check Coverage & Council Compliance
                                </label>
                                <div style={{ display: "flex", gap: "8px" }}>
                                    <input
                                        id="hero-postcode-search"
                                        type="text"
                                        placeholder="Enter Postcode (e.g. RM1, IG7)"
                                        value={postcode}
                                        onChange={(e) => {
                                            setPostcode(e.target.value);
                                            if (checkerStatus === 'error') setCheckerStatus('idle');
                                        }}
                                        disabled={checkerStatus === 'loading'}
                                        style={{
                                            flex: 1,
                                            height: "42px",
                                            borderRadius: "10px",
                                            border: checkerStatus === 'error' ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.15)",
                                            background: "rgba(0, 0, 0, 0.3)",
                                            color: "#fff",
                                            padding: "0 12px",
                                            fontSize: "13px",
                                            outline: "none",
                                            textTransform: "uppercase"
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={checkerStatus === 'loading'}
                                        style={{
                                            height: "42px",
                                            padding: "0 16px",
                                            borderRadius: "10px",
                                            border: "none",
                                            background: "linear-gradient(135deg, #A67C00 0%, #C6A243 100%)",
                                            color: "#fff",
                                            fontSize: "13px",
                                            fontWeight: "800",
                                            cursor: "pointer",
                                            transition: "opacity 0.2s"
                                        }}
                                    >
                                        {checkerStatus === 'loading' ? 'Checking...' : 'Check Area'}
                                    </button>
                                </div>
                                {checkerStatus === 'error' && (
                                    <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#ef4444", fontWeight: "500" }}>
                                        Please enter your location postcode.
                                    </p>
                                )}
                            </form>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    animation: "faqFadeDown 0.25s ease-out"
                                }}
                            >
                                <div
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        borderRadius: "50%",
                                        background: "rgba(34, 197, 94, 0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#4ade80",
                                        fontWeight: "900",
                                        fontSize: "14px",
                                        flexShrink: 0
                                    }}
                                >
                                    ✓
                                </div>
                                <div>
                                    {/* Dynamically tracks and references your incoming live location text elements */}
                                    <p style={{ margin: 0, fontSize: "14px", fontWeight: "800", color: "#a8a29e" }}>
                                        Council District {resolvedArea || postcode.toUpperCase()} is Fully Covered
                                    </p>
                                    <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#a8a29e" }}>
                                        We have complete drawing and planning coverage in your local council hub.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div> 

                    {/* --- RISK-REVERSAL PROTECTION --- */}
                    <section
                        style={{
                            borderTop: "1px solid #e7e5e4",
                            borderBottom: "1px solid #e7e5e4",
                            background: "linear-gradient(180deg, #fdfbf7 0%, #fcf9f2 100%)",
                            padding: isMobile ? "48px 16px" : "64px 24px",
                            position: "relative",
                            overflow: "hidden"
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                bottom: "-30%",
                                right: "-10%",
                                width: "350px",
                                height: "350px",
                                borderRadius: "50%",
                                border: "2px dashed rgba(166, 124, 0, 0.06)",
                                pointerEvents: "none"
                            }}
                        />

                        <div style={{ maxWidth: "960px", margin: "0 auto", width: "100%" }}>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
                                    gap: isMobile ? "24px" : "40px",
                                    alignItems: "center",
                                    background: "#ffffff",
                                    padding: isMobile ? "28px 20px" : "40px 48px",
                                    borderRadius: "28px",
                                    border: "1px solid #eadfcb",
                                    boxShadow: "0 20px 40px rgba(166, 124, 0, 0.04)"
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: isMobile ? "0 auto" : "0" }}>
                                    <div
                                        style={{
                                            width: isMobile ? "80px" : "100px",
                                            height: isMobile ? "80px" : "100px",
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, #1f1f1f 0%, #121212 100%)",
                                            color: "#C6A243",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                                            border: "2px solid #A67C00"
                                        }}
                                    >
                                        <ShieldCheck size={isMobile ? 40 : 48} strokeWidth={2} />
                                    </div>
                                </div>

                                <div style={{ textAlign: isMobile ? "center" : "left" }}>
                                    <div style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#A67C00", fontWeight: "800", marginBottom: "8px" }}>
                                        Crafman Risk-Reversal Protection
                                    </div>

                                    <h2
                                        style={{
                                            margin: "0 0 12px 0",
                                            fontSize: isMobile ? "24px" : "32px",
                                            lineHeight: "1.15",
                                            fontWeight: "900",
                                            color: "#1c1917",
                                            letterSpacing: "-0.5px"
                                        }}
                                    >
                                        Our 100% Council Approval <br className="hidden sm:inline" />Money-Back Guarantee Scheme
                                    </h2>

                                    <p
                                        style={{
                                            margin: "0 0 20px 0",
                                            color: "#57534e",
                                            fontSize: isMobile ? "14px" : "15px",
                                            lineHeight: "1.6",
                                            maxWidth: "680px"
                                        }}
                                    >
                                        We handle London and Essex applications with complete regulatory certainty. If we accept your architectural project parameters, we guarantee your plans will pass council assessment. In the rare event that your application faces an absolute refusal that cannot be bypassed via free re-drafts, **we will issue a full 100% refund of your drawing package fee**.
                                    </p>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            justifyContent: isMobile ? "center" : "flex-start",
                                            gap: isMobile ? "12px" : "24px",
                                            fontSize: "13px",
                                            fontWeight: "700",
                                            color: "#1c1917",
                                            borderTop: "1px solid #f5f5f4",
                                            paddingTop: "16px"
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                            <span style={{ color: "#166534" }}>✓</span> Zero Financial Risk
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                            <span style={{ color: "#166534" }}>✓</span> Free Corrective Re-Drafts
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                            <span style={{ color: "#166534" }}>✓</span> Vetted Planning Experts
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- TRUST SIGNALS BADGES --- */}
                    <section
                        style={{
                            borderTop: "1px solid #e7e5e4",
                            borderBottom: "1px solid #e7e5e4",
                            background: "#fcfbf8",
                        }}
                    >
                        <div style={{ ...section, padding: isMobile ? "40px 16px" : "48px 20px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: isMobile ? "16px" : "24px", alignItems: "stretch" }}>
                                <div style={{ ...card, background: "#fff", border: "1px solid #e7e5e4", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.03)" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                                        <svg viewBox="0 0 24 24" width="22" height="22" style={{ marginRight: "2px" }}>
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span style={{ fontWeight: "800", color: "#1f1f1f", fontSize: "16px", letterSpacing: "-0.3px" }}>Google Rating</span>
                                    </div>
                                    <div style={{ color: "#f59e0b", fontSize: "18px", letterSpacing: "2px", marginBottom: "6px" }}>★★★★★</div>
                                    <div style={{ fontSize: "22px", fontWeight: "800", color: "#1f1f1f", lineHeight: "1.1" }}>4.9 / 5.0</div>
                                    <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#78716c", fontWeight: "500" }}>Verified Homeowner Feedback</p>
                                </div>

                                <div style={{ ...card, background: "#fff", border: "1px solid #e7e5e4", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.03)" }}>
                                    <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#16a34a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", boxShadow: "0 4px 12px rgba(22,163,74,0.15)" }}>
                                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            <path d="M9 11l2 2 4-4" />
                                        </svg>
                                    </div>
                                    <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "800", color: "#1f1f1f", lineHeight: "1.2" }}>TrustMark Government Endorsed</h3>
                                    <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#57534e", lineHeight: "1.4" }}>Government-endorsed quality standard for absolute technical compliance.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </>

                

                <section style={{ background: "#fcfbf8", padding: "32px 16px", borderBottom: "1px solid #e7e5e4" }}>
                    <div style={{ ...section, maxWidth: "800px", margin: "0 auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "20px" }}>
                            {[
                                { step: "01", title: "Free Consultation", desc: "We map out layout viable options and real-time costs." },
                                { step: "02", title: "Measured Survey & Draft", desc: "Millimeter-accurate mapping of your existing space." },
                                { step: "03", title: "Council Submission", desc: "We manage the entire backend application package for you." }
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

                <section
                    style={{
                        borderTop: "1px solid #e7e5e4",
                        borderBottom: "1px solid #e7e5e4",
                        background: "#fff",
                        overflow: "hidden",
                    }}
                >
                    <div style={{ ...section, padding: isMobile ? "32px 16px" : "64px 20px" }}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr",
                                gap: isMobile ? "20px" : "48px",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <div style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#78716c", fontWeight: "700" }}>
                                    Free Consultation
                                </div>
                                <h2
                                    style={{
                                        fontSize: isMobile ? "26px" : "40px",
                                        marginTop: "6px",
                                        marginBottom: "12px",
                                        lineHeight: "1.15",
                                        color: "#1f1f1f",
                                        letterSpacing: "-0.5px",
                                    }}
                                >
                                    Complete <span style={{ color: "#A67C00" }}>project visibility</span> before you spend a penny
                                </h2>
                                <p style={{ color: "#44403c", fontSize: "14px", lineHeight: "1.5", margin: "0 0 20px 0", fontWeight: "500" }}>
                                    Get a clear roadmap for your home based on real-time London build costs and strict council guidelines—completely free.
                                </p>
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gap: "16px",
                                    background: "#fcfbf8",
                                    padding: isMobile ? "16px" : "24px",
                                    borderRadius: "20px",
                                    border: "1px solid #e7e5e4"
                                }}
                            >
                                {[
                                    { title: "Planning Strategy", desc: "Full permission vs. Permitted Development tracking." },
                                    { title: "Sizes & Layouts", desc: "A structural reality check of your layout goals." },
                                    { title: "Real Build Costs", desc: "Accurate budgets based on fluid local material & trade costs." },
                                    { title: "Property Value Return", desc: "An honest look at how your new floor area impacts market equity." }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            gap: "12px",
                                            alignItems: "flex-start",
                                            paddingTop: index !== 0 ? (isMobile ? "10px" : "12px") : "0",
                                            borderTop: index !== 0 ? "1px solid #e7e5e4" : "none"
                                        }}
                                    >
                                        <span style={{ color: "#A67C00", fontWeight: "800", fontSize: "14px", lineHeight: "1" }}>✓</span>
                                        <div>
                                            <h4 style={{ margin: "0 0 2px 0", fontSize: "14px", fontWeight: "700", color: "#1c1917" }}>{item.title}</h4>
                                            <p style={{ margin: 0, fontSize: "13px", color: "#6b6661", lineHeight: "1.4" }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

               

                <section
                    id="contact-form"
                    style={{
                        borderTop: "1px solid #e7e5e4",
                        background: "#efebe6",
                    }}
                >
                    <div
                        style={{
                            maxWidth: "680px",
                            margin: "0 auto",
                            padding: isMobile ? "48px 16px" : "70px 24px",
                            display: "grid",
                            gap: "24px",
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ textAlign: "center", minWidth: 0 }}>
                            <div
                                style={{
                                    fontSize: "12px",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    color: "#78716c",
                                    fontWeight: "700",
                                }}
                            >
                             
                            </div>

                        

                            <p style={{ margin: "0 0 12px", color: "#57534e", fontSize: "14px", fontWeight: "500" }}>
                                No annoying sales calls. Just straight answers, clear advice, and zero pressure from our layout specialists.
                            </p>

                            {selectedPackage && (
                                <div
                                    style={{
                                        marginTop: "8px",
                                        marginBottom: "16px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "10px 14px",
                                        borderRadius: "999px",
                                        background: "#1f1f1f",
                                        color: "#fff",
                                        fontWeight: "700",
                                        maxWidth: "100%",
                                        flexWrap: "wrap",
                                        lineHeight: "1.5",
                                    }}
                                >
                                    <span>Selected: {selectedPackage}</span>
                                    <span style={{ opacity: 0.7 }}>•</span>
                                    <span>
                                        {packages.find((p) => p.name === selectedPackage)?.price}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div style={{ minWidth: 0 }}>
                            <DrawingsPlanningForm
                                endpoint="https://formspree.io/f/maqlqgzz"
                                selectedPackage={selectedPackage}
                            />
                        </div>
                    </div>
                </section>

                <section
                    style={{
                        borderTop: "1px solid #e7e5e4",
                        borderBottom: "1px solid #e7e5e4",
                        background: "#fff",
                    }}
                >
                    <div
                        style={{
                            ...section,
                            padding: isMobile ? "48px 16px" : undefined,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "end",
                                gap: "20px",
                                flexWrap: "wrap",
                            }}
                        >
                            <div style={{ maxWidth: "760px", minWidth: 0 }}>
                                <div
                                    style={{
                                        fontSize: "12px",
                                        letterSpacing: "2px",
                                        textTransform: "uppercase",
                                        color: "#78716c",
                                        fontWeight: "700",
                                    }}
                                >
                                    Testimonials
                                </div>

                                <h2
                                    style={{
                                        fontSize: isMobile ? "30px" : "40px",
                                        marginTop: "12px",
                                        marginBottom: "12px",
                                        color: "#A67C00",
                                        lineHeight: "1.08",
                                    }}
                                >
                                    What clients say about working with us
                                </h2>

                                <p
                                    style={{
                                        color: "#57534e",
                                        lineHeight: "1.8",
                                        margin: 0,
                                        fontSize: isMobile ? "15px" : "16px",
                                    }}
                                >
                                    Clear communication, practical advice, and drawing packages
                                    designed to help projects move forward with confidence.
                                </p>
                            </div>

                            <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                                <button
                                    type="button"
                                    onClick={showPrevTestimonials}
                                    aria-label="Previous testimonials"
                                    style={{
                                        height: "44px",
                                        width: "44px",
                                        borderRadius: "999px",
                                        border: "1px solid #d6d3d1",
                                        background: "#fff",
                                        cursor: "pointer",
                                        fontSize: "18px",
                                    }}
                                >
                                    ←
                                </button>

                                <button
                                    type="button"
                                    onClick={showNextTestimonials}
                                    aria-label="Next testimonials"
                                    style={{
                                        height: "44px",
                                        width: "44px",
                                        borderRadius: "999px",
                                        border: "1px solid #1c1917",
                                        background: "#1c1917",
                                        color: "#fff",
                                        cursor: "pointer",
                                        fontSize: "18px",
                                    }}
                                >
                                    →
                                </button>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile
                                    ? "1fr"
                                    : "repeat(auto-fit, minmax(260px, 1fr))",
                                gap: "20px",
                                marginTop: "30px",
                            }}
                        >
                            {visibleTestimonials.map((item, index) => (
                                <div
                                    key={`${item.name}-${index}`}
                                    style={{
                                        ...card,
                                        minWidth: 0,
                                        borderRadius: "22px",
                                        border: "1px solid #e7e5e4",
                                        boxShadow: "0 12px 26px rgba(28,25,23,0.05)",
                                    }}
                                >
                                    <div
                                        style={{
                                            marginBottom: "10px",
                                            color: "#f59e0b",
                                            fontSize: "18px",
                                            letterSpacing: "1px",
                                        }}
                                    >
                                        ★★★★★
                                    </div>

                                    <p
                                        style={{
                                            color: "#57534e",
                                            lineHeight: "1.8",
                                            marginTop: 0,
                                            marginBottom: "16px",
                                            fontSize: isMobile ? "15px" : "16px",
                                        }}
                                    >
                                        “{item.text}”
                                    </p>

                                    <div style={{ fontWeight: "700", color: "#1f1f1f" }}>
                                        {item.name}
                                    </div>
                                    <div style={{ color: "#78716c", fontSize: "14px" }}>
                                        {item.role}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "8px",
                                marginTop: "22px",
                                flexWrap: "wrap",
                            }}
                        >
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setTestimonialIndex(i)}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                    style={{
                                        width: i === testimonialIndex ? "24px" : "10px",
                                        height: "10px",
                                        borderRadius: "999px",
                                        border: "none",
                                        cursor: "pointer",
                                        background: i === testimonialIndex ? "#1c1917" : "#d6d3d1",
                                        padding: 0,
                                        transition: "all 0.22s ease",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    style={{
                        borderTop: "1px solid #e7e5e4",
                        borderBottom: "1px solid #e7e5e4",
                        background: "#fcfbf8",
                        overflow: "hidden",
                    }}
                >
                    <div style={{ ...section, padding: isMobile ? "40px 16px" : "64px 20px" }}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr",
                                gap: isMobile ? "24px" : "48px",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <div style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#78716c", fontWeight: "700" }}>
                                    The Crafman Difference
                                </div>
                                <h2
                                    style={{
                                        fontSize: isMobile ? "30px" : "40px",
                                        marginTop: "10px",
                                        marginBottom: "14px",
                                        lineHeight: "1.1",
                                        color: "#1f1f1f",
                                        letterSpacing: "-0.5px",
                                    }}
                                >
                                    We handle the drawings. <br />We also <span style={{ color: "#A67C00" }}>build the project.</span>
                                </h2>
                                <p style={{ color: "#44403c", fontSize: "15px", lineHeight: "1.6", margin: 0, fontWeight: "500" }}>
                                    Crafman is a fully integrated **Design & Build** contractor. We don’t just hand over drawings and walk away—our in-house team of master builders handles your entire project from first sketch to final brickwork.
                                </p>
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gap: "14px",
                                    background: "#fff",
                                    padding: isMobile ? "20px" : "24px",
                                    borderRadius: "20px",
                                    border: "1px solid #e7e5e4",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.02)"
                                }}
                            >
                                {[
                                    { title: "One Point of Contact", desc: "No friction or blame-shifting between architect and builder." },
                                    { title: "Budget-Aware Design", desc: "Drawings are optimized for real-world build costs from day one." },
                                    { title: "Full Project Delivery", desc: "From surveys and planning to structural engineering and construction." }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            paddingTop: index !== 0 ? "12px" : "0",
                                            borderTop: index !== 0 ? "1px solid #f5f5f4" : "none",
                                            display: "flex",
                                            gap: "12px",
                                        }}
                                    >
                                        <span style={{ color: "#A67C00", fontWeight: "800", fontSize: "14px" }}>✓</span>
                                        <div>
                                            <h4 style={{ margin: "0 0 2px 0", fontSize: "14px", fontWeight: "700", color: "#1c1917" }}>{item.title}</h4>
                                            <p style={{ margin: 0, fontSize: "13px", color: "#6b6661", lineHeight: "1.4" }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    style={{
                        borderTop: "1px solid #e7e5e4",
                        borderBottom: "1px solid #e7e5e4",
                        background: "linear-gradient(180deg, #ffffff 0%, #f8f5ef 100%)",
                    }}
                >
                    <div style={section}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile
                                    ? "1fr"
                                    : "minmax(280px, 0.9fr) minmax(320px, 1.1fr)",
                                gap: "36px",
                                alignItems: "start",
                            }}
                        >
                            <div
                                style={{
                                    position: isMobile ? "relative" : "sticky",
                                    top: isMobile ? "auto" : "110px",
                                    ...card,
                                    background: "#1f1f1f",
                                    color: "#fff",
                                    border: "1px solid #1f1f1f",
                                    minWidth: 0,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "12px",
                                        letterSpacing: "2px",
                                        textTransform: "uppercase",
                                        color: "#d6d3d1",
                                        fontWeight: "700",
                                    }}
                                >
                                    Frequently Asked Questions
                                </div>

                                <h2
                                    style={{
                                        fontSize: "42px",
                                        marginTop: "12px",
                                        marginBottom: "14px",
                                        lineHeight: "1.08",
                                    }}
                                >
                                    Drawings, planning permission and permitted development FAQs
                                </h2>

                                <p
                                    style={{
                                        color: "#f5f5f4",
                                        lineHeight: "1.85",
                                        marginBottom: "18px",
                                    }}
                                >
                                    A few common questions clients ask before starting drawings,
                                    planning, or technical packages.
                                </p>

                                <div style={{ display: "grid", gap: "10px" }}>
                                    {[
                                        "Planning permission guidance",
                                        "Permitted development support",
                                        "Package and drawing clarity",
                                        "Make a change",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            style={{
                                                padding: "10px 14px",
                                                borderRadius: "999px",
                                                border: "1px solid rgba(255,255,255,0.12)",
                                                background: "rgba(255,255,255,0.06)",
                                                color: "#fff",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                width: "fit-content",
                                                maxWidth: "100%",
                                            }}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: "grid", gap: "14px", minWidth: 0 }}>
                                {[
                                    {
                                        number: "01",
                                        title: "Do I need planning permission for an extension?",
                                        text: "Some extensions need planning permission, while others may fall under permitted development. This depends on the size, design, location, and type of property involved.",
                                    },
                                    {
                                        number: "02",
                                        title: "What is permitted development?",
                                        text: "Permitted development allows certain works to be carried out without a full planning application, as long as the project stays within the relevant limits and conditions.",
                                    },
                                    {
                                        number: "03",
                                        title: "Do loft conversions always need planning permission?",
                                        text: "Not always. Some loft conversions can fall under permitted development, but others may need planning permission depending on the roof changes, design, property type, and local restrictions.",
                                    },
                                    {
                                        number: "04",
                                        title: "Does internal reconfiguration need planning permission?",
                                        text: "Internal reconfiguration often does not need planning permission, but it may still require building control input, structural design, or other technical drawings depending on the works involved.",
                                    },
                                    {
                                        number: "05",
                                        title: "What types of projects can you prepare drawings for?",
                                        text: "We can prepare drawings for rear extensions, side return extensions, wraparound extensions, loft conversions, and internal layout changes, as well as other residential improvement works.",
                                    },
                                    {
                                        number: "06",
                                        title: "What drawings are included in your packages?",
                                        text: "Depending on the package, drawings can include a measured survey, current scaled drawings, proposed scaled drawings, elevations, 3D rendering on request, council submission support, and building control drawings.",
                                    },
                                    {
                                        number: "07",
                                        title: "What is the difference between planning drawings and building control drawings?",
                                        text: "Planning drawings are usually prepared to support a planning application or show the design proposal clearly. Building control drawings go further into technical detail for compliance and construction requirements.",
                                    },
                                    {
                                        number: "08",
                                        title: "Can you submit drawings to the council for me?",
                                        text: "Yes. Our planning package and technical package can include submission to the council, depending on the level of support you need.",
                                    },
                                    {
                                        number: "09",
                                        title: "Do I need a measured survey before drawings are prepared?",
                                        text: "In most cases, yes. A measured survey helps create an accurate base for the existing and proposed drawings, which is important for both planning and technical accuracy.",
                                    },
                                    {
                                        number: "10",
                                        title: "Can you advise whether my project is likely to fall under permitted development?",
                                        text: "We can help review the type of project you are planning and guide you on whether it may fall under permitted development or is more likely to need a planning application.",
                                    },
                                ].map((item, index) => {
                                    const isOpen = openFaq === index;

                                    return (
                                        <div
                                            key={item.number}
                                            style={{
                                                ...card,
                                                padding: "0",
                                                overflow: "hidden",
                                                border: "1px solid #e7e5e4",
                                                background: isOpen ? "#fff" : index % 2 === 0 ? "#fff" : "#fcfbf8",
                                                boxShadow: isOpen
                                                    ? "0 16px 34px rgba(0,0,0,0.07)"
                                                    : "0 8px 24px rgba(0,0,0,0.04)",
                                                transition: "all 0.25s ease",
                                                minWidth: 0,
                                            }}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setOpenFaq((prev) => (prev === index ? -1 : index))}
                                                style={{
                                                    width: "100%",
                                                    border: "none",
                                                    background: "transparent",
                                                    padding: 0,
                                                    cursor: "pointer",
                                                    textAlign: "left",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "grid",
                                                        gridTemplateColumns: isMobile
                                                            ? "56px 1fr 40px"
                                                            : "72px 1fr auto",
                                                        alignItems: "center",
                                                        minWidth: 0,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            background: isOpen || index % 3 === 1 ? "#A67C00" : "#1f1f1f",
                                                            color: "#fff",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontWeight: "800",
                                                            fontSize: isMobile ? "16px" : "18px",
                                                            letterSpacing: "1px",
                                                            minHeight: "100%",
                                                            padding: "24px 0",
                                                        }}
                                                    >
                                                        {item.number}
                                                    </div>

                                                    <div style={{ padding: isMobile ? "18px 16px" : "22px 24px", minWidth: 0 }}>
                                                        <h3
                                                            style={{
                                                                margin: 0,
                                                                fontSize: isMobile ? "18px" : "22px",
                                                                lineHeight: "1.35",
                                                                color: "#1f1f1f",
                                                                wordBreak: "break-word",
                                                            }}
                                                        >
                                                            {item.title}
                                                        </h3>
                                                    </div>

                                                    <div style={{ paddingRight: isMobile ? "16px" : "22px", fontSize: "20px", fontWeight: "700", color: "#78716c" }}>
                                                        {isOpen ? "−" : "+"}
                                                    </div>
                                                </div>
                                            </button>

                                            {isOpen && (
                                                <div
                                                    style={{
                                                        padding: isMobile ? "0 16px 20px 16px" : "0 24px 24px 96px",
                                                        color: "#57534e",
                                                        lineHeight: "1.85",
                                                        animation: "faqFadeDown 0.22s ease",
                                                    }}
                                                >
                                                    {item.text}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                <div style={{ padding: "20px 22px", borderRadius: "18px", background: "#fff", border: "1px solid #e7e5e4", boxShadow: "0 8px 24px rgba(0,0,0,0.04)" }}>
                                    <div style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#78716c", fontWeight: "700", marginBottom: "10px" }}>
                                        Still unsure?
                                    </div>
                                    <p style={{ margin: 0, color: "#57534e", lineHeight: "1.85" }}>
                                        If you are not sure which route your project falls under, the enquiry form is the best place to start. We can review the project type, package level, and likely next step with you.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <style>
                            {`
                                @keyframes faqFadeDown {
                                    0% { opacity: 0; transform: translateY(-6px); }
                                    100% { opacity: 1; transform: translateY(0); }
                                }
                                html, body { width: 100%; max-width: 100%; overflow-x: hidden; }
                                * { box-sizing: border-box; }
                                img { max-width: 100%; }
                            `}
                        </style>
                    </div>
                </section>
            </div>

            <footer
                style={{
                    borderTop: "1px solid #e7e5e4",
                    background: "#1f1f1f",
                    color: "#d6d3d1",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        ...section,
                        padding: isMobile ? "40px 16px 24px 16px" : "60px 20px 30px 20px",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr",
                            gap: isMobile ? "32px" : "40px",
                            paddingBottom: "30px",
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                            alignItems: "start",
                        }}
                    >
                        <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff", marginBottom: "12px", letterSpacing: "-0.3px" }}>
                                Crafman <span style={{ color: "#C6A243", fontWeight: "400" }}>Architectural</span>
                            </div>
                            <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#a8a29e", lineHeight: "1.5", maxWidth: "320px" }}>
                                Professional architectural drawing packages and premium full-lifecycle residential construction across London & Essex.
                            </p>
                            <div style={{ fontSize: "13px", lineHeight: "1.6", color: "#78716c" }}>
                                <strong style={{ color: "#fff", display: "block", marginBottom: "2px" }}>Registered Office:</strong>
                                Crafman Building and Landscaping Ltd<br />
                                Marsh Wy, Rainham<br />
                                RM13 8EU
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "#fff", marginBottom: "14px" }}>
                                Services
                            </div>
                            <div style={{ display: "grid", gap: "10px", fontSize: "14px" }}>
                                <a href="#packages" style={{ color: "#a8a29e", textDecoration: "none" }}>Drawing Packages</a>
                                <a href="#contact-form" style={{ color: "#a8a29e", textDecoration: "none" }}>Get a Quote</a>
                                <a href="#packages" style={{ color: "#a8a29e", textDecoration: "none" }}>Design & Build Support</a>
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "#fff", marginBottom: "14px" }}>
                                Contact
                            </div>
                            <div style={{ display: "grid", gap: "10px", fontSize: "14px" }}>
                                <a href="tel:02036335634" style={{ color: "#C6A243", textDecoration: "none", fontWeight: "700" }}>
                                    0203 633 5634
                                </a>
                                <span style={{ color: "#a8a29e" }}>Mon – Fri: 8am – 6pm</span>
                                <span style={{ color: "#78716c", fontSize: "12px" }}>Promo Code: CRAF100</span>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            paddingTop: "20px",
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            justifyContent: "space-between",
                            alignItems: isMobile ? "flex-start" : "center",
                            gap: "12px",
                            fontSize: "12px",
                            color: "#78716c",
                        }}
                    >
                        <div>
                            © {new Date().getFullYear()} Crafman Building and Landscaping Ltd. All rights reserved.
                        </div>
                        <div style={{ display: "flex", gap: "16px" }}>
                            <span>Company No. Reg in UK</span>
                            <span>Vetted Master Builder</span>
                        </div>
                    </div>
                </div>
            </footer>
        </Layout>
    );
}