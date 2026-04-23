import { Link } from "react-router-dom";
import Layout, { siteStyles } from "../components/Layout.jsx";
import { useState } from "react";
import ContactForm from "../components/ContactForm.jsx";
import { Helmet } from "react-helmet-async";

export default function CommercialFitOutsLondon() {
  const { section, card, buttonPrimary, buttonSecondary, tag } = siteStyles;

  const services = [
    {
      title: "Office Fit-Outs",
      text: "Functional office environments designed around workflow, presentation, team comfort, and everyday usability.",
    },
    {
      title: "Retail & Customer Spaces",
      text: "Commercial interiors shaped to support customer experience, brand presence, and a clean professional finish.",
    },
    {
      title: "Studio & Creative Spaces",
      text: "Fit-out solutions for studios, workshops, and creative environments that need to balance practicality and design.",
    },
    {
      title: "Internal Reconfiguration",
      text: "Layout changes that improve flow, space planning, and the way teams and customers move through the space.",
    },
    {
      title: "Finishes & Joinery",
      text: "Flooring, partitions, decorating, lighting, bespoke joinery, and final details that complete the fit-out properly.",
    },
    {
      title: "Design & Planning",
      text: "A joined-up process covering design thinking, project coordination, and practical build planning from the start.",
    },
  ];

  const sectors = [
    "Offices",
    "Studios",
    "Retail units",
    "Client-facing interiors",
    "Creative workspaces",
    "Commercial property upgrades",
  ];

  const steps = [
    {
      title: "1. Initial Consultation",
      text: "We discuss the business, the property, your goals, and the type of space you want to create.",
    },
    {
      title: "2. Design and Space Planning",
      text: "We develop the layout, define the fit-out scope, and shape a practical design direction around the way the space will be used.",
    },
    {
      title: "3. Costing and Programme",
      text: "We help clarify timings, scope, and delivery expectations so the project can move forward with better alignment.",
    },
    {
      title: "4. Build and Delivery",
      text: "Our team manages the commercial fit-out works with a focus on quality, coordination, and a more organised delivery process.",
    },
  ];

  const faqs = [
    {
      q: "What is a commercial fit-out?",
      a: "A commercial fit-out is the process of preparing and finishing an internal business space so it is ready to use. This can include layout changes, partitions, flooring, joinery, lighting, finishes, and other practical improvements.",
    },
    {
      q: "Do you provide design as part of the fit-out?",
      a: "Yes. We provide a joined-up design and build approach, helping shape the layout, define the space properly, and coordinate the route through delivery.",
    },
    {
      q: "Can you work on occupied commercial spaces?",
      a: "That depends on the type of property, the works involved, and programme requirements. We can discuss the practicalities during the early planning stage.",
    },
    {
      q: "Do commercial fit-outs need approvals?",
      a: "Some projects may require approvals, building control input, landlord consent, or additional technical coordination depending on the property and the scope of works.",
    },
  ];


  const [testimonialIndex, setTestimonialIndex] = useState(0);

const testimonials = [
  {
    name: "Daniel Hughes",
    role: "Commercial Client, London",
    text: "Professional, practical, and detail-focused office fit-out. The finish quality was strong and the whole process felt much smoother than expected for our business space.",
  },
  {
    name: "William Foster",
    role: "Business Owner, London",
    text: "We wanted a boutique commercial space that felt polished and practical, and that is exactly what was delivered. Helpful team with strong attention to commercial detail.",
  },
  {
    name: "Oliver Reynolds",
    role: "Landlord, London",
    text: "Very good experience with our property refurbishment. Straightforward communication, sensible advice, and a high standard of work across the commercial project.",
  },
  {
    name: "Sarah Whitmore",
    role: "Property Client, London",
    text: "The communication was clear throughout and the project felt properly managed. We appreciated having one team handling both the design and build side.",
  },
  {
    name: "James Turner",
    role: "Homeowner, London",
    text: "Really happy with the service from start to finish. The team was organised, easy to deal with, and the final result came out exactly how we wanted.",
  },
  {
    name: "Charlotte Bennett",
    role: "Homeowner, Surrey",
    text: "From the early design stage through to completion, everything felt well organised. The team understood exactly what we were trying to achieve.",
  },
  {
    name: "Emily Carter",
    role: "Homeowner, Hertfordshire",
    text: "The process felt clear from the start and the finished space has completely changed how we use our home. Very pleased with the result.",
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

const commercialSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Commercial Fit-Outs London",
    "description": "Professional office, retail, and studio fit-outs in London. Integrated design and build services for commercial interiors.",
    "provider": {
      "@type": "GeneralContractor",
      "name": "Crafman Design and Build",
      "telephone": "02036335634",
      "email": "sales@crafman.co.uk",
      "url": "https://crafman.co.uk"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "London" },
      { "@type": "AdministrativeArea", "name": "Essex" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Commercial Services",
      "itemListElement": services.map(s => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.title,
          "description": s.text
        }
      }))
    },
    // This helps AI answer user questions directly from your data
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
      <Layout>
          <Helmet>
  <title>Commercial Fit Outs London | Crafman Design and Build</title>
  <meta
    name="description"
    content="Commercial fit outs in London for offices, retail and business spaces. Practical design and high-quality build delivered by one experienced team."
  />
  <link rel="canonical" href="https://crafman.co.uk/commercial-fit-outs-london" />
  
  {/* The AI Data Script */}
  {/* ✅ Change all script tags to this: */}
