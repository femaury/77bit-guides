import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getGuideBySlug } from '../data/guides';
import { MarkdownContent } from '../components/MarkdownContent';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/SEO';

export function GuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const guide = slug ? getGuideBySlug(slug) : undefined;
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      if (!guide) return;
      
      try {
        setLoading(true);
        const response = await fetch(guide.contentPath);
        
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.status}`);
        }
        
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error('Error loading content:', err);
        setError('Failed to load the guide content. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [guide]);

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
          {loading ? (
            <div className="animate-pulse h-96 bg-bg-elevated/50 rounded-lg"></div>
          ) : error ? (
            <div className="text-red-400 p-4 border border-red-900/50 bg-red-900/10 rounded-lg">{error}</div>
          ) : (
            <MarkdownContent 
              content={content} 
              baseImagePath={guide.assetBasePath}
            />
          )}
        </div>
      </div>
    </>
  );
} 