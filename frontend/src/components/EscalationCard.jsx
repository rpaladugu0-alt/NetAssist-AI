import { HeadsetIcon } from './icons';

export default function EscalationCard({ reason, onEscalate }) {
  return (
    <div className="escalate-card">
      <div>
        <p className="escalate-title">
          <HeadsetIcon /> Escalate to Human Support
        </p>
        <p>
          {reason === 'Account-specific request'
            ? 'Refunds, billing changes, and account updates require an authorized ClearWave specialist.'
            : 'Would you like to connect with an authorized ClearWave support specialist?'}
        </p>
      </div>
      <button type="button" className="btn btn-primary" onClick={onEscalate}>
        Escalate to Support
      </button>
    </div>
  );
}
