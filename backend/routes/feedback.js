import { Router } from "express";

const router = Router();
const feedbackStore = [];
const VALID_RATINGS = new Set(["helpful", "not-helpful"]);
const VALID_CATEGORIES = new Set([
  "General Support",
  "Wi-Fi Troubleshooting",
  "Modem & Router Setup",
  "Billing & Invoices",
  "Equipment",
  "Network Outages & Status",
  "Account & Billing Changes",
  "Unsupported Topic",
]);
const MAX_FEEDBACK_LENGTH = 500;

router.get("/", (_req, res) => {
  res.json({
    count: feedbackStore.length,
    records: feedbackStore,
  });
});

router.post("/", (req, res) => {
  const questionValue = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  const ratingValue = typeof req.body?.rating === "string" ? req.body.rating.trim() : "";
  const commentValue = typeof req.body?.comment === "string" ? req.body.comment.trim() : "";
  const categoryValue = typeof req.body?.category === "string" ? req.body.category.trim() : "General Support";
  const messageIdValue = typeof req.body?.messageId === "string" ? req.body.messageId.trim() : null;

  if (!questionValue || !ratingValue) {
    return res.status(400).json({
      error: "Feedback requires the original question and a rating of helpful or not-helpful.",
    });
  }

  if (!VALID_RATINGS.has(ratingValue)) {
    return res.status(400).json({
      error: "Rating must be helpful or not-helpful.",
    });
  }

  if (questionValue.length > MAX_FEEDBACK_LENGTH || commentValue.length > MAX_FEEDBACK_LENGTH) {
    return res.status(413).json({
      error: `Feedback exceeds the maximum allowed length of ${MAX_FEEDBACK_LENGTH} characters.`,
    });
  }

  const category = VALID_CATEGORIES.has(categoryValue) ? categoryValue : "General Support";

  const record = {
    id: `fb-${Date.now()}`,
    messageId: messageIdValue,
    question: questionValue,
    rating: ratingValue,
    comment: commentValue,
    category,
    timestamp: new Date().toISOString(),
  };

  feedbackStore.push(record);

  res.status(201).json({
    ok: true,
    message:
      ratingValue === "helpful"
        ? "Thank you for your feedback! Your input directly helps ClearWave Broadband enhance our customer support knowledge base."
        : "Feedback recorded. A ClearWave specialist can use your comments to improve future answers.",
    record,
  });
});

export default router;
