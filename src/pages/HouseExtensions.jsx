import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ExtensionLeadForm from "../components/extensionLeadForm.jsx";
import ExtensionHeader from "../components/ExtensionHeader.jsx";

const extensionTypes = [
    {
        title: "Single-storey extension",
        subtitle: "More room on the ground floor",
        image: "/images/extensionIcons/singleStoryIcon.png",
        fallback: "single",
    },
    {
        title: "Double-storey extension",
        subtitle: "Space across two levels",
        image: "/images/extensionIcons/doubleStoryIcon.png",
        fallback: "double",
    },
    {
        title: "Wraparound extension",
        subtitle: "Bring rear and side space together",
        image: "/images/extensionIcons/wrapAroundIcon.png",
        fallback: "wrap",
    },
    {
        title: "Double-storey side extension",
        subtitle: "Add space along the side over two levels",
        image: "/images/extensionIcons/doubleStoryIcon.png",
        fallback: "double",
    },
];

const capabilities = [
    { number: "01", title: "Architectural design", text: "In-house architectural service to develop your ideas and drawings.", icon: "design" },
    { number: "02", title: "Planning permission", text: "Guidance on the planning route and coordination of applications where required.", icon: "planning" },
    { number: "03", title: "Structural coordination", text: "Coordination of structural design requirements and engineering input.", icon: "structure" },
    { number: "04", title: "Building control", text: "Support with building regulations information, inspections and coordination.", icon: "control" },
];

const coordinationServices = [
    {
        number: "01",
        title: "Design & approvals",
        detail: "In-house design coordination, planning permission and building notice / building control.",
        note: "DESIGN · PLANNING · TECHNICAL",
        icon: "design",
    },
    {
        number: "02",
        title: "The build",
        detail: "Coordinated construction, trades, glazing supply and delivery on site.",
        note: "CONSTRUCTION · COORDINATION",
        icon: "build",
    },
    {
        number: "03",
        title: "Handover",
        detail: "Final checks, completed details and handover of your finished space.",
        note: "FINISHING · FINAL REVIEW",
        icon: "handover",
    },
];

const faqs = [
    {
        question: "Do I need planning permission for a house extension in London?",
        answer: "Not every house extension needs a householder planning application. Some projects may qualify as permitted development, but the rules depend on the original house, the dimensions and position of the proposed work, previous extensions and restrictions affecting the property. Conservation areas, listed-building controls, Article 4 Directions and planning conditions can change what is allowed. We can discuss the likely planning route after reviewing the property and your proposed layout; the local planning authority makes the formal planning decision.",
    },
    {
        question: "What is permitted development for a house extension?",
        answer: "Permitted development is a set of national planning rights that can allow certain home improvements without a full planning application, provided every relevant limit and condition is met. The assessment can include the size, height, location, materials, boundary distances and the amount of previous building work. The original house is an important reference point, so an older extension or outbuilding can affect the calculation. Never assume that a neighbour's extension means the same design is permitted at your address.",
    },
    {
        question: "Can I build a larger single-storey rear extension under prior approval?",
        answer: "In England, some larger single-storey rear extensions may use the permitted development neighbour consultation route, often called prior approval. The route has eligibility rules, dimensional limits and a formal process with the local planning authority. It is not automatic permission and does not apply to every property or every design. The authority consults adjoining neighbours and considers the proposal under the relevant procedure. We can help identify whether this route may be relevant to your project.",
    },
    {
        question: "Do double-storey extensions need planning permission?",
        answer: "A two-storey extension is more restricted than many single-storey rear extensions. Permitted development rights may be limited by how far it extends beyond the original rear wall, its proximity to boundaries, its roof design and whether the property is in a designated area. Side extensions over one storey generally need a householder planning application. The exact position should be checked against current rules and the property's planning history before committing to a design.",
    },
    {
        question: "Can I build a side-return or wraparound extension on a terraced house?",
        answer: "A side-return or wraparound extension can be a practical way to use the narrow space beside and behind a London terrace. Feasibility depends on the width and condition of the side passage, neighbouring windows, drainage, foundations, access, daylight and planning constraints. A wraparound combines rear and side areas, so the planning assessment needs to consider the whole enlarged footprint rather than treating each part in isolation.",
    },
    {
        question: "What is the difference between planning permission and building regulations?",
        answer: "Planning permission deals with whether the proposed development is acceptable in planning terms, including its appearance, scale, location and effect on the area. Building regulations deal with how the work is designed and constructed so that it meets applicable standards for matters such as structure, fire safety, energy performance, ventilation, drainage and access. A project can need one approval, both, or in some cases neither; permitted development does not remove the need to comply with building regulations.",
    },
    {
        question: "What is the difference between a Building Notice and Full Plans?",
        answer: "These are different routes for dealing with building regulations in England. A Full Plans submission allows drawings and technical information to be checked by building control before work proceeds, which can help identify issues early on. A Building Notice is a more limited notification route and is not suitable for every project or every site. The appropriate route depends on the work, the property and the building control body's requirements. It is separate from planning permission.",
    },
    {
        question: "Will my extension need building regulations approval?",
        answer: "Many extensions need building regulations approval, including work involving new structural elements, foundations, walls, roofs, drainage, insulation, glazing or changes to fire safety. The exact requirements depend on the design and scope. Building control inspections may be needed at relevant stages, and completion documentation should be retained. The design and construction should allow the required checks to take place.",
    },
    {
        question: "Will I need an architect or structural engineer?",
        answer: "A well-developed design is important before construction starts. Architectural drawings set out the proposed layout, dimensions and appearance and can support planning and building regulations submissions. A structural engineer may be needed to design items such as steel beams, lintels, foundations or other load-bearing elements. The need for specialist input depends on the existing building and the proposed structural changes.",
    },
    {
        question: "Will removing the wall between my kitchen and dining room need a steel beam?",
        answer: "It may do, but this should never be decided by appearance alone. A wall may support floors, roof structure or other parts of the building. A competent structural assessment is needed to establish the load path and specify any beam, padstones, bearings or temporary support. Building regulations approval and inspection requirements should also be considered before the wall is removed.",
    },
    {
        question: "Do I need a Party Wall Agreement before building an extension?",
        answer: "The Party Wall etc. Act 1996 may apply to certain work on a shared wall, work close to a boundary and some excavations near neighbouring buildings. It is separate from planning permission and building regulations. Whether notice is required depends on the precise work and distances involved. The Act has formal notice periods and procedures, so check the position early and obtain advice from a suitably experienced party wall professional where necessary.",
    },
    {
        question: "How much does a house extension cost in North London?",
        answer: "There is no reliable single price for every extension. The cost is affected by floor area, the type of extension, ground conditions, foundations, structural steel, drainage changes, access, glazing, internal finishes, kitchen or bathroom work, professional fees and the level of specification. A clear scope and coordinated drawings make it easier to develop a meaningful project estimate. We discuss the property and proposed work before advising on the next step.",
    },
    {
        question: "How long does a house extension take to build?",
        answer: "The construction period varies with the size and complexity of the project, site access, ground conditions, structural work, weather, material availability and the number of trades involved. Design development, planning and building regulations processes also take time before the build begins. A realistic programme should be prepared around the actual scope and approvals rather than relying on a generic number of weeks.",
    },
    {
        question: "Can you help with design, planning and construction as one project?",
        answer: "Crafman Design & Build offers a coordinated design-to-build approach for house extensions. The service can bring together design development, planning route coordination, technical and structural input, building control coordination and construction. The exact services and responsibilities are agreed for each project so that the scope is clear before work starts.",
    },
    {
        question: "What happens during the design and approvals stage?",
        answer: "The first stage is to understand the property, the way you use it and what you want the extension to achieve. The proposed layout and design are developed, then the likely planning route is considered. Where required, planning information, technical drawings and structural input are coordinated, followed by the relevant building regulations or building control process. The work that is needed depends on the property and the design.",
    },
    {
        question: "What happens during construction?",
        answer: "Once the project scope, relevant approvals and construction arrangements are in place, the build can move through the agreed sequence. Depending on the project, this can include site preparation, excavation and foundations, drainage, structural work, walls and roof, windows and doors, insulation, first-fix services, plastering and internal finishes. The actual sequence and included work are set out for the individual project.",
    },
    {
        question: "What is included at handover?",
        answer: "Handover is the final stage of the agreed project. It involves reviewing the completed work, noting any outstanding items that need attention and passing on relevant completion information and documents that apply to the project. The handover requirements depend on the contract, specification and approvals for the work.",
    },
    {
        question: "Can an extension include bi-fold doors, sliding doors or roof lanterns?",
        answer: "Glazing choices can be considered as part of the design. Bi-fold doors, sliding doors, rooflights and roof lanterns each affect the appearance, structure, thermal performance, daylight and budget of the extension. Opening sizes, support requirements, glass specification and product details should be coordinated with the architectural and structural design and the applicable building regulations.",
    },
    {
        question: "Can an extension improve the layout of an existing home?",
        answer: "Yes. An extension can create space for an open-plan kitchen and dining area, a larger family room, a utility room, a ground-floor study or a more useful connection to the garden. Good planning considers circulation, daylight, storage, heating, ventilation and how the new space connects to the existing house, not only the extra floor area.",
    },
    {
        question: "Do you work across North London, Greater London and Essex?",
        answer: "Crafman focuses on selected areas of North London, Greater London and Essex. Availability depends on the property's postcode, the project type and current capacity. Send the property postcode with your enquiry and the team can confirm whether the location is within the service area. We do not claim to cover every borough or every Essex postcode.",
    },
    {
        question: "What information should I provide when requesting an extension discussion?",
        answer: "The most useful starting details are your name, email address, property address and postcode, the type of extension you are considering and a short description of what you would like to achieve. Approximate dimensions, photographs, existing drawings or planning history can also help at a later stage, but you can start with the basic enquiry form on this page.",
    },
    {
        question: "Do you offer free architectural drawings with a project?",
        answer: "Yes. Crafman offers complimentary architectural drawings with any project that you appoint Crafman to carry out as the builder. The offer is available across project types such as house extensions, renovations and new builds. The drawing package, level of detail and project requirements are agreed during the initial consultation. Submitting an enquiry does not itself trigger a free drawing package; the offer applies when Crafman is appointed to deliver the construction project.",
    },
    {
        question: "Does permitted development mean I can start building straight away?",
        answer: "Not necessarily. You should first confirm that the proposal meets all permitted development conditions and that no local or property-specific restriction removes those rights. Other requirements may still apply, including building regulations, Party Wall notices, drainage approvals, covenants or listed-building consent. Some larger single-storey extensions also require the prior approval process. Check the complete position before starting work.",
    },
];


