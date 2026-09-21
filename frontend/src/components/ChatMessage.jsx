import EscalationCard from './EscalationCard';
import FeedbackControls from './FeedbackControls';
import OutageLookup from './OutageLookup';
import SourceCard from './SourceCard';

export default function ChatMessage({
  message,
  onEscalate,
  onFeedback,
  onViewSource,
  onSelectArea,
  feedbackSubmitting,
}) {
  if (message.role === 'user') {
    return (
      <article className="bubble-row is-user" data-message-role="user">
        <div className="bubble user-bubble">
          <p>{message.text}</p>
          <time>{message.time}</time>
        </div>
        <span className="avatar user-avatar" aria-hidden="true">
          You
        </span>
      </article>
    );
  }

  return (
    <article className="bubble-row is-assistant" data-message-role="assistant">
      <span className="avatar bot-avatar" aria-hidden="true">
        NA
      </span>
      <div className="bubble assistant-bubble">
        <header className="bubble-meta">
          <strong>NetAssist AI</strong>
          <span className="support-chip">ClearWave Support</span>
          <time>{message.time}</time>
        </header>
        <p>{message.text}</p>
        {message.steps?.length ? (
          <div className="steps">
            <p>Recommended steps:</p>
            <ol>
              {message.steps.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ) : null}
        {message.demoDisclaimer ? <p className="demo-note">{message.demoDisclaimer}</p> : null}
        {message.type === 'outage' ? (
          <OutageLookup
            areas={message.areas}
            selectedAreaId={message.selectedAreaId}
            disclaimer={message.demoDisclaimer}
            onSelect={(areaId) => onSelectArea(message.id, areaId)}
          />
        ) : null}
        <SourceCard source={message.source} onView={onViewSource} />
        {message.escalate ? (
          <EscalationCard reason={message.escalateReason} onEscalate={() => onEscalate(message.category)} />
        ) : null}
        <FeedbackControls
          message={message}
          submitting={feedbackSubmitting === message.id}
          onSubmit={onFeedback}
        />
      </div>
    </article>
  );
}
