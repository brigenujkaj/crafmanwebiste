import { Link } from "react-router-dom";
import Layout, { siteStyles } from "../components/Layout.jsx";
import RenovationCalculator from "../components/RenovationCalculator";
import { useState } from "react";
import ContactForm from "../components/ContactForm.jsx";

export default function RenovationsLondon() {
  const { section, card, buttonPrimary, buttonSecondary, tag } = siteStyles;


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
      <section
        style={{
          borderBottom: "1px solid #e7e5e4",
          background: "linear-gradient(135deg, #f1ede7, #ffffff, #eae5dd)",
        }}
      >
        <div style={{ ...section, paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={tag}>Renovations London</div>

          <h1
            style={{
              fontSize: "clamp(38px, 6vw, 60px)",
              lineHeight: "1.05",
              margin: 0,
              maxWidth: "760px",
              color: "#A67C00"
            }}
          >
            Home renovations in London delivered by one experienced design and build team.
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
            Crafman Design and Build provides renovation services in London for
            homeowners, landlords, and property investors looking to improve
            layout, finish, function, and long-term value. From light
            renovations to full back-to-brick refurbishments, we manage the
            process from design through completion.
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
              Request a Quote
            </Link>
            <a href="#services" style={buttonSecondary}>
              View Renovation Services
            </a>
          </div>
        </div>
      </section>

      <RenovationCalculator />

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
            Renovation Specialists
          </div>
          <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px" }}>
            Renovation projects designed around layout, quality, and long-term value
          </h2>
          <p style={{ color: "#57534e", lineHeight: "1.8" }}>
            A successful renovation is about more than fresh finishes. It is
            about creating a property that works better, feels more cohesive,
            and adds more value to the space you already have. We help clients
            across London renovate homes with practical design thinking, clear
            project planning, and quality build delivery.
          </p>
          <p style={{ color: "#57534e", lineHeight: "1.8" }}>
            Whether you are upgrading a newly purchased home, modernising an
            older property, or carrying out a full internal transformation, our
            team can support you from initial design ideas through to final
            finish.
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
              Renovation Services
            </div>
            <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px", color: "#A67C00" }}>
              Home renovation services in London
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
              <h3 style={{ marginTop: 0 }}>Light Renovations</h3>
              <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                A lighter renovation option for cosmetic improvements and
                general upgrades, including decorating, flooring, finishes, and
                selected room improvements.
              </p>
            </div>

            <div style={card}>
              <h3 style={{ marginTop: 0 }}>Full Back-to-Brick Renovations</h3>
              <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                A more complete internal renovation approach, stripping back the
                property and rebuilding it with a fresh layout, new finishes,
                and coordinated design.
              </p>
            </div>

            <div style={card}>
              <h3 style={{ marginTop: 0 }}>Kitchen Renovations</h3>
              <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                Kitchen upgrades designed around layout, usability, storage, and
                a cleaner, more modern overall finish.
              </p>
            </div>

            <div style={card}>
              <h3 style={{ marginTop: 0 }}>Bathroom Renovations</h3>
              <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                Bathroom improvements focused on practicality, finish quality,
                and a more polished, better-performing space.
              </p>
            </div>

            <div style={card}>
              <h3 style={{ marginTop: 0 }}>Internal Reconfiguration</h3>
              <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                Structural and layout changes that improve how rooms connect and
                how the property works day to day.
              </p>
            </div>

            <div style={card}>
              <h3 style={{ marginTop: 0 }}>Finishing and Interior Upgrades</h3>
              <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                Flooring, plastering, decorating, lighting, joinery, and other
                finishing works that bring the renovation together properly.
              </p>
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
            Renovation Levels
          </div>
          <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px" }}>
            Light renovations and back-to-brick renovations explained
          </h2>
          <p style={{ color: "#57534e", lineHeight: "1.8" }}>
            We offer both lighter renovation options and more complete
            back-to-brick renovation projects depending on the property, your
            goals, and your budget.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "24px",
            }}
          >
            <div style={card}>
              <h3 style={{ marginTop: 0 }}>Light Renovation</h3>
              <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                A lighter level of renovation focused on surface upgrades,
                selected room improvements, and refreshing the overall feel of
                the property.
              </p>
            </div>

            <div style={card}>
              <h3 style={{ marginTop: 0 }}>Back-to-Brick Renovation</h3>
              <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                A more complete internal renovation involving a full strip-out,
                redesign, rebuild, and coordinated upgrade of the property.
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
              What’s Included
            </div>

            <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px", color: "#A67C00" }}>
              Back-to-brick renovation ranges include kitchen, bathroom, and design
            </h2>

            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              Our back-to-brick renovation pricing ranges include kitchen
              supply, bathroom supply, and design work handled by our team.
              This gives clients a clearer starting point when planning a full
              internal renovation in London.
            </p>

            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              Final costs still depend on size, layout changes, structure,
              finish level, and site-specific conditions, but the calculator
              gives a realistic guide based on the level of renovation you are
              considering.
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
            <div style={card}>Kitchen supply included in back-to-brick ranges</div>
            <div style={card}>Bathroom supply included in back-to-brick ranges</div>
            <div style={card}>Design handled by our team</div>
            <div style={card}>Project scope tailored to your property</div>
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
            Renovation support for homeowners, landlords, and developers
          </h2>
          <p style={{ color: "#57534e", lineHeight: "1.8" }}>
            We work with homeowners improving their main residence, landlords
            upgrading rental properties, and developers looking to improve
            layout, presentation, and long-term value. Our process is shaped
            around budget, scope, timescales, and the practical goals of the
            project.
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
              Planning and Building Control
            </div>

            <h2 style={{ fontSize: "40px", marginTop: "12px", marginBottom: "12px", color: "#A67C00" }}>
              We can help manage approvals where needed
            </h2>

            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              Some renovation projects in London require planning permission,
              building control input, or structural coordination. Where
              approvals are needed, we help guide the process and support the
              project with practical design information and technical
              coordination.
            </p>

            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              This helps reduce uncertainty, keeps the project moving, and
              gives you a clearer understanding of what is required before
              build works begin.
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
            <div style={card}>Planning guidance where applicable</div>
            <div style={card}>Building control coordination</div>
            <div style={card}>Technical drawings and documentation</div>
            <div style={card}>Structural and project coordination</div>
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
            A clear renovation process from start to finish
          </h2>
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
          {[
            {
              title: "1. Initial Consultation",
              text: "We discuss the property, your goals, your budget, and the scale of renovation you are planning.",
            },
            {
              title: "2. Design and Scope Development",
              text: "We shape the layout, define the works, and establish a practical route to deliver the project.",
            },
            {
              title: "3. Costing and Programme",
              text: "We clarify scope, likely timings, and the finish level so expectations are aligned from the start.",
            },
            {
              title: "4. Build and Delivery",
              text: "Our team manages the renovation works carefully, focusing on finish quality, communication, and progress.",
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
              Why clients choose Crafman Design and Build for renovations in London
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
            <div style={card}>Practical renovation experience across London properties</div>
            <div style={card}>Clear project communication and oversight</div>
            <div style={card}>Focus on quality finish and real usability</div>
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
              Renovations London FAQs
            </h2>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            <div style={card}>
              <h3 style={{ marginTop: 0 }}>
                What is the difference between light renovation and back-to-brick renovation?
              </h3>
              <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                Light renovation focuses on cosmetic upgrades and selected
                improvements. Back-to-brick renovation is a more complete
                internal transformation involving strip-out, redesign, and a
                more substantial rebuild of the property interior.
              </p>
            </div>

            <div style={card}>
              <h3 style={{ marginTop: 0 }}>
                What is included in the back-to-brick renovation ranges?
              </h3>
              <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                Our back-to-brick guide ranges include kitchen supply, bathroom
                supply, and design handled by our team.
              </p>
            </div>

            <div style={card}>
              <h3 style={{ marginTop: 0 }}>How much does a full renovation in London cost?</h3>
              <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                Costs vary depending on property size, condition, structural
                work, finish level, and layout changes. The calculator provides
                a helpful starting point based on the level of renovation you
                select.
              </p>
            </div>

            <div style={card}>
              <h3 style={{ marginTop: 0 }}>Do you manage the whole renovation project?</h3>
              <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                Yes. We provide a joined-up design and build approach, helping
                clients move from concept to completion with one accountable
                team.
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
              Talk to us about your renovation project in London
            </h2>
            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              If you are planning a renovation in London, contact Crafman
              Design and Build to discuss your property, ideas, budget, and the
              best route forward.
            </p>

            <div style={{ marginTop: "20px", color: "#44403c", lineHeight: "1.9" }}>
              <p><strong>Phone:</strong> 02036335634</p>
              <p><strong>Email:</strong> info@crafman.co.uk</p>
              <p><strong>Location:</strong> London, UK</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}