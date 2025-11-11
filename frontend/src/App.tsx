import { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { InterviewResources } from './components/InterviewResources';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs';
import { Loader2 } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    jd_skills: string[];
    matched_skills: string[];
    missing_skills: string[];
    resume_skills: string[];
    score: number;
  } | null>(null);

  const handleAnalyze = async (resumeFile: File, jobDescFile: File) => {
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('job_description', jobDescFile);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await fetch(`${backendUrl}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-blue-100/50 py-6 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Resume Match
          </h1>
          <p className="text-gray-700 mt-2 text-sm md:text-base font-medium">
            Analyze how well your resume matches the job description
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Tabs defaultValue="analyzer" className="w-full animate-fade-in">
          <div className="flex justify-center mb-8 md:mb-12">
            <TabsList className="bg-white/60 backdrop-blur-lg shadow-xl shadow-blue-100/50 p-2 rounded-2xl border border-white/30">
              <TabsTrigger value="analyzer">Resume Analyzer</TabsTrigger>
              <TabsTrigger value="resources">Interview Resources</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="analyzer">
            {!results && !isLoading && (
              <FileUploader onAnalyze={handleAnalyze} />
            )}

            {isLoading && (
              <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-500/10 rounded-2xl flex flex-col items-center justify-center p-12 md:p-16">
                <Loader2 className="h-16 w-16 text-blue-600 animate-spin drop-shadow-lg" />
                <p className="mt-6 text-gray-700 text-lg md:text-xl font-semibold">Analyzing your documents...</p>
              </div>
            )}

            {error && (
              <div className="bg-white/80 backdrop-blur-xl bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-300/50 rounded-2xl shadow-2xl p-6 md:p-8 mb-6 animate-fade-in">
                <h3 className="text-red-800 font-bold text-xl mb-3">Error</h3>
                <p className="text-red-700 font-medium">{error}</p>
                <button 
                  onClick={() => setError(null)} 
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg shadow-red-500/50 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20"
                >
                  Try Again
                </button>
              </div>
            )}

            {results && !isLoading && (
              <div className="space-y-8 animate-fade-in">
                <ResultsDisplay results={results} />
                <div className="flex justify-center">
                  <button
                    onClick={() => setResults(null)}
                    className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/60 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
                  >
                    Analyze Another Resume
                  </button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources">
            <InterviewResources />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 backdrop-blur-xl border-t border-white/10 shadow-2xl shadow-black/20 text-white py-8 md:py-10 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm md:text-base font-medium text-white/90">&copy; {new Date().getFullYear()} Resume Match. All rights reserved.</p>
          <p className="mt-2 text-xs md:text-sm text-white/70">Powered by AI • Built with React & TailwindCSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;