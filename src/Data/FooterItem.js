export const footerItem = [
    {
        item: "Legal Firm",
        subItem: [
            { label: "Home", link: "/" },
            { label: "About", link: "/about" },
            { label: "Team", link: "/team" },
        ],
        footerlInk: {
            privacy: {
                label: "Privacy Policy",
                link: "/privacy-policy"
            },
            terms: {
                label: "Terms & Conditions",
                link: "/terms-&-conditions"

            }
        },
    },
    {
        item: "Legal Services",
        subItem: [
            { label: "Public Law", link: "/legal-services?focus=PUBLIC%20LAW " },
            { label: "Property Law", link: "/legal-services?focus=PROPERTY%20LAW" },
            { label: "Criminal Law", link: "legal-services?focus=CRIMINAL%20LAW" },
            { label: "Civil Law", link: "legal-services?focus=CIVIL%20LAW" },
            { label: "Administrative Law", link: "legal-services?focus=ADMINISTRATIVE%20LAW" },
            { label: "Constitutional Law", link: "legal-services?focus=CONSTITUTIONAL%20LAW" },
        ],
    },

    {
        item: "Resources",
        subItem: [
            { label: "Blog", link: "/blog" },
            { label: "Daily Legal Content", link: "/daily-legal-content" },
            { label: "What Should I Do Now?", link: "/what-should-i-do-now" },
        ],
    },

    {
        item: "Social Media Links",
        subItem: [
            { label: "Instagram", link: "https://instagram.com" },
            { label: "LinkedIn", link: "https://linkedin.com" },
            { label: "X (Twitter)", link: "https://twitter.com" },
        ],
    },

    {
        item: "Location",
        subItem: [
            {
                label: "Email: contact@arshivlegal.com",
                link: "mailto: contact@arshivlegal.com",
            },
            {
                label: "Phone: +91 XXXXXXXX456",
                link: "tel:+919999999456",
            },
        ],
    },
];

// ✅ MUST BE AN ARRAY — OR YOU WILL GET ERROR
export const footerDisclaimer = [
    "“This website is intended solely for general informational purposes about our law firm and the legal services we offer. The information provided here should not be construed as formal legal advice, nor does it create an attorney–client relationship. We encourage you to contact us via email or other means; however, please note that sending us a message does not establish an attorney–client relationship or transmit confidential information. Such a relationship will only be formed after a personal consultation, a conflicts check, written confirmation of our acceptance of your matter, and your receipt and acknowledgment of an engagement letter.”",
    "If you have any questions about this disclaimer, please contact us at contact@arshivlegal.com. "
];
