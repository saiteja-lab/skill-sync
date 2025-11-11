import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Code, Brain } from 'lucide-react';

type ResourceType = 'tips' | 'questions' | 'brainteasers';

const jobTips = [
  {
    title: "Tailor Your Resume",
    content: "Customize your resume for each job application. Highlight relevant skills and experiences that match the job description. Use action verbs like 'Led', 'Developed', 'Implemented', 'Optimized'."
  },
  {
    title: "Use Keywords & ATS Optimization",
    content: "Include industry-specific keywords from the job posting to help your resume pass through Applicant Tracking Systems (ATS). Use standard section headings like 'Work Experience', 'Education', 'Skills'. Avoid tables, images, or complex formatting."
  },
  {
    title: "Quantify Achievements",
    content: "Use numbers and metrics to showcase your accomplishments. Examples: 'Increased website traffic by 45%', 'Reduced load time by 60%', 'Managed team of 8 developers', 'Delivered 15+ projects on time'."
  },
  {
    title: "Research the Company Thoroughly",
    content: "Before the interview, research the company's culture, values, products, recent news, competitors, and industry trends. Check their LinkedIn, Glassdoor reviews, and recent press releases. Prepare 3-5 thoughtful questions to ask the interviewer."
  },
  {
    title: "Master the STAR Method",
    content: "Develop 5-7 stories using the STAR method (Situation, Task, Action, Result) to effectively answer behavioral questions. Cover different scenarios: leadership, conflict resolution, failure, success, teamwork, and innovation."
  },
  {
    title: "Practice Mock Interviews",
    content: "Conduct mock interviews with friends or use platforms like Pramp, Interviewing.io. Record yourself to identify areas for improvement. Practice answering common questions out loud, not just in your head."
  },
  {
    title: "Prepare Your Introduction (Elevator Pitch)",
    content: "Create a compelling 60-90 second introduction covering: who you are, your background, key achievements, and why you're interested in this role. Practice until it sounds natural, not rehearsed."
  },
  {
    title: "Body Language & Communication",
    content: "Maintain eye contact, sit up straight, smile genuinely, and use hand gestures naturally. Speak clearly and at a moderate pace. Show enthusiasm and energy. For virtual interviews, look at the camera, not the screen."
  },
  {
    title: "Follow-Up Strategy",
    content: "Send a thank-you email within 24 hours. Reference specific topics discussed, reiterate your interest, and add any information you forgot to mention. Keep it concise (3-4 paragraphs) and professional."
  },
  {
    title: "Salary Negotiation Tips",
    content: "Research market rates using Glassdoor, Levels.fyi, Payscale. Let them make the first offer. When negotiating, provide a range with your target as the lower bound. Consider the entire package: equity, bonus, benefits, work-life balance."
  },
  {
    title: "Handle Gaps & Weaknesses",
    content: "Be honest about employment gaps but frame them positively (learning new skills, personal projects, family care). For weaknesses, choose real ones you're actively working to improve and explain your progress."
  },
  {
    title: "Technical Interview Preparation",
    content: "Practice coding problems on LeetCode, HackerRank, or CodeSignal. Focus on data structures (arrays, trees, graphs, hash tables) and algorithms (sorting, searching, dynamic programming). Explain your thought process while solving."
  }
];

