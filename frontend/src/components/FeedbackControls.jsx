import { ThumbDownIcon, ThumbUpIcon } from './icons';

export default function FeedbackControls({
  message,
  onSubmit,
  submitting,
}) {
  const feedback = message.feedback;
  const draft = message.feedbackDraft || '';

  if (feedback?.status === 'success') {
    return (
      <div className="feedback-success" role="status" aria-live="polite">
        {feedback.note}
      </div>
    );
  }

  return (
    <div className="feedback">
      <p id={`feedback-label-${message.id}`}>Was this answer helpful?</p>
      <div className="feedback-actions" aria-labelledby={`feedback-label-${message.id}`}>
        <button
          type="button"
          className={`btn btn-chip ${feedback?.rating === 'helpful' ? 'is-selected' : ''}`}
          disabled={submitting}
          onClick={() => onSubmit(message, 'helpful')}
          aria-pressed={feedback?.rating === 'helpful'}
          aria-label="Mark answer as helpful"
        >
          <ThumbUpIcon /> Yes
        </button>
        <button
          type="button"
          className={`btn btn-chip ${feedback?.rating === 'not-helpful' ? 'is-selected' : ''}`}
          disabled={submitting}
          onClick={() => onSubmit(message, 'not-helpful')}
          aria-pressed={feedback?.rating === 'not-helpful'}
          aria-label="Mark answer as not helpful"
        >
          <ThumbDownIcon /> No
        </button>
      </div>
      <label htmlFor={`feedback-comment-${message.id}`} className="feedback-comment">
        Optional comment
        <textarea
          id={`feedback-comment-${message.id}`}
          rows={2}
          value={draft}
          disabled={submitting}
          placeholder="Share more detail (optional)"
          onChange={(event) => onSubmit(message, null, event.target.value)}
        />
      </label>
      {feedback?.status === 'error' ? (
        <p className="feedback-error" role="alert">
          {feedback.note}{' '}
          <button type="button" className="text-link" onClick={() => onSubmit(message, feedback.rating)}>
            Retry submission
          </button>
        </p>
      ) : null}
      {submitting ? <p className="feedback-loading" aria-live="polite">Submitting your feedback…</p> : null}
    </div>
  );
}
