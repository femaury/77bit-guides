import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  article?: boolean;
  canonical?: string;
}

export function SEO({ 
  title, 
  description, 
  image, 
  url,
  article = false,
  canonical
}: SEOProps) {
  const siteTitle = '77-bit Guides';
  const defaultDescription = 'Community-created guides for the 77-Bit game. Learn useful tips, game data, mechanics, and more.';
  const defaultImage = '/images/77bit_wiki.png';
  const siteUrl = 'https://guides.77-bit.wiki';
  
  // Ensure image path starts with a slash if it's not an absolute URL
  const normalizedImage = image && !image.startsWith('http') && !image.startsWith('/') 
    ? `/${image}` 
    : image || defaultImage;
  
  const metaImage = normalizedImage;
  const metaDescription = description || defaultDescription;
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl;
  const metaCanonical = canonical ? `${siteUrl}${canonical}` : metaUrl;
  
  // Convert relative image paths to absolute URLs
  const absoluteMetaImage = metaImage.startsWith('http') 
    ? metaImage 
    : `${siteUrl}${metaImage}`;

  // Direct DOM manipulation to ensure metadata is set
  useEffect(() => {
    // Set title
    document.title = `${title} | ${siteTitle}`;
    
    // Helper to create or update a meta tag
    const setMetaTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    // Set basic metadata
    setMetaTag('description', metaDescription);
    
    // Set Open Graph metadata
    setMetaTag('og:title', `${title} | ${siteTitle}`);
    setMetaTag('og:description', metaDescription);
    setMetaTag('og:image', absoluteMetaImage);
    setMetaTag('og:url', metaUrl);
    setMetaTag('og:type', article ? 'article' : 'website');
    
    // Set Twitter Card metadata
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', `${title} | ${siteTitle}`);
    setMetaTag('twitter:description', metaDescription);
    setMetaTag('twitter:image', absoluteMetaImage);
    
    // Set canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', metaCanonical);

    // Store SEO data in a global variable for pre-rendering
    // @ts-expect-error - This is for our build process
    window.__SEO_DATA__ = {
      title: `${title} | ${siteTitle}`,
      description: metaDescription,
      image: absoluteMetaImage,
      url: metaUrl,
      type: article ? 'article' : 'website',
      canonical: metaCanonical
    };
    
    // Cleanup function not needed as we want the metadata to persist
  }, [title, metaDescription, absoluteMetaImage, metaUrl, metaCanonical, article, siteTitle]);
  
  // Keep the Helmet component for SSG/prerendering support
  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: `${title} | ${siteTitle}`,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:image',
          content: absoluteMetaImage,
        },
        {
          property: 'og:url',
          content: metaUrl,
        },
        {
          property: 'og:type',
          content: article ? 'article' : 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: `${title} | ${siteTitle}`,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: absoluteMetaImage,
        },
      ]}
      link={[
        {
          rel: 'canonical',
          href: metaCanonical,
        },
      ]}
    >
      {/* Schema.org markup for Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': article ? 'Article' : 'WebSite',
          name: title,
          headline: title,
          description: metaDescription,
          image: absoluteMetaImage,
          url: metaUrl,
          author: {
            '@type': 'Organization',
            name: '77-bit Community',
          },
          publisher: {
            '@type': 'Organization',
            name: '77-bit Community',
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/images/logo.png`,
            },
          },
        })}
      </script>
    </Helmet>
  );
} 