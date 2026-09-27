import React, { useState, useRef } from "react";
import Spline from "@splinetool/react-spline";
import { Sparkles, ArrowRight, CheckCircle2, Phone, ShieldCheck, Clock, Check, MessageSquareText } from "lucide-react";

export default function CraffyHeroSection() {
    const SPLINE_SCENE_URL = "https://prod.spline.design/blo2FccZ2Q7hEkIq/scene.splinecode";

    const splineRef = useRef(null);
    const [splineLoaded, setSplineLoaded] = useState(false);
    const [craffyStatus, setCraffyStatus] = useState("Idle & Listening");
    const [chatStep, setChatStep] = useState("initial"); // "initial" | "answered" | "postcode" | "submitted"
    const [postcode, setPostcode] = useState("");
    const [phone, setPhone] = useState("");

    const quickAnswers = {
        planning: {
            question: "Do I need planning permission?",
            answer: "Most single-storey rear extensions up to 3m (or 6m via Prior Approval) fall under Permitted Development—no full planning permission needed! However, builders legally require Building Regulations drawings for structural sign-off.",
            price: "Fixed £950 + VAT",
            turnaround: "7 Working Days",
        },
        size: {
            question: "How large can I build in London/Essex?",
            answer: "Under Permitted Development, rear extensions can reach up to 3m for terraced/semi-detached homes (4m for detached). Loft conversions can add up to 40-50 cubic metres of extra space.",
            price: "Fixed Rates Available",
            turnaround: "7 Working Days",
        },
        pricing: {
            question: "What are your fixed rates?",
            answer: "Our planning drawings start at a guaranteed fixed rate of £950 + VAT with zero hidden architect fees. Unlimited drawing revisions until council sign-off.",
            price: "From £950 + VAT",
            turnaround: "7 Working Days",
        },
    };

    const [activeAnswer, setActiveAnswer] = useState(quickAnswers.planning);

    // Trigger 3D movements in Spline on user interaction
    const trigger3DAction = (actionType) => {
        if (!splineRef.current) return;

        try {
            if (actionType === "thinking") {
                setCraffyStatus("Analyzing Planning Rules...");
                splineRef.current.emitEvent("mouseHover", "Head");
            } else if (actionType === "pitching") {
                setCraffyStatus("Calculating Fixed Quote...");
                splineRef.current.emitEvent("mouseDown", "Tablet");
            } else if (actionType === "typing") {
                setCraffyStatus("Checking Council History...");
                splineRef.current.emitEvent("mouseHover", "Tablet");
            } else {
                setCraffyStatus("Idle & Listening");
                splineRef.current.emitEvent("mouseUp", "Head");
            }
        } catch (err) {
            // Graceful fallback if event names differ in Spline scene
        }
    };

    const handleSplineLoad = (splineApp) => {
        splineRef.current = splineApp;
        setSplineLoaded(true);
    };

    const handleChipClick = (key) => {
        setActiveAnswer(quickAnswers[key]);
        setChatStep("answered");
        trigger3DAction("pitching");
    };

    const handleLeadSubmit = (e) => {
        e.preventDefault();
        if (!phone) return;
        trigger3DAction("pitching");
        setChatStep("submitted");
    };

    return (
        <div style={styles.heroWrapper}>
            {/* Dynamic Background Blueprint Grid */}
            <div style={styles.bgGlow} />

            <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 25px rgba(37, 99, 235, 0.25); }
          50% { box-shadow: 0 0 45px rgba(59, 130, 246, 0.45); }
        }
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
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
          .hero-grid {
            grid-template-columns: 5.5fr 6.5fr;
          }
        }
        .chip-button {
          background: #18181b;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #e4e4e7;
          padding: 14px 18px;
          border-radius: 14px;
          cursor: pointer;
          font-size: 13.5px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 10px;
        }
        .chip-button:hover {
          background: #27272a;
          border-color: #3b82f6;
          color: #ffffff;
          transform: translateX(4px);
        }
        .craffy-card {
          animation: subtleFloat 5s ease-in-out infinite, pulseGlow 4s ease-in-out infinite;
        }
        a[href*="spline.design"], div[style*="spline.design"] {
          display: none !important;
        }
      `}</style>

            {/* TOP HERO HEADLINE & BADGE */}
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

            {/* MAIN 2-COLUMN HERO GRID */}
            <div className="hero-grid">

                {/* 👷‍♂️ LEFT COLUMN: 3D CRAFFY CHARACTER (520px TALL CANVAS) */}
                <div style={styles.splineCol}>
                    <div style={styles.craffyContainer} className="craffy-card">

                        {/* Live Action Tag */}
                        <div style={styles.liveTag}>
                            <span style={styles.greenPulse} />
                            <span style={{ fontSize: '11px', color: '#93c5fd', fontWeight: 600 }}>
                                {craffyStatus}
                            </span>
                        </div>

                        {/* 3D Canvas Box */}
                        <div style={styles.canvasFrame}>
                            {!splineLoaded && (
                                <div style={styles.loaderOverlay}>
                                    <div style={styles.avatarCircle}>👷‍♂️</div>
                                    <span style={{ fontSize: '13px', color: '#a1a1aa' }}>Initializing 3D Craffy...</span>
                                </div>
                            )}
                            <Spline
                                scene={SPLINE_SCENE_URL}
                                onLoad={handleSplineLoad}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>

                        {/* Pointer note under Craffy */}
                        <div style={styles.canvasFooter}>
                            <MessageSquareText size={14} color="#60a5fa" />
                            <span>Hover or tap options on the right to interact with Craffy live</span>
                        </div>
                    </div>
                </div>

                {/* 💬 RIGHT COLUMN: SPEECH & ACTION CARD */}
                <div style={styles.speechCol}>
                    <div style={styles.speechCard}>

                        {/* Header Identity */}
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

                        {/* CONVERSATION FLOW STATES */}
                        {chatStep === "initial" && (
                            <div>
                                <div style={styles.speechBubble}>
                                    "Welcome! Are you planning an extension or loft conversion? Select a query below to see council rules and fixed pricing instantly."
                                </div>

                                <p style={styles.sectionHeader}>Select a quick query:</p>

                                <button
                                    className="chip-button"
                                    onClick={() => handleChipClick("planning")}
                                    onMouseEnter={() => trigger3DAction("thinking")}
                                    onMouseLeave={() => trigger3DAction("idle")}
                                >
                                    <span>💡 Do I need planning permission for my extension?</span>
                                    <ArrowRight size={15} color="#60a5fa" />
                                </button>

                                <button
                                    className="chip-button"
                                    onClick={() => handleChipClick("size")}
                                    onMouseEnter={() => trigger3DAction("thinking")}
                                    onMouseLeave={() => trigger3DAction("idle")}
                                >
                                    <span>📏 Maximum allowed build sizes in London/Essex?</span>
                                    <ArrowRight size={15} color="#60a5fa" />
                                </button>

                                <button
                                    className="chip-button"
                                    onClick={() => handleChipClick("pricing")}
                                    onMouseEnter={() => trigger3DAction("thinking")}
                                    onMouseLeave={() => trigger3DAction("idle")}
                                >
                                    <span>💰 See fixed rates for planning & building control drawings</span>
                                    <ArrowRight size={15} color="#60a5fa" />
                                </button>
                            </div>
                        )}

                        {chatStep === "answered" && (
                            <div>
                                <div style={styles.userAskBadge}>
                                    Selected Query: "{activeAnswer.question}"
                                </div>

                                <div style={styles.speechBubble}>
                                    <p style={{ margin: '0 0 14px 0' }}>{activeAnswer.answer}</p>
                                    <div style={styles.priceRow}>
                                        <div>
                                            <span style={{ color: '#a1a1aa', fontSize: '11px', display: 'block', textTransform: 'uppercase' }}>Drawings Rate</span>
                                            <strong style={{ color: '#34d399', fontSize: '16px' }}>{activeAnswer.price}</strong>
                                        </div>
                                        <div>
                                            <span style={{ color: '#a1a1aa', fontSize: '11px', display: 'block', textTransform: 'uppercase' }}>Guaranteed Turnaround</span>
                                            <strong style={{ color: '#ffffff', fontSize: '16px' }}>{activeAnswer.turnaround}</strong>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    style={styles.primaryButton}
                                    onClick={() => { setChatStep("postcode"); trigger3DAction("typing"); }}
                                >
                                    <span>Check Council Rules For My Postcode</span>
                                    <ArrowRight size={16} />
                                </button>

                                <button style={styles.backButton} onClick={() => { setChatStep("initial"); trigger3DAction("idle"); }}>
                                    ← Ask another question
                                </button>
                            </div>
                        )}

                        {chatStep === "postcode" && (
                            <div>
                                <div style={styles.speechBubble}>
                                    "Enter your postcode and phone number. I will pull local planning history for your council and send your free project report + price lock summary."
                                </div>

                                <form onSubmit={handleLeadSubmit} style={{ marginTop: '16px' }}>
                                    <div style={{ marginBottom: '14px' }}>
                                        <label style={styles.inputLabel}>1. Project Postcode (East London / Essex)</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. RM11 3BL or IG11 7BT"
                                            value={postcode}
                                            onFocus={() => trigger3DAction("typing")}
                                            onChange={(e) => setPostcode(e.target.value)}
                                            style={styles.textInput}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '18px' }}>
                                        <label style={styles.inputLabel}>2. Mobile / Phone Number (For WhatsApp/SMS report)</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="07123 456789"
                                            value={phone}
                                            onFocus={() => trigger3DAction("typing")}
                                            onChange={(e) => setPhone(e.target.value)}
                                            style={styles.textInput}
                                        />
                                    </div>

                                    <button type="submit" style={styles.primaryButton}>
                                        <span>Generate Free Planning Report</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </form>
                            </div>
                        )}

                        {chatStep === "submitted" && (
                            <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                <div style={styles.successIcon}>
                                    <CheckCircle2 size={32} color="#34d399" />
                                </div>
                                <h4 style={{ color: '#ffffff', fontSize: '22px', margin: '14px 0 8px 0' }}>
                                    Report Requested!
                                </h4>
                                <p style={{ color: '#a1a1aa', fontSize: '14px', lineHeight: '1.6', margin: 0, maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                                    Craffy is analyzing local council rules for <strong>{postcode}</strong>. Your report and price summary will arrive via WhatsApp/SMS shortly.
                                </p>
                                <div style={{ marginTop: '20px' }}>
                                    <a href="tel:02036335634" style={styles.callLink}>
                                        <Phone size={15} color="#60a5fa" />
                                        <span>Need immediate answers? Call 020 3633 5634</span>
                                    </a>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>

            {/* BOTTOM TRUST BADGES TO FILL HERO DEAD SPACE */}
            <div style={styles.trustBar}>
                <div style={styles.trustItem}>
                    <Check size={16} color="#3b82f6" />
                    <span>7-Working-Day Turnaround</span>
                </div>
                <div style={styles.trustItem}>
                    <Check size={16} color="#3b82f6" />
                    <span>Fixed Rates from £950 + VAT</span>
                </div>
                <div style={styles.trustItem}>
                    <Check size={16} color="#3b82f6" />
                    <span>100% Council Sign-Off Track Record</span>
                </div>
                <div style={styles.trustItem}>
                    <Clock size={16} color="#3b82f6" />
                    <span>Unlimited Revisions Included</span>
                </div>
            </div>
        </div>
    );
}

const styles = {
    heroWrapper: {
        backgroundColor: '#09090b',
        color: '#ffffff',
        minHeight: '100vh',
        padding: '40px 24px 60px 24px',
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
        maxWidth: '800px',
        margin: '0 auto 40px auto',
        position: 'relative',
        zIndex: 10,
    },
    topPill: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(30, 58, 138, 0.35)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        color: '#93c5fd',
        padding: '6px 16px',
        borderRadius: '30px',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '1px',
        marginBottom: '16px',
    },
    mainTitle: {
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: 800,
        lineHeight: '1.2',
        margin: '0 0 12px 0',
        color: '#ffffff',
    },
    subTitle: {
        fontSize: '15px',
        color: '#a1a1aa',
        margin: 0,
    },
    splineCol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    craffyContainer: {
        width: '100%',
        backgroundColor: '#121215',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '28px',
        padding: '16px',
        boxSizing: 'border-box',
        position: 'relative',
    },
    liveTag: {
        position: 'absolute',
        top: '28px',
        left: '28px',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(9, 9, 11, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '6px 14px',
        borderRadius: '20px',
        backdropFilter: 'blur(8px)',
    },
    greenPulse: {
        width: '8px',
        height: '8px',
        backgroundColor: '#10b981',
        borderRadius: '50%',
        boxShadow: '0 0 8px #10b981',
    },
    canvasFrame: {
        width: '100%',
        height: '460px',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#09090b',
    },
    canvasFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '12px',
        fontSize: '12px',
        color: '#a1a1aa',
    },
    loaderOverlay: {
        position: 'absolute',
        inset: 0,
        backgroundColor: '#09090b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
    },
    avatarCircle: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
    },
    speechCol: {
        width: '100%',
    },
    speechCard: {
        backgroundColor: '#121215',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '28px',
        padding: '28px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '20px',
        marginBottom: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    },
    craffyAvatar: {
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
    },
    aiTag: {
        fontSize: '10px',
        backgroundColor: 'rgba(37, 99, 235, 0.3)',
        color: '#60a5fa',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        padding: '2px 7px',
        borderRadius: '4px',
        marginLeft: '6px',
        fontWeight: 700,
    },
    speechBubble: {
        backgroundColor: '#18181b',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '18px',
        padding: '20px',
        color: '#f4f4f5',
        fontSize: '14.5px',
        lineHeight: '1.6',
    },
    sectionHeader: {
        fontSize: '11px',
        color: '#a1a1aa',
        fontWeight: 700,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        margin: '20px 0 10px 0',
    },
    userAskBadge: {
        backgroundColor: 'rgba(30, 58, 138, 0.3)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        color: '#93c5fd',
        fontSize: '12px',
        padding: '10px 14px',
        borderRadius: '12px',
        marginBottom: '14px',
    },
    priceRow: {
        display: 'flex',
        gap: '32px',
        paddingTop: '14px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        border: 'none',
        padding: '16px 20px',
        borderRadius: '14px',
        fontWeight: 700,
        fontSize: '14.5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '16px',
        transition: 'background 0.2s ease',
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
    inputLabel: {
        display: 'block',
        fontSize: '12px',
        color: '#a1a1aa',
        marginBottom: '6px',
    },
    textInput: {
        width: '100%',
        backgroundColor: '#18181b',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#ffffff',
        padding: '14px',
        borderRadius: '14px',
        fontSize: '14px',
        boxSizing: 'border-box',
        outline: 'none',
    },
    successIcon: {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: 'rgba(52, 211, 153, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
    },
    callLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#18181b',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#ffffff',
        textDecoration: 'none',
        padding: '12px 20px',
        borderRadius: '14px',
        fontSize: '13px',
        fontWeight: 600,
    },
    trustBar: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px sm:36px',
        maxWidth: '1240px',
        margin: '50px auto 0 auto',
        paddingTop: '30px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        zIndex: 10,
    },
    trustItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        color: '#e4e4e7',
        fontWeight: 500,
    },
};