function CoordinationIcon({ type }) {
    const props = {
        viewBox: "0 0 48 48",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.55,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
    };

    const drawings = {
        design: (
            <>
                <path d="M8 39 30 17" />
                <path d="m26 13 5-5 9 9-5 5" />
                <path d="m8 39 2-8 6 6-8 2Z" />
                <path d="M25 27h14v12H25z" />
                <path d="M29 31h6M29 35h6" />
            </>
        ),
        build: (
            <>
                <path d="M7 40h34" />
                <path d="M10 40V22l14-9 14 9v18" />
                <path d="M18 40V28h12v12" />
                <path d="M6 17 24 6l18 11" />
                <path d="M15 22h18" />
            </>
        ),
        handover: (
            <>
                <path d="M8 24 24 11l16 13" />
                <path d="M12 22v17h24V22" />
                <path d="M20 39V28h8v11" />
                <circle cx="35" cy="13" r="7" />
                <path d="m32 13 2 2 4-4" />
            </>
        ),
    };

    return <svg {...props}>{drawings[type] || drawings.build}</svg>;
}

function LineIcon({ type, size = 26 }) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.55,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
    };

    switch (type) {
        case "design":
            return <svg {...common}><path d="M4 20 15.5 8.5" /><path d="m13 6 5 5" /><path d="m3 21 4.5-1 12-12a2.1 2.1 0 0 0-3-3l-12 12L3 21Z" /><path d="M14 4 20 10" /></svg>;
        case "planning":
            return <svg {...common}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5" /><path d="m9 14 2 2 4-4" /></svg>;
        case "structure":
            return <svg {...common}><path d="M3 21h18" /><path d="M5 21V8l7-5 7 5v13" /><path d="M9 21v-7h6v7" /><path d="M5 10h14" /></svg>;
        case "control":
            return <svg {...common}><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m8.5 12 2.3 2.3 4.8-5" /></svg>;
        case "single":
            return <svg {...common}><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10" /><path d="M9 21v-7h6v7" /></svg>;
        case "double":
            return <svg {...common}><path d="m3 8 9-6 9 6" /><path d="M5 8v14h14V8" /><path d="M5 14h14" /><path d="M9 11h2M14 11h2M9 18h2M14 18h2" /></svg>;
        case "wrap":
            return <svg {...common}><path d="M4 20V8l8-5 8 5v12" /><path d="M4 13h8v7" /><path d="M12 13h8" /><path d="M8 20v-3" /></svg>;
        case "loft":
            return <svg {...common}><path d="m2 11 10-8 10 8" /><path d="M5 10v11h14V10" /><path d="M9 21v-6h6v6" /><path d="M8 8h8" /></svg>;
        case "gable":
            return <svg {...common}><path d="m3 11 9-8 9 8" /><path d="M6 9v12h12V9" /><path d="M8 13h8M8 17h8" /></svg>;
        default:
            return <svg {...common}><path d="m3 10 9-7 9 7" /><path d="M5 9v12h14V9" /><path d="M9 21v-7h6v7" /></svg>;
    }
}

function IconCard({ item, index }) {
    return (
        <a className="hx-type-card" href="#extension-enquiry" style={{ "--card-order": index }}>
            <span className="hx-type-image">
                <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    onError={(event) => {
                        event.currentTarget.style.display = "none";
                        event.currentTarget.nextElementSibling?.classList.add("is-visible");
                    }}
                />
                <span className="hx-type-fallback"><LineIcon type={item.fallback} size={42} /></span>
            </span>
            <span className="hx-type-card-title">{item.title}</span>
            <span className="hx-type-card-subtitle">{item.subtitle}</span>
            <span className="hx-card-arrow" aria-hidden="true">↗</span>
        </a>
    );
}

