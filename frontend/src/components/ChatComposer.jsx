import { useEffect, useRef } from 'react';
import { SendIcon } from './icons';

export default function ChatComposer({
  value,
  onChange,
  onSubmit,
  disabled,
  error,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!disabled) {
      textareaRef.current?.focus();
    }
  }, [disabled, value]);

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  }

  return (
    <form
      className="composer"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="support-input" className="sr-only">
        Ask a ClearWave support question
      </label>
      <textarea
        ref={textareaRef}
        id="support-input"
        rows={1}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about slow Wi-Fi, restarting your modem, outages, your bill, or equipment..."
        aria-invalid={Boolean(error)}
        aria-describedby="composer-status composer-hint"
      />
      <button type="submit" className="send-btn" disabled={disabled} aria-label="Send question">
        <SendIcon />
      </button>
      {error ? (
        <p id="composer-status" className="composer-error" role="alert">
          {error}
        </p>
      ) : null}
      <div id="composer-hint" className="composer-meta">
        <span>Protected by ClearWave Guard: Certified carrier knowledge only</span>
        <span>Press Enter to send, Shift+Enter for a new line</span>
      </div>
    </form>
  );
}
