
import React, { useRef } from 'react';
import { BannerInputs } from '../types';
import { User, Briefcase, List, Palette, Upload, Image as ImageIcon, X } from 'lucide-react';

interface Props {
  inputs: BannerInputs;
  setInputs: (inputs: BannerInputs) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const BannerDesigner: React.FC<Props> = ({ inputs, setInputs, onGenerate, isLoading }) => {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const refInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'userPhoto' | 'referenceBanner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputs({ ...inputs, [type]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (type: 'userPhoto' | 'referenceBanner') => {
    setInputs({ ...inputs, [type]: null });
  };

  const isFormValid = inputs.name && inputs.jobTitle && inputs.services;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          Banner Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
              <User className="w-3 h-3" /> Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
              placeholder="e.g. Alex Johnson"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> Job Position
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
              placeholder="e.g. Senior Software Engineer"
              value={inputs.jobTitle}
              onChange={(e) => setInputs({ ...inputs, jobTitle: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
            <List className="w-3 h-3" /> Services / Expertise
          </label>
          <textarea
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none h-20 text-gray-900 placeholder-gray-400 font-medium"
            placeholder="e.g. Cloud Architecture • React Native • UX Strategy"
            value={inputs.services}
            onChange={(e) => setInputs({ ...inputs, services: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">Design Prompt (Optional)</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
            placeholder="e.g. Minimalist dark theme with neon blue accents"
            value={inputs.customPrompt}
            onChange={(e) => setInputs({ ...inputs, customPrompt: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-semibold text-gray-900">Upload Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Professional Photo</label>
            {inputs.userPhoto ? (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group">
                <img src={inputs.userPhoto} className="w-full h-full object-cover" alt="User" />
                <button 
                  onClick={() => removeFile('userPhoto')}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => photoInputRef.current?.click()}
                className="w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-500"
              >
                <Upload className="w-8 h-8" />
                <span className="text-xs font-medium">Upload Headshot</span>
              </button>
            )}
            <input 
              type="file" 
              ref={photoInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'userPhoto')}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Reference (Optional)</label>
            {inputs.referenceBanner ? (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group">
                <img src={inputs.referenceBanner} className="w-full h-full object-cover" alt="Ref" />
                <button 
                  onClick={() => removeFile('referenceBanner')}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => refInputRef.current?.click()}
                className="w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-500"
              >
                <ImageIcon className="w-8 h-8" />
                <span className="text-xs font-medium">Style Inspiration</span>
              </button>
            )}
            <input 
              type="file" 
              ref={refInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'referenceBanner')}
            />
          </div>
        </div>
      </div>

      <button
        disabled={!isFormValid || isLoading}
        onClick={onGenerate}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] ${
          isFormValid && !isLoading
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </div>
        ) : (
          'Generate Professional Banner'
        )}
      </button>
    </div>
  );
};

export default BannerDesigner;
