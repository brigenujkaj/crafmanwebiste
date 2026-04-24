import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout, { siteStyles } from "../components/Layout.jsx";
import { caseStudies } from "../data/caseStudies.js";

export default function CaseStudyDetail() {
    const { slug } = useParams();
    const { section, card, buttonPrimary, buttonSecondary, tag } = siteStyles;

    const study = caseStudies.find((item) => item.slug === slug);

    if (!study) {
        return (
            <Layout>
                <section style={section}>
                    <div style={{ maxWidth: "760px" }}>
                        <div style={tag}>Case Study</div>
                        <h1
                            style={{
                                fontSize: "42px",
                                marginTop: "12px",
                                marginBottom: "12px",
                                color: "#1f1f1f",
                            }}
                        >
                            Case study not found
                        </h1>
                        <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                            We couldn’t find the project you were looking for.
                        </p>
                        <Link to="/case-studies" style={buttonPrimary}>
                            Back to Case Studies
                        </Link>
                    </div>
                </section>
            </Layout>
        );
    }


 const detailSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GeneralContractor",
      "@id": "https://www.crafman.co.uk/#organization",
      "name": "Crafman Design and Build",
      "legalName": "Crafman Building and Landscaping Ltd",
      "url": "https://www.crafman.co.uk",
      "logo": "https://www.crafman.co.uk/images/logo.png"
    },
    {
      "@type": "Article",
      "@id": `https://www.crafman.co.uk/case-studies/${slug}#article`,
      "headline": study ? study.title : "Construction Case Study",
      "description": study ? study.intro : "",
      "image": study ? study.heroImage : "",
      "author": { "@id": "https://www.crafman.co.uk/#organization" },
      "publisher": { "@id": "https://www.crafman.co.uk/#organization" },
      "contentLocation": {
        "@type": "Place",
        "name": study ? study.location : "London"
      },
      // 🏗️ TECHNICAL DATA FOR AI EXTRACTION
      "mainEntity": {
        "@type": "Project",
        "name": study ? study.title : "Crafman Project",
        "category": study ? study.category : "Residential Construction",
        "abstract": study ? `Technical Challenge: ${study.challenge}. Solution: ${study.solution}. Final Outcome: ${study.outcome}` : ""
      }
    }
  ]
};

    return (
        <Layout>
            <Helmet>
    <title>{study.title} | Crafman Design and Build</title>
    <meta name="description" content={study.intro} />
    <link
        rel="canonical"
        href={`https://crafman.co.uk/case-studies/${study.slug}`}
    />
    {/* The AI Authority Script */}
    {/* ✅ Change all script tags to this: */}
<script 
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(detailSchema) }}
/>
</Helmet>

            <section
                style={{
                    position: "relative",
                    borderBottom: "1px solid #e7e5e4",
                    backgroundImage: `url('${study.heroImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(135deg, rgba(241,237,231,0.9), rgba(255,255,255,0.86), rgba(234,229,221,0.9))",
                        zIndex: 1,
                    }}
                />

                <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{ ...section, paddingTop: "90px", paddingBottom: "90px" }}>
                        <div style={tag}>{study.category}</div>

                        <h1
                            style={{
                                fontSize: "clamp(38px, 6vw, 62px)",
                                lineHeight: "1.05",
                                margin: 0,
                                maxWidth: "800px",
                                color: "#A67C00",
                            }}
                        >
                            {study.title}
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
                            {study.intro}
                        </p>

                        <div
                            style={{
                                marginTop: "28px",
                                display: "flex",
                                gap: "14px",
                                flexWrap: "wrap",
                            }}
                        >
                            <Link to="/contact" style={buttonPrimary}>
                                Discuss a Similar Project
                            </Link>
                            <Link to="/case-studies" style={buttonSecondary}>
                                Back to Case Studies
                            </Link>
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
                            Project Overview
                        </div>

                        <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px" }}>
                            A closer look at the project
                        </h2>

                        <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                            {study.overview}
                        </p>

                        <div style={{ marginTop: "30px", display: "grid", gap: "24px" }}>
                            <div>
                                <h3 style={{ marginBottom: "10px" }}>The Challenge</h3>
                                <p style={{ color: "#57534e", lineHeight: "1.8", margin: 0 }}>
                                    {study.challenge}
                                </p>
                            </div>

                            <div>
                                <h3 style={{ marginBottom: "10px" }}>The Solution</h3>
                                <p style={{ color: "#57534e", lineHeight: "1.8", margin: 0 }}>
                                    {study.solution}
                                </p>
                            </div>

                            <div>
                                <h3 style={{ marginBottom: "10px" }}>The Outcome</h3>
                                <p style={{ color: "#57534e", lineHeight: "1.8", margin: 0 }}>
                                    {study.outcome}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "grid", gap: "20px" }}>
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
                                Project Details
                            </div>

                            <div style={{ marginTop: "18px", display: "grid", gap: "14px" }}>
                                {study.stats.map((item) => (
                                    <div key={item.label}>
                                        <div
                                            style={{
                                                fontSize: "13px",
                                                color: "#78716c",
                                                marginBottom: "4px",
                                            }}
                                        >
                                            {item.label}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "700",
                                                color: "#1f1f1f",
                                            }}
                                        >
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                background: "#A67C00",
                                color: "#fff",
                                borderRadius: "24px",
                                padding: "26px",
                                boxShadow: "0 10px 28px rgba(0,0,0,0.14)",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "12px",
                                    letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    color: "#e7e5e4",
                                    fontWeight: "700",
                                }}
                            >
                                Services Included
                            </div>

                            <div
                                style={{
                                    marginTop: "18px",
                                    display: "grid",
                                    gap: "12px",
                                    lineHeight: "1.8",
                                    color: "#f5f5f4",
                                }}
                            >
                                {study.services.map((service) => (
                                    <div key={service}>• {service}</div>
                                ))}
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
                <div style={section}>
                    <div
                        style={{
                            fontSize: "12px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: "#78716c",
                            fontWeight: "700",
                        }}
                    >
                        Gallery
                    </div>

                    <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px" }}>
                        Project Outcome
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "20px",
                            marginTop: "30px",
                        }}
                    >
                        {study.gallery.map((image, index) => (
                            <div
                                key={`${image}-${index}`}
                                style={{
                                    height: "260px",
                                    borderRadius: "20px",
                                    backgroundImage: `url('${image}')`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundColor: "#e7e5e4",
                                    border: "1px solid #ddd",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}