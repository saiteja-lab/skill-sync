import { CheckCircle, XCircle, FileText } from 'lucide-react';

interface SkillsListProps {
  title: string;
  skills: string[];
  color: string;
  textColor: string;
}

export function SkillsList({ title, skills, color, textColor }: SkillsListProps) {
  // Determine which icon to use based on the title
  const getIcon = () => {
    if (title === 'Matched Skills') return <CheckCircle className="w-5 h-5 text-green-500 mr-2" />;
    if (title === 'Missing Skills') return <XCircle className="w-5 h-5 text-red-500 mr-2" />;
    return <FileText className="w-5 h-5 text-blue-500 mr-2" />;
  };

  return (
    <div className={`bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl ${color} p-5 border-2 border-white/30`}>
      <div className="flex items-center mb-4">
        {getIcon()}
        <h4 className={`font-bold text-base ${textColor}`}>{title}</h4>
      </div>
      
      {skills.length > 0 ? (
        <ul className="space-y-2.5">
          {skills.map((skill, index) => (
            <li key={index} className="text-gray-700 text-sm flex items-start">
              <span className="mr-2">•</span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm italic">No skills found</p>
      )}
    </div>
  );
}