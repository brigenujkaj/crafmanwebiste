import Layout, { siteStyles } from "../components/Layout.jsx";
import { useState } from "react";

export default function About() {
  const { section, card, buttonPrimary, buttonSecondary, tag } = siteStyles;

  const values = [
    {
      title: "Design-led thinking",
      text: "We approach every project with a strong focus on layout, practicality, and how the finished space will actually be used day to day.",
    },
    {
      title: "Build quality",
      text: "We care about workmanship, finish, and creating spaces that feel solid, considered, and built to last.",
    },
    {
      title: "Clear communication",
      text: "We believe clients should understand the process, the scope, and the route forward without unnecessary confusion.",
    },
  ];

  const services = [
    "House extensions",
    "Home renovations",
    "Refurbishments",
    "Commercial fit-outs",
    "Internal reconfiguration",
    "Planning and project coordination",
  ];


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
        <div style={{ ...section, paddingTop: "90px", paddingBottom: "90px" }}>
          <div style={tag}>About Us</div>

          <h1
            style={{
              fontSize: "clamp(38px, 6vw, 64px)",
              lineHeight: "1.05",
              margin: 0,
              maxWidth: "760px",
              color: "#A67C00"


            }}
          >
            A London design and build company focused on practical spaces and quality delivery.
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
            Crafman Design and Build works with homeowners, landlords, and businesses
            to create spaces that are well designed, well built, and easier to deliver
            through one joined-up process.
          </p>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <a href="/contact" style={buttonPrimary}>
              Speak to Us
            </a>
            <a href="/projects" style={buttonSecondary}>
              View Projects
            </a>
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
              Who We Are
            </div>

            <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "12px" }}>
              One team from design through build
            </h2>

            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              We provide a design and build service that brings together planning,
              coordination, and construction under one roof. That means clients benefit
              from a clearer process, better accountability, and a more practical route
              from idea to completed space.
            </p>

            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              Our work covers residential and commercial projects across London, from
              extensions and refurbishments to full renovations and fit-outs. We focus
              on spaces that not only look strong, but function properly for the people
              using them.
            </p>
          </div>

          <div style={{ ...card, background: "#efebe6" }}>
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
              At a Glance
            </div>

            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <strong>Company:</strong> Crafman Design and Build
              </div>
              <div>
                <strong>Location:</strong> London, United Kingdom
              </div>
              <div>
                <strong>Focus:</strong> Residential and commercial design and build
              </div>
              <div>
                <strong>Approach:</strong> Practical, design-led, and quality focused
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
              What We Do
            </div>

            <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "12px" }}>
              Services tailored to how people live and work
            </h2>

            <p style={{ color: "#57534e", lineHeight: "1.8" }}>
              We work on a range of projects across London, helping clients improve,
              extend, reconfigure, and upgrade their spaces with a joined-up design
              and build process.
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
            {services.map((service) => (
              <div key={service} style={card}>
                <h3 style={{ margin: 0 }}>{service}</h3>
              </div>
            ))}
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
            Our Values
          </div>

          <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "12px", color: "#A67C00" }}>
            The way we approach every project
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
          {values.map((value) => (
            <div key={value.title} style={card}>
              <h3 style={{ marginTop: 0 }}>{value.title}</h3>
              <p style={{ color: "#57534e", lineHeight: "1.8", marginBottom: 0 }}>
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          borderTop: "1px solid #e7e5e4",
          background: "#efebe6",
        }}
      >
        <div style={section}>
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
                Why Clients Choose Us
              </div>

              <h2 style={{ fontSize: "42px", marginTop: "12px", marginBottom: "12px" }}>
                A clearer path from idea to completed project
              </h2>

              <p style={{ color: "#57534e", lineHeight: "1.8" }}>
                Clients choose Crafman Design and Build because they want a team that
                understands design, buildability, and delivery. Our aim is to make the
                process feel more joined up, more practical, and easier to manage from
                the very start.
              </p>
            </div>

            <div style={card}>
              <div style={{ display: "grid", gap: "14px", color: "#57534e" }}>
                <div>• One team managing design and build</div>
                <div>• Practical solutions shaped around real use</div>
                <div>• Clearer communication and better coordination</div>
                <div>• Strong focus on finish quality and usability</div>
              </div>
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
      <div style={card}>
        <h2 style={{ marginTop: 0, fontSize: "30px" }}>Start your enquiry</h2>
        <p style={{ color: "#57534e", lineHeight: "1.8" }}>
          Keep it simple. The more we know, the more useful our first reply will be.
        </p>

        <form style={{ display: "grid", gap: "18px", marginTop: "18px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "14px",
            }}
          >
            <label style={labelStyle}>
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                style={inputStyle}
              />
            </label>

            <label style={labelStyle}>
              <span>Phone number</span>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                style={inputStyle}
              />
            </label>
          </div>

          <label style={labelStyle}>
            <span>Email</span>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email address"
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            <span>Project required</span>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select a service</option>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>

          {form.service === "Other" && (
            <label style={labelStyle}>
              <span>Tell us the service you need</span>
              <input
                name="otherService"
                value={form.otherService}
                onChange={handleChange}
                placeholder="Describe your project"
                style={inputStyle}
              />
            </label>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "14px",
            }}
          >
            <label style={labelStyle}>
              <span>When would you like to start?</span>
              <select
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Choose timing</option>
                {startOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label style={labelStyle}>
              <span>Do you own the property?</span>
              <select
                name="ownsProperty"
                value={form.ownsProperty}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="In progress">In progress</option>
              </select>
            </label>
          </div>

          <div style={labelStyle}>
            <span>Preferred contact days</span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "10px",
              }}
            >
              {dayOptions.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  style={pillStyle(form.contactDays.includes(day))}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div style={labelStyle}>
            <span>Preferred contact time</span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "10px",
              }}
            >
              {contactTimeOptions.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, contactTime: time }))
                  }
                  style={pillStyle(form.contactTime === time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <label style={labelStyle}>
            <span>Brief project details</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us what you are planning"
              rows="5"
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </label>

          <button
            type="button"
            style={{ ...buttonPrimary, border: "none", cursor: "pointer" }}
          >
            Send Enquiry
          </button>
        </form>
      </div>
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
    </Layout>
  );
}