import Layout, { siteStyles } from "../components/Layout.jsx";

export default function Projects() {
    const { section, tag } = siteStyles;

    return (
        <Layout>
            <section
                style={{
                    borderBottom: "1px solid #e7e5e4",
                    background: "linear-gradient(135deg, #f1ede7, #ffffff, #eae5dd)",
                }}
            >
                <div style={{ ...section, paddingTop: "90px", paddingBottom: "80px" }}>
                    <div style={tag}>Projects</div>

                    <h1
                        style={{
                            fontSize: "clamp(38px, 6vw, 62px)",
                            lineHeight: "1.05",
                            margin: 0,
                            maxWidth: "760px",
                            color: "#A67C00",
                        }}
                    >
                        Recent work and project examples
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
                        A selection of our work across extensions, renovations, fit-outs,
                        and planning packages.
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
                <div
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        padding: "70px 20px",
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            maxWidth: "760px",
                            margin: "0 auto 34px",
                        }}
                    >
                        <div
                            style={{
                                display: "inline-block",
                                padding: "8px 14px",
                                borderRadius: "999px",
                                border: "1px solid #d6d3d1",
                                background: "#fff",
                                fontSize: "12px",
                                fontWeight: "700",
                                letterSpacing: "2px",
                                textTransform: "uppercase",
                                color: "#78716c",
                                marginBottom: "18px",
                            }}
                        >
                            Portfolio Update
                        </div>

                        <h2
                            style={{
                                fontSize: "clamp(30px, 5vw, 46px)",
                                lineHeight: "1.1",
                                margin: 0,
                                color: "#1f1f1f",
                            }}
                        >
                            More work is being added
                        </h2>

                        <p
                            style={{
                                marginTop: "18px",
                                fontSize: "17px",
                                lineHeight: "1.8",
                                color: "#57534e",
                            }}
                        >
                            We’re currently uploading more completed projects to this page,
                            including recent residential and commercial work.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                            gap: "20px",
                        }}
                    >
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                style={{
                                    background: "#fafaf9",
                                    border: "1px solid #e7e5e4",
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    boxShadow: "0 8px 20px rgba(0,0,0,0.03)",
                                }}
                            >
                                <div
                                    style={{
                                        height: "220px",
                                        background: "linear-gradient(135deg, #ece7e1, #f8f6f2)",
                                    }}
                                />

                                <div style={{ padding: "20px" }}>
                                    <div
                                        style={{
                                            height: "14px",
                                            width: "70%",
                                            background: "#e7e5e4",
                                            borderRadius: "999px",
                                            marginBottom: "12px",
                                        }}
                                    />
                                    <div
                                        style={{
                                            height: "12px",
                                            width: "100%",
                                            background: "#f0eeeb",
                                            borderRadius: "999px",
                                            marginBottom: "8px",
                                        }}
                                    />
                                    <div
                                        style={{
                                            height: "12px",
                                            width: "82%",
                                            background: "#f0eeeb",
                                            borderRadius: "999px",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}