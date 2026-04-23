import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout, { siteStyles } from "../components/Layout.jsx";
import { caseStudies } from "../data/caseStudies.js";

export default function CaseStudies() {
    const { section, card, buttonPrimary, tag } = siteStyles;


    const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Crafman Design and Build Case Studies",
    "description": "A collection of design and build projects including extensions and renovations in London and Essex.",
    "itemListElement": caseStudies.map((study, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": study.title,
        "url": `https://crafman.co.uk/case-studies/${study.slug}`,
        "description": study.intro,
        "contentLocation": {
          "@type": "Place",
          "name": study.location // This is huge for ranking in specific London/Essex towns
        }
      }
    }))
  };


    return (
        <Layout>
            <Helmet>
                <title>Case Studies | Crafman Design and Build | London & Essex</title>
                <meta
                    name="description"
                    content="Explore our portfolio of kitchen extensions, loft conversions, and home renovations in London and Essex."
                />
                <link rel="canonical" href="https://crafman.co.uk/case-studies" />
                {/* AI Data Script */}
                {/* ✅ Change all script tags to this: */}
                <script 
                     type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
                    />
            </Helmet>

            <section
                style={{
                    position: "relative",
                    borderBottom: "1px solid #e7e5e4",
                    backgroundImage: "url('/images/case-studies/swiss18.PNG')",
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
                        <div style={tag}>Case Studies</div>

                        <h1
                            style={{
                                fontSize: "clamp(38px, 6vw, 62px)",
                                lineHeight: "1.05",
                                margin: 0,
                                maxWidth: "800px",
                                color: "#A67C00",
                            }}
                        >
                            Recent projects delivered by one design and build team
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
                            Browse a selection of recent projects, including extensions, loft conversions, renovations, and interior transformations. Each case study provides insight into our design thinking, build process, and the results achieved.
                        </p>
                    </div>
                </div>
            </section>

            <section style={section}>
                {/* PORTFOLIO UPDATE ALERT */}
                <div 
                    style={{ 
                        background: "#fef3c7", // Light amber/sand alert background
                        borderLeft: "4px solid #A67C00", 
                        padding: "20px", 
                        borderRadius: "8px", 
                        marginBottom: "40px",
                        maxWidth: "800px" 
                    }}
                >
                    <h4 style={{ margin: "0 0 8px 0", color: "#92400e", fontSize: "16px", fontWeight: "800" }}>
                        🚧 Portfolio Update in Progress
                    </h4>
                    <p style={{ margin: 0, color: "#92400e", fontSize: "15px", lineHeight: "1.5" }}>
                        We are currently migrating our full project history to this new website. The list below is a partial selection; our <strong>complete portfolio is due to be live in approximately 4 weeks.</strong>
                    </p>
                </div>

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
                        Project Preview
                    </div>

                    <h2
                        style={{
                            fontSize: "42px",
                            marginTop: "12px",
                            marginBottom: "12px",
                        }}
                    >
                        Real projects, real results
                    </h2>

                    <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                        Explore our featured projects below to understand how we design and build high-quality spaces. Check back soon to see our expanded gallery.
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
                    {caseStudies.map((study) => (
                        <div
                            key={study.slug}
                            style={{
                                ...card,
                                padding: 0,
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                style={{
                                    height: "220px",
                                    backgroundImage: `url('${study.heroImage}')`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundColor: "#e7e5e4",
                                }}
                            />

                            <div style={{ padding: "24px" }}>
                                <div
                                    style={{
                                        fontSize: "12px",
                                        letterSpacing: "1.5px",
                                        textTransform: "uppercase",
                                        color: "#78716c",
                                        fontWeight: "700",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {study.category} • {study.location}
                                </div>

                                <h3
                                    style={{
                                        marginTop: 0,
                                        marginBottom: "10px",
                                        fontSize: "26px",
                                        lineHeight: "1.15",
                                        color: "#1f1f1f",
                                    }}
                                >
                                    {study.title}
                                </h3>

                                <p
                                    style={{
                                        color: "#57534e",
                                        lineHeight: "1.8",
                                        marginTop: 0,
                                        marginBottom: "18px",
                                    }}
                                >
                                    {study.intro}
                                </p>

                                <Link
                                    to={`/case-studies/${study.slug}`}
                                    style={{
                                        ...buttonPrimary,
                                        display: "inline-flex",
                                        textDecoration: "none",
                                    }}
                                >
                                    View Case Study
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}