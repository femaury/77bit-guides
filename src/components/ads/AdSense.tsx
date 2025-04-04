import { useEffect, useRef } from 'react';

interface AdSenseProps {
  format?: 'auto' | 'rectangle' | 'horizontal';
  slot: string;
  className?: string;
}

export function AdSense({ format = 'auto', slot, className = '' }: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only run this in production environments
    if (import.meta.env.PROD) {
      try {
        // Check if the ad is visible in viewport before pushing
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Ad is visible, push to adsbygoogle
                const adsbygoogle = window.adsbygoogle || [];
                adsbygoogle.push({});
                // Disconnect after pushing the ad
                observer.disconnect();
              }
            });
          },
          { 
            threshold: 0.1, // Trigger when at least 10% of the ad is visible
            rootMargin: "200px 0px" // Load the ad a bit earlier (when it's 200px below the viewport)
          }
        );
        
        if (adRef.current) {
          observer.observe(adRef.current);
        }
        
        return () => {
          observer.disconnect();
        };
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  // Different styles based on the format
  const sizeStyles = {
    'auto': 'min-h-[100px] w-full',
    'rectangle': 'h-[180px] max-w-[300px]', // Fixed height for more predictable layout in sidebar
    'horizontal': 'min-h-[90px] w-full'
  };

  return (
    <div 
      className={`overflow-hidden bg-bg-elevated/30 rounded-lg border border-border-primary transition-opacity ${sizeStyles[format]} ${className}`}
      style={{ opacity: '0.9' }}
      ref={adRef}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', height: format === 'rectangle' ? '160px' : 'auto' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // IMPORTANT: Replace with your actual AdSense publisher ID
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : 'rectangle'}
        data-full-width-responsive="true"
      />
      <div className="text-xs text-center text-gray-500 py-1">Advertisement</div>
    </div>
  );
}

// Add a type definition for the global adsbygoogle array
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
} 