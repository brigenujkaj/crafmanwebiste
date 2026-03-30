import { useEffect, useState } from "react";
import Layout, { siteStyles } from "../components/Layout.jsx";
import DrawingsPlanningForm from "../components/DrawingsPlanningForm.jsx";

export default function DrawingsPlanning() {
    const { section, card, buttonPrimary, buttonSecondary, tag } = siteStyles;

    const [selectedPackage, setSelectedPackage] = useState("");
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [openFaq, setOpenFaq] = useState(0);

    const drawingImages = [
        { src: "/images/drawingex1.jpeg", label: "Extension Layout" },
        { src: "/images/drawingsex2.jpeg", label: "Loft Conversion Plan" },
        { src: "/images/drawingex3.jpeg", label: "Proposed Elevation" },
        { src: "/images/drawingsex4.jpeg", label: "Technical Drawing Detail" },
        { src: "/images/drawingsex5.jpeg", label: "Extension Layout" },
        { src: "/images/drawingsex6.jpeg", label: "Loft Conversion Plan" },
        { src: "/images/drawingsex7.jpeg", label: "Proposed Elevation" },
    ];

    const [drawingIndex, setDrawingIndex] = useState(0);

    useEffect(() => {
        if (window.innerWidth < 768) return;

        const interval = setInterval(() => {
            setDrawingIndex((prev) => (prev + 1) % drawingImages.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [drawingImages.length]);

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
    });

    const packages = [
        {
            name: "Starter Package",
            price: "From £650",
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
            price: "From £950",
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

        const formSection = document.getElementById("contact-form");
        if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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

    const visibleTestimonials = [
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

                    <p
                        style={{
                            marginTop: "24px",
                            fontSize: "19px",
                            lineHeight: "1.8",
                            color: "#57534e",
                            maxWidth: "760px",
                        }}
                    >
                        We prepare drawing packages to help move your project forward clearly,
                        from measured survey through to proposed drawings, council submission,
                        and building control packages where needed.
                    </p>

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
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "20px",
                    }}
                >
                    <div style={card}>
                        <h3 style={{ marginTop: 0 }}>Extension Drawings</h3>
                        <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                            Rear extensions, side returns, wraparounds, and more.
                        </p>
                    </div>

                    <div style={card}>
                        <h3 style={{ marginTop: 0 }}>Loft Conversion Drawings</h3>
                        <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                            Drawings prepared to help shape layout, form, and approvals.
                        </p>
                    </div>

                    <div style={card}>
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
                        <div style={{ maxWidth: "760px" }}>
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

                            <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "12px" }}>
                                A look at our drawing work
                            </h2>

                            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                                Examples of drawings prepared for extensions, loft conversions, and internal
                                reconfiguration projects. Each set is tailored to support clear planning
                                and build decisions.
                            </p>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                            <button
                                type="button"
                                onClick={showPrevDrawing}
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
                                onClick={showNextDrawing}
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
                            marginTop: "30px",
                            borderRadius: "24px",
                            overflow: "hidden",
                            border: "1px solid #e7e5e4",
                            background: "#f8f7f5",
                            boxShadow: "0 10px 24px rgba(0,0,0,0.05)",
                            overflowAnchor: "none",
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                background: "#f8f7f5",
                                height: "clamp(240px, 55vw, 520px)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "16px",
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
                                }}
                            />
                        </div>

                        <div
                            style={{
                                padding: "18px 20px",
                                borderTop: "1px solid #e7e5e4",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "16px",
                                flexWrap: "wrap",
                                background: "#fff",
                            }}
                        >
                            <div style={{ fontWeight: "600", color: "#1f1f1f" }}>
                                {drawingImages[drawingIndex].label}
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "8px",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                {drawingImages.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setDrawingIndex(i)}
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                            borderRadius: "999px",
                                            border: "none",
                                            cursor: "pointer",
                                            background: i === drawingIndex ? "#1c1917" : "#d6d3d1",
                                            padding: 0,
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
                <div style={section}>
                    <div style={{ maxWidth: "760px" }}>
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
                        <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "12px" }}>
                            Choose the level of support you need
                        </h2>
                        <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                            Prices start from <strong>£650</strong>. Select a package below and
                            jump straight to the enquiry form.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "20px",
                            marginTop: "30px",
                        }}
                    >
                        {packages.map((pkg) => (
                            <div
                                key={pkg.name}
                                style={{
                                    ...card,
                                    background: pkg.featured ? "#1f1f1f" : "#fff",
                                    color: pkg.featured ? "#fff" : "#1f1f1f",
                                    border: pkg.featured ? "1px solid #1f1f1f" : "1px solid #ddd",
                                    transform: pkg.featured ? "translateY(-6px)" : "none",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "12px",
                                        letterSpacing: "2px",
                                        textTransform: "uppercase",
                                        color: pkg.featured ? "#d6d3d1" : "#78716c",
                                        fontWeight: "700",
                                    }}
                                >
                                    {pkg.price}
                                </div>

                                <h3 style={{ marginTop: "12px", marginBottom: "12px" }}>{pkg.name}</h3>

                                <p
                                    style={{
                                        color: pkg.featured ? "#f5f5f4" : "#57534e",
                                        lineHeight: "1.8",
                                    }}
                                >
                                    {pkg.intro}
                                </p>

                                <div style={{ marginTop: "16px", display: "grid", gap: "10px" }}>
                                    {pkg.includes.map((item) => (
                                        <div
                                            key={item}
                                            style={{
                                                color: pkg.featured ? "#f5f5f4" : "#44403c",
                                                lineHeight: "1.7",
                                            }}
                                        >
                                            • {item}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginTop: "24px" }}>
                                    <button
                                        type="button"
                                        onClick={() => handlePackageSelect(pkg.name)}
                                        style={packageButtonStyle(selectedPackage === pkg.name)}
                                    >
                                        Choose {pkg.name}
                                    </button>
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
                    background: "linear-gradient(180deg, #f8f5ef 0%, #ffffff 100%)",
                }}
            >
                <div style={section}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "minmax(280px, 0.95fr) minmax(320px, 1.05fr)",
                            gap: "36px",
                            alignItems: "start",
                        }}
                    >
                        <div
                            style={{
                                ...card,
                                background: "#1f1f1f",
                                color: "#fff",
                                border: "1px solid #1f1f1f",
                                boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
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
                                How It Works
                            </div>

                            <h2
                                style={{
                                    fontSize: "42px",
                                    marginTop: "12px",
                                    marginBottom: "14px",
                                    lineHeight: "1.08",
                                }}
                            >
                                A clear route from survey to submission
                            </h2>

                            <p
                                style={{
                                    color: "#f5f5f4",
                                    lineHeight: "1.85",
                                    marginBottom: "18px",
                                }}
                            >
                                We shape the package around the stage your project is at.
                                Some clients only need the core drawing set, while others
                                need planning submission support and technical information too.
                            </p>

                            <div
                                style={{
                                    display: "grid",
                                    gap: "10px",
                                    marginTop: "18px",
                                }}
                            >
                                {[
                                    "Clear next-step advice",
                                    "Packages matched to project stage",
                                    "Support from survey to submission",
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
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "grid", gap: "16px" }}>
                            {[
                                {
                                    title: "Measured survey",
                                    text: "We begin with an accurate survey of the property to create a reliable base for the drawings.",
                                },
                                {
                                    title: "Current scaled drawings",
                                    text: "We prepare the existing layout clearly so the starting point of the project is properly documented.",
                                },
                                {
                                    title: "Proposed drawings",
                                    text: "Your new layout and design direction are developed into clear proposed drawings for review and progress.",
                                },
                                {
                                    title: "Elevations and optional visuals",
                                    text: "Where needed, elevations and supporting visuals help communicate the design more clearly.",
                                },
                                {
                                    title: "Planning submission support",
                                    text: "For projects needing approval, we can prepare and submit the relevant information to the council.",
                                },
                                {
                                    title: "Technical / building control stage",
                                    text: "For fuller packages, we develop the technical drawing information needed for compliance and delivery.",
                                },
                            ].map((item, i) => (
                                <div
                                    key={item.title}
                                    style={{
                                        ...card,
                                        display: "grid",
                                        gridTemplateColumns: "56px 1fr",
                                        gap: "16px",
                                        alignItems: "start",
                                        background: "#fff",
                                        border: "1px solid #e7e5e4",
                                        padding: "22px",
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "56px",
                                            width: "56px",
                                            borderRadius: "18px",
                                            background: i === 1 || i === 4 ? "#A67C00" : "#1f1f1f",
                                            color: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: "800",
                                            fontSize: "18px",
                                            boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {i + 1}
                                    </div>

                                    <div>
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
                                        <p
                                            style={{
                                                margin: 0,
                                                color: "#57534e",
                                                lineHeight: "1.8",
                                            }}
                                        >
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div
                                style={{
                                    padding: "18px 20px",
                                    borderRadius: "18px",
                                    background: "#f8f5ef",
                                    border: "1px solid #eadfcb",
                                    color: "#44403c",
                                    lineHeight: "1.8",
                                }}
                            >
                                <strong style={{ color: "#1f1f1f" }}>
                                    The goal is simple:
                                </strong>{" "}
                                help you choose the right level of drawing support for your project,
                                then move forward with clarity.
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
                        padding: "60px 16px",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                            gap: "24px",
                            alignItems: "stretch",
                        }}
                    >
                        <div
                            style={{
                                ...card,
                                background: "#1f1f1f",
                                color: "#fff",
                                border: "1px solid #1f1f1f",
                                padding: "20px",
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
                                Why clients choose us
                            </div>

                            <h2
                                style={{
                                    fontSize: "clamp(28px, 5vw, 40px)",
                                    marginTop: "12px",
                                    marginBottom: "14px",
                                    lineHeight: "1.1",
                                }}
                            >
                                We are a building company first — not just drawings.
                            </h2>

                            <p
                                style={{
                                    color: "#f5f5f4",
                                    lineHeight: "1.8",
                                    margin: 0,
                                }}
                            >
                                Our drawings come with practical advice on cost, buildability,
                                and where smarter decisions can save thousands.
                            </p>
                        </div>

                        <div style={{ display: "grid", gap: "14px" }}>
                            {[
                                {
                                    title: "Practical building-led advice",
                                    text: "We design with real construction decisions in mind.",
                                },
                                {
                                    title: "Cost-effective thinking",
                                    text: "We help avoid unnecessary cost in layout and structure.",
                                },
                                {
                                    title: "Better decisions earlier",
                                    text: "Good early decisions prevent expensive changes later.",
                                },
                            ].map((item, i) => (
                                <div
                                    key={item.title}
                                    style={{
                                        ...card,
                                        display: "grid",
                                        gridTemplateColumns: "48px 1fr",
                                        gap: "14px",
                                        alignItems: "start",
                                        background: "#fcfbf8",
                                        border: "1px solid #e7e5e4",
                                        padding: "18px",
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "48px",
                                            width: "48px",
                                            borderRadius: "14px",
                                            background: i === 1 ? "#A67C00" : "#1f1f1f",
                                            color: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: "800",
                                        }}
                                    >
                                        {i + 1}
                                    </div>

                                    <div>
                                        <h3 style={{ margin: 0, fontSize: "18px" }}>
                                            {item.title}
                                        </h3>
                                        <p
                                            style={{
                                                margin: 0,
                                                color: "#57534e",
                                                fontSize: "14px",
                                                lineHeight: "1.7",
                                            }}
                                        >
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: "40px", overflow: "hidden" }}>
                        <div
                            style={{
                                display: "flex",
                                gap: "40px",
                                width: "max-content",
                                animation: "scrollLogos 18s linear infinite",
                                alignItems: "center",
                            }}
                        >
                            {[
                                "/images/fmb.jpeg",
                                "/images/trsutmark.jpeg",
                                "/images/google5Star.jpeg",
                                "/images/fmb.jpeg",
                                "/images/trsutmark.jpeg",
                                "/images/google5Star.jpeg",
                            ].map((src, i) => (
                                <div
                                    key={i}
                                    style={{
                                        minWidth: "120px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={src}
                                        alt="accreditation"
                                        style={{
                                            maxWidth: "100px",
                                            maxHeight: "60px",
                                            objectFit: "contain",
                                            opacity: 0.9,
                                            filter: "grayscale(100%)",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <style>
                        {`
                        @keyframes scrollLogos {
                            0% {
                                transform: translateX(0);
                            }
                            100% {
                                transform: translateX(-50%);
                            }
                        }
                    `}
                    </style>
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
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "30px",
                    }}
                >
                    <div>
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

                    <DrawingsPlanningForm
                        endpoint="https://formspree.io/f/maqlqgzz"
                        selectedPackage={selectedPackage}
                        title="Request your drawings quote"
                        intro="Tell us what type of project you have and which package you are interested in. We’ll use that to guide the next step."
                    />
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
                        <div style={{ maxWidth: "760px" }}>
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

                        <div style={{ display: "flex", gap: "10px" }}>
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
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "20px",
                            marginTop: "30px",
                        }}
                    >
                        {visibleTestimonials.map((item, index) => (
                            <div key={`${item.name}-${index}`} style={card}>
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
                            gridTemplateColumns: "minmax(280px, 0.9fr) minmax(320px, 1.1fr)",
                            gap: "36px",
                            alignItems: "start",
                        }}
                    >
                        <div
                            style={{
                                position: "sticky",
                                top: "110px",
                                ...card,
                                background: "#1f1f1f",
                                color: "#fff",
                                border: "1px solid #1f1f1f",
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
                                                    gridTemplateColumns: "72px 1fr auto",
                                                    alignItems: "center",
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
                                                        fontSize: "18px",
                                                        letterSpacing: "1px",
                                                        minHeight: "100%",
                                                        padding: "24px 0",
                                                    }}
                                                >
                                                    {item.number}
                                                </div>

                                                <div
                                                    style={{
                                                        padding: "22px 24px",
                                                    }}
                                                >
                                                    <h3
                                                        style={{
                                                            margin: 0,
                                                            fontSize: "22px",
                                                            lineHeight: "1.35",
                                                            color: "#1f1f1f",
                                                        }}
                                                    >
                                                        {item.title}
                                                    </h3>
                                                </div>

                                                <div
                                                    style={{
                                                        paddingRight: "22px",
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
                                                    padding: "0 24px 24px 96px",
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
                        `}
                    </style>
                </div>
            </section>
        </Layout>
    );
}