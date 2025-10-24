import { useState, useEffect } from "react";
import { adminAPI } from "../services/api";

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <div className="text-3xl font-bold text-white">{value}</div>
      </div>
      <div className="text-gray-300 mt-2">{title}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState("stats");
  const [newQuestion, setNewQuestion] = useState({ text: "", category: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStats();
    loadCharacters();
    loadQuestions();
  }, []);

  const loadStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  const loadCharacters = async () => {
    try {
      const response = await adminAPI.getCharacters();
      setCharacters(response.data.characters);
    } catch (error) {
      console.error("Failed to load characters:", error);
    }
  };

  const loadQuestions = async () => {
    try {
      const response = await adminAPI.getQuestions();
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Failed to load questions:", error);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminAPI.addQuestion(newQuestion);
      setNewQuestion({ text: "", category: "" });
      loadQuestions();
      alert("Question added successfully!");
    } catch (error) {
      alert("Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          {["stats", "characters", "questions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeTab === tab
                  ? "bg-purple-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Tab */}
        {activeTab === "stats" && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Games" value={stats.totalGames} icon="🎮" />
            <StatCard
              title="Total Characters"
              value={stats.totalCharacters}
              icon="👤"
            />
            <StatCard
              title="Total Questions"
              value={stats.totalQuestions}
              icon="❓"
            />
            <StatCard
              title="Success Rate"
              value={`${stats.successRate}%`}
              icon="📊"
            />
          </div>
        )}

        {/* Characters Tab */}
        {activeTab === "characters" && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Characters ({characters.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.map((char) => (
                <div
                  key={char.characterId}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  {char.metadata?.imageUrl && (
                    <img
                      src={char.metadata.imageUrl}
                      alt={char.name}
                      className="w-16 h-16 rounded-full object-cover mb-3"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-white">
                    {char.name}
                  </h3>
                  <div className="text-gray-300 text-sm space-y-1 mt-2">
                    <div>Guessed: {char.timesGuessed}</div>
                    <div>Correct: {char.timesCorrect}</div>
                    <div>
                      Rate:{" "}
                      {char.timesGuessed > 0
                        ? (
                            (char.timesCorrect / char.timesGuessed) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === "questions" && (
          <div className="space-y-8">
            {/* Add Question Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                Add New Question
              </h3>
              <form onSubmit={handleAddQuestion} className="space-y-4">
                <input
                  type="text"
                  value={newQuestion.text}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, text: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
                  placeholder="Question text..."
                  required
                />
                <input
                  type="text"
                  value={newQuestion.category}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, category: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
                  placeholder="Category (optional)"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-600 disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Question"}
                </button>
              </form>
            </div>

            {/* Questions List */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Questions ({questions.length})
              </h2>
              <div className="space-y-4">
                {questions.map((q) => (
                  <div
                    key={q.questionId}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {q.text}
                    </h3>
                    <div className="text-gray-300 text-sm space-y-1 mt-2">
                      <div>Category: {q.category || "None"}</div>
                      <div>Asked: {q.timesAsked} times</div>
                      <div>Info Value: {q.informationValue.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
