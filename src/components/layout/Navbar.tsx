import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-bg-secondary border-b border-border-primary py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover drop-shadow-[0_2px_4px_rgba(252,213,73,0.2)]">
            77-bit Guides
          </span>
        </Link>
        
        <div className="flex space-x-6">
          <Link to="/" className="text-text-primary hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/guides/getting-started" className="text-text-primary hover:text-primary transition-colors">
            Getting Started
          </Link>
          <Link to="/guides/combat-mechanics" className="text-text-primary hover:text-primary transition-colors">
            Combat
          </Link>
          <Link to="/guides/main-quest-walkthrough" className="text-text-primary hover:text-primary transition-colors">
            Quests
          </Link>
        </div>
      </div>
    </nav>
  );
} 