
import React from 'react';
import { Layout, Camera, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-1.5 rounded-md">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Banner<span className="text-blue-600">AI</span> Studio
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
          <div className="flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Powered by Gemini 2.5</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
