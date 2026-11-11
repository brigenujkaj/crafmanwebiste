import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "../components/Layout.jsx";
import ContactForm from "../components/ContactForm.jsx";

const services = [
    {
        number: "01",
        title: "House extensions",
        description: "Thoughtfully planned extensions that create more room, improve flow and make better use of your home.",
        link: "/house-extensions-london",
        label: "Explore extensions",
        mark: "01",
    },
    {
        number: "02",
        title: "Renovations & refurbishments",
        description: "Whole-home renovations and considered interior upgrades, coordinated from the first decisions through to the finish.",
        link: "/renovations-london",
        label: "Explore renovations",
        mark: "02",
    },
    {
        number: "03",
        title: "Drawings & planning",
        description: "Architectural drawings and planning support to help turn an early idea into a clear, workable project.",
        link: "/drawings-planning",
        label: "Explore drawings",
        mark: "03",
    },
    {
        number: "04",
        title: "Commercial fit-outs",
        description: "Practical, polished commercial spaces designed around the way your business works.",
        link: "/commercial-fit-outs-london",
        label: "Explore commercial",
        mark: "04",
    },
];

const projects = [
    {
        title: "Greenwich rear extension",
        type: "Residential · Extension",
        description: "A rear extension project, shown through real site photographs and build progress.",
        image: "/images/greenwichExt/rendering.jpeg",
        alt: "Rear extension project in Greenwich",
    },
    {
        title: "Extension in progress",
        type: "Residential · Construction",
        description: "A look inside an extension as the new space begins to take shape.",
        image: "/images/extensionBackground.jpeg",
        alt: "Interior of a residential extension during construction",
    },
    {
        title: "Swiss interior renovation",
        type: "Residential · Renovation",
        description: "A warm, light-filled interior with timber finishes and views across the landscape.",
        image: "/images/SwissRenovation/swiss2.jpg",
        alt: "Renovated timber interior with large windows and mountain views",
    },
];

const processStages = [
    {
        number: "01",
        title: "Design & approvals",
        text: "We understand the property and your priorities, then coordinate the design, planning route and technical information needed for the project.",
    },
    {
        number: "02",
        title: "The build",
        text: "The agreed scope moves into construction, with trades, materials and the work on site coordinated around the project requirements.",
    },
    {
        number: "03",
        title: "Handover",
        text: "We review the completed work, address agreed final items and hand over the relevant project information.",
    },
];

// Testimonials are retained from the supplied Home.jsx content.
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

