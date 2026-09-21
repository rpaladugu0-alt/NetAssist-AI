import { starterIcons } from './icons';

export default function SuggestedQuestions({ questions, onSelect, disabled }) {
  return (
    <section className="suggestions" aria-label="Suggested questions">
      <div className="suggestions-head">
        <h2>Suggested questions</h2>
        <p>Click to ask instantly</p>
      </div>
      <div className="suggestion-grid">
        {questions.map((item) => {
          const Icon = starterIcons[item.icon] || starterIcons.wifi;
          return (
            <button
              key={item.id}
              type="button"
              className="suggestion-card"
              disabled={disabled}
              onClick={() => onSelect(item.label)}
            >
              <span className="suggestion-icon">
                <Icon />
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
