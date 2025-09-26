import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import { askQuestion } from './services/api';
import Header from './components/Header';
import QuestionInput from './components/QuestionInput';
import AnswerPanel from './components/AnswerPanel';
import RecentQuestions from './components/RecentQuestions';

// PUBLIC_INTERFACE
function App() {
  /**
   * A modern, minimalist FAQ Bot interface with:
   * - Ocean Professional theme (blue primary, amber accents)
   * - Central input, answer area, and recent questions sidebar
   * - Smooth transitions, rounded corners, subtle gradients
   * - REST API integration via environment-configurable endpoint
   */
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');

  const canSubmit = useMemo(() => question.trim().length > 0 && !isLoading, [question, isLoading]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // PUBLIC_INTERFACE
  const handleAsk = async () => {
    if (!canSubmit) return;
    setIsLoading(true);
    setError('');
    setAnswer('');
    try {
      const res = await askQuestion(question.trim());
      const aiText = res?.answer || res?.data?.answer || '';
      setAnswer(aiText);
      setRecent(prev => {
        const updated = [{ q: question.trim(), a: aiText, ts: Date.now() }, ...prev].slice(0, 10);
        // Avoid duplicates by question text
        const deduped = [];
        const seen = new Set();
        for (const item of updated) {
          if (!seen.has(item.q)) {
            deduped.push(item);
            seen.add(item.q);
          }
        }
        return deduped.slice(0, 10);
      });
    } catch (e) {
      setError(
        e?.message ||
          'Something went wrong while contacting the FAQ service. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleRecentSelect = (item) => {
    setQuestion(item.q);
    setAnswer(item.a || '');
    setError('');
  };

  return (
    <div className="app-root">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="layout">
        <section className="left-panel">
          <div className="hero">
            <h1 className="title">FAQ Assistant</h1>
            <p className="subtitle">
              Ask a question and get an AI-powered answer. Powered by RAG + MCP.
            </p>
          </div>

          <QuestionInput
            value={question}
            onChange={setQuestion}
            onSubmit={handleAsk}
            disabled={!canSubmit}
            loading={isLoading}
          />

          <AnswerPanel
            loading={isLoading}
            answer={answer}
            error={error}
          />
        </section>

        <aside className="right-panel">
          <RecentQuestions
            items={recent}
            onSelect={handleRecentSelect}
            onClear={() => setRecent([])}
          />
        </aside>
      </main>

      <footer className="footer">
        <span>Ocean Professional Theme</span>
        <span className="dot" />
        <span>Modern • Minimal • Smooth</span>
      </footer>
    </div>
  );
}

export default App;
