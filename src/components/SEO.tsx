import { useEffect } from 'react';

interface SEOProps {
  title?: string;
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
  const siteTitle = '77-Bit Wiki';
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'Your ultimate companion for game progression, exploration, and strategy. Access interactive maps, skill calculators, and comprehensive guides.';
  const defaultImage = '/images/77bit_wiki.png';
  const siteUrl = 'https://77-bit.wiki';
  
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

  // Direct DOM manipulation to ensure metadata is set only on client side when not prerendered
  useEffect(() => {
    // Don't modify metadata if prerendered version exists
    // @ts-expect-error - This comes from our prerender script
    if (window.__PRERENDERED_METADATA__) {
      // Just set the window.__SEO_DATA__ variable for consistency
      // @ts-expect-error - This is for our build process
      window.__SEO_DATA__ = {
        title: pageTitle,
        description: metaDescription,
        image: absoluteMetaImage,
        url: metaUrl,
        type: article ? 'article' : 'website',
        canonical: metaCanonical
      };
      return;
    }
    
    // Set title
    document.title = pageTitle;
    
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
    setMetaTag('og:title', pageTitle);
    setMetaTag('og:description', metaDescription);
    setMetaTag('og:image', absoluteMetaImage);
    setMetaTag('og:url', metaUrl);
    setMetaTag('og:type', article ? 'article' : 'website');
    
    // Set Twitter Card metadata
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', pageTitle);
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

    // Set JSON-LD structured data
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    
    jsonLdScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': article ? 'Article' : 'WebSite',
      name: title,
      headline: title,
      description: metaDescription,
      image: absoluteMetaImage,
      url: metaUrl,
      author: {
        '@type': 'Organization',
        name: '77-Bit Community',
      },
      publisher: {
        '@type': 'Organization',
        name: '77-Bit Community',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo.png`,
        },
      },
    });

    // Store SEO data in a global variable for pre-rendering
    // @ts-expect-error - This is for our build process
    window.__SEO_DATA__ = {
      title: pageTitle,
      description: metaDescription,
      image: absoluteMetaImage,
      url: metaUrl,
      type: article ? 'article' : 'website',
      canonical: metaCanonical
    };
    
  }, [title, metaDescription, absoluteMetaImage, metaUrl, metaCanonical, article, siteTitle, pageTitle]);
  
  // No need to return a Helmet component anymore
  return null;
} 