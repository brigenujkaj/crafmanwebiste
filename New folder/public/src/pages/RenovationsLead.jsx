import LeadGenerationLandingPage from "../components/LeadGenerationLandingPage.jsx";

const config = {
  leadType: "house_renovation",
  formName: "Google Ads - House Renovations Landing Page",
  path: "/renovations-london",
  metaTitle: "House Renovations & Refurbishments London | Crafman Design & Build",
  metaDescription: "Planning a substantial home renovation in London or Essex? Crafman Design & Build helps coordinate full refurbishments, structural alterations and internal reconfiguration. Request a consultation.",
  kicker: "HOUSE RENOVATIONS · LONDON & ESSEX",
  headline: "Rework your home around the life you live now.",
  intro: "From substantial refurbishments to structural changes and complete internal reconfiguration, Crafman brings practical planning and coordinated construction to your renovation project.",
  heroImage: "/images/SwissRenovation/swiss13.jpg",
  imageCaption: "Selected renovation project · Crans-Montana, Switzerland",
  heroBullets: ["Full and substantial home refurbishments", "Internal reconfiguration and structural alterations", "Coordinated trades and project delivery"],
  projectTypes: ["Full house renovation", "Back-to-brick refurbishment", "Internal reconfiguration", "Structural alterations", "Kitchen and living-space renovation", "Multiple-room renovation", "Not sure yet"],
  servicesHeading: "A considered approach to transforming your home.",
  servicesIntro: "A successful renovation is about more than finishes. The layout, structure, services, sequencing and specification all need to work together.",
  services: [
    { title: "Full house renovations", text: "Coordinate substantial improvements across multiple rooms, with the overall scope and sequence considered from the outset." },
    { title: "Back-to-brick refurbishments", text: "Plan a major internal renewal, including strip-out, first-fix services, finishes and the work required to bring the property together." },
    { title: "Internal reconfiguration", text: "Improve how your home works through layout changes, openings and considered use of existing space." },
    { title: "Kitchens & living spaces", text: "Create better connected spaces with coordinated building work, installation and finishing details." },
  ],
  projectImage: "/images/SwissRenovation/swiss3.jpg",
  projectImageAlt: "Open-plan living and kitchen space from a completed Crafman renovation project in Crans-Montana, Switzerland",
  projectCaption: "Full renovation project · Crans-Montana, Switzerland",
  projectHeading: "Good renovation work starts behind the finishes.",
  projectText: "Our selected Crans-Montana renovation case study involved layout problem-solving, coordination of specialist trades and careful planning of concealed services. The location is shown clearly as Switzerland; London and Essex enquiries are assessed separately against our current service area.",
  steps: [
    { title: "Understand the property", text: "We discuss the building, what is not working today and the outcome you want from the renovation." },
    { title: "Define the scope", text: "We identify the key building works, structural considerations, services and finish requirements." },
    { title: "Coordinate the work", text: "We develop the sequence, trade requirements and quotation around the agreed project scope." },
    { title: "Deliver with clarity", text: "The team progresses the works with clear communication around decisions, stages and next steps." },
  ],
  faqs: [
    { q: "What counts as a full house renovation?", a: "A full renovation can involve several elements, such as strip-out, structural alterations, electrical and plumbing works, plastering, kitchens, bathrooms and final finishes. The scope is agreed specifically for each property." },
    { q: "Can you change the internal layout?", a: "Yes, internal reconfiguration is one of the services we discuss. Structural openings and alterations may require engineer input, building regulations approval and other checks before work begins." },
    { q: "Can I renovate in stages?", a: "Some projects can be phased, but the best approach depends on the property, services, access and how the work areas connect. We can discuss practical sequencing during the initial review." },
    { q: "How much should I budget?", a: "The budget depends on property size, the extent of strip-out, structural changes, services, specification and access. The enquiry form lets you indicate a range so we can understand the scale of the project." },
    { q: "Which areas do you cover?", a: "We focus on selected locations across Greater London and Essex. Share your property postcode and we will confirm whether we can consider the project." },
  ],
  finalHeading: "Planning a major renovation?",
  finalText: "Start with a conversation about the property, the scope and the result you want to achieve.",
};

export default function RenovationsLead() {
  return <LeadGenerationLandingPage config={config} />;
}