const interviewQuestions = [
  {
    category: "Technical Skills - Web Development",
    questions: [
      "Explain the difference between REST and GraphQL APIs. When would you use each?",
      "What is the difference between let, const, and var in JavaScript? Explain hoisting.",
      "Explain how React's virtual DOM works and why it improves performance.",
      "What are closures in JavaScript? Provide a practical use case.",
      "Describe the CSS box model and the difference between border-box and content-box.",
      "Explain the event loop in JavaScript and how async/await works.",
      "What is the difference between SQL and NoSQL databases? When would you use each?",
      "Explain CORS and how to handle it in web applications.",
      "What are HTTP status codes? Explain 200, 201, 400, 401, 403, 404, 500.",
      "Describe different authentication methods: JWT, OAuth, Session-based."
    ]
  },
  {
    category: "System Design & Architecture",
    questions: [
      "How would you design a URL shortening service like bit.ly?",
      "Design a scalable notification system for millions of users.",
      "How would you implement a rate limiter for an API?",
      "Explain how you would design a real-time chat application.",
      "Design a caching strategy for a high-traffic e-commerce website.",
      "How would you design a file storage system like Dropbox?",
      "Explain microservices architecture vs monolithic architecture.",
      "How would you handle database scaling (sharding, replication, partitioning)?"
    ]
  },
  {
    category: "Problem-Solving & Algorithms",
    questions: [
      "How would you optimize a website's performance? List 10 techniques.",
      "Describe a challenging technical problem you've solved recently.",
      "How do you approach debugging a complex issue? Walk me through your process.",
      "Explain different sorting algorithms and their time complexities.",
      "How would you detect a cycle in a linked list?",
      "Implement a function to reverse a string without using built-in methods.",
      "Find the first non-repeating character in a string.",
      "How would you implement a LRU (Least Recently Used) cache?"
    ]
  },
  {
    category: "Behavioral - Leadership & Teamwork",
    questions: [
      "Tell me about a time you had to meet a tight deadline. How did you prioritize?",
      "Describe a situation where you had to work with a difficult team member. How did you handle it?",
      "Give an example of when you had to make a decision without complete information.",
      "Tell me about a time you failed. What did you learn?",
      "Describe a project you're particularly proud of and why.",
      "How do you handle conflicting priorities from multiple stakeholders?",
      "Tell me about a time you had to convince your team to adopt a new technology or approach.",
      "Describe a situation where you mentored or helped a junior team member."
    ]
  },
  {
    category: "Behavioral - Conflict & Challenges",
    questions: [
      "How do you handle criticism of your work?",
      "Give an example of how you've dealt with a major setback.",
      "Tell me about a time you disagreed with your manager. How did you handle it?",
      "Describe a situation where you had to adapt to significant changes.",
      "How do you handle stress and pressure in the workplace?",
      "Tell me about a time you made a mistake. How did you fix it?",
      "Describe a situation where you had to give difficult feedback to a colleague."
    ]
  },
  {
    category: "Company & Role Specific",
    questions: [
      "Why do you want to work for our company?",
      "What do you know about our products/services?",
      "Where do you see yourself in 5 years?",
      "Why are you leaving your current job?",
      "What are your salary expectations?",
      "What makes you a good fit for this role?",
      "What are your greatest strengths and weaknesses?",
      "Why should we hire you over other candidates?",
      "What questions do you have for us?"
    ]
  },
  {
    category: "Technical - Data Structures",
    questions: [
      "Explain the difference between an array and a linked list. When would you use each?",
      "What is a hash table and how does it work? What is time complexity?",
      "Explain different types of trees: Binary Tree, BST, AVL, Red-Black.",
      "What is the difference between a stack and a queue? Provide use cases.",
      "Explain graph traversal algorithms: BFS vs DFS.",
      "What is dynamic programming? Explain with an example.",
      "Describe the difference between heap and stack memory."
    ]
  }
];

