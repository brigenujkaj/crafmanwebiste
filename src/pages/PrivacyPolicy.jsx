
import React from "react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
    const sections = [
        {
            title: "1. Introduction",
            content: (
                <>
                    <p>
                        At Crafman Design & Build, we respect your privacy and are
                        committed to protecting your personal information.
                    </p>
                    <p>
                        This Privacy Policy explains how we collect, use, store and
                        protect your personal information when you visit our website,
                        submit an enquiry, request a quotation or use our services.
                    </p>
                    <p>
                        We provide residential and commercial construction services,
                        including extensions, loft conversions, renovations, new builds,
                        architectural drawings, planning applications, landscaping and
                        commercial fit-outs.
                    </p>
                    <p>
                        We handle your personal information in accordance with
                        applicable UK data protection legislation, including the UK
                        GDPR and Data Protection Act 2018.
                    </p>
                </>
            ),
        },
        {
            title: "2. Who We Are",
            content: (
                <>
                    <p>
                        For the purposes of data protection legislation, the
                        organisation responsible for your personal information is:
                    </p>
                    <ul>
                        <li><strong>Business name:</strong> Crafman Design & Build</li>
                        <li><strong>Legal entity:</strong> Crafman Building and Landscaping Ltd</li>
                        <li><strong>Email:</strong> admin@crafman.co.uk</li>
                        <li><strong>Telephone:</strong> 07858 815820</li>
                        <li><strong>Website:</strong> crafman.co.uk</li>
                        <li><strong>Location:</strong> London, United Kingdom</li>
                    </ul>
                    <p>
                        In this policy, references to "we", "us" and "our" mean
                        Crafman Design & Build.
                    </p>
                </>
            ),
        },
        {
            title: "3. What Personal Information We Collect",
            content: (
                <>
                    <p>When you contact us or request a quotation, we may collect:</p>
                    <h4>Personal and contact information</h4>
                    <ul>
                        <li>Full name.</li>
                        <li>Email address.</li>
                        <li>Telephone number.</li>
                        <li>Property address and postcode.</li>
                    </ul>
                    <h4>Project information</h4>
                    <ul>
                        <li>Type of project or service required.</li>
                        <li>Property details and project location.</li>
                        <li>Estimated project budget.</li>
                        <li>Desired project start date.</li>
                        <li>Description of the proposed work.</li>
                        <li>Architectural drawings, photographs and documents you provide.</li>
                    </ul>
                    <h4>Website and technical information</h4>
                    <ul>
                        <li>IP address.</li>
                        <li>Browser type and device information.</li>
                        <li>Website pages visited.</li>
                        <li>How you found our website.</li>
                        <li>Cookie and analytics information, where permitted.</li>
                    </ul>
                    <p>
                        You are not required to provide every type of information.
                        However, some details may be necessary for us to assess your
                        project and provide an accurate quotation.
                    </p>
                </>
            ),
        },
        {
            title: "4. How We Use Your Personal Information",
            content: (
                <>
                    <p>We use your information for legitimate business purposes, including:</p>
                    <ul>
                        <li>Responding to enquiries submitted through our website.</li>
                        <li>Contacting you about your proposed project.</li>
                        <li>Preparing estimates and quotations.</li>
                        <li>Arranging property visits, consultations and surveys.</li>
                        <li>Providing architectural drawings and planning services.</li>
                        <li>Managing construction projects and client communications.</li>
                        <li>Processing contracts, invoices and payments.</li>
                        <li>Improving our website and customer experience.</li>
                        <li>Maintaining business records and complying with legal obligations.</li>
                    </ul>
                    <p>
                        We only use your personal information where we have an
                        appropriate legal basis to do so.
                    </p>
                </>
            ),
        },
        {
            title: "5. Our Legal Basis for Processing Your Information",
            content: (
                <>
                    <p>Under UK GDPR, we rely on the following legal bases where applicable:</p>
                    <h4>Legitimate interests</h4>
                    <p>
                        We may process your information to respond to enquiries,
                        manage prospective customer relationships, improve our
                        services and operate our business, where these interests
                        are not overridden by your rights.
                    </p>
                    <h4>Contractual necessity</h4>
                    <p>
                        Where you enter into an agreement with us, we may process
                        your information to provide our services and fulfil our
                        contractual obligations.
                    </p>
                    <h4>Legal obligations</h4>
                    <p>
                        We may retain and process certain information to meet
                        legal, tax, accounting and regulatory requirements.
                    </p>
                    <h4>Consent</h4>
                    <p>
                        Where required, we will request your consent before
                        processing personal information for particular marketing
                        activities or using non-essential cookies.
                    </p>
                </>
            ),
        },
        {
            title: "6. How We Contact You",
            content: (
                <>
                    <p>
                        If you submit an enquiry through our website, we may
                        contact you using the details you provide.
                    </p>
                    <p>This may include:</p>
                    <ul>
                        <li>Telephone calls.</li>
                        <li>Emails.</li>
                        <li>Text messages.</li>
                        <li>WhatsApp messages, where appropriate.</li>
                    </ul>
                    <p>
                        These communications will normally relate to your enquiry,
                        requested quotation or proposed project.
                    </p>
                    <p>
                        We will not automatically add you to unrelated marketing
                        campaigns simply because you have requested a quotation.
                        If we wish to send additional promotional communications,
                        we will obtain consent where required by applicable laws.
                    </p>
                    <p>You can withdraw your marketing consent at any time.</p>
                </>
            ),
        },
        {
            title: "7. Sharing Your Personal Information",
            content: (
                <>
                    <p>
                        We do not sell, rent or trade your personal information
                        to third parties.
                    </p>
                    <p>
                        However, we may share relevant information with trusted
                        organisations where necessary to operate our business
                        and deliver our services.
                    </p>
                    <p>These may include:</p>
                    <ul>
                        <li>Architects and architectural designers.</li>
                        <li>Structural engineers and planning consultants.</li>
                        <li>Building contractors and subcontractors.</li>
                        <li>Material suppliers and manufacturers.</li>
                        <li>Accountants and professional advisers.</li>
                        <li>Website hosting and IT service providers.</li>
                        <li>CRM and customer management platforms.</li>
                        <li>Website analytics and advertising providers.</li>
                    </ul>
                    <p>
                        We only share information where necessary and expect
                        relevant service providers to handle personal information
                        securely and lawfully.
                    </p>
                    <p>
                        We do not give third-party companies permission to use
                        your enquiry details for their own unrelated marketing.
                    </p>
                </>
            ),
        },
        {
            title: "8. How We Protect Your Information",
            content: (
                <>
                    <p>
                        We take reasonable technical and organisational measures
                        to protect your personal information against:
                    </p>
                    <ul>
                        <li>Unauthorised access.</li>
                        <li>Loss or theft.</li>
                        <li>Accidental disclosure.</li>
                        <li>Unauthorised alteration.</li>
                        <li>Misuse or destruction.</li>
                    </ul>
                    <p>
                        Access to customer information is restricted to individuals
                        who need it for legitimate business purposes.
                    </p>
                    <p>
                        Although we take appropriate precautions, no online
                        transmission or electronic storage system can be
                        guaranteed to be completely secure.
                    </p>
                </>
            ),
        },
        {
            title: "9. How Long We Keep Your Information",
            content: (
                <>
                    <p>
                        We only retain personal information for as long as
                        reasonably necessary for the purposes for which it
                        was collected.
                    </p>
                    <ul>
                        <li>
                            <strong>General enquiries:</strong> Normally up to
                            12 months after the last meaningful contact if no
                            project proceeds.
                        </li>
                        <li>
                            <strong>Quotations and prospective projects:</strong>
                            Normally up to 12 months after the last meaningful
                            contact, unless there is a valid reason to retain
                            them longer.
                        </li>
                        <li>
                            <strong>Active customers and projects:</strong>
                            For the duration of the project and any necessary
                            follow-up period.
                        </li>
                        <li>
                            <strong>Contracts, invoices and financial records:</strong>
                            For the applicable legal and accounting retention periods.
                        </li>
                        <li>
                            <strong>Marketing preferences:</strong> Until you
                            withdraw consent or request that we stop marketing
                            to you, subject to records needed to respect your
                            preferences.
                        </li>
                    </ul>
                    <p>
                        We may retain certain information for longer where
                        required by law or where necessary to establish,
                        exercise or defend legal claims.
                    </p>
                </>
            ),
        },
        {
            title: "10. Cookies and Website Tracking",
            content: (
                <>
                    <p>
                        Our website may use cookies and similar technologies
                        to improve your browsing experience and understand how
                        visitors interact with our website.
                    </p>
                    <p>These technologies may help us:</p>
                    <ul>
                        <li>Understand website traffic and visitor behaviour.</li>
                        <li>Measure the effectiveness of advertising campaigns.</li>
                        <li>Improve our website and enquiry forms.</li>
                        <li>Understand which services generate the most interest.</li>
                        <li>Measure conversions from platforms such as Google Ads.</li>
                    </ul>
                    <p>
                        We may use services such as Google Analytics and Google Ads.
                    </p>
                    <p>
                        Where required, we will request your permission before
                        placing non-essential cookies or using similar tracking
                        technologies.
                    </p>
                    <p>
                        You can manage your cookie preferences through our
                        website's cookie settings.
                    </p>
                </>
            ),
        },
        {
            title: "11. Your Data Protection Rights",
            content: (
                <>
                    <p>
                        Under UK data protection legislation, you may have
                        the right to:
                    </p>
                    <ul>
                        <li>
                            <strong>Access:</strong> Request a copy of the
                            personal information we hold about you.
                        </li>
                        <li>
                            <strong>Rectification:</strong> Ask us to correct
                            inaccurate or incomplete information.
                        </li>
                        <li>
                            <strong>Erasure:</strong> Request that we delete
                            your personal information where applicable.
                        </li>
                        <li>
                            <strong>Restriction:</strong> Ask us to restrict
                            how we use your information in certain circumstances.
                        </li>
                        <li>
                            <strong>Objection:</strong> Object to certain types
                            of processing, including direct marketing.
                        </li>
                        <li>
                            <strong>Data portability:</strong> Request certain
                            information in a commonly used electronic format.
                        </li>
                        <li>
                            <strong>Withdraw consent:</strong> Withdraw consent
                            where we rely on consent to process your information.
                        </li>
                    </ul>
                    <p>
                        These rights are subject to certain legal conditions
                        and exceptions.
                    </p>
                    <p>
                        To exercise your rights, contact us using the details
                        provided below.
                    </p>
                </>
            ),
        },
        {
            title: "12. Third-Party Websites",
            content: (
                <p>
                    Our website may contain links to third-party websites,
                    including social media platforms, suppliers and other
                    external services. We are not responsible for the privacy
                    practices, security or content of external websites.
                    We recommend reviewing their privacy policies before
                    providing personal information.
                </p>
            ),
        },
        {
            title: "13. Children's Privacy",
            content: (
                <p>
                    Our services are intended for homeowners, property owners,
                    businesses and other adults seeking construction and design
                    services. We do not knowingly collect personal information
                    from children through our website for marketing purposes.
                </p>
            ),
        },
        {
            title: "14. Changes to This Privacy Policy",
            content: (
                <p>
                    We may update this Privacy Policy from time to time to
                    reflect changes in our business, website, services or
                    legal requirements. Any updates will be published on
                    this page, together with the revised date.
                </p>
            ),
        },
        {
            title: "15. Contact Us",
            content: (
                <>
                    <p>
                        If you have any questions about this Privacy Policy,
                        how we handle your personal information or wish to
                        exercise your data protection rights, please contact us.
                    </p>
                    <div className="privacy-contact">
                        <strong>Crafman Design & Build</strong>
                        <p>Email: <a href="mailto:admin@crafman.co.uk">admin@crafman.co.uk</a></p>
                        <p>Telephone: <a href="tel:07858815820">07858 815820</a></p>
                        <p>Website: <a href="https://crafman.co.uk">crafman.co.uk</a></p>
                        <p>Location: London, United Kingdom.</p>
                    </div>
                    <p>
                        You also have the right to raise a concern with the
                        Information Commissioner's Office (ICO), the UK's
                        independent data protection regulator.
                    </p>
                    <p>
                        <a
                            href="https://ico.org.uk/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://ico.org.uk/
                        </a>
                    </p>
                </>
            ),
        },
    ];



    return (
        <>
            <Helmet>
                <title>Privacy Policy | Crafman Design & Build</title>
                <meta
                    name="description"
                    content="Read the Crafman Design & Build Privacy Policy to understand how we collect, use and protect your personal information when you enquire about our construction and design services."
                />
                <link
                    rel="canonical"
                    href="https://crafman.co.uk/privacy-policy"
                />
            </Helmet>

            <style>{`
      .privacy-page {
        background: #fff;
        color: #222;
        min-height: 100vh;
      }

      .privacy-container {
        width: min(1100px, 90%);
        margin: 0 auto;
      }

      .privacy-hero {
        background: #111;
        color: #fff;
        padding: 100px 0 85px;
      }

      .privacy-eyebrow {
        color: #d4a62e;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 3px;
      }

      .privacy-hero h1 {
        font-size: clamp(40px, 6vw, 64px);
        margin: 22px 0;
      }

      .privacy-hero h1 span {
        color: #d4a62e;
      }

      .privacy-hero p {
        max-width: 650px;
        color: #ccc;
        line-height: 1.8;
      }

      .privacy-content {
        padding: 75px 0;
      }

      .privacy-section {
        padding: 28px 0;
        border-bottom: 1px solid #e9e9e9;
      }

      .privacy-section h3 {
        color: #171717;
        font-size: 20px;
        margin-bottom: 18px;
      }

      .privacy-section-body {
        color: #555;
        line-height: 1.85;
        font-size: 15px;
      }

      .privacy-section-body li {
        margin-bottom: 9px;
      }

      .privacy-contact {
        background: #f8f7f3;
        border-left: 4px solid #d4a62e;
        padding: 25px;
        margin: 25px 0;
      }

      .privacy-footer {
        background: #111;
        color: #fff;
        padding: 45px;
        margin-top: 65px;
        text-align: center;
      }

      .privacy-button {
        display: inline-block;
        background: #d4a62e;
        color: #111;
        padding: 14px 28px;
        font-weight: 700;
        text-decoration: none;
      }

      @media (max-width: 600px) {
        .privacy-hero {
          padding: 70px 0 60px;
        }

        .privacy-content {
          padding: 45px 0;
        }

        .privacy-footer {
          padding: 30px 20px;
        }
      }
    `}</style>

            <main className="privacy-page">
                <section className="privacy-hero">
                    <div className="privacy-container">
                        <span className="privacy-eyebrow">
                            CRAFTSMANSHIP. QUALITY. TRUST.
                        </span>
                        <h1>
                            Privacy <span>Policy</span>
                        </h1>
                        <p>
                            Your privacy matters to us. Find out how we protect
                            and manage your personal information.
                        </p>
                        <span className="privacy-updated">
                            Last updated: 2 November 2026
                        </span>
                    </div>
                </section>

                <section className="privacy-content">
                    <div className="privacy-container">
                        <div className="privacy-intro">
                            <h2>Your Information. Our Responsibility.</h2>
                            <p>
                                At Crafman Design & Build, transparency and trust
                                are important to everything we do. This policy
                                explains how your information is handled when
                                you contact us or use our services.
                            </p>
                        </div>

                        <div className="privacy-sections">
                            {sections.map((section, index) => (
                                <article
                                    className="privacy-section"
                                    key={section.title}
                                    id={`privacy-section-${index + 1}`}
                                >
                                    <h3>{section.title}</h3>
                                    <div className="privacy-section-body">
                                        {section.content}
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="privacy-footer">
                            <h2>Have a Question?</h2>
                            <p>
                                If you have any questions about how we handle
                                your personal information, our team is happy to help.
                            </p>
                            <a
                                href="mailto:admin@crafman.co.uk"
                                className="privacy-button"
                            >
                                Contact Our Team
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default PrivacyPolicy;
