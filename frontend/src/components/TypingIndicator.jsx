export default function TypingIndicator() {
  return (
    <div className="bubble-row is-assistant" role="status" aria-live="polite">
      <span className="avatar bot-avatar" aria-hidden="true">
        NA
      </span>
      <div className="bubble assistant-bubble typing">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        NetAssist is reviewing certified ClearWave documentation…
      </div>
    </div>
  );
}
