import { useEffect, useState } from "react";
import { captureMarketingAttribution } from "../lib/crafmanLeadIntake.js";

const STORAGE_KEY = "crafman_optional_cookie_choice_v1";

function updateConsent(granted) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
    });
  }
  window.dataLayer.push({ event: "crafman_cookie_consent_update", consent_choice: granted ? "accepted" : "rejected" });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "accepted" || saved === "rejected") {
        updateConsent(saved === "accepted");
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(granted) {
    try { window.localStorage.setItem(STORAGE_KEY, granted ? "accepted" : "rejected"); } catch { /* consent choice remains active for this page view */ }
    updateConsent(granted);
    if (granted) captureMarketingAttribution();
    setVisible(false);
  }

  if (!visible) return null;
  return (
    <aside className="crafman-cookie-banner" role="dialog" aria-label="Cookie preferences">
      <div><strong>Your privacy matters</strong><p>We use essential cookies to make this website work. With your permission, analytics and advertising cookies help us understand how people find Crafman and improve our campaigns. Read our <a href="/privacy-policy">Privacy Policy</a>.</p></div>
      <div className="crafman-cookie-actions"><button type="button" onClick={() => choose(false)}>Reject optional</button><button type="button" onClick={() => choose(true)}>Accept optional cookies</button></div>
    </aside>
  );
}
