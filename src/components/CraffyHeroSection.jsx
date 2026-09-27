import React, { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { Sparkles, ArrowRight, CheckCircle2, Phone, ShieldCheck, Clock, Check, MessageSquareText, Loader2, ScanLine } from "lucide-react";

// Web Audio Synthesizer for Craffy's Voice
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
        } else if (type === "tablet") {
            osc.type = "triangle";
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.12);
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
            osc.start();
            osc.stop(ctx.currentTime + 0.12);
        }
    } catch (e) { }
};

export default function CraffyHeroSection() {
    const SPLINE_SCENE_URL = "https://prod.spline.design/blo2FccZ2Q7hEkIq/scene.splinecode";
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqlqgzz";
    const GOOGLE_ADS_ID = "AW-18466429796";

    const splineRef = useRef(null);
    const [splineLoaded, setSplineLoaded] = useState(false);
    const [craffyStatus, setCraffyStatus] = useState("Idle & Listening");
    const [chatStep, setChatStep] = useState("initial"); // "initial" | "answered" | "postcode" | "custom_query" | "submitted"

    // Dialogue & Speech State
    const [targetSpeech, setTargetSpeech] = useState(
        "Welcome! Are you planning an extension, loft conversion, or internal layout change? Tap a topic below or ask a custom question."
    );

    // Tablet HUD Overlay Content
    const [tabletContent, setTabletContent] = useState({
        title: "CRAFMAN CAD ENGINE v2.4",
        stat1: "FEES: £950 + VAT",
        stat2: "TIME: 7 DAYS",
        status: "READY FOR INPUT",
    });

    // User Input State
    const [postcode, setPostcode] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [customQuestion, setCustomQuestion] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Live Typewriter Effect Hook
    const [displayedSpeech, setDisplayedSpeech] = useState("");

    useEffect(() => {
        setDisplayedSpeech("");
        let index = 0;
        const interval = setInterval(() => {
            if (index < targetSpeech.length) {
                const char = targetSpeech.charAt(index);
                setDisplayedSpeech((prev) => prev + char);
                if (index % 4 === 0) playCraffySound("talk");
                index++;
            } else {
                clearInterval(interval);
            }
        }, 18);

        return () => clearInterval(interval);
    }, [targetSpeech]);

    // General Knowledge Base
    const quickAnswers = {
        planning: {
            question: "Do I need planning permission for extensions?",
            answer: "Most single-storey rear extensions up to 3m (terraced) or 4m (detached)—and up to 6m/8m via Prior Approval—fall under Permitted Development! Full planning is only needed in conservation areas or for complex wrapped extensions.",
            price: "Fixed £950 + VAT",
            turnaround: "7 Working Days",
            tabletTitle: "REAR EXTENSIONS",
            tabletCode: "PERMITTED // 3M-6M LIMIT",
        },
        lofts: {
            question: "How do Loft Conversions & Dormers work?",
            answer: "Under Permitted Development, lofts allow up to 40 cubic metres of extra space for terraced homes (50m³ for semi/detached). Rear dormers and Hip-to-Gable conversions usually don't need planning permission if headroom exceeds 2.2 metres!",
            price: "Fixed Rates Available",
            turnaround: "7 Working Days",
            tabletTitle: "LOFT CONVERSIONS",
            tabletCode: "VOL: 40-50M³ // CLEARANCE 2.2M",
        },
        internal: {
            question: "Removing load-bearing walls & RSJ steels?",
            answer: "Knocking down internal walls for open-plan kitchens does not require Planning Permission, but DOES legally require Building Regulations sign-off and Structural Engineer RSJ beam calculations so your house remains safe.",
            price: "Technical Packages",
            turnaround: "7-10 Working Days",
            tabletTitle: "INTERNAL ALTERATIONS",
            tabletCode: "RSJ CALCS // STRUCTURAL REGS",
        },
        outbuildings: {
            question: "Garden Rooms, Studios & Outbuilding rules?",
            answer: "Outbuildings are Permitted Development if kept under 2.5m eaves height when built within 2 metres of property boundaries (or 4m dual pitch overall). They must be for incidental use (gym, office, studio) and not a separate self-contained dwelling.",
            price: "From £950 + VAT",
            turnaround: "7 Working Days",
            tabletTitle: "GARDEN OUTBUILDINGS",
            tabletCode: "MAX 2.5M HEIGHT // INCIDENTAL",
        },
        regs: {
            question: "Are Building Regulations drawings included?",
            answer: "Planning Permission and Building Control drawings are two separate stages. Planning gets council permission for appearance, while Building Control provides structural construction plans for your builder.",
            price: "Complete Packages",
            turnaround: "Full Technical Pack",
            tabletTitle: "BUILDING CONTROL",
            tabletCode: "STRUCTURAL DRAFTING PACK",
        },
        pricing: {
            question: "What are your fixed rates & guarantees?",
            answer: "Our architectural planning drawings start at a guaranteed fixed rate of £950 + VAT with zero hidden fees. Includes unlimited drawing revisions until council approval.",
            price: "From £950 + VAT",
            turnaround: "7 Working Days",
            tabletTitle: "FIXED RATE GUARANTEE",
            tabletCode: "GUARANTEED £950 + VAT",
        },
    };

    const [activeAnswer, setActiveAnswer] = useState(quickAnswers.planning);

    const trigger3DAction = (actionType) => {
        if (!splineRef.current) return;
        try {
            if (actionType === "thinking") {
                setCraffyStatus("Analyzing Planning Rules...");
                splineRef.current.emitEvent("mouseHover", "Head");
            } else if (actionType === "pitching") {
                setCraffyStatus("Updating Tablet HUD...");
                splineRef.current.emitEvent("mouseDown", "Tablet");
            } else if (actionType === "typing") {
                setCraffyStatus("Checking Local Postcode...");
                splineRef.current.emitEvent("mouseHover", "Tablet");
            } else {
                setCraffyStatus("Idle & Listening");
                splineRef.current.emitEvent("mouseUp", "Head");
            }
        } catch (err) { }
    };

    const handleChipClick = (key) => {
        const selected = quickAnswers[key];
        setActiveAnswer(selected);
        setTargetSpeech(selected.answer);
        setTabletContent({
            title: selected.tabletTitle,
            stat1: `RATE: ${selected.price}`,
            stat2: `TURNAROUND: ${selected.turnaround}`,
            status: selected.tabletCode,
        });
        playCraffySound("tablet");
        setChatStep("answered");
        trigger3DAction("pitching");
    };

    const handleBespokeClick = () => {
        setTargetSpeech("No problem! Type your specific property layout or planning question below. I'll bypass the automated script and send it straight to our senior planning strategists.");
        setTabletContent({
            title: "CUSTOM INQUIRY",
            stat1: "ROUTING: HUMAN TEAM",
            stat2: "PRIORITY: HIGH",
            status: "DIRECT CHANNEL OPEN",
        });
        playCraffySound("tablet");
        setChatStep("custom_query");
        trigger3DAction("thinking");
    };

    // 🚀 CLEAN & LEAN FORMSPREE SUBMISSION (NO FILLER FIELDS)
    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        if (!phone.trim() || !postcode.trim()) {
            setErrorMessage("Please enter both your site postcode and phone number.");
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");
        trigger3DAction("pitching");

        // Dynamic clean payload — Formspree receives ONLY what was provided
        const payload = {
            "Site Postcode": postcode.trim().toUpperCase(),
            "Phone Number": phone.trim(),
        };

        if (name.trim()) {
            payload["Client Name"] = name.trim();
        }

        if (chatStep === "custom_query" && customQuestion.trim()) {
            payload["Custom Question"] = customQuestion.trim();
        } else if (activeAnswer?.question) {
            payload["Selected FAQ Topic"] = activeAnswer.question;
        }

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData?.errors?.[0]?.message || "Formspree submission failed.");
            }

            // Trigger Google Ads Conversion
            if (typeof window !== "undefined" && typeof window.gtag === "function") {
                window.gtag("event", "conversion", { send_to: GOOGLE_ADS_ID });
            }

            setIsSubmitting(false);
            setTargetSpeech(`Fantastic! I've dispatched your details for site ${postcode.toUpperCase()} directly to our planning team.`);
            setTabletContent({
                title: "DISPATCH COMPLETE",
                stat1: `SITE: ${postcode.toUpperCase()}`,
                stat2: `PHONE: ${phone}`,
                status: "LEAD SENT TO FORMSPREE",
            });
            playCraffySound("tablet");
            setChatStep("submitted");
        } catch (error) {
            console.error("Formspree Submission Error:", error);
            setIsSubmitting(false);
            setErrorMessage(error.message || "Something went wrong. Please call us on 0203 633 5634.");
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
        @keyframes laserSweep {
          0% { top: 0%; opacity: 0.8; }
          50% { opacity: 0.3; }
          100% { top: 95%; opacity: 0.8; }
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          max-width: 1240px;
          margin: 0 auto;
          align-items: center;
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
          transform: translateX(4px);
        }
        .tablet-laser {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: #38bdf8;
          box-shadow: 0 0 10px #38bdf8;
          animation: laserSweep 2.5s linear infinite;
        }
        a[href*="spline.design"], div[style*="spline.design"] { display: none !important; }
      `}</style>

            {/* TOP HEADLINE */}
            <div style={styles.topHeader}>
                <div style={styles.topPill}>
                    <Sparkles size={13} color="#60a5fa" />
                    <span>BESPOKE ARCHITECTURAL DRAWINGS & PLANNING PERMISSION</span>
                </div>
                <h1 style={styles.mainTitle}>
                    Get Your Planning Drawings in <span style={{ color: '#3b82f6' }}>7 Days</span>
                </h1>
                <p style={styles.subTitle}>
                    Fixed fees from £950 + VAT across East London & Essex. Zero hidden costs.
                </p>
            </div>

            <div className="hero-grid">

                {/* 👷‍♂️ LEFT COLUMN: 3D CRAFFY + DYNAMIC TABLET HUD */}
                <div style={styles.splineCol}>
                    <div style={styles.craffyContainer} className="craffy-card">

                        <div style={styles.liveTag}>
                            <span style={styles.greenPulse} />
                            <span style={{ fontSize: '11px', color: '#93c5fd', fontWeight: 600 }}>
                                {craffyStatus}
                            </span>
                        </div>

                        <div style={styles.canvasFrame}>
                            {!splineLoaded && (
                                <div style={styles.loaderOverlay}>
                                    <div style={styles.avatarCircle}>👷‍♂️</div>
                                    <span style={{ fontSize: '13px', color: '#a1a1aa' }}>Initializing 3D Craffy Engine...</span>
                                </div>
                            )}

                            <Spline
                                scene={SPLINE_SCENE_URL}
                                onLoad={(app) => { splineRef.current = app; setSplineLoaded(true); }}
                                style={{ width: '100%', height: '100%' }}
                            />

                            {/* DYNAMIC DIGITAL TABLET HUD OVERLAY */}
                            <div style={styles.tabletHud}>
                                <div className="tablet-laser" />
                                <div style={styles.tabletHudHeader}>
                                    <ScanLine size={12} color="#38bdf8" />
                                    <span>{tabletContent.title}</span>
                                </div>
                                <div style={styles.tabletHudBody}>
                                    <div>{tabletContent.stat1}</div>
                                    <div>{tabletContent.stat2}</div>
                                </div>
                                <div style={styles.tabletHudStatus}>
                                    [{tabletContent.status}]
                                </div>
                            </div>

                        </div>

                        <div style={styles.canvasFooter}>
                            <MessageSquareText size={14} color="#60a5fa" />
                            <span>Craffy updates his tablet screen live based on your inputs</span>
                        </div>
                    </div>
                </div>

                {/* 💬 RIGHT COLUMN: STREAMING SPEECH BUBBLE */}
                <div style={styles.speechCol}>
                    <div style={styles.speechCard}>

                        <div style={styles.cardHeader}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={styles.craffyAvatar}>👷‍♂️</div>
                                <div>
                                    <h3 style={{ margin: 0, color: '#fff', fontSize: '17px', fontWeight: 700 }}>
                                        Craffy <span style={styles.aiTag}>AI PLANNING LEAD</span>
                                    </h3>
                                    <p style={{ margin: '3px 0 0 0', color: '#a1a1aa', fontSize: '12px' }}>
                                        East London & Essex Specialist
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '12px', fontWeight: 600 }}>
                                <ShieldCheck size={16} />
                                <span>Fixed Rate Guarantee</span>
                            </div>
                        </div>

                        {/* LIVE STREAMING SPEECH BUBBLE */}
                        <div style={styles.speechBubble}>
                            "{displayedSpeech}"
                            <span style={styles.typingCursor}>|</span>
                        </div>

                        {/* CONVERSATION FLOW STATES */}
                        {chatStep === "initial" && (
                            <div style={{ maxHeight: '380px', overflowY: 'auto', paddingRight: '4px' }}>
                                <p style={styles.sectionHeader}>Select a topic or ask a question:</p>

                                <button className="chip-button" onClick={() => handleChipClick("planning")} onMouseEnter={() => trigger3DAction("thinking")}>
                                    <span>💡 Planning Permission & Extensions</span>
                                    <ArrowRight size={14} color="#60a5fa" />
                                </button>

                                <button className="chip-button" onClick={() => handleChipClick("lofts")} onMouseEnter={() => trigger3DAction("thinking")}>
                                    <span>🏠 Loft Conversions & Dormer Rules</span>
                                    <ArrowRight size={14} color="#60a5fa" />
                                </button>

                                <button className="chip-button" onClick={() => handleChipClick("internal")} onMouseEnter={() => trigger3DAction("thinking")}>
                                    <span>🔨 Load-Bearing Walls & RSJ Steels</span>
                                    <ArrowRight size={14} color="#60a5fa" />
                                </button>

                                <button className="chip-button" onClick={() => handleChipClick("outbuildings")} onMouseEnter={() => trigger3DAction("thinking")}>
                                    <span>🌳 Garden Rooms & Outbuildings</span>
                                    <ArrowRight size={14} color="#60a5fa" />
                                </button>

                                <button className="chip-button" onClick={() => handleChipClick("pricing")} onMouseEnter={() => trigger3DAction("thinking")}>
                                    <span>💰 See Fixed Rates (£950 + VAT)</span>
                                    <ArrowRight size={14} color="#60a5fa" />
                                </button>

                                <div style={styles.divider}>
                                    <div style={styles.dividerLine}></div>
                                    <span style={styles.dividerText}>OR</span>
                                    <div style={styles.dividerLine}></div>
                                </div>

                                {/* BESPOKE QUESTION BUTTON */}
                                <button
                                    className="chip-button"
                                    onClick={handleBespokeClick}
                                    style={{ borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.08)' }}
                                >
                                    <span style={{ color: '#bae6fd', fontWeight: 600 }}>✍️ I have a specific / custom question...</span>
                                    <ArrowRight size={14} color="#38bdf8" />
                                </button>
                            </div>
                        )}

                        {chatStep === "answered" && (
                            <div style={{ marginTop: '16px' }}>
                                <div style={styles.priceRow}>
                                    <div>
                                        <span style={{ color: '#a1a1aa', fontSize: '11px', display: 'block', textTransform: 'uppercase' }}>Drawings Rate</span>
                                        <strong style={{ color: '#34d399', fontSize: '16px' }}>{activeAnswer.price}</strong>
                                    </div>
                                    <div>
                                        <span style={{ color: '#a1a1aa', fontSize: '11px', display: 'block', textTransform: 'uppercase' }}>Turnaround Time</span>
                                        <strong style={{ color: '#ffffff', fontSize: '16px' }}>{activeAnswer.turnaround}</strong>
                                    </div>
                                </div>

                                <button
                                    style={styles.primaryButton}
                                    onClick={() => {
                                        setChatStep("postcode");
                                        setTargetSpeech("Enter your site postcode and phone line below. I'll summarize your local council constraints.");
                                        trigger3DAction("typing");
                                    }}
                                >
                                    <span>Check Council Rules For My Postcode</span>
                                    <ArrowRight size={16} />
                                </button>

                                <button
                                    style={styles.backButton}
                                    onClick={() => {
                                        setChatStep("initial");
                                        setTargetSpeech("Welcome back! Select another query below, or ask a custom question.");
                                        setTabletContent({ title: "CRAFMAN CAD ENGINE v2.4", stat1: "FEES: £950 + VAT", stat2: "TIME: 7 DAYS", status: "READY FOR INPUT" });
                                    }}
                                >
                                    ← Ask another question
                                </button>
                            </div>
                        )}

                        {/* STANDARD LEAD CAPTURE FORM (POSTCODE ROUTE) */}
                        {chatStep === "postcode" && (
                            <form onSubmit={handleLeadSubmit} style={{ marginTop: '16px' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <label style={styles.inputLabel}>1. Your Name (Optional)</label>
                                    <input type="text" placeholder="e.g. Sarah Jenkins" value={name} onFocus={() => trigger3DAction("typing")} onChange={(e) => setName(e.target.value)} style={styles.textInput} />
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <label style={styles.inputLabel}>2. Project Site Postcode</label>
                                    <input type="text" required placeholder="e.g. RM11 3BL or IG11 7BT" value={postcode} onFocus={() => trigger3DAction("typing")} onChange={(e) => {
                                        setPostcode(e.target.value);
                                        if (e.target.value.length >= 3) setTabletContent({ title: "POSTCODE SEARCH", stat1: `POSTCODE: ${e.target.value.toUpperCase()}`, stat2: "COUNCIL: MATCHING...", status: "ANALYZING RULES" });
                                    }} style={styles.textInput} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={styles.inputLabel}>3. Mobile Phone Line</label>
                                    <input type="tel" required placeholder="07123 456789" value={phone} onFocus={() => trigger3DAction("typing")} onChange={(e) => setPhone(e.target.value)} style={styles.textInput} />
                                </div>
                                {errorMessage && <p style={{ color: '#f87171', fontSize: '12px', margin: '0 0 12px 0' }}>{errorMessage}</p>}
                                <button type="submit" disabled={isSubmitting} style={styles.primaryButton}>
                                    {isSubmitting ? <><Loader2 size={16} className="animate-spin" /><span>Sending Report...</span></> : <><span>Generate Free Planning Report</span><ArrowRight size={16} /></>}
                                </button>
                                <button type="button" style={styles.backButton} onClick={() => setChatStep("initial")}>← Back to topics</button>
                            </form>
                        )}

                        {/* CUSTOM / BESPOKE QUESTION FORM */}
                        {chatStep === "custom_query" && (
                            <form onSubmit={handleLeadSubmit} style={{ marginTop: '16px' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <label style={styles.inputLabel}>What is your specific question?</label>
                                    <textarea
                                        required
                                        placeholder="e.g. We have a Thames Water pipe near the boundary, can we still do a 4m rear extension?"
                                        value={customQuestion}
                                        onFocus={() => trigger3DAction("typing")}
                                        onChange={(e) => setCustomQuestion(e.target.value)}
                                        style={{ ...styles.textInput, height: '80px', resize: 'vertical' }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                    <div>
                                        <label style={styles.inputLabel}>Site Postcode</label>
                                        <input type="text" required placeholder="Postcode" value={postcode} onFocus={() => trigger3DAction("typing")} onChange={(e) => setPostcode(e.target.value)} style={styles.textInput} />
                                    </div>
                                    <div>
                                        <label style={styles.inputLabel}>Phone Number</label>
                                        <input type="tel" required placeholder="07123 456789" value={phone} onFocus={() => trigger3DAction("typing")} onChange={(e) => setPhone(e.target.value)} style={styles.textInput} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={styles.inputLabel}>Your Name (Optional)</label>
                                    <input type="text" placeholder="Name" value={name} onFocus={() => trigger3DAction("typing")} onChange={(e) => setName(e.target.value)} style={styles.textInput} />
                                </div>
                                {errorMessage && <p style={{ color: '#f87171', fontSize: '12px', margin: '0 0 12px 0' }}>{errorMessage}</p>}
                                <button type="submit" disabled={isSubmitting} style={{ ...styles.primaryButton, backgroundColor: '#0284c7' }}>
                                    {isSubmitting ? <><Loader2 size={16} className="animate-spin" /><span>Sending to Team...</span></> : <><span>Send to Architectural Team</span><ArrowRight size={16} /></>}
                                </button>
                                <button type="button" style={styles.backButton} onClick={() => setChatStep("initial")}>← Back to topics</button>
                            </form>
                        )}

                        {chatStep === "submitted" && (
                            <div style={{ textAlign: 'center', padding: '16px 0 0 0' }}>
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
                                    <a href="tel:02036335634" style={styles.callLink}>
                                        <Phone size={14} color="#60a5fa" />
                                        <span>Call Direct: 0203 633 5634</span>
                                    </a>
                                    <a href={`https://wa.me/447858815820?text=Hi%20Crafman,%20I%20just%20submitted%20a%20request%20for%20postcode%20${encodeURIComponent(postcode)}.`} target="_blank" rel="noopener noreferrer" style={styles.whatsAppBtn}>
                                        <span>WhatsApp Us</span>
                                    </a>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>

            {/* TRUST BAR */}
            <div style={styles.trustBar}>
                <div style={styles.trustItem}><Check size={16} color="#3b82f6" /><span>7-Working-Day Turnaround</span></div>
                <div style={styles.trustItem}><Check size={16} color="#3b82f6" /><span>Fixed Rates from £950 + VAT</span></div>
                <div style={styles.trustItem}><Check size={16} color="#3b82f6" /><span>100% Council Sign-Off Track Record</span></div>
                <div style={styles.trustItem}><Clock size={16} color="#3b82f6" /><span>Unlimited Revisions Included</span></div>
            </div>
        </div>
    );
}

