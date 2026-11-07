CRAFMAN EXTENSION LEAD FORM

Files:
- src/components/extensionLeadForm.jsx — interactive form component
- src/pages/extensionFormSuccess.jsx — success page and conversion event
- src/styles/extension-lead-form.css — responsive styling
- src/App.jsx — route added at /extensionFormSuccess

Form fields:
- Name (required)
- Email (required)
- Property address (required)
- Type of project (required)
- Description (optional)

Submission:
- Sends to the existing Formspree endpoint used in the supplied ContactForm (mojpjokd).
- Syncs to Crafman OS using the existing syncLeadToCrafmanOS helper.
- Redirects to /extensionFormSuccess after successful Formspree acceptance.
- Pushes dataLayer event extension_lead_submit after successful submission and extension_form_conversion on the success page.

TO RENDER THE FORM
Import into the page where the form should appear:
  import ExtensionLeadForm from "../components/extensionLeadForm.jsx";
Then render:
  <ExtensionLeadForm />

The requested filenames are kept exactly. Component names use standard React PascalCase.
Back up src/App.jsx before replacing it, then run npm run build and test a submission before deploying.
