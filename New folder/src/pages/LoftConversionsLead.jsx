import LeadGenerationLandingPage from "../components/LeadGenerationLandingPage.jsx";

const config = {
  leadType: "loft_conversion",
  formName: "Google Ads - Loft Conversions Consultation",
  path: "/loft-conversions-london",
  metaTitle: "Loft Conversion Builders London & Essex | Crafman Design & Build",
  metaDescription: "Explore a loft conversion with Crafman Design & Build. Discuss dormer, rooflight and hip-to-gable options, structural requirements and a coordinated build across selected London and Essex areas.",
  kicker: "LOFT CONVERSIONS · LONDON & ESSEX",
  headline: "Unlock the potential above your ceiling.",
  intro: "Create valuable space without moving home. Start with a practical conversation about your roof, layout, requirements and the best route for your property.",
  heroImage: "/images/heroImage.png",
  imageCaption: "Crafman architectural design visual · Project-specific proposals are subject to survey",
  heroBullets: ["Dormer, rooflight and hip-to-gable options", "Structural coordination and technical considerations", "A considered design-and-build approach"],
  projectTypes: ["Dormer loft conversion", "Hip-to-gable conversion", "Rooflight / Velux conversion", "Mansard conversion", "Loft conversion with ensuite", "Not sure yet"],
  servicesHeading: "Make the roof space work harder.",
  servicesIntro: "The right solution depends on the existing roof, head height, staircase position, structure and the way you want to use the new space.",
  services: [
    { title: "Dormer conversions", text: "Explore additional headroom and usable floor area through a carefully considered dormer design." },
    { title: "Hip-to-gable conversions", text: "Where the property and planning rules allow, reshape a hipped roof to create a more practical internal layout." },
    { title: "Rooflight conversions", text: "Make use of the existing roof shape with roof windows, insulation and a well-planned internal arrangement." },
    { title: "Mansard conversions", text: "Consider a more substantial roof alteration where the property, local constraints and design brief support it." },
  ],
  projectImage: "/images/drawingsex15.png",
  projectImageAlt: "Three-dimensional architectural model used as an illustrative design visual",
  projectCaption: "Illustrative architectural model · Not a completed loft-conversion case study",
  projectHeading: "Understand the design before the build.",
  projectText: "A successful loft project needs more than a staircase and a new room. We discuss the roof structure, head height, access, insulation, fire safety, services and approval route before defining a project-specific scope.",
  steps: [
    { title: "Discuss your plans", text: "Tell us about the property, the space you need and how you would like to use the loft." },
    { title: "Review feasibility", text: "Consider roof form, head height, staircase position, access and likely planning or building-control requirements." },
    { title: "Define the scope", text: "Clarify the design, structural input, technical information, specification and construction requirements." },
    { title: "Plan the delivery", text: "Agree the work scope, quotation, sequencing and next steps before construction begins." },
  ],
  faqs: [
    { q: "How much does a loft conversion cost?", a: "Costs vary with the roof type, size, structural work, staircase, bathrooms, specification and access. Share your postcode and intended budget so we can understand the project before discussing a realistic scope." },
    { q: "Will I need planning permission?", a: "Some loft conversions may fall within permitted development, but this depends on the property, roof alterations, previous extensions, location and restrictions. A property-specific review is needed before confirming the route." },
    { q: "Will building regulations apply?", a: "Loft conversions generally require building-regulations consideration, including structure, fire safety, stairs, insulation, ventilation and energy performance. The exact requirements depend on the design and property." },
    { q: "Can you include an ensuite bathroom?", a: "An ensuite can often be considered, subject to space, plumbing routes, ventilation, drainage and the overall design. We can discuss this during the initial consultation." },
    { q: "Which areas do you cover?", a: "We consider selected areas across Greater London and Essex. Share the property postcode and we will confirm whether the location is within our current service area." },
  ],
  finalHeading: "Considering a loft conversion?",
  finalText: "Arrange an initial consultation to discuss your property, the space you need and the practical next steps.",
};

export default function LoftConversionsLead() {
  return <LeadGenerationLandingPage config={config} />;
}
