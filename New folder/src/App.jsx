import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import HouseExtensionsEssex from "./pages/HouseExtensionsEssex.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import CommercialFitOutsLondon from "./pages/CommercialFitOutsLondon.jsx";
import DrawingsPlanning from "./pages/DrawingsPlanning.jsx";
import Projects from "./pages/Projects.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import CaseStudyDetail from "./pages/CaseStudyDetail.jsx";
import Landscaping from "./pages/Landscaping.jsx";
import ThankYouPage from "./components/ThankYouPage.jsx";
import CraffyThankYouPage from "./components/CraffyThankYouPage.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import HouseExtensionsLead from "./pages/HouseExtensionsLead.jsx";
import RenovationsLead from "./pages/RenovationsLead.jsx";
import LoftConversionsLead from "./pages/LoftConversionsLead.jsx";
import ExtensionFormSuccess from "./pages/extensionFormSuccess.jsx";
import AnalyticsTracker from "./components/AnalyticsTracker.jsx";
import CookieConsent from "./components/CookieConsent.jsx";

export default function App() {
  return (
    <>
      <AnalyticsTracker />
      <CookieConsent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/house-extensions-london" element={<HouseExtensionsLead />} />
        <Route path="/extensionFormSuccess" element={<ExtensionFormSuccess />} />
        <Route path="/house-extensions-essex" element={<HouseExtensionsEssex />} />

        <Route path="/loft-conversions-london" element={<LoftConversionsLead />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/commercial-fit-outs-london" element={<CommercialFitOutsLondon />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/drawings-planning" element={<DrawingsPlanning />} />
        <Route path="/landscaping" element={<Landscaping />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/craffy-thank-you" element={<CraffyThankYouPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}
