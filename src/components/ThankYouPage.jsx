import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 🎯 GOOGLE ADS CONVERSION CONFIG
const GOOGLE_ADS_CONVERSION_SEND_TO = "AW-16534080284/P2BQCJ-81cUcEJyWiMw9";

export default function ThankYouPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const summary = location.state; // Receives data passed during navigate()

    useEffect(() => {
        // 🔥 Direct Pageview Conversion Trigger
        if (typeof window.gtag === "function") {
            window.gtag("event", "conversion", {
                send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
            });
        }
    }, []);

    return (
        <div style={{ background: "#fcfbf8", minHeight: "80vh", padding: "64px 20px", display: "grid", placeItems: "center" }}>
            <div
                style={{
                    maxWidth: "600px",
                    width: "100%",
                    background: "#fff",
                    borderRadius: "24px",
                    padding: "36px",
                    border: "1px solid #e7e5e4",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
                    boxSizing: "border-box",
                }}
            >
                {/* Header Badge */}
                <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "24px" }}>
                    <div
                        style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "50%",
                            background: "#166534",
                            color: "#fff",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "28px",
                            flexShrink: 0,
                        }}
                    >
                        ✓
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: "26px", color: "#1f1f1f", fontWeight: "900" }}>
                            {summary?.meetingType === "home_visit" ? "Home Visit Arranged!" : "Strategy Session Scheduled!"}
                        </h1>
                        <p style={{ margin: "4px 0 0", color: "#57534e", fontSize: "15px" }}>
                            Your enquiry has been received by our planning team.
                        </p>
                    </div>
                </div>

                {/* Booking Details Card */}
                {summary && (
                    <div style={{ background: "#fafaf9", padding: "20px", borderRadius: "16px", border: "1px solid #f5f2eb", marginBottom: "24px" }}>
                        <h3 style={{ margin: "0 0 12px", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", color: "#A67C00" }}>
                            Consultation Details
                        </h3>
                        <div style={{ display: "grid", gap: "10px", fontSize: "14px", color: "#1c1917" }}>
                            <div><strong>Client:</strong> {summary.name}</div>
                            <div><strong>Phone Line:</strong> {summary.phone}</div>
                            <div>
                                <strong>Type:</strong> {summary.meetingType === "home_visit" ? "🏡 On-Site Property Home Visit" : "📞 Phone Consultation Call"}
                            </div>
                            {summary.displayDate && (
                                <div>
                                    <strong>Scheduled:</strong> {summary.displayDate} ({summary.callbackTimeSlot})
                                </div>
                            )}
                            {summary.packageInterest && (
                                <div><strong>Package Interest:</strong> {summary.packageInterest}</div>
                            )}
                        </div>
                    </div>
                )}

                {/* What Happens Next */}
                <div style={{ borderTop: "1px solid #e7e5e4", paddingTop: "20px", marginBottom: "28px" }}>
                    <h4 style={{ margin: "0 0 8px", fontSize: "16px", color: "#1f1f1f" }}>What happens next?</h4>
                    <p style={{ margin: 0, fontSize: "14px", color: "#57534e", lineHeight: "1.5" }}>
                        A practical planning strategist will review your site area details and reach out at your requested time. No pushy sales pitches—just straight layout guidance.
                    </p>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "grid", gap: "12px" }}>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        style={{
                            background: "#1c1917",
                            color: "#fff",
                            padding: "14px 24px",
                            borderRadius: "14px",
                            border: "none",
                            fontSize: "15px",
                            fontWeight: "700",
                            cursor: "pointer",
                            width: "100%",
                        }}
                    >
                        Return to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
}