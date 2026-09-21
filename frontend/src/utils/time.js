export function formatTime(date = new Date()) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function createId(prefix = 'msg') {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}
