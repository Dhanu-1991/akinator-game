import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const gameAPI = {
    startGame: () => api.post('/game/start'),
    submitAnswer: (data) => api.post('/game/answer', data),
    confirmGuess: (data) => api.post('/game/confirm', data),
    addCharacter: (data) => api.post('/game/character', data),
};

export const adminAPI = {
    getStats: () => api.get('/admin/stats'),
    getCharacters: () => api.get('/admin/characters'),
    getQuestions: () => api.get('/admin/questions'),
    addQuestion: (data) => api.post('/admin/question', data),
};

export default api;