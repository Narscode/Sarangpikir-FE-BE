/**
 * SarangPikir - Central API Client with Stateful Mock Fallbacks
 * Base URL: http://127.0.0.1:5001/api
 * Falls back to local mocking seamlessly if the backend is down.
 * Uses localStorage to persist mood logs dynamically so the graph updates in real-time!
 */

const api = (function () {
    const BASE_URL = 'http://127.0.0.1:5001/api';
    let isMockMode = false;

    /**
     * Helper to make HTTP requests with proper headers and authorization.
     */
    async function request(endpoint, options = {}, mockCallback) {
        if (isMockMode && mockCallback) {
            return mockCallback();
        }

        const url = `${BASE_URL}${endpoint}`;

        // Setup headers
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Inject Auth Token if available in App state
        if (typeof App !== 'undefined' && App.state && App.state.authToken) {
            headers['Authorization'] = `Bearer ${App.state.authToken}`;
        }

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(url, config);

            // Check if response is not ok
            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    // Fail-safe
                }
                throw new Error(errorMessage);
            }

            return await response.json();
        } catch (error) {
            const isNetworkError = error instanceof TypeError || error.message.includes('Failed to fetch') || error.message.includes('fetch');

            if (isNetworkError && mockCallback) {
                console.warn(`[API] Connection to backend at ${BASE_URL} failed. Enabling Mock Mode for this session...`);
                isMockMode = true;
                if (typeof App !== 'undefined' && App.showToast) {
                    App.showToast('Backend offline. Running in local demo mode! 🌱', 'success');
                }
                return mockCallback();
            }

            console.error(`API Error on ${endpoint}:`, error);
            throw error;
        }
    }

    // Local supportive AI replies
    const aiReplies = [
        "I hear you, and it's completely valid to feel that way. What do you feel is the main source of this stress right now?",
        "Thank you for sharing that with me. Remember to take a gentle breath. What is one small thing we can focus on right now?",
        "That sounds like a lot to carry. Please be gentle with yourself. Would you like to do a quick 5-minute breathing flow together?",
        "I'm here to listen. You are doing the best you can, and that is more than enough.",
        "Nature and slow breathing have a way of grounding us when everything feels loud. Let's take a pause together."
    ];

    function getMockAIResponse(userMessage) {
        const msg = userMessage.toLowerCase();
        if (msg.includes('hello') || msg.includes('hai') || msg.includes('hi')) {
            return "Hello! I am here to listen. How has your day been feeling today? Did anything specific bring you peace or a little stress?";
        }
        if (msg.includes('stress') || msg.includes('capek') || msg.includes('lelah') || msg.includes('sedih') || msg.includes('sad')) {
            return "I am so sorry you are going through a heavy moment. Remember that it's okay to feel overwhelmed. Let's take a slow breath. Inhale... and exhale.";
        }
        if (msg.includes('breathe') || msg.includes('nafas') || msg.includes('meditasi') || msg.includes('relax')) {
            return "Excellent idea. Rhythmic breathing lowers our cortisol instantly. Try navigating to the Breathing page and follow the flow.";
        }
        return aiReplies[Math.floor(Math.random() * aiReplies.length)];
    }

    return {
        /**
         * Register a new user account
         * POST /auth/register
         */
        async register(name, email, password) {
            return await request('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });
        },

        /**
         * Sign in with email and password
         * POST /auth/login
         */
        async login(email, password) {
            return await request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
        },

        /**
         * Send chat message
         * POST /chat
         */
        async chat(message) {
            return await request('/chat', {
                method: 'POST',
                body: JSON.stringify({ message })
            });
        },

        /**
         * Fetch weekly insights (mood trends, stress levels, etc.)
         * GET /moods/insights
         */
        async getInsights() {
            const data = await request('/moods/insights', {
                method: 'GET'
            });

            // Format backend data to match what the frontend expects
            if (data && data.graphData) {
                const moodHistory = data.graphData.map(day => {
                    // Map score [-3, 2] to [0, 100] for the chart
                    // Happy=2, Calm=1, Other=0, Tired=-1, Anxious=-2, Sad=-3
                    // Formula: (score + 3) / 5 * 100
                    return Math.round(((day.averageScore + 3) / 5) * 100);
                });

                // Determine dominant mood
                let dominantMood = 'Calm';
                const latestScore = data.graphData.length > 0 ? data.graphData[data.graphData.length - 1].averageScore : 1;
                
                if (latestScore >= 1.5) dominantMood = 'Happy';
                else if (latestScore >= 0.5) dominantMood = 'Calm';
                else if (latestScore >= -0.5) dominantMood = 'Other';
                else if (latestScore >= -1.5) dominantMood = 'Tired';
                else if (latestScore >= -2.5) dominantMood = 'Anxious';
                else dominantMood = 'Sad';

                return {
                    weeklyInsights: {
                        moodHistory: moodHistory,
                        stressLevel: data.stressAnalysis.level,
                        dominantMood: dominantMood
                    }
                };
            }
            return data;
        },

        /**
         * Save a new mood check-in
         * POST /moods
         */
        async saveMood(moodId, note) {
            // Backend expects capitalized mood (e.g., 'Happy', 'Sad')
            const formattedMood = moodId.charAt(0).toUpperCase() + moodId.slice(1);
            return await request('/moods', {
                method: 'POST',
                body: JSON.stringify({ mood: formattedMood, note })
            });
        }
    };
})();
