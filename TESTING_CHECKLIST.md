# NetAssist-AI Testing Checklist

This checklist covers the current NetAssist-AI workspace and the user-facing UI, backend routes, validation rules, accessibility expectations, responsive layout, and responsible AI/demo-boundary behaviors.

All items are marked as NOT TESTED initially.

## 1. Functional tests

- [ ] NOT TESTED — App loads successfully with the welcome assistant message.
- [ ] NOT TESTED — Header branding and support controls render correctly.
- [ ] NOT TESTED — Outages button opens the outage modal or lookup.
- [ ] NOT TESTED — Knowledge Base button opens the certified knowledge modal.
- [ ] NOT TESTED — Escalate to Support button opens the escalation modal.
- [ ] NOT TESTED — Suggested question cards render with all six starter prompts.
- [ ] NOT TESTED — Clicking a suggested question populates the input and submits successfully.
- [ ] NOT TESTED — Chat composer accepts normal text input.
- [ ] NOT TESTED — Enter key submits a valid question.
- [ ] NOT TESTED — Shift+Enter creates a new line instead of submitting.
- [ ] NOT TESTED — Send button submits a valid question.
- [ ] NOT TESTED — User message appears in the chat stream.
- [ ] NOT TESTED — Assistant response appears immediately after a valid question.
- [ ] NOT TESTED — Wi‑Fi troubleshooting flow returns the expected answer content.
- [ ] NOT TESTED — Modem restart instructions flow returns the expected answer content.
- [ ] NOT TESTED — Billing information flow returns the expected answer content.
- [ ] NOT TESTED — Equipment information flow returns the expected answer content.
- [ ] NOT TESTED — Outage lookup flow detects Charlotte-area outage questions correctly.
- [ ] NOT TESTED — Matthews outage information displays when relevant.
- [ ] NOT TESTED — Outage area tabs switch between service areas correctly.
- [ ] NOT TESTED — Selected area details update after area selection.
- [ ] NOT TESTED — Source article card renders when a response contains a source.
- [ ] NOT TESTED — View source button opens the source details modal.
- [ ] NOT TESTED — Source modal shows the correct title and article summary.
- [ ] NOT TESTED — Source modal closes correctly.
- [ ] NOT TESTED — Escalation card appears for unsupported or account-specific topics.
- [ ] NOT TESTED — Escalation button inside the assistant response triggers the support flow.
- [ ] NOT TESTED — Human support modal shows category, phone, reference, and demo note.
- [ ] NOT TESTED — Human support modal closes correctly.
- [ ] NOT TESTED — Feedback buttons render for each assistant response.
- [ ] NOT TESTED — Helpful vote submits feedback successfully.
- [ ] NOT TESTED — Not-helpful vote submits feedback successfully.
- [ ] NOT TESTED — Optional comment field accepts and saves text.
- [ ] NOT TESTED — Feedback success state displays after a successful submission.
- [ ] NOT TESTED — Feedback error state displays after a failed submission.
- [ ] NOT TESTED — Retry submission link works after a feedback failure.
- [ ] NOT TESTED — Typing indicator appears while the assistant is processing a response.
- [ ] NOT TESTED — Typing indicator disappears after the response arrives.
- [ ] NOT TESTED — Chat auto-scrolls to the newest message.
- [ ] NOT TESTED — Message list supports multiple conversation turns without losing ordering.
- [ ] NOT TESTED — Loading state disables repeated submission while a request is in progress.
- [ ] NOT TESTED — The app remains stable after several successive questions.

## 2. Validation tests

- [ ] NOT TESTED — Empty input shows the validation message and does not submit.
- [ ] NOT TESTED — Whitespace-only input is rejected.
- [ ] NOT TESTED — Input with only punctuation is rejected or handled as unclear.
- [ ] NOT TESTED — Very short nonsensical input is treated as unclear.
- [ ] NOT TESTED — Very long input is handled gracefully without breaking layout or request creation.
- [ ] NOT TESTED — Unsupported question categories trigger human escalation.
- [ ] NOT TESTED — Account-specific request such as refund, plan change, or billing change triggers escalation.
- [ ] NOT TESTED — Unclear question triggers clarification flow instead of a wrong answer.
- [ ] NOT TESTED — Invalid non-string payload to backend is rejected.
- [ ] NOT TESTED — Missing question field in backend POST returns a 400 error.
- [ ] NOT TESTED — Question object with wrong type is rejected.
- [ ] NOT TESTED — Feedback POST without question is rejected.
- [ ] NOT TESTED — Feedback POST without rating is rejected.
- [ ] NOT TESTED — Feedback POST with invalid rating is rejected.
- [ ] NOT TESTED — Feedback POST with blank comment is accepted as valid when rating is present.
- [ ] NOT TESTED — Feedback POST with whitespace-only comment is handled correctly.
- [ ] NOT TESTED — An outage query with no service area still returns a valid outage response or fallback guidance.
- [ ] NOT TESTED — Query matching multiple terms still selects the correct response category.
- [ ] NOT TESTED — Mixed-case input still matches the correct support category.
- [ ] NOT TESTED — Feature detection works with punctuation and formatting variations.
- [ ] NOT TESTED — Leading/trailing spaces in input do not break classification.
- [ ] NOT TESTED — Duplicate or repeated prompts do not cause state corruption.
- [ ] NOT TESTED — Empty message after a failed request does not create duplicate or stale entries.

