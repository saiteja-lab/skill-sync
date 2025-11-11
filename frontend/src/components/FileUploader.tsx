import { useState } from 'react';
import { FileUp, File as FileIcon, X } from 'lucide-react';

interface FileUploaderProps {
  onAnalyze: (resumeFile: File, jobDescFile: File) => void;
}

export function FileUploader({ onAnalyze }: FileUploaderProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent, type: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(type);
    } else if (e.type === "dragleave") {
      setDragActive(null);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'resume' | 'jobDesc') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], type);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'jobDesc') => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], type);
    }
  };

  const handleFile = (file: File, type: 'resume' | 'jobDesc') => {
    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    if (!validTypes.includes(file.type)) {
      alert(`Invalid file type. Please upload a PDF or Word document.`);
      return;
    }

    if (type === 'resume') {
      setResumeFile(file);
    } else {
      setJobDescFile(file);
    }
  };

  const removeFile = (type: 'resume' | 'jobDesc') => {
    if (type === 'resume') {
      setResumeFile(null);
    } else {
      setJobDescFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeFile && jobDescFile) {
      onAnalyze(resumeFile, jobDescFile);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-500/10 rounded-2xl p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">Upload Your Documents</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Resume Upload */}
          <div className="space-y-3">
            <label className="block text-base font-bold text-gray-800 mb-2">
              Your Resume
            </label>
            {!resumeFile ? (
              <div 
                className={`relative bg-gradient-to-br from-white to-blue-50/50 border-2 border-dashed rounded-xl backdrop-blur-sm transition-all duration-300 shadow-lg shadow-blue-100/50 p-8 flex flex-col items-center justify-center cursor-pointer min-h-[180px] ${
                  dragActive === 'resume' 
                    ? 'border-blue-500 bg-gradient-to-br from-blue-100 to-indigo-100 shadow-2xl shadow-blue-300/70' 
                    : 'border-blue-300/50 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50/50 hover:shadow-xl hover:shadow-blue-200/60 hover:scale-[1.02]'
                }`}
                onDragEnter={(e) => handleDrag(e, 'resume')}
                onDragLeave={(e) => handleDrag(e, null)}
                onDragOver={(e) => handleDrag(e, 'resume')}
                onDrop={(e) => handleDrop(e, 'resume')}
                onClick={() => document.getElementById('resume-upload')?.click()}
              >
                <FileUp className="h-12 w-12 text-blue-500 mb-3 drop-shadow-md" />
                <p className="text-sm md:text-base text-gray-600 text-center font-medium">
                  <span className="font-bold text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-2 font-medium">PDF or Word documents</p>
                <input
                  id="resume-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.doc"
                  onChange={(e) => handleFileChange(e, 'resume')}
                />
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5 flex items-center justify-between border-2 border-blue-300/50 rounded-2xl animate-fade-in">
                <div className="flex items-center">
                  <FileIcon className="h-6 w-6 text-blue-600 mr-3 drop-shadow" />
                  <span className="text-sm md:text-base text-gray-800 font-semibold truncate max-w-xs">
                    {resumeFile.name}
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={() => removeFile('resume')}
                  className="text-gray-400 hover:text-red-600 hover:scale-110 transition-all duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>

          {/* Job Description Upload */}
          <div className="space-y-3">
            <label className="block text-base font-bold text-gray-800 mb-2">
              Job Description
            </label>
            {!jobDescFile ? (
              <div 
                className={`relative bg-gradient-to-br from-white to-blue-50/50 border-2 border-dashed rounded-xl backdrop-blur-sm transition-all duration-300 shadow-lg shadow-blue-100/50 p-8 flex flex-col items-center justify-center cursor-pointer min-h-[180px] ${
                  dragActive === 'jobDesc' 
                    ? 'border-blue-500 bg-gradient-to-br from-blue-100 to-indigo-100 shadow-2xl shadow-blue-300/70' 
                    : 'border-blue-300/50 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50/50 hover:shadow-xl hover:shadow-blue-200/60 hover:scale-[1.02]'
                }`}
                onDragEnter={(e) => handleDrag(e, 'jobDesc')}
                onDragLeave={(e) => handleDrag(e, null)}
                onDragOver={(e) => handleDrag(e, 'jobDesc')}
                onDrop={(e) => handleDrop(e, 'jobDesc')}
                onClick={() => document.getElementById('jobdesc-upload')?.click()}
              >
                <FileUp className="h-12 w-12 text-blue-500 mb-3 drop-shadow-md" />
                <p className="text-sm md:text-base text-gray-600 text-center font-medium">
                  <span className="font-bold text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-2 font-medium">PDF or Word documents</p>
                <input
                  id="jobdesc-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.doc"
                  onChange={(e) => handleFileChange(e, 'jobDesc')}
                />
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5 flex items-center justify-between border-2 border-blue-300/50 rounded-2xl animate-fade-in">
                <div className="flex items-center">
                  <FileIcon className="h-6 w-6 text-blue-600 mr-3 drop-shadow" />
                  <span className="text-sm md:text-base text-gray-800 font-semibold truncate max-w-xs">
                    {jobDescFile.name}
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={() => removeFile('jobDesc')}
                  className="text-gray-400 hover:text-red-600 hover:scale-110 transition-all duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={!resumeFile || !jobDescFile}
            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              resumeFile && jobDescFile
                ? 'relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/60 hover:scale-105 active:scale-95 border border-white/20'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60 shadow-md'
            }`}
          >
            Analyze Match
          </button>
        </div>
      </form>
    </div>
  );
}