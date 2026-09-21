export default function Toast({ toast, onRetry, onDismiss }) {
  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`} role="alert">
      <p>{toast.message}</p>
      <div>
        {toast.retry ? (
          <button type="button" className="text-link" onClick={onRetry}>
            Retry
          </button>
        ) : null}
        <button type="button" className="text-link" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
