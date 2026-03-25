export const trackEvent = (page: string, action: string) => {
  const events = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
  events.push({
    id: Date.now().toString(),
    page,
    action,
    timestamp: Date.now(),
    device: window.innerWidth < 768 ? 'mobile' : 'desktop',
    referrer: document.referrer || 'direct'
  });
  // Храним последние 500 событий
  if (events.length > 500) events.splice(0, events.length - 500);
  localStorage.setItem('portfolio_analytics', JSON.stringify(events));
};