export default function Home() {
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    useEffect(() => {
        const revealItems = document.querySelectorAll(".home-premium [data-reveal]");
        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

        if (reduceMotion || !("IntersectionObserver" in window)) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
        );

        revealItems.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    const testimonial = testimonials[testimonialIndex];
    const changeTestimonial = (direction) => {
        setTestimonialIndex((current) =>
            (current + direction + testimonials.length) % testimonials.length
        );
    };

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "GeneralContractor",
        name: "Crafman Design & Build",
        legalName: "Crafman Building and Landscaping Ltd",
        url: "https://www.crafman.co.uk/",
        telephone: "+442081914122",
        email: "sales@crafman.co.uk",
        description:
            "Design and build services for residential and commercial projects in selected areas of London and Essex, including house extensions, renovations, architectural drawings and commercial fit-outs.",
        areaServed: [
            { "@type": "AdministrativeArea", name: "Selected areas of Greater London" },
            { "@type": "AdministrativeArea", name: "Selected areas of Essex" },
        ],
        knowsAbout: [
            "House extensions",
            "Home renovations",
            "Architectural drawings",
            "Planning coordination",
            "Building control coordination",
            "Commercial fit-outs",
            "Project delivery",
        ],
    };

    return (
        <Layout>
            <Helmet>
                <title>Crafman Design & Build | Extensions, Renovations & Fit-Outs</title>
                <meta
                    name="description"
                    content="Crafman Design & Build brings design, planning coordination and construction together for residential and commercial projects in selected areas of London and Essex."
                />
                <link rel="canonical" href="https://www.crafman.co.uk/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Crafman Design & Build" />
                <meta
                    property="og:description"
                    content="A considered approach to design, construction and project delivery."
                />
                <meta property="og:image" content="https://www.crafman.co.uk/images/extensionBackground.jpeg" />
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Helmet>

            <div className="home-premium">
                <style>{`
          .home-premium {
            --hp-bg: #080807;
            --hp-panel: #11110f;
            --hp-panel-2: #171714;
            --hp-gold: #c8a64b;
            --hp-gold-light: #e6cd83;
            --hp-cream: #f4ecd8;
            --hp-muted: #bdb194;
            background: var(--hp-bg);
            color: var(--hp-cream);
            font-family: Inter, Arial, sans-serif;
            overflow: hidden;
          }
          .home-premium *, .home-premium *::before, .home-premium *::after { box-sizing: border-box; }
          .hp-eyebrow { color: var(--hp-gold-light); display: inline-block; font-size: 10px; font-weight: 850; letter-spacing: .2em; text-transform: uppercase; }
          .hp-section { width: min(1200px, 100%); margin: 0 auto; padding: 100px 30px; }
          .hp-section-head { display: flex; justify-content: space-between; align-items: end; gap: 36px; margin-bottom: 38px; }
          .hp-section-head h2, .hp-feature-copy h2, .hp-contact-copy h2 { margin: 11px 0 0; color: var(--hp-cream); font-size: clamp(36px, 5vw, 62px); line-height: 1.02; letter-spacing: -.06em; }
          .hp-section-head h2 em, .hp-feature-copy h2 em, .hp-contact-copy h2 em { color: var(--hp-gold-light); font-style: normal; }
          .hp-section-head > p { max-width: 390px; margin: 0; color: var(--hp-muted); font-size: 13px; line-height: 1.8; }
          .hp-button { min-height: 51px; display: inline-flex; align-items: center; justify-content: center; gap: 18px; padding: 0 22px; border: 1px solid transparent; border-radius: 3px; text-decoration: none; font-size: 12px; font-weight: 850; letter-spacing: .025em; transition: transform .22s ease, background .22s ease, border-color .22s ease, color .22s ease; }
          .hp-button:hover { transform: translateY(-3px); }
          .hp-button-gold { background: var(--hp-gold); color: #11100b; }
          .hp-button-gold:hover { background: var(--hp-gold-light); }
          .hp-button-ghost { border-color: rgba(244,236,216,.48); color: #fff; background: rgba(10,10,8,.2); }
          .hp-button-ghost:hover { border-color: var(--hp-gold-light); background: rgba(200,166,75,.1); }

          /* Hero */
          .hp-hero { min-height: 690px; position: relative; display: flex; align-items: center; isolation: isolate; background: #080807; }
          .hp-hero-bg { position: absolute; z-index: -2; inset: 0; background: url('/images/extensionBackground.jpeg') center 48% / cover no-repeat; transform: scale(1.025); animation: hpHeroDrift 24s ease-in-out infinite alternate; }
          .hp-hero::before { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgba(5,5,4,.94) 0%, rgba(7,7,6,.82) 47%, rgba(7,7,6,.28) 100%), linear-gradient(0deg, rgba(4,4,3,.78), transparent 58%); }
          .hp-hero::after { content: ''; pointer-events: none; position: absolute; z-index: -1; width: 520px; height: 520px; right: -160px; top: -180px; border: 1px solid rgba(230,205,131,.13); border-radius: 50%; box-shadow: 0 0 0 35px rgba(200,166,75,.025), 0 0 0 80px rgba(200,166,75,.018); animation: hpOrb 14s ease-in-out infinite alternate; }
          .hp-hero-inner { width: min(1200px, 100%); margin: 0 auto; padding: 116px 30px 94px; display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 54px; align-items: center; }
          .hp-hero-copy { max-width: 760px; animation: hpRise .85s ease both; }
          .hp-hero h1 { max-width: 780px; margin: 20px 0 19px; color: #fff; font-size: clamp(52px, 7.1vw, 88px); line-height: .97; letter-spacing: -.075em; font-weight: 850; }
          .hp-hero h1 em { color: var(--hp-gold-light); font-style: normal; }
          .hp-hero-copy > p { max-width: 570px; margin: 0; color: #e2ddcf; font-size: clamp(16px, 1.8vw, 20px); line-height: 1.7; }
          .hp-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
          .hp-hero-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 13px; margin-top: 48px; color: #d2c9b0; font-size: 10px; font-weight: 750; letter-spacing: .04em; }
          .hp-hero-meta i { width: 4px; height: 4px; border-radius: 50%; background: var(--hp-gold); }
          .hp-hero-panel { position: relative; padding: 25px 23px; border: 1px solid rgba(230,205,131,.48); background: linear-gradient(145deg, rgba(13,13,11,.91), rgba(13,13,11,.65)); box-shadow: 0 25px 75px rgba(0,0,0,.3); backdrop-filter: blur(12px); animation: hpFloat 7s ease-in-out infinite; }
          .hp-hero-panel::before { content: ''; position: absolute; top: -1px; left: 22px; width: 55px; height: 2px; background: var(--hp-gold-light); }
          .hp-hero-panel-label { color: var(--hp-gold-light); font-size: 9px; font-weight: 850; letter-spacing: .17em; text-transform: uppercase; }
          .hp-hero-panel h2 { margin: 17px 0 9px; color: #fff; font-size: 27px; line-height: 1.08; letter-spacing: -.045em; }
          .hp-hero-panel p { margin: 0; color: #c7b995; font-size: 12px; line-height: 1.75; }
          .hp-panel-divider { height: 1px; margin: 20px 0; background: rgba(200,166,75,.25); }
          .hp-panel-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 7px 0; color: #eee5cf; font-size: 11px; }
          .hp-panel-row span:last-child { color: var(--hp-gold-light); font-size: 17px; }

          /* At-a-glance */
          .hp-stats { background: #0b0b09; border-top: 1px solid rgba(200,166,75,.4); border-bottom: 1px solid rgba(200,166,75,.4); }
          .hp-stats-inner { width: min(1200px,100%); margin: 0 auto; padding: 28px 30px; display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); }
          .hp-stat { min-width: 0; padding: 3px 24px; border-left: 1px solid rgba(200,166,75,.36); }
          .hp-stat:first-child { padding-left: 0; border-left: 0; }
          .hp-stat strong { display: block; color: var(--hp-gold-light); font-size: clamp(30px, 4vw, 46px); letter-spacing: -.07em; line-height: 1; }
          .hp-stat span { display: block; margin-top: 9px; color: #f1e8d1; font-size: 11px; font-weight: 800; }
          .hp-stat small { display: block; margin-top: 5px; color: #9f9477; font-size: 10px; line-height: 1.45; }

          /* Services */
          .hp-services { background: #080807; }
          .hp-service-grid { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 12px; }
          .hp-service-card { position: relative; display: flex; flex-direction: column; min-height: 285px; padding: 23px 20px 20px; border: 1px solid rgba(200,166,75,.27); background: linear-gradient(145deg,#191916,#0e0e0c); color: var(--hp-cream); text-decoration: none; overflow: hidden; transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease; }
          .hp-service-card::before { content: ''; position: absolute; width: 170px; height: 170px; right: -95px; top: -95px; border-radius: 50%; border: 1px solid rgba(230,205,131,.17); transition: transform .5s ease; }
          .hp-service-card:hover { transform: translateY(-8px); border-color: var(--hp-gold-light); box-shadow: 0 22px 48px rgba(200,166,75,.1); }
          .hp-service-card:hover::before { transform: scale(1.55); }
          .hp-service-top { display: flex; align-items: center; justify-content: space-between; color: var(--hp-gold-light); }
          .hp-service-number { font-size: 10px; font-weight: 850; letter-spacing: .17em; }
          .hp-service-mark { display: grid; width: 42px; height: 42px; place-items: center; border: 1px solid rgba(200,166,75,.5); border-radius: 50%; color: var(--hp-gold-light); font-family: Georgia,serif; font-size: 15px; animation: hpMarkFloat 6s ease-in-out infinite; }
          .hp-service-card:nth-child(2) .hp-service-mark { animation-delay: -.9s; }
          .hp-service-card:nth-child(3) .hp-service-mark { animation-delay: -1.8s; }
          .hp-service-card:nth-child(4) .hp-service-mark { animation-delay: -2.7s; }
          .hp-service-card h3 { position: relative; margin: auto 0 10px; color: #f5ecd4; font-size: 20px; line-height: 1.13; letter-spacing: -.04em; }
          .hp-service-card p { position: relative; margin: 0; color: #bcb092; font-size: 11px; line-height: 1.7; }
          .hp-service-link { display: inline-flex; align-items: center; gap: 12px; margin-top: 21px; color: var(--hp-gold-light); font-size: 10px; font-weight: 850; letter-spacing: .04em; text-transform: uppercase; }

          /* Feature band */
          .hp-feature { display: grid; grid-template-columns: 1fr 1fr; min-height: 530px; background: #11110f; border-top: 1px solid rgba(200,166,75,.28); border-bottom: 1px solid rgba(200,166,75,.28); }
          .hp-feature-image { position: relative; min-height: 440px; overflow: hidden; }
          .hp-feature-image img { display: block; width: 100%; height: 100%; min-height: 440px; object-fit: cover; transition: transform 1s cubic-bezier(.2,.7,.2,1); }
          .hp-feature-image:hover img { transform: scale(1.045); }
          .hp-feature-image::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg,transparent 65%,#11110f 100%), linear-gradient(0deg,rgba(0,0,0,.2),transparent 40%); pointer-events: none; }
          .hp-feature-copy { align-self: center; max-width: 650px; padding: 70px clamp(30px,6vw,90px); }
          .hp-feature-copy > p { margin: 19px 0 25px; color: #c1b492; font-size: 13px; line-height: 1.8; }
          .hp-feature-points { display: grid; gap: 13px; margin: 27px 0 30px; }
          .hp-feature-point { display: flex; align-items: flex-start; gap: 12px; color: #eee5ce; font-size: 12px; line-height: 1.55; }
          .hp-feature-point b { display: grid; flex: 0 0 22px; width: 22px; height: 22px; place-items: center; border: 1px solid rgba(200,166,75,.6); border-radius: 50%; color: var(--hp-gold-light); font-size: 10px; }

          /* Projects */
          .hp-projects { background: #080807; }
          .hp-project-grid { display: grid; grid-template-columns: 1.15fr 1fr 1fr; gap: 13px; }
          .hp-project-card { position: relative; min-width: 0; min-height: 390px; overflow: hidden; border: 1px solid rgba(200,166,75,.28); background: #181815; }
          .hp-project-card img { display: block; width: 100%; height: 100%; min-height: 390px; object-fit: cover; transition: transform .8s cubic-bezier(.2,.7,.2,1), filter .5s ease; }
          .hp-project-card:hover img { transform: scale(1.06); filter: saturate(1.08); }
          .hp-project-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: end; padding: 22px; background: linear-gradient(0deg,rgba(5,5,4,.93),rgba(5,5,4,.2) 55%,transparent); }
          .hp-project-type { color: var(--hp-gold-light); font-size: 9px; font-weight: 850; letter-spacing: .16em; text-transform: uppercase; }
          .hp-project-overlay h3 { margin: 9px 0 7px; color: #fff; font-size: 21px; letter-spacing: -.04em; }
          .hp-project-overlay p { max-width: 310px; margin: 0; color: #d0c8b6; font-size: 11px; line-height: 1.6; }

          /* Process */
          .hp-process { background: #10100e; border-top: 1px solid rgba(200,166,75,.27); border-bottom: 1px solid rgba(200,166,75,.27); }
          .hp-process-inner { width: min(1200px,100%); margin: 0 auto; padding: 86px 30px 92px; }
          .hp-process-grid { position: relative; display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 26px; margin-top: 43px; }
          .hp-process-rail { position: absolute; top: 31px; left: 15%; right: 15%; height: 1px; background: linear-gradient(90deg,rgba(200,166,75,.2),rgba(230,205,131,.75),rgba(200,166,75,.2)); }
          .hp-process-step { position: relative; padding: 0 20px; }
          .hp-process-icon { position: relative; z-index: 1; display: grid; width: 62px; height: 62px; place-items: center; border: 1px solid rgba(230,205,131,.65); border-radius: 50%; background: radial-gradient(circle at 35% 25%,#29251a,#10100e 72%); box-shadow: 0 0 0 8px rgba(200,166,75,.045); color: var(--hp-gold-light); font-family: Georgia,serif; font-size: 18px; animation: hpFloat 6.5s ease-in-out infinite; }
          .hp-process-step:nth-child(3) .hp-process-icon { animation-delay: -1.5s; }
          .hp-process-step:nth-child(4) .hp-process-icon { animation-delay: -3s; }
          .hp-process-step h3 { margin: 22px 0 8px; color: #f5ecd5; font-size: 20px; letter-spacing: -.035em; }
          .hp-process-step p { max-width: 330px; margin: 0; color: #bdb194; font-size: 12px; line-height: 1.75; }

          /* Testimonials */
          .hp-testimonials { background: #080807; }
          .hp-testimonial-card { position: relative; max-width: 850px; margin: 0 auto; padding: 38px 44px; border: 1px solid rgba(200,166,75,.32); background: linear-gradient(145deg,#171714,#0d0d0b); text-align: center; }
          .hp-stars { color: var(--hp-gold-light); font-size: 15px; letter-spacing: .22em; }
          .hp-quote { margin: 20px auto 25px; max-width: 710px; color: #f0e7d1; font-family: Georgia,serif; font-size: clamp(19px,2.4vw,27px); line-height: 1.55; }
          .hp-testimonial-name { color: #fff; font-size: 12px; font-weight: 850; }
          .hp-testimonial-role { margin-top: 5px; color: #a99b79; font-size: 10px; }
          .hp-testimonial-controls { display: flex; justify-content: center; gap: 10px; margin-top: 22px; }
          .hp-testimonial-controls button { width: 40px; height: 40px; border: 1px solid rgba(200,166,75,.55); border-radius: 50%; background: transparent; color: var(--hp-gold-light); cursor: pointer; font-size: 17px; transition: background .2s ease, color .2s ease, transform .2s ease; }
          .hp-testimonial-controls button:hover { background: var(--hp-gold); color: #111; transform: translateY(-2px); }

          /* Contact and footer */
          .hp-contact { display: grid; grid-template-columns: minmax(260px,.8fr) minmax(0,1.2fr); gap: 44px; align-items: start; padding: 90px max(30px,calc((100vw - 1200px)/2)); background: #11110f; border-top: 1px solid rgba(200,166,75,.38); }
          .hp-contact-copy { position: sticky; top: 112px; }
          .hp-contact-copy > p { max-width: 390px; margin: 18px 0 25px; color: #c1b492; font-size: 13px; line-height: 1.8; }
          .hp-contact-detail { display: grid; gap: 11px; }
          .hp-contact-detail a { color: var(--hp-gold-light); font-size: 13px; font-weight: 750; text-decoration: none; }
          .hp-contact-form { min-width: 0; padding: 24px; border: 1px solid rgba(200,166,75,.35); background: #0b0b09; box-shadow: 0 25px 70px rgba(0,0,0,.2); }
          .hp-footer { padding: 39px 30px 28px; border-top: 1px solid rgba(200,166,75,.38); background: #070706; }
          .hp-footer-inner { width: min(1200px,100%); margin: 0 auto; display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 38px; }
          .hp-footer-brand { color: #fff; font-size: 21px; font-weight: 900; letter-spacing: .13em; text-decoration: none; }
          .hp-footer-brand span { color: var(--hp-gold-light); }
          .hp-footer-tag { margin-top: 8px; color: #9f9477; font-size: 9px; font-weight: 800; letter-spacing: .17em; text-transform: uppercase; }
          .hp-footer-copy { max-width: 330px; margin: 17px 0 0; color: #a99e82; font-size: 11px; line-height: 1.75; }
          .hp-footer h4 { margin: 2px 0 15px; color: var(--hp-gold-light); font-size: 10px; letter-spacing: .15em; text-transform: uppercase; }
          .hp-footer-links { display: grid; gap: 10px; }
          .hp-footer-links a { color: #e0d7c2; font-size: 11px; text-decoration: none; transition: color .2s ease, transform .2s ease; width: fit-content; }
          .hp-footer-links a:hover { color: var(--hp-gold-light); transform: translateX(3px); }
          .hp-footer-bottom { width: min(1200px,100%); margin: 31px auto 0; padding-top: 17px; border-top: 1px solid rgba(200,166,75,.18); display: flex; justify-content: space-between; gap: 18px; color: #80765e; font-size: 9px; }

          /* Scroll entrance and controlled movement */
          .home-premium [data-reveal] { opacity: 0; transform: translateY(22px); transition: opacity .75s ease, transform .75s cubic-bezier(.2,.7,.2,1); }
          .home-premium [data-reveal].is-visible { opacity: 1; transform: translateY(0); }
          .home-premium [data-reveal="left"] { transform: translateX(-24px); }
          .home-premium [data-reveal="left"].is-visible { transform: translateX(0); }
          .home-premium [data-reveal="right"] { transform: translateX(24px); }
          .home-premium [data-reveal="right"].is-visible { transform: translateX(0); }
          @keyframes hpHeroDrift { from { transform: scale(1.025) translateX(0); } to { transform: scale(1.09) translateX(-.8%); } }
          @keyframes hpOrb { from { transform: translate(0,0) rotate(0deg); opacity: .55; } to { transform: translate(-36px,28px) rotate(14deg); opacity: 1; } }
          @keyframes hpFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
          @keyframes hpMarkFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
          @keyframes hpRise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

          @media(max-width:980px) {
            .hp-hero-inner { grid-template-columns:minmax(0,1fr) 260px; gap:28px; }
            .hp-service-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
            .hp-project-grid { grid-template-columns:1fr 1fr; }
            .hp-project-card:first-child { grid-column:1 / -1; }
            .hp-project-card:first-child, .hp-project-card:first-child img { min-height:340px; }
            .hp-contact { grid-template-columns:1fr; }
            .hp-contact-copy { position:static; }
          }
          @media(max-width:700px) {
            .hp-hero { min-height:0; align-items:end; }
            .hp-hero::before { background: linear-gradient(180deg,rgba(5,5,4,.38),rgba(5,5,4,.74) 34%,rgba(5,5,4,.96) 100%); }
            .hp-hero-inner { grid-template-columns:1fr; gap:27px; padding:104px 20px 47px; }
            .hp-hero h1 { font-size:clamp(46px,12.5vw,66px); }
            .hp-hero-copy > p { font-size:15px; }
            .hp-hero-actions { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
            .hp-button { min-height:48px; padding:0 12px; font-size:10px; gap:8px; }
            .hp-hero-meta { margin-top:27px; gap:9px; font-size:9px; }
            .hp-hero-panel { max-width:460px; width:100%; padding:19px; animation:none; }
            .hp-hero-panel h2 { font-size:23px; }
            .hp-stats-inner { padding:23px 17px; }
            .hp-stat { padding:2px 10px; }
            .hp-stat strong { font-size:clamp(27px,8vw,38px); }
            .hp-stat span { font-size:9px; line-height:1.3; }
            .hp-stat small { font-size:8px; }
            .hp-section { padding:68px 19px; }
            .hp-section-head { display:grid; gap:16px; margin-bottom:27px; }
            .hp-section-head h2, .hp-feature-copy h2, .hp-contact-copy h2 { font-size:clamp(35px,10vw,47px); }
            .hp-section-head > p { font-size:12px; }
            .hp-service-grid { gap:9px; }
            .hp-service-card { min-height:260px; padding:17px 14px; }
            .hp-service-card h3 { font-size:16px; }
            .hp-service-card p { font-size:10px; }
            .hp-service-link { gap:6px; font-size:8px; }
            .hp-service-mark { width:34px; height:34px; font-size:12px; }
            .hp-feature { grid-template-columns:1fr; }
            .hp-feature-image, .hp-feature-image img { min-height:280px; max-height:360px; }
            .hp-feature-image::after { background: linear-gradient(0deg,#11110f 0%,transparent 42%); }
            .hp-feature-copy { padding:8px 20px 54px; }
            .hp-feature-copy > p { font-size:12px; }
            .hp-project-grid { grid-template-columns:1fr 1fr; gap:9px; }
            .hp-project-card, .hp-project-card img { min-height:245px; }
            .hp-project-card:first-child, .hp-project-card:first-child img { min-height:280px; }
            .hp-project-card:first-child { grid-column:1 / -1; }
            .hp-project-overlay { padding:13px; }
            .hp-project-overlay h3 { font-size:16px; }
            .hp-project-overlay p { font-size:9px; }
            .hp-process-inner { padding:65px 20px 68px; }
            .hp-process-grid { grid-template-columns:1fr; gap:0; margin-top:28px; padding-left:7px; }
            .hp-process-rail { top:30px; bottom:40px; left:31px; right:auto; width:1px; height:auto; }
            .hp-process-step { display:grid; grid-template-columns:62px minmax(0,1fr); column-gap:16px; padding:13px 0; }
            .hp-process-icon { grid-row:1 / span 2; width:62px; height:62px; }
            .hp-process-step h3 { margin:4px 0 5px; font-size:17px; }
            .hp-process-step p { font-size:11px; }
            .hp-testimonial-card { padding:28px 19px; }
            .hp-quote { font-size:19px; }
            .hp-contact { padding:65px 17px; gap:25px; }
            .hp-contact-form { padding:15px; }
            .hp-footer { padding:32px 20px 23px; }
            .hp-footer-inner { grid-template-columns:1fr 1fr; gap:26px 17px; }
            .hp-footer-brand-col { grid-column:1 / -1; }
            .hp-footer-bottom { flex-direction:column; gap:8px; }
          }
          @media(max-width:380px) {
            .hp-hero-actions { grid-template-columns:1fr; }
            .hp-service-card { min-height:248px; }
            .hp-project-grid { grid-template-columns:1fr; }
            .hp-project-card:first-child { grid-column:auto; }
          }
          @media(prefers-reduced-motion:reduce) {
            .home-premium *, .home-premium *::before, .home-premium *::after { scroll-behavior:auto!important; animation:none!important; transition:none!important; }
            .home-premium [data-reveal] { opacity:1!important; transform:none!important; }
          }
        `}</style>

                <div className="hp-main">
                    <section className="hp-hero">
                        <div className="hp-hero-bg" aria-hidden="true" />
                        <div className="hp-hero-inner">
                            <div className="hp-hero-copy">
                                <span className="hp-eyebrow">Crafman Design & Build · London & Essex</span>
                                <h1>Spaces designed<br /><em>to live better.</em></h1>
                                <p>
                                    From architectural drawings and planning coordination to the finished build,
                                    we bring the important stages of your project together with one considered approach.
                                </p>
                                <div className="hp-hero-actions">
                                    <Link className="hp-button hp-button-gold" to="/contact">Discuss your project <span aria-hidden="true">↗</span></Link>
                                    <a className="hp-button hp-button-ghost" href="#hp-services">Explore our services</a>
                                </div>
                                <div className="hp-hero-meta">
                                    <span>Family-run team</span><i />
                                    <span>20+ years' industry experience</span><i />
                                    <span>Design to build</span>
                                </div>
                            </div>

                            <aside className="hp-hero-panel" data-reveal="right">
                                <span className="hp-hero-panel-label">One coordinated team</span>
                                <h2>From the first idea to the final detail.</h2>
                                <p>Design, approvals and construction brought together around the needs of your property.</p>
                                <div className="hp-panel-divider" />
                                <div className="hp-panel-row"><span>Residential projects</span><span>↗</span></div>
                                <div className="hp-panel-row"><span>Commercial spaces</span><span>↗</span></div>
                                <div className="hp-panel-row"><span>Drawings & planning</span><span>↗</span></div>
                            </aside>
                        </div>
                    </section>

                    <section className="hp-stats" aria-label="Crafman at a glance">
                        <div className="hp-stats-inner">
                            <div className="hp-stat" data-reveal>
                                <strong>20+</strong><span>Years' industry experience</span><small>Knowledge built across residential and commercial work</small>
                            </div>
                            <div className="hp-stat" data-reveal>
                                <strong>One team</strong><span>Design through construction</span><small>A joined-up approach from early decisions to delivery</small>
                            </div>
                            <div className="hp-stat" data-reveal>
                                <strong>London + Essex</strong><span>Selected service areas</span><small>Location availability confirmed at enquiry stage</small>
                            </div>
                        </div>
                    </section>

                    <section className="hp-section hp-services" id="hp-services">
                        <div className="hp-section-head" data-reveal>
                            <div>
                                <span className="hp-eyebrow">What we do</span>
                                <h2>Considered services.<br /><em>Clear direction.</em></h2>
                            </div>
                            <p>Whether you are improving a home or planning a commercial space, start with the service that best matches your project.</p>
                        </div>
                        <div className="hp-service-grid">
                            {services.map((service, index) => (
                                <Link className="hp-service-card" to={service.link} key={service.number} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
                                    <div className="hp-service-top">
                                        <span className="hp-service-number">SERVICE / {service.number}</span>
                                        <span className="hp-service-mark" aria-hidden="true">{service.mark}</span>
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <span className="hp-service-link">{service.label} <span aria-hidden="true">↗</span></span>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="hp-feature">
                        <div className="hp-feature-image" data-reveal="left">
                            <img src="/images/greenwichExt/rendering.jpeg" alt="Crafman rear extension project in Greenwich" loading="lazy" />
                        </div>
                        <div className="hp-feature-copy" data-reveal="right">
                            <span className="hp-eyebrow">A joined-up approach</span>
                            <h2>Good projects start<br /><em>with clear thinking.</em></h2>
                            <p>
                                We bring design decisions and construction knowledge into the same conversation.
                                That helps shape a practical route for your property, your priorities and the work ahead.
                            </p>
                            <div className="hp-feature-points">
                                <div className="hp-feature-point"><b>✓</b><span>Design development and architectural drawing coordination</span></div>
                                <div className="hp-feature-point"><b>✓</b><span>Planning route and building control coordination where required</span></div>
                                <div className="hp-feature-point"><b>✓</b><span>Construction delivery and project coordination</span></div>
                            </div>
                            <Link className="hp-button hp-button-gold" to="/drawings-planning">Explore drawings & planning <span aria-hidden="true">↗</span></Link>
                        </div>
                    </section>

                    <section className="hp-section hp-projects" id="hp-projects">
                        <div className="hp-section-head" data-reveal>
                            <div>
                                <span className="hp-eyebrow">Selected work</span>
                                <h2>Made for the way<br /><em>people live and work.</em></h2>
                            </div>
                            <p>A small selection of project imagery from the work and material already featured across the Crafman website.</p>
                        </div>
                        <div className="hp-project-grid">
                            {projects.map((project, index) => (
                                <article className="hp-project-card" key={project.title} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
                                    <img src={project.image} alt={project.alt} loading="lazy" />
                                    <div className="hp-project-overlay">
                                        <span className="hp-project-type">{project.type}</span>
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <div style={{ marginTop: 25 }} data-reveal>
                            <Link className="hp-button hp-button-ghost" to="/case-studies">Explore project work <span aria-hidden="true">↗</span></Link>
                        </div>
                    </section>

                    <section className="hp-process" id="hp-process">
                        <div className="hp-process-inner">
                            <div className="hp-section-head" data-reveal>
                                <div>
                                    <span className="hp-eyebrow">The Crafman approach</span>
                                    <h2>Three stages.<br /><em>One clear journey.</em></h2>
                                </div>
                                <p>Every project is different. The overall process is designed to keep decisions, responsibilities and the next steps clear.</p>
                            </div>
                            <div className="hp-process-grid">
                                <div className="hp-process-rail" aria-hidden="true" />
                                {processStages.map((stage, index) => (
                                    <article className="hp-process-step" key={stage.number} data-reveal style={{ transitionDelay: `${index * 110}ms` }}>
                                        <span className="hp-process-icon">{stage.number}</span>
                                        <h3>{stage.title}</h3>
                                        <p>{stage.text}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="hp-section hp-testimonials" aria-label="Client testimonials">
                        <div className="hp-section-head" data-reveal>
                            <div>
                                <span className="hp-eyebrow">Client feedback</span>
                                <h2>What clients say<br /><em>about the experience.</em></h2>
                            </div>
                            <p>Feedback shared in the existing Crafman homepage content.</p>
                        </div>
                        <div className="hp-testimonial-card" data-reveal>
                            <div className="hp-stars" aria-label="Five stars">★★★★★</div>
                            <p className="hp-quote">“{testimonial.text}”</p>
                            <div className="hp-testimonial-name">{testimonial.name}</div>
                            <div className="hp-testimonial-role">{testimonial.role}</div>
                            <div className="hp-testimonial-controls">
                                <button type="button" onClick={() => changeTestimonial(-1)} aria-label="Previous testimonial">←</button>
                                <button type="button" onClick={() => changeTestimonial(1)} aria-label="Next testimonial">→</button>
                            </div>
                        </div>
                    </section>

                    <section className="hp-contact" id="hp-contact">
                        <div className="hp-contact-copy" data-reveal="left">
                            <span className="hp-eyebrow">Start a conversation</span>
                            <h2>Let's talk about<br /><em>your project.</em></h2>
                            <p>Tell us what you are planning, where the property is and what you would like to achieve. The team can then discuss a suitable next step.</p>
                            <div className="hp-contact-detail">
                                <a href="tel:+442081914122">020 8191 4122</a>
                                <a href="mailto:sales@crafman.co.uk">sales@crafman.co.uk</a>
                                <span style={{ color: "#a99e82", fontSize: 11 }}>Selected areas of London and Essex</span>
                            </div>
                        </div>
                        <div className="hp-contact-form" data-reveal="right">
                            <ContactForm endpoint="https://formspree.io/f/mojpjokd" buttonText="Send project enquiry" />
                        </div>
                    </section>
                </div>

                <footer className="hp-footer">
                    <div className="hp-footer-inner">
                        <div className="hp-footer-brand-col">
                            <Link to="/" className="hp-footer-brand">CRAF<span>MAN</span></Link>
                            <div className="hp-footer-tag">Design · Build · Deliver</div>
                            <p className="hp-footer-copy">A family-run design and build team bringing residential and commercial projects together across selected areas of London and Essex.</p>
                        </div>
                        <div>
                            <h4>Explore</h4>
                            <div className="hp-footer-links">
                                <Link to="/house-extensions-london">House extensions</Link>
                                <Link to="/renovations-london">Renovations</Link>
                                <Link to="/drawings-planning">Drawings & planning</Link>
                                <Link to="/commercial-fit-outs-london">Commercial fit-outs</Link>
                                <Link to="/case-studies">Case studies</Link>
                            </div>
                        </div>
                        <div>
                            <h4>Contact</h4>
                            <div className="hp-footer-links">
                                <a href="tel:+442081914122">020 8191 4122</a>
                                <a href="mailto:sales@crafman.co.uk">sales@crafman.co.uk</a>
                                <Link to="/contact">Contact Crafman</Link>
                                <Link to="/privacy-policy">Privacy policy</Link>
                            </div>
                        </div>
                    </div>
                    <div className="hp-footer-bottom">
                        <span>© {new Date().getFullYear()} Crafman Design & Build. All rights reserved.</span>
                        <span>Design · Build · Deliver</span>
                    </div>
                </footer>
            </div>
        </Layout>
    );
}
