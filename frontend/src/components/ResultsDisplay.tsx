import { useState } from 'react';
import { SkillsBarChart } from './charts/SkillsBarChart';
import { SkillsMatchPieChart } from './charts/SkillsMatchPieChart';
import { SkillsList } from './SkillsList';
import { ArrowDownCircle, ArrowUpCircle, Lightbulb } from 'lucide-react';

interface ResultsDisplayProps {
  results?: {
    jd_skills?: string[];
    matched_skills?: string[];
    missing_skills?: string[];
    resume_skills?: string[];
    score?: number;
    suggestions_for_improvements?: string;
  } | null;
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Early guard: if results isn't passed yet, show a placeholder (or a loader)
  if (!results) {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Analysis Results</h2>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  // Normalize to safe defaults so we never call .length on undefined
  const safe = {
    jd_skills: results.jd_skills ?? [],
    matched_skills: results.matched_skills ?? [],
    missing_skills: results.missing_skills ?? [],
    resume_skills: results.resume_skills ?? [],
    score: results.score ?? 0,
    suggestions_for_improvements: results.suggestions_for_improvements ?? '',
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Average Match';
    return 'Poor Match';
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-500/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-blue-100/50 bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Analysis Results</h2>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-10">
          {/* Score Overview */}
          <div className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl p-8 shadow-2xl shadow-blue-500/20 border border-white/50 backdrop-blur-xl mb-8">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Your Resume Match Score</h3>
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className={`text-6xl md:text-7xl font-black ${getScoreColor(safe.score)} drop-shadow-lg`}>
                  {safe.score}%
                </span>
                <span className="text-gray-600 text-xl md:text-2xl font-bold">{getScoreText(safe.score)}</span>
              </div>
              <p className="mt-6 text-gray-700 text-base md:text-lg font-medium max-w-2xl mx-auto">
                Based on the analysis of your resume and the job description, here's how well your skills match.
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-xl shadow-slate-200/50 border border-white/50 backdrop-blur-sm">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Skills Comparison</h3>
              <div className="h-64">
                <SkillsBarChart
                  resumeSkills={safe.resume_skills.length}
                  jdSkills={safe.jd_skills.length}
                  matchedSkills={safe.matched_skills.length}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-xl shadow-slate-200/50 border border-white/50 backdrop-blur-sm">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Match Breakdown</h3>
              <div className="h-64">
                <SkillsMatchPieChart
                  matched={safe.matched_skills.length}
                  missing={safe.missing_skills.length}
                />
              </div>
            </div>
          </div>

          {/* AI Suggestions for Improvements */}
          {safe.suggestions_for_improvements && (
            <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50/50 border-2 border-amber-200/50 rounded-2xl p-6 md:p-8 shadow-xl animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Lightbulb className="h-8 w-8 text-amber-600 drop-shadow-md" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-amber-900 mb-4 flex items-center">
                    💡 AI-Powered Suggestions for Improvement
                  </h3>
                  <p className="text-gray-800 leading-relaxed text-base md:text-lg font-medium">
                    {safe.suggestions_for_improvements}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Toggle Button + Detailed Skills */}
          <div className="mt-10">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/60 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 flex items-center gap-2 mx-auto"
            >
              {showDetails ? (
                <>
                  <ArrowUpCircle className="w-5 h-5" />
                  <span className="font-bold">Hide Detailed Skill Breakdown</span>
                </>
              ) : (
                <>
                  <ArrowDownCircle className="w-5 h-5" />
                  <span className="font-bold">View Detailed Skill Breakdown</span>
                </>
              )}
            </button>

            {showDetails && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
                <SkillsList
                  title="Resume Skills"
                  skills={safe.resume_skills}
                  color="bg-purple-100"
                  textColor="text-purple-800"
                />

                <SkillsList
                  title="JD Skills"
                  skills={safe.jd_skills}
                  color="bg-blue-100"
                  textColor="text-blue-800"
                />

                <SkillsList
                  title="Matched Skills"
                  skills={safe.matched_skills}
                  color="bg-green-100"
                  textColor="text-green-800"
                />

                <SkillsList
                  title="Missing Skills"
                  skills={safe.missing_skills}
                  color="bg-red-100"
                  textColor="text-red-800"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
