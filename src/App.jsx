
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// REAL PAGES
import Home from "./pages/Home.jsx";
import HouseExtensions from "./pages/HouseExtensions.jsx";
import HouseExtensionsEssex from "./pages/HouseExtensionsEssex.jsx";
import RenovationsLondon from "./pages/RenovationsLondon.jsx";
import Abotu from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import CommercialFitOutsLondon from "./pages/CommercialFitOutsLondon.jsx";
import DrawingsPlanning from "./pages/DrawingsPlanning.jsx";
import Projects from "./pages/Projects.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import CaseStudyDetail from "./pages/CaseStudyDetail.jsx";
import Landscaping from "./pages/Landscaping.jsx";
import ThankYouPage from "./components/ThankYouPage";
import CraffyThankYouPage from "./components/CraffyThankYouPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CrafmanIntroSplash from "./components/CrafmanIntroSplash.jsx";

// Scroll to page sections when a URL contains a hash
function ScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;

        const timer = setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 150);

        return () => clearTimeout(timer);
    }, [hash]);

    return null;
}

export default function App() {
    return (
        <>
            <ScrollToHash />

            {/* Crafman logo intro */}
            <CrafmanIntroSplash />

            {/* Website pages */}
            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/house-extensions-london"
                    element={<HouseExtensions />}
                />

                <Route
                    path="/house-extensions-essex"
                    element={<HouseExtensionsEssex />}
                />

                <Route
                    path="/renovations-london"
                    element={<RenovationsLondon />}
                />

                <Route path="/about" element={<Abotu />} />

                <Route path="/contact" element={<Contact />} />

                <Route
                    path="/commercial-fit-outs-london"
                    element={<CommercialFitOutsLondon />}
                />

                <Route path="/projects" element={<Projects />} />

                <Route
                    path="/drawings-planning"
                    element={<DrawingsPlanning />}
                />

                <Route path="/landscaping" element={<Landscaping />} />

                <Route path="/case-studies" element={<CaseStudies />} />

                <Route
                    path="/case-studies/:slug"
                    element={<CaseStudyDetail />}
                />

                <Route path="/thank-you" element={<ThankYouPage />} />

                <Route
                    path="/craffy-thank-you"
                    element={<CraffyThankYouPage />}
                />

                <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicy />}
                />
            </Routes>
        </>
    );
}
