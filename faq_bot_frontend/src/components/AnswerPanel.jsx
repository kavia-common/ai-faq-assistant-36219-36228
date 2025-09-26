import React from 'react';

// PUBLIC_INTERFACE
export default function AnswerPanel({ loading, answer, error }) {
  /** Displays the AI-generated answer, a loader, or an error */
  return (
    <div className="answer-card" aria-live="polite">
      <h3 className="answer-title">
        <span role="img" aria-label="answer">💬</span> Answer
      </h3>
      <div className="answer-content">
        {loading && (
          <div className="loader">
            <span className="dotpulse" />
            <span>Thinking…</span>
          </div>
        )}
        {!loading && error && (
          <div style={{ color: 'var(--error)', fontWeight: 600 }}>
            {error}
          </div>
        )}
        {!loading && !error && !answer && (
          <div style={{ color: 'var(--muted)' }}>
            Your answer will appear here.
          </div>
        )}
        {!loading && !error && !!answer && (
          <div>{answer}</div>
        )}
      </div>
    </div>
  );
}