## 3. Error-handling tests

- [ ] NOT TESTED — Backend unavailable error state shows a user-friendly toast or error message.
- [ ] NOT TESTED — No network / failed fetch to starter questions shows a fallback state.
- [ ] NOT TESTED — Failed knowledge fetch does not crash the app.
- [ ] NOT TESTED — Failed outage fetch does not crash the app.
- [ ] NOT TESTED — Failed support API call shows the retry option.
- [ ] NOT TESTED — Retry action re-submits the last question.
- [ ] NOT TESTED — Failed feedback submission shows an error message and retry behavior.
- [ ] NOT TESTED — API 400 response from backend is displayed as a helpful error.
- [ ] NOT TESTED — API 500 response from backend is displayed as a fallback error without breaking the UI.
- [ ] NOT TESTED — 404 route missing is surfaced correctly in backend error handling.
- [ ] NOT TESTED — Unexpected backend exception does not crash the frontend.
- [ ] NOT TESTED — Server-side validation errors are returned in JSON format and surfaced cleanly in the client.
- [ ] NOT TESTED — Empty or invalid payloads do not leave the UI in a loading state forever.
- [ ] NOT TESTED — Toast dismissal works when user closes the error message.
- [ ] NOT TESTED — Failed API request preserves the last entered question in retry flow.
- [ ] NOT TESTED — Network interruption during answer generation displays stable fallback messaging.
- [ ] NOT TESTED — Duplicate feedback submission is handled safely without duplicating records unexpectedly.

## 4. Responsive tests

- [ ] NOT TESTED — Layout renders correctly at mobile width.
- [ ] NOT TESTED — Layout renders correctly at tablet width.
- [ ] NOT TESTED — Layout renders correctly at desktop width.
- [ ] NOT TESTED — Suggested-question grid wraps correctly on narrow screens.
- [ ] NOT TESTED — Chat input stays usable on small screens.
- [ ] NOT TESTED — Send button remains accessible and visible on mobile.
- [ ] NOT TESTED — Header actions wrap or stack properly without overlap.
- [ ] NOT TESTED — Chat panel uses available vertical space without clipping the latest message.
- [ ] NOT TESTED — Long assistant responses do not overflow horizontally on narrow screens.
- [ ] NOT TESTED — Long question text wraps cleanly in the user bubble.
- [ ] NOT TESTED — Outage lookup tabs remain usable on narrow screens.
- [ ] NOT TESTED — Outage detail cards remain readable on mobile.
- [ ] NOT TESTED — Modal width remains usable on small screens.
- [ ] NOT TESTED — Source card and feedback section remain readable in narrow layouts.
- [ ] NOT TESTED — Scroll area properly handles long conversations on mobile.
- [ ] NOT TESTED — Orientation change does not break layout or scroll behavior.
- [ ] NOT TESTED — Fixed-position toast does not block essential interactive content on mobile.
- [ ] NOT TESTED — Suggested prompt area remains visible and usable on small screens.

## 5. Accessibility tests

