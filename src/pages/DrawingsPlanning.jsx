import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Layout, { siteStyles } from "../components/DrawingsLayout.jsx";
import DrawingsPlanningForm from "../components/DrawingsPlanningForm.jsx";

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

    const packageButtonStyle = (active) => ({
        display: "inline-block",
        width: "100%",
        textAlign: "center",
        background: active ? "#1c1917" : "#fff",
        color: active ? "#fff" : "#1c1917",
        padding: "14px 18px",
        borderRadius: "12px",
        textDecoration: "none",
        fontWeight: "600",
        border: active ? "1px solid #1c1917" : "1px solid #d6d3d1",
        cursor: "pointer",
        boxSizing: "border-box",
    });

    const packages = [
        {
            name: "Starter Package",
            price: "From £450",
            intro: "A simple, practical package to get your project moving.",
            includes: [
                "Measured survey",
                "Current scaled drawings",
                "Proposed scaled drawings",
                "Elevations",
            ],
        },
        {
            name: "Planning Package",
            price: "From £650",
            intro: "A stronger option for projects that need planning support.",
            includes: [
                "Measured survey",
                "Current scaled drawings",
                "Proposed scaled drawings",
                "Elevations",
                "Submission to council",
                "Building Control Drawings",
            ],
            featured: true,
        },
        {
            name: "Technical Package",
            price: "From £1550",
            intro: "A fuller package for projects moving into technical delivery.",
            includes: [
                "Measured survey",
                "Current scaled drawings",
                "Proposed scaled drawings",
                "Elevations",
                "Submission to council",
                "Building control drawings",
                "Structural Calculations",
            ],
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
            name: "James Turner",
            role: "Homeowner, London",
            text: "Really happy with the service from start to finish. The team was organised, easy to deal with, and the final result came out exactly how we wanted.",
        },
        {
            name: "Sarah Whitmore",
            role: "Property Client, London",
            text: "The communication was clear throughout and the project felt properly managed. We appreciated having one team handling both the design and build side.",
        },
        {
            name: "Daniel Hughes",
            role: "Commercial Client, London",
            text: "Professional, practical, and detail-focused. The finish quality was strong and the whole process felt much smoother than expected.",
        },
        {
            name: "Charlotte Bennett",
            role: "Homeowner, Surrey",
            text: "From the early design stage through to completion, everything felt well organised. The team understood exactly what we were trying to achieve.",
        },
        {
            name: "Oliver Reynolds",
            role: "Landlord, London",
            text: "Very good experience overall. Straightforward communication, sensible advice, and a high standard of work across the project.",
        },
        {
            name: "Emily Carter",
            role: "Homeowner, Hertfordshire",
            text: "The process felt clear from the start and the finished space has completely changed how we use our home. Very pleased with the result.",
        },
        {
            name: "William Foster",
            role: "Business Owner, London",
            text: "We wanted a space that felt polished and practical, and that is exactly what was delivered. Helpful team and strong attention to detail.",
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

    return (
        <Layout>
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
                        borderBottom: "1px solid #e7e5e4",
                        background: "linear-gradient(135deg, #f1ede7, #ffffff, #eae5dd)",
                    }}
                >
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
                            Drawings for extensions, loft conversions, and internal reconfiguration.
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
                                Request a Quote
                            </a>
                        </div>
                    </div>
                </section>

                <section style={section}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: isMobile
                                ? "1fr"
                                : "repeat(auto-fit, minmax(240px, 1fr))",
                            gap: "20px",
                        }}
                    >
                        <div style={{ ...card, minWidth: 0 }}>
                            <h3 style={{ marginTop: 0 }}>Extension Drawings</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                                Rear extensions, side returns, wraparounds, and more.
                            </p>
                        </div>

                        <div style={{ ...card, minWidth: 0 }}>
                            <h3 style={{ marginTop: 0 }}>Loft Conversion Drawings</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                                Drawings prepared to help shape layout, form, and approvals.
                            </p>
                        </div>

                        <div style={{ ...card, minWidth: 0 }}>
                            <h3 style={{ marginTop: 0 }}>Internal Reconfiguration</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                                Layout changes and internal planning to improve how the home works.
                            </p>
                        </div>
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
                                        fontSize: "12px",
                                        letterSpacing: "2px",
                                        textTransform: "uppercase",
                                        color: "#78716c",
                                        fontWeight: "700",
                                    }}
                                >
                                    Example Drawings
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
                                    See the standard of drawing work you can expect
                                </h2>

                                <p
                                    style={{
                                        color: "#57534e",
                                        lineHeight: "1.8",
                                        margin: 0,
                                        fontSize: isMobile ? "15px" : "16px",
                                        maxWidth: "680px",
                                    }}
                                >
                                    Examples from extension, loft conversion, and internal layout projects.
                                    Clear, practical drawings prepared to support planning, pricing, and
                                    confident decision-making.
                                </p>
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

                        <div
                            style={{
                                marginTop: isMobile ? "18px" : "20px",
                                padding: isMobile ? "16px" : "18px 20px",
                                borderRadius: "18px",
                                background: "#fcfbf8",
                                border: "1px solid #e7e5e4",
                                color: "#57534e",
                                lineHeight: "1.75",
                                fontSize: isMobile ? "14px" : "15px",
                            }}
                        >
                            <strong style={{ color: "#1f1f1f" }}>
                                Every project is different.
                            </strong>{" "}
                            Your package is tailored to the level of support you need, whether that is
                            a straightforward planning set or a fuller technical drawing package.
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
                                    fontSize: isMobile ? "30px" : "42px",
                                    marginTop: "12px",
                                    marginBottom: "12px",
                                    lineHeight: "1.08",
                                    color: "#1f1f1f",
                                }}
                            >
                                Choose the level of support you need
                            </h2>

                            <p
                                style={{
                                    color: "#57534e",
                                    lineHeight: "1.8",
                                    margin: 0,
                                    fontSize: isMobile ? "15px" : "16px",
                                }}
                            >
                                Prices start from <strong>£450</strong>. Select a package below and
                                it will be added to your enquiry form.
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
                                                {isSelected ? `Selected: ${pkg.name}` : `Choose ${pkg.name}`}
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
                                                Select this package and it will be added to your enquiry form
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
                    <div style={section}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile
                                    ? "1fr"
                                    : "minmax(300px, 0.95fr) minmax(320px, 1.05fr)",
                                gap: isMobile ? "22px" : "34px",
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
                                            marginBottom: "14px",
                                            lineHeight: "1.08",
                                        }}
                                    >
                                        Get your drawings in 3 simple steps
                                    </h2>

                                    <p
                                        style={{
                                            color: "#f5f5f4",
                                            lineHeight: "1.8",
                                            marginBottom: "22px",
                                            fontSize: isMobile ? "15px" : "16px",
                                        }}
                                    >
                                        From measured survey to proposed plans, we keep the process
                                        straightforward, fast, and easy to follow.
                                    </p>
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gap: "10px",
                                    }}
                                >
                                    {[
                                        "Fixed price packages",
                                        "Fast turnaround",
                                        "Planning & building regs support",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            style={{
                                                padding: "11px 14px",
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

                                <div
                                    style={{
                                        marginTop: "22px",
                                        padding: "16px 18px",
                                        borderRadius: "18px",
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.10)",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "13px",
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
                                            fontSize: isMobile ? "24px" : "28px",
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
                                        title: "Survey",
                                        text: "We measure the property accurately to create a reliable base for the drawings.",
                                    },
                                    {
                                        number: "2",
                                        title: "Drawings",
                                        text: "We prepare clear existing and proposed plans for your extension, loft, or renovation.",
                                    },
                                    {
                                        number: "3",
                                        title: "Submission",
                                        text: "If needed, we help with planning submission or develop technical drawings for building control.",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={item.title}
                                        style={{
                                            ...card,
                                            display: "grid",
                                            gridTemplateColumns: isMobile ? "1fr" : "64px 1fr",
                                            gap: isMobile ? "14px" : "16px",
                                            alignItems: "start",
                                            background: "#fff",
                                            border: "1px solid #e7e5e4",
                                            padding: isMobile ? "20px" : "22px",
                                            minWidth: 0,
                                            boxShadow: "0 10px 28px rgba(0,0,0,0.04)",
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
                                                    height: "56px",
                                                    width: "56px",
                                                    minWidth: "56px",
                                                    borderRadius: "18px",
                                                    background: i === 1 ? "#A67C00" : "#1f1f1f",
                                                    color: "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontWeight: "800",
                                                    fontSize: "18px",
                                                    boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
                                                }}
                                            >
                                                {item.number}
                                            </div>

                                            {isMobile && (
                                                <h3
                                                    style={{
                                                        margin: 0,
                                                        fontSize: "20px",
                                                        color: "#1f1f1f",
                                                        lineHeight: "1.2",
                                                    }}
                                                >
                                                    {item.title}
                                                </h3>
                                            )}
                                        </div>

                                        <div style={{ minWidth: 0 }}>
                                            {!isMobile && (
                                                <h3
                                                    style={{
                                                        marginTop: 0,
                                                        marginBottom: "8px",
                                                        fontSize: "20px",
                                                        color: "#1f1f1f",
                                                    }}
                                                >
                                                    {item.title}
                                                </h3>
                                            )}

                                            <p
                                                style={{
                                                    margin: 0,
                                                    color: "#57534e",
                                                    lineHeight: "1.75",
                                                    fontSize: isMobile ? "15px" : "16px",
                                                }}
                                            >
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <div
                                    style={{
                                        padding: isMobile ? "18px" : "20px 22px",
                                        borderRadius: "18px",
                                        background: "#f8f5ef",
                                        border: "1px solid #eadfcb",
                                        color: "#44403c",
                                        lineHeight: "1.75",
                                        fontSize: isMobile ? "15px" : "16px",
                                    }}
                                >
                                    <strong style={{ color: "#1f1f1f" }}>
                                        Simple, clear, and tailored to your project.
                                    </strong>{" "}
                                    Whether you only need planning drawings or a fuller technical package,
                                    we help you move forward with confidence.
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
                                    : "minmax(280px, 0.95fr) minmax(320px, 1.05fr)",
                                gap: isMobile ? "22px" : "28px",
                                alignItems: "stretch",
                            }}
                        >
                            <div
                                style={{
                                    ...card,
                                    background: "#1f1f1f",
                                    color: "#fff",
                                    border: "1px solid #1f1f1f",
                                    padding: isMobile ? "24px" : "30px",
                                    minWidth: 0,
                                    boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
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
                                        Why clients choose us
                                    </div>

                                    <h2
                                        style={{
                                            fontSize: isMobile ? "30px" : "40px",
                                            marginTop: "12px",
                                            marginBottom: "14px",
                                            lineHeight: "1.08",
                                        }}
                                    >
                                        Drawings backed by real building knowledge
                                    </h2>

                                    <p
                                        style={{
                                            color: "#f5f5f4",
                                            lineHeight: "1.8",
                                            margin: 0,
                                            fontSize: isMobile ? "15px" : "16px",
                                        }}
                                    >
                                        Our plans are shaped by practical construction experience,
                                        helping you make better decisions on layout, cost, and what
                                        will work best on site.
                                    </p>
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gap: "10px",
                                        marginTop: "22px",
                                    }}
                                >
                                    {[
                                        "Buildable, practical layouts",
                                        "Cost-aware design advice",
                                        "Smarter decisions from the start",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            style={{
                                                padding: "11px 14px",
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
                                        title: "Practical advice",
                                        text: "We approach drawings with real construction decisions in mind, not just how they look on paper.",
                                    },
                                    {
                                        title: "Cost-conscious planning",
                                        text: "We help spot opportunities to simplify layouts and avoid unnecessary structural cost early on.",
                                    },
                                    {
                                        title: "Fewer surprises later",
                                        text: "Clearer decisions at the drawing stage can prevent delays, changes, and extra spend during the build.",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={item.title}
                                        style={{
                                            ...card,
                                            display: "grid",
                                            gridTemplateColumns: isMobile ? "1fr" : "52px 1fr",
                                            gap: isMobile ? "12px" : "14px",
                                            alignItems: "start",
                                            background: "#fcfbf8",
                                            border: "1px solid #e7e5e4",
                                            padding: isMobile ? "18px" : "20px",
                                            minWidth: 0,
                                            boxShadow: "0 10px 24px rgba(28,25,23,0.04)",
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
                                                    height: "48px",
                                                    width: "48px",
                                                    minWidth: "48px",
                                                    borderRadius: "14px",
                                                    background: i === 1 ? "#A67C00" : "#1f1f1f",
                                                    color: "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontWeight: "800",
                                                    flexShrink: 0,
                                                    boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
                                                }}
                                            >
                                                {i + 1}
                                            </div>

                                            {isMobile && (
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
                                            )}
                                        </div>

                                        <div style={{ minWidth: 0 }}>
                                            {!isMobile && (
                                                <h3
                                                    style={{
                                                        margin: 0,
                                                        fontSize: "18px",
                                                        color: "#1f1f1f",
                                                    }}
                                                >
                                                    {item.title}
                                                </h3>
                                            )}

                                            <p
                                                style={{
                                                    marginTop: "6px",
                                                    marginBottom: 0,
                                                    color: "#57534e",
                                                    fontSize: isMobile ? "14px" : "15px",
                                                    lineHeight: "1.75",
                                                }}
                                            >
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: isMobile ? "32px" : "42px",
                                display: "grid",
                                gridTemplateColumns: isMobile
                                    ? "repeat(2, minmax(0, 1fr))"
                                    : "repeat(3, minmax(160px, 180px))",
                                justifyContent: "center",
                                gap: isMobile ? "14px" : "20px",
                            }}
                        >
                            {[
                                "/images/fmb.jpeg",
                                "/images/trustmark.jpeg",
                                "/images/google5Star.jpeg",
                            ].map((src, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: "#fff",
                                        border: "1px solid #e7e5e4",
                                        borderRadius: "18px",
                                        padding: isMobile ? "16px 12px" : "20px 16px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        minHeight: isMobile ? "96px" : "112px",
                                        boxShadow: "0 14px 30px rgba(28,25,23,0.05)",
                                    }}
                                >
                                    <img
                                        src={src}
                                        alt="accreditation"
                                        style={{
                                            width: "100%",
                                            maxWidth: isMobile ? "115px" : "135px",
                                            maxHeight: isMobile ? "62px" : "74px",
                                            objectFit: "contain",
                                            display: "block",
                                        }}
                                    />
                                </div>
                            ))}
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
                            padding: "70px 24px",
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
                            gap: "30px",
                            boxSizing: "border-box",
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

                            <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "12px" }}>
                                Request your drawings quote
                            </h2>

                            <p style={{ color: "#57534e", lineHeight: "1.8", maxWidth: "560px" }}>
                                Tell us what type of project you have and which package you are
                                interested in. We’ll use that to guide the next step.
                            </p>

                            {selectedPackage && (
                                <div
                                    style={{
                                        marginTop: "20px",
                                        display: "inline-block",
                                        padding: "10px 14px",
                                        borderRadius: "999px",
                                        background: "#1f1f1f",
                                        color: "#fff",
                                        fontWeight: "600",
                                        maxWidth: "100%",
                                    }}
                                >
                                    Selected: {selectedPackage}
                                </div>
                            )}

                            <div style={{ marginTop: "22px", color: "#44403c", lineHeight: "1.9" }}>
                                <p><strong>Phone:</strong> 02036335634</p>
                                <p><strong>Email:</strong> info@crafman.co.uk</p>
                                <p><strong>Location:</strong> London, United Kingdom</p>
                            </div>
                        </div>

                        <div style={{ minWidth: 0 }}>
                            <DrawingsPlanningForm
                                endpoint="https://formspree.io/f/maqlqgzz"
                                selectedPackage={selectedPackage}
                                title="Request your drawings quote"
                                intro="Tell us what type of project you have and which package you are interested in. We’ll use that to guide the next step."
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
                    <div style={section}>
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
                                        fontSize: "40px",
                                        marginTop: "12px",
                                        marginBottom: "12px",
                                        color: "#A67C00",
                                    }}
                                >
                                    What clients say about working with us
                                </h2>
                                <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                                    We focus on clear communication, practical design, and quality delivery
                                    from start to finish.
                                </p>
                            </div>

                            <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                                <button
                                    type="button"
                                    onClick={showPrevTestimonials}
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
                                <div key={`${item.name}-${index}`} style={{ ...card, minWidth: 0 }}>
                                    <div style={{ marginBottom: "10px", color: "#f59e0b", fontSize: "18px" }}>
                                        ★★★★★
                                    </div>

                                    <p style={{ color: "#57534e", lineHeight: "1.8", marginTop: 0 }}>
                                        “{item.text}”
                                    </p>

                                    <div style={{ fontWeight: "700", marginTop: "16px" }}>
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
                                    style={{
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "999px",
                                        border: "none",
                                        cursor: "pointer",
                                        background: i === testimonialIndex ? "#1c1917" : "#d6d3d1",
                                        padding: 0,
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