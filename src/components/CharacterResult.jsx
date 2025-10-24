export default function CharacterResult({
  character,
  alternatives,
  onCorrect,
  onIncorrect,
  onPlayAgain,
}) {
  return (
    <div className="flex flex-col items-center space-y-10 p-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-ping" />
      </div>

      {/* Success Animation */}
      <div className="text-center space-y-5 z-10">
        <div className="text-7xl animate-bounce">🎉</div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] animate-fadeIn">
          I'm thinking of...
        </h2>
      </div>

      {/* Character Card */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-lg shadow-purple-500/20 hover:shadow-pink-500/30 transform hover:scale-105 transition-all duration-300 z-10">
        {character.imageUrl && (
          <img
            src={character.imageUrl}
            alt={character.name}
            className="w-36 h-36 rounded-full mx-auto mb-5 object-cover border-4 border-purple-400 shadow-lg shadow-purple-600/40 animate-fadeIn"
          />
        )}
        <h3 className="text-3xl font-bold text-white text-center mb-3">
          {character.name}
        </h3>
        {character.description && (
          <p className="text-gray-300 text-center italic leading-relaxed">
            {character.description}
          </p>
        )}
      </div>

      {/* Alternatives */}
      {alternatives && alternatives.length > 0 && (
        <div className="text-center z-10 animate-fadeIn">
          <h4 className="text-xl font-semibold text-white mb-4 tracking-wide">
            Or maybe one of these?
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {alternatives.map((alt, idx) => (
              <span
                key={idx}
                className="bg-purple-500/30 text-white px-4 py-2 rounded-full text-sm border border-purple-400/50 shadow-md hover:shadow-pink-400/30 transition transform hover:scale-105"
              >
                {alt.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 z-10">
        <button
          onClick={onCorrect}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-8 rounded-lg hover:scale-110 transform transition duration-300 shadow-lg shadow-emerald-500/40"
        >
          ✅ Yes, that's correct!
        </button>
        <button
          onClick={onIncorrect}
          className="bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold py-3 px-8 rounded-lg hover:scale-110 transform transition duration-300 shadow-lg shadow-rose-500/40"
        >
          ❌ No, that's wrong
        </button>
        <button
          onClick={onPlayAgain}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-8 rounded-lg hover:scale-110 transform transition duration-300 shadow-lg shadow-cyan-500/40"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
}