- [ ] NOT TESTED — All interactive buttons are keyboard reachable.
- [ ] NOT TESTED — Tab order flows logically through header, chat, suggestions, composer, and modals.
- [ ] NOT TESTED — Enter key activates buttons and form submission as expected.
- [ ] NOT TESTED — Space key activates buttons where appropriate.
- [ ] NOT TESTED — Focus is visible on every interactive element.
- [ ] NOT TESTED — Textarea has an accessible label or correctly associated hidden label.
- [ ] NOT TESTED — Buttons have meaningful accessible names.
- [ ] NOT TESTED — Modal dialog has proper dialog semantics and focus management.
- [ ] NOT TESTED — Modal close button has accessible label.
- [ ] NOT TESTED — Outage tabs expose selected state via ARIA attributes.
- [ ] NOT TESTED — Chat log has accessible live region semantics.
- [ ] NOT TESTED — Typing indicator announces status appropriately.
- [ ] NOT TESTED — Toast alerts announce error or retry state appropriately.
- [ ] NOT TESTED — Escalation card and source card buttons are keyboard accessible.
- [ ] NOT TESTED — Feedback buttons can be operated without a mouse.
- [ ] NOT TESTED — Feedback comment field is keyboard accessible and focusable.
- [ ] NOT TESTED — Contrast is sufficient for text, buttons, chips, and warnings.
- [ ] NOT TESTED — Color is not the only indicator for outage status or success/error states.
- [ ] NOT TESTED — Screen reader users can understand the purpose of the outage lookup, knowledge modal, and escalation flow.
- [ ] NOT TESTED — Decorative icons do not interfere with screen-reader output.
- [ ] NOT TESTED — Focus returns to the triggering element after modal close.
- [ ] NOT TESTED — Focus is not trapped incorrectly in the app.
- [ ] NOT TESTED — The page remains usable when browser zoom is increased.
- [ ] NOT TESTED — Reduced-motion concerns are considered for animations and loader pulses.

## 6. Backend/API tests

- [ ] NOT TESTED — GET /api/health returns the expected status payload and 200 response.
- [ ] NOT TESTED — GET /api/support/starters returns starter questions.
- [ ] NOT TESTED — GET /api/support/knowledge returns the knowledge article list.
- [ ] NOT TESTED — GET /api/support/outages returns outage areas and demo disclaimer.
- [ ] NOT TESTED — POST /api/support with valid Wi‑Fi question returns Wi‑Fi support result.
- [ ] NOT TESTED — POST /api/support with valid modem question returns modem instructions.
- [ ] NOT TESTED — POST /api/support with valid billing question returns billing guidance.
- [ ] NOT TESTED — POST /api/support with valid equipment question returns equipment guidance.
- [ ] NOT TESTED — POST /api/support with outage question returns outage result including selected region.
- [ ] NOT TESTED — POST /api/support with unsupported topic returns escalation payload.
- [ ] NOT TESTED — POST /api/support with refund or account-specific request returns escalation payload.
- [ ] NOT TESTED — POST /api/support with unclear input returns clarification payload.
- [ ] NOT TESTED — POST /api/support with empty question returns 400 and proper error message.
- [ ] NOT TESTED — POST /api/support with whitespace-only question returns 400 and proper error message.
- [ ] NOT TESTED — POST /api/support with very long question is accepted or rejected gracefully without server crash.
- [ ] NOT TESTED — POST /api/support with malformed payload returns validation error.
- [ ] NOT TESTED — POST /api/support with invalid JSON body is handled gracefully.
- [ ] NOT TESTED — GET /api/feedback returns stored feedback records.
- [ ] NOT TESTED — POST /api/feedback with valid helpful rating stores a record.
- [ ] NOT TESTED — POST /api/feedback with valid not-helpful rating stores a record.
- [ ] NOT TESTED — POST /api/feedback with blank comment still stores valid feedback.
- [ ] NOT TESTED — POST /api/feedback with missing question returns 400.
- [ ] NOT TESTED — POST /api/feedback with missing rating returns 400.
- [ ] NOT TESTED — POST /api/feedback with invalid rating returns 400.
- [ ] NOT TESTED — Backend 404 handler responds with correct JSON error for unknown route.
- [ ] NOT TESTED — Backend 500 error handler responds with generic safe error message.
- [ ] NOT TESTED — CORS behavior allows local frontend communication on localhost.
- [ ] NOT TESTED — Backend handles repeated requests without memory leak or stale state corruption.
- [ ] NOT TESTED — Feedback store resets only on backend restart, as expected for demo data.
- [ ] NOT TESTED — No API route exposes unsafe or sensitive customer information.
- [ ] NOT TESTED — Demo data label is present in outage responses.
- [ ] NOT TESTED — Demo boundary is preserved in all outage responses and UI states.
- [ ] NOT TESTED — Backend failure mode remains isolated and does not crash the frontend app.
- [ ] NOT TESTED — No network / failed API request from frontend shows retry or fallback handling.
- [ ] NOT TESTED — Backend behaves correctly under simultaneous requests from multiple UI actions.

## Summary

This checklist covers:
- normal and edge-case inputs
- all major user actions and buttons
- backend route validation and error handling
- accessibility and responsive requirements
- demo-data and escalation boundaries
- failed network and server conditions

All items are intentionally marked as NOT TESTED until you begin executing this checklist in the app.
