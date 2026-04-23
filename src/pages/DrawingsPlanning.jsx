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

    const hasForcedTopRef = useRef(false);

    useLayoutEffect(() => {
        const cleanUrl = () => {
            const cleanPath = window.location.pathname + window.location.search;

            if (window.location.hash) {
                window.history.replaceState(null, "", cleanPath);
            }
        };

        const forceTop = () => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };

        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        cleanUrl();
        forceTop();

        requestAnimationFrame(() => {
            cleanUrl();
            forceTop();

            requestAnimationFrame(() => {
                cleanUrl();
                forceTop();
            });
        });
    }, []);

    useEffect(() => {
        if (hasForcedTopRef.current) return;
        hasForcedTopRef.current = true;

        const cleanUrl = () => {
            const cleanPath = window.location.pathname + window.location.search;

            if (window.location.hash) {
                window.history.replaceState(null, "", cleanPath);
            }
        };

        const forceTop = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto",
            });

            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };

        cleanUrl();
        forceTop();

        const timers = [
            setTimeout(() => {
                cleanUrl();
                forceTop();
            }, 50),
            setTimeout(() => {
                cleanUrl();
                forceTop();
            }, 150),
            setTimeout(() => {
                cleanUrl();
                forceTop();
            }, 350),
            setTimeout(() => {
                cleanUrl();
                forceTop();
            }, 700),
        ];

        const handlePageShow = () => {
            cleanUrl();
            forceTop();
        };

        window.addEventListener("pageshow", handlePageShow);

        return () => {
            timers.forEach(clearTimeout);
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, []);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const drawingImages = [
        { src: "/images/drawingex1.jpeg", label: "Elevations" },
        { src: "/images/drawingsex2.jpeg", label: "Elevations" },
        { src: "/images/drawingex3.jpeg", label: "Drainage" },
        { src: "/images/drawingsex4.jpeg", label: "Layouts" },
        { src: "/images/drawingsex5.jpeg", label: "Detailed Elevations" },
        { src: "/images/drawingsex6.jpeg", label: "Floor Plans" },
        { src: "/images/drawingsex7.jpeg", label: "Detailed Elevations" },
        { src: "/images/drawingsex8.jpeg", label: "Roof Plan" },
        { src: "/images/drawingsex9.jpeg", label: "Block Plan" },
    ];

    const packages = [
        {
            name: "Starter Package",
            price: "From £950",
            intro: "A practical starting point for simple projects and early-stage ideas.",
            includes: [
                "Measured survey",
                "Current scaled drawings",
                "Proposed scaled drawings",
                "Elevations",
            ],
        },
        {
            name: "Planning Package",
            price: "From £1250",
            intro: "Our most popular option for projects that need planning drawings and guidance.",
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
            name: "Technical Package",
            price: "From £2150",
            intro: "A fuller package for projects moving into technical design and build preparation.",
            includes: [
                "Measured survey",
                "Current scaled drawings",
                "Proposed scaled drawings",
                "Elevations",
                "Submission to council",
                "Building control drawings",
                "Structural calculations",
            ],
        },
    ];

    const trustStats = [
        {
            value: "500+",
            label: "Drawings Prepared",
            accent: "#A67C00",
            progress: 88,
            eyebrow: "Project volume",
            title: "Hundreds of drawing packages delivered",
            text: "From extensions and loft conversions to internal reconfigurations, we’ve prepared drawing packages across a wide range of residential projects.",
            button: "View Packages",
            href: "#packages",
        },
        {
            value: "40+",
            label: "Different Councils",
            accent: "#A67C00",
            progress: 74,
            eyebrow: "Planning coverage",
            title: "Experience across different local authorities",
            text: "Working across a wide range of councils helps us prepare clearer applications and support clients with a more informed approach from the start.",
            button: "Request a Quote",
            href: "#contact-form",
        },
        {
            value: "300+",
            label: "Customers",
            accent: "#1f1f1f",
            progress: 81,
            eyebrow: "Client trust",
            title: "Chosen by homeowners across London",
            text: "Clients come to us for straightforward advice, practical layouts, and a process that feels clear from survey through to submission.",
            button: "Request a Quote",
            href: "#contact-form",
        },
        {
            value: "4.9",
            label: "Avg. Client Rating",
            accent: "#16a34a",
            progress: 96,
            eyebrow: "Client feedback",
            title: "Strong feedback built on consistency",
            text: "High ratings reflect clear communication, reliable turnaround, and drawing packages that help projects move forward with confidence.",
            button: "See Reviews",
            href: "#testimonials",
        },
    ];

    function handlePackageSelect(packageName) {
        setSelectedPackage(packageName);
    }

    function showPrevDrawing() {
        setDrawingIndex((prev) =>
            prev === 0 ? drawingImages.length - 1 : prev - 1
        );
    }

    function showNextDrawing() {
        setDrawingIndex((prev) => (prev + 1) % drawingImages.length);
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

    const drawingsSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Planning Drawings & Permission Support London",
    "description": "Professional measured surveys, planning drawings, and building control packages for London and Essex homeowners.",
    "provider": {
      "@type": "GeneralContractor",
      "name": "Crafman Design and Build",
      "url": "https://crafman.co.uk"
    },
    "areaServed": ["London", "Essex"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Drawing Packages",
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
    },
    // FAQ Schema to win Answer Engine results
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need planning permission for an extension?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Some extensions need planning permission, while others fall under permitted development depending on size, design, and property type."
        }
      },
      {
        "@type": "Question",
        "name": "What is included in a planning drawing package?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our packages typically include a measured survey, current scaled drawings, proposed scaled drawings, elevations, and council submission support."
        }
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
    
    {/* AI Data Inversion */}
    <script type="application/ld+json">
        {JSON.stringify(drawingsSchema)}
    </script>
