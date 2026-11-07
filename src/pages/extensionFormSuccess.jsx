import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "../components/Layout.jsx";
import "../styles/extension-lead-form.css";

export default function ExtensionFormSuccess() {
  const location = useLocation();
  const hasSubmitted = Boolean(location.state?.submitted);

  return (
    <Layout>
      <Helmet>
        <title>Enquiry Received | Crafman Design & Build</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <main className="extension-success-page">
        <div className="extension-success-card">
          <div className="extension-success-mark" aria-hidden="true">✓</div>
          <span className="extension-lead-kicker">ENQUIRY RECEIVED</span>
          <h1>{hasSubmitted ? "Thank you. We've got it." : "Thank you for contacting Crafman."}</h1>
          <p>Your extension enquiry has been received. Our team will review the details and get back to you about the next steps.</p>
          <Link to="/" className="extension-success-button">Back to website <span>↗</span></Link>
        </div>
      </main>
    </Layout>
  );
}
