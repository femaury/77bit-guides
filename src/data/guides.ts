import guidesData from './guides.json';

export interface Guide {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  contentPath: string;
  lastUpdated?: string | Date;
  assetBasePath?: string;
  related?: string[]; // Array of related guide IDs
}

// Convert JSON data to Guide objects with proper date handling
export const guides: Guide[] = guidesData.map(guide => ({
  ...guide,
  // Convert string dates to Date objects if needed
  lastUpdated: guide.lastUpdated ? new Date(guide.lastUpdated) : undefined
}));

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(guide => guide.slug === slug);
}

export function getAllGuides(): Guide[] {
  return guides;
}

// Helper function to get related guides by IDs
export function getRelatedGuidesByIds(ids: string[] = []): Guide[] {
  if (!ids || ids.length === 0) return [];
  return guides.filter(guide => ids.includes(guide.id));
} 