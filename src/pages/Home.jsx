import { Link } from "react-router-dom";
import Layout, { siteStyles } from "../components/Layout.jsx";
import { useState } from "react";
import ContactForm from "../components/ContactForm.jsx";
import { Helmet } from "react-helmet-async";
export default function Home() {
  const { section, card, buttonPrimary, buttonSecondary, tag } = siteStyles;

  const services = [
    {
      title: "Design & Planning",
      text: "Concept design, space planning, technical drawings, and clear project roadmaps tailored to your goals.",
    },
    {
      title: "Build & Renovation",
      text: "High-quality construction, refurbishments, extensions, and fit-outs delivered with attention to detail.",
    },
    {
      title: "Project Management",
      text: "End-to-end coordination covering timelines, trades, budgets, and communication from start to finish.",
    },
  ];

  const projects = [
    {
      name: "Modern Home Extension",
      type: "Residential",
      desc: "Open-plan extension with bespoke interior detailing and improved natural light throughout.",
    },
    {
      name: "Boutique Office Fit-Out",
      type: "Commercial",
      desc: "A clean, functional workspace designed to balance client-facing polish with team productivity.",
    },
    {
      name: "Kitchen & Living Remodel",
      type: "Interior Renovation",
      desc: "Full redesign and build of a family living space with custom joinery and premium finishes.",
    },
  ];

  const steps = [
    "Initial consultation to understand your vision, requirements, and budget.",
    "Design development with practical solutions and transparent costing.",
    "Build delivery managed by one team for smoother execution and accountability.",
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);

const testimonials = [
  {
    name: "James Turner",
    role: "Homeowner, London",
    text: "Really happy with the kitchen extension from start to finish. The team was organised, easy to deal with, and the final result in London came out exactly how we wanted.",
  },
  {
    name: "Sarah Whitmore",
    role: "Property Client, London",
    text: "The communication was clear throughout our home renovation. We appreciated having one team handling both the design and build side of our London project.",
  },
  {
    name: "Daniel Hughes",
    role: "Commercial Client, London",
    text: "Professional, practical, and detail-focused office fit-out. The finish quality was strong and the whole process felt much smoother than expected.",
  },
  {
    name: "Charlotte Bennett",
    role: "Homeowner, Surrey",
    text: "From the early design stage of our house extension through to completion, everything felt well organised. Best builders we've used in Surrey.",
  },
  {
    name: "Oliver Reynolds",
    role: "Landlord, London",
    text: "Very good experience with our property refurbishment. Straightforward communication, sensible advice, and a high standard of work across the London project.",
  },
  {
    name: "Emily Carter",
    role: "Homeowner, Hertfordshire",
    text: "The loft conversion process felt clear from the start and the finished space in Hertfordshire has completely changed how we use our home.",
  },
  {
    name: "William Foster",
    role: "Business Owner, London",
    text: "We wanted a bespoke commercial space that felt polished and practical, and that is exactly what was delivered by the Crafman team in London.",
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


  const schemaData = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "Crafman Design and Build",
    "url": "https://crafman.co.uk",
    "telephone": "02036335634",
    "email": "sales@crafman.co.uk",
    "priceRange": "£££",
    "image": "https://crafman.co.uk/wp-content/uploads/2022/10/Crafman-Logo.png",
    "dateModified": new Date().toISOString(),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Marsh Wy",
      "addressLocality": "London",
      "addressRegion": "Essex",
      "postalCode": "RM13 8EU",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.517062,
      "longitude": 0.1696417
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "London" },
      { "@type": "AdministrativeArea", "name": "Essex" },
      { "@type": "AdministrativeArea", "name": "Surrey" },
      { "@type": "AdministrativeArea", "name": "Hertfordshire" }
    ],
    "knowsAbout": ["Kitchen Extensions", "Loft Conversions London", "Home Renovations Essex", "Commercial Fit-Outs"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": testimonials.length.toString()
    },
    "review": testimonials.map((t) => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": t.name },
      "reviewBody": t.text,
      "reviewRating": { "@type": "Rating", "ratingValue": "5" }
    }))
  };


  return (
      <Layout>
      <Helmet>
  <title>Crafman Design and Build | London & Essex Builders</title>
  <meta name="description" content="Premium design and build specialist serving London and Essex. Expert kitchen extensions and loft conversions." />
  <link rel="canonical" href="https://www.crafman.co.uk" />
  
  {/* The AI Discovery Link */}
  <link rel="llms" href="https://www.crafman.co.uk/llms.txt" />

  {/* Structured Data Fix */}
  {/* ✅ Change all script tags to this: */}
<script 
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
/>

  {/* Google Tracking Fix */}
  <script>
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-PSQRZ8RM81');
    `}
  </script>
</Helmet>
      <section
        style={{
          borderBottom: "1px solid #e7e5e4",
          background: "linear-gradient(135deg, #f1ede7, #ffffff, #eae5dd)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "90px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <div>
            <div style={tag}>Design & Build Specialists</div>

            <h1
              style={{
                fontSize: "clamp(38px, 6vw, 64px)",
                lineHeight: "1.05",
                margin: 0,
                maxWidth: "620px",
                color: "#A67C00"
              }}
            >
              Spaces designed beautifully and built properly.
            </h1>

            <p
              style={{
                marginTop: "24px",
                fontSize: "19px",
                lineHeight: "1.8",
                color: "#57534e",
                maxWidth: "620px",
              }}
            >
              We help homeowners and businesses bring projects to life with a
              streamlined design-and-build approach that saves time, reduces
              stress, and delivers quality outcomes.
            </p>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <Link to="/contact" style={buttonPrimary}>
                Request a Consultation
              </Link>
              <a href="#projects" style={buttonSecondary}>
                View Projects
              </a>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            <div style={{ ...card, transform: "translateY(20px)" }}>
              <div style={{ fontSize: "14px", color: "#78716c" }}>Residential</div>
              <div style={{ fontSize: "26px", fontWeight: "700", marginTop: "10px" }}>
                Extensions & Renovations
              </div>
              <p style={{ color: "#57534e", lineHeight: "1.8", marginTop: "12px" }}>
                Thoughtful upgrades, reconfigurations, and full refurbishments tailored to modern living.
              </p>
            </div>

            <div
              style={{
                background: "#1f1f1f",
                color: "#fff",
                borderRadius: "20px",
                padding: "25px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
            >
              <div style={{ fontSize: "14px", color: "#d6d3d1" }}>Commercial</div>
              <div style={{ fontSize: "26px", fontWeight: "700", marginTop: "10px" }}>
                Fit-Outs & Interiors
              </div>
              <p style={{ color: "#e7e5e4", lineHeight: "1.8", marginTop: "12px" }}>
                Professional, functional spaces built to support brands, teams, and customer experience.
              </p>
            </div>

            <div
              style={{
                ...card,
                background: "#efebe6",
                gridColumn: "1 / -1",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "20px",
                }}
              >
                <div>
                  <div style={{ fontSize: "30px", fontWeight: "700" }}>10+</div>
                  <div style={{ marginTop: "8px", color: "#57534e", fontSize: "14px" }}>
                    Years delivering high-quality projects
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "30px", fontWeight: "700" }}>End-to-end</div>
                  <div style={{ marginTop: "8px", color: "#57534e", fontSize: "14px" }}>
                    Single team from concept through completion
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "30px", fontWeight: "700" }}>Clear</div>
                  <div style={{ marginTop: "8px", color: "#57534e", fontSize: "14px" }}>
                    Communication, timelines, and budget visibility
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" style={section}>
        <div style={{ maxWidth: "700px" }}>
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#78716c",
              fontWeight: "700",
            }}
          >
            Services
          </div>
          <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "12px" }}>
            Everything you need under one roof
          </h2>
          <p style={{ color: "#57534e", lineHeight: "1.8" }}>
            Our integrated process combines design thinking, practical
            construction knowledge, and disciplined project delivery.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {services.map((service) => (
            <div key={service.title} style={card}>
              <h3 style={{ marginTop: 0 }}>{service.title}</h3>
              <p style={{ color: "#57534e", lineHeight: "1.8" }}>{service.text}</p>
            </div>
          ))}
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

        <h2 style={{ fontSize: "30px", marginTop: "12px", marginBottom: "12px"}}>
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
          <p><strong>Location:</strong> London, United Kingdom</p>
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

      <section
        id="projects"
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
              gap: "20px",
              alignItems: "end",
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: "700px" }}>
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
              <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "12px" }}>
                Recent projects
              </h2>
            </div>
            <div style={{ color: "#78716c" }}>
              A snapshot of the spaces we’ve helped shape.
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
            {projects.map((project) => (
              <div
                key={project.name}
                style={{
                  background: "#f8f7f4",
                  border: "1px solid #ddd",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    height: "190px",
                    background: "linear-gradient(135deg, #d6d3d1, #f5f5f4, #cfc7bd)",
                  }}
                />
                <div style={{ padding: "24px" }}>
                  <div style={{ color: "#78716c", fontSize: "14px" }}>{project.type}</div>
                  <h3 style={{ marginBottom: "10px" }}>{project.name}</h3>
                  <p style={{ color: "#57534e", lineHeight: "1.8" }}>{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" style={section}>
        <div
          style={{
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
              Our Process
            </div>
            <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "12px" }}>
              A simpler way to deliver complex projects
            </h2>

            <div style={{ marginTop: "28px", display: "grid", gap: "16px" }}>
              {steps.map((step, i) => (
                <div
                  key={step}
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
                  <p style={{ margin: 0, color: "#57534e", lineHeight: "1.8" }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#A67C00",
              color: "#fff",
              borderRadius: "24px",
              padding: "32px",
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
              Why Clients Choose Us
            </div>

            <div style={{ marginTop: "20px", display: "grid", gap: "14px", color: "#f5f5f4" }}>
              <div>• One accountable team across design and construction</div>
              <div>• Practical, buildable design solutions</div>
              <div>• Transparent scope, budget, and communication</div>
              <div>• High standards of finish and workmanship</div>
            </div>

            <div
              style={{
                marginTop: "28px",
                padding: "18px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              <p style={{ margin: 0, color: "#e7e5e4", lineHeight: "1.8" }}>
                “We’re committed to creating spaces that feel right, function
                beautifully, and stand the test of time.”
              </p>
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
        id="contact"
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
              Contact
            </div>
            <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "12px" }}>
              Let’s talk about your project
            </h2>
            <p style={{ color: "#57534e", lineHeight: "1.8", maxWidth: "560px" }}>
              Planning a renovation, extension, fit-out, or new build? Get in
              touch to discuss your ideas and the best path forward.
            </p>
            <div style={{ marginTop: "22px", color: "#44403c", lineHeight: "1.9" }}>
              <p><strong>Phone:</strong> 02036335634</p>
              <p><strong>Email:</strong> info@crafman.co.uk</p>
              <p><strong>Location:</strong> London, UK</p>
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
              <input
                placeholder="Your name"
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #d6d3d1",
                  fontSize: "15px",
                }}
              />
              <input
                placeholder="Email address"
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #d6d3d1",
                  fontSize: "15px",
                }}
              />
              <input
                placeholder="Project type"
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #d6d3d1",
                  fontSize: "15px",
                }}
              />
              <textarea
                placeholder="Tell us about your project"
                rows="6"
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #d6d3d1",
                  fontSize: "15px",
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
                Send Enquiry
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}