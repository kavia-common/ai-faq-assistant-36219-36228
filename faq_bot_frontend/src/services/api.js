export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_BACKEND_URL ||
  '';

/**
 * Resolve the final API endpoint for the ask route.
 * Defaults to relative path /api/ask to support same-origin deployments.
 */
function resolveAskUrl() {
  const base = API_BASE_URL.trim();
  if (!base) return '/api/ask';
  // Ensure no duplicate slashes
  return `${base.replace(/\/+$/,'')}/api/ask`;
}

// PUBLIC_INTERFACE
export async function askQuestion(question) {
  /** Send the user's question to the backend and return the parsed JSON response.
   * Returns: { answer: string, ... } on success
   * Throws: Error on HTTP/network failure
   */
  const url = resolveAskUrl();
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question })
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    let msg = `Request failed (${resp.status})`;
    try {
      const j = JSON.parse(text);
      msg = j?.error || j?.message || msg;
    } catch {
      if (text) msg = `${msg}: ${text}`;
    }
    throw new Error(msg);
  }

  const data = await resp.json().catch(() => ({}));
  return data;
}
