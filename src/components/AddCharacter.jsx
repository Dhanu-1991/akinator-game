import { useState } from "react";

export default function AddCharacter({ sessionId, onSubmit, onCancel }) {
  const [characterData, setCharacterData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    features: {},
  });

  const [questions] = useState([
    { id: "is_real_person", text: "Is your character a real person?" },
    { id: "is_male", text: "Is your character male?" },
    { id: "can_fly", text: "Can your character fly?" },
    { id: "has_superpowers", text: "Does your character have superpowers?" },
    { id: "is_human", text: "Is your character human?" },
    { id: "is_villain", text: "Is your character a villain?" },
    { id: "from_marvel", text: "Is your character from Marvel?" },
    { id: "from_dc", text: "Is your character from DC?" },
    { id: "wears_mask", text: "Does your character wear a mask?" },
    { id: "has_weapon", text: "Does your character use weapons?" },
  ]);

  const handleFeatureChange = (questionId, value) => {
    setCharacterData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [questionId]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (characterData.name.trim()) {
      onSubmit({
        ...characterData,
        characterId: `c_${Date.now()}`,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-500/20">
      <div className="text-center mb-8 space-y-4">
        <div className="text-6xl animate-bounce">✨</div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Add Your Mystery Character
        </h2>
        <p className="text-purple-200 text-lg">
          Help me learn about new characters!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Character Name */}
        <div className="transform transition duration-200 hover:scale-[1.02]">
          <label className="block text-white font-medium mb-2 flex items-center gap-2">
            <span className="text-xl">👤</span> Character Name *
          </label>
          <input
            type="text"
            value={characterData.name}
            onChange={(e) =>
              setCharacterData({ ...characterData, name: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-purple-300 border border-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            placeholder="e.g., Iron Man"
            required
          />
        </div>

        {/* Image URL */}
        <div className="transform transition duration-200 hover:scale-[1.02]">
          <label className="block text-white font-medium mb-2 flex items-center gap-2">
            <span className="text-xl">🖼️</span> Image URL (optional)
          </label>
          <input
            type="url"
            value={characterData.imageUrl}
            onChange={(e) =>
              setCharacterData({ ...characterData, imageUrl: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-purple-300 border border-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            placeholder="https://..."
          />
        </div>

        {/* Description */}
        <div className="transform transition duration-200 hover:scale-[1.02]">
          <label className="block text-white font-medium mb-2 flex items-center gap-2">
            <span className="text-xl">📝</span> Description (optional)
          </label>
          <textarea
            value={characterData.description}
            onChange={(e) =>
              setCharacterData({
                ...characterData,
                description: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-purple-300 border border-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            placeholder="Brief description..."
            rows="3"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-white font-medium mb-4 flex items-center gap-2">
            <span className="text-xl">🎭</span> Character Features
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.map((q) => (
              <div
                key={q.id}
                className="bg-white/10 rounded-lg p-4 transform transition duration-200 hover:scale-[1.02] hover:bg-white/15"
              >
                <p className="text-white font-medium mb-3">{q.text}</p>
                <div className="flex gap-2">
                  {["yes", "no", "unknown"].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleFeatureChange(q.id, value)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        characterData.features[q.id] === value
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white transform scale-105"
                          : "bg-white/20 text-purple-200 hover:bg-white/30"
                      }`}
                    >
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl hover:scale-105 transform transition duration-300 shadow-lg hover:shadow-green-500/50"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-2xl">✨</span>
              Add Character
            </span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold py-4 px-6 rounded-xl hover:scale-105 transform transition duration-300 shadow-lg hover:shadow-red-500/50"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-2xl">↩️</span>
              Cancel
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
