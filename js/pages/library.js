/**
 * Wellness Library Screen
 */
const LibraryPage = {
    categories: ['All', 'Mindfulness', 'Stress', 'Sleep', 'Anxiety', 'Breathing', 'Gratitude'],

    articles: [
        {
            id: 'breathing',
            title: '5 Minutes to Calm: A Quick Breathing Exercise',
            description: 'Signs and recovery strategies for modern exhaustion.',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
            category: 'Mindfulness',
            readTime: '5 min read',
            featured: true,
            bookmarked: false
        },
        {
            id: 'burnout',
            title: 'Understanding Burnout',
            description: 'Signs and recovery strategies for modern exhaustion.',
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop',
            category: 'Stress',
            readTime: '5 min read',
            bookmarked: false
        },
        {
            id: 'gratitude',
            title: 'The Power of Gratitude',
            description: 'How daily practice changes your brain chemistry.',
            image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=200&h=200&fit=crop',
            category: 'Gratitude',
            readTime: '8 min read',
            bookmarked: false
        },
        {
            id: 'movement',
            title: 'Mindful Movement',
            description: 'Integrating awareness into your physical activity.',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop',
            category: 'Mindfulness',
            readTime: '6 min read',
            bookmarked: false
        }
    ],

    render() {
        const container = document.createElement('div');
        container.className = 'library-screen';

        const featured = this.articles.find(a => a.featured);
        const regular = this.articles.filter(a => !a.featured);

        container.innerHTML = `
            <div class="global-header">
                <div class="header-logo">SaranaPikir</div>
                <div class="header-avatar">A</div>
            </div>

            <div class="library-screen">
                <div class="search-bar">
                    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input type="text" class="search-input" placeholder="Search resources...">
                </div>

                <h3 class="section-title" style="margin-top: 0;">Featured for You</h3>
                
                <div class="featured-card" onclick="router.navigate('article/breathing')">
                    <div class="featured-overlay">
                        <div class="featured-badge">Editor's Choice</div>
                        <h3 class="featured-title">5 Minutes to Calm: A Quick Breathing Exercise</h3>
                    </div>
                </div>

                <h3 class="section-title">Explore Categories</h3>
                <div class="category-scroll">
                    <button class="cat-pill active">All</button>
                    <button class="cat-pill">Mindfulness</button>
                    <button class="cat-pill">Stress</button>
                    <button class="cat-pill">Sleep</button>
                </div>

                <div class="library-article" onclick="router.navigate('article/burnout')">
                    <div class="lib-art-icon" style="background: #3d2a1a; color: white;">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
                    </div>
                    <div class="lib-art-content">
                        <div class="lib-art-title">Understanding Burnout</div>
                        <div class="lib-art-desc">Signs and recovery strategies for modern exhaustion.</div>
                        <div class="lib-art-meta">
                            <span>5 min read</span>
                            <span style="display:flex;align-items:center;">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="library-article" onclick="router.navigate('article/gratitude')">
                    <div class="lib-art-icon" style="background: #1a2d2a; color: white;">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    </div>
                    <div class="lib-art-content">
                        <div class="lib-art-title">The Power of Gratitude</div>
                        <div class="lib-art-desc">How daily practice changes your brain chemistry.</div>
                        <div class="lib-art-meta">
                            <span>8 min read</span>
                            <span style="display:flex;align-items:center;">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="library-article" onclick="router.navigate('article/movement')">
                    <div class="lib-art-icon" style="background: #1e2d1e; color: white;">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 3v18"/><path d="M8 7c0-2 2-3 4-3s4 1 4 3"/><path d="M8 17c0 2 2 3 4 3s4-1 4-3"/><path d="M12 7v4"/><path d="M12 13v4"/></svg>
                    </div>
                    <div class="lib-art-content">
                        <div class="lib-art-title">Mindful Movement</div>
                        <div class="lib-art-desc">Integrating awareness into your physical activity.</div>
                        <div class="lib-art-meta">
                            <span>6 min read</span>
                            <span style="display:flex;align-items:center;">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => this.attachListeners(), 0);

        return container;
    },

    attachListeners() {
        // Category filter
        document.querySelectorAll('.category-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                // Could implement filtering logic here
            });
        });

        // Search
        const searchInput = document.querySelector('.library-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                // Implement search filtering
                const query = e.target.value.toLowerCase();
                // Filter articles based on query
            });
        }
    }
};