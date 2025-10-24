import { useState, useEffect } from "react";
import { gameAPI } from "../services/api";
import QuestionCard from "./QuestionCard";
import CharacterResult from "./CharacterResult";
import AddCharacter from "./AddCharacter";

export default function GameBoard() {
  const [gameState, setGameState] = useState("idle"); // idle, playing, guessing, adding
  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(20);
  const [guessedCharacter, setGuessedCharacter] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topCandidates, setTopCandidates] = useState([]);

  const startNewGame = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await gameAPI.startGame();
      setSessionId(response.data.sessionId);
      setQuestion(response.data.question);
      setQuestionsAsked(response.data.questionsAsked);
      setMaxQuestions(response.data.maxQuestions);
      setGameState("playing");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to start game");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer) => {
    setLoading(true);
    setError(null);
    try {
      const response = await gameAPI.submitAnswer({
        sessionId,
        questionId: question.questionId,
        answer,
      });

      if (response.data.type === "guess") {
        setGuessedCharacter(response.data.character);
        setAlternatives(response.data.alternatives || []);
        setGameState("guessing");
      } else {
        setQuestion(response.data.question);
        setQuestionsAsked(response.data.questionsAsked);
        setTopCandidates(response.data.topCandidates || []);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit answer");
    } finally {
      setLoading(false);
    }
  };

  const handleCorrectGuess = async () => {
    try {
      await gameAPI.confirmGuess({
        sessionId,
        wasCorrect: true,
      });
      resetGame();
    } catch (err) {
      setError("Failed to confirm guess");
    }
  };

  const handleIncorrectGuess = () => {
    setGameState("adding");
  };

  const handleCharacterAdded = async (characterData) => {
    try {
      await gameAPI.addCharacter(characterData);
      await gameAPI.confirmGuess({
        sessionId,
        wasCorrect: false,
        correctCharacterId: characterData.characterId,
      });
      resetGame();
    } catch (err) {
      setError("Failed to add character");
    }
  };

  const resetGame = () => {
    setGameState("idle");
    setSessionId(null);
    setQuestion(null);
    setQuestionsAsked(0);
    setGuessedCharacter(null);
    setAlternatives([]);
    setTopCandidates([]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl animate-ping"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-300 to-indigo-400 mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-fadeIn">
            🔮 Akinator
          </h1>
          <p className="text-xl text-purple-200 font-light tracking-wide">
            Think of a character, I’ll guess it!
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-xl mb-5 shadow-lg animate-pulse">
            {error}
          </div>
        )}

        {/* Game States */}
        {gameState === "idle" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center border border-white/20 shadow-xl hover:shadow-fuchsia-500/20 transition-all duration-300">
            <div className="mb-6">
              <div className="text-7xl mb-4 animate-bounce">🎭</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Play?
              </h2>
              <p className="text-purple-200 text-lg mb-3">
                Think of any character from:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {["Movies", "TV Shows", "Comics", "Games", "History"].map(
                  (cat) => (
                    <span
                      key={cat}
                      className="bg-gradient-to-r from-purple-500/40 to-pink-500/30 px-5 py-2 rounded-full text-white shadow-sm hover:scale-105 transition-all duration-200"
                    >
                      {cat}
                    </span>
                  )
                )}
              </div>
            </div>
            <button
              onClick={startNewGame}
              disabled={loading}
              className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 text-white font-bold py-4 px-14 rounded-full text-xl shadow-lg hover:shadow-pink-500/30 hover:scale-110 transform transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Starting..." : "Start Game"}
            </button>
          </div>
        )}

        {gameState === "playing" && question && (
          <div className="animate-fadeIn">
            {/* Progress Bar */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-5 border border-white/10 shadow-md">
              <div className="flex justify-between text-white mb-2 text-sm font-light">
                <span>
                  Question {questionsAsked} of {maxQuestions}
                </span>
                <span>
                  {Math.round((questionsAsked / maxQuestions) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${(questionsAsked / maxQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Top Candidates */}
            {topCandidates.length > 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-5 border border-white/10 shadow-md">
                <p className="text-purple-200 text-sm mb-2 font-semibold tracking-wide">
                  🎯 Top Guesses:
                </p>
                <div className="flex gap-2 flex-wrap">
                  {topCandidates.map((candidate, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-purple-500/40 to-pink-500/30 px-3 py-1 rounded-full text-white text-sm hover:scale-105 transition-all duration-200"
                    >
                      {candidate.name} (
                      {Math.round(candidate.probability * 100)}%)
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Question Card */}
            <QuestionCard
              question={question}
              onAnswer={handleAnswer}
              loading={loading}
            />
          </div>
        )}

        {gameState === "guessing" && guessedCharacter && (
          <CharacterResult
            character={guessedCharacter}
            alternatives={alternatives}
            onCorrect={handleCorrectGuess}
            onIncorrect={handleIncorrectGuess}
            onPlayAgain={resetGame}
          />
        )}

        {gameState === "adding" && (
          <AddCharacter
            sessionId={sessionId}
            onSubmit={handleCharacterAdded}
            onCancel={resetGame}
          />
        )}
      </div>
    </div>
  );
}
