/**
 * Sends public website enquiries to Crafman OS.
 *
 * This file runs in the public browser bundle. Do not add Supabase keys or the
 * LEAD_INTAKE_SHARED_SECRET here. The OS endpoint authorises the website by
 * its Origin and applies its own honeypot/rate-limit checks.
 */

const DEFAULT_OS_URL = "https://app.crafman.co.uk";

function cleanString(value) {
    if (value === undefined || value === null) return undefined;
    const cleaned = String(value).trim();
    return cleaned || undefined;
}

function optionalNumber(value) {
    if (value === undefined || value === null || value === "") return undefined;
    const parsed = typeof value === "number" ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
}

function optionalBoolean(value) {
    if (typeof value === "boolean") return value;
    const normalized = cleanString(value)?.toLowerCase();
    if (["yes", "true", "1", "i own it", "i own the property", "owner", "owned"].includes(normalized)) return true;
    if (["no", "false", "0", "rent", "renting", "tenant"].includes(normalized)) return false;
    return undefined;
}

// Crafman OS stores project types as a fixed set of canonical values.
// Convert the website's customer-friendly labels before sending the lead.
function canonicalProjectType(value) {
    const raw = cleanString(value)?.toLowerCase();
    if (!raw) return undefined;
    if (raw.includes("wraparound")) return "wraparound_extension";
    if (raw.includes("double") && raw.includes("extension")) return "double_storey_extension";
    if (raw.includes("side") && raw.includes("extension")) return "side_extension";
    if (raw.includes("loft")) return "loft";
    if (raw.includes("extension")) return "rear_extension";
    if (raw.includes("commercial") || raw.includes("fit-out") || raw.includes("fit out")) return "commercial";
    if (raw.includes("drawing") || raw.includes("planning") || raw.includes("building regulations") || raw.includes("structural")) return "drawings_planning";
    if (raw.includes("landscap") || raw.includes("driveway")) return "landscaping";
    if (raw.includes("renovat") || raw.includes("refurb") || raw.includes("bathroom") || raw.includes("kitchen")) return "renovation";
    return "other";
}

function getAttribution() {
    if (typeof window === "undefined") return {};

    const params = new URLSearchParams(window.location.search);
    const read = (key) => params.get(key) || undefined;

    return {
        utm_source: read("utm_source"),
        utm_medium: read("utm_medium"),
        utm_campaign: read("utm_campaign"),
        utm_term: read("utm_term"),
        utm_content: read("utm_content"),
        gclid: read("gclid"),
        fbclid: read("fbclid"),
        ttclid: read("ttclid"),
        landing_page: window.location.href,
        referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
    };
}

function createExternalId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Submit one lead. Throws on API/network failure so callers can record it. */
export async function submitLeadToCrafmanOS(lead) {
    const clientName = cleanString(lead?.client_name ?? lead?.name);
    const email = cleanString(lead?.email);
    const phone = cleanString(lead?.phone);

    if (!clientName) {
        throw new Error("A client name is required before sending a lead to Crafman OS.");
    }
    if (!email && !phone) {
        throw new Error("An email address or phone number is required before sending a lead to Crafman OS.");
    }

    const attribution = getAttribution();
    const osUrl = (import.meta.env.VITE_CRAFMAN_OS_URL || DEFAULT_OS_URL).replace(/\/+$/, "");

    const payload = {
        client_name: clientName,
        email,
        phone,
        address: cleanString(lead?.address),
        postcode: cleanString(lead?.postcode),
        project_type: canonicalProjectType(lead?.project_type),
        description: cleanString(lead?.description),
        owned_property: optionalBoolean(lead?.owned_property),
        desired_start: cleanString(lead?.desired_start),
        estimated_value_low: optionalNumber(lead?.estimated_value_low),
        estimated_value_high: optionalNumber(lead?.estimated_value_high),
        form_name: cleanString(lead?.form_name) || "Website enquiry",
        external_id: cleanString(lead?.external_id) || createExternalId(),
        source: attribution.utm_source || cleanString(lead?.source) || "website",
        source_detail: cleanString(lead?.source_detail) || cleanString(lead?.form_name) || "crafman.co.uk enquiry",
        ...attribution,
        company_website: "", // API honeypot; real users never see this field.
    };

    const response = await fetch(`${osUrl}/api/leads/intake`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result?.success === false) {
        const message = result?.message || result?.error || `Crafman OS lead intake failed (${response.status}).`;
        throw new Error(message);
    }

    return result;
}

/**
 * Best-effort CRM sync used after Formspree has accepted the same enquiry.
 * The existing email route remains a backup if OS is temporarily unavailable.
 */
export async function syncLeadToCrafmanOS(lead) {
    try {
        const result = await submitLeadToCrafmanOS(lead);
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "crafman_os_lead_sync_success",
                form_name: lead?.form_name || "Website enquiry",
            });
        }
        return { success: true, result };
    } catch (error) {
        console.error("[Crafman OS] Website lead could not be synced. Formspree remains the backup.", {
            form_name: lead?.form_name || "Website enquiry",
            message: error?.message || "Unknown intake error",
        });
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "crafman_os_lead_sync_failed",
                form_name: lead?.form_name || "Website enquiry",
            });
        }
        return { success: false, error };
    }
}
