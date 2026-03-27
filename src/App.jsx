import { Routes, Route, Link } from "react-router-dom";

// REAL PAGES
import Home from "./pages/Home.jsx";
import HouseExtensions from "./pages/HouseExtensions.jsx";
import RenovationsLondon from "./pages/RenovationsLondon.jsx";
import Abotu from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import CommercialFitoutsLondon from "./pages/CommercialFitoutsLondon.jsx";
import DrawingsPlanning from "./pages/DrawingsPlanning.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// TEMP (until you build it)
function TestPage({ title }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>{title}</h1>
      <p>Page working.</p>
      <Link to="/">Back</Link>
    </div>
  );
}

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [hash]);

  return null;
}

export default function App() {
  return (
    <Routes>
      {/* ✅ REAL HOME PAGE */}
      <Route path="/" element={<Home />} />

      {/* ✅ WORKING PAGES */}
      <Route path="/house-extensions-london" element={<HouseExtensions />} />
      <Route path="/renovations-london" element={<RenovationsLondon />} />
      <Route path="/about" element={<Abotu />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/commercial-fit-outs-london" element={<CommercialFitoutsLondon />} />
      <Route path="/drawings-planning" element={<DrawingsPlanning />} />

      {/* ✅ TEMP PAGE */}
      <Route path="/contact" element={<TestPage title="Contact" />} />
    </Routes>
  );
}