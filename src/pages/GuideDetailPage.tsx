import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getGuideBySlug } from '../data/guides';
import { MarkdownContent } from '../components/MarkdownContent';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/SEO';

export function GuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const guide = slug ? getGuideBySlug(slug) : undefined;

  if (!guide) {
    return (
      <div className="text-center py-16">
        <SEO title="Guide Not Found" />
        <h1 className="text-2xl font-bold text-gray-300 mb-4">Guide Not Found</h1>
        <p className="text-gray-400 mb-8">The guide you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={guide.title}
        description={guide.description}
        image={guide.image}
        url={`/guides/${guide.slug}`}
      />
      
      <div>
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <span className="text-xs px-2 py-1 rounded bg-primary-transparent border border-border-primary text-primary mb-2 inline-block">{guide.category}</span>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover drop-shadow-[0_2px_4px_rgba(252,213,73,0.2)]">
              {guide.title}
            </h1>
            <p className="text-gray-300 mt-2">{guide.description}</p>
          </div>
          <Link to="/">
            <Button variant="secondary">Back to Guides</Button>
          </Link>
        </div>

        <div className="border-t border-border-primary pt-8">
          <MarkdownContent content={guide.content} />
        </div>
      </div>
    </>
  );
} 