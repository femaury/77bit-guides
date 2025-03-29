import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEO({ title, description, image, url }: SEOProps) {
  const siteTitle = '77-bit Guides';
  const defaultDescription = 'Community-created guides for the 77-Bit game. Learn useful tips, game data, mechanics, and more.';
  const defaultImage = '/images/77bit_wiki.png';
  const siteUrl = 'https://guides.77-bit.wiki';

  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl;
  
  // Convert relative image paths to absolute URLs
  const absoluteMetaImage = metaImage.startsWith('http') 
    ? metaImage 
    : `${siteUrl}${metaImage}`;

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
          content: 'website',
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
    />
  );
} 