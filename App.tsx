
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import BannerDesigner from './components/BannerDesigner';
import PreviewSection from './components/PreviewSection';
import { BannerInputs, GeneratedBanner } from './types';
import { generateLinkedInBanner } from './services/geminiService';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<BannerInputs>({
    name: '',
    jobTitle: '',
    services: '',
    customPrompt: '',
    userPhoto: null,
    referenceBanner: null,
  });

  const [currentBanner, setCurrentBanner] = useState<GeneratedBanner | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const url = await generateLinkedInBanner(inputs);
      setCurrentBanner({ url, timestamp: Date.now() });
      setSuccess(true);
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate banner. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (refinementPrompt: string) => {
    if (!currentBanner) return;
    setIsLoading(true);
    setError(null);
    try {
      const url = await generateLinkedInBanner(inputs, refinementPrompt, currentBanner.url);
      setCurrentBanner({ url, timestamp: Date.now() });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to refine banner. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Design Your Professional Future
          </h2>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl">
            Create a custom, high-converting LinkedIn banner using AI. 
            Optimized for visibility, typography, and personal branding.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">Banner generated successfully!</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <BannerDesigner 
              inputs={inputs} 
              setInputs={setInputs} 
              onGenerate={handleGenerate} 
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <PreviewSection 
              banner={currentBanner} 
              onRefine={handleRefine}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BannerAI Studio. Professional assets generated for LinkedIn creators.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Powered by Google Gemini 2.5 Flash Image API. Standard LinkedIn Banner Size: 1584 x 396 pixels.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
