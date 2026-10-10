'use client';

import { useState, useEffect } from 'react';

export default function EnhancedUI() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate a delay to show the effect of deferred styling
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`mt-8 p-6 rounded-lg ${loaded ? 'fade-in enhanced-shadow' : ''}`}>
      <h3 className={`text-2xl font-bold mb-4 ${loaded ? 'enhanced-text' : ''}`}>
        Enhanced UI Elements
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className={`p-4 rounded-lg hover-scale ${loaded ? 'enhanced-border' : ''}`}>
          <h4 className="font-semibold mb-2">Feature 1</h4>
          <p className="text-sm text-black">
            This component uses deferred styling for enhanced visual effects.
          </p>
        </div>
        <div className={`p-4 rounded-lg hover-scale ${loaded ? 'enhanced-border' : ''}`}>
          <h4 className="font-semibold mb-2">Feature 2</h4>
          <p className="text-sm text-black">
            Styles are loaded after critical content for better performance.
          </p>
        </div>
        <div className={`p-4 rounded-lg hover-scale ${loaded ? 'enhanced-border' : ''}`}>
          <h4 className="font-semibold mb-2">Feature 3</h4>
          <p className="text-sm text-black">
            Notice how the UI enhances after the page loads completely.
          </p>
        </div>
      </div>
      <div className={`mt-4 h-2 w-full rounded-full overflow-hidden ${loaded ? 'enhanced-shadow' : ''}`}>
        <div className={`h-full ${loaded ? 'enhanced-gradient' : 'bg-blue-500'}`} style={{ width: '100%' }}></div>
      </div>
    </div>
  );
} 