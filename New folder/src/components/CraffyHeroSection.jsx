import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import {
    Sparkles, ArrowRight, ShieldCheck, Clock, Check, Phone, Calendar,
    Calculator, Building2, Home, Trees, Hammer, X, Loader2, MessageSquareText,
    RotateCcw, Send
} from "lucide-react";

// =====================================================================================
// 🎯 GOOGLE ADS & ANALYTICS CONFIGURATION MATRIX
// =====================================================================================
const GOOGLE_ADS_CONFIG = {
    FORM_SUCCESS_SEND_TO: "AW-18466429796",
    CALL_CLICK_SEND_TO: "AW-18466429796/HPHiCIbN6oMdEOS2veVE",
    WHATSAPP_SEND_TO: "",
};

const FORMSPREE_CALCULATOR_ENDPOINT = "https://formspree.io/f/xzdkevbg";
const FORMSPREE_LEAD_ENDPOINT = "https://formspree.io/f/maqlqgzz";

// Master Analytics Tracking Engine
const trackConversionEvent = (eventName, params = {}) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: eventName, ...params });
        if (typeof window.gtag === "function") {
            window.gtag("event", eventName, params);
        }
    }
};

// Web Audio Synthesizer for Craffy's Typing Sound Effects
const playCraffySound = (type = "talk") => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === "talk") {
            osc.type = "sine";
            osc.frequency.setValueAtTime(520, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);
            gain.gain.setValueAtTime(0.02, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
            osc.start();
            osc.stop(ctx.currentTime + 0.04);
        } else if (type === "click") {
            osc.type = "triangle";
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.03, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        }
    } catch (e) { }
};

