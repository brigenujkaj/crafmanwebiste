import { Link } from "react-router-dom";
import Layout, { siteStyles } from "../components/DrawingsLayout.jsx";
import ExtensionCalculator from "../components/ExtensionCalculator";
import { useState } from "react";
import ContactForm from "../components/ContactForm.jsx";

import { Helmet } from "react-helmet-async";
export default function HouseExtensionsEssex() {
    const { section, card, buttonPrimary, buttonSecondary, tag } = siteStyles;

    const [testimonialIndex, setTestimonialIndex] = useState(0);

    const testimonials = [
        {
            name: "James Turner",
            role: "Homeowner, Essex",
            text: "Really happy with the service from start to finish. The team was organised, easy to deal with, and the final result came out exactly how we wanted.",
        },
        {
            name: "Sarah Whitmore",
            role: "Property Client, Essex",
            text: "The communication was clear throughout and the project felt properly managed. We appreciated having one team handling both the design and build side.",
        },
        {
            name: "Daniel Hughes",
            role: "Commercial Client, Essex",
            text: "Professional, practical, and detail-focused. The finish quality was strong and the whole process felt much smoother than expected.",
        },
        {
            name: "Charlotte Bennett",
            role: "Homeowner, Surrey",
            text: "From the early design stage through to completion, everything felt well organised. The team understood exactly what we were trying to achieve.",
        },
        {
            name: "Oliver Reynolds",
            role: "Landlord, Essex",
            text: "Very good experience overall. Straightforward communication, sensible advice, and a high standard of work across the project.",
        },
        {
            name: "Emily Carter",
            role: "Homeowner, Hertfordshire",
            text: "The process felt clear from the start and the finished space has completely changed how we use our home. Very pleased with the result.",
        },
        {
            name: "William Foster",
            role: "Business Owner, Essex",
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

    return (
        <Layout>
            <Helmet>
                <title>House Extensions & Loft Conversions Essex | Crafman</title>
                <meta
                    name="description"
                    content="House extensions and loft conversions in Essex by Crafman Design and Build. One team managing design, planning and build from start to finish."
                />
                <link rel="canonical" href="https://crafman.co.uk/house-extensions-essex" />

            </Helmet>

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
                        <div style={tag}>House Extensions Essex</div>

                        <h1
                            style={{
                                fontSize: "clamp(38px, 6vw, 60px)",
                                lineHeight: "1.05",
                                margin: 0,
                                maxWidth: "760px",
                                color: "#A67C00",
                            }}
                        >
                            House extensions in Essex delivered by one experienced design and build team.
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
                            <Link to="/contact" style={buttonPrimary}>
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
                            House extension services in Essex
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
                                Make better use of unused side space in Essex terraced and
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
                        <ContactForm endpoint="https://formspree.io/f/mojpjokd" />
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
                                <p><strong>Email:</strong> info@crafman.co.uk</p>
                                <p><strong>Location:</strong> Essex, United Kingdom</p>
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
                        We work with a range of clients across Essex, including homeowners
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
                            Many house extensions in Essex involve planning permission,
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
                    </div>
                </div>
            </section>

            <section id="process" style={section}>
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
                        Our Process
                    </div>
                    <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "20px" }}>
                        A clear extension process from start to finish
                    </h2>
                </div>

                <div style={{ display: "grid", gap: "16px" }}>
                    {[
                        {
                            title: "1. Initial Consultation",
                            text: "We discuss the property, your goals, your budget, and the type of extension likely to work best.",
                        },
                        {
                            title: "2. Design and Scope Development",
                            text: "We shape the layout, define the extension works, and create a practical project route.",
                        },
                        {
                            title: "3. Costing and Programme",
                            text: "We clarify likely timings, scope, and delivery expectations so the project starts with better alignment.",
                        },
                        {
                            title: "4. Build and Delivery",
                            text: "Our team manages the extension works carefully, focusing on progress, quality, and communication throughout.",
                        },
                    ].map((item, i) => (
                        <div
                            key={item.title}
                            style={{
                                ...card,
                                display: "flex",
                                gap: "16px",
                                alignItems: "flex-start",
                            }}
                        >
                            <div
                                style={{
                                    height: "40px",
                                    width: "40px",
                                    borderRadius: "999px",
                                    background: "#1f1f1f",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "700",
                                    flexShrink: 0,
                                }}
                            >
                                {i + 1}
                            </div>
                            <div>
                                <h3 style={{ marginTop: 0, marginBottom: "10px" }}>{item.title}</h3>
                                <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                                    {item.text}
                                </p>
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
                            Why clients choose Crafman Design and Build for house extensions in Essex
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
                        <div style={card}>Practical experience with Essex properties</div>
                        <div style={card}>Clear communication and project oversight</div>
                        <div style={card}>Focus on quality finish and everyday usability</div>
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
                            House extensions Essex FAQs
                        </h2>
                    </div>

                    <div style={{ display: "grid", gap: "16px" }}>
                        <div style={card}>
                            <h3 style={{ marginTop: 0 }}>How much does a house extension in Essex cost?</h3>
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
                            Talk to us about your extension project in Essex
                        </h2>
                        <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                            If you are planning a house extension in Essex, contact Crafman
                            Design and Build to discuss your property, ideas, budget, and the
                            best route forward.
                        </p>

                        <div style={{ marginTop: "20px", color: "#44403c", lineHeight: "1.9" }}>
                            <p><strong>Phone:</strong> 02036335634</p>
                            <p><strong>Email:</strong> info@crafman.co.uk</p>
                            <p><strong>Location:</strong> Essex, UK</p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}