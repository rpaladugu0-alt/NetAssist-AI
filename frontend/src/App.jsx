import { useEffect, useMemo, useRef, useState } from 'react';
import {
  askSupport,
  fetchKnowledge,
  fetchOutages,
  fetchStarters,
  submitFeedback,
} from './api/client';
import ChatComposer from './components/ChatComposer';
import ChatMessage from './components/ChatMessage';
import EscalationModal from './components/EscalationModal';
import Header from './components/Header';
import KnowledgeBaseModal from './components/KnowledgeBaseModal';
import Modal from './components/Modal';
import OutageModal from './components/OutageModal';
import SuggestedQuestions from './components/SuggestedQuestions';
import Toast from './components/Toast';
import TypingIndicator from './components/TypingIndicator';
import { createId, formatTime } from './utils/time';
import './App.css';

const FALLBACK_STARTERS = [
  { id: 'wifi', icon: 'wifi', label: 'My Wi-Fi is slow. What should I do?' },
  { id: 'modem', icon: 'restart', label: 'How do I restart my modem?' },
  { id: 'outage', icon: 'alert', label: 'How can I check for an outage?' },
  { id: 'billing', icon: 'bill', label: 'Why is my bill higher this month?' },
  { id: 'equipment', icon: 'router', label: 'What router does ClearWave provide?' },
  { id: 'outage-north', icon: 'alert', label: 'Is there an outage in North Charlotte?' },
];

const WELCOME = {
  id: 'welcome',
  role: 'assistant',
  type: 'welcome',
  category: 'General Support',
  text: "Hello! I'm NetAssist AI, your ClearWave Broadband customer support assistant. I can provide troubleshooting and support information backed strictly by our approved documentation for Wi-Fi, modem restarts, Charlotte-area outage checks, billing information, and equipment.",
  steps: [
    'Wi-Fi troubleshooting and slow speeds',
    'Modem and WavePulse gateway restarts',
    'ClearWave regional network outage checks',
    'Monthly billing, fees, and invoice questions',
    'ClearWave approved equipment specifications',
  ],
  time: formatTime(),
};

