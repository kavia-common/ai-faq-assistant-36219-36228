import React from 'react';

// PUBLIC_INTERFACE
export default function RecentQuestions({ items, onSelect, onClear }) {
  /** Shows up to 10 recent questions with quick select */
  return (
    <div>
      <div className="recent-header">
        <h3 style={{ margin: 0 }}>Recent</h3>
        <button
          className="btn ghost"
          onClick={onClear}
          disabled={!items?.length}
          aria-label="Clear recent"
          title="Clear recent"
        >
          Clear
        </button>
      </div>
      <div className="recent-list">
        {(!items || items.length === 0) && (
          <div style={{ color: 'var(--muted)', fontSize: 14 }}>
            No recent questions yet.
          </div>
        )}
        {items?.map((it) => (
          <button
            type="button"
            key={it.ts + it.q}
            className="recent-item"
            onClick={() => onSelect(it)}
          >
            <p className="recent-q">{it.q}</p>
            {!!it.a && <p className="recent-a">{String(it.a).slice(0, 140)}{String(it.a).length > 140 ? '…' : ''}</p>}
          </button>
        ))}
      </div>
    </div>
  );
}
