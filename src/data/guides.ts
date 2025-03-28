export interface Guide {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  contentPath: string;
  lastUpdated?: Date;
  assetBasePath?: string;
}

export const guides: Guide[] = [
  {
    id: '1',
    title: 'All About Weapons',
    description: 'Here is your one-stop guide to know all you need to know about weapons in 77-Bit. From what types of weapon there are, what their stats are, where to acquire them, how to use them and how to upgrade them.',
    image: '/images/weapons.png',
    slug: 'all-about-weapons',
    contentPath: '/content/all-about-weapons.md',
    lastUpdated: new Date(2025, 2, 28), // March 28, 2025
    assetBasePath: '/content/all-about-weapons'
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(guide => guide.slug === slug);
}

export function getAllGuides(): Guide[] {
  return guides;
} 