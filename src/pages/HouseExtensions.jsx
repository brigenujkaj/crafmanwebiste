import { Link } from "react-router-dom";
import Layout, { siteStyles } from "../components/Layout.jsx";
import ExtensionCalculator from "../components/ExtensionCalculator";
import { useState } from "react";
import ContactForm from "../components/ContactForm.jsx";

import { Helmet } from "react-helmet-async";
export default function HouseExtensions() {
    const { section, card, buttonPrimary, buttonSecondary, tag } = siteStyles;

    const [testimonialIndex, setTestimonialIndex] = useState(0);

    const testimonials = [
        {
            name: "James Turner",
            role: "Homeowner, London & Essex",
            text: "Really happy with the service from start to finish. The team was organised, easy to deal with, and the final result came out exactly how we wanted.",
        },
        {
            name: "Sarah Whitmore",
            role: "Property Client, London & Essex",
            text: "The communication was clear throughout and the project felt properly managed. We appreciated having one team handling both the design and build side.",
        },
        {
            name: "Daniel Hughes",
            role: "Commercial Client, London & Essex",
            text: "Professional, practical, and detail-focused. The finish quality was strong and the whole process felt much smoother than expected.",
        },
        {
            name: "Charlotte Bennett",
            role: "Homeowner, Surrey",
            text: "From the early design stage through to completion, everything felt well organised. The team understood exactly what we were trying to achieve.",
        },
        {
            name: "Oliver Reynolds",
            role: "Landlord, London & Essex",
            text: "Very good experience overall. Straightforward communication, sensible advice, and a high standard of work across the project.",
        },
        {
            name: "Emily Carter",
            role: "Homeowner, Hertfordshire",
            text: "The process felt clear from the start and the finished space has completely changed how we use our home. Very pleased with the result.",
        },
        {
            name: "William Foster",
            role: "Business Owner, London & Essex",
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

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        otherService: "",
        startTime: "",
        ownsProperty: "",
        contactDays: [],
        contactTime: "",
        message: "",
    });

    const serviceOptions = [
        "House Extensions",
        "Loft Conversions",
        "Home Renovations",
        "Refurbishments",
        "Commercial Fit-Outs",
        "Internal Reconfiguration",
        "Planning Permission Support",
        "Project Management",
        "Kitchen Renovation",
        "Bathroom Renovation",
        "Drawings & Planning",
        "Other",
    ];

    const dayOptions = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const startOptions = [
        "As soon as possible",
        "Within 1 month",
        "Within 3 months",
        "Within 6 months",
        "Just exploring for now",
    ];

    const contactTimeOptions = [
        "Morning",
        "Afternoon",
        "Evening",
        "Any time",
    ];

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function toggleDay(day) {
        setForm((prev) => ({
            ...prev,
            contactDays: prev.contactDays.includes(day)
                ? prev.contactDays.filter((d) => d !== day)
                : [...prev.contactDays, day],
        }));
    }

    const inputStyle = {
        width: "100%",
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid #d6d3d1",
        fontSize: "15px",
        boxSizing: "border-box",
        background: "#fff",
    };

    const labelStyle = {
        display: "grid",
        gap: "8px",
    };

    const pillStyle = (active) => ({
        padding: "12px 14px",
        borderRadius: "12px",
        border: active ? "1px solid #1c1917" : "1px solid #d6d3d1",
        background: active ? "#1c1917" : "#fff",
        color: active ? "#fff" : "#1f1f1f",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "14px",
        textAlign: "center",
    });

    const extensionSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "House Extension Services London & Essex",
    "description": "Premium design and build services for rear, side-return, and wraparound extensions in London and Essex.",
    "provider": {
      "@type": "GeneralContractor",
      "name": "Crafman Design and Build",
      "url": "https://crafman.co.uk",
      "telephone": "02036335634",
      "email": "sales@crafman.co.uk"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "London" },
      { "@type": "AdministrativeArea", "name": "Essex" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Extension Types",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Rear Extensions" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Side Return Extensions" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wraparound Extensions" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Double Storey Extensions" } }
      ]
    },
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a house extension in London & Essex cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Extension costs vary based on size and design. Crafman provides a dedicated Extension Calculator to help London and Essex homeowners estimate budgets."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need planning permission for an extension?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Some projects fall under Permitted Development, while others require full Planning Permission. Crafman manages the entire approval process for clients."
        }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": testimonials.length.toString()
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": t.name },
      "reviewBody": t.text,
      "reviewRating": { "@type": "Rating", "ratingValue": "5" }
    }))
  };

    return (
        <Layout>
          <Helmet>
    <title>House Extensions & Loft Conversions London & Essex | Crafman</title>
    <meta 
        name="description" 
        content="Expert design and build for house extensions in London and Essex. Calculate your extension costs and book a consultation with our experienced team." 
    />
    <link rel="canonical" href="https://crafman.co.uk/house-extensions" />
    
    {/* AI Knowledge Script */}
    <script type="application/ld+json">
        {JSON.stringify(extensionSchema)}
    </script>

    {/* Tracking Scripts */}
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-PSQRZ8RM81"></script>
    <script>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PSQRZ8RM81');
            gtag('config', 'AW-16534080284');
        `}
    </script>
</Helmet>

            {/* Accreditation Section - Slightly Bigger Row */}
            <section
                style={{
                    background: "#fff",
                    borderTop: "1px solid #e7e5e4",
                    borderBottom: "1px solid #e7e5e4",
                    paddingTop: "20px", // Slightly more vertical padding for the bigger logos
                    paddingBottom: "20px",
                }}
            >
                <div style={{ ...section, paddingTop: 0, paddingBottom: 0 }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            gap: "28px",
                            maxWidth: "100%",
                            margin: "0 auto",
                            padding: "0 10px",
                            overflow: "hidden"
                        }}
                    >
                        {[
                            { src: "/images/fmb.jpeg", alt: "FMB", height: "58px" },
                            { src: "/images/trustmark.jpeg", alt: "Trustmark", height: "58px" },
                            { src: "/images/google5Star.jpeg", alt: "Google Reviews", height: "68px" },
                        ].map((logo, index) => (
                            <img
                                key={index}
                                src={logo.src}
                                alt={logo.alt}
                                style={{
                                    height: logo.height, // Increased for better visibility
                                    width: "auto",
                                    objectFit: "contain",
                                    flexShrink: 0
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    borderBottom: "1px solid #e7e5e4",
                    backgroundImage: "url('/images/extensionBackground.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    overflow: "hidden",
                }}
            >
                {/* 🔥 Subtle blur + overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backdropFilter: "blur(3px)",
                        WebkitBackdropFilter: "blur(3px)",
                        background:
                            "linear-gradient(135deg, rgba(241,237,231,0.85), rgba(255,255,255,0.82), rgba(234,229,221,0.85))",
                        zIndex: 1,
                    }}
                />

                {/* 🔥 Content */}
                <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{ ...section, paddingTop: "80px", paddingBottom: "80px" }}>
                        <div style={tag}>House Extensions London & Essex</div>

                        <h1
                            style={{
                                fontSize: "clamp(38px, 6vw, 60px)",
                                lineHeight: "1.05",
                                margin: 0,
                                maxWidth: "760px",
                                color: "#A67C00",
                            }}
                        >
                            House extensions in London & Essex delivered by one experienced design and build team.
                        </h1>

                   

                        <div
                            style={{
                                marginTop: "28px",
                                display: "flex",
                                gap: "14px",
                                flexWrap: "wrap",
                            }}
                        >
                            <Link to="/contact" style={buttonPrimary}>
                                Start Consultation
                            </Link>
                            <Link to="/case-studies" style={buttonPrimary}>
                                Request Brochure
                            </Link>
                            <a href="#services" style={buttonSecondary}>
                                View Extension Services
                            </a>

                        </div>
                    </div>
                </div>
            </section>

            <ExtensionCalculator />

            <section
                id="services"
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
                            Extension Services
                        </div>
                        <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px", color: "#A67C00" }}>
                            House extension services in London & Essex
                        </h2>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "20px",
                            marginTop: "30px",
                        }}
                    >
                        <div style={card}>
                            <h3 style={{ marginTop: 0 }}>Rear Extensions</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                                Open up the back of your home and create larger kitchen, dining,
                                and family spaces with better light and flow.
                            </p>
                        </div>

                        <div style={card}>
                            <h3 style={{ marginTop: 0 }}>Side Return Extensions</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                                Make better use of unused side space in London & Essex terraced and
                                period homes with a practical layout upgrade.
                            </p>
                        </div>

                        <div style={card}>
                            <h3 style={{ marginTop: 0 }}>Wraparound Extensions</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                                Combine rear and side extension space for a more substantial
                                transformation and open-plan layout.
                            </p>
                        </div>

                        <div style={card}>
                            <h3 style={{ marginTop: 0 }}>Single Storey Extensions</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                                A practical option for improving ground floor living space while
                                keeping the project efficient and focused.
                            </p>
                        </div>

                        <div style={card}>
                            <h3 style={{ marginTop: 0 }}>Double Storey Extensions</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                                Add useful extra space across more than one level and improve
                                both living and bedroom accommodation.
                            </p>
                        </div>

                        <div style={card}>
                            <h3 style={{ marginTop: 0 }}>Internal Reconfiguration</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                                Many extensions work best alongside internal changes that improve
                                circulation, function, and day-to-day usability.
                            </p>
                        </div>

                        <Link to="/contact" style={buttonPrimary}>
                            Start Consultation
                        </Link>

                    </div>

                    

                </div>



            </section>
            


            <section style={section}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "28px",
                        alignItems: "start",
                    }}
                >

                   <div style={{ display: "grid", gap: "20px" }}>
                       <ContactForm 
                            endpoint="https://formspree.io/f/mnjlqwgn" 
                             onSuccess={() => {
                             if (typeof window.gtag !== 'undefined') {
                              window.gtag('event', 'conversion', {
                               'send_to': 'AW-16534080284/ooPfCN2175McEJyWiMw9',
                               'value': 1.0,
                               'currency': 'GBP'
                         });
                            }
                 }} 
    />
</div>

                    <div style={{ display: "grid", gap: "20px" }}>
                        <div
                            style={{
                                background: "#A67C00",
                                color: "#fff",
                                borderRadius: "24px",
                                padding: "30px",
                                boxShadow: "0 10px 28px rgba(0,0,0,0.14)",
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
                                Why enquire with us
                            </div>

                            <h2 style={{ fontSize: "30px", marginTop: "12px", marginBottom: "12px" }}>
                                A smoother start to your project
                            </h2>

                            <div style={{ display: "grid", gap: "14px", color: "#f5f5f4", lineHeight: "1.8" }}>
                                <div>• Clear early guidance on project direction</div>
                                <div>• Practical input on design and buildability</div>
                                <div>• Help with planning and approvals where needed</div>
                                <div>• One team focused on quality and delivery</div>
                            </div>
                        </div>

                        <div style={card}>
                            <div
                                style={{
                                    fontSize: "12px",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    color: "#78716c",
                                    fontWeight: "700",
                                }}
                            >
                                Direct Contact
                            </div>

                            <h3 style={{ fontSize: "28px", marginTop: "12px", marginBottom: "12px" }}>
                                Prefer to contact us directly?
                            </h3>

                            <div style={{ color: "#57534e", lineHeight: "1.9" }}>
                                <p><strong>Phone:</strong> 02036335634</p>
                                <p><strong>Email:</strong> sales@crafman.co.uk</p>
                                <p><strong>Location:</strong> London & Essex, United Kingdom</p>
                            </div>
                        </div>

                        <div style={card}>
                            <div
                                style={{
                                    fontSize: "12px",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    color: "#78716c",
                                    fontWeight: "700",
                                }}
                            >
                                What Happens Next
                            </div>

                            <h3 style={{ fontSize: "28px", marginTop: "12px", marginBottom: "12px" }}>
                                A simple next step
                            </h3>

                            <div style={{ display: "grid", gap: "12px", color: "#57534e", lineHeight: "1.8" }}>
                                <div>1. We review your enquiry</div>
                                <div>2. We contact you on your preferred days and times</div>
                                <div>3. We discuss scope, goals, and the best route forward</div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

            <section style={section}>
                <div style={{ maxWidth: "820px" }}>
                    <div
                        style={{
                            fontSize: "12px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: "#78716c",
                            fontWeight: "700",
                        }}
                    >
                        Who We Work With
                    </div>
                    <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px" }}>
                        Extension support for homeowners, landlords, and developers
                    </h2>
                    <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                        We work with a range of clients across London & Essex, including homeowners
                        creating more space for their families, landlords improving rental
                        properties, and developers looking to add layout and resale value
                        through extension works.
                    </p>
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
                    <div style={{ maxWidth: "800px" }}>
                        <div
                            style={{
                                fontSize: "12px",
                                letterSpacing: "2px",
                                textTransform: "uppercase",
                                color: "#78716c",
                                fontWeight: "700",
                            }}
                        >
                            Planning Permission Management
                        </div>

                        <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px", color: "#A67C00" }}>
                            We can help manage planning permission and approvals
                        </h2>

                        <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                            Many house extensions in London & Essex involve planning permission,
                            permitted development rules, building control requirements, or
                            structural coordination. As part of our design and build service,
                            we help manage the planning permission process and support the
                            approvals needed to move your extension forward.
                        </p>

                        <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                            This includes helping define the right approach, preparing and
                            coordinating drawings and documents, and keeping the project
                            organised so approvals do not become an unnecessary barrier to
                            progress.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                            gap: "20px",
                            marginTop: "30px",
                        }}
                    >
                        <div style={card}>Planning permission management</div>
                        <div style={card}>Permitted development guidance</div>
                        <div style={card}>Technical drawings and documentation</div>
                        <div style={card}>Building control and project coordination</div>

                        <Link to="/contact" style={buttonPrimary}>
                            Start Consultation
                        </Link>
                    </div>


                </div>
            </section>

            <section id="process" style={{ ...section, backgroundColor: "#ffffff" }}>
                <div style={{ maxWidth: "760px", marginBottom: "40px", padding: "0 20px" }}>
                    <div
                        style={{
                            fontSize: "12px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: "#78716c",
                            fontWeight: "700",
                        }}
                    >
                        The Crafman Way
                    </div>
                    <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "20px", color: "#1c1917" }}>
                        A seamless journey from initial sketch to final build
                    </h2>
                </div>

                {/* Process Cards Container */}
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "24px",
                    padding: "0 20px",
                    marginBottom: "40px",
                    width: "100%",
                    maxWidth: "1200px"
                }}>
                    {[
                        {
                            step: "1. Expert On-Site Consultation",
                            desc: "We visit your property to evaluate the space and discuss your vision, providing technical insights from the very first meeting.",
                            icon: (
                                <div style={{ backgroundColor: "#FF3B00", padding: "8px", borderRadius: "4px", width: "fit-content" }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" /></svg>
                                </div>
                            )
                        },
                        {
                            step: "2. Precision Design & Planning",
                            desc: "Our team develops detailed architectural drawings and manages the entire planning application process on your behalf.",
                            icon: (
                                <div style={{ backgroundColor: "#FF3B00", padding: "8px", borderRadius: "4px", width: "fit-content" }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" /></svg>
                                </div>
                            )
                        },
                        {
                            step: "3. Masterful Construction",
                            desc: "We transition from paper to project, managing the full build with precision and delivering a high-end, move-in ready space.",
                            icon: (
                                <div style={{ backgroundColor: "#FF3B00", padding: "8px", borderRadius: "4px", width: "fit-content" }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                                </div>
                            )
                        }
                    ].map((item, index) => (
                        <div key={index} style={{
                            flex: "1 1 300px",
                            maxWidth: "380px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #e7e5e4",
                            borderRadius: "12px",
                            padding: "40px 30px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" // Added a very subtle shadow for depth
                        }}>
                            {item.icon}
                            <h3 style={{ fontSize: "18px", fontWeight: "700", margin: 0, color: "#1c1917" }}>{item.step}</h3>
                            <p style={{ fontSize: "16px", color: "#44403c", margin: 0, lineHeight: "1.6" }}>{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to="/contact" style={buttonPrimary}>
                        Book Your Consultation
                    </Link>
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
                            Why Work With Us
                        </div>
                        <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px", color: "#A67C00" }}>
                            Why clients choose Crafman Design and Build for house extensions in London & Essex
                        </h2>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                            gap: "20px",
                            marginTop: "30px",
                        }}
                    >
                        <div style={card}>One team managing design and build</div>
                        <div style={card}>Practical experience with London & Essex properties</div>
                        <div style={card}>Clear communication and project oversight</div>
                        <div style={card}>Focus on quality finish and everyday usability</div>

                        <Link to="/contact" style={buttonPrimary}>
                            Start Consultation
                        </Link>
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
                                Testimonials
                            </div>
                            <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px" }}>
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
                    background: "#efebe6",
                }}
            >
                <div style={section}>
                    <div style={{ maxWidth: "820px" }}>
                        <div
                            style={{
                                fontSize: "12px",
                                letterSpacing: "2px",
                                textTransform: "uppercase",
                                color: "#78716c",
                                fontWeight: "700",
                            }}
                        >
                            Frequently Asked Questions
                        </div>
                        <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "20px" }}>
                            House extensions London & Essex FAQs
                        </h2>
                    </div>

                    <div style={{ display: "grid", gap: "16px" }}>
                        <div style={card}>
                            <h3 style={{ marginTop: 0 }}>How much does a house extension in London & Essex cost?</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                                Costs depend on the size, structure, design, finish, and planning
                                requirements of the project. We help define the scope clearly so
                                expectations are more realistic before works begin.
                            </p>
                        </div>

                        <div style={card}>
                            <h3 style={{ marginTop: 0 }}>Do I need planning permission for a house extension?</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                                Some extensions need planning permission, while others may fall
                                under permitted development. This depends on the property, the
                                location, and the type of extension proposed.
                            </p>
                        </div>

                        <div style={card}>
                            <h3 style={{ marginTop: 0 }}>Can you manage planning permission for me?</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                                Yes. We can help manage planning permission and coordinate the
                                related process, including documentation, design information,
                                and the wider project requirements around approvals.
                            </p>
                        </div>

                        <div style={card}>
                            <h3 style={{ marginTop: 0 }}>What type of extension is best for my home?</h3>
                            <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                                That depends on your layout, goals, and the constraints of the
                                property. Rear, side return, wraparound, and double storey
                                options all suit different homes and objectives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" style={{ ...section, paddingBottom: "80px" }}>
                <div
                    style={{
                        background: "#ffffff",
                        border: "1px solid #ddd",
                        borderRadius: "24px",
                        padding: "32px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
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
                            Contact
                        </div>
                        <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px" }}>
                            Talk to us about your extension project in London & Essex
                        </h2>
                        <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                            If you are planning a house extension in London & Essex, contact Crafman
                            Design and Build to discuss your property, ideas, budget, and the
                            best route forward.
                        </p>

                        <div style={{ marginTop: "20px", color: "#44403c", lineHeight: "1.9" }}>
                            <p><strong>Phone:</strong> 02036335634</p>
                            <p><strong>Email:</strong> sales@crafman.co.uk</p>
                            <p><strong>Location:</strong> London & Essex, UK</p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}