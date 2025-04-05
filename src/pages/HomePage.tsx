import React, { useEffect } from 'react';
import { getAllGuides } from '../data/guides';
import { GuideCard } from '../components/GuideCard';
import { SEO } from '../components/SEO';
import { AdSense } from '../components/ads/AdSense';

export function HomePage() {
  const guides = getAllGuides();
  
  // Handle hash navigation when component mounts
  useEffect(() => {
    // If URL contains a hash, scroll to the corresponding element
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Add a small delay to ensure rendering is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);
  
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
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
          <div className="text-center">
            <img
              src="/images/77-bit_wiki.svg"
              alt="77-Bit Wiki"
              className="w-[240px] mx-auto mb-8"
            />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-redhat">
              Your ultimate companion for game progression, exploration, and strategy
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Interactive Map Card */}
          <a 
            href="https://map.77-bit.wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-t from-[#111111] to-[#0a0a0a] border border-[#FCD549]/20 rounded-lg p-6
              hover:border-[#FCD549] transition-all duration-300 transform hover:-translate-y-1
              shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(252,213,73,0.15)]"
          >
            <div className="h-12 w-12 mb-4 text-[#FCD549] group-hover:scale-110 transition-transform duration-300">
              <img src="/images/map.svg" alt="Map" className="w-full h-full [filter:invert(89%)_sepia(27%)_saturate(1419%)_hue-rotate(324deg)_brightness(103%)_contrast(104%)]" />
            </div>
            <h2 className="text-xl font-bold text-[#FCD549] mb-2 group-hover:text-[#fce179] transition-colors duration-300 font-radiona">
              Interactive Map
            </h2>
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 font-redhat">
              Explore the world with our interactive map. Find quests, NPCs, and important locations.
            </p>
          </a>

          {/* Skill Tree Card */}
          <a 
            href="https://skills.77-bit.wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-t from-[#111111] to-[#0a0a0a] border border-[#FCD549]/20 rounded-lg p-6
              hover:border-[#FCD549] transition-all duration-300 transform hover:-translate-y-1
              shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(252,213,73,0.15)]"
          >
            <div className="h-12 w-12 mb-4 text-[#FCD549] group-hover:scale-110 transition-transform duration-300">
              <img src="/images/skills.svg" alt="Skill Tree" className="w-full h-full [filter:invert(89%)_sepia(27%)_saturate(1419%)_hue-rotate(324deg)_brightness(103%)_contrast(104%)]" />
            </div>
            <h2 className="text-xl font-bold text-[#FCD549] mb-2 group-hover:text-[#fce179] transition-colors duration-300 font-radiona">
              Skill Tree
            </h2>
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 font-redhat">
              Plan your character progression with our detailed skill calculator and builder.
            </p>
          </a>
        </div>
      </div>

        <div className="text-center my-12">
          <h1 id="guides" className="text-5xl font-bold text-primary drop-shadow-[0_2px_4px_rgba(252,213,73,0.2)] mb-4">
            Guides
          </h1>
          {/* <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Community-created guides to help you navigate the world of 77-Bit.
            <br />
            Select a guide to start your journey.
          </p> */}
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