const HOUSE_EXTENSIONS_STYLES = String.raw`.hx-page{--hx-ink:#171714;--hx-ink-soft:#24231e;--hx-gold:#c6a243;--hx-gold-light:#e2c878;--hx-paper:#f5f3ee;--hx-muted:#706d64;color:var(--hx-ink);background:#fff;font-family:Inter,Arial,sans-serif;overflow:hidden}
.hx-page *{box-sizing:border-box}
.hx-eyebrow{display:inline-block;font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#9a792f}
.hx-eyebrow-light{color:#e2c878}
.hx-hero{position:relative;min-height:650px;display:flex;align-items:center;background:#151512;isolation:isolate}
.hx-hero-image,.hx-hero-shade{position:absolute;inset:0;z-index:-1}
.hx-hero-image{background-image:url('/images/extensionBackground.jpeg');background-size:cover;background-position:center 48%;transform:scale(1.015);animation:hxHeroZoom 16s ease-in-out infinite alternate}
.hx-hero-shade{background:linear-gradient(90deg,rgba(13,13,11,.9) 0%,rgba(18,18,15,.78) 44%,rgba(16,16,14,.19) 100%),linear-gradient(0deg,rgba(0,0,0,.33),transparent 45%)}
.hx-hero-content{width:min(1180px,100%);margin:0 auto;padding:112px 30px 100px;color:#fff;animation:hxFadeUp .8s ease both}
.hx-hero h1{margin:23px 0 18px;max-width:800px;font-size:clamp(48px,7.6vw,94px);line-height:.98;letter-spacing:-.065em;font-weight:800}
.hx-hero h1 em,.hx-section-heading h2 em,.hx-project-copy h2 em,.hx-process-heading h2 em,.hx-enquiry-copy h2 em{font-style:normal;color:var(--hx-gold-light)}
.hx-hero-content>p{max-width:500px;margin:0;color:#e5e2d9;font-size:clamp(16px,2vw,20px);line-height:1.6}
.hx-hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:32px}
.hx-button{display:inline-flex;align-items:center;justify-content:center;gap:18px;min-height:52px;padding:0 22px;border-radius:3px;text-decoration:none;font-size:13px;font-weight:800;letter-spacing:.02em;transition:transform .2s ease,background .2s ease,border-color .2s ease}
.hx-button:hover{transform:translateY(-3px)}
.hx-button-gold{background:var(--hx-gold);color:#151512}
.hx-button-gold:hover{background:#e0c16e}
.hx-button-outline{border:1px solid rgba(255,255,255,.52);color:#fff;background:rgba(255,255,255,.06)}
.hx-button-outline:hover{border-color:var(--hx-gold-light);background:rgba(255,255,255,.12)}
.hx-hero-meta{display:flex;align-items:center;gap:13px;flex-wrap:wrap;margin-top:54px;color:#d4d0c5;font-size:11px;font-weight:650;letter-spacing:.04em}
.hx-hero-meta i{width:4px;height:4px;border-radius:50%;background:var(--hx-gold)}
.hx-hero-side-label{position:absolute;right:24px;bottom:36px;color:rgba(255,255,255,.6);font-size:9px;letter-spacing:.24em;writing-mode:vertical-rl}
.hx-accreditations{background:#fff;border-bottom:1px solid #e9e5dc}
.hx-accreditations-inner{width:min(1180px,100%);margin:0 auto;padding:24px 30px;display:flex;align-items:center;justify-content:space-between;gap:34px}
.hx-accreditation-intro{display:grid;gap:5px;flex-shrink:0}
.hx-accreditation-intro strong{font-size:15px;letter-spacing:-.02em}
.hx-accreditation-logos{display:flex;align-items:center;justify-content:flex-end;gap:clamp(24px,5vw,70px);flex:1}
.hx-accreditation-logos img{display:block;max-width:150px;width:auto;height:58px;object-fit:contain}
.hx-accreditation-logos img:first-child{height:65px}
.hx-accreditation-logos img:last-child{height:65px;max-width:175px}
.hx-section{width:min(1180px,100%);margin:0 auto;padding:104px 30px}
.hx-section-heading{display:flex;align-items:end;justify-content:space-between;gap:40px;margin-bottom:42px}
.hx-section-heading h2,.hx-project-copy h2,.hx-process-heading h2,.hx-enquiry-copy h2{margin:12px 0 0;font-size:clamp(36px,5.2vw,62px);line-height:1.02;letter-spacing:-.055em}
.hx-section-heading>p{max-width:370px;margin:0;color:var(--hx-muted);font-size:14px;line-height:1.75}
.hx-type-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.hx-type-card{position:relative;min-height:255px;padding:22px 22px 20px;border:1px solid #e9e5dc;background:linear-gradient(145deg,#fbfaf7,#f4f1e9);display:flex;flex-direction:column;justify-content:flex-end;text-decoration:none;color:var(--hx-ink);overflow:hidden;transition:transform .24s ease,border-color .24s ease,box-shadow .24s ease;animation:hxFadeUp .7s ease both;animation-delay:calc(var(--card-order)*.06s)}
.hx-type-card:hover{transform:translateY(-5px);border-color:#c6a243;box-shadow:0 20px 45px rgba(28,26,18,.09)}
.hx-type-image{position:absolute;inset:15px 15px 72px;display:flex;align-items:center;justify-content:center}
.hx-type-image img{width:100%;height:100%;max-width:240px;object-fit:contain;transition:transform .28s ease}
.hx-type-card:hover .hx-type-image img{transform:scale(1.06)}
.hx-type-fallback{display:none;width:96px;height:96px;align-items:center;justify-content:center;color:#a3843d;border:1px solid rgba(166,132,61,.3);border-radius:50%;background:rgba(255,255,255,.62)}
.hx-type-fallback.is-visible{display:flex}
.hx-type-card-title{position:relative;z-index:1;font-size:17px;font-weight:800;letter-spacing:-.025em}
.hx-type-card-subtitle{position:relative;z-index:1;margin-top:5px;color:#777267;font-size:11px}
.hx-card-arrow{position:absolute;right:21px;bottom:19px;color:#a3843d;font-size:18px;transition:transform .2s ease}
.hx-type-card:hover .hx-card-arrow{transform:translate(3px,-3px)}
.hx-project-section{display:grid;grid-template-columns:minmax(280px,.8fr) minmax(0,1.2fr);gap:36px;align-items:center;padding:88px max(30px,calc((100vw - 1180px)/2));background:#171714;color:#fff}
.hx-project-copy{max-width:390px}
.hx-project-copy>p{max-width:340px;margin:18px 0 26px;color:#c9c5bb;font-size:14px;line-height:1.75}
.hx-text-link{display:inline-flex;align-items:center;gap:15px;color:var(--hx-gold-light);text-decoration:none;font-size:12px;font-weight:800;letter-spacing:.04em;border-bottom:1px solid rgba(226,200,120,.55);padding-bottom:8px}
.hx-text-link:hover{color:#fff;border-color:#fff}
.hx-project-gallery{display:grid;grid-template-columns:1.35fr 1fr;grid-template-rows:repeat(2,190px);gap:12px}
.hx-project-image{position:relative;margin:0;overflow:hidden;background:#302f29}
.hx-project-image-large{grid-row:1 / span 2}
.hx-project-image img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease}
.hx-project-image:hover img{transform:scale(1.045)}
.hx-project-image figcaption{position:absolute;left:13px;bottom:12px;color:#fff;background:rgba(17,17,15,.75);padding:7px 9px;font-size:9px;letter-spacing:.16em;font-weight:750}
.hx-heading-compact{margin-bottom:34px}
.hx-capability-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.hx-capability-card{min-height:205px;padding:22px 20px;background:#f6f4ee;border:1px solid #e9e5dc;transition:transform .22s ease,border-color .22s ease}
.hx-capability-card:hover{transform:translateY(-4px);border-color:#c6a243}
.hx-capability-top{display:flex;justify-content:space-between;align-items:center;color:#9b7b36}
.hx-capability-top>span{font-size:10px;font-weight:850;letter-spacing:.15em}
.hx-capability-card h3{margin:34px 0 8px;font-size:16px;letter-spacing:-.02em}
.hx-capability-card p{margin:0;color:#777267;font-size:12px;line-height:1.65}
.hx-process{background:#f1eee6}
.hx-process-inner{width:min(1180px,100%);margin:0 auto;padding:82px 30px;display:grid;grid-template-columns:.8fr 1.2fr;gap:55px;align-items:center}
.hx-process-heading h2{font-size:clamp(38px,4.8vw,56px)}
.hx-process-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.hx-process-steps article{padding:22px 18px;border-left:1px solid #d3c9ad}
.hx-process-steps article>span{color:#a3843d;font-size:10px;font-weight:850;letter-spacing:.14em}
.hx-process-steps h3{margin:17px 0 7px;font-size:16px}
.hx-process-steps p{margin:0;color:#777267;font-size:12px;line-height:1.65}
.hx-faq-section{padding-top:85px;padding-bottom:85px}
.hx-faq-list{border-top:1px solid #e8e4db}
.hx-faq-item{border-bottom:1px solid #e8e4db}
.hx-faq-question{width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:20px 2px;border:0;background:none;text-align:left;color:#24231e;font:inherit;font-size:14px;font-weight:750;cursor:pointer}
.hx-faq-chevron{width:28px;height:28px;display:grid;place-items:center;border:1px solid #d9d1bd;border-radius:50%;color:#9b7b36;font-size:20px;font-weight:400;flex-shrink:0}
.hx-faq-answer{max-width:760px;margin:0;padding:0 40px 22px 2px;color:#777267;font-size:13px;line-height:1.8;animation:hxFadeUp .24s ease both}
.hx-enquiry-section{display:grid;grid-template-columns:minmax(270px,.75fr) minmax(0,1.25fr);gap:36px;align-items:start;padding:86px max(30px,calc((100vw - 1180px)/2));background:#171714;color:#fff}
.hx-enquiry-copy{position:sticky;top:110px;padding-top:16px}
.hx-enquiry-copy>p{max-width:350px;margin:18px 0 28px;color:#c9c5bb;font-size:14px;line-height:1.75}
.hx-enquiry-contact{display:grid;gap:10px}
.hx-enquiry-contact a{color:#e4d6ae;text-decoration:none;font-size:13px;font-weight:700}
.hx-enquiry-form{min-width:0}
.hx-mobile-cta{display:none}
@keyframes hxHeroZoom{from{transform:scale(1.015)}to{transform:scale(1.07)}}
@keyframes hxFadeUp{from{opacity:.25;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:900px){.hx-hero{min-height:590px}.hx-project-section{grid-template-columns:1fr;padding:70px 30px}.hx-project-copy{max-width:600px}.hx-project-gallery{grid-template-rows:repeat(2,150px)}.hx-capability-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.hx-process-inner{grid-template-columns:1fr;gap:32px}.hx-enquiry-section{grid-template-columns:1fr;padding:70px 30px}.hx-enquiry-copy{position:static}.hx-enquiry-copy>p{max-width:620px}}
@media(max-width:640px){.hx-hero{min-height:610px;align-items:end}.hx-hero-image{background-position:56% center}.hx-hero-shade{background:linear-gradient(0deg,rgba(13,13,11,.94) 0%,rgba(18,18,15,.68) 64%,rgba(16,16,14,.28) 100%)}.hx-hero-content{padding:105px 22px 62px}.hx-hero h1{font-size:clamp(46px,13vw,64px)}.hx-hero-content>p{font-size:15px}.hx-hero-actions{display:grid;grid-template-columns:1fr}.hx-button{width:100%}.hx-hero-meta{margin-top:34px;gap:9px;font-size:9px}.hx-hero-side-label{display:none}.hx-accreditations-inner{padding:20px 18px;display:grid;gap:17px}.hx-accreditation-intro{display:flex;align-items:baseline;justify-content:space-between}.hx-accreditation-logos{justify-content:space-between;gap:15px}.hx-accreditation-logos img{height:40px;max-width:90px}.hx-accreditation-logos img:first-child{height:47px}.hx-accreditation-logos img:last-child{height:45px;max-width:110px}.hx-section{padding:70px 20px}.hx-section-heading{display:grid;gap:18px;margin-bottom:28px}.hx-section-heading h2,.hx-project-copy h2,.hx-process-heading h2,.hx-enquiry-copy h2{font-size:clamp(35px,10vw,47px)}.hx-section-heading>p{font-size:13px}.hx-type-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.hx-type-card{min-height:190px;padding:14px 13px 15px}.hx-type-image{inset:9px 8px 66px}.hx-type-fallback{width:70px;height:70px}.hx-type-card-title{font-size:13px;line-height:1.25;max-width:90%}.hx-type-card-subtitle{font-size:9px;line-height:1.4;max-width:90%}.hx-card-arrow{right:12px;bottom:13px;font-size:15px}.hx-project-section{padding:66px 20px;gap:26px}.hx-project-gallery{grid-template-rows:repeat(2,112px);gap:8px}.hx-project-image figcaption{left:7px;bottom:7px;padding:5px 6px;font-size:7px}.hx-capability-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.hx-capability-card{min-height:175px;padding:16px 14px}.hx-capability-card h3{margin-top:27px;font-size:14px}.hx-capability-card p{font-size:11px}.hx-process-inner{padding:65px 20px;gap:25px}.hx-process-steps{grid-template-columns:1fr;gap:0}.hx-process-steps article{padding:14px 16px;border-left:1px solid #d3c9ad;border-bottom:1px solid #ddd5c4}.hx-process-steps h3{margin:8px 0 4px}.hx-faq-section{padding-top:62px;padding-bottom:74px}.hx-faq-question{font-size:13px;padding:17px 0}.hx-faq-answer{font-size:12px;padding-bottom:18px}.hx-enquiry-section{padding:65px 16px 88px;gap:25px}.hx-mobile-cta{display:flex;position:fixed;z-index:80;left:12px;right:12px;bottom:12px;min-height:52px;align-items:center;justify-content:center;gap:14px;background:#c6a243;color:#161613;text-decoration:none;font-size:13px;font-weight:850;box-shadow:0 8px 28px rgba(0,0,0,.18)}body:has(.hx-mobile-cta){padding-bottom:74px}}


/* CRAF​​MAN BLACK & GOLD THEME — scoped to the extension page */
.hx-page{
  --hx-ink:#080808;
  --hx-ink-soft:#11110f;
  --hx-gold:#c8a64b;
  --hx-gold-light:#e6cd83;
  --hx-paper:#10100e;
  --hx-muted:#c0b38f;
  color:#f4ecd8;
  background:#080808;
}
.hx-page .hx-eyebrow{color:#c8a64b}
.hx-page .hx-eyebrow-light{color:#e6cd83}
.hx-page .hx-hero h1 em,
.hx-page .hx-section-heading h2 em,
.hx-page .hx-project-copy h2 em,
.hx-page .hx-process-heading h2 em,
.hx-page .hx-enquiry-copy h2 em{color:#e6cd83}
.hx-page .hx-accreditations{background:#10100e;border-top:1px solid rgba(200,166,75,.25);border-bottom:1px solid rgba(200,166,75,.35)}
.hx-page .hx-accreditation-intro strong{color:#f4ecd8}
.hx-page .hx-accreditation-logos img{filter:none}
.hx-page .hx-section{background:#080808;color:#f4ecd8}
.hx-page .hx-section-heading>p{color:#c0b38f}
.hx-page .hx-type-card{
  background:linear-gradient(145deg,#191916,#0e0e0c);
  border:1px solid rgba(200,166,75,.34);
  color:#f4ecd8;
}
.hx-page .hx-type-card:hover{border-color:#e6cd83;box-shadow:0 20px 45px rgba(200,166,75,.13)}
.hx-page .hx-type-card-title{color:#f2e6c5}
.hx-page .hx-type-card-subtitle{color:#b9ad8c}
.hx-page .hx-type-fallback{color:#e0bd63;border-color:rgba(200,166,75,.48);background:rgba(200,166,75,.08)}
.hx-page .hx-card-arrow{color:#e0bd63}
.hx-page .hx-project-section{background:#11110f;border-top:1px solid rgba(200,166,75,.32);border-bottom:1px solid rgba(200,166,75,.32)}
.hx-page .hx-project-copy>p{color:#c0b38f}
.hx-page .hx-text-link{color:#e6cd83;border-color:rgba(230,205,131,.65)}
.hx-page .hx-text-link:hover{color:#fff}
.hx-page .hx-capability-card{
  background:linear-gradient(145deg,#191916,#10100e);
  border:1px solid rgba(200,166,75,.3);
  color:#f4ecd8;
}
.hx-page .hx-capability-card:hover{border-color:#e6cd83;box-shadow:0 14px 32px rgba(200,166,75,.1)}
.hx-page .hx-capability-top{color:#e0bd63}
.hx-page .hx-capability-card h3{color:#f2e6c5}
.hx-page .hx-capability-card p{color:#c0b38f}
.hx-page .hx-process{background:#10100e;border-top:1px solid rgba(200,166,75,.28);border-bottom:1px solid rgba(200,166,75,.28);color:#f4ecd8}
.hx-page .hx-process-steps article{border-left-color:rgba(200,166,75,.65)}
.hx-page .hx-process-steps article>span{color:#e0bd63}
.hx-page .hx-process-steps h3{color:#f2e6c5}
.hx-page .hx-process-steps p{color:#c0b38f}
.hx-page .hx-faq-list,.hx-page .hx-faq-item{border-color:rgba(200,166,75,.3)}
.hx-page .hx-faq-question{color:#f2e6c5}
.hx-page .hx-faq-chevron{border-color:rgba(200,166,75,.55);color:#e6cd83;background:rgba(200,166,75,.06)}
.hx-page .hx-faq-answer{color:#c0b38f}
.hx-page .hx-enquiry-section{background:#11110f;border-top:1px solid rgba(200,166,75,.4)}
.hx-page .hx-enquiry-copy>p{color:#c0b38f}
.hx-page .hx-enquiry-contact a{color:#e6cd83}
.hx-page .hx-mobile-cta{background:#c8a64b;color:#090909;border:1px solid #e6cd83}
@media(max-width:640px){
  .hx-page .hx-process{background:#10100e}
  .hx-page .hx-type-card{background:linear-gradient(145deg,#191916,#0e0e0c)}
}



/* MOBILE-FIRST CARD, FULL-COVER HERO OVERLAY AND TRUST STRIP REFINEMENT */
.hx-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: #080807;
}
.hx-hero-image {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/extensionBackground.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 48%;
  transform: scale(1.02);
  animation: hxHeroZoom 16s ease-in-out infinite alternate;
}
.hx-hero-shade {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(5,5,4,.90) 0%, rgba(7,7,6,.78) 52%, rgba(7,7,6,.48) 100%),
    linear-gradient(180deg, rgba(5,5,4,.22) 0%, rgba(5,5,4,.10) 34%, rgba(5,5,4,.82) 100%);
}
.hx-hero-content,
.hx-hero-side-label {
  position: relative;
  z-index: 2;
}
.hx-hero-content { width: min(1180px,100%); }
.hx-hero-content > * { position: relative; z-index: 2; }

/* Equal-sized accreditation tiles prevent tall and wide logos from looking mismatched. */
.hx-accreditations {
  width: 100%;
  background: #10100e;
  border-top: 1px solid rgba(200,166,75,.28);
  border-bottom: 1px solid rgba(200,166,75,.35);
}
.hx-accreditations-inner {
  width: min(1180px,100%);
}
.hx-accreditation-logos {
  min-width: 0;
  width: min(620px,100%);
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  align-items: center;
  gap: 12px;
}
.hx-accreditation-logo {
  height: 78px;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: #fff;
  border: 1px solid rgba(200,166,75,.32);
  border-radius: 3px;
  overflow: hidden;
}
.hx-accreditation-logo img {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 150px;
  max-height: 62px;
  object-fit: contain;
}
.hx-fmb-logo img { max-width: 45px; max-height: 62px; }
.hx-trustmark-logo img { max-width: 128px; max-height: 58px; }
.hx-google-logo img { max-width: 145px; max-height: 58px; }

@media(max-width:640px) {
  .hx-hero {
    min-height: 650px;
    align-items: flex-end;
  }
  .hx-hero-image {
    inset: 0;
    background-position: 58% center;
    transform: scale(1.04);
  }
  .hx-hero-shade {
    inset: 0;
    background:
      linear-gradient(180deg, rgba(5,5,4,.52) 0%, rgba(5,5,4,.58) 32%, rgba(5,5,4,.94) 100%),
      linear-gradient(90deg, rgba(5,5,4,.35), rgba(5,5,4,.22));
  }
  .hx-hero-content {
    width: 100%;
    padding: 112px 20px 50px;
  }

  /* Trust heading sits above three equal, generously sized logo tiles. */
  .hx-accreditations-inner {
    display: grid;
    width: 100%;
    gap: 15px;
    padding: 18px 16px 20px;
  }
  .hx-accreditation-intro {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: flex-start;
    gap: 5px 9px;
  }
  .hx-accreditation-intro .hx-eyebrow { font-size: 9px; }
  .hx-accreditation-intro strong { font-size: 13px; }
  .hx-accreditation-logos {
    width: 100%;
    grid-template-columns: repeat(3,minmax(0,1fr));
    gap: 8px;
  }
  .hx-accreditation-logo {
    height: 70px;
    padding: 7px;
    border-radius: 3px;
  }
  .hx-fmb-logo img { max-width: 38px; max-height: 56px; }
  .hx-trustmark-logo img { max-width: 100%; max-height: 50px; }
  .hx-google-logo img { max-width: 100%; max-height: 48px; }

  /* Larger illustration area, simpler two-column cards and readable tap targets. */
  .hx-type-grid {
    grid-template-columns: repeat(2,minmax(0,1fr));
    gap: 11px;
  }
  .hx-type-card {
    min-width: 0;
    min-height: 214px;
    padding: 13px 12px 15px;
    border-radius: 4px;
  }
  .hx-type-image {
    inset: 9px 9px 74px;
    padding: 8px;
    background: radial-gradient(ellipse at center, rgba(200,166,75,.11), rgba(200,166,75,0) 72%);
  }
  .hx-type-image img {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
  }
  .hx-type-fallback {
    width: 66px;
    height: 66px;
  }
  .hx-type-card-title {
    max-width: calc(100% - 17px);
    font-size: 13px;
    line-height: 1.28;
    color: #f5e8c4;
  }
  .hx-type-card-subtitle {
    max-width: 100%;
    margin-top: 5px;
    font-size: 10px;
    line-height: 1.35;
    color: #c6b88f;
  }
  .hx-card-arrow {
    right: 10px;
    bottom: 12px;
    font-size: 14px;
    color: #e6cd83;
  }
}
@media(max-width:360px) {
  .hx-type-grid { gap: 8px; }
  .hx-type-card { min-height: 196px; padding: 11px 10px 13px; }
  .hx-type-image { inset: 8px 7px 70px; }
  .hx-type-card-title { font-size: 12px; }
  .hx-type-card-subtitle { font-size: 9px; }
  .hx-accreditation-logo { height: 62px; padding: 5px; }
}

/* Clear the Vite starter's centred #root frame on this full-width landing page. */
html:has(.hx-page), body:has(.hx-page) {
  width: 100%;
  min-width: 320px;
  min-height: 100%;
  margin: 0 !important;
  padding: 0 !important;
  background: #080808 !important;
}
body:has(.hx-page) #root {
  width: 100% !important;
  max-width: none !important;
  min-height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
  text-align: left !important;
  background: #080808 !important;
}



/* Crafman at a glance — compact black-and-gold stats panel */
.hx-stats-strip{
  position:relative;
  z-index:3;
  width:100%;
  color:#f4ecd8;
  background:#0b0b09;
  border-top:1px solid rgba(200,166,75,.45);
  border-bottom:1px solid rgba(200,166,75,.45);
}
.hx-stats-inner{
  width:min(1180px,100%);
  margin:0 auto;
  padding:32px 30px 29px;
}
.hx-stats-heading h2{
  margin:9px 0 20px;
  color:#f6efdc;
  font-size:clamp(25px,3vw,32px);
  line-height:1.08;
  letter-spacing:-.045em;
}
.hx-stats-heading h2 em{color:#e1c16b;font-style:normal}
.hx-stats-numbers{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  align-items:stretch;
}
.hx-stat{
  min-width:0;
  padding:2px 18px 3px;
  border-left:1px solid rgba(200,166,75,.38);
}
.hx-stat:first-child{padding-left:0;border-left:0}
.hx-stat-value{
  display:flex;
  align-items:baseline;
  gap:1px;
  color:#e3c16a;
  font-size:clamp(40px,5vw,52px);
  font-weight:850;
  letter-spacing:-.075em;
  line-height:1;
  font-variant-numeric:tabular-nums;
}
.hx-stat-prefix,.hx-stat-suffix{font-size:.72em}
.hx-stat-label{
  max-width:180px;
  margin-top:8px;
  color:#f4ecd8;
  font-size:12px;
  font-weight:800;
  line-height:1.3;
}
.hx-stat-detail{
  max-width:220px;
  margin:5px 0 0;
  color:#b8ad91;
  font-size:10px;
  line-height:1.4;
}
@media(max-width:640px){
  .hx-stats-inner{padding:27px 17px 25px}
  .hx-stats-heading h2{font-size:26px;margin:8px 0 18px}
  .hx-stats-numbers{grid-template-columns:repeat(3,minmax(0,1fr));}
  .hx-stat{padding:2px 10px 3px}
  .hx-stat:first-child{padding-left:0}
  .hx-stat-value{font-size:clamp(33px,9.6vw,46px)}
  .hx-stat-label{font-size:10px;line-height:1.28;margin-top:7px}
  .hx-stat-detail{font-size:9px;line-height:1.35}
  .hx-stats-footnote{font-size:9px;margin-top:11px}
}
@media(max-width:360px){
  .hx-stats-inner{padding-right:14px;padding-left:14px}
  .hx-stat{padding-right:7px;padding-left:7px}
  .hx-stat-value{font-size:32px}
  .hx-stat-label{font-size:9px}
}
@media(prefers-reduced-motion:reduce){
  .hx-stat-value{transition:none!important}
}


/* 100% project coordination — refined three-stage architectural sequence */
.hx-coordination-section{
  position:relative;
  isolation:isolate;
  overflow:hidden;
  color:#f4ecd8;
  background:
    radial-gradient(ellipse at 85% 8%,rgba(197,161,70,.14),transparent 35%),
    linear-gradient(118deg,#080807 0%,#11110e 50%,#090908 100%);
  border-top:1px solid rgba(200,166,75,.42);
  border-bottom:1px solid rgba(200,166,75,.42);
}
.hx-coordination-section:before{
  content:"";
  position:absolute;
  z-index:-1;
  inset:0;
  opacity:.12;
  pointer-events:none;
  background-image:linear-gradient(rgba(221,191,109,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(221,191,109,.12) 1px,transparent 1px);
  background-size:78px 78px;
  mask-image:linear-gradient(90deg,transparent 0%,#000 48%,#000 100%);
}
.hx-coordination-inner{
  width:min(1200px,100%);
  margin:0 auto;
  padding:72px 32px 76px;
}
.hx-coordination-topline{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:18px;
  padding-bottom:17px;
  border-bottom:1px solid rgba(201,169,89,.25);
}
.hx-coordination-caption{
  color:#a99b77;
  font-size:9px;
  font-weight:800;
  letter-spacing:.19em;
}
.hx-coordination-intro{
  display:grid;
  grid-template-columns:auto minmax(0,1fr) auto;
  align-items:center;
  gap:26px;
  padding:36px 0 42px;
}
.hx-coordination-display{
  color:#e3c16a;
  font-size:clamp(70px,8.6vw,106px);
  font-weight:850;
  letter-spacing:-.105em;
  line-height:.82;
  text-shadow:0 14px 55px rgba(200,166,75,.12);
}
.hx-coordination-display span{
  margin-left:3px;
  font-size:.42em;
  vertical-align:top;
  letter-spacing:-.06em;
}
.hx-coordination-intro h2{
  margin:0 0 9px;
  color:#f6efdc;
  font-size:clamp(30px,4vw,48px);
  line-height:.98;
  letter-spacing:-.06em;
}
.hx-coordination-intro h2 em{color:#e3c16a;font-style:normal}
.hx-coordination-intro p{
  max-width:440px;
  margin:0;
  color:#bdb194;
  font-size:13px;
  line-height:1.6;
}
.hx-coordination-link{
  display:inline-flex;
  align-items:center;
  gap:17px;
  justify-self:end;
  padding:0 0 8px;
  color:#e5c873;
  border-bottom:1px solid rgba(229,200,115,.55);
  text-decoration:none;
  font-size:11px;
  font-weight:800;
  transition:gap .2s ease,color .2s ease;
}
.hx-coordination-link:hover{gap:24px;color:#fff0c5}
.hx-coordination-journey{
  position:relative;
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:28px;
  padding-top:2px;
}
.hx-coordination-rail{
  position:absolute;
  top:42px;
  left:14%;
  right:14%;
  height:1px;
  background:linear-gradient(90deg,rgba(200,166,75,.2),rgba(226,194,105,.8),rgba(200,166,75,.2));
}
.hx-coordination-rail span{
  position:absolute;
  top:-3px;
  left:0;
  width:7px;
  height:7px;
  border-radius:50%;
  background:#e5c873;
  box-shadow:0 0 0 5px rgba(229,200,115,.12),0 0 22px rgba(229,200,115,.8);
  animation:hxCoordinationPulse 3.5s ease-in-out infinite;
}
.hx-coordination-stage{
  position:relative;
  min-width:0;
  padding:0 0 0 20px;
  border-left:1px solid rgba(201,169,89,.25);
  animation:hxFadeUp .65s ease both;
}
.hx-coordination-stage-visual{
  position:relative;
  z-index:1;
  display:flex;
  min-height:88px;
  align-items:flex-start;
  justify-content:space-between;
}
.hx-coordination-stage-icon{
  width:66px;
  height:66px;
  display:grid;
  place-items:center;
  color:#e5c873;
  border:1px solid rgba(210,177,91,.62);
  border-radius:50%;
  background:radial-gradient(circle at 35% 25%,#29251a,#11110e 72%);
  box-shadow:0 0 0 8px rgba(200,166,75,.045),0 12px 28px rgba(0,0,0,.25);
  transition:transform .22s ease,background .22s ease,border-color .22s ease;
}
.hx-coordination-stage-icon svg{width:32px;height:32px}
.hx-coordination-stage:hover .hx-coordination-stage-icon{
  transform:translateY(-4px) scale(1.04);
  background:radial-gradient(circle at 35% 25%,#39301a,#17140d 72%);
  border-color:#f0d27b;
}
.hx-coordination-stage-number{
  padding:8px 0 0 10px;
  color:#e4c16c;
  font-size:10px;
  font-weight:850;
  letter-spacing:.15em;
}
.hx-coordination-stage-number i{
  color:#7f765f;
  font-style:normal;
  font-weight:600;
}
.hx-coordination-stage-copy{
  margin-top:19px;
  padding-top:16px;
  border-top:1px solid rgba(201,169,89,.27);
}
.hx-coordination-stage-note{
  display:block;
  margin-bottom:11px;
  color:#d0ae58;
  font-size:8px;
  font-weight:850;
  letter-spacing:.16em;
}
.hx-coordination-stage-copy h3{
  margin:0;
  color:#f5ebd1;
  font-size:clamp(20px,2vw,25px);
  line-height:1.15;
  letter-spacing:-.04em;
}
.hx-coordination-stage-copy p{
  max-width:300px;
  margin:10px 0 0;
  color:#b5a989;
  font-size:12px;
  line-height:1.65;
}
@media(max-width:820px){
  .hx-coordination-inner{padding:58px 24px 62px}
  .hx-coordination-intro{
    grid-template-columns:auto minmax(0,1fr);
    gap:18px;
  }
  .hx-coordination-display{font-size:clamp(64px,12vw,88px)}
  .hx-coordination-link{grid-column:2;justify-self:start;margin-top:0}
  .hx-coordination-journey{gap:17px}
  .hx-coordination-stage{padding-left:14px}
  .hx-coordination-stage-copy h3{font-size:20px}
}
@media(max-width:600px){
  .hx-coordination-inner{padding:43px 19px 47px}
  .hx-coordination-topline{align-items:flex-start;flex-direction:column;gap:8px;padding-bottom:14px}
  .hx-coordination-caption{font-size:8px}
  .hx-coordination-intro{
    grid-template-columns:auto minmax(0,1fr);
    align-items:center;
    gap:13px;
    padding:26px 0 29px;
  }
  .hx-coordination-display{font-size:clamp(56px,17vw,76px)}
  .hx-coordination-intro h2{font-size:clamp(25px,7.2vw,34px)}
  .hx-coordination-intro p{font-size:10px;line-height:1.45}
  .hx-coordination-link{font-size:10px;grid-column:2;margin-top:1px}
  .hx-coordination-journey{
    grid-template-columns:1fr;
    gap:0;
    padding:0 0 0 1px;
  }
  .hx-coordination-rail{
    top:31px;
    bottom:31px;
    left:32px;
    right:auto;
    width:1px;
    height:auto;
    background:linear-gradient(180deg,rgba(200,166,75,.2),rgba(226,194,105,.8),rgba(200,166,75,.2));
  }
  .hx-coordination-rail span{
    top:0;
    left:-3px;
    animation:hxCoordinationPulseVertical 3.5s ease-in-out infinite;
  }
  .hx-coordination-stage{
    display:grid;
    grid-template-columns:66px minmax(0,1fr);
    align-items:center;
    gap:17px;
    min-height:114px;
    padding:12px 0;
    border-left:0;
  }
  .hx-coordination-stage-visual{
    min-height:0;
    align-items:center;
    justify-content:center;
  }
  .hx-coordination-stage-icon{width:64px;height:64px}
  .hx-coordination-stage-icon svg{width:30px;height:30px}
  .hx-coordination-stage-number{
    position:absolute;
    top:4px;
    left:75px;
    padding:0;
    font-size:8px;
  }
  .hx-coordination-stage-copy{
    align-self:stretch;
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin:0;
    padding:17px 0 10px;
    border-top:1px solid rgba(201,169,89,.23);
  }
  .hx-coordination-stage-note{font-size:7px;margin-bottom:7px}
  .hx-coordination-stage-copy h3{font-size:18px}
  .hx-coordination-stage-copy p{margin-top:5px;font-size:10px;line-height:1.5}
}
@media(max-width:360px){
  .hx-coordination-inner{padding-right:15px;padding-left:15px}
  .hx-coordination-intro{gap:9px}
  .hx-coordination-display{font-size:54px}
  .hx-coordination-intro h2{font-size:24px}
  .hx-coordination-stage{grid-template-columns:60px minmax(0,1fr);gap:13px}
  .hx-coordination-stage-icon{width:58px;height:58px}
  .hx-coordination-stage-number{left:68px}
  .hx-coordination-stage-copy h3{font-size:16px}
}
@keyframes hxCoordinationPulse{
  0%,100%{transform:translateX(0);opacity:.75}
  50%{transform:translateX(10px);opacity:1}
}
@keyframes hxCoordinationPulseVertical{
  0%,100%{transform:translateY(0);opacity:.75}
  50%{transform:translateY(10px);opacity:1}
}
@media(prefers-reduced-motion:reduce){
  .hx-coordination-stage,.hx-coordination-stage-icon,.hx-coordination-link{animation:none!important;transition:none!important}
  .hx-coordination-rail span{animation:none!important}
}



/* Hero enquiry form: editorial copy on the left, conversion form on the right. */
.hx-hero{min-height:730px;align-items:center}
.hx-hero-layout{
  position:relative;z-index:2;width:min(1220px,100%);margin:0 auto;padding:78px 30px 82px;
  display:grid;grid-template-columns:minmax(0,1.13fr) minmax(360px,.82fr);gap:clamp(30px,5vw,76px);align-items:center;
}
.hx-hero-content{width:auto;max-width:690px;margin:0;padding:0;animation:hxFadeUp .8s ease both}
.hx-hero h1{max-width:690px;font-size:clamp(52px,6.3vw,82px)}
.hx-hero-content>p{max-width:470px}
.hx-hero-form-wrap{width:100%;max-width:460px;justify-self:end;scroll-margin-top:110px}

.hx-hero-offer{
  display:flex;align-items:flex-start;gap:13px;max-width:500px;margin:23px 0 0;padding:13px 15px;
  border:1px solid rgba(230,205,131,.48);border-left:3px solid #e6cd83;
  background:linear-gradient(105deg,rgba(200,166,75,.17),rgba(15,15,13,.56));
  box-shadow:0 12px 32px rgba(0,0,0,.13);
}
.hx-hero-offer-mark{
  flex:0 0 31px;width:31px;height:31px;display:grid;place-items:center;margin-top:2px;
  border:1px solid rgba(230,205,131,.55);border-radius:50%;color:#e6cd83;font-size:16px;
}
.hx-hero-offer-copy{display:grid;gap:3px;min-width:0}
.hx-hero-offer-kicker{color:#e6cd83;font-size:8px;font-weight:850;letter-spacing:.18em;text-transform:uppercase}
 .hx-hero-offer-copy strong{color:#fff3d2;font-size:15px;line-height:1.25;letter-spacing:-.025em;text-transform:uppercase}
.hx-free-highlight{display:inline-block;color:#f0d47f;background:rgba(230,205,131,.12);padding:0 3px;text-decoration:underline;text-decoration-color:#e6cd83;text-decoration-thickness:2px;text-underline-offset:4px}
.hx-hero-offer-copy p{margin:1px 0 0;color:#e1d8c2;font-size:11px;line-height:1.55}
.hx-hero-offer-copy small{margin-top:2px;color:#a99d80;font-size:9px;line-height:1.45}
.hx-claim-drawings-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;width:fit-content;min-height:39px;margin-top:12px;padding:0 14px;border:1px solid #e6cd83;border-radius:2px;background:#c8a64b;color:#090908;text-decoration:none;font-size:10px;font-weight:900;letter-spacing:.055em;text-transform:uppercase;box-shadow:0 5px 16px rgba(0,0,0,.18);transition:transform .2s ease,background .2s ease,box-shadow .2s ease}
.hx-claim-drawings-btn:hover{transform:translateY(-2px);background:#e6cd83;box-shadow:0 8px 22px rgba(0,0,0,.28)}
.hx-claim-drawings-btn:focus-visible{outline:2px solid #fff3d2;outline-offset:4px}
.hx-claim-drawings-btn .hx-free-highlight{color:#090908;background:rgba(255,255,255,.3);text-decoration-color:#090908;text-underline-offset:3px}
.hx-hero .hx-hero-side-label{z-index:2}
.hx-faq-intro{max-width:820px;margin:-7px 0 31px;color:#c0b38f;font-size:14px;line-height:1.8}
.hx-faq-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:38px;border-top:1px solid rgba(200,166,75,.38)}
.hx-faq-item{min-width:0;padding:0;border-bottom:1px solid rgba(200,166,75,.28)}
.hx-faq-question{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:18px;margin:0;padding:20px 2px;color:#f2e6c5;font-size:16px;font-weight:800;line-height:1.35;letter-spacing:-.02em;cursor:pointer}
.hx-faq-question::-webkit-details-marker{display:none}
.hx-faq-question::marker{content:""}
.hx-faq-question:hover{color:#e6cd83}
.hx-faq-question:focus-visible{outline:2px solid #e6cd83;outline-offset:4px;border-radius:2px}
.hx-faq-toggle{width:28px;height:28px;display:grid;place-items:center;flex:0 0 28px;border:1px solid rgba(200,166,75,.55);border-radius:50%;color:#e6cd83;background:rgba(200,166,75,.06);font-size:19px;font-weight:400;line-height:1}
.hx-faq-toggle::before{content:"+"}
.hx-faq-item[open] .hx-faq-toggle::before{content:"−"}
.hx-faq-answer{max-width:none;margin:0;padding:0 45px 22px 2px;color:#c0b38f;font-size:13px;line-height:1.8;animation:hxFadeUp .2s ease both}
.hx-faq-sources{display:grid;gap:9px;margin-top:34px;padding:22px 24px;border:1px solid rgba(200,166,75,.3);background:#10100e}
.hx-faq-sources strong{margin-bottom:3px;color:#f2e6c5;font-size:12px;letter-spacing:.05em;text-transform:uppercase}
.hx-faq-sources a{color:#e6cd83;font-size:12px;line-height:1.6;text-decoration:none}
.hx-faq-sources a:hover{text-decoration:underline}
.hx-faq-disclaimer{max-width:920px;margin:18px 0 0;color:#93886c;font-size:11px;line-height:1.7}
@media(max-width:1020px){
  .hx-hero{min-height:0}
  .hx-hero-layout{grid-template-columns:minmax(0,1fr) minmax(330px,.86fr);gap:28px;padding-top:70px;padding-bottom:70px}
  .hx-hero h1{font-size:clamp(48px,6vw,68px)}
  .hx-hero-meta{margin-top:36px}
}
@media(max-width:760px){
  .hx-hero-layout{grid-template-columns:1fr;gap:26px;padding:105px 22px 48px}
  .hx-hero-content{max-width:650px}
  .hx-hero h1{font-size:clamp(48px,11vw,68px)}
  .hx-hero-meta{margin-top:27px}
  .hx-hero-form-wrap{max-width:560px;justify-self:stretch;margin:0 auto;width:100%}
  .hx-hero{align-items:stretch}
  .hx-faq-list{grid-template-columns:1fr;column-gap:0}
}
@media(max-width:640px){
  .hx-hero-layout{padding:102px 17px 35px;gap:24px}
  .hx-hero-content{padding:0}
  .hx-hero h1{font-size:clamp(44px,12.5vw,62px);margin:17px 0 14px}
  .hx-hero-content>p{font-size:15px;line-height:1.55}
  .hx-hero-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:22px}
  .hx-hero-actions .hx-button{width:100%;min-height:48px;padding:0 10px;gap:7px;font-size:10px}
  .hx-hero-meta{margin-top:23px;gap:8px;font-size:9px}
  .hx-hero-meta i{width:3px;height:3px}
  .hx-hero-form-wrap{max-width:none}
  .hx-hero-offer{max-width:none;margin-top:17px;padding:12px 13px}
  .hx-hero-offer-copy strong{font-size:13px}
  .hx-hero-offer-copy p{font-size:10px}
  .hx-faq-intro{font-size:12px;line-height:1.75;margin-bottom:22px}
  .hx-faq-item{padding:0}
  .hx-faq-question{font-size:14px;padding:17px 0}
  .hx-faq-answer{font-size:12px;line-height:1.75;padding:0 38px 18px 2px}
  .hx-faq-sources{padding:18px 15px}
  .hx-faq-sources a{font-size:11px}
}
@media(prefers-reduced-motion:reduce){.hx-hero-content{animation:none}}

/* Premium black-and-gold footer, consistent with the extension landing page. */
.hx-footer{position:relative;background:#080807;color:#f4ecd8;border-top:1px solid rgba(200,166,75,.48)}
.hx-footer-inner{width:min(1220px,100%);margin:0 auto;padding:54px 30px 22px}
.hx-footer-grid{display:grid;grid-template-columns:1.35fr .8fr 1fr .9fr;gap:36px;padding-bottom:38px}
.hx-footer-brand{max-width:330px}
.hx-footer-wordmark{display:inline-block;margin:0 0 13px;color:#f6efdc;font-size:19px;font-weight:900;letter-spacing:.13em;text-decoration:none}
.hx-footer-wordmark span{color:#e3c16a}
.hx-footer-brand p,.hx-footer-area-copy{margin:0;color:#bdb194;font-size:12px;line-height:1.8}
.hx-footer-offer{display:inline-flex;margin-top:16px;color:#e6cd83;font-size:11px;font-weight:800;line-height:1.5;text-decoration:none;border-bottom:1px solid rgba(230,205,131,.45);padding-bottom:5px}
.hx-footer-heading{margin:3px 0 15px;color:#e6cd83;font-size:9px;font-weight:850;letter-spacing:.18em;text-transform:uppercase}
.hx-footer-links,.hx-footer-contact{display:grid;gap:11px}
.hx-footer-links a,.hx-footer-contact a{width:fit-content;color:#eee5cf;font-size:12px;line-height:1.5;text-decoration:none;transition:color .2s ease}
.hx-footer-links a:hover,.hx-footer-contact a:hover{color:#e6cd83}
.hx-footer-contact a{font-weight:700}
.hx-footer-bottom{display:flex;align-items:center;justify-content:space-between;gap:18px;padding-top:18px;border-top:1px solid rgba(200,166,75,.22);color:#887f69;font-size:10px;line-height:1.6}
.hx-footer-bottom a{color:#bfa96d;text-decoration:none}
.hx-footer-bottom a:hover{color:#f2e6c5}
@media(max-width:900px){.hx-footer-grid{grid-template-columns:1.2fr 1fr;row-gap:30px}}
@media(max-width:640px){.hx-footer-inner{padding:43px 20px 18px}.hx-footer-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:28px 20px;padding-bottom:27px}.hx-footer-brand{grid-column:1/-1;max-width:420px}.hx-footer-bottom{align-items:flex-start;flex-direction:column;gap:7px;font-size:9px}}


/* Ad-group-only choice modal: activated solely by crafman_entry=architectural-drawings. */
.hx-intent-modal{
  position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:20px;
  background:rgba(0,0,0,.78);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
}
.hx-intent-dialog{
  position:relative;width:min(560px,100%);padding:clamp(27px,5vw,44px);
  color:#f4ecd8;background:radial-gradient(ellipse at 90% 0%,rgba(200,166,75,.14),transparent 42%),linear-gradient(145deg,#191916,#090908);
  border:1px solid rgba(200,166,75,.66);box-shadow:0 28px 90px rgba(0,0,0,.58);
}
.hx-intent-dialog:before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,#9e7a2c,#ead18a,#9e7a2c)}
.hx-intent-close{
  position:absolute;top:13px;right:14px;width:34px;height:34px;display:grid;place-items:center;
  border:1px solid rgba(230,205,131,.35);border-radius:50%;background:rgba(255,255,255,.04);
  color:#e6cd83;font-size:21px;line-height:1;cursor:pointer;
}
.hx-intent-kicker{display:block;margin-bottom:13px;color:#e6cd83;font-size:9px;font-weight:850;letter-spacing:.2em;text-transform:uppercase}
.hx-intent-dialog h2{max-width:450px;margin:0 36px 12px 0;color:#f6efdc;font-size:clamp(29px,5vw,42px);line-height:1.02;letter-spacing:-.055em}
.hx-intent-dialog h2 em{color:#e6cd83;font-style:normal}
.hx-intent-intro{max-width:440px;margin:0 0 25px;color:#c0b38f;font-size:13px;line-height:1.75}
.hx-intent-options{display:grid;gap:11px}
.hx-intent-option{
  width:100%;display:flex;flex-direction:column;align-items:flex-start;gap:7px;padding:17px 18px;
  text-align:left;text-decoration:none;border:1px solid rgba(200,166,75,.5);border-radius:2px;
  transition:transform .2s ease,border-color .2s ease,background .2s ease;
}
.hx-intent-option:hover{transform:translateY(-2px);border-color:#f0d27b}
.hx-intent-option-primary{background:#c8a64b;color:#090908;border-color:#e6cd83}
.hx-intent-option-primary:hover{background:#e6cd83}
.hx-intent-option-secondary{background:rgba(255,255,255,.035);color:#f4ecd8}
.hx-intent-option-title{font-size:14px;font-weight:850;line-height:1.35;letter-spacing:-.01em}
.hx-intent-option-detail{font-size:11px;line-height:1.55;opacity:.82}
.hx-intent-option-primary .hx-intent-option-detail{color:#211b0b}
.hx-intent-option-secondary .hx-intent-option-detail{color:#c0b38f}
.hx-intent-footnote{margin:16px 0 0;color:#95896c;font-size:10px;line-height:1.6}
@media(max-width:520px){
  .hx-intent-modal{padding:13px;align-items:end}
  .hx-intent-dialog{padding:30px 20px 22px}
  .hx-intent-dialog h2{font-size:31px}
  .hx-intent-intro{font-size:12px;margin-bottom:20px}
  .hx-intent-option{padding:15px}
}
@media(prefers-reduced-motion:reduce){.hx-intent-option{transition:none}}

`;


