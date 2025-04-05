import { Link } from "react-router-dom";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white font-redhat">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link 
            to="/"
            className="text-[#FCD549] hover:text-[#fce179] flex items-center gap-2 transition-colors duration-200"
          >
            ← Back to Home
          </Link>
          <img
            src="/images/77-bit_wiki.svg"
            width={210}
            height={67}
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="bg-gradient-to-t from-[#111111] to-[#0a0a0a] border border-[#FCD549] shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-lg p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FCD549] to-[#fce179] drop-shadow-[0_2px_4px_rgba(252,213,73,0.2)]">
            Support the Project
          </h1>
          
          <div className="space-y-8">
            <p className="text-gray-300 leading-relaxed">
              If you want to support this community project, you can do that simply by sending some SOL, ETH or PENGU.
              <br /><br />
              The funds will be used to pay for the server, hosting and project improvements!
            </p>

            <div className="space-y-6">
              <div className="bg-black/20 rounded-lg p-4 border border-[#FCD549]/20">
                <h2 className="text-[#FCD549] font-semibold mb-2">SOLANA</h2>
                <div className="bg-black/30 p-3 rounded font-mono text-sm text-gray-300 break-all">
                  8ucRV9NodrvvZyV7cnPkgLhpMXbsy5uyyE2CBoAfhatB
                </div>
              </div>

              <div className="bg-black/20 rounded-lg p-4 border border-[#FCD549]/20">
                <h2 className="text-[#FCD549] font-semibold mb-2">ABSTRACT WALLET</h2>
                <div className="bg-black/30 p-3 rounded font-mono text-sm text-gray-300 break-all">
                  0xf04643b20a7D6DA2379d129A27dbFa397F7249Bc
                </div>
              </div>
            </div>

            <p className="text-center text-xl text-[#FCD549]">
              Thanks a lot for your support!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 