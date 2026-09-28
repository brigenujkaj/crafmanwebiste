import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, CheckCircle2, Phone, ArrowLeft, ScanLine, Clock, ShieldCheck, MessageSquare, Check } from "lucide-react";

const GOOGLE_ADS_CONVERSION_ID = "AW-18466429796";

export default function CraffyThankYouPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const leadData = location.state || {};

    useEffect(() => {
        // 🎯 Fire Native Google Ads Conversion Tag on Thank You Page Load
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("event", "conversion", {
                send_to: GOOGLE_ADS_CONVERSION_ID,
            });
        }

        // 🎯 Track DataLayer Event for GA4
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "craffy_thank_you_page_view",
                source: leadData.source || "Craffy AI Assistant",
                postcode: leadData.postcode || "N/A",
            });
        }
    }, [leadData]);

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.bgGlow} />

            <style>{`
        @keyframes laserSweep {
          0% { top: 0%; opacity: 0.8; }
          50% { opacity: 0.3; }
          100% { top: 95%; opacity: 0.8; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 25px rgba(52, 211, 153, 0.2); }
          50% { box-shadow: 0 0 45px rgba(52, 211, 153, 0.4); }
        }
        .hud-card {
          animation: pulseGlow 4s ease-in-out infinite;
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
      `}</style>

            <div style={styles.container}>

                {/* CRAFFY STATUS HEADER */}
                <div style={styles.headerBox}>
                    <div style={styles.topPill}>
                        <Sparkles size={13} color="#60a5fa" />
                        <span>CRAFMAN AI PLANNING REPORT</span>
                    </div>

                    <div style={styles.successIcon}>
                        <CheckCircle2 size={36} color="#34d399" />
                    </div>

                    <h1 style={styles.mainTitle}>
                        Craffy is Processing Your Site Report!
                    </h1>
                    <p style={styles.subTitle}>
                        Thank you{leadData.name ? `, ${leadData.name}` : ""}. Craffy has received your property details and dispatched your query to our London & Essex strategy team.
                    </p>
                </div>

                {/* DYNAMIC CRAFFY ANALYSIS HUD DISPLAY */}
                <div style={styles.hudCard} className="hud-card">
                    <div className="tablet-laser" />

                    <div style={styles.hudHeader}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ScanLine size={14} color="#38bdf8" />
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8', letterSpacing: '1px' }}>
                                CRAFMAN CAD ENGINE // DISPATCH SUMMARY
                            </span>
                        </div>
                        <span style={styles.livePulseTag}>ACTIVE REVIEW</span>
                    </div>

                    <div style={styles.hudGrid}>
                        <div style={styles.hudItem}>
                            <span style={styles.hudLabel}>PROJECT SITE</span>
                            <strong style={{ color: '#ffffff', fontSize: '15px' }}>{leadData.postcode || "LONDON / ESSEX"}</strong>
                        </div>

                        <div style={styles.hudItem}>
                            <span style={styles.hudLabel}>PHONE LINE</span>
                            <strong style={{ color: '#ffffff', fontSize: '15px' }}>{leadData.phone || "DISPATCHED"}</strong>
                        </div>

                        <div style={styles.hudItem}>
                            <span style={styles.hudLabel}>DRAWINGS RATE</span>
                            <strong style={{ color: '#34d399', fontSize: '15px' }}>FIXED £950 + VAT</strong>
                        </div>

                        <div style={styles.hudItem}>
                            <span style={styles.hudLabel}>TURNAROUND</span>
                            <strong style={{ color: '#60a5fa', fontSize: '15px' }}>7 WORKING DAYS</strong>
                        </div>
                    </div>

                    <div style={styles.hudFooter}>
                        <span>Status: Cross-referencing council Permitted Development and Building Control constraints.</span>
                    </div>
                </div>

                {/* NEXT STEPS TIMELINE */}
                <div style={styles.timelineCard}>
                    <h3 style={styles.timelineTitle}>What happens next?</h3>

                    <div style={styles.timelineItem}>
                        <div style={styles.stepBadge}>1</div>
                        <div>
                            <h4 style={styles.stepTitle}>Council Planning History Check</h4>
                            <p style={styles.stepDesc}>Craffy analyzes local council history, permitted development limits, and sewer/boundary records for your site.</p>
                        </div>
                    </div>

                    <div style={styles.timelineItem}>
                        <div style={styles.stepBadge}>2</div>
                        <div>
                            <h4 style={styles.stepTitle}>Instant WhatsApp / SMS Dispatch</h4>
                            <p style={styles.stepDesc}>Our senior planning strategist will text/WhatsApp your custom property report within 15 minutes.</p>
                        </div>
                    </div>

                    <div style={styles.timelineItem}>
                        <div style={styles.stepBadge}>3</div>
                        <div>
                            <h4 style={styles.stepTitle}>Fixed Price Lock (£950 + VAT)</h4>
                            <p style={styles.stepDesc}>Your fixed drawing rate and guaranteed 7-day turnaround slot are reserved with zero obligation.</p>
                        </div>
                    </div>
                </div>

                {/* URGENT CONTACT ACTIONS */}
                <div style={styles.actionBox}>
                    <p style={{ fontSize: '12px', color: '#a1a1aa', margin: '0 0 12px 0', textAlign: 'center' }}>
                        Need to speak with a planning strategist immediately?
                    </p>

                    <div style={styles.buttonRow}>
                        <a href="tel:02081914122" style={styles.callButton}>
                            <Phone size={16} />
                            <span>Call Direct: 020 8191 4122</span>
                        </a>

                        <a
                            href={`https://wa.me/447858815820?text=Hi%20Crafman,%20I%20just%20submitted%20a%20report%20request%20with%20Craffy%20for%20site%20${encodeURIComponent(leadData.postcode || '')}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.whatsAppButton}
                        >
                            <MessageSquare size={16} />
                            <span>Chat via WhatsApp</span>
                        </a>
                    </div>

                    <button onClick={() => navigate("/")} style={styles.backButton}>
                        <ArrowLeft size={14} />
                        <span>Return to Homepage</span>
                    </button>
                </div>

                {/* TRUST BAR FOOTER */}
                <div style={styles.trustBar}>
                    <div style={styles.trustItem}><Check size={14} color="#3b82f6" /><span>7-Day Turnaround</span></div>
                    <div style={styles.trustItem}><ShieldCheck size={14} color="#3b82f6" /><span>100% Council Sign-Off</span></div>
                    <div style={styles.trustItem}><Clock size={14} color="#3b82f6" /><span>Unlimited Revisions</span></div>
                </div>

            </div>
        </div>
    );
}

const styles = {
    pageWrapper: {
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
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '700px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, rgba(9,9,11,0) 70%)',
        pointerEvents: 'none',
    },
    container: {
        maxWidth: '680px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
    },
    headerBox: {
        textAlign: 'center',
        marginBottom: '28px',
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
        marginBottom: '20px',
    },
    successIcon: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'rgba(52, 211, 153, 0.15)',
        border: '1px solid rgba(52, 211, 153, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px auto',
    },
    mainTitle: {
        fontSize: 'clamp(24px, 3.5vw, 34px)',
        fontWeight: 800,
        lineHeight: '1.25',
        margin: '0 0 12px 0',
        color: '#ffffff',
    },
    subTitle: {
        fontSize: '14.5px',
        color: '#a1a1aa',
        lineHeight: '1.6',
        margin: 0,
    },
    hudCard: {
        backgroundColor: '#121215',
        border: '1px solid rgba(56, 189, 248, 0.4)',
        borderRadius: '24px',
        padding: '20px 24px',
        marginBottom: '28px',
        position: 'relative',
        overflow: 'hidden',
    },
    hudHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '12px',
        marginBottom: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    },
    livePulseTag: {
        fontSize: '9.5px',
        color: '#34d399',
        backgroundColor: 'rgba(52, 211, 153, 0.15)',
        border: '1px solid rgba(52, 211, 153, 0.3)',
        padding: '3px 8px',
        borderRadius: '6px',
        fontWeight: 800,
        letterSpacing: '0.5px',
    },
    hudGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '16px',
    },
    hudItem: {
        backgroundColor: '#18181b',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '12px 14px',
        borderRadius: '14px',
    },
    hudLabel: {
        display: 'block',
        fontSize: '10px',
        fontWeight: 800,
        color: '#71717a',
        letterSpacing: '0.5px',
        marginBottom: '4px',
    },
    hudFooter: {
        fontSize: '11.5px',
        color: '#93c5fd',
        backgroundColor: 'rgba(30, 58, 138, 0.25)',
        padding: '10px 14px',
        borderRadius: '12px',
        border: '1px solid rgba(59, 130, 246, 0.2)',
    },
    timelineCard: {
        backgroundColor: '#121215',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '28px',
    },
    timelineTitle: {
        fontSize: '16px',
        fontWeight: 700,
        color: '#ffffff',
        margin: '0 0 18px 0',
    },
    timelineItem: {
        display: 'flex',
        gap: '14px',
        marginBottom: '16px',
    },
    stepBadge: {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        fontSize: '12px',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    stepTitle: {
        fontSize: '14px',
        fontWeight: 700,
        color: '#ffffff',
        margin: '0 0 4px 0',
    },
    stepDesc: {
        fontSize: '12.5px',
        color: '#a1a1aa',
        lineHeight: '1.5',
        margin: 0,
    },
    actionBox: {
        marginBottom: '32px',
    },
    buttonRow: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '16px',
    },
    callButton: {
        flex: 1,
        minWidth: '220px',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        textDecoration: 'none',
        padding: '14px 20px',
        borderRadius: '14px',
        fontSize: '13.5px',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)',
    },
    whatsAppButton: {
        flex: 1,
        minWidth: '220px',
        backgroundColor: '#25D366',
        color: '#ffffff',
        textDecoration: 'none',
        padding: '14px 20px',
        borderRadius: '14px',
        fontSize: '13.5px',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
    },
    backButton: {
        background: 'none',
        border: 'none',
        color: '#a1a1aa',
        fontSize: '12.5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        margin: '0 auto',
    },
    trustBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    },
    trustItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        color: '#a1a1aa',
    },
};