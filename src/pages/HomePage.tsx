import React from 'react';
import { getAllGuides } from '../data/guides';
import { GuideCard } from '../components/GuideCard';
import { SEO } from '../components/SEO';
import { AdSense } from '../components/ads/AdSense';

export function HomePage() {
  const guides = getAllGuides();
  
  // Split guides into chunks for inserting ads
  const chunkedGuides = guides.reduce((resultArray, guide, index) => {
    const chunkIndex = Math.floor(index / 6); // Insert ad after every 6 guides
    
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    
    resultArray[chunkIndex].push(guide);
    return resultArray;
  }, [] as typeof guides[]);

  return (
    <>
      <SEO title="77-Bit Guides" image='/images/77bit_wiki.png' url='/'/>
      
      <div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover drop-shadow-[0_2px_4px_rgba(252,213,73,0.2)] mb-4">
            Community Guides
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Community-created guides to help you navigate the world of 77-Bit.
            <br />
            Select a guide to start your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chunkedGuides.map((chunk, chunkIndex) => (
            <React.Fragment key={`chunk-${chunkIndex}`}>
              {chunk.map(guide => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
              
              {/* Display horizontal ad after each chunk except the last one */}
              {chunkIndex < chunkedGuides.length - 1 && (
                <AdSense
                  format="horizontal"
                  slot="1234567890"
                  className="col-span-full mx-auto max-w-4xl my-8"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
} 