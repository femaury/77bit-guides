import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getGuideBySlug, Guide, getRelatedGuidesByIds } from '../data/guides';
import { MarkdownContent } from '../components/MarkdownContent';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/SEO';
import { TableOfContents } from '../components/TableOfContents';
// import { GuideFeedback } from '../components/GuideFeedback';
import { calculateReadingTime } from '../lib/utils';
import { AdSense } from '../components/ads/AdSense';

export function GuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const guide = slug ? getGuideBySlug(slug) : undefined;
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [showTableOfContents, setShowTableOfContents] = useState<boolean>(false);
  const [readingTime, setReadingTime] = useState<number>(0);
  const [relatedGuides, setRelatedGuides] = useState<Guide[]>([]);
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function fetchContent() {
      if (!guide) return;
      
      try {
        setLoading(true);
        setContentLoaded(false);
        
        // Reset table of contents when loading a new guide
        setShowTableOfContents(false);
        
        const response = await fetch(guide.contentPath);
        
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.status}`);
        }
        
        const text = await response.text();
        setContent(text);
        setReadingTime(calculateReadingTime(text));
        setError(null);
        
        // Small delay to ensure DOM is updated before checking headings
        setTimeout(() => {
          setContentLoaded(true);
        }, 50);
        
      } catch (err) {
        console.error('Error loading content:', err);
        setError('Failed to load the guide content. Please try again later.');
        setContentLoaded(true);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
    
    // Get related guides defined in the guide data
    if (guide && guide.related) {
      const related = getRelatedGuidesByIds(guide.related);
      setRelatedGuides(related);
    } else {
      setRelatedGuides([]);
    }
  }, [guide]);

  // Check if we should show the table of contents (after content loads)
  useEffect(() => {
    if (contentLoaded && articleRef.current) {
      // Only show ToC if there are at least 2 headings
      const headings = articleRef.current.querySelectorAll('h1, h2, h3');
      setShowTableOfContents(headings.length >= 2);
      
      // If URL contains a hash, scroll to the corresponding element
      if (window.location.hash && contentLoaded) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          // Add a small delay to ensure rendering is complete
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    }
  }, [contentLoaded]);

  // Format the lastUpdated date for display, or show a default if not available
  const formattedDate = guide?.lastUpdated 
    ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(new Date(guide.lastUpdated))
    : 'N/A';

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
        article={true}
        canonical={`/guides/${guide.slug}`}
      />
      
      <div className="max-w-6xl mx-auto lg:px-4">
        {/* Breadcrumb navigation */}
        <div className="mb-6 flex items-center text-sm text-gray-400">
          <Link to="/" className="hover:text-primary transition-colors">
            Guides
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-300">{guide.title}</span>
        </div>
        
        {/* Guide header section - constrained to match content width */}
        <header className="mb-12">
          {guide.image && (
            <div className="relative mb-8 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 to-transparent z-10"></div>
              <div className="aspect-[3/1] min-h-[16rem]">
                <img 
                  src={guide.image} 
                  alt={guide.title} 
                  className="w-full h-full object-cover"
                  loading="eager" 
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover drop-shadow-[0_2px_4px_rgba(252,213,73,0.2)]">
                  {guide.title}
                </h1>
              </div>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="max-w-2xl">
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">{guide.description}</p>
              
              <div className="mt-4 flex items-center text-sm text-gray-400">
                <div className="flex items-center mr-4">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                  <span>{readingTime} min read</span>
                </div>
                {guide.lastUpdated && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                    </svg>
                    <span>Last updated: {formattedDate}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="self-start whitespace-nowrap">
              <Link to="/">
                <Button variant="secondary" className="flex-shrink-0 whitespace-nowrap">
                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="whitespace-nowrap">Back to Guides</span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Two column layout with ToC and content */}
        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          {/* Table of Contents sidebar - hidden on mobile, shown as sticky on desktop */}
          <aside className="hidden lg:block w-64 shrink-0 min-h-[1px] self-stretch">
            <div className="h-full sticky top-6 flex flex-col max-h-[calc(100vh-3rem)] overflow-hidden min-h-0">
              {showTableOfContents && (
                  <TableOfContents 
                    articleRef={articleRef as React.RefObject<HTMLElement>} 
                    className="grow overflow-hidden mb-4 bg-bg-elevated/30 border border-border-primary rounded-lg p-4"
                  />
              )}
              
              {/* Subtle sidebar ad below ToC */}
              <AdSense
                format="rectangle"
                slot="2345678901"
                className="hidden lg:block shrink-0 mt-auto"
              />
            </div>
          </aside>
          
          {/* Article content */}
          <div className="flex-1 lg:mx-0 min-w-0">
            {/* Mobile ToC (dropdown style) */}
            <div className="lg:hidden mb-6 min-h-[1px]">
              {showTableOfContents && (
                <details className="bg-bg-elevated/30 border border-border-primary rounded-lg">
                  <summary className="p-4 font-medium cursor-pointer text-primary-hover hover:bg-bg-elevated/50 rounded-lg transition-colors">
                    Table of Contents
                  </summary>
                  <div className="p-4 pt-0">
                    <TableOfContents articleRef={articleRef as React.RefObject<HTMLElement>} />
                  </div>
                </details>
              )}
            </div>
            
            {/* Guide content section - set a min-height for the article container */}
            <article 
              ref={articleRef}
              className="flex-1 min-w-0 bg-bg-elevated/30 rounded-lg p-6 border border-border-primary"
            >
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
              ) : error ? (
                <div className="text-red-400 p-4 border border-red-800 rounded-lg bg-red-900/20">
                  <h3 className="font-bold mb-2">Error Loading Guide</h3>
                  <p>{error}</p>
                  <div className="mt-4">
                    <Button onClick={() => window.location.reload()} variant="primary">
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <MarkdownContent content={content} baseImagePath={`/guides/${slug}`} />
                </>
              )}
                                
              {/* Bottom ad - shown after content */}
              <AdSense
                format="auto"
                slot="3456789012"
                className="mt-10 pt-6 border-t border-border-primary"
              />
              
              {/* Related guides - shown at the bottom if there are any */}
              {relatedGuides.length > 0 && (
                <div className="mt-10 pt-6 border-t border-border-primary">
                  <h2 className="text-xl font-bold text-primary mb-4">Related Guides</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedGuides.map(relatedGuide => (
                      <Link 
                        key={relatedGuide.id}
                        to={`/guides/${relatedGuide.slug}`}
                        className="p-4 rounded-lg border border-border-primary bg-bg-primary hover:bg-bg-elevated transition-colors"
                      >
                        <h3 className="font-bold text-primary mb-2">{relatedGuide.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{relatedGuide.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </div>
    </>
  );
} 