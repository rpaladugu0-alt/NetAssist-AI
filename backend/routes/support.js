import { Router } from "express";
import { knowledgeArticles, starterQuestions } from "../data/knowledge.js";
import { DEMO_DISCLAIMER, serviceAreas } from "../data/outages.js";
import { processSupportQuestion } from "../services/supportEngine.js";

const router = Router();
const MAX_QUESTION_LENGTH = 500;

router.get("/starters", (_req, res) => {
  res.json({ starters: starterQuestions });
});

router.get("/knowledge", (_req, res) => {
  res.json({ articles: knowledgeArticles });
});

router.get("/outages", (_req, res) => {
  res.json({
    demo: true,
    disclaimer: DEMO_DISCLAIMER,
    areas: serviceAreas,
  });
});

router.post("/", (req, res) => {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";

  if (!question) {
    return res.status(400).json({
      error: "A non-empty question is required.",
    });
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return res.status(413).json({
      error: `Question exceeds the maximum allowed length of ${MAX_QUESTION_LENGTH} characters.`,
    });
  }

  const result = processSupportQuestion(question);
  res.json({
    id: `ans-${Date.now()}`,
    question,
    ...result,
  });
});

export default router;
