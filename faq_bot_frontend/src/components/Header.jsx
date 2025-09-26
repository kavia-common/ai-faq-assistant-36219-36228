import React from 'react';

// PUBLIC_INTERFACE
export default function Header({ theme, onToggleTheme }) {
  /** Header with brand, theme toggle, and subtle glass background */
  return (
    <header className="header">
      <div className="brand">
        <div className="logo" aria-hidden="true" />
        <div className="brand-title">FAQ Assistant</div>
      </div>
      <div className="header-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}