export default function CraffyHeroSection() {
    const navigate = useNavigate();
    const calcResultsRef = useRef(null);

    // Flow State: 'step1_menu' | 'step2_answer' | 'step3_postcode' | 'step3_book_now' | 'step3_custom_query' | 'calculator'
    const [chatStep, setChatStep] = useState("step1_menu");

    // -----------------------------------------------------------------------------------
    // 🧠 1. TYPEWRITER & DIALOGUE ENGINE
    // -----------------------------------------------------------------------------------
    const [targetSpeech, setTargetSpeech] = useState(
        "Hey! I'm Craffy, your practical planning advisor. I'm here to direct you to the right specialist. What type of project are you planning today?"
    );
    const [displayedSpeech, setDisplayedSpeech] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Typewriter Hook logic
    useEffect(() => {
        setDisplayedSpeech("");
        setIsTyping(true);
        let index = 0;
        const interval = setInterval(() => {
            if (index < targetSpeech.length) {
                const char = targetSpeech.charAt(index);
                setDisplayedSpeech((prev) => prev + char);
                if (index % 4 === 0) playCraffySound("talk");
                index++;
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, 18);

        return () => clearInterval(interval);
    }, [targetSpeech]);

    // -----------------------------------------------------------------------------------
    // 📚 2. KNOWLEDGE BASE MATRIX
    // -----------------------------------------------------------------------------------
    const knowledgeTopics = {
        extensions: {
            id: "extensions",
            title: "Rear Extensions & Permitted Development",
            summary: "Most single-storey rear extensions up to 3m (terraced) or 4m (detached)—and up to 6m/8m via Prior Approval—fall under Permitted Development! You can also extend on the side of your house up to half of the width of the original property and it shall not extend further than the original fornt and rear walls of the house.  Full planning is only needed in conservation areas or for complex wraparound extensions.",
            drawingPrice: "Fixed £950 + VAT",
            turnaround: "7 Working Days",
            calcType: "extension",
        },
        lofts: {
            id: "lofts",
            title: "Loft Conversions & Dormer Heights",
            summary: "Under Permitted Development, lofts allow up to 40m³ of extra volume for terraced homes (50m³ for semi/detached). Rear dormers and Hip-to-Gable conversions usually do not require full planning if ridge headroom exceeds 2.2m.",
            drawingPrice: "From £950 + VAT",
            turnaround: "7 Working Days",
            calcType: "loft",
        },
        garden_room: {
            id: "garden_room",
            title: "Garden Rooms & Outbuildings",
            summary: "Outbuildings are Permitted Development if kept under 2.5m eaves height when built within 2m of property boundaries (or 4m dual pitch overall). Must be for incidental home use (office, gym, studio) and not a self-contained flat.",
            drawingPrice: "From £950 + VAT",
            turnaround: "7 Working Days",
            calcType: "garden_room",
        },
        building_regs: {
            id: "building_regs",
            title: "Building Regulations & Structural Steels",
            summary: "Planning Permission and Building Control sign-offs are separate stages. Removing load-bearing walls for open-plan living legally requires Building Control sign-off and Structural Engineer RSJ beam calculations.",
            drawingPrice: "From £950 + VAT",
            turnaround: "7-10 Working Days",
            calcType: "extension",
        },
    };

    const [selectedTopicKey, setSelectedTopicKey] = useState("extensions");
    const activeKnowledge = knowledgeTopics[selectedTopicKey] || knowledgeTopics.extensions;

    // -----------------------------------------------------------------------------------
    // 📝 3. LEAD FORM STATE (INCLUDES BOOK NOW FIELDS)
    // -----------------------------------------------------------------------------------
    const [leadName, setLeadName] = useState("");
    const [leadPhone, setLeadPhone] = useState("");
    const [leadPostcode, setLeadPostcode] = useState("");
    const [leadEmail, setLeadEmail] = useState("");
    const [leadDesc, setLeadDesc] = useState("");
    const [customQuestion, setCustomQuestion] = useState("");
    const [isSubmittingLead, setIsSubmittingLead] = useState(false);
    const [leadError, setLeadError] = useState("");

    // -----------------------------------------------------------------------------------
    // 🧮 4. BUILD COST CALCULATOR STATE
    // -----------------------------------------------------------------------------------
    const [calcBuildType, setCalcBuildType] = useState("extension");
    const [calcSize, setCalcSize] = useState(18);
    const [showValuationModal, setShowValuationModal] = useState(false);
    const [showCalcResults, setShowCalcResults] = useState(false);
    const [isSubmittingCalc, setIsSubmittingCalc] = useState(false);

    const [calcLead, setCalcLead] = useState({
        name: "",
        email: "",
        phone: "",
        postcode: "",
        addKitchen: false,
        addBathroom: false,
        addFlooring: false,
        addSkylights: false,
        doorType: "standard",
    });

    const baseRates = useMemo(() => {
        let shellRate = 1800;
        if (calcBuildType === "loft") shellRate = 1500;
        if (calcBuildType === "garden_room") shellRate = 1300;

        return {
            shell: shellRate,
            kitchenInstall: 3200,
            bathroomInstall: 5700,
            flooringInstallPerSqm: 30,
            skylightInstall: 300,
            standardDoor: 300,
            standardDoorWindow: 500,
            bifoldDoor: 700,
            addedValuePerSqm: 4500,
        };
    }, [calcBuildType]);

    const calcTotals = useMemo(() => {
        const shellCost = calcSize * baseRates.shell;
        const kitchenCost = calcLead.addKitchen ? baseRates.kitchenInstall : 0;
        const bathroomCost = calcLead.addBathroom ? baseRates.bathroomInstall : 0;
        const flooringCost = calcLead.addFlooring ? calcSize * baseRates.flooringInstallPerSqm : 0;
        const skylightCost = calcLead.addSkylights ? baseRates.skylightInstall : 0;

        let doorCost = baseRates.standardDoor;
        if (calcLead.doorType === "bifold") doorCost = baseRates.bifoldDoor;
        if (calcLead.doorType === "standard_window") doorCost = baseRates.standardDoorWindow;

        const grandTotal = shellCost + kitchenCost + bathroomCost + flooringCost + skylightCost + doorCost;
        const estimatedAddedValue = calcSize * baseRates.addedValuePerSqm;

        return {
            shell: shellCost,
            kitchenCost,
            bathroomCost,
            flooringCost,
            skylightCost,
            doorCost,
            grandTotal,
            estimatedAddedValue,
        };
    }, [calcSize, calcLead, baseRates]);

    // Smooth scroll helper to main #contact-form
    const scrollToMainForm = () => {
        trackConversionEvent("craffy_schedule_human_callback_click", {
            widget_source: "Craffy Hero Section",
            destination: "#contact-form",
        });

        const formElement = document.getElementById("contact-form");
        if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth" });
        } else {
            window.location.hash = "contact-form";
        }
    };

    // Track Phone Calls
    const handleCallOfficeClick = (locationSource) => {
        trackConversionEvent("craffy_phone_call_click", {
            location: locationSource,
            widget_source: "Craffy Hero Section",
        });

        if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("event", "conversion", {
                send_to: GOOGLE_ADS_CONFIG.CALL_CLICK_SEND_TO,
            });
        }
    };

    // Step Progression Handler
    const handleTopicSelection = (key) => {
        playCraffySound("click");
        setSelectedTopicKey(key);
        const selected = knowledgeTopics[key];
        setTargetSpeech(selected.summary);
        setChatStep("step2_answer");

        trackConversionEvent("craffy_topic_select", {
            topic_id: selected.id,
            question_text: selected.title,
        });
    };

    const handleBookNowClick = () => {
        playCraffySound("click");
        setTargetSpeech("Fill in your booking details below. Our planning team will review your project specs and confirm your slot.");
        setChatStep("step3_book_now");

        trackConversionEvent("craffy_book_now_click", {
            selected_topic: activeKnowledge.title,
        });
    };

    const handleCustomQuestionClick = () => {
        playCraffySound("click");
        setTargetSpeech("No problem! Type your specific property layout or planning question below. I'll pass it straight to our senior planning strategists.");
        setChatStep("step3_custom_query");

        trackConversionEvent("craffy_custom_question_click", {
            widget_source: "Craffy AI Hero",
        });
    };

    const handleOpenCalculator = (buildType = "extension") => {
        playCraffySound("click");
        setCalcBuildType(buildType);
        setTargetSpeech("Configure your build size and project options below to calculate your instant turnkey estimate.");
        setChatStep("calculator");

        trackConversionEvent("craffy_open_calculator", {
            build_type: buildType,
        });
    };

    const handleResetToMenu = () => {
        playCraffySound("click");
        setTargetSpeech("Hey! I'm Craffy, your practical planning assistant. I'm here to direct you to the right specialist. What type of project are you planning today?");
        setChatStep("step1_menu");
        setLeadError("");

        trackConversionEvent("craffy_back_to_menu");
    };

    // Submit Lead Form
    const handleHubLeadSubmit = async (e) => {
        e.preventDefault();
        if (!leadPhone.trim() || !leadPostcode.trim()) {
            setLeadError("Please enter both your site postcode and phone number.");
            return;
        }

        setIsSubmittingLead(true);
        setLeadError("");

        const payload = {
            "Form Type": chatStep === "step3_book_now" ? "Direct Book Now Request" : (chatStep === "step3_custom_query" ? "Custom Question" : "Quick Report"),
            "Site Postcode": leadPostcode.trim().toUpperCase(),
            "Phone Number": leadPhone.trim(),
        };

        if (leadName.trim()) payload["Client Name"] = leadName.trim();
        if (leadEmail.trim()) payload["Email Address"] = leadEmail.trim();
        if (leadDesc.trim()) payload["Project Description"] = leadDesc.trim();

        if (chatStep === "step3_custom_query" && customQuestion.trim()) {
            payload["Custom Question"] = customQuestion.trim();
        } else {
            payload["Selected FAQ Topic"] = activeKnowledge.title;
        }

        try {
            const response = await fetch(FORMSPREE_LEAD_ENDPOINT, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Submission failed.");

            trackConversionEvent("craffy_form_submit_success", {
                flow_type: chatStep,
                postcode: leadPostcode.trim().toUpperCase(),
                phone: leadPhone.trim(),
            });

            if (typeof window !== "undefined" && typeof window.gtag === "function") {
                window.gtag("event", "conversion", {
                    send_to: GOOGLE_ADS_CONFIG.FORM_SUCCESS_SEND_TO,
                });
            }

            setIsSubmittingLead(false);

            navigate("/craffy-thank-you", {
                state: {
                    source: chatStep === "step3_book_now" ? "Craffy Book Now Direct" : "Craffy AI Assistant",
                    postcode: leadPostcode.trim().toUpperCase(),
                    phone: leadPhone.trim(),
                    name: leadName.trim(),
                    email: leadEmail.trim(),
                    desc: leadDesc.trim(),
                },
            });
        } catch (err) {
            setIsSubmittingLead(false);
            setLeadError("Something went wrong. Please call us directly on 020 8191 4122.");
        }
    };

    // Submit Cost Calculator
    const handleCalcSubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingCalc(true);
        setShowCalcResults(true);

        if (window.innerWidth < 768) {
            setTimeout(() => {
                calcResultsRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 200);
        }

        try {
            const res = await fetch(FORMSPREE_CALCULATOR_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    ...calcLead,
                    buildType: calcBuildType,
                    sizeSqm: calcSize,
                    totals: calcTotals,
                    submittedAt: new Date().toLocaleString("en-GB"),
                }),
            });

            if (res.ok) {
                trackConversionEvent("craffy_calculator_submit_success", {
                    build_type: calcBuildType,
                    size_sqm: calcSize,
                    grand_total: calcTotals.grandTotal,
                });

                if (typeof window !== "undefined" && typeof window.gtag === "function") {
                    window.gtag("event", "conversion", {
                        send_to: GOOGLE_ADS_CONFIG.FORM_SUCCESS_SEND_TO,
                    });
                }
            }
            setIsSubmittingCalc(false);
        } catch (err) {
            setIsSubmittingCalc(false);
        }
    };

    return (
        <div style={styles.heroWrapper}>
            <div style={styles.bgGlow} />

            <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 25px rgba(37, 99, 235, 0.25); }
          50% { box-shadow: 0 0 45px rgba(59, 130, 246, 0.45); }
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        @media (min-width: 992px) {
          .hero-grid { grid-template-columns: 5.5fr 6.5fr; }
        }
        .chip-button {
          background: #18181b;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #e4e4e7;
          padding: 13px 16px;
          border-radius: 14px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          transition: all 0.25s ease;
          margin-bottom: 8px;
        }
        .chip-button:hover {
          background: #27272a;
          border-color: #3b82f6;
          color: #ffffff;
          transform: translateX(3px);
        }
        .square-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          background: #2563eb;
          border: 3px solid #ffffff;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
        }
        .square-slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          background: #2563eb;
          border: 3px solid #ffffff;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
        }
      `}</style>

            {/* 📍 TOP HEADLINE & REGIONAL COVERAGE BADGES */}
            <div style={styles.topHeader}>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "16px" }}>
                    <div style={styles.topPill}>
                        <Sparkles size={13} color="#60a5fa" />
                        <span>Drawings & Planning</span>
                    </div>

                    <div style={styles.regionalBadge}>
                        <span>✓</span> All London & Essex Postcodes Covered
                    </div>

                    {/* 🧮 BADGE ICON: COMPLETE BUILD CALCULATOR */}
                    <button
                        onClick={() => handleOpenCalculator("extension")}
                        style={{
                            ...styles.calculatorBadge,
                            backgroundColor: chatStep === "calculator" ? "#2563eb" : "rgba(226, 186, 110, 0.15)",
                            borderColor: chatStep === "calculator" ? "#3b82f6" : "rgba(226, 186, 110, 0.4)",
                            color: chatStep === "calculator" ? "#ffffff" : "#fef08a",
                        }}
                    >
                        <Calculator size={13} color={chatStep === "calculator" ? "#ffffff" : "#fef08a"} />
                        <span>Complete Build Cost Calculator</span>
                    </button>
                </div>

                <h1 style={styles.mainTitle}>
                    Architectural Drawings Designed for <span style={{ color: '#3b82f6' }}>Council Approval</span>
                </h1>
                <p style={styles.subTitle}>
                    Fixed fees from £950 + VAT. Guaranteed 7-day turnaround across London & Essex.
                </p>
            </div>

            {/* 💡 EQUITY VALUATION EXPLANATION MODAL */}
            {showValuationModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalCard}>
                        <button onClick={() => setShowValuationModal(false)} style={styles.closeModalBtn}>
                            <X size={20} />
                        </button>
                        <h3 style={{ color: '#fef08a', margin: '0 0 12px 0', fontSize: '18px', fontWeight: 800 }}>
                            Property Equity Calculation
                        </h3>
                        <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#d4d4d8', margin: '0 0 16px 0' }}>
                            Based on local market trends across East London & Essex, added habitable space is valued at an average baseline of <strong>£4,500 per m²</strong>.
                        </p>
                        <div style={styles.modalStatBox}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                                <span style={{ color: '#a1a1aa' }}>Planned Build Area:</span>
                                <strong style={{ color: '#ffffff' }}>{calcSize} m²</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                <span style={{ color: '#a1a1aa' }}>Est. Property Value Increase:</span>
                                <strong style={{ color: '#34d399' }}>+ £{calcTotals.estimatedAddedValue.toLocaleString()}</strong>
                            </div>
                        </div>
                        <p style={{ fontSize: '11px', color: '#71717a', margin: 0 }}>
                            *Disclaimer: Estimates are based on regional averages. Actual values fluctuate based on street location and finish quality.
                        </p>
                    </div>
                </div>
            )}

            {/* 🔀 MAIN 2-COLUMN SECTION GRID */}
            <div className="hero-grid">

                {/* --------------------------------------------------------------------------------- */}
                {/* 💬 LEFT COLUMN: CRAFFY DIALOGUE BUBBLE & INTERACTIVE STEPS */}
                {/* --------------------------------------------------------------------------------- */}
                <div style={styles.leftCol}>
                    <div style={styles.speechCard}>

                        {/* CARD HEADER WITH CRAFFY AVATAR */}
                        <div style={styles.cardHeader}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={styles.craffyAvatar}>👷‍♂️</div>
                                <div>
                                    <h3 style={{ margin: 0, color: '#fff', fontSize: '17px', fontWeight: 700 }}>
                                        Craffy <span style={styles.aiTag}>AI PLANNING LEAD</span>
                                    </h3>
                                    <p style={{ margin: '3px 0 0 0', color: '#a1a1aa', fontSize: '12px' }}>
                                        London & Essex Strategy Hub
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '12px', fontWeight: 600 }}>
                                <ShieldCheck size={16} />
                                <span>Fixed Rate Guarantee</span>
                            </div>
                        </div>

                        {/* 💬 LIVE STREAMING TYPEWRITER DIALOGUE BUBBLE */}
                        <div style={styles.speechBubble}>
                            "{displayedSpeech}"
                            {isTyping && <span style={styles.typingCursor}>|</span>}
                        </div>

                        {/* ----------------------------------------------------------------------------- */}
                        {/* STEP 1: INITIAL MENU SELECTION (REDUCED CLUTTER) */}
                        {/* ----------------------------------------------------------------------------- */}
                        {chatStep === "step1_menu" && (
                            <div style={{ marginTop: '16px' }}>
                                <p style={styles.sectionHeader}>Select a project type or action:</p>

                                <button className="chip-button" onClick={() => handleTopicSelection("extensions")}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Home size={15} color="#60a5fa" />
                                        Rear or Side Extensions
                                    </span>
                                    <ArrowRight size={14} color="#60a5fa" />
                                </button>

                                <button className="chip-button" onClick={() => handleTopicSelection("lofts")}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Building2 size={15} color="#60a5fa" />
                                        Loft Conversions & Dormers
                                    </span>
                                    <ArrowRight size={14} color="#60a5fa" />
                                </button>

                                <button className="chip-button" onClick={() => handleTopicSelection("garden_room")}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Trees size={15} color="#60a5fa" />
                                        Garden Rooms & Outbuildings
                                    </span>
                                    <ArrowRight size={14} color="#60a5fa" />
                                </button>

                                <button className="chip-button" onClick={() => handleTopicSelection("building_regs")}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Hammer size={15} color="#60a5fa" />
                                        Building Control & RSJ Steels
                                    </span>
                                    <ArrowRight size={14} color="#60a5fa" />
                                </button>

                                <div style={styles.divider}>
                                    <div style={styles.dividerLine}></div>
                                    <span style={styles.dividerText}>OR DIRECT TOOLS</span>
                                    <div style={styles.dividerLine}></div>
                                </div>

                                {/* 🧮 CALCULATOR BUTTON */}
                                <button
                                    className="chip-button"
                                    onClick={() => handleOpenCalculator("extension")}
                                    style={{ borderColor: '#60a5fa', backgroundColor: 'rgba(37, 99, 235, 0.08)' }}
                                >
                                    <span style={{ color: '#93c5fd', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Calculator size={14} color="#60a5fa" />
                                        Calculate Build Costs (£/sqm)
                                    </span>
                                    <ArrowRight size={14} color="#60a5fa" />
                                </button>

                                {/* 📅 HUMAN STRATEGY SESSION */}
                                <button
                                    onClick={scrollToMainForm}
                                    className="chip-button"
                                    style={{ borderColor: '#e2ba6e', backgroundColor: 'rgba(226, 186, 110, 0.08)' }}
                                >
                                    <span style={{ color: '#fef08a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Calendar size={14} color="#fef08a" />
                                        Book Free Human Strategy Session
                                    </span>
                                    <ArrowRight size={14} color="#fef08a" />
                                </button>

                                {/* BESPOKE QUESTION */}
                                <button
                                    className="chip-button"
                                    onClick={handleCustomQuestionClick}
                                    style={{ borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.08)' }}
                                >
                                    <span style={{ color: '#bae6fd', fontWeight: 600 }}>✍️ Ask a specific or bespoke question...</span>
                                    <ArrowRight size={14} color="#38bdf8" />
                                </button>

                                {/* 📞 CALL OFFICE BANNER */}
                                <a
                                    href="tel:02081914122"
                                    style={styles.initialCallBanner}
                                    onClick={() => handleCallOfficeClick("step1_menu")}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={styles.phoneIconBadge}>
                                            <Phone size={14} color="#60a5fa" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Speak to a Strategist Right Now</div>
                                            <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Call 020 8191 4122 for instant advice</div>
                                        </div>
                                    </div>
                                    <ArrowRight size={15} color="#60a5fa" />
                                </a>
                            </div>
                        )}

                        {/* ----------------------------------------------------------------------------- */}
                        {/* STEP 2: ANSWERED TOPIC ADVICE & SWAPPED TARGETED ACTIONS */}
                        {/* ----------------------------------------------------------------------------- */}
                        {chatStep === "step2_answer" && (
                            <div style={{ marginTop: '16px' }}>

                                {/* DRAWINGS RATE & TURNAROUND WITH BOOK NOW ACTION */}
                                <div style={styles.priceRow}>
                                    <div>
                                        <span style={{ color: '#a1a1aa', fontSize: '11px', display: 'block', textTransform: 'uppercase' }}>Drawings Rate</span>
                                        <strong style={{ color: '#34d399', fontSize: '15px' }}>{activeKnowledge.drawingPrice}</strong>
                                    </div>

                                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <span style={{ color: '#a1a1aa', fontSize: '11px', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Turnaround: {activeKnowledge.turnaround}</span>
                                        <button
                                            type="button"
                                            onClick={handleBookNowClick}
                                            style={styles.inlineBookNowBtn}
                                        >
                                            <Send size={12} />
                                            <span>Book Now</span>
                                        </button>
                                    </div>
                                </div>

                                <p style={{ ...styles.sectionHeader, marginTop: '16px' }}>Choose your next step:</p>

                                {/* 1. SWAPPED POSITION #1: CALCULATE BUILD COSTS */}
                                <button
                                    onClick={() => handleOpenCalculator(activeKnowledge.calcType)}
                                    style={{ ...styles.primaryButton, backgroundColor: '#2563eb' }}
                                >
                                    <Calculator size={16} />
                                    <span>Calculate Build Costs For {activeKnowledge.title.split(' ')[0]}</span>
                                    <ArrowRight size={16} />
                                </button>

                                
                                <button
                                    onClick={scrollToMainForm}
                                    style={styles.scheduleCallbackBtn}
                                >
                                    <Calendar size={15} color="#E2BA6E" />
                                    <span>Book Free Human Consultation Call</span>
                                </button>

                                <a
                                    href="tel:02081914122"
                                    style={styles.secondaryCallButton}
                                    onClick={() => handleCallOfficeClick("step2_answer")}
                                >
                                    <Phone size={15} color="#60a5fa" />
                                    <span>Call Office Directly (020 8191 4122)</span>
                                </a>

                                <button style={styles.backButton} onClick={handleResetToMenu}>
                                    <RotateCcw size={12} style={{ display: 'inline', marginRight: '4px' }} />
                                    <span>Return to Main Menu</span>
                                </button>
                            </div>
                        )}

                        {/* ----------------------------------------------------------------------------- */}
                        {/* STEP 3A: BOOK NOW INLINE FORM (NAME, POSTCODE, PHONE, EMAIL, DESC) */}
                        {/* ----------------------------------------------------------------------------- */}
                        {chatStep === "step3_book_now" && (
                            <form onSubmit={handleHubLeadSubmit} style={{ marginTop: '16px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                                    <div>
                                        <label style={styles.inputLabel}>1. Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Sarah Jenkins"
                                            value={leadName}
                                            onChange={(e) => setLeadName(e.target.value)}
                                            style={styles.textInput}
                                        />
                                    </div>
                                    <div>
                                        <label style={styles.inputLabel}>2. Project Postcode</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. RM11 3BL"
                                            value={leadPostcode}
                                            onChange={(e) => setLeadPostcode(e.target.value)}
                                            style={styles.textInput}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                                    <div>
                                        <label style={styles.inputLabel}>3. Phone Line</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="07123 456789"
                                            value={leadPhone}
                                            onChange={(e) => setLeadPhone(e.target.value)}
                                            style={styles.textInput}
                                        />
                                    </div>
                                    <div>
                                        <label style={styles.inputLabel}>4. Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="sarah@example.com"
                                            value={leadEmail}
                                            onChange={(e) => setLeadEmail(e.target.value)}
                                            style={styles.textInput}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '14px' }}>
                                    <label style={styles.inputLabel}>5. Project Description & Notes</label>
                                    <textarea
                                        placeholder="e.g. Planning a 4m rear extension with bi-fold doors. Need drawings for council submission."
                                        value={leadDesc}
                                        onChange={(e) => setLeadDesc(e.target.value)}
                                        style={{ ...styles.textInput, height: '70px', resize: 'vertical' }}
                                    />
                                </div>

                                {leadError && <p style={{ color: '#f87171', fontSize: '12px', margin: '0 0 12px 0' }}>{leadError}</p>}

                                <button type="submit" disabled={isSubmittingLead} style={{ ...styles.primaryButton, backgroundColor: '#10b981' }}>
                                    {isSubmittingLead ? <Loader2 size={16} className="animate-spin" /> : <><span>Confirm Booking Request</span><ArrowRight size={16} /></>}
                                </button>

                                <button type="button" style={styles.backButton} onClick={handleResetToMenu}>← Back to Main Menu</button>
                            </form>
                        )}

                        {/* ----------------------------------------------------------------------------- */}
                        {/* STEP 3B: POSTCODE LEAD CAPTURE FORM */}
                        {/* ----------------------------------------------------------------------------- */}
                        {chatStep === "step3_postcode" && (
                            <form onSubmit={handleHubLeadSubmit} style={{ marginTop: '16px' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <label style={styles.inputLabel}>1. Your Name (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Sarah Jenkins"
                                        value={leadName}
                                        onChange={(e) => setLeadName(e.target.value)}
                                        style={styles.textInput}
                                    />
                                </div>

                                <div style={{ marginBottom: '12px' }}>
                                    <label style={styles.inputLabel}>2. Project Site Postcode</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. RM11 3BL or IG11 7BT"
                                        value={leadPostcode}
                                        onChange={(e) => setLeadPostcode(e.target.value)}
                                        style={styles.textInput}
                                    />
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <label style={styles.inputLabel}>3. Mobile Phone Line</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="07123 456789"
                                        value={leadPhone}
                                        onChange={(e) => setLeadPhone(e.target.value)}
                                        style={styles.textInput}
                                    />
                                </div>

                                {leadError && <p style={{ color: '#f87171', fontSize: '12px', margin: '0 0 12px 0' }}>{leadError}</p>}

                                <button type="submit" disabled={isSubmittingLead} style={styles.primaryButton}>
                                    {isSubmittingLead ? <Loader2 size={16} className="animate-spin" /> : <><span>Generate Free Planning Report</span><ArrowRight size={16} /></>}
                                </button>

                                <button type="button" style={styles.backButton} onClick={handleResetToMenu}>← Back to Main Menu</button>
                            </form>
                        )}

                        {/* ----------------------------------------------------------------------------- */}
                        {/* STEP 3C: CUSTOM BESPOKE QUESTION FORM */}
                        {/* ----------------------------------------------------------------------------- */}
                        {chatStep === "step3_custom_query" && (
                            <form onSubmit={handleHubLeadSubmit} style={{ marginTop: '16px' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <label style={styles.inputLabel}>What is your specific question?</label>
                                    <textarea
                                        required
                                        placeholder="e.g. We have a Thames Water pipe near the boundary, can we still do a 4m rear extension?"
                                        value={customQuestion}
                                        onChange={(e) => setCustomQuestion(e.target.value)}
                                        style={{ ...styles.textInput, height: '80px', resize: 'vertical' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                    <div>
                                        <label style={styles.inputLabel}>Site Postcode</label>
                                        <input type="text" required placeholder="Postcode" value={leadPostcode} onChange={(e) => setLeadPostcode(e.target.value)} style={styles.textInput} />
                                    </div>
                                    <div>
                                        <label style={styles.inputLabel}>Phone Number</label>
                                        <input type="tel" required placeholder="07123 456789" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} style={styles.textInput} />
                                    </div>
                                </div>

                                {leadError && <p style={{ color: '#f87171', fontSize: '12px', margin: '0 0 12px 0' }}>{leadError}</p>}

                                <button type="submit" disabled={isSubmittingLead} style={{ ...styles.primaryButton, backgroundColor: '#0284c7' }}>
                                    {isSubmittingLead ? <Loader2 size={16} className="animate-spin" /> : <><span>Send to Architectural Team</span><ArrowRight size={16} /></>}
                                </button>

                                <button type="button" style={styles.backButton} onClick={handleResetToMenu}>← Back to Main Menu</button>
                            </form>
                        )}

                        {/* ----------------------------------------------------------------------------- */}
                        {/* STEP 3D: BUILD COST CALCULATOR FORM */}
                        {/* ----------------------------------------------------------------------------- */}
                        {chatStep === "calculator" && (
                            <div style={{ marginTop: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={styles.inputLabel}>SELECT BUILD TYPE</span>
                                    
                                </div>

                                {/* TYPE SELECTOR */}
                                <div style={styles.calcTypeGrid}>
                                    <button
                                        type="button"
                                        onClick={() => setCalcBuildType("extension")}
                                        style={styles.typeBtn(calcBuildType === "extension")}
                                    >
                                        <Home size={15} />
                                        <span>Extension </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setCalcBuildType("loft")}
                                        style={styles.typeBtn(calcBuildType === "loft")}
                                    >
                                        <Building2 size={15} />
                                        <span>Loft </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setCalcBuildType("garden_room")}
                                        style={styles.typeBtn(calcBuildType === "garden_room")}
                                    >
                                        <Trees size={15} />
                                        <span>Garden Room </span>
                                    </button>
                                </div>

                                {/* SIZE SLIDER */}
                                <div style={styles.sliderBox}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '12px', color: '#a1a1aa' }}>Planned Area:</span>
                                        <strong style={{ fontSize: '22px', color: '#fef08a', fontWeight: 800 }}>{calcSize} m²</strong>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="60"
                                        step="1"
                                        value={calcSize}
                                        onChange={(e) => setCalcSize(Number(e.target.value))}
                                        className="square-slider"
                                        style={styles.rangeInput}
                                    />
                                </div>

                                {/* ADDONS */}
                                <p style={{ ...styles.inputLabel, marginTop: '14px' }}>PROJECT OPTIONS</p>
                                <div style={styles.optionsGrid}>
                                    <button
                                        type="button"
                                        onClick={() => setCalcLead({ ...calcLead, addKitchen: !calcLead.addKitchen })}
                                        style={styles.optionToggleBtn(calcLead.addKitchen)}
                                    >
                                        Kitchen (+£3.2k)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCalcLead({ ...calcLead, addBathroom: !calcLead.addBathroom })}
                                        style={styles.optionToggleBtn(calcLead.addBathroom)}
                                    >
                                        Bathroom (+£5.7k)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCalcLead({ ...calcLead, addSkylights: !calcLead.addSkylights })}
                                        style={styles.optionToggleBtn(calcLead.addSkylights)}
                                    >
                                        Skylights (+£300)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCalcLead({ ...calcLead, addFlooring: !calcLead.addFlooring })}
                                        style={styles.optionToggleBtn(calcLead.addFlooring)}
                                    >
                                        Flooring (+£30/m²)
                                    </button>
                                </div>

                                {/* CALCULATOR FORM */}
                                <form onSubmit={handleCalcSubmit} style={{ marginTop: '14px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                                        <input placeholder="Your Name" value={calcLead.name} onChange={(e) => setCalcLead({ ...calcLead, name: e.target.value })} style={styles.calcInput} required />
                                        <input placeholder="Site Postcode" value={calcLead.postcode} onChange={(e) => setCalcLead({ ...calcLead, postcode: e.target.value })} style={styles.calcInput} required />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                                        <input placeholder="Email Address" type="email" value={calcLead.email} onChange={(e) => setCalcLead({ ...calcLead, email: e.target.value })} style={styles.calcInput} required />
                                        <input placeholder="Phone Number" type="tel" value={calcLead.phone} onChange={(e) => setCalcLead({ ...calcLead, phone: e.target.value })} style={styles.calcInput} required />
                                    </div>

                                    <button type="submit" disabled={isSubmittingCalc} style={styles.calcSubmitBtn}>
                                        {isSubmittingCalc ? <Loader2 size={16} className="animate-spin" /> : "Reveal Full Build Estimate"}
                                    </button>
                                </form>

                                <button type="button" style={styles.backButton} onClick={handleResetToMenu}>← Back to Main Menu</button>
                            </div>
                        )}

                    </div>
                </div>

                {/* --------------------------------------------------------------------------------- */}
                {/* 📊 RIGHT COLUMN: DYNAMIC SUMMARY CARD OR CALCULATOR ESTIMATE */}
                {/* --------------------------------------------------------------------------------- */}
                <div style={styles.rightCol}>

                    {chatStep !== "calculator" && (
                        <div style={styles.resultsCard}>
                            <div style={styles.cardHeader}>
                                <h3 style={{ margin: 0, color: '#fff', fontSize: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <MessageSquareText size={18} color="#60a5fa" />
                                    <span>Planning Strategy Overview</span>
                                </h3>
                                <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 700 }}>VERIFIED</span>
                            </div>

                            <div style={styles.summaryTopicBox}>
                                <div style={{ fontSize: '11px', color: '#93c5fd', fontWeight: 700, textTransform: 'uppercase' }}>Selected Track</div>
                                <div style={{ fontSize: '16px', color: '#ffffff', fontWeight: 800, marginTop: '2px' }}>{activeKnowledge.title}</div>
                            </div>

                            <div style={styles.summaryStatRow}>
                                <div style={styles.summaryStatBox}>
                                    <span style={{ fontSize: '10px', color: '#a1a1aa', display: 'block', textTransform: 'uppercase' }}>Fixed Drawing Rate</span>
                                    <strong style={{ fontSize: '16px', color: '#34d399' }}>{activeKnowledge.drawingPrice}</strong>
                                </div>

                                <div style={styles.summaryStatBox}>
                                    <span style={{ fontSize: '10px', color: '#a1a1aa', display: 'block', textTransform: 'uppercase' }}>Council Turnaround</span>
                                    <strong style={{ fontSize: '16px', color: '#ffffff' }}>{activeKnowledge.turnaround}</strong>
                                </div>
                            </div>

                            <div style={{ marginTop: '20px', backgroundColor: '#18181b', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#ffffff', fontWeight: 700 }}>What is included in this package?</h4>
                                <div style={styles.includedCheck}>✓ Measured On-Site Property Survey</div>
                                <div style={styles.includedCheck}>✓ Proposed Architectural Plans & Elevations</div>
                                <div style={styles.includedCheck}>✓ Council Planning / Permitted Development Submission</div>
                                <div style={styles.includedCheck}>✓ Unlimited Drawing Revisions Until Approval</div>
                            </div>
                            {/* DRAWINGS RATE & TURNAROUND WITH BOOK NOW ACTION */}
                            <div style={styles.priceRow}>
                                <div>
                                    <span style={{ color: '#a1a1aa', fontSize: '11px', display: 'block', textTransform: 'uppercase' }}>Drawings Rate</span>
                                    <strong style={{ color: '#34d399', fontSize: '15px' }}>{activeKnowledge.drawingPrice}</strong>
                                </div>

                                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <span style={{ color: '#a1a1aa', fontSize: '11px', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Turnaround: {activeKnowledge.turnaround}</span>
                                    <button
                                        type="button"
                                        onClick={handleBookNowClick}
                                        style={styles.inlineBookNowBtn}
                                    >
                                        <Send size={12} />
                                        <span>Book Now</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CALCULATOR RESULTS CARD */}
                    {chatStep === "calculator" && (
                        <div ref={calcResultsRef} style={styles.resultsCard}>
                            <div style={styles.equityBox}>
                                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#fef08a', fontWeight: 800 }}>
                                    Estimated Property Equity Growth
                                </div>
                                <div style={{ fontSize: '28px', fontWeight: 900, color: '#34d399', marginTop: '4px', filter: showCalcResults ? 'none' : 'blur(8px)', transition: 'filter 0.5s ease' }}>
                                    + £{calcTotals.estimatedAddedValue.toLocaleString()}
                                </div>
                                <button
                                    onClick={() => setShowValuationModal(true)}
                                    style={{ background: 'none', border: 'none', color: '#a1a1aa', fontSize: '11px', textDecoration: 'underline', padding: '4px 0 0 0', cursor: 'pointer' }}
                                >
                                    How is this calculated?
                                </button>
                            </div>

                            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#a1a1aa', letterSpacing: '1px' }}>
                                Turnkey Build Estimate ({calcBuildType.toUpperCase()})
                            </div>

                            <div style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 900, color: '#ffffff', margin: '8px 0', filter: showCalcResults ? 'none' : 'blur(12px)', transition: 'filter 0.5s ease' }}>
                                FROM £{Math.round(calcTotals.grandTotal).toLocaleString()}
                            </div>

                            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ fontWeight: 800, marginBottom: '14px', color: '#60a5fa', fontSize: '12px', letterSpacing: '0.5px' }}>
                                    ITEMIZED BREAKDOWN ({calcSize}m²):
                                </div>

                                <div style={styles.breakdownRow}>
                                    <span>Base Shell Construction:</span>
                                    <span style={{ filter: showCalcResults ? 'none' : 'blur(6px)' }}>£{calcTotals.shell.toLocaleString()}</span>
                                </div>

                                <div style={styles.includedRow}><span>15-Year Structural Guarantee:</span><span>INCLUDED</span></div>
                                <div style={styles.includedRow}><span>Architectural Drawings:</span><span>INCLUDED</span></div>
                                <div style={styles.includedRow}><span>External Rendering / Finishes:</span><span>INCLUDED</span></div>

                                <div style={styles.breakdownRow}>
                                    <span>Door Choice:</span>
                                    <span style={{ filter: showCalcResults ? 'none' : 'blur(6px)' }}>£{calcTotals.doorCost.toLocaleString()}</span>
                                </div>

                                {calcLead.addSkylights && <div style={styles.breakdownRow}><span>Skylights:</span><span>£{calcTotals.skylightCost.toLocaleString()}</span></div>}
                                {calcLead.addKitchen && <div style={styles.breakdownRow}><span>Kitchen Fitout:</span><span>£{calcTotals.kitchenCost.toLocaleString()}</span></div>}
                                {calcLead.addBathroom && <div style={styles.breakdownRow}><span>Bathroom Fitout:</span><span>£{calcTotals.bathroomCost.toLocaleString()}</span></div>}
                                {calcLead.addFlooring && <div style={styles.breakdownRow}><span>Flooring Fitout:</span><span>£{calcTotals.flooringCost.toLocaleString()}</span></div>}

                                {showCalcResults && (
                                    <div style={{ marginTop: '20px' }}>
                                        <div style={styles.proTipBox}>
                                            <strong>Pro Tip:</strong> Concept meetings frequently identify layout tweaks that <strong>save £3,000–£5,000</strong> on construction.
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <button
                                                onClick={scrollToMainForm}
                                                style={{ ...styles.primaryButton, backgroundColor: '#2563eb' }}
                                            >
                                                📅 Book Free Strategy Session
                                            </button>

                                            <a
                                                href="tel:02081914122"
                                                style={styles.secondaryCallButton}
                                                onClick={() => handleCallOfficeClick("calculator_result")}
                                            >
                                                <Phone size={14} color="#60a5fa" />
                                                <span>Speak with Office (020 8191 4122)</span>
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>

            </div>

            {/* 🛡️ BOTTOM TRUST BAR */}
            <div style={styles.trustBar}>
                <div style={styles.trustItem}><Check size={16} color="#3b82f6" /><span>7-Working-Day Turnaround</span></div>
                <div style={styles.trustItem}><Check size={16} color="#3b82f6" /><span>Fixed Rates from £950 + VAT</span></div>
                <div style={styles.trustItem}><Check size={16} color="#3b82f6" /><span>100% Council Sign-Off Track Record</span></div>
                <div style={styles.trustItem}><Clock size={16} color="#3b82f6" /><span>Unlimited Revisions Included</span></div>
            </div>
        </div>
    );
}

// Scoped Layout Styles
const styles = {
    heroWrapper: {
        backgroundColor: '#09090b',
        color: '#ffffff',
        minHeight: '100vh',
        padding: '40px 20px 60px 20px',
        boxSizing: 'border-box',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
    },
    bgGlow: {
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(9,9,11,0) 70%)',
        pointerEvents: 'none',
    },
    topHeader: {
        textAlign: 'center',
        maxWidth: '820px',
        margin: '0 auto 36px auto',
        position: 'relative',
        zIndex: 10,
    },
    topPill: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: 'rgba(30, 58, 138, 0.35)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        color: '#93c5fd',
        padding: '6px 14px',
        borderRadius: '30px',
        fontSize: '11px',
        fontWeight: 700,
    },
    regionalBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: 'rgba(34, 197, 94, 0.12)',
        border: '1px solid rgba(34, 197, 94, 0.35)',
        color: '#4ade80',
        padding: '6px 14px',
        borderRadius: '30px',
        fontSize: '11px',
        fontWeight: 800,
    },
    calculatorBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        border: '1px solid',
        padding: '6px 14px',
        borderRadius: '30px',
        fontSize: '11px',
        fontWeight: 800,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    mainTitle: {
        fontSize: 'clamp(28px, 4.5vw, 48px)',
        fontWeight: 900,
        lineHeight: '1.15',
        margin: '0 0 12px 0',
        color: '#ffffff',
    },
    subTitle: {
        fontSize: '15px',
        color: '#a1a1aa',
        margin: 0,
    },
    leftCol: { width: '100%' },
    rightCol: { width: '100%' },
    speechCard: {
        backgroundColor: '#121215',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        padding: '24px',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '16px',
        marginBottom: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    },
    craffyAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
    },
    aiTag: {
        fontSize: '10px',
        backgroundColor: 'rgba(37, 99, 235, 0.3)',
        color: '#60a5fa',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        padding: '2px 6px',
        borderRadius: '4px',
        marginLeft: '6px',
        fontWeight: 700,
    },
    speechBubble: {
        backgroundColor: '#18181b',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '16px',
        padding: '16px',
        color: '#f4f4f5',
        fontSize: '14px',
        minHeight: '70px',
        lineHeight: '1.6',
        position: 'relative',
    },
    typingCursor: { color: '#38bdf8', fontWeight: 'bold', marginLeft: '2px' },
    sectionHeader: {
        fontSize: '11px',
        color: '#a1a1aa',
        fontWeight: 700,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        margin: '0 0 12px 0',
    },
    divider: { display: 'flex', alignItems: 'center', margin: '12px 0' },
    dividerLine: { flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' },
    dividerText: { margin: '0 10px', fontSize: '10px', color: '#71717a', fontWeight: 800 },
    initialCallBanner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#18181b',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        borderRadius: '14px',
        padding: '12px 16px',
        marginTop: '12px',
        textDecoration: 'none',
    },
    phoneIconBadge: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '12px',
        paddingBottom: '12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        marginTop: '12px',
        marginBottom: '12px',
    },
    inlineBookNowBtn: {
        backgroundColor: '#10b981',
        color: '#ffffff',
        border: 'none',
        padding: '6px 14px',
        borderRadius: '8px',
        fontWeight: 700,
        fontSize: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'background 0.2s ease',
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        border: 'none',
        padding: '14px 18px',
        borderRadius: '12px',
        fontWeight: 700,
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '10px',
    },
    scheduleCallbackBtn: {
        width: '100%',
        backgroundColor: 'rgba(226, 186, 110, 0.12)',
        color: '#fef08a',
        border: '1px solid rgba(226, 186, 110, 0.4)',
        padding: '12px 18px',
        borderRadius: '12px',
        fontWeight: 700,
        fontSize: '13px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '8px',
    },
    secondaryCallButton: {
        width: '100%',
        backgroundColor: '#18181b',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '12px 18px',
        borderRadius: '12px',
        fontWeight: 600,
        fontSize: '13px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '8px',
        textDecoration: 'none',
        boxSizing: 'border-box',
    },
    backButton: {
        background: 'none',
        border: 'none',
        color: '#a1a1aa',
        fontSize: '12px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '12px',
    },
    inputLabel: { display: 'block', fontSize: '11px', color: '#a1a1aa', marginBottom: '4px', fontWeight: 700 },
    textInput: {
        width: '100%',
        backgroundColor: '#18181b',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#ffffff',
        padding: '12px',
        borderRadius: '12px',
        fontSize: '13.5px',
        boxSizing: 'border-box',
        outline: 'none',
    },
    // Calculator Specifics
    calcTypeGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' },
    typeBtn: (active) => ({
        border: active ? '1px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '12px',
        padding: '10px 6px',
        backgroundColor: active ? '#2563eb' : '#18181b',
        color: '#ffffff',
        fontSize: '11px',
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
    }),
    sliderBox: {
        backgroundColor: '#18181b',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px',
        padding: '14px',
    },
    rangeInput: {
        width: '100%',
        height: '8px',
        backgroundColor: '#27272a',
        borderRadius: '4px',
        outline: 'none',
        cursor: 'pointer',
        WebkitAppearance: 'none',
    },
    optionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' },
    optionToggleBtn: (active) => ({
        padding: '9px',
        borderRadius: '10px',
        border: active ? '1px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.12)',
        backgroundColor: active ? '#2563eb' : '#18181b',
        color: '#ffffff',
        fontSize: '11px',
        fontWeight: 600,
        cursor: 'pointer',
        textAlign: 'center',
    }),
    calcInput: {
        width: '100%',
        backgroundColor: '#18181b',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#ffffff',
        padding: '10px',
        borderRadius: '10px',
        fontSize: '12px',
        boxSizing: 'border-box',
        outline: 'none',
    },
    calcSubmitBtn: {
        width: '100%',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        border: 'none',
        padding: '13px',
        borderRadius: '12px',
        fontWeight: 800,
        fontSize: '13.5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultsCard: {
        backgroundColor: '#121215',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        padding: '24px',
    },
    summaryTopicBox: {
        backgroundColor: '#18181b',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        padding: '14px',
        marginBottom: '12px',
    },
    summaryStatRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
    summaryStatBox: {
        backgroundColor: '#18181b',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '12px',
        borderRadius: '12px',
    },
    includedCheck: { fontSize: '12px', color: '#4ade80', fontWeight: 600, marginBottom: '6px' },
    equityBox: {
        backgroundColor: 'rgba(226, 186, 110, 0.1)',
        border: '1px dashed rgba(226, 186, 110, 0.4)',
        borderRadius: '16px',
        padding: '14px',
        marginBottom: '16px',
    },
    breakdownRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '13px',
        color: '#d4d4d8',
        marginBottom: '8px',
    },
    includedRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: '#fef08a',
        fontWeight: 600,
        marginBottom: '6px',
    },
    proTipBox: {
        backgroundColor: 'rgba(30, 58, 138, 0.3)',
        borderLeft: '3px solid #3b82f6',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#93c5fd',
        marginBottom: '14px',
        lineHeight: '1.5',
    },
    modalOverlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    modalCard: {
        backgroundColor: '#121215',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '24px',
        padding: '28px',
        maxWidth: '460px',
        width: '100%',
        position: 'relative',
    },
    closeModalBtn: {
        position: 'absolute',
        right: '16px',
        top: '16px',
        background: 'none',
        border: 'none',
        color: '#a1a1aa',
        cursor: 'pointer',
    },
    modalStatBox: {
        backgroundColor: '#18181b',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '14px',
        borderRadius: '12px',
        marginBottom: '14px',
    },
    trustBar: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px sm:36px',
        maxWidth: '1240px',
        margin: '40px auto 0 auto',
        paddingTop: '24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        zIndex: 10,
    },
    trustItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#e4e4e7', fontWeight: 500 },
};