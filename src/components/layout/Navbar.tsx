import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-bg-secondary border-b border-border-primary py-4">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center space-x-8">
          <a href="https://77-bit.wiki" className="flex items-center" target="_blank" rel="noopener noreferrer">
            <img src="/images/77-bit_wiki.svg" alt="77-bit Wiki" className="h-8" />
          </a>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-text-primary hover:text-primary transition-colors">
              Guides
            </Link>
            <a href="https://map.77-bit.wiki" className="text-text-primary hover:text-primary transition-colors flex items-center gap-1" target="_blank" rel="noopener noreferrer">
              Maps
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://skills.77-bit.wiki" className="text-text-primary hover:text-primary transition-colors flex items-center gap-1" target="_blank" rel="noopener noreferrer">
              Skills
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
} 