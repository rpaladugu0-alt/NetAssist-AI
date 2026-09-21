import { knowledgeArticles } from "../data/knowledge.js";
import { DEMO_DISCLAIMER, findServiceArea, serviceAreas } from "../data/outages.js";

const ACCOUNT_SPECIFIC =
  /\b(refund|credit my|change (my )?(account|bill|plan|payment)|update (my )?payment|cancel (my )?(account|service|plan)|change (my )?account|account (plan|service|payment)|password|ssn|social security|account number|move my service|change address|drop.?line|my house|my residence|my street)\b/i;

const UNSUPPORTED =
  /\b(super bowl|world series|weather|stock|recipe|homework|sports score|who won|president|movie|lottery)\b/i;

const WIFI = /\b(wi-?fi|wifi|slow (internet|speed)|buffering|weak signal|5g band|2\.4)\b/i;
const MODEM = /\b(restart|reboot|power.?cycle|modem|gateway|unplug|router lights)\b/i;
const BILLING = /\b(bill|invoice|fee|charge|promotional|autopay|late fee|why.*(higher|increase))\b/i;
const EQUIPMENT = /\b(router|equipment|wavepulse|extender|mesh|what (router|modem|gateway)|device)\b/i;
const OUTAGE = /\b(outage|down|offline|network status|service status|degraded|outages)\b/i;

function articleByCategory(category) {
  return knowledgeArticles.find((article) => article.category === category);
}

function isUnclear(question) {
  const text = question.trim();
  if (text.length < 3) return true;
  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length < 3) return true;
  if (!/[aeiou]/i.test(text) && letters.length < 8) return true;
  const vague = /^(hi|hey|hello|help|issue|problem|idk|hmm+|ok|test|asdf|abc)$/i;
  return vague.test(text);
}

export function processSupportQuestion(rawQuestion) {
  const question = String(rawQuestion || "").trim();

  if (!question) {
    return {
      type: "validation",
      category: "validation",
      title: "Please enter a question",
      message: "Type a support question or choose a suggested question below.",
      escalate: false,
    };
  }

  if (ACCOUNT_SPECIFIC.test(question)) {
    return {
      type: "escalate",
      category: "Account & Billing Changes",
      title: "Human support required",
      message:
        "I'm not confident that I have approved information to answer that question. Refunds, plan changes, and other account-specific requests must be handled by an authorized ClearWave specialist.",
      escalate: true,
      escalateReason: "Account-specific request",
    };
  }

  if (isUnclear(question)) {
    return {
      type: "clarification",
      category: "General Support",
      title: "Need a little more detail",
      message:
        "I'd be happy to help, but your question is a bit unclear. Could you provide a few more details about what you're experiencing?",
      steps: [
        "Wi-Fi Troubleshooting: Slow speeds, device connection issues, or blinking gateway lights",
        "Gateway Setup: Restarting your modem or resetting your Wi-Fi network",
        "Outage Lookup: Checking current network operational status in North Charlotte, South Charlotte, Uptown, Matthews, or Concord",
        "Billing & Equipment: Viewing billing cycle guidelines or returning equipment",
      ],
      escalate: true,
      escalateReason: "Unclear request",
    };
  }

  if (UNSUPPORTED.test(question)) {
    return {
      type: "escalate",
      category: "Unsupported Topic",
      title: "Outside certified carrier knowledge",
      message:
        "I'm not confident that I have approved information to answer that question. NetAssist AI only answers ClearWave Broadband support topics backed by certified documentation.",
      escalate: true,
      escalateReason: "Unsupported question",
    };
  }

  const matchedArea = findServiceArea(question);
  if (matchedArea || OUTAGE.test(question)) {
    const article = articleByCategory("outage");
    const area = matchedArea || null;
    const summary = area
      ? `${area.name} is currently showing ${area.statusLabel} in the demonstration outage feed.`
      : "Use the regional outage lookup below to review demonstration network status for Charlotte-area service areas, including Matthews.";

    return {
      type: "outage",
      category: "Network Outages & Status",
      title: article.title,
      message: summary,
      steps: article.steps.slice(0, 3),
      source: { id: article.id, title: article.title },
      demoDisclaimer: DEMO_DISCLAIMER,
      selectedAreaId: area?.id || null,
      areas: serviceAreas,
      escalate: true,
      escalateReason: "Address-specific verification",
    };
  }

  if (WIFI.test(question)) {
    const article = articleByCategory("wifi");
    return {
      type: "answer",
      category: "Wi-Fi Troubleshooting",
      title: article.title,
      message: article.summary,
      steps: article.steps,
      source: { id: article.id, title: article.title },
      escalate: false,
    };
  }

  if (MODEM.test(question)) {
    const article = articleByCategory("modem");
    return {
      type: "answer",
      category: "Modem & Router Setup",
      title: article.title,
      message: article.summary,
      steps: article.steps,
      source: { id: article.id, title: article.title },
      escalate: false,
    };
  }

  if (BILLING.test(question)) {
    const article = articleByCategory("billing");
    return {
      type: "answer",
      category: "Billing & Invoices",
      title: article.title,
      message: article.summary,
      steps: article.steps,
      source: { id: article.id, title: article.title },
      escalate: false,
    };
  }

  if (EQUIPMENT.test(question)) {
    const article = articleByCategory("equipment");
    return {
      type: "answer",
      category: "Equipment",
      title: article.title,
      message: article.summary,
      steps: article.steps,
      source: { id: article.id, title: article.title },
      escalate: false,
    };
  }

  return {
    type: "escalate",
    category: "General Support",
    title: "Human support recommended",
    message:
      "I'm not confident that I have approved information to answer that question. Would you like to connect with an authorized ClearWave support specialist?",
    escalate: true,
    escalateReason: "Unsupported question",
  };
}
