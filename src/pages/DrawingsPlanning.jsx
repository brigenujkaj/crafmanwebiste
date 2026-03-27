import { useState } from "react";
import Layout, { siteStyles } from "../components/Layout.jsx";

export default function DrawingsPlanning() {
  const { section, card, buttonPrimary, buttonSecondary, tag } = siteStyles;

  const [selectedPackage, setSelectedPackage] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #d6d3d1",
    fontSize: "15px",
    boxSizing: "border-box",
    background: "#fff",
  };

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

  const [testimonialIndex, setTestimonialIndex] = useState(0);

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
              color: "#A67C00"
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
              Prices start from <strong>£750</strong>. Select a package below and
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

          <form
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "grid", gap: "14px" }}>
              <input placeholder="Your name" style={inputStyle} />
              <input placeholder="Email address" style={inputStyle} />
              <input placeholder="Phone number" style={inputStyle} />

              <select style={inputStyle} defaultValue="">
                <option value="" disabled>
                  Project type
                </option>
                <option>Extension</option>
                <option>Loft Conversion</option>
                <option>Internal Reconfiguration</option>
              </select>

              <select value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)} style={inputStyle}>
                <option value="">Package of interest</option>
                <option>Starter Package</option>
                <option>Planning Package</option>
                <option>Technical Package</option>
              </select>

              <textarea
                placeholder="Tell us a little about the project"
                rows="5"
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />

              <button
                type="button"
                style={{
                  background: "#1c1917",
                  color: "#fff",
                  padding: "14px 20px",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Request Quote
              </button>
            </div>
          </form>
        </div>
      </section>

      <section style={section}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
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
              How It Works
            </div>

            <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "12px" }}>
              A clear route from survey to submission
            </h2>

            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              We shape the package around the stage your project is at. Some
              clients just need the core drawing set, while others need planning
              submission support and technical drawings as well.
            </p>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {[
              "Measured survey of the property",
              "Current scaled drawings",
              "Proposed scaled drawings",
              "Elevations and optional 3D visuals",
              "Submission to council where required",
              "Building control drawings in the fuller package",
            ].map((item, i) => (
              <div
                key={item}
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
                <p style={{ margin: 0, color: "#57534e", lineHeight: "1.8" }}>
                  {item}
                </p>
              </div>
            ))}
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
        <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px", color: "#A67C00" }}>
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

      <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "20px" }}>
        Drawings, planning permission and permitted development FAQs
      </h2>
    </div>

    <div style={{ display: "grid", gap: "16px" }}>
      <div style={card}>
        <h3 style={{ marginTop: 0 }}>
          Do I need planning permission for an extension?
        </h3>
        <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
          Some extensions need planning permission, while others may fall under
          permitted development. This depends on the size, design, location,
          and type of property involved.
        </p>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>
          What is permitted development?
        </h3>
        <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
          Permitted development allows certain works to be carried out without a
          full planning application, as long as the project stays within the
          relevant limits and conditions.
        </p>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>
          Do loft conversions always need planning permission?
        </h3>
        <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
          Not always. Some loft conversions can fall under permitted
          development, but others may need planning permission depending on the
          roof changes, design, property type, and local restrictions.
        </p>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>
          Does internal reconfiguration need planning permission?
        </h3>
        <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
          Internal reconfiguration often does not need planning permission, but
          it may still require building control input, structural design, or
          other technical drawings depending on the works involved.
        </p>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>
          What types of projects can you prepare drawings for?
        </h3>
        <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
          We can prepare drawings for rear extensions, side return extensions,
          wraparound extensions, loft conversions, and internal layout changes,
          as well as other residential improvement works.
        </p>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>
          What drawings are included in your packages?
        </h3>
        <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
          Depending on the package, drawings can include a measured survey,
          current scaled drawings, proposed scaled drawings, elevations, 3D
          rendering on request, council submission support, and building control
          drawings.
        </p>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>
          What is the difference between planning drawings and building control drawings?
        </h3>
        <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
          Planning drawings are usually prepared to support a planning
          application or show the design proposal clearly. Building control
          drawings go further into technical detail for compliance and
          construction requirements.
        </p>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>
          Can you submit drawings to the council for me?
        </h3>
        <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
          Yes. Our planning package and technical package can include submission
          to the council, depending on the level of support you need.
        </p>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>
          Do I need a measured survey before drawings are prepared?
        </h3>
        <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
          In most cases, yes. A measured survey helps create an accurate base
          for the existing and proposed drawings, which is important for both
          planning and technical accuracy.
        </p>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>
          Can you advise whether my project is likely to fall under permitted development?
        </h3>
        <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
          We can help review the type of project you are planning and guide you
          on whether it may fall under permitted development or is more likely
          to need a planning application.
        </p>
      </div>
    </div>
  </div>
</section>
     
    </Layout>
  );
}