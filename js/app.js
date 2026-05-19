/**
 * SarangPikir - Main App Router & State Management
 */

const App = {
    // State
    state: {
        currentPage: 'welcome',
        authToken: null,
        currentUser: null,
        moodHistory: [],
        chatMessages: [
            {
                id: 1,
                type: 'received',
                text: "Hello there. I'm here to listen. How was your day feeling today? Did anything specific bring you peace or a little stress?",
                time: '10:12 AM'
            },
            {
                id: 2,
                type: 'sent',
                text: "It was a bit overwhelming at work, but I managed to take a short walk during lunch which helped me clear my head a little.",
                time: '10:14 AM'
            },
            {
                id: 3,
                type: 'received',
                text: "That sounds like a very healthy way to handle the overwhelm. Nature has a way of grounding us. What was the most beautiful thing you noticed on your walk?",
                time: '10:15 AM'
            }
        ],
        selectedMood: null,
        selectedTags: []
    },

    // Initialize
    init() {
        this.router = new Router();
        window.router = this.router;
        this.router.navigate('welcome');
        this.setupEventListeners();
    },

    // Event Listeners
    setupEventListeners() {
        // Handle back button
        window.addEventListener('popstate', () => {
            const page = window.location.hash.slice(1) || 'welcome';
            this.router.navigate(page, false);
        });

        // Handle keyboard (for testing on desktop)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const nav = document.getElementById('bottom-nav');
                if (nav && !nav.classList.contains('hidden')) {
                    // Could implement back navigation
                }
            }
        });
    },

    // Utility: Show/hide bottom nav
    toggleNav(show) {
        const nav = document.getElementById('bottom-nav');
        if (nav) {
            nav.classList.toggle('hidden', !show);
        }
    },

    // Utility: Get page container
    getContainer() {
        return document.getElementById('page-content');
    },

    // Utility: Clear and render
    render(content) {
        const container = this.getContainer();
        container.innerHTML = '';
        container.appendChild(content);
        container.classList.add('page-transition');
        setTimeout(() => container.classList.remove('page-transition'), 300);
    },

    // Utility: Show Toast
    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        // Trigger reflow and show
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

/**
 * Simple Router
 */
class Router {
    constructor() {
        this.routes = {
            'welcome': () => WelcomePage.render(),
            'home': () => InsightsPage.render(),
            'mood': () => MoodLogPage.render(),
            'chat': () => ChatPage.render(),
            'library': () => LibraryPage.render(),
            'article': (id) => ArticlePage.render(id)
        };
    }

    navigate(page, pushState = true) {
        const [route, param] = page.split('/');

        if (this.routes[route]) {
            App.state.currentPage = route;

            // Update nav active state
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.toggle('active', item.dataset.page === route);
            });

            // Show/hide bottom nav
            App.toggleNav(route !== 'welcome' && route !== 'article');

            // Render page
            const content = param ? this.routes[route](param) : this.routes[route]();
            App.render(content);

            // Update URL
            if (pushState) {
                window.history.pushState({}, '', `#${page}`);
            }

            // Scroll to top
            window.scrollTo(0, 0);
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());