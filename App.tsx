import React, { useState } from 'react';
import Header from './components/Header';
import ArtifactForm from './components/ArtifactForm';
import LoadingFact from './components/LoadingFact';
import DescriptionDisplay from './components/DescriptionDisplay';
import { generateArtifactDescription } from './services/geminiService';
import { ArtifactRequest } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const [currentRequest, setCurrentRequest] = useState<ArtifactRequest | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (request: ArtifactRequest) => {
    setLoading(true);
    setError(null);
    setDescription(null);
    setCurrentRequest(request);

    try {
      const result = await generateArtifactDescription(request);
      setDescription(result);
    } catch (err: any) {
      setError(err?.message || "Failed to generate description. Please check the API key or try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-museum-950 text-museum-100 font-sans selection:bg-gold-500 selection:text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-4 space-y-8">
            <section>
                <h2 className="text-2xl font-serif text-gold-500 mb-6 border-l-4 border-gold-600 pl-4">
                  Identify Artifact
                </h2>
                <ArtifactForm onSubmit={handleGenerate} isLoading={loading} />
            </section>
            
            <div className="bg-museum-900/50 p-6 rounded-lg border border-museum-800 text-sm text-museum-400">
                <h4 className="font-serif text-museum-200 mb-2 font-bold">How it works</h4>
                <p>
                    Enter the name of a historical object, monument, or document. 
                    You can optionally upload a photo to help the AI identify specific details.
                    Gemini AI will act as your personal museum curator.
                </p>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-serif text-gold-500 mb-6 border-l-4 border-gold-600 pl-4">
              Curator's Analysis
            </h2>
            
            {loading ? (
              <LoadingFact />
            ) : error ? (
              <div className="bg-red-900/20 border border-red-800 p-6 rounded-xl text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-200">{error}</p>
              </div>
            ) : description ? (
              <DescriptionDisplay content={description} image={currentRequest?.image || null} />
            ) : (
              <div className="flex flex-col items-center justify-center h-96 bg-museum-900/30 rounded-xl border-2 border-dashed border-museum-800 text-museum-500">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="font-serif text-lg">Awaiting artifact for analysis...</p>
              </div>
            )}
          </div>

        </div>
      </main>
      
      <footer className="py-6 text-center text-museum-600 text-sm border-t border-museum-800 mt-auto bg-museum-950">
        <p>&copy; {new Date().getFullYear()} Gemini Historical Artifact Explorer. Powered by Google Gemini AI.</p>
      </footer>
    </div>
  );
};

export default App;
