import React, { useEffect, useState } from 'react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  articleRef: React.RefObject<HTMLElement>;
  className?: string;
  maxHeight?: string;
}

export function TableOfContents({ 
  articleRef, 
  className = '',
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!articleRef.current) return;

    // Get all headings from the article
    const article = articleRef.current;
    const headingElements = article.querySelectorAll<HTMLHeadingElement>('h1, h2, h3');

    // Process headings to create the TOC items
    // Track heading texts to handle duplicates
    const headingTextCount: Record<string, number> = {};
    
    const headingItems: HeadingItem[] = Array.from(headingElements).map((heading) => {
      const headingText = heading.textContent || '';
      
      // Get the original ID that was set by the MarkdownContent component
      let headingId = heading.id;
      
      // Check if this is a duplicate heading text and update the ID if necessary
      if (headingText in headingTextCount) {
        headingTextCount[headingText]++;
        
        // If the original ID doesn't already have a counter suffix,
        // update both the DOM element's ID and the one we'll use in the TOC
        if (!heading.id.match(/-\d+$/)) {
          const newId = `${heading.id}-${headingTextCount[headingText]}`;
          heading.id = newId;  // Update the actual DOM element ID
          headingId = newId;   // Use the new ID for the TOC
        }
      } else {
        headingTextCount[headingText] = 1;
      }
      
      return {
        id: headingId,
        text: headingText,
        level: parseInt(heading.tagName[1], 10),
      };
    });

    setHeadings(headingItems);

    // Set up intersection observer to highlight active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.1,
      }
    );

    // Observe all headings
    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      // Clean up the observer
      headingElements.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, [articleRef]);

  // If no headings, don't render
  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <h3 className="text-sm font-semibold uppercase text-yellow-500/90 mb-4 shrink-0">
        Table of Contents
      </h3>
      <div className="overflow-y-auto grow">
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li 
              key={heading.id}
              className="transition-all"
              style={{ 
                paddingLeft: `${(heading.level - 1) * 0.75}rem`,
                opacity: heading.level > 3 ? 0.7 : 1,
              }}
            >
              <a
                href={`#${heading.id}`}
                className={`block py-1 px-2 rounded hover:bg-bg-elevated transition-colors ${
                  activeId === heading.id
                    ? 'text-yellow-500 font-medium border-l-2 border-yellow-500/70 pl-2 -ml-0.5'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                    });
                    // Update the URL with the heading ID without triggering a page reload
                    window.history.pushState(null, '', `#${heading.id}`);
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 