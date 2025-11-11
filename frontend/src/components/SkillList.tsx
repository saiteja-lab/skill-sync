interface SkillsListProps {
  title: string;
  skills: string[];
  color?: string;
  textColor?: string;
}

export function SkillsList({
  title,
  skills,
  color = 'bg-gray-100',
  textColor = 'text-gray-800',
}: SkillsListProps) {
  return (
    <div className="p-4 bg-white shadow-md rounded-xl border">
      <h4 className="text-md font-semibold text-gray-700 mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-1 text-sm font-medium rounded-full ${color} ${textColor} border shadow-sm`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
