import React, { useState } from 'react';
import { Button } from './ui/Button';

interface GuideFeedbackProps {
  guideTitle: string;
  className?: string;
}

export function GuideFeedback({ guideTitle, className = '' }: GuideFeedbackProps) {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [showTextArea, setShowTextArea] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // In a real app, this would submit the feedback to a backend
  const submitFeedback = () => {
    // Simulate API call
    console.log('Submitting feedback:', {
      guideTitle,
      wasHelpful: feedback === 'positive',
      comment: comment.trim() || null,
    });
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`border-t border-border-primary pt-6 mt-6 text-center ${className}`}>
        <div className="text-primary font-medium mb-3">
          Thank you for your feedback!
        </div>
        <p className="text-gray-300 text-sm">
          Your input helps us improve our guides for everyone.
        </p>
      </div>
    );
  }

  return (
    <div className={`border-t border-border-primary pt-6 mt-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-300 mb-3">
        Was this guide helpful?
      </h3>

      <div className="flex gap-3 mb-4">
        <Button
          variant={feedback === 'positive' ? 'primary' : 'secondary'}
          onClick={() => {
            setFeedback('positive');
            setShowTextArea(true);
          }}
          className="py-2 px-4 gap-1.5"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" />
          </svg>
          Yes, it was helpful
        </Button>
        
        <Button
          variant={feedback === 'negative' ? 'primary' : 'secondary'}
          onClick={() => {
            setFeedback('negative');
            setShowTextArea(true);
          }}
          className="py-2 px-4 gap-1.5"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" />
          </svg>
          No, I need more info
        </Button>
      </div>

      {showTextArea && (
        <div className="mt-4 bg-bg-primary/30 p-4 rounded-lg transition-all">
          <textarea
            placeholder={
              feedback === 'positive'
                ? "What did you find most helpful? (optional)"
                : "What information was missing or unclear? (optional)"
            }
            className="w-full p-3 bg-bg-elevated border border-border-primary rounded-md text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-end mt-3">
            <Button
              variant="primary"
              onClick={submitFeedback}
              className="text-sm"
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 