const styles = {
    heroWrapper: { backgroundColor: '#09090b', color: '#ffffff', minHeight: '100vh', padding: '40px 24px 60px 24px', boxSizing: 'border-box', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'relative', overflow: 'hidden' },
    bgGlow: { position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(9,9,11,0) 70%)', pointerEvents: 'none' },
    topHeader: { textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px auto', position: 'relative', zIndex: 10 },
    topPill: { display: 'inline-flex', items: 'center', gap: '8px', backgroundColor: 'rgba(30, 58, 138, 0.35)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#93c5fd', padding: '6px 16px', borderRadius: '30px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px' },
    mainTitle: { fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: '1.2', margin: '0 0 12px 0', color: '#ffffff' },
    subTitle: { fontSize: '15px', color: '#a1a1aa', margin: 0 },
    splineCol: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    craffyContainer: { width: '100%', backgroundColor: '#121215', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '28px', padding: '16px', boxSizing: 'border-box', position: 'relative' },
    liveTag: { position: 'absolute', top: '28px', left: '28px', zIndex: 20, display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(9, 9, 11, 0.85)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '6px 14px', borderRadius: '20px', backdropFilter: 'blur(8px)' },
    greenPulse: { width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' },
    canvasFrame: { width: '100%', height: '460px', borderRadius: '20px', overflow: 'hidden', position: 'relative', backgroundColor: '#09090b' },
    tabletHud: { position: 'absolute', bottom: '20px', right: '20px', width: '210px', backgroundColor: 'rgba(9, 9, 11, 0.92)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '12px', padding: '10px 12px', boxShadow: '0 0 20px rgba(56, 189, 248, 0.2)', zIndex: 25, backdropFilter: 'blur(10px)', overflow: 'hidden' },
    tabletHudHeader: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '9.5px', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.5px', borderBottom: '1px solid rgba(56, 189, 248, 0.2)', paddingBottom: '4px', marginBottom: '6px' },
    tabletHudBody: { fontSize: '10px', fontWeight: 700, color: '#f4f4f5', lineHeight: '1.4' },
    tabletHudStatus: { fontSize: '8.5px', color: '#34d399', marginTop: '4px', fontWeight: 600, letterSpacing: '0.5px' },
    canvasFooter: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px', fontSize: '12px', color: '#a1a1aa' },
    loaderOverlay: { position: 'absolute', inset: 0, backgroundColor: '#09090b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' },
    avatarCircle: { width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(37, 99, 235, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' },
    speechCol: { width: '100%' },
    speechCard: { backgroundColor: '#121215', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '28px', padding: '28px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)' },
    cardHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' },
    craffyAvatar: { width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(37, 99, 235, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
    aiTag: { fontSize: '10px', backgroundColor: 'rgba(37, 99, 235, 0.3)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '2px 7px', borderRadius: '4px', marginLeft: '6px', fontWeight: 700 },
    speechBubble: { backgroundColor: '#18181b', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '18px', padding: '20px', color: '#f4f4f5', fontSize: '14.5px', lineHeight: '1.6', minHeight: '80px', position: 'relative' },
    typingCursor: { color: '#38bdf8', fontWeight: 'bold', marginLeft: '2px' },
    sectionHeader: { fontSize: '11px', color: '#a1a1aa', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', margin: '16px 0 10px 0' },
    divider: { display: 'flex', alignItems: 'center', margin: '12px 0' },
    dividerLine: { flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)' },
    dividerText: { margin: '0 12px', fontSize: '11px', color: '#71717a', fontWeight: 700 },
    priceRow: { display: 'flex', gap: '32px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#18181b', padding: '14px', borderRadius: '14px' },
    primaryButton: { width: '100%', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '16px 20px', borderRadius: '14px', fontWeight: 700, fontSize: '14.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justify: 'center', gap: '10px', marginTop: '16px' },
    backButton: { background: 'none', border: 'none', color: '#a1a1aa', fontSize: '12px', cursor: 'pointer', width: '100%', marginTop: '12px' },
    inputLabel: { display: 'block', fontSize: '12px', color: '#a1a1aa', marginBottom: '6px' },
    textInput: { width: '100%', backgroundColor: '#18181b', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', padding: '14px', borderRadius: '14px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' },
    callLink: { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#18181b', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', textDecoration: 'none', padding: '12px 18px', borderRadius: '14px', fontSize: '12.5px', fontWeight: 600 },
    whatsAppBtn: { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', textDecoration: 'none', padding: '12px 18px', borderRadius: '14px', fontSize: '12.5px', fontWeight: 700 },
    trustBar: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', justify: 'center', gap: '24px sm:36px', maxWidth: '1240px', margin: '50px auto 0 auto', paddingTop: '30px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative', zIndex: 10 },
    trustItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#e4e4e7', fontWeight: 500 },
};