<script 
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(commercialSchema) }}
/>
</Helmet>

      <section
        style={{
          borderBottom: "1px solid #e7e5e4",
          background: "linear-gradient(135deg, #f1ede7, #ffffff, #eae5dd)",
        }}
      >
        <div style={{ ...section, paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={tag}>Commercial Fit-Outs London</div>

          <h1
            style={{
              fontSize: "clamp(38px, 6vw, 60px)",
              lineHeight: "1.05",
              margin: 0,
              maxWidth: "780px",
              color: "#A67C00",
            }}
          >
            Commercial fit-outs in London designed well and delivered properly.
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
            Crafman Design and Build delivers commercial fit-outs in London for
            offices, studios, retail spaces, and client-facing interiors. We
            combine design, planning, and build delivery to create business
            spaces that work better, look stronger, and support the way your
            team or customers use them.
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
              Request a Consultation
            </Link>
            <a href="#services" style={buttonSecondary}>
              View Fit-Out Services
            </a>
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
            Fit-Out Specialists
          </div>
          <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px" }}>
            Commercial interiors designed around function, flow, and finish
          </h2>
          <p style={{ color: "#57534e", lineHeight: "1.8" }}>
            A successful commercial fit-out is not just about appearance. It is
            about creating a space that reflects the business properly, supports
            day-to-day use, and gives staff or customers a better experience.
            We help businesses across London shape commercial interiors that are
            practical, professional, and thoughtfully delivered.
          </p>
          <p style={{ color: "#57534e", lineHeight: "1.8" }}>
            Whether you are fitting out a new workspace, upgrading a tired
            interior, or reconfiguring an existing commercial unit, our team can
            support the project from early design thinking through build
            completion.
          </p>
        </div>
      </section>

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
              Fit-Out Services
            </div>
            <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px" }}>
              Commercial fit-out services in London
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
            {services.map((service) => (
              <div key={service.title} style={card}>
                <h3 style={{ marginTop: 0 }}>{service.title}</h3>
                <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                  {service.text}
                </p>
              </div>
            ))}
          </div>
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
              Design Included
            </div>
            <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px" }}>
              We include the design thinking, not just the build
            </h2>
            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              Commercial spaces work best when layout, flow, finishes, and
              function are considered together. Our approach includes the design
              side of the project, helping shape the space properly before the
              build begins.
            </p>
            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              That means clearer planning, better use of space, and a fit-out
              that feels more intentional from the start rather than being
              treated as a set of disconnected works.
            </p>
          </div>

          <div
            style={{
              ...card,
              background: "#efebe6",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#78716c",
                fontWeight: "700",
                marginBottom: "12px",
              }}
            >
              Typical Sectors
            </div>

            <div style={{ display: "grid", gap: "12px", color: "#57534e" }}>
              {sectors.map((sector) => (
                <div key={sector}>• {sector}</div>
              ))}
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
              Approvals and Coordination
            </div>

            <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px", color: "#A67C00" }}>
              We can help manage the practical side of commercial delivery
            </h2>

            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              Some commercial fit-out projects require building control input,
              landlord approvals, technical drawings, or additional
              coordination. We help support that process so the project has a
              clearer path from planning through delivery.
            </p>

            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              This reduces friction early on and helps the fit-out move forward
              with better organisation and a stronger understanding of what is
              needed.
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
            <div style={card}>Space planning and design support</div>
            <div style={card}>Technical drawings and documentation</div>
            <div style={card}>Approval and coordination support</div>
            <div style={card}>Project planning and delivery oversight</div>
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
            A clear commercial fit-out process from start to finish
          </h2>
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
          {steps.map((item, i) => (
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
            <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px" }}>
              Why businesses choose Crafman Design and Build for commercial fit-outs in London
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
            <div style={card}>Design and build thinking in one team</div>
            <div style={card}>Practical commercial space planning</div>
            <div style={card}>Clear communication and project coordination</div>
            <div style={card}>Professional finish and usability focus</div>
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
              Commercial fit-outs London FAQs
            </h2>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {faqs.map((item) => (
              <div key={item.q} style={card}>
                <h3 style={{ marginTop: 0 }}>{item.q}</h3>
                <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                  {item.a}
                </p>
              </div>
            ))}
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
              Talk to us about your commercial fit-out project in London
            </h2>
            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              If you are planning a commercial fit-out in London, contact
              Crafman Design and Build to discuss the space, your goals, and the
              best route forward.
            </p>

            <div style={{ marginTop: "20px", color: "#44403c", lineHeight: "1.9" }}>
              <p><strong>Phone:</strong> 02036335634</p>
              <p><strong>Email:</strong> info@crafman.co.uk</p>
              <p><strong>Location:</strong> London, United Kingdom</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}