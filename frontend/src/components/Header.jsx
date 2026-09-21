import { BookIcon, HeadsetIcon, WifiIcon } from './icons';

export default function Header({ onOpenOutages, onOpenKnowledge, onEscalate }) {
  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          <WifiIcon />
        </span>
        <div>
          <div className="brand-row">
            <strong>ClearWave</strong>
            <span className="brand-pill">Broadband</span>
          </div>
          <p className="brand-sub">
            NetAssist AI <span className="dot" /> Official Support
          </p>
        </div>
      </div>

      <nav className="header-actions" aria-label="Support tools">
        <button type="button" className="btn btn-ghost" onClick={onOpenOutages}>
          Outages <span className="demo-chip">Demo</span>
        </button>
        <button type="button" className="btn btn-ghost" onClick={onOpenKnowledge}>
          <BookIcon /> Knowledge Base
        </button>
        <button type="button" className="btn btn-primary" onClick={onEscalate}>
          <HeadsetIcon /> Escalate to Support
        </button>
        <a className="header-phone" href="tel:18005559283">
          1-800-555-WAVE
        </a>
      </nav>
    </header>
  );
}