</Helmet>
            <div
                style={{
                    width: "100%",
                    maxWidth: "100%",
                    overflowX: "hidden",
                    position: "relative",
                }}
            >
                <section
                    style={{
                        position: "relative",
                        borderBottom: "1px solid #e7e5e4",
                        backgroundImage: "url('/images/backgroundDrawings.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        overflow: "hidden",
                    }}
                >
                    {/* 🔥 Blur / gradient overlay */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(135deg, rgba(241,237,231,0.88), rgba(255,255,255,0.85), rgba(234,229,221,0.88))",
                            zIndex: 1,
                        }}
                    />

                    {/* 🔥 Content (above blur) */}
                    <div style={{ position: "relative", zIndex: 2 }}>
                        <div style={{ ...section, paddingTop: "90px", paddingBottom: "90px" }}>
                            <div style={tag}>Drawings & Planning</div>

                            <h1
                                style={{
                                    fontSize: "clamp(38px, 6vw, 62px)",
                                    lineHeight: "1.05",
                                    margin: 0,
                                    maxWidth: "820px",
                                    color: "#A67C00",
                                }}
                            >
                                Planning drawings designed for approval
                            </h1>

                            <h1
                                style={{
                                    fontSize: "clamp(10px, 3vw, 20px)",
                                    lineHeight: "1.2",
                                    marginTop: "12px",
                                    maxWidth: "820px",
                                    color: "#44403c",
                                    fontWeight: "500",
                                }}
                            >
                                Clear guidance on what’s needed and the next steps for your
                                project
                            </h1>

                            <div
                                style={{
                                    marginTop: "30px",
                                    display: "flex",
                                    gap: "14px",
                                    flexWrap: "wrap",
                                }}
                            >
                                <a href="#packages" style={buttonPrimary}>
                                    View Packages
                                </a>
                                <a href="#contact-form" style={buttonSecondary}>
                                    Get Free Permission Strategy
                                </a>
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: "0px",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: isMobile ? "10px" : "12px",
                                justifyContent: "center",
                                paddingBottom: "40px",
                            }}
                        >
                            {[
                                "Planning-ready drawings",
                                "Guidance included",
                                "Clear next steps",
                            ].map((item) => (
                                <div
                                    key={item}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "8px 12px",
                                        borderRadius: "999px",
                                        background: "rgba(255,255,255,0.55)",
                                        border: "1px solid #d6d3d1",
                                        color: "#44403c",
                                        fontSize: isMobile ? "13px" : "14px",
                                        fontWeight: "600",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                            minWidth: "18px",
                                            borderRadius: "999px",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "#A67C00",
                                            color: "#fff",
                                            fontSize: "11px",
                                            fontWeight: "800",
                                            boxShadow:
                                                "0 4px 10px rgba(166,124,0,0.18)",
                                        }}
                                    >
                                        ✓
                                    </span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                <section style={section}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
                            gap: "18px",
                            maxWidth: "820px",
                        }}
                    >
                        {[
                            {
                                title: "Extensions",
                                text: "Rear, side return and wraparound layouts.",
                                icon: (
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M3 21h18" />
                                        <path d="M6 21V8l6-4 6 4v13" />
                                        <path d="M9 21v-6h6v6" />
                                    </svg>
                                ),
                            },
                            {
                                title: "Loft Conversions",
                                text: "Dormer, hip-to-gable and mansard schemes.",
                                icon: (
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M3 11.5 12 4l9 7.5" />
                                        <path d="M5 10.5V20h14v-9.5" />
                                        <path d="M9 20v-5h6v5" />
                                    </svg>
                                ),
                            },
                            {
                                title: "Garage Conversions",
                                text: "Turn underused garages into practical living space.",
                                icon: (
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M3 11l9-7 9 7" />
                                        <path d="M5 10.5V20h14v-9.5" />
                                        <path d="M8 20v-6h8v6" />
                                    </svg>
                                ),
                            },
                            {
                                title: "Internal Reconfiguration",
                                text: "Improve flow, light and everyday usability.",
                                icon: (
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <rect x="4" y="4" width="16" height="16" rx="2" />
                                        <path d="M10 4v16" />
                                        <path d="M10 10h6" />
                                    </svg>
                                ),
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    border: "1px solid #e7e5e4",
                                    borderRadius: "22px",
                                    padding: isMobile ? "18px" : "22px",
                                    background:
                                        "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,245,240,0.92))",
                                    boxShadow:
                                        "0 10px 30px rgba(28, 25, 23, 0.05)",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-40px",
                                        right: "-40px",
                                        width: "120px",
                                        height: "120px",
                                        borderRadius: "50%",
                                        background: "rgba(166, 124, 0, 0.06)",
                                    }}
                                />

                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "14px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "46px",
                                            height: "46px",
                                            minWidth: "46px",
                                            borderRadius: "14px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background:
                                                "linear-gradient(135deg, #A67C00, #C6A243)",
                                            color: "#fff",
                                            boxShadow: "0 8px 18px rgba(166, 124, 0, 0.22)",
                                        }}
                                    >
                                        {item.icon}
                                    </div>

                                    <div>
                                        <h3
                                            style={{
                                                margin: "2px 0 6px",
                                                fontSize: "18px",
                                                lineHeight: "1.2",
                                                color: "#1c1917",
                                            }}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            style={{
                                                margin: 0,
                                                color: "#57534e",
                                                fontSize: "14px",
                                                lineHeight: "1.65",
                                            }}
                                        >
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section
                    style={{
                        borderTop: "1px solid #e7e5e4",
                        borderBottom: "1px solid #e7e5e4",
                        background: "#fff",
                        overflowX: "hidden",
                    }}
                >
                    <div
                        style={{
                            ...section,
                            padding: isMobile ? "48px 16px" : "64px 20px",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile
                                    ? "1fr"
                                    : "minmax(0, 1fr) auto",
                                gap: isMobile ? "18px" : "24px",
                                alignItems: isMobile ? "start" : "end",
                            }}
                        >
                            <div style={{ maxWidth: "760px", minWidth: 0 }}>
                                <div
                                    style={{
                                        fontSize: "17px",
                                        letterSpacing: "2px",
                                        textTransform: "uppercase",
                                        color: "#78716c",
                                        fontWeight: "700",
                                    }}
                                >
                                    Example Drawings
                                </div>

                            
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    flexShrink: 0,
                                    alignItems: "center",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={showPrevDrawing}
                                    aria-label="Previous drawing"
                                    style={{
                                        height: isMobile ? "42px" : "46px",
                                        width: isMobile ? "42px" : "46px",
                                        borderRadius: "999px",
                                        border: "1px solid #d6d3d1",
                                        background: "#fff",
                                        cursor: "pointer",
                                        fontSize: "18px",
                                        color: "#1c1917",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 8px 18px rgba(28,25,23,0.04)",
                                    }}
                                >
                                    ←
                                </button>

                                <button
                                    type="button"
                                    onClick={showNextDrawing}
                                    aria-label="Next drawing"
                                    style={{
                                        height: isMobile ? "42px" : "46px",
                                        width: isMobile ? "42px" : "46px",
                                        borderRadius: "999px",
                                        border: "1px solid #1c1917",
                                        background: "#1c1917",
                                        color: "#fff",
                                        cursor: "pointer",
                                        fontSize: "18px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 12px 22px rgba(28,25,23,0.12)",
                                    }}
                                >
                                    →
                                </button>
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: isMobile ? "24px" : "30px",
                                borderRadius: isMobile ? "20px" : "24px",
                                overflow: "hidden",
                                border: "1px solid #e7e5e4",
                                background: "#f8f7f5",
                                boxShadow: "0 14px 32px rgba(0,0,0,0.05)",
                                width: "100%",
                                maxWidth: "100%",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    maxWidth: "100%",
                                    background: "linear-gradient(180deg, #f8f7f5 0%, #f3f1ed 100%)",
                                    height: isMobile ? "240px" : "clamp(280px, 55vw, 540px)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: isMobile ? "14px" : "20px",
                                    boxSizing: "border-box",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={drawingImages[drawingIndex].src}
                                    alt={drawingImages[drawingIndex].label}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        display: "block",
                                        maxWidth: "100%",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    padding: isMobile ? "16px" : "18px 20px",
                                    borderTop: "1px solid #e7e5e4",
                                    display: "grid",
                                    gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
                                    gap: "14px",
                                    alignItems: "center",
                                    background: "#fff",
                                }}
                            >
                                <div style={{ minWidth: 0 }}>
                                    <div
                                        style={{
                                            fontWeight: "700",
                                            color: "#1f1f1f",
                                            fontSize: isMobile ? "15px" : "16px",
                                            lineHeight: "1.4",
                                        }}
                                    >
                                        {drawingImages[drawingIndex].label}
                                    </div>

                                    <div
                                        style={{
                                            marginTop: "4px",
                                            color: "#78716c",
                                            fontSize: "14px",
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        Prepared as part of a clear, buildable drawing package.
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "8px",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        justifyContent: isMobile ? "flex-start" : "flex-end",
                                    }}
                                >
                                    {drawingImages.map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setDrawingIndex(i)}
                                            aria-label={`Go to drawing ${i + 1}`}
                                            style={{
                                                width: i === drawingIndex ? "24px" : "10px",
                                                height: "10px",
                                                borderRadius: "999px",
                                                border: "none",
                                                cursor: "pointer",
                                                background: i === drawingIndex ? "#1c1917" : "#d6d3d1",
                                                padding: 0,
                                                flexShrink: 0,
                                                transition: "all 0.22s ease",
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
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
                    <div
                        style={{
                            ...section,
                            padding: isMobile ? "48px 16px" : "64px 20px",
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
                                Packages
                            </div>

                            <h2
                                style={{
                                    margin: "14px 0 10px",
                                    fontSize: isMobile ? "30px" : "42px",
                                    lineHeight: "1.08",
                                    color: "#1f1f1f",
                                    letterSpacing: "-1px",
                                }}
                            >
                                Choose the right package for your project
                            </h2>

                            <p
                                style={{
                                    margin: 0,
                                    color: "#57534e",
                                    lineHeight: "1.75",
                                    fontSize: isMobile ? "15px" : "17px",
                                    maxWidth: "720px",
                                }}
                            >
                                Clear, fixed-price drawing packages designed to help you move from
                                early ideas to planning approval and technical delivery with
                                confidence.
                            </p>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile
                                    ? "1fr"
                                    : "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: isMobile ? "16px" : "20px",
                                marginTop: isMobile ? "24px" : "30px",
                                alignItems: "stretch",
                            }}
                        >
                            {packages.map((pkg) => {
                                const isSelected = selectedPackage === pkg.name;

                                return (
                                    <div
                                        key={pkg.name}
                                        style={{
                                            ...card,
                                            minWidth: 0,
                                            position: "relative",
                                            background: pkg.featured ? "#1f1f1f" : "#fff",
                                            color: pkg.featured ? "#fff" : "#1f1f1f",
                                            border: pkg.featured
                                                ? "1px solid #1f1f1f"
                                                : "1px solid #e7e5e4",
                                            borderRadius: "24px",
                                            padding: isMobile ? "22px" : "26px",
                                            boxSizing: "border-box",
                                            boxShadow: pkg.featured
                                                ? "0 20px 40px rgba(28,25,23,0.16)"
                                                : "0 14px 30px rgba(28,25,23,0.06)",
                                            transform:
                                                !isMobile && pkg.featured ? "translateY(-8px)" : "none",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {pkg.featured && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "16px",
                                                    right: "16px",
                                                    padding: "7px 12px",
                                                    borderRadius: "999px",
                                                    background: "#A67C00",
                                                    color: "#fff",
                                                    fontSize: "11px",
                                                    fontWeight: "800",
                                                    letterSpacing: "1.2px",
                                                    textTransform: "uppercase",
                                                    boxShadow: "0 10px 20px rgba(0,0,0,0.14)",
                                                }}
                                            >
                                                Most Popular
                                            </div>
                                        )}

                                        <div>
                                            <div
                                                style={{
                                                    fontSize: "11px",
                                                    letterSpacing: "1.5px",
                                                    textTransform: "uppercase",
                                                    color: pkg.featured ? "#d6d3d1" : "#78716c",
                                                    fontWeight: "700",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                {pkg.featured ? "Recommended package" : "Starting price"}
                                            </div>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "flex-end",
                                                    gap: "8px",
                                                    flexWrap: "wrap",
                                                    marginBottom: "8px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: isMobile ? "34px" : "42px",
                                                        fontWeight: "800",
                                                        lineHeight: "1",
                                                        color: pkg.featured ? "#fff" : "#1f1f1f",
                                                        letterSpacing: "-1px",
                                                    }}
                                                >
                                                    {pkg.price}
                                                </div>

                                                <div
                                                    style={{
                                                        fontSize: "13px",
                                                        fontWeight: "600",
                                                        color: pkg.featured ? "#d6d3d1" : "#78716c",
                                                        paddingBottom: "4px",
                                                    }}
                                                >
                                                    starting from
                                                </div>
                                            </div>

                                            <h3
                                                style={{
                                                    marginTop: "10px",
                                                    marginBottom: "10px",
                                                    fontSize: isMobile ? "24px" : "26px",
                                                    lineHeight: "1.15",
                                                    color: pkg.featured ? "#fff" : "#1f1f1f",
                                                }}
                                            >
                                                {pkg.name}
                                            </h3>

                                            <p
                                                style={{
                                                    color: pkg.featured ? "#f5f5f4" : "#57534e",
                                                    lineHeight: "1.75",
                                                    fontSize: isMobile ? "15px" : "16px",
                                                    marginTop: 0,
                                                    marginBottom: "16px",
                                                }}
                                            >
                                                {pkg.intro}
                                            </p>

                                            <div
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                    padding: "10px 14px",
                                                    borderRadius: "999px",
                                                    background: pkg.featured
                                                        ? "rgba(255,255,255,0.08)"
                                                        : "#f8f5ef",
                                                    border: pkg.featured
                                                        ? "1px solid rgba(255,255,255,0.12)"
                                                        : "1px solid #eadfcb",
                                                    color: pkg.featured ? "#fff" : "#44403c",
                                                    fontSize: "13px",
                                                    fontWeight: "700",
                                                    marginBottom: "20px",
                                                }}
                                            >
                                                <span>Typical turnaround</span>
                                                <span style={{ opacity: 0.7 }}>•</span>
                                                <span>7–10 working days</span>
                                            </div>

                                            <div
                                                style={{
                                                    borderTop: pkg.featured
                                                        ? "1px solid rgba(255,255,255,0.10)"
                                                        : "1px solid #ece7df",
                                                    paddingTop: "18px",
                                                    display: "grid",
                                                    gap: "12px",
                                                }}
                                            >
                                                {pkg.includes.map((item) => (
                                                    <div
                                                        key={item}
                                                        style={{
                                                            display: "grid",
                                                            gridTemplateColumns: "22px 1fr",
                                                            gap: "10px",
                                                            alignItems: "start",
                                                            minWidth: 0,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: "22px",
                                                                width: "22px",
                                                                minWidth: "22px",
                                                                borderRadius: "999px",
                                                                background: pkg.featured
                                                                    ? "rgba(255,255,255,0.12)"
                                                                    : "#1f1f1f",
                                                                color: "#fff",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: "12px",
                                                                fontWeight: "800",
                                                                lineHeight: 1,
                                                                marginTop: "1px",
                                                            }}
                                                        >
                                                            ✓
                                                        </div>

                                                        <div
                                                            style={{
                                                                color: pkg.featured
                                                                    ? "#f5f5f4"
                                                                    : "#44403c",
                                                                lineHeight: "1.65",
                                                                fontSize: isMobile ? "14px" : "15px",
                                                            }}
                                                        >
                                                            {item}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div style={{ marginTop: "24px" }}>
                                            <button
                                                type="button"
                                                onClick={() => handlePackageSelect(pkg.name)}
                                                style={{
                                                    width: "100%",
                                                    minHeight: "52px",
                                                    borderRadius: "16px",
                                                    border: isSelected
                                                        ? "1px solid #A67C00"
                                                        : pkg.featured
                                                            ? "1px solid #A67C00"
                                                            : "1px solid #1f1f1f",
                                                    background: isSelected
                                                        ? "#A67C00"
                                                        : pkg.featured
                                                            ? "#fff"
                                                            : "#1f1f1f",
                                                    color: isSelected
                                                        ? "#fff"
                                                        : pkg.featured
                                                            ? "#1f1f1f"
                                                            : "#fff",
                                                    fontSize: "15px",
                                                    fontWeight: "800",
                                                    cursor: "pointer",
                                                    boxShadow: isSelected
                                                        ? "0 12px 24px rgba(166,124,0,0.24)"
                                                        : "none",
                                                    transition:
                                                        "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease",
                                                }}
                                            >
                                                {isSelected
                                                    ? `Selected: ${pkg.name}`
                                                    : `Check If ${pkg.name} Fits My Project`}
                                            </button>

                                            <div
                                                style={{
                                                    marginTop: "10px",
                                                    textAlign: "center",
                                                    fontSize: "13px",
                                                    color: pkg.featured ? "#d6d3d1" : "#78716c",
                                                    lineHeight: "1.6",
                                                }}
                                            >
                                                No obligation advice — if selected, this package will
                                                be added to your enquiry form
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

              

                <section
                    style={{
                        borderTop: "1px solid #e7e5e4",
                        borderBottom: "1px solid #e7e5e4",
                        background: "linear-gradient(180deg, #f8f5ef 0%, #ffffff 100%)",
                    }}
                >
                    <div
                        style={{
                            ...section,
                            padding: isMobile ? "48px 16px" : "72px 24px",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile
                                    ? "1fr"
                                    : "minmax(300px, 0.9fr) minmax(320px, 1.1fr)",
                                gap: isMobile ? "22px" : "30px",
                                alignItems: "stretch",
                            }}
                        >
                            <div
                                style={{
                                    ...card,
                                    background: "#1f1f1f",
                                    color: "#fff",
                                    border: "1px solid #1f1f1f",
                                    boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
                                    minWidth: 0,
                                    padding: isMobile ? "24px" : "34px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    borderRadius: "24px",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            letterSpacing: "2px",
                                            textTransform: "uppercase",
                                            color: "#d6d3d1",
                                            fontWeight: "700",
                                        }}
                                    >
                                        How It Works
                                    </div>

                                    <h2
                                        style={{
                                            fontSize: isMobile ? "30px" : "42px",
                                            marginTop: "12px",
                                            marginBottom: "12px",
                                            lineHeight: "1.08",
                                        }}
                                    >
                                        Drawings in 3 clear steps
                                    </h2>

                                    <p
                                        style={{
                                            color: "#e7e5e4",
                                            lineHeight: "1.7",
                                            margin: 0,
                                            fontSize: isMobile ? "15px" : "16px",
                                            maxWidth: "480px",
                                        }}
                                    >
                                        Simple process. Clear pricing. Fast turnaround.
                                    </p>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "10px",
                                        marginTop: "24px",
                                    }}
                                >
                                    {[
                                        { icon: PoundSterling, label: "Fixed price" },
                                        { icon: Zap, label: "Fast turnaround" },
                                        { icon: ShieldCheck, label: "Planning support" },
                                    ].map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={item.label}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                    padding: "10px 14px",
                                                    borderRadius: "999px",
                                                    border: "1px solid rgba(255,255,255,0.12)",
                                                    background: "rgba(255,255,255,0.06)",
                                                    color: "#fff",
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        width: "22px",
                                                        height: "22px",
                                                        borderRadius: "999px",
                                                        background: "rgba(255,255,255,0.12)",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <Icon size={13} strokeWidth={2.4} />
                                                </span>
                                                {item.label}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div
                                    style={{
                                        marginTop: "24px",
                                        padding: "18px 20px",
                                        borderRadius: "18px",
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.10)",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            textTransform: "uppercase",
                                            letterSpacing: "1.5px",
                                            color: "#d6d3d1",
                                            marginBottom: "6px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Typical turnaround
                                    </div>
                                    <div
                                        style={{
                                            fontSize: isMobile ? "24px" : "30px",
                                            fontWeight: "800",
                                            lineHeight: "1.1",
                                        }}
                                    >
                                        7–10 working days
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gap: "14px",
                                    minWidth: 0,
                                }}
                            >
                                {[
                                    {
                                        number: "1",
                                        icon: Ruler,
                                        title: "Survey",
                                        text: "We measure up your property.",
                                    },
                                    {
                                        number: "2",
                                        icon: PencilRuler,
                                        title: "Drawings",
                                        text: "We prepare existing and proposed plans.",
                                    },
                                    {
                                        number: "3",
                                        icon: FileCheck,
                                        title: "Planning Support",
                                        text: "We help you move to planning or technical drawings.",
                                    },
                                ].map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.title}
                                            style={{
                                                ...card,
                                                display: "grid",
                                                gridTemplateColumns: isMobile ? "1fr" : "72px 1fr",
                                                gap: isMobile ? "14px" : "18px",
                                                alignItems: "center",
                                                background: "#fff",
                                                border: "1px solid #e7e5e4",
                                                padding: isMobile ? "18px" : "22px",
                                                minWidth: 0,
                                                boxShadow: "0 10px 28px rgba(0,0,0,0.04)",
                                                borderRadius: "22px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        height: "58px",
                                                        width: "58px",
                                                        minWidth: "58px",
                                                        borderRadius: "18px",
                                                        background: i === 1 ? "#A67C00" : "#1f1f1f",
                                                        color: "#fff",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
                                                    }}
                                                >
                                                    <Icon size={22} strokeWidth={2.2} />
                                                </div>

                                                {isMobile && (
                                                    <div>
                                                        <h3
                                                            style={{
                                                                margin: 0,
                                                                fontSize: "19px",
                                                                color: "#1f1f1f",
                                                                lineHeight: "1.2",
                                                            }}
                                                        >
                                                            {item.title}
                                                        </h3>
                                                        <div
                                                            style={{
                                                                fontSize: "13px",
                                                                color: "#78716c",
                                                                marginTop: "4px",
                                                                fontWeight: "600",
                                                            }}
                                                        >
                                                            Step {item.number}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{ minWidth: 0 }}>
                                                {!isMobile && (
                                                    <>
                                                        <div
                                                            style={{
                                                                fontSize: "13px",
                                                                color: "#78716c",
                                                                marginBottom: "6px",
                                                                fontWeight: "700",
                                                                textTransform: "uppercase",
                                                                letterSpacing: "1px",
                                                            }}
                                                        >
                                                            Step {item.number}
                                                        </div>

                                                        <h3
                                                            style={{
                                                                marginTop: 0,
                                                                marginBottom: "6px",
                                                                fontSize: "20px",
                                                                color: "#1f1f1f",
                                                            }}
                                                        >
                                                            {item.title}
                                                        </h3>
                                                    </>
                                                )}

                                                <p
                                                    style={{
                                                        margin: 0,
                                                        color: "#57534e",
                                                        lineHeight: "1.65",
                                                        fontSize: isMobile ? "15px" : "15px",
                                                    }}
                                                >
                                                    {item.text}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                                <div
                                    style={{
                                        padding: isMobile ? "18px" : "20px 22px",
                                        borderRadius: "20px",
                                        background: "#f8f5ef",
                                        border: "1px solid #eadfcb",
                                        display: "flex",
                                        alignItems: isMobile ? "flex-start" : "center",
                                        justifyContent: "space-between",
                                        gap: "16px",
                                        flexDirection: isMobile ? "column" : "row",
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: "800",
                                                color: "#1f1f1f",
                                                fontSize: "18px",
                                                marginBottom: "4px",
                                            }}
                                        >
                                            Ready to get started?
                                        </div>
                                        <div
                                            style={{
                                                color: "#57534e",
                                                lineHeight: "1.6",
                                                fontSize: isMobile ? "15px" : "15px",
                                            }}
                                        >
                                            Send your project details and we’ll guide you from there.
                                        </div>
                                    </div>

                                    <a
                                        href="#contact-form"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document
                                                .getElementById("contact-form")
                                                ?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "12px 16px",
                                            borderRadius: "999px",
                                            background: "#1f1f1f",
                                            color: "#fff",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            whiteSpace: "nowrap",
                                            textDecoration: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Free drawings assessment
                                    </a>
                                </div>
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
                            maxWidth: "1200px",
                            margin: "0 auto",
                            padding: isMobile ? "48px 16px" : "70px 24px",
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
                            gap: isMobile ? "24px" : "30px",
                            boxSizing: "border-box",
                            alignItems: "start",
                        }}
                    >
                        <div style={{ minWidth: 0 }}>
                            <div
                                style={{
                                    fontSize: "12px",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    color: "#78716c",
                                    fontWeight: "700",
                                }}
                            >
                                Enquiry Form
                            </div>

                            <h2
                                style={{
                                    fontSize: isMobile ? "30px" : "42px",
                                    marginTop: "12px",
                                    marginBottom: "12px",
                                    lineHeight: "1.08",
                                    color: "#1f1f1f",
                                }}
                            >
                                Request your drawings quote
                            </h2>

                        

                            {selectedPackage && (
                                <div
                                    style={{
                                        marginTop: "20px",
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
                            <div
                                style={{
                                    marginTop: "22px",
                                    display: "grid",
                                    gap: "14px",
                                    maxWidth: "520px",
                                }}
                            >
                                {[
                                    {
                                        label: "Phone",
                                        value: "02036335634",
                                        icon: (
                                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.6a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.47-1.1a2 2 0 0 1 2.11-.45c.83.27 1.7.47 2.6.59A2 2 0 0 1 22 16.92z" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "Email",
                                        value: "planning@crafman.co.uk",
                                        icon: (
                                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                                <path d="M3 7l9 6 9-6" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "Location",
                                        value: "London, United Kingdom",
                                        icon: (
                                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                <path d="M12 21s7-5.33 7-11a7 7 0 1 0-14 0c0 5.67 7 11 7 11z" />
                                                <circle cx="12" cy="10" r="2.5" />
                                            </svg>
                                        ),
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "14px",
                                            padding: "14px 16px",
                                            borderRadius: "18px",
                                            background: "rgba(255,255,255,0.6)",
                                            border: "1px solid #ddd6ce",
                                            boxShadow: "0 8px 20px rgba(28,25,23,0.04)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "38px",
                                                height: "38px",
                                                minWidth: "38px",
                                                borderRadius: "12px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background: "linear-gradient(135deg, #A67C00, #C6A243)",
                                                color: "#fff",
                                                boxShadow: "0 6px 14px rgba(166,124,0,0.25)",
                                            }}
                                        >
                                            {item.icon}
                                        </div>

                                        <div style={{ lineHeight: "1.4" }}>
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "#78716c",
                                                    marginBottom: "2px",
                                                    letterSpacing: "0.04em",
                                                }}
                                            >
                                                {item.label}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "15px",
                                                    color: "#1c1917",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {item.value}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                        background: "#f5f3ef",
                    }}
                >
                    <div
                        style={{
                            ...section,
                            padding: isMobile ? "48px 16px" : "72px 20px",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile
                                    ? "1fr"
                                    : "minmax(320px, 0.95fr) minmax(320px, 1.05fr)",
                                gap: isMobile ? "28px" : "44px",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    ...card,
                                    background: "linear-gradient(180deg, #fcfbf8 0%, #f1ede7 100%)",
                                    border: "1px solid #e7e5e4",
                                    minHeight: isMobile ? "240px" : "420px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: isMobile ? "24px" : "36px",
                                    boxShadow: "0 18px 36px rgba(28,25,23,0.05)",
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: "center",
                                        maxWidth: "420px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: isMobile ? "74px" : "88px",
                                            height: isMobile ? "74px" : "88px",
                                            margin: "0 auto 18px",
                                            borderRadius: "22px",
                                            background: "#1f1f1f",
                                            color: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: isMobile ? "30px" : "36px",
                                            fontWeight: "800",
                                            boxShadow: "0 16px 28px rgba(28,25,23,0.12)",
                                        }}
                                    >
                                        ✓
                                    </div>

                                    <h3
                                        style={{
                                            margin: 0,
                                            fontSize: isMobile ? "26px" : "34px",
                                            lineHeight: "1.12",
                                            color: "#1f1f1f",
                                        }}
                                    >
                                        Trusted planning drawing support for homeowners
                                    </h3>


                                </div>
                            </div>

                            <div style={{ minWidth: 0 }}>
                                <div
                                    style={{
                                        fontSize: "12px",
                                        letterSpacing: "2px",
                                        textTransform: "uppercase",
                                        color: "#A67C00",
                                        fontWeight: "800",
                                    }}
                                >
                                    Our Track Record
                                </div>

                                <h2
                                    style={{
                                        fontSize: isMobile ? "34px" : "52px",
                                        lineHeight: "1.05",
                                        marginTop: "12px",
                                        marginBottom: "14px",
                                        color: "#1f1f1f",
                                    }}
                                >
                                    Building trust through results
                                </h2>



                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: isMobile
                                            ? "1fr 1fr"
                                            : "repeat(2, minmax(180px, 1fr))",
                                        gap: isMobile ? "18px" : "26px 34px",
                                        marginTop: "34px",
                                        maxWidth: "640px",
                                    }}
                                >
                                    {trustStats.map((item) => (
                                        <div key={item.label}>
                                            <div
                                                style={{
                                                    fontSize: isMobile ? "38px" : "52px",
                                                    lineHeight: "1",
                                                    fontWeight: "800",
                                                    color: "#1f1f1f",
                                                    letterSpacing: "-1.5px",
                                                }}
                                            >
                                                {item.value}
                                                <span style={{ color: "#A67C00" }}>+</span>
                                            </div>
                                            <div
                                                style={{
                                                    marginTop: "8px",
                                                    fontSize: isMobile ? "15px" : "17px",
                                                    lineHeight: "1.45",
                                                    fontWeight: "700",
                                                    color: "#1f1f1f",
                                                }}
                                            >
                                                {item.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginTop: "30px" }}>
                                    <a
                                        href="#contact-form"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            minHeight: "52px",
                                            padding: "0 26px",
                                            borderRadius: "14px",
                                            textDecoration: "none",
                                            background: "#A67C00",
                                            color: "#fff",
                                            fontWeight: "800",
                                            fontSize: "15px",
                                            boxShadow: "0 14px 28px rgba(31,92,255,0.18)",
                                        }}
                                    >
                                        Request a Quote
                                    </a>
                                </div>
                            </div>
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

                                <div
                                    style={{
                                        display: "grid",
                                        gap: "10px",
                                    }}
                                >
                                    {[
                                        "Planning permission guidance",
                                        "Permitted development support",
                                        "Package and drawing clarity",
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

                            <div
                                style={{
                                    display: "grid",
                                    gap: "14px",
                                    minWidth: 0,
                                }}
                            >
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

                                                    <div
                                                        style={{
                                                            padding: isMobile ? "18px 16px" : "22px 24px",
                                                            minWidth: 0,
                                                        }}
                                                    >
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

                                                    <div
                                                        style={{
                                                            paddingRight: isMobile ? "16px" : "22px",
                                                            fontSize: "20px",
                                                            fontWeight: "700",
                                                            color: "#78716c",
                                                        }}
                                                    >
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

                                <div
                                    style={{
                                        padding: "20px 22px",
                                        borderRadius: "18px",
                                        background: "#fff",
                                        border: "1px solid #e7e5e4",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            letterSpacing: "2px",
                                            textTransform: "uppercase",
                                            color: "#78716c",
                                            fontWeight: "700",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        Still unsure?
                                    </div>

                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#57534e",
                                            lineHeight: "1.85",
                                        }}
                                    >
                                        If you are not sure which route your project falls under, the enquiry
                                        form is the best place to start. We can review the project type, package
                                        level, and likely next step with you.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <style>
                            {`
                                @keyframes faqFadeDown {
                                    0% {
                                        opacity: 0;
                                        transform: translateY(-6px);
                                    }
                                    100% {
                                        opacity: 1;
                                        transform: translateY(0);
                                    }
                                }

                                html, body {
                                    width: 100%;
                                    max-width: 100%;
                                    overflow-x: hidden;
                                }

                                * {
                                    box-sizing: border-box;
                                }

                                img {
                                    max-width: 100%;
                                }
                            `}
                        </style>
                    </div>
                </section>
            </div>
        </Layout>
    );
}