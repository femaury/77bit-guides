import { getAllGuides } from '../data/guides';
import { GuideCard } from '../components/GuideCard';
import { SEO } from '../components/SEO';

export function HomePage() {
  const guides = getAllGuides();

  return (
    <>
      <SEO title="77-Bit Guides" image='/images/77bit_wiki.png' url='/'/>
      
      <div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover drop-shadow-[0_2px_4px_rgba(252,213,73,0.2)] mb-4">
            Community Guides
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Community-created guides to help you navigate the world of 77-Bit. Select a guide to start your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map(guide => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </div>
    </>
  );
} 