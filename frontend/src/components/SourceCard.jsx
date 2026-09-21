export default function SourceCard({ source, onView }) {
  if (!source) return null;

  return (
    <div className="source-card">
      <div>
        <p className="source-kicker">Approved source article</p>
        <p className="source-title">{source.title}</p>
      </div>
      <button type="button" className="btn btn-tiny" onClick={() => onView(source)}>
        View source
      </button>
    </div>
  );
}
