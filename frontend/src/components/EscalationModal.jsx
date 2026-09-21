import Modal from './Modal';

export default function EscalationModal({ open, onClose, category = 'General Support' }) {
  if (!open) return null;

  return (
    <Modal title="Connect with Human Support" labelledBy="escalate-title" onClose={onClose}>
      <p>
        This demo does not connect to live customer accounts. A ClearWave specialist would
        normally continue this conversation after identity verification.
      </p>
      <dl className="info-list">
        <div>
          <dt>Request category</dt>
          <dd>{category}</dd>
        </div>
        <div>
          <dt>Support hours</dt>
          <dd>24/7 for outages · 8 AM–8 PM ET for billing</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>
            <a href="tel:18005559283">1-800-555-WAVE</a>
          </dd>
        </div>
        <div>
          <dt>Reference</dt>
          <dd>Demo ticket CW-NA-{category.slice(0, 3).toUpperCase()}-1042</dd>
        </div>
      </dl>
      <p className="demo-note">
        No real ticket is created. This modal simulates the human-support handoff used in Workshop 1.
      </p>
      <button type="button" className="btn btn-primary" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
}
