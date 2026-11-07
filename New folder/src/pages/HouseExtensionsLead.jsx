import LeadGenerationLandingPage from "../components/LeadGenerationLandingPage.jsx";
import { HousePlus, MoveHorizontal, Combine, Building2, House, CookingPot, DraftingCompass, FileCheck, Blocks, ClipboardCheck } from "lucide-react";

const config = {
  leadType: "house_extension",
  formName: "Google Ads - House Extensions Landing Page",
  path: "/house-extensions-london",
  metaTitle: "House Extensions North London | Crafman Design & Build",
  metaDescription: "Planning a house extension in North London? Crafman Design & Build delivers rear, side-return, wraparound and double-storey extensions. Request a consultation.",
  kicker: "HOUSE EXTENSIONS · NORTH LONDON",
  headline: "Make more room for the way you want to live.",
  intro: "Thoughtful extensions, carefully planned and professionally built. Bring design, coordination and construction together with one team from the first conversation to the finished space.",
  heroImage: "/images/extensionBackground.jpeg",
  imageCaption: "Crafman project photography · Extension construction in progress",
  heroBullets: ["Rear, side-return and wraparound extensions", "Architectural, planning and structural coordination", "A coordinated design-and-build approach"],
  projectTypes: ["Rear extension", "Side-return extension", "Wraparound extension", "Double-storey extension", "Extension and renovation", "Structural alterations", "Not sure yet"],
  extensionTypes: [
    { image: "/images/extensionIcons/newBuilds.png", title: "New builds", subtitle: "Create a home from the ground up" },
    { image: "/images/extensionIcons/hipToGableIcon.png", title: "Hip-to-gable", subtitle: "Increase usable loft space" },
    { image: "/images/extensionIcons/loftConversion.png", title: "Loft conversions", subtitle: "Unlock space above" },
    { image: "/images/extensionIcons/doubleStoryIcon.png", title: "Double-storey extensions", subtitle: "Add space across two floors" },
    { image: "/images/extensionIcons/wrapAroundIcon.png", title: "Wraparound extensions", subtitle: "Extend to the rear and side" },
    { image: "/images/extensionIcons/singleStoryIcon.png", title: "Single-storey extensions", subtitle: "Create more ground-floor space" },
  ],
  capabilities: [
    { mark: "01", title: "In-house architectural service" },
    { mark: "02", title: "Planning permission guidance" },
    { mark: "03", title: "Structural coordination" },
    { mark: "04", title: "Building control coordination" },
  ],
  servicesHeading: "An extension planned around your property and priorities.",
  servicesIntro: "Whether you need a larger kitchen-diner, a more connected ground floor or another storey of living space, we help you work through the practical decisions before construction begins.",
  services: [
    { title: "Rear extensions", text: "Create a more generous kitchen, dining or family space with a layout that connects naturally to the garden." },
    { title: "Side-return extensions", text: "Make better use of a narrow side passage and bring light and space into the heart of your home." },
    { title: "Wraparound extensions", text: "Combine rear and side space to rethink the ground floor and create a more useful overall layout." },
    { title: "Double-storey extensions", text: "Add space across two levels, with the structure, layout and build sequence considered together." },
  ],
  projectImage: "/images/greenwichExt/shellCompleted.png",
  projectImageAlt: "Rear extension shell construction at a Crafman project in Greenwich",
  projectCaption: "Rear extension · Greenwich SE18",
  projectHeading: "Built around real site conditions.",
  projectText: "Our Greenwich SE18 rear-extension case study involved construction in a conservation area, restricted access and careful coordination of the build sequence. Explore the project to see the work stages and challenges involved.",
  steps: [
    { title: "Understand the brief", text: "We discuss your property, priorities, budget expectations and the space you want to create." },
    { title: "Review the route", text: "We consider design, planning constraints, technical requirements and the practical scope of works." },
    { title: "Plan the build", text: "We develop the work scope, sequencing and quotation so the project is properly understood before it starts." },
    { title: "Deliver the project", text: "Our team coordinates the construction and keeps the agreed scope and next steps clear." },
  ],
  faqs: [
    { q: "How much does a house extension cost?", a: "Costs depend on the size, structure, ground conditions, access, specification and whether planning or specialist design work is needed. Share your postcode, project type and budget range and we can discuss a realistic next step." },
    { q: "Do I need planning permission?", a: "Some extensions may fall under permitted development, while others require planning permission. The answer depends on the property, dimensions, previous extensions and local restrictions. We review the likely route before confirming the scope." },
    { q: "Can Crafman handle both design and construction?", a: "Crafman offers a design-and-build approach. The exact design, planning, technical and construction services included will be confirmed in your project proposal." },
    { q: "Which areas do you cover?", a: "We focus on selected areas across Greater London and Essex. Send us your property postcode and we can confirm whether your location is within our service area." },
    { q: "How soon can work begin?", a: "Timing depends on the project scope, design and approval requirements, availability and lead times. We discuss your preferred start date during the initial conversation." },
  ],
  finalHeading: "Thinking about extending your home?",
  finalText: "Tell us where the property is and what you would like to achieve. We'll take it from there.",
};

export default function HouseExtensionsLead() {
  return <LeadGenerationLandingPage config={config} />;
}
