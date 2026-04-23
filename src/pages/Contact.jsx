import Layout, { siteStyles } from "../components/Layout.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { Helmet } from "react-helmet-async";
export default function Contact() {
    const { section, card, tag } = siteStyles;
const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.crafman.co.uk/contact#webpage",
      "url": "https://www.crafman.co.uk/contact",
      "name": "Contact Crafman Design and Build | London & Essex Office",
      "description": "Contact our technical team for project consultations, planning advice, and quotes for extensions and renovations."
    },
    {
      "@type": "GeneralContractor",
      "@id": "https://www.crafman.co.uk/#organization", // Links to your master ID
      "name": "Crafman Design and Build",
      "telephone": "+442036335634", // International format is better for global AI models
      "email": "sales@crafman.co.uk",
      "logo": "https://www.crafman.co.uk/images/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Marsh Wy",
        "addressLocality": "London",
        "addressRegion": "Essex",
        "postalCode": "RM13 8EU",
        "addressCountry": "GB"
      },
      // 📍 GEO-COORDINATES: Vital for "Builders Near Me" AI queries
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "51.5244", 
        "longitude": "0.1985"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+442036335634",
        "contactType": "sales",
        "areaServed": ["GB"],
        "availableLanguage": "en"
      }
    }
  ]
};

    return (
        <Layout>

            <Helmet>
    <title>Contact Crafman Design and Build | London & Essex</title>
    <meta
        name="description"
        content="Contact Crafman Design and Build to discuss your house extension, loft conversion or renovation project in London and Essex. Request a consultation today."
    />
    <link rel="canonical" href="https://crafman.co.uk/contact" />
    {/* ✅ Change all script tags to this: */}
<script 
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
/>
</Helmet>
            <section
                style={{
                    borderBottom: "1px solid #e7e5e4",
                    background: "linear-gradient(135deg, #f1ede7, #ffffff, #eae5dd)",
                }}
            >
                <div style={{ ...section, paddingTop: "90px", paddingBottom: "80px" }}>
                    <div style={tag}>Contact</div>

                    <h1
                        style={{
                            fontSize: "clamp(38px, 6vw, 62px)",
                            lineHeight: "1.05",
                            margin: 0,
                            maxWidth: "760px",
                            color: "#A67C00",
                        }}
                    >
                        Tell us about your project and we’ll help you plan the best next step.
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
                        Whether you’re planning an extension, renovation, fit-out, or something
                        more bespoke, send us a few details and we’ll get back to you.
                    </p>
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
                        <ContactForm endpoint="https://formspree.io/f/mnjlqwgn" />
                    </div>

                    <div style={{ display: "grid", gap: "20px" }}>
                        <div
                            style={{
                                background: "#1f1f1f",
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
    <div style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#78716c", fontWeight: "700" }}>
        Direct Contact
    </div>
    <h3 style={{ fontSize: "28px", marginTop: "12px", marginBottom: "12px" }}>
        Prefer to contact us directly?
    </h3>
    <div style={{ color: "#57534e", lineHeight: "1.9" }}>
        <p><strong>Phone:</strong> 02036335634</p>
        <p><strong>Email:</strong> sales@crafman.co.uk</p> {/* Updated to sales@ */}
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
        </Layout>
    );
}