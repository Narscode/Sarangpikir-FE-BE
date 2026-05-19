/**
 * Weekly Insights / Home Screen
 */
const InsightsPage = {
    render() {
        const container = document.createElement('div');
        container.className = 'insights-screen';

        // Render skeleton or initial state synchronously
        container.innerHTML = `
            <div class="home-header">
                <div class="home-logo">SaranaPikir</div>
            </div>
            <div style="padding: 40px; text-align: center; color: var(--muted-text);">
                Loading insights...
            </div>
        `;

        // Fetch and update asynchronously
        this.loadInsights(container);

        return container;
    },

    async loadInsights(container) {
        let insights = {
            moodHistory: [55, 22, 60, 12, 18, 28, 18],
            stressLevel: 72,
            dominantMood: 'Anxious'
        };

        try {
            const data = await api.getInsights();
            if (data && data.weeklyInsights) {
                insights = data.weeklyInsights;
            }
        } catch (err) {
            console.error('Failed to load insights:', err);
            App.showToast('Offline Mode: Using cached data.', 'error');
        }

        const userName = App.state.currentUser ? App.state.currentUser.name : 'Guest';

        // Stress Logic
        let stressColor = '#3d6b45'; // Low Stress
        let stressLabel = 'Low Stress';
        if (insights.stressLevel >= 40 && insights.stressLevel <= 69) {
            stressColor = '#e67e22'; // Moderate Stress
            stressLabel = 'Moderate Stress';
        } else if (insights.stressLevel >= 70) {
            stressColor = '#c0392b'; // High Stress
            stressLabel = 'High Stress';
        }
        const showAlert = insights.stressLevel >= 70;

        // Chart Logic
        const moodData = insights.moodHistory || [55, 22, 60, 12, 18, 28, 18];
        const points = moodData.map((val, i) => {
            const x = i * 50; // 0 to 300
            const y = 85 - (val / 100 * 85);
            return { x, y };
        });

        const dLine = `M${points[0].x},${points[0].y} Q25,${(points[0].y + points[1].y) / 2} ${points[1].x},${points[1].y} T${points[2].x},${points[2].y} T${points[3].x},${points[3].y} T${points[4].x},${points[4].y} T${points[5].x},${points[5].y} T${points[6].x},${points[6].y}`;
        const dFill = `${dLine} L300,85 L0,85 Z`;
        const circles = points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="2.5" fill="#3d6b45"/>`).join('');

        container.innerHTML = `
            <div class="home-header">
                <div class="home-logo">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                    </svg>
                    SaranaPikir
                </div>
                <div class="home-avatar">${userName.charAt(0).toUpperCase()}</div>
            </div>

            <div class="home-screen">
                <p class="home-greeting">Good morning, ${userName}</p>
                <h1 class="home-title">Weekly Insights</h1>

                <!-- Mood Trends Card -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">Mood Trends</span>
                        <span class="mood-badge">📅 Last 7 Days</span>
                    </div>
                    <div class="mood-chart-area">
                        <svg class="mood-chart-svg" viewBox="0 0 300 85" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="rgba(61,107,69,0.12)"/>
                                    <stop offset="100%" stop-color="rgba(61,107,69,0)"/>
                                </linearGradient>
                            </defs>
                            <path d="${dFill}" fill="url(#chartGrad)"/>
                            <path class="mood-chart-line" d="${dLine}"/>
                            ${circles}
                        </svg>
                    </div>
                    <div class="mood-chart-labels">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                    <div class="mood-chart-emojis">
                        <span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span>
                        <span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span>
                        <span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span>
                        <span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span>
                        <span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span>
                        <span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span>
                        <span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span>
                    </div>
                </div>

                <!-- Stress Level Card -->
                <div class="card">
                    <div class="stress-header">
                        <svg class="stress-icon" style="color: ${stressColor};" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                        </svg>
                        <span class="card-title">Stress Level</span>
                    </div>
                    <p class="stress-subtext">Dominant Mood: ${insights.dominantMood}</p>
                    <div class="stress-row">
                        <span class="stress-value" style="color: ${stressColor};">${insights.stressLevel}%</span>
                        <span class="stress-label" style="color: ${stressColor};">${stressLabel}</span>
                    </div>
                    <div class="stress-bar-bg">
                        <div class="stress-bar-fill" style="width: ${insights.stressLevel}%; background-color: ${stressColor};"></div>
                    </div>
                    ${showAlert ? `
                    <div class="stress-alert">
                        <svg class="stress-alert-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                        </svg>
                        <p class="stress-alert-text">It looks like a busy week. Try a 5-minute breathing session now.</p>
                    </div>
                    ` : ''}
                </div>

                <!-- Daily Tip Card -->
                <div class="card daily-tip-card">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div style="flex:1;">
                            <span class="daily-tip-badge">Daily Tip</span>
                            <h3 class="daily-tip-title">Unplug and Recharge</h3>
                            <p class="daily-tip-body">A simple 20-minute walk in nature can reduce cortisol levels by up to 15%. Consider the park near 12th street.</p>
                            <button class="daily-tip-btn" onclick="router.navigate('article/breathing')">Read More →</button>
                        </div>
                        <svg class="daily-tip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </svg>
                    </div>
                </div>

                <h3 class="section-title">Recommended for You</h3>
                
                <div class="rec-item" onclick="router.navigate('article/morning')">
                    <div class="rec-icon" style="background:#1a3d1a;">
                        <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=50&h=50&fit=crop" alt="Forest">
                    </div>
                    <div class="rec-content">
                        <div class="rec-title">Mindful Morning Flow</div>
                        <div class="rec-subtitle">8 min • Breathwork</div>
                    </div>
                    <div class="rec-play">▶</div>
                </div>
                
                <div class="rec-item" onclick="router.navigate('article/evening')">
                    <div class="rec-icon" style="background:#0f1d2a;">
                        <img src="https://images.unsplash.com/photo-1511296933631-18b93bf6e02e?w=50&h=50&fit=crop" alt="Night">
                    </div>
                    <div class="rec-content">
                        <div class="rec-title">Evening Wind-Down</div>
                        <div class="rec-subtitle">15 min • Sleep Hygiene</div>
                    </div>
                    <div class="rec-play">▶</div>
                </div>
            </div>
        `;
    }
};