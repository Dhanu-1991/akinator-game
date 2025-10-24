export default function QuestionCard({ question, onAnswer, loading }) {
  const answers = [
    {
      value: "yes",
      label: "Yes",
      emoji: "✅",
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "probably",
      label: "Probably",
      emoji: "🤔",
      color: "from-lime-500 to-green-500",
    },
    {
      value: "unknown",
      label: "Don't Know",
      emoji: "❓",
      color: "from-gray-500 to-slate-500",
    },
    {
      value: "probably_not",
      label: "Probably Not",
      emoji: "🤨",
      color: "from-orange-500 to-red-500",
    },
    {
      value: "no",
      label: "No",
      emoji: "❌",
      color: "from-red-500 to-rose-500",
    },
  ];

  return (
    <div className="flex flex-col items-center space-y-10 p-8 relative overflow-hidden">
      {/* Floating gradient lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-ping" />
      </div>

      {/* Question Text */}
      <div className="text-center space-y-5 relative z-10">
        <div className="text-7xl animate-bounce">🤔</div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] animate-fadeIn">
          {question.text}
        </h2>
      </div>

      {/* Answer Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-4xl relative z-10">
        {answers.map((answer) => (
          <button
            key={answer.value}
            onClick={() => onAnswer(answer.value)}
            disabled={loading}
            className={`bg-gradient-to-r ${answer.color} text-white font-semibold py-6 px-8 rounded-2xl text-lg shadow-lg hover:shadow-pink-500/40 transform hover:scale-110 transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-3xl animate-pulse">{answer.emoji}</span>
              <span className="tracking-wide">{answer.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-pink-300 text-xl animate-pulse mt-4 font-medium tracking-wider">
          Thinking...
        </div>
      )}
    </div>
  );
}