function AnimatedStat({ value, prefix = "", suffix = "", label, detail }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element || started) return undefined;

        const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            setCount(value);
            setStarted(true);
            return undefined;
        }

        const observer = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            setStarted(true);
            observer.disconnect();

            const duration = 1100;
            const startTime = performance.now();
            let frameId;

            const animate = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.round(value * eased));
                if (progress < 1) frameId = requestAnimationFrame(animate);
            };

            frameId = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(frameId);
        }, { threshold: 0.35 });

        observer.observe(element);
        return () => observer.disconnect();
    }, [value, started]);

    return (
        <div className="hx-stat" ref={ref}>
            <div className="hx-stat-value" aria-label={`${prefix}${value}${suffix} ${label}`}>
                {prefix && <span className="hx-stat-prefix">{prefix}</span>}<span>{count}</span>{suffix && <span className="hx-stat-suffix">{suffix}</span>}
            </div>
            <div className="hx-stat-label">{label}</div>
            {detail && <p className="hx-stat-detail">{detail}</p>}
        </div>
    );
}

export default function HouseExtensions() {
    const [showDrawingsIntent, setShowDrawingsIntent] = useState(false);
    const drawingsIntentButtonRef = useRef(null);

    // This chooser is shown only when the Architectural Drawings Google Ads ad group
    // appends ?crafman_entry=architectural-drawings to this extension landing page.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("crafman_entry") === "architectural-drawings") {
            setShowDrawingsIntent(true);
        }
    }, []);

    const closeDrawingsIntent = useCallback((choice = "dismissed") => {
        const url = new URL(window.location.href);
        url.searchParams.delete("crafman_entry");
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "crafman_drawings_intent_choice", choice });
        setShowDrawingsIntent(false);
    }, []);

    useEffect(() => {
        if (!showDrawingsIntent) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        drawingsIntentButtonRef.current?.focus();
        const handleKeyDown = (event) => {
            if (event.key === "Escape") closeDrawingsIntent();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showDrawingsIntent, closeDrawingsIntent]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "GeneralContractor",
        name: "Crafman Design & Build",
        legalName: "Crafman Building and Landscaping Ltd",
        url: "https://www.crafman.co.uk/house-extensions-london",
        image: "https://www.crafman.co.uk/images/extensionBackground.jpeg",
        telephone: "+442081914122",
        email: "sales@crafman.co.uk",
        description: "House extension design and build services in selected areas of North London, Greater London and Essex. Services include design coordination, planning route coordination, technical input, building control coordination and construction.",
        areaServed: [
            { "@type": "Place", name: "Selected areas of North London" },
            { "@type": "Place", name: "Selected areas of Greater London" },
            { "@type": "AdministrativeArea", name: "Selected areas of Essex" },
        ],
        knowsAbout: [
            "House extensions", "Single-storey rear extensions", "Double-storey rear extensions",
            "Side-return extensions", "Wraparound extensions", "Double-storey side extensions",
            "Planning permission", "Permitted development", "Prior approval",
            "Building regulations", "Building control", "Structural coordination", "Design and build",
            "Architectural drawings", "Complimentary architectural drawings with construction projects",
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "House extension services",
            itemListElement: [
                "Single-storey extensions", "Double-storey extensions", "Side-return extensions",
                "Wraparound extensions", "Double-storey side extensions", "Extension design and approvals",
                "Extension construction and handover",
            ].map((name) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name },
            })).concat([{
                "@type": "Offer",
                name: "Complimentary architectural drawings with every project",
                description: "Crafman provides complimentary architectural drawings for projects appointed to Crafman for construction, including eligible extensions, renovations and new builds. The drawing package and scope are agreed during the project consultation.",
                itemOffered: {
                    "@type": "Service",
                    name: "Architectural drawings",
                    description: "Architectural drawings prepared for a construction project delivered by Crafman Design & Build."
                }
            }]),
        },
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
    };

    return (
        <>
            <style>{HOUSE_EXTENSIONS_STYLES}</style>
            <Helmet>
                <title>House Extensions North London | Design & Build | Crafman</title>
                <meta
                    name="description"
                    content="House extension design and build in selected areas of North London, Greater London and Essex. Ask about free architectural drawings with every Crafman construction project."
                />
                <meta name="robots" content="index,follow,max-image-preview:large" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="House Extensions North London | Crafman Design & Build" />
                <meta property="og:description" content="House extension design and build, from design and approvals through construction to handover." />
                <meta property="og:url" content="https://www.crafman.co.uk/house-extensions-london" />
                <meta property="og:image" content="https://www.crafman.co.uk/images/extensionBackground.jpeg" />
                <link rel="canonical" href="https://www.crafman.co.uk/house-extensions-london" />
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <ExtensionHeader />
            <main className="hx-page" id="top">
                <section className="hx-hero">
                    <div className="hx-hero-image" />
                    <div className="hx-hero-shade" />
                    <div className="hx-hero-layout">
                        <div className="hx-hero-content">
                            <span className="hx-eyebrow hx-eyebrow-light">CRAFMAN DESIGN & BUILD · NORTH LONDON</span>
                            <h1>Make more room.<br /><em>Make it yours.</em></h1>
                            <p>House extensions, planned and built around the way you live.</p>
                            <aside className="hx-hero-offer" aria-label="Free architectural drawings offer">
                                <span className="hx-hero-offer-mark" aria-hidden="true">✦</span>
                                <span className="hx-hero-offer-copy">
                                    <span className="hx-hero-offer-kicker">A Crafman project offer</span>
                                    <strong><span className="hx-free-highlight">Free</span> architectural drawings</strong>
                                    <p>Complimentary drawings with any project you appoint Crafman to build — from extensions and renovations to new builds.</p>
                                    <small>Drawing package and scope are agreed during your project consultation.</small>
                                    <a className="hx-claim-drawings-btn" href="#hero-extension-enquiry" aria-label="Claim free architectural drawings by discussing your project with Crafman">
                                        Claim <span className="hx-free-highlight">free</span> drawings <span aria-hidden="true">↗</span>
                                    </a>
                                </span>
                            </aside>
                            <div className="hx-hero-actions">
                                <a className="hx-button hx-button-gold" href="#hero-extension-enquiry">Discuss your project <span>↗</span></a>
                                <a className="hx-button hx-button-outline" href="#extension-types">Explore extensions</a>
                            </div>
                            <div className="hx-hero-meta">
                                <span>Family-run team</span>
                                <i />
                                <span>20+ years' industry experience</span>
                                <i />
                                <span>Design to build</span>
                            </div>
                        </div>
                        <div className="hx-hero-form-wrap" id="hero-extension-enquiry">
                            <ExtensionLeadForm compact />
                        </div>
                    </div>
                    <div className="hx-hero-side-label">EXTENSIONS · DESIGN · BUILD</div>
                </section>

                <section className="hx-stats-strip" aria-label="Crafman at a glance">
                    <div className="hx-stats-inner">
                        <div className="hx-stats-heading">
                            <span className="hx-eyebrow hx-eyebrow-light">CRAFMAN AT A GLANCE</span>
                            <h2>Experience. <em>Clear direction.</em></h2>
                        </div>
                        <div className="hx-stats-numbers">
                            <AnimatedStat value={20} suffix="+" label="Years' industry experience" />
                            <AnimatedStat value={9} label="Projects completed in 2026" />
                            <AnimatedStat value={10} prefix="£" suffix="M" label="Insurance-backed guarantee" />
                        </div>
                        <p className="hx-stats-footnote">Limited project intake · £10M public liability · £5M employers' liability</p>
                    </div>
                </section>

                <section className="hx-project-section">
                    <div className="hx-project-copy">
                        <span className="hx-eyebrow hx-eyebrow-light">A REAL CROFTMAN PROJECT</span>
                        <h2>Built around<br /><em>real homes.</em></h2>
                        <p>Explore a Greenwich rear extension, from the early groundworks through to the completed shell.</p>
                        <Link to="/case-studies" className="hx-text-link">See project work <span>↗</span></Link>
                    </div>
                    <div className="hx-project-gallery">
                        <figure className="hx-project-image hx-project-image-large">
                            <img src="/images/greenwichExt/rendering.png" alt="Completed rear extension exterior at a Crafman project" loading="lazy" />
                            <figcaption>THE FINISHED EXTENSION</figcaption>
                        </figure>
                        <figure className="hx-project-image hx-project-image-small">
                            <img src="/images/greenwichExt/foundation.png" alt="Foundation works during a rear extension project" loading="lazy" />
                            <figcaption>FOUNDATIONS</figcaption>
                        </figure>
                        <figure className="hx-project-image hx-project-image-small">
                            <img src="/images/greenwichExt/shellCompleted.png" alt="Rear extension shell at a Crafman project" loading="lazy" />
                            <figcaption>BUILD PROGRESS</figcaption>
                        </figure>
                    </div>
                </section>

                <section className="hx-accreditations" aria-label="Accreditations and customer rating">
                    <div className="hx-accreditations-inner">
                        <div className="hx-accreditation-intro">
                            <span className="hx-eyebrow">BUILT ON TRUST</span>
                            <strong>Quality at every stage.</strong>
                        </div>
                        <div className="hx-accreditation-logos">
                            <div className="hx-accreditation-logo hx-fmb-logo">
                                <img src="/images/fmb.jpeg" alt="Federation of Master Builders" loading="lazy" />
                            </div>
                            <div className="hx-accreditation-logo hx-trustmark-logo">
                                <img src="/images/trustmark.jpeg" alt="TrustMark Government Endorsed Quality" loading="lazy" />
                            </div>
                            <div className="hx-accreditation-logo hx-google-logo">
                                <img src="/images/google5Star.jpeg" alt="Google five-star rating graphic" loading="lazy" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="hx-coordination-section" id="project-coordination">
                    <div className="hx-coordination-inner">
                        <div className="hx-coordination-topline">
                            <span className="hx-eyebrow hx-eyebrow-light">ONE TEAM · EVERY STAGE</span>
                            <span className="hx-coordination-caption">FROM THE FIRST DRAWING TO HANDOVER</span>
                        </div>

                        <div className="hx-coordination-intro">
                            <div className="hx-coordination-display">100<span>%</span></div>
                            <div>
                                <h2>Project <em>coordination.</em></h2>
                                <p>One clear process. Three stages. One team keeping everything moving.</p>
                            </div>
                            <a href="#extension-enquiry" className="hx-coordination-link">
                                Discuss your project <span aria-hidden="true">↗</span>
                            </a>
                        </div>

                        <div className="hx-coordination-journey hx-coordination-journey-three">
                            <div className="hx-coordination-rail" aria-hidden="true"><span /></div>
                            {coordinationServices.map((service) => (
                                <article className="hx-coordination-stage hx-coordination-stage-three" key={service.number}>
                                    <div className="hx-coordination-stage-visual">
                                        <span className="hx-coordination-stage-icon"><CoordinationIcon type={service.icon} /></span>
                                        <span className="hx-coordination-stage-number">{service.number} <i>/ 03</i></span>
                                    </div>
                                    <div className="hx-coordination-stage-copy">
                                        <span className="hx-coordination-stage-note">{service.note}</span>
                                        <h3>{service.title}</h3>
                                        <p>{service.detail}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>


                <section className="hx-section hx-types-section" id="extension-types">
                    <div className="hx-section-heading">
                        <div>
                            <span className="hx-eyebrow">FIND YOUR PROJECT TYPE</span>
                            <h2>Space to suit<br /><em>your next chapter.</em></h2>
                        </div>
                        <p>From a smarter ground floor to a complete transformation, explore the ways to add space and value to your home.</p>
                    </div>
                    <div className="hx-type-grid">
                        {extensionTypes.map((item, index) => <IconCard key={item.title} item={item} index={index} />)}
                    </div>
                </section>



                <section className="hx-section hx-capabilities" id="capabilities">
                    <div className="hx-section-heading hx-heading-compact">
                        <div>
                            <span className="hx-eyebrow">ONE COORDINATED TEAM</span>
                            <h2>From first sketch<br /><em>to final detail.</em></h2>
                        </div>
                        <p>Bring the important pieces together with a clear route from design to construction.</p>
                    </div>
                    <div className="hx-capability-grid">
                        {capabilities.map((item) => (
                            <article className="hx-capability-card" key={item.number}>
                                <div className="hx-capability-top"><span>{item.number}</span><LineIcon type={item.icon} size={30} /></div>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </article>
                        ))}
                    </div>
                </section>



                <section className="hx-process" id="process">
                    <div className="hx-process-inner">
                        <div className="hx-process-heading">
                            <span className="hx-eyebrow hx-eyebrow-light">THE CRAF​​MAN WAY</span>
                            <h2>Clear steps.<br /><em>One team.</em></h2>
                        </div>
                        <div className="hx-process-steps">
                            <article><span>01</span><h3>Discuss</h3><p>Your property, priorities and plans.</p></article>
                            <article><span>02</span><h3>Design & plan</h3><p>Drawings, approvals and technical coordination.</p></article>
                            <article><span>03</span><h3>Build</h3><p>Coordinated construction and delivery.</p></article>
                        </div>
                    </div>
                </section>

                <section className="hx-section hx-faq-section" id="faqs">
                    <div className="hx-section-heading hx-heading-compact">
                        <div>
                            <span className="hx-eyebrow">HOUSE EXTENSION GUIDE</span>
                            <h2>Questions, <em>answered.</em></h2>
                        </div>
                        <a className="hx-text-link" href="#extension-enquiry">Discuss your property <span>↗</span></a>
                    </div>
                    <p className="hx-faq-intro">Clear information about house extensions, planning permission, permitted development, building regulations, design, construction and project handover. Every property is different, so the right advice starts with the address and the proposed work.</p>
                    <div className="hx-faq-list">
                        {faqs.map((item) => (
                            <details className="hx-faq-item" key={item.question}>
                                <summary className="hx-faq-question">
                                    <span>{item.question}</span>
                                    <span className="hx-faq-toggle" aria-hidden="true" />
                                </summary>
                                <p className="hx-faq-answer">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                    <div className="hx-faq-sources">
                        <strong>Useful official guidance</strong>
                        <a href="https://www.planningportal.co.uk/permission/common-projects/extensions/" target="_blank" rel="noreferrer">Planning Portal: house extensions and planning permission ↗</a>
                        <a href="https://www.gov.uk/government/publications/permitted-development-rights-for-householders-technical-guidance" target="_blank" rel="noreferrer">GOV.UK: permitted development technical guidance ↗</a>
                        <a href="https://www.gov.uk/government/publications/preventing-and-resolving-disputes-in-relation-to-party-walls/the-party-wall-etc-act-1996-explanatory-booklet" target="_blank" rel="noreferrer">GOV.UK: Party Wall etc. Act 1996 guidance ↗</a>
                    </div>
                    <p className="hx-faq-disclaimer">This guide is general information, not planning, legal, structural or building control advice. Rules and requirements depend on the property, the location and the proposed work. Confirm the position with the relevant local authority and appropriately qualified professionals before starting construction.</p>
                </section>

                <section className="hx-enquiry-section" id="extension-enquiry">
                    <div className="hx-enquiry-copy">
                        <span className="hx-eyebrow hx-eyebrow-light">LET'S TALK ABOUT YOUR HOME</span>
                        <h2>Ready for<br /><em>more space?</em></h2>
                        <p>Tell us a little about the property and the project you have in mind. Ask us about complimentary architectural drawings when you appoint Crafman to deliver your project.</p>
                        <div className="hx-enquiry-contact">
                            <a href="tel:02081914122">020 8191 4122</a>
                            <a href="mailto:sales@crafman.co.uk">sales@crafman.co.uk</a>
                        </div>
                    </div>
                    <div className="hx-enquiry-form">
                        <ExtensionLeadForm />
                    </div>
                </section>
            </main>

            {showDrawingsIntent && (
                <div
                    className="hx-intent-modal"
                    role="presentation"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeDrawingsIntent();
                    }}
                >
                    <section
                        className="hx-intent-dialog"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="hx-intent-title"
                        aria-describedby="hx-intent-description"
                    >
                        <button
                            className="hx-intent-close"
                            type="button"
                            aria-label="Close choices and continue browsing"
                            onClick={closeDrawingsIntent}
                        >×</button>
                        <span className="hx-intent-kicker">A QUICK QUESTION BEFORE YOU CONTINUE</span>
                        <h2 id="hx-intent-title">What are you looking for <em>help with?</em></h2>
                        <p className="hx-intent-intro" id="hx-intent-description">
                            We can help with architectural drawings on their own, or coordinate the drawings and the complete construction project.
                        </p>
                        <div className="hx-intent-options">
                            <button
                                ref={drawingsIntentButtonRef}
                                type="button"
                                className="hx-intent-option hx-intent-option-primary"
                                onClick={() => closeDrawingsIntent("build_and_drawings")}
                            >
                                <span className="hx-intent-option-title">I'm interested in the build too</span>
                                <span className="hx-intent-option-detail">Free architectural drawings available when you appoint Crafman to carry out the construction project.</span>
                            </button>
                            <Link
                                className="hx-intent-option hx-intent-option-secondary"
                                to="/drawings-planning"
                                onClick={() => {
                                    window.dataLayer = window.dataLayer || [];
                                    window.dataLayer.push({ event: "crafman_drawings_intent_choice", choice: "drawings_only" });
                                }}
                            >
                                <span className="hx-intent-option-title">I'm only interested in architectural drawings</span>
                                <span className="hx-intent-option-detail">Take me to Crafman's standalone Drawings & Planning service.</span>
                            </Link>
                        </div>
                        <p className="hx-intent-footnote">The complimentary drawings offer applies when Crafman is appointed to deliver the construction project. The drawing scope is agreed during consultation.</p>
                    </section>
                </div>
            )}

            <footer className="hx-footer" aria-label="Crafman Design & Build footer">
                <div className="hx-footer-inner">
                    <div className="hx-footer-grid">
                        <div className="hx-footer-brand">
                            <a className="hx-footer-wordmark" href="/" aria-label="Crafman Design & Build home">CRAFMAN <span>DESIGN & BUILD</span></a>
                            <p>Thoughtful design and coordinated construction for homes across selected areas of North London, Greater London and Essex.</p>
                            <a className="hx-footer-offer" href="#hero-extension-enquiry">Ask about complimentary architectural drawings ↗</a>
                        </div>

                        <nav aria-label="Extension page links">
                            <h2 className="hx-footer-heading">Explore</h2>
                            <div className="hx-footer-links">
                                <a href="#extension-types">Extension types</a>
                                <a href="#capabilities">Our services</a>
                                <a href="#process">How we work</a>
                                <a href="#faqs">Extension FAQs</a>
                            </div>
                        </nav>

                        <div>
                            <h2 className="hx-footer-heading">Get in touch</h2>
                            <div className="hx-footer-contact">
                                <a href="tel:02081914122">020 8191 4122</a>
                                <a href="mailto:sales@crafman.co.uk">sales@crafman.co.uk</a>
                                <a href="#extension-enquiry">Request a project discussion ↗</a>
                            </div>
                        </div>

                        <div>
                            <h2 className="hx-footer-heading">Where we work</h2>
                            <p className="hx-footer-area-copy">Selected areas of North London, Greater London and Essex. Please provide your postcode so we can confirm whether your property is within our current service area.</p>
                        </div>
                    </div>
                    <div className="hx-footer-bottom">
                        <span>© {new Date().getFullYear()} Crafman Building and Landscaping Ltd. All rights reserved.</span>
                        <a href="#top">Back to top ↑</a>
                    </div>
                </div>
            </footer>

            <a className="hx-mobile-cta" href="#extension-enquiry">Discuss your extension <span>↗</span></a>
        </>
    );
}
