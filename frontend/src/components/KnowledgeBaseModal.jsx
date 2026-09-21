import Modal from './Modal';

export default function KnowledgeBaseModal({ open, articles = [], onClose, onAsk }) {
  if (!open) return null;

  return (
    <Modal title="Certified Knowledge Base" labelledBy="kb-title" onClose={onClose}>
      <p>NetAssist AI answers only from these approved ClearWave articles.</p>
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <button
              type="button"
              className="btn btn-tiny"
              onClick={() => {
                onAsk(article.summary);
                onClose();
              }}
            >
              Ask about this topic
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
