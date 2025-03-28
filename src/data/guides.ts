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
    title: 'How to Play 77-Bit',
    description: 'A quick guide to get you inside the 77-Bit browser MMORPG as smoothly as possible.',
    image: '/images/how-to-play.png',
    slug: 'how-to-play-77-bit',
    contentPath: '/content/how-to-play.md',
    lastUpdated: new Date(2025, 2, 28), // March 28, 2025
    assetBasePath: '/content/how-to-play'
  },
  {
    id: '2',
    title: 'Completing the in-game Tutorial',
    description: 'Guidelines to help you complete the in-game tutorial and get your first steps in 77-Bit.',
    image: '/images/tutorial.png',
    slug: 'tutorial',
    contentPath: '/content/tutorial.md',
    lastUpdated: new Date(2025, 2, 28), // March 28, 2025
    assetBasePath: '/content/tutorial'
  },
  {
    id: '3',
    title: 'Choosing a Class',
    description: 'An overview of the 77-Bit classes to help you choose the one that best suits your playstyle.',
    image: '/images/class-select.png',
    slug: 'choosing-a-class',
    contentPath: '/content/choosing-a-class.md',
    lastUpdated: new Date(2025, 2, 28), // March 28, 2025
    assetBasePath: '/content/choosing-a-class'
  },
  {
    id: '4',
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