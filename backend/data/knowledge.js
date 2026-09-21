export const knowledgeArticles = [
  {
    id: "wifi-optimization",
    title: "ClearWave Wi-Fi Optimization & Slow Speed Guide",
    category: "wifi",
    summary: "Essential steps to diagnose and improve slow Wi-Fi speeds across home devices.",
    steps: [
      "Move within 20 feet of your ClearWave gateway without physical barriers.",
      "Connect to your ClearWave_5G network band instead of 2.4G.",
      "Pause high-bandwidth background downloads or cloud backups.",
      "Ensure the gateway is elevated at least 3 feet off the ground in an open area.",
      "Run a wired speed test using an Ethernet cable at speedtest.clearwave.net to test baseline incoming speed.",
    ],
  },
  {
    id: "modem-restart",
    title: "ClearWave Gateway & Modem Power Cycle Guide",
    category: "modem",
    summary:
      "Official step-by-step procedure to restart and power-cycle your ClearWave gateway or modem.",
    steps: [
      "Unplug the black power cord from the back of the ClearWave gateway.",
      "Confirm all front panel indicator lights are unlit.",
      "Wait 30 full seconds before reconnecting power.",
      "Firmly re-insert the power cord into the gateway and wall outlet.",
      "Wait 3 to 5 minutes until the Power, US/DS, and Online LED lights turn solid cyan or green.",
      "Test your internet connection on your primary device.",
    ],
  },
  {
    id: "billing-invoices",
    title: "ClearWave Billing Cycle & Invoice Guide",
    category: "billing",
    summary:
      "General information about typical billing line items, promotional periods, and invoice timing.",
    steps: [
      "ClearWave invoices are issued on a monthly cycle and include service, equipment, and applicable taxes.",
      "Promotional rates typically last 12 months and then return to the standard regional rate.",
      "Gateway rental, Wi-Fi extender rental, and late-payment fees can increase the total due.",
      "Paperless billing and AutoPay discounts appear as credits when those programs are active.",
      "This assistant can explain billing categories only. Account balances, refunds, and plan changes require a human specialist.",
    ],
  },
  {
    id: "equipment-specs",
    title: "ClearWave Approved Equipment Specifications",
    category: "equipment",
    summary: "Approved residential gateway and Wi-Fi equipment provided by ClearWave Broadband.",
    steps: [
      "New residential accounts receive the WavePulse Wi-Fi 6 gateway as standard equipment.",
      "The WavePulse gateway supports dual-band 2.4 GHz and 5 GHz SSIDs named ClearWave and ClearWave_5G.",
      "Optional WavePulse Mesh extenders are available for homes larger than 2,000 square feet.",
      "Customer-owned routers may be used in bridge mode; voice and ClearWave Guard features require the WavePulse gateway.",
      "Replacement equipment is available through a ClearWave support specialist after identity verification.",
    ],
  },
  {
    id: "outage-detection",
    title: "ClearWave Regional Service Outage & Maintenance Detection Guide",
    category: "outage",
    summary:
      "How to review demonstration regional outage status for Charlotte-area service areas.",
    steps: [
      "Select a ClearWave service area in the interactive outage lookup to view demonstration operational status.",
      "Statuses include Operational, Degraded Service, and Service Outage.",
      "Keep your WavePulse gateway powered on so it can automatically resynchronize when line repairs conclude.",
      "Address-specific drop-line verification cannot be completed in this assistant and requires human support.",
      "All outage records shown here are prototype / demo data simulated for testing.",
    ],
  },
];

export const starterQuestions = [
  {
    id: "wifi",
    icon: "wifi",
    label: "My Wi-Fi is slow. What should I do?",
  },
  {
    id: "modem",
    icon: "restart",
    label: "How do I restart my modem?",
  },
  {
    id: "outage",
    icon: "alert",
    label: "How can I check for an outage?",
  },
  {
    id: "billing",
    icon: "bill",
    label: "Why is my bill higher this month?",
  },
  {
    id: "equipment",
    icon: "router",
    label: "What router does ClearWave provide?",
  },
  {
    id: "outage-north",
    icon: "alert",
    label: "Is there an outage in North Charlotte?",
  },
];