const brainTeasers = [
  {
    question: "You have 9 balls, all identical in appearance, but one is slightly heavier than the others. Using a balance scale, how can you identify the heavier ball with only two weighings?",
    answer: "Divide the balls into 3 groups of 3. Weigh 2 groups against each other. If they balance, the heavy ball is in the third group. If not, it's in the heavier group. Then weigh 2 balls from the identified group. If they balance, the third ball is the heavy one. If not, the heavier one on the scale is the answer."
  },
  {
    question: "You have a 3-gallon jug and a 5-gallon jug. How can you measure exactly 4 gallons of water?",
    answer: "Fill the 5-gallon jug. Pour from it into the 3-gallon jug until the 3-gallon jug is full. This leaves 2 gallons in the 5-gallon jug. Empty the 3-gallon jug. Pour the 2 gallons from the 5-gallon jug into the 3-gallon jug. Fill the 5-gallon jug again and pour 1 more gallon into the 3-gallon jug (until it's full). That leaves exactly 4 gallons in the 5-gallon jug."
  },
  {
    question: "If you have a cake and need to cut it into 8 equal pieces, how many straight-line cuts do you need to make?",
    answer: "You need 3 cuts. Cut the cake into 4 equal pieces with 2 perpendicular cuts through the center. Then stack all 4 pieces and make 1 horizontal cut through the middle, giving you 8 equal pieces."
  },
  {
    question: "A farmer needs to cross a river with a fox, a chicken, and a bag of grain. The boat can only hold the farmer and one other item. The fox cannot be left alone with the chicken, and the chicken cannot be left alone with the grain. How does the farmer get everything across?",
    answer: "First, the farmer takes the chicken across and returns alone. Second, the farmer takes the fox across and brings the chicken back. Third, the farmer takes the grain across and returns alone. Finally, the farmer takes the chicken across. This way, the fox and chicken, or the chicken and grain, are never left alone together."
  },
  {
    question: "You have 100 doors in a row that are all initially closed. You make 100 passes by the doors. The first time through, you visit every door and toggle its state (if closed, open it; if open, close it). The second time, you only visit every 2nd door (door #2, #4, #6, ...). The third time, every 3rd door (door #3, #6, #9, ...), etc. After 100 passes, which doors are open?",
    answer: "Only the doors that are perfect squares (1, 4, 9, 16, 25, 36, 49, 64, 81, 100) will be open. This is because perfect squares have an odd number of divisors, meaning they get toggled an odd number of times and end up open."
  },
  {
    question: "You have two ropes, each of which takes exactly 60 minutes to burn completely. However, they don't burn at a uniform rate. How can you measure exactly 45 minutes using these two ropes and matches?",
    answer: "Light both ends of the first rope and one end of the second rope simultaneously. When the first rope burns out (30 minutes), light the other end of the second rope. It will take another 15 minutes to burn completely, giving you exactly 45 minutes total."
  },
  {
    question: "You're in a room with three light switches, each controlling one of three light bulbs in another room. You can only enter the other room once. How can you determine which switch controls which bulb?",
    answer: "Turn on switch 1 and leave it on for 10 minutes. Then turn it off and turn on switch 2. Go to the other room. The bulb that's on is controlled by switch 2. Touch the other two bulbs - the warm one is controlled by switch 1, and the cold one is controlled by switch 3."
  },
  {
    question: "A man has to get a fox, a chicken, and a sack of corn across a river. He has a rowboat, but it can only carry him and one other thing. If the fox and the chicken are left together, the fox will eat the chicken. If the chicken and the corn are left together, the chicken will eat the corn. How does he get them all across safely?",
    answer: "1) Take the chicken across. 2) Return alone. 3) Take the fox across. 4) Bring the chicken back. 5) Take the corn across. 6) Return alone. 7) Take the chicken across again."
  },
  {
    question: "You have 12 identical-looking coins, but one is counterfeit and weighs slightly different (you don't know if it's heavier or lighter). Using a balance scale only 3 times, how can you identify the counterfeit coin and determine if it's heavier or lighter?",
    answer: "Label coins 1-12. First weighing: (1,2,3,4) vs (5,6,7,8). If balanced, counterfeit is in 9-12. If unbalanced, counterfeit is in 1-8. Second weighing depends on first result. Third weighing confirms the specific coin and whether it's heavier or lighter. This requires careful tracking of which group was heavier/lighter in each weighing."
  },
  {
    question: "Why are manhole covers round?",
    answer: "Multiple reasons: 1) A round cover can't fall through its circular opening (unlike square covers which could fall diagonally). 2) They're easier to roll and move. 3) No need to align them when replacing. 4) Circular shape distributes pressure evenly. 5) Easier to manufacture. This tests practical thinking and ability to consider multiple perspectives."
  },
  {
    question: "How many gas stations are there in the United States? (Estimation question)",
    answer: "Approach: US population ~330M, ~250M cars. Average car fills up every 2 weeks (26 times/year). Each station serves ~1000 customers/day (365K/year). Total fill-ups: 250M × 26 = 6.5B/year. Stations needed: 6.5B ÷ 365K ≈ 178,000 stations. (Actual: ~150,000). This tests your ability to break down complex problems and make reasonable assumptions."
  },
  {
    question: "You have a 5L jug and a 3L jug. How do you measure exactly 1L?",
    answer: "1) Fill the 3L jug and pour it into the 5L jug. 2) Fill the 3L jug again and pour into the 5L jug until it's full (leaving 1L in the 3L jug). Alternative: Fill 5L, pour into 3L (leaving 2L in 5L), empty 3L, pour 2L from 5L into 3L, fill 5L again, pour into 3L until full (uses 1L from 5L, leaving 4L), empty 3L, pour 4L into 3L (leaving 1L in 5L)."
  }
];

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function CollapsibleSection({ title, icon, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-xl overflow-hidden mb-4 shadow-md hover:shadow-lg transition-all duration-300">
      <button
        className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 text-left hover:from-blue-100/50 hover:to-indigo-100/50 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon}
          <h3 className="text-lg md:text-xl font-bold text-gray-800 ml-3">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-6 w-6 text-blue-600" />
        ) : (
          <ChevronDown className="h-6 w-6 text-blue-600" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-5 bg-white/50 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

export function InterviewResources() {
  const [selectedType, setSelectedType] = useState<ResourceType>('tips');
  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: number]: boolean }>({});

  const toggleAnswer = (index: number) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-500/10 rounded-2xl p-6 md:p-10 animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">Interview Resources & Preparation Guide</h2>
      
      <div className="flex flex-wrap gap-3 mb-8 p-2 bg-white/60 backdrop-blur-lg shadow-xl shadow-blue-100/50 rounded-2xl border border-white/30">
        <button
          onClick={() => setSelectedType('tips')}
          className={`px-6 py-3 text-sm md:text-base font-bold rounded-xl transition-all duration-300 ${
            selectedType === 'tips'
              ? 'bg-gradient-to-br from-white to-blue-50 text-blue-700 shadow-lg shadow-blue-200/50 border border-white/50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          💡 Job Tips
        </button>
        <button
          onClick={() => setSelectedType('questions')}
          className={`px-6 py-3 text-sm md:text-base font-bold rounded-xl transition-all duration-300 ${
            selectedType === 'questions'
              ? 'bg-gradient-to-br from-white to-blue-50 text-blue-700 shadow-lg shadow-blue-200/50 border border-white/50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          ❓ Interview Questions
        </button>
        <button
          onClick={() => setSelectedType('brainteasers')}
          className={`px-6 py-3 text-sm md:text-base font-bold rounded-xl transition-all duration-300 ${
            selectedType === 'brainteasers'
              ? 'bg-gradient-to-br from-white to-blue-50 text-blue-700 shadow-lg shadow-blue-200/50 border border-white/50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          🧠 Brain Teasers
        </button>
      </div>
      
      {selectedType === 'tips' && (
        <div className="space-y-4 animate-fade-in">
          {jobTips.map((tip, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200/50 rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="font-bold text-lg text-blue-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">✓</span>
                {tip.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{tip.content}</p>
            </div>
          ))}
        </div>
      )}
      
      {selectedType === 'questions' && (
        <div>
          {interviewQuestions.map((category, index) => (
            <CollapsibleSection 
              key={index} 
              title={category.category} 
              icon={category.category === "Technical Skills" ? (
                <Code className="h-5 w-5 text-indigo-500" />
              ) : (
                <BookOpen className="h-5 w-5 text-indigo-500" />
              )}
            >
              <ul className="space-y-3">
                {category.questions.map((question, qIndex) => (
                  <li key={qIndex} className="bg-gradient-to-r from-slate-50 to-blue-50/30 border border-slate-200/50 p-4 rounded-lg hover:shadow-md transition-all duration-200">
                    <p className="text-gray-800 font-medium flex items-start">
                      <span className="text-blue-600 font-bold mr-2 mt-0.5">{qIndex + 1}.</span>
                      <span>{question}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          ))}
        </div>
      )}
      
      {selectedType === 'brainteasers' && (
        <div className="space-y-6 animate-fade-in">
          {brainTeasers.map((teaser, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50/50 border border-purple-200/50 rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-start">
                <Brain className="h-7 w-7 text-purple-600 mt-1 mr-3 flex-shrink-0 drop-shadow" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-4 leading-relaxed">{teaser.question}</h3>
                  
                  {revealedAnswers[index] ? (
                    <div className="mt-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg border-2 border-purple-300/50 shadow-inner animate-fade-in">
                      <p className="text-gray-700 font-medium leading-relaxed">
                        <span className="text-purple-700 font-bold">💡 Answer: </span>
                        {teaser.answer}
                      </p>
                    </div>
                  ) : null}
                  
                  <button
                    onClick={() => toggleAnswer(index)}
                    className="mt-4 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    {revealedAnswers[index] ? '🔒 Hide Answer' : '🔓 Show Answer'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}