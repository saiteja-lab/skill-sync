import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SkillsBarChartProps {
  resumeSkills: number;
  jdSkills: number;
  matchedSkills: number;
}

export function SkillsBarChart({ resumeSkills, jdSkills, matchedSkills }: SkillsBarChartProps) {
  const data = [
    {
      name: 'Skills Count',
      'Resume Skills': resumeSkills,
      'JD Skills': jdSkills,
      'Matched Skills': matchedSkills,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" hide />
        <Tooltip 
          formatter={(value, name) => [`${value}`, name]}
          contentStyle={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: 'none'
          }}
        />
        <Legend />
        <Bar dataKey="JD Skills" fill="#3B82F6" radius={[4, 4, 4, 4]} />
        <Bar dataKey="Resume Skills" fill="#10B981" radius={[4, 4, 4, 4]} />
        <Bar dataKey="Matched Skills" fill="#6366F1" radius={[4, 4, 4, 4]} />
      </BarChart>
    </ResponsiveContainer>
  );
}