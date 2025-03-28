export function Footer() {
  return (
    <footer className="bg-black/40 border-t border-[#FCD549]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center space-x-8">
            <div className="flex flex-col items-center">
              <span className="text-sm text-[#FCD549] mb-1 font-redhat">Kevzko</span>
              <a 
                href="https://x.com/kevzko_eth" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#FCD549] hover:text-[#fce179] transition-colors duration-300"
              >
                <span className="sr-only">Kevzko Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-[#FCD549] mb-1 font-redhat">Wareep</span>
              <a 
                href="https://x.com/itswareep" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#FCD549] hover:text-[#fce179] transition-colors duration-300"
              >
                <span className="sr-only">Wareep Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
            </div>
          </div>
          <a 
            href="https://77-bit.wiki/support" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FCD549] hover:text-[#fce179] transition-colors duration-300 font-redhat"
          >
            Support the Project
          </a>
        </div>
      </div>
    </footer>
  );
} 