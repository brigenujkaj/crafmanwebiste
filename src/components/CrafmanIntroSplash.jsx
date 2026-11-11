import { useEffect, useState } from "react";

/**
 * Minimal Crafman logo intro.
 * Shows on every full page load / browser refresh.
 * The landing page loads underneath; the overlay fades away to reveal it.
 */
export default function CrafmanIntroSplash() {
    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        // Standard timing: 1-second reveal, a deliberate hold, then a slow fade.
        const fadeDelay = reducedMotion ? 350 : 1300;
        const removeDelay = reducedMotion ? 650 : 2200;

        const fadeTimer = window.setTimeout(() => setFading(true), fadeDelay);
        const removeTimer = window.setTimeout(() => setVisible(false), removeDelay);

        return () => {
            window.clearTimeout(fadeTimer);
            window.clearTimeout(removeTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className={`crafman-intro-splash${fading ? " is-fading" : ""}`}
            aria-hidden="true"
        >
            <img
                className="crafman-intro-splash__logo"
                src="/crafmanLogo.gif"
                alt=""
                draggable="false"
                fetchPriority="high"
            />
            <style>{`
        .crafman-intro-splash {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: radial-gradient(ellipse at 50% 46%, #17150f 0%, #0b0b09 42%, #050505 100%);
          opacity: 1;
          visibility: visible;
          transition: opacity 850ms cubic-bezier(.65, 0, .35, 1), visibility 850ms;
          pointer-events: none;
        }
        .crafman-intro-splash__logo {
          display: block;
          width: min(76vw, 370px);
          max-height: 76vh;
          height: auto;
          object-fit: contain;
          mix-blend-mode: screen;
          filter: drop-shadow(0 0 28px rgba(206, 171, 85, .12));
          opacity: 0;
          transform: translateY(7px) scale(.965);
          animation: crafmanLogoReveal 900ms cubic-bezier(.2, .75, .25, 1) 150ms forwards;
          user-select: none;
        }
        .crafman-intro-splash.is-fading {
          opacity: 0;
          visibility: hidden;
        }
        .crafman-intro-splash.is-fading .crafman-intro-splash__logo {
          opacity: 0;
          transform: translateY(-3px) scale(1.015);
          transition: opacity 850ms ease, transform 850ms ease;
          animation: none;
        }
        @keyframes crafmanLogoReveal {
          from { opacity: 0; transform: translateY(7px) scale(.965); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 600px) {
          .crafman-intro-splash__logo { width: min(82vw, 330px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .crafman-intro-splash,
          .crafman-intro-splash__logo { animation: none !important; transition-duration: 150ms !important; }
          .crafman-intro-splash__logo { opacity: 1; transform: none; }
        }
      `}</style>
        </div>
    );
}
