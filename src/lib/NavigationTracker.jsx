import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function NavigationTracker() {
  const location = useLocation();

  // Post navigation changes to parent window (for iframe embedding if needed)
  useEffect(() => {
    window.parent?.postMessage({
      type: "app_changed_url",
      url: window.location.href
    }, '*');
  }, [location]);

  return null;
}
