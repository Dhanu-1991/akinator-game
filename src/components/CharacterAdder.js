// frontend/src/components/CharacterAdder.js
import React, { useState } from 'react';

const CharacterAdder = () => {
    const [character, setCharacter] = useState({
        name: '',
        category: 'fictional',
        features: {}
    });

    const questions = [
        { id: 'is_male', text: 'Is this character male?' },
        { id: 'can_fly', text: 'Can this character fly?' },
        // ... more questions
    ];

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Character</h2>
            <input
                type="text"
                placeholder="Character Name"
                value={character.name}
                onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                className="w-full p-2 border rounded mb-4"
            />

            {questions.map((q) => (
                <div key={q.id} className="mb-3">
                    <label className="block mb-1">{q.text}</label>
                    <select
                        onChange={(e) => setCharacter({
                            ...character,
                            features: { ...character.features, [q.id]: e.target.value }
                        })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Unknown</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            ))}

            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Character
            </button>
        </div>
    );
};