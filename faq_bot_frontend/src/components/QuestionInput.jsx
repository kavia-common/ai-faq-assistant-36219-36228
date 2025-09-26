import React, { useCallback } from 'react';

// PUBLIC_INTERFACE
export default function QuestionInput({ value, onChange, onSubmit, disabled, loading }) {
  /** Central input field with Ask button and Enter key support */
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSubmit && onSubmit();
      }
    },
    [onSubmit]
  );

  return (
    <div className="q-wrap" role="form" aria-label="Ask a question">
      <div className="input-row">
        <input
          className="input"
          type="text"
          placeholder="Ask your question here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Question"
        />
        <button
          className="btn ask-btn"
          onClick={onSubmit}
          disabled={disabled}
          aria-busy={loading ? 'true' : 'false'}
        >
          {loading ? 'Asking…' : 'Ask'}
        </button>
      </div>
    </div>
  );
}
