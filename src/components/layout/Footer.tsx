import React from 'react';

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-primary py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover">
              77-bit Guides
            </span>
            <p className="text-sm text-gray-400 mt-1">
              Unofficial player-created guides for 77-bit
            </p>
          </div>
          
          <div className="text-sm text-gray-400">
            <p>This is a community project and is not affiliated with the official 77-bit game.</p>
            <p className="mt-1">© {new Date().getFullYear()} 77-bit Guides. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 