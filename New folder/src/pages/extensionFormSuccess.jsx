import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ExtensionFormSuccess() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "extension_form_conversion",
      conversion_name: "Extension Lead Form",
    });
  }, []);

  return (
    <main className="extension-form-success">
      <div className="extension-form-success-card">
        <span className="extension-form-success-icon"><CheckCircle2 size={42}/></span>
        <p className="extension-lead-eyebrow">ENQUIRY RECEIVED</p>
        <h1>Thank you. Your project starts here.</h1>
        <p>We've received your extension enquiry. A member of the Crafman Design & Build team will review the details and get back to you.</p>
        <Link className="extension-lead-submit extension-success-link" to="/">
          Back to Crafman <ArrowRight size={18}/>
        </Link>
      </div>
    </main>
  );
}