export default function App() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);
  const [starters, setStarters] = useState(FALLBACK_STARTERS);
  const [articles, setArticles] = useState([]);
  const [outages, setOutages] = useState({ areas: [], disclaimer: '' });
  const [selectedAreaId, setSelectedAreaId] = useState('matthews');
  const [toast, setToast] = useState(null);
  const [escalateOpen, setEscalateOpen] = useState(false);
  const [escalateCategory, setEscalateCategory] = useState('General Support');
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [outageOpen, setOutageOpen] = useState(false);
  const [sourceArticle, setSourceArticle] = useState(null);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(null);
  const [pendingQuestion, setPendingQuestion] = useState(null);
  const listRef = useRef(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    Promise.allSettled([fetchStarters(), fetchKnowledge(), fetchOutages()]).then(
      ([starterResult, knowledgeResult, outageResult]) => {
        if (starterResult.status === 'fulfilled') {
          setStarters(starterResult.value.starters || FALLBACK_STARTERS);
        }
        if (knowledgeResult.status === 'fulfilled') {
          setArticles(knowledgeResult.value.articles || []);
        }
        if (outageResult.status === 'fulfilled') {
          setOutages(outageResult.value);
          setSelectedAreaId(outageResult.value.areas?.[3]?.id || 'matthews');
        }
        if (
          starterResult.status === 'rejected' &&
          knowledgeResult.status === 'rejected' &&
          outageResult.status === 'rejected'
        ) {
          setToast({
            type: 'error',
            message: 'Unable to reach the NetAssist backend. Start it on port 3001, then retry.',
            retry: true,
          });
        }
      },
    );
  }, []);

  useEffect(() => {
    if (loading) return;

    const stream = listRef.current;
    const latestAnswer = stream?.querySelector('[data-message-role="assistant"]:last-of-type');
    if (latestAnswer) {
      const workspace = stream.closest('.workspace');
      if (workspace) {
        window.scrollTo({
          top: Math.max(0, window.scrollY + workspace.getBoundingClientRect().top - 16),
          behavior: 'smooth',
        });
      }
      const streamRect = stream.getBoundingClientRect();
      const answerRect = latestAnswer.getBoundingClientRect();
      stream.scrollTo({
        top: Math.max(0, stream.scrollTop + answerRect.top - streamRect.top - 16),
        behavior: 'smooth',
      });
    }
  }, [messages, loading]);

  const lastUserQuestion = useMemo(() => {
    return [...messages].reverse().find((message) => message.role === 'user')?.text || '';
  }, [messages]);

  function openEscalate(category = 'General Support') {
    setEscalateCategory(category);
    setEscalateOpen(true);
  }

  async function sendQuestion(rawQuestion, options = {}) {
    const candidate = typeof (rawQuestion ?? input) === 'string' ? (rawQuestion ?? input).trim() : '';
    const question = candidate;

    if (!question) {
      setInputError('Enter a question or choose a suggested prompt.');
      return;
    }
    if (sendingRef.current) {
      return;
    }
    sendingRef.current = true;

    setInputError('');
    setInput('');
    setPendingQuestion(question);
    if (!options.retry) {
      setMessages((current) => [
        ...current,
        {
          id: createId('user'),
          role: 'user',
          text: question,
          time: formatTime(),
        },
      ]);
    }
    setLoading(true);

    try {
      const response = await askSupport(question);
      setMessages((current) => [
        ...current,
        {
          id: response.id || createId('bot'),
          role: 'assistant',
          type: response.type,
          category: response.category,
          text: response.message,
          steps: response.steps,
          source: response.source,
          demoDisclaimer: response.demoDisclaimer,
          areas: response.areas,
          selectedAreaId: response.selectedAreaId,
          escalate: response.escalate,
          escalateReason: response.escalateReason,
          time: formatTime(),
          feedbackDraft: '',
        },
      ]);
      if (response.selectedAreaId) {
        setSelectedAreaId(response.selectedAreaId);
      }
      setToast(null);
    } catch (error) {
      const isNetworkError = /failed to fetch|networkerror|load failed/i.test(
        error.message || '',
      );
      setToast({
        type: 'error',
        message: isNetworkError
          ? 'The support service is unavailable. Please try again.'
          : error.message || 'The support service is unavailable. Please try again.',
        retry: true,
      });
    } finally {
      sendingRef.current = false;
      setLoading(false);
    }
  }

  function updateMessage(id, patch) {
    setMessages((current) =>
      current.map((message) => (message.id === id ? { ...message, ...patch } : message)),
    );
  }

  async function handleFeedback(message, rating, commentValue) {
    if (rating == null) {
      updateMessage(message.id, { feedbackDraft: commentValue });
      return;
    }

    setFeedbackSubmitting(message.id);
    try {
      const result = await submitFeedback({
        messageId: message.id,
        question: lastUserQuestion || message.text,
        rating,
        comment: commentValue ?? message.feedbackDraft,
        category: message.category,
      });
      updateMessage(message.id, {
        feedback: {
          status: 'success',
          rating,
          note: `${result.message} Category: ${result.record.category}.`,
        },
      });
    } catch (error) {
      updateMessage(message.id, {
        feedback: {
          status: 'error',
          rating,
          note: error.message || 'Feedback could not be saved.',
        },
      });
    } finally {
      setFeedbackSubmitting(null);
    }
  }

  function retryLast() {
    if (pendingQuestion) {
      sendQuestion(pendingQuestion, { retry: true });
    } else {
      window.location.reload();
    }
  }

  return (
    <div className="app-shell">
      <Header
        onOpenOutages={() => setOutageOpen(true)}
        onOpenKnowledge={() => setKnowledgeOpen(true)}
        onEscalate={() => openEscalate('Human Support Request')}
      />

      <main className="workspace">
        <section className="chat-panel" aria-label="Support conversation">
          <div className="chat-stream" ref={listRef} role="log" aria-live="polite">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                feedbackSubmitting={feedbackSubmitting}
                onEscalate={openEscalate}
                onFeedback={handleFeedback}
                onViewSource={(source) =>
                  setSourceArticle(articles.find((article) => article.id === source.id) || source)
                }
                onSelectArea={(messageId, areaId) => {
                  setSelectedAreaId(areaId);
                  updateMessage(messageId, { selectedAreaId: areaId });
                }}
              />
            ))}
            {loading ? <TypingIndicator /> : null}
          </div>

          <SuggestedQuestions questions={starters} disabled={loading} onSelect={sendQuestion} />
          <ChatComposer
            value={input}
            disabled={loading}
            error={inputError}
            onChange={(value) => {
              setInput(value);
              if (value.trim()) setInputError('');
            }}
            onSubmit={() => sendQuestion()}
          />
        </section>
      </main>

      <Toast toast={toast} onRetry={retryLast} onDismiss={() => setToast(null)} />

      <EscalationModal
        open={escalateOpen}
        category={escalateCategory}
        onClose={() => setEscalateOpen(false)}
      />
      <KnowledgeBaseModal
        open={knowledgeOpen}
        articles={articles}
        onClose={() => setKnowledgeOpen(false)}
        onAsk={sendQuestion}
      />
      <OutageModal
        open={outageOpen}
        areas={outages.areas}
        disclaimer={outages.disclaimer}
        selectedAreaId={selectedAreaId}
        onSelect={setSelectedAreaId}
        onClose={() => setOutageOpen(false)}
      />
      {sourceArticle ? (
        <Modal
          title={sourceArticle.title || 'Approved source'}
          labelledBy="source-title"
          onClose={() => setSourceArticle(null)}
        >
          <p>{sourceArticle.summary || 'This answer is grounded in certified ClearWave documentation.'}</p>
          {sourceArticle.steps ? (
            <ol className="plain-list">
              {sourceArticle.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : null}
        </Modal>
      ) : null}
    </div>
  );
}
