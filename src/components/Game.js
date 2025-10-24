// frontend/src/components/Game.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Game = () => {
    const [sessionId, setSessionId] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [progress, setProgress] = useState(0);
    const [gameStatus, setGameStatus] = useState('idle'); // idle, playing, completed
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const startGame = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/game/start');
            setSessionId(response.data.session_id);
            setCurrentQuestion(response.data.question);
            setProgress(response.data.progress);
            setGameStatus('playing');
        } catch (error) {
            console.error('Failed to start game:', error);
        }
        setLoading(false);
    };

    const submitAnswer = async (answer) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/game/answer', {
                session_id: sessionId,
                answer: answer
            });

            if (response.data.status === 'completed') {
                setGameStatus('completed');
                setResult(response.data);
            } else {
                setCurrentQuestion(response.data.question);
                setProgress(response.data.progress);
            }
        } catch (error) {
            console.error('Failed to submit answer:', error);
        }
        setLoading(false);
    };

    const provideFeedback = async (isCorrect, correctCharacter = null) => {
        await axios.post('/api/game/feedback', {
            session_id: sessionId,
            is_correct: isCorrect,
            correct_character: correctCharacter
        });

        // Optionally start new game
        startGame();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 py-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">
                    Character Guesser
                </h1>

                {gameStatus === 'idle' && (
                    <div className="text-center">
                        <button
                            onClick={startGame}
                            disabled={loading}
                            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
                        >
                            {loading ? 'Starting...' : 'Start Game'}
                        </button>
                    </div>
                )}

                {gameStatus === 'playing' && currentQuestion && (
                    <div className="text-center">
                        <div className="mb-6">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                Progress: {Math.round(progress)}%
                            </p>
                        </div>

                        <h2 className="text-xl font-semibold mb-6 text-gray-800">
                            {currentQuestion.text}
                        </h2>

                        <div className="grid grid-cols-1 gap-3">
                            {['yes', 'no', 'unknown'].map((answer) => (
                                <button
                                    key={answer}
                                    onClick={() => submitAnswer(answer)}
                                    disabled={loading}
                                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 capitalize"
                                >
                                    {answer === 'unknown' ? "Don't Know" : answer}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {gameStatus === 'completed' && result && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            I think it's {result.character.name}!
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Confidence: {Math.round(result.confidence * 100)}%
                        </p>
                        <p className="text-gray-600 mb-6">
                            Questions asked: {result.questions_asked}
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => provideFeedback(true)}
                                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600"
                            >
                                Yes, that's correct!
                            </button>
                            <button
                                onClick={() => provideFeedback(false)}
                                className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600"
                            >
                                No, that's wrong
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Game;