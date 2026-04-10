import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout, { siteStyles } from "../components/Layout.jsx";
import { caseStudies } from "../data/caseStudies.js";

export default function CaseStudies() {
    const { section, card, buttonPrimary, tag } = siteStyles;

    return (
        <Layout>
            <Helmet>
                <title>Case Studies | Crafman Design and Build</title>
                <meta
                    name="description"
                    content="Explore recent design and build case studies from Crafman Design and Build across London."
                />
                <link rel="canonical" href="https://crafman.co.uk/case-studies" />
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
                        Selected Work
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
                        Each project showcases our approach from initial challenges through to final delivery, giving you a clear understanding of how we design and build high-quality spaces.
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