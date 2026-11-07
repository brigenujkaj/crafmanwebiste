import { useEffect, useRef, useState } from "react";
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

const faqs = [
    {
        question: "Will my extension need planning permission?",
        answer: "Some projects may fall under permitted development, while others need planning permission. It depends on the property, the proposed dimensions, previous work and any local restrictions. We can help review the likely route.",
    },
    {
        question: "Can you manage the design and build?",
        answer: "Yes. Crafman offers a coordinated design-and-build approach, bringing the architectural service, planning coordination, technical input and construction together around the agreed project scope.",
    },
    {
        question: "Which areas do you cover?",
        answer: "We focus on selected areas of North London, Greater London and Essex. Send us your property postcode and we can confirm whether your location is within our service area.",
    },
    {
        question: "How much does a house extension cost?",
        answer: "Cost depends on size, ground conditions, structure, access, specification and approvals. Share your property address and project type and we can discuss the right next step.",
    },
];

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



/* Animated black-and-gold facts strip — only uses claims already present on the page. */
.hx-stats-strip{position:relative;z-index:3;background:#0b0b09;color:#f4ecd8;border-top:1px solid rgba(200,166,75,.42);border-bottom:1px solid rgba(200,166,75,.42)}
.hx-stats-inner{width:min(1180px,100%);margin:0 auto;padding:42px 30px;display:grid;grid-template-columns:minmax(180px,.75fr) minmax(0,2fr);align-items:center;gap:42px}
.hx-stats-intro h2{margin:10px 0 0;font-size:clamp(25px,3vw,36px);line-height:1.02;letter-spacing:-.045em;color:#f5ecd6}
.hx-stats-intro h2 em{color:#e6cd83;font-style:normal}
.hx-stats-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0}
.hx-stat{min-width:0;padding:4px clamp(14px,2.6vw,34px);border-left:1px solid rgba(200,166,75,.32)}
.hx-stat-value{display:flex;align-items:baseline;gap:2px;color:#e6cd83;font-size:clamp(38px,5vw,56px);font-weight:850;letter-spacing:-.065em;line-height:1;font-variant-numeric:tabular-nums}
.hx-stat-suffix{font-size:.72em}
.hx-stat-label{margin-top:9px;color:#f4ecd8;font-size:13px;font-weight:800;line-height:1.3}
.hx-stat-detail{max-width:190px;margin:6px 0 0;color:#b8ad91;font-size:11px;line-height:1.5}
@media(max-width:760px){
  .hx-stats-inner{padding:30px 18px;grid-template-columns:1fr;gap:20px}
  .hx-stats-intro h2 br{display:none}
  .hx-stats-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .hx-stat{padding:2px 10px;border-left:1px solid rgba(200,166,75,.32)}
  .hx-stat:first-child{padding-left:0;border-left:0}
  .hx-stat-value{font-size:clamp(31px,9vw,43px)}
  .hx-stat-label{font-size:11px;line-height:1.25}
  .hx-stat-detail{font-size:10px;line-height:1.4}
}
@media(max-width:380px){
  .hx-stats-inner{padding:26px 14px}
  .hx-stat{padding-right:7px;padding-left:7px}
  .hx-stat-value{font-size:31px}
  .hx-stat-label{font-size:10px}
  .hx-stat-detail{font-size:9px}
}
@media(prefers-reduced-motion:reduce){
  .hx-stat-value{transition:none!important}
}

`;


function AnimatedStat({ value, suffix = "", label, detail }) {
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
            <div className="hx-stat-value" aria-label={`${value}${suffix} ${label}`}>
                <span>{count}</span><span className="hx-stat-suffix">{suffix}</span>
            </div>
            <div className="hx-stat-label">{label}</div>
            <p className="hx-stat-detail">{detail}</p>
        </div>
    );
}

export default function HouseExtensions() {
    const [openFaq, setOpenFaq] = useState(0);

    const schema = {
        "@context": "https://schema.org",
        "@type": "GeneralContractor",
        name: "Crafman Design & Build",
        legalName: "Crafman Building and Landscaping Ltd",
        url: "https://www.crafman.co.uk/house-extensions-london",
        image: "https://www.crafman.co.uk/images/extensionBackground.jpeg",
        areaServed: [
            { "@type": "Place", name: "North London" },
            { "@type": "Place", name: "Greater London" },
            { "@type": "AdministrativeArea", name: "Essex" },
        ],
        makesOffer: {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "House extension design and build",
                serviceType: "House extensions",
            },
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
                <title>House Extensions North London | Crafman Design & Build</title>
                <meta
                    name="description"
                    content="Plan your house extension with Crafman Design & Build. Architectural design, planning coordination and construction across selected areas of North London, Greater London and Essex."
                />
                <link rel="canonical" href="https://www.crafman.co.uk/house-extensions-london" />
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <ExtensionHeader />
            <main className="hx-page">
                <section className="hx-hero">
                    <div className="hx-hero-image" />
                    <div className="hx-hero-shade" />
                    <div className="hx-hero-content">
                        <span className="hx-eyebrow hx-eyebrow-light">CRAFMAN DESIGN & BUILD · NORTH LONDON</span>
                        <h1>Make more room.<br /><em>Make it yours.</em></h1>
                        <p>House extensions, planned and built around the way you live.</p>
                        <div className="hx-hero-actions">
                            <a className="hx-button hx-button-gold" href="#extension-enquiry">Discuss your project <span>↗</span></a>
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
                    <div className="hx-hero-side-label">EXTENSIONS · DESIGN · BUILD</div>
                </section>

                <section className="hx-stats-strip" aria-label="Crafman at a glance">
                    <div className="hx-stats-inner">
                        <div className="hx-stats-intro">
                            <span className="hx-eyebrow hx-eyebrow-light">CRAFMAN AT A GLANCE</span>
                            <h2>Experience.<br /><em>Clear direction.</em></h2>
                        </div>
                        <div className="hx-stats-grid">
                            <AnimatedStat value={20} suffix="+" label="Years' industry experience"  />
                            <AnimatedStat suffix="+" value={15} label="Years Insurance-Backed Guarantee"  />
                            <AnimatedStat value={10} suffix="+" label="Yearly Projects Completed"  />
                        </div>
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
                            <span className="hx-eyebrow">A FEW QUICK ANSWERS</span>
                            <h2>Good to <em>know.</em></h2>
                        </div>
                        <a className="hx-text-link" href="#extension-enquiry">Ask us about your project <span>↗</span></a>
                    </div>
                    <div className="hx-faq-list">
                        {faqs.map((item, index) => (
                            <article className={`hx-faq-item ${openFaq === index ? "is-open" : ""}`} key={item.question}>
                                <button
                                    type="button"
                                    className="hx-faq-question"
                                    aria-expanded={openFaq === index}
                                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                                >
                                    <span>{item.question}</span>
                                    <span className="hx-faq-chevron">{openFaq === index ? "−" : "+"}</span>
                                </button>
                                {openFaq === index && <p className="hx-faq-answer">{item.answer}</p>}
                            </article>
                        ))}
                    </div>
                </section>

                <section className="hx-enquiry-section" id="extension-enquiry">
                    <div className="hx-enquiry-copy">
                        <span className="hx-eyebrow hx-eyebrow-light">LET'S TALK ABOUT YOUR HOME</span>
                        <h2>Ready for<br /><em>more space?</em></h2>
                        <p>Tell us a little about the property and the project you have in mind.</p>
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

            <a className="hx-mobile-cta" href="#extension-enquiry">Discuss your extension <span>↗</span></a>
        </>
    );
}
