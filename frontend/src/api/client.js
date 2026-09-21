const API_BASE = '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.error || `Request failed (${response.status})`;
    throw new Error(message);
  }

  if (payload && typeof payload === 'object' && payload.error) {
    throw new Error(payload.error);
  }

  return payload;
}

export function fetchStarters() {
  return request('/support/starters');
}

export function fetchKnowledge() {
  return request('/support/knowledge');
}

export function fetchOutages() {
  return request('/support/outages');
}

export function askSupport(question) {
  return request('/support', {
    method: 'POST',
    body: JSON.stringify({ question }),
  });
}

export function submitFeedback(payload) {
  return request('/feedback', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
