import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/SEO';

export function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for couldn't be found." />
      
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-300 mb-6">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </>
  );
} 