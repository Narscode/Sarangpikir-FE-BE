/**
 * Article Detail Screen
 */
const ArticlePage = {
    articles: {
        'breathing': {
            title: '5 Minutes to Calm: A Quick Breathing Exercise',
            category: 'Mindfulness',
            readTime: '5 min read',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
            author: {
                name: 'Dr. Elena Thorne',
                role: 'Wellness Specialist',
                avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
            },
            content: `
                <p>In our fast-paced world, finding a moment of silence can feel like a luxury. However, your breath is a portable sanctuary—a tool always available to anchor you in the present moment. This quick exercise is designed to lower your heart rate and signal safety to your nervous system.</p>
                
                <h3>The 4-7-8 Technique</h3>
                <p>The 4-7-8 breathing technique, also known as "Relaxing Breath," is a rhythmic pattern that helps regulate the autonomic nervous system. By lengthening the exhale, we activate the parasympathetic system, which is responsible for rest and digestion.</p>
                
                <blockquote>"Breath is the bridge which connects life to consciousness, which unites your body to your thoughts." — Thich Nhat Hanh</blockquote>
                
                <h3>Step-by-Step Guide</h3>
                <p>First, find a comfortable seated position with your back straight. Place the tip of your tongue against the ridge of tissue just behind your upper front teeth and keep it there throughout the entire exercise.</p>
                
                <ol>
                    <li>Exhale completely through your mouth, making a whoosh sound.</li>
                    <li>Close your mouth and inhale quietly through your nose to a count of four.</li>
                    <li>Hold your breath for a count of seven.</li>
                    <li>Exhale completely through your mouth for a count of eight.</li>
                </ol>
            `,
            hasBreathingExercise: true,
            related: [
                { id: 'morning', title: 'Morning Rituals for Mental Clarity', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop' },
                { id: 'grounding', title: 'The Science of Grounding', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop' }
            ]
        },
        'morning': {
            title: 'Mindful Morning Flow',
            category: 'Mindfulness',
            readTime: '8 min read',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop',
            author: {
                name: 'Dr. Elena Thorne',
                role: 'Wellness Specialist',
                avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
            },
            content: `<p>Start your day with intention...</p>`,
            hasBreathingExercise: false,
            related: []
        },
        'evening': {
            title: 'Evening Wind-Down',
            category: 'Sleep',
            readTime: '15 min read',
            image: 'https://images.unsplash.com/photo-1511296933631-18b93bf6e02e?w=800&h=500&fit=crop',
            author: {
                name: 'Dr. Elena Thorne',
                role: 'Wellness Specialist',
                avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
            },
            content: `<p>Prepare your mind and body for restful sleep...</p>`,
            hasBreathingExercise: false,
            related: []
        }
    },

    render(articleId) {
        const article = this.articles[articleId] || this.articles['breathing'];
        const container = document.createElement('div');
        container.className = 'article-screen';

        container.innerHTML = `
            <div class="article-top-nav">
                <button style="background:none; border:none; color:var(--text); font-size:20px; cursor:pointer; display:flex; align-items:center;" onclick="router.navigate('library')">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                </button>
                <div style="font-weight:bold; font-size:16px;">SaranaPikir</div>
                <button style="background:none; border:none; color:var(--text); font-size:20px; cursor:pointer; display:flex; align-items:center;">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </button>
            </div>

            <div class="article-hero">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop" alt="Mountain nature">
            </div>

            <div class="article-body-content">
                <div class="article-tags">
                    <span class="art-tag-pill">Mindfulness</span>
                    <span class="art-read-time" style="display:flex; align-items:center; gap:4px;">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        5 min read
                    </span>
                </div>

                <h1 class="art-title">5 Minutes to Calm: A Quick Breathing Exercise</h1>

                <div class="art-author-row">
                    <div class="art-author-avatar">ET</div>
                    <div>
                        <span class="art-author-name">Dr. Elena Thorne</span>
                        <span class="art-author-role">Wellness Specialist</span>
                    </div>
                </div>

                <p class="art-p">In our fast-paced world, finding a moment of silence can feel like a luxury. However, your breath is a portable sanctuary — a tool always available to anchor you in the present moment. This quick exercise is designed to lower your heart rate and signal safety to your nervous system.</p>

                <h2 class="art-subheading">The 4-7-8 Technique</h2>
                <p class="art-p">The 4-7-8 breathing technique, also known as Relaxing Breath, is a rhythmic pattern that helps regulate the autonomic nervous system. By lengthening the exhale, we activate the parasympathetic system, which is responsible for rest and digestion.</p>

                <blockquote class="art-quote">
                    "Breath is the bridge which connects life to consciousness, which unites your body to your thoughts." — Thich Nhat Hanh
                </blockquote>

                <h2 class="art-subheading">Step-by-Step Guide</h2>
                <p class="art-p">First, find a comfortable seated position with your back straight. Place the tip of your tongue against the ridge of tissue just behind your upper front teeth and keep it there throughout the entire exercise.</p>

                <div class="step-row">
                    <div class="step-number">1</div>
                    <div class="step-text">Exhale completely through your mouth, making a whoosh sound.</div>
                </div>
                <div class="step-row">
                    <div class="step-number">2</div>
                    <div class="step-text">Close your mouth and inhale quietly through your nose to a count of four.</div>
                </div>
                <div class="step-row">
                    <div class="step-number">3</div>
                    <div class="step-text">Hold your breath for a count of seven.</div>
                </div>
                <div class="step-row">
                    <div class="step-number">4</div>
                    <div class="step-text">Exhale completely through your mouth for a count of eight.</div>
                </div>

                <h2 class="art-subheading">Related Wisdom</h2>
                <div class="related-row">
                    <div class="rel-card">
                        <div class="lib-art-icon" style="background:#3d2a1a; color:white;">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
                        </div>
                        <div class="lib-art-content">
                            <div class="lib-art-title">Morning Rituals for Mental Clarity</div>
                            <div class="lib-art-meta">4 min read</div>
                        </div>
                    </div>
                    <div class="rel-card">
                        <div class="lib-art-icon" style="background:#1e2d1e; color:white;">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/></svg>
                        </div>
                        <div class="lib-art-content">
                            <div class="lib-art-title">The Science of Grounding</div>
                            <div class="lib-art-meta">7 min read</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return container;
    }
};