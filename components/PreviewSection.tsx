
import React, { useState } from 'react';
import { GeneratedBanner } from '../types';
import { Download, RefreshCw, Wand2, Info } from 'lucide-react';

interface Props {
  banner: GeneratedBanner | null;
  onRefine: (prompt: string) => void;
  isLoading: boolean;
}

const PreviewSection: React.FC<Props> = ({ banner, onRefine, isLoading }) => {
  const [refinementText, setRefinementText] = useState('');

  const handleDownload = () => {
    if (!banner) return;
    const link = document.createElement('a');
    link.href = banner.url;
    link.download = `linkedin-banner-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (refinementText.trim() && !isLoading) {
      onRefine(refinementText);
      setRefinementText('');
    }
  };

  if (!banner) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="bg-blue-50 p-4 rounded-full">
          <ImageIcon className="w-12 h-12 text-blue-500" />
        </div>
        <div className="max-w-xs">
          <h3 className="text-xl font-bold text-gray-900">Your Preview Awaits</h3>
          <p className="text-gray-500 mt-2">Fill in your professional details and hit generate to see your custom LinkedIn banner.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 text-blue-500 ${isLoading ? 'animate-spin' : ''}`} />
            Live Preview
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
            >
              <Download className="w-4 h-4" />
              Download High-Res
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden group">
            {/* LinkedIn Banner Aspect Ratio: 1584 x 396 (4:1) */}
            <div className="aspect-[4/1] w-full relative">
              <img 
                src={banner.url} 
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
                alt="Generated LinkedIn Banner" 
              />
              
              {/* Overlay for profile pic simulation */}
              <div className="absolute left-[5%] bottom-[-25%] w-32 h-32 rounded-full border-4 border-white bg-gray-200 hidden md:block" />
            </div>
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-bold text-blue-900 animate-pulse">Polishing your brand...</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <Info className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <p>
              This is a standard LinkedIn banner layout. 
              The circle on the left simulates where your profile picture will overlap. 
              The AI ensures key text and visuals stay in the "safe zone."
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-amber-500" />
          AI Refinement Lab
        </h3>
        <p className="text-sm text-gray-600">
          Want a different vibe? Ask the AI to tweak the current design. Try "Make the background darker", "Change font to something more bold", or "Add a subtle grid texture".
        </p>
        
        <form onSubmit={handleRefineSubmit} className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Type your design feedback here..."
            value={refinementText}
            onChange={(e) => setRefinementText(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!refinementText.trim() || isLoading}
            className="px-6 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

// Helper Icon as it was used in code but not imported
const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);

export default PreviewSection;
