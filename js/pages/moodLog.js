/**
 * Daily Mood Log Screen
 */
const MoodLogPage = {
    moods: [
        { id: 'happy', label: 'Happy', emoji: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>` },
        { id: 'calm', label: 'Calm', emoji: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18"/><path d="M8 7c0-2 2-3 4-3s4 1 4 3"/><path d="M8 17c0 2 2 3 4 3s4-1 4-3"/><path d="M12 7v4"/><path d="M12 13v4"/></svg>` },
        { id: 'anxious', label: 'Anxious', emoji: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h4"/><path d="M18 12h4"/><path d="M6 12a6 6 0 0 1 12 0"/><path d="M12 16v4"/><path d="M8 20h8"/></svg>` },
        { id: 'sad', label: 'Sad', emoji: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>` },
        { id: 'tired', label: 'Tired', emoji: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>` },
        { id: 'other', label: 'Other', emoji: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>` }
    ],

    tags: ['Work', 'Family', 'Relationships', 'Health', 'Sleep', 'Exercise', 'Social', 'Finances'],

    render() {
        const container = document.createElement('div');
        container.className = 'mood-screen';

        const moodsHTML = this.moods.map(mood => `
            <div class="mood-card ${mood.id === 'calm' ? 'selected' : ''}" data-mood="${mood.id}">
                <div class="mood-emoji">${mood.emoji}</div>
                <div class="mood-label">${mood.label}</div>
            </div>
        `).join('');

        const userName = App.state.currentUser ? App.state.currentUser.name : 'Guest';

        container.innerHTML = `
            <div class="global-header">
                <div class="header-logo">SaranaPikir</div>
                <div class="header-avatar">${userName.charAt(0).toUpperCase()}</div>
            </div>

            <div class="mood-screen">
                <h1 class="mood-title">How are you feeling, ${userName}?</h1>
                <p class="mood-subtitle">Your sanctuary for reflection. Take a moment to check in with yourself.</p>

                <div class="mood-grid" id="mood-grid">
                    ${moodsHTML}
                </div>

                <label class="reflection-label">Why are you feeling this way?</label>
                <textarea class="reflection-input" id="mood-note" placeholder="Reflect on your day, thoughts, or events..."></textarea>
                
                <div class="tag-row">
                    <button class="tag-pill">Work</button>
                    <button class="tag-pill">Family</button>
                </div>

                <button class="btn btn-primary" id="btn-save-mood" style="margin-bottom: 12px;">Save Reflection</button>
                <div class="btn-text" onclick="router.navigate('chat')" style="text-align: center; cursor: pointer;">Skip for now</div>
            </div>
        `;

        // Attach event listeners after render
        setTimeout(() => this.attachListeners(), 0);

        return container;
    },

    attachListeners() {
        // Mood selection
        document.querySelectorAll('.mood-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.mood-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            });
        });

        // Save Reflection
        const btnSave = document.getElementById('btn-save-mood');
        if (btnSave) {
            btnSave.addEventListener('click', async () => {
                const selected = document.querySelector('.mood-card.selected');
                const note = document.getElementById('mood-note').value;
                const moodId = selected ? selected.dataset.mood : 'calm';

                const oldText = btnSave.textContent;
                btnSave.textContent = 'Saving...';

                try {
                    await api.saveMood(moodId, note);
                    App.showToast('Mood saved! 🌱', 'success');
                    router.navigate('home');
                } catch (err) {
                    App.showToast(err.message, 'error');
                    btnSave.textContent = oldText;
                }
            });
        }
    },

    // SVG Icons
    getHappyIcon() {
        return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
    },
    getCalmIcon() {
        return `<svg viewBox="0 0 24 24"><path d="M12 3v18"/><path d="M8 7c0-2 2-3 4-3s4 1 4 3"/><path d="M8 17c0 2 2 3 4 3s4-1 4-3"/><path d="M12 7v4"/><path d="M12 13v4"/></svg>`;
    },
    getAnxiousIcon() {
        return `<svg viewBox="0 0 24 24"><path d="M2 12h4"/><path d="M18 12h4"/><path d="M6 12a6 6 0 0 1 12 0"/><path d="M12 16v4"/><path d="M8 20h8"/></svg>`;
    },
    getSadIcon() {
        return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
    },
    getTiredIcon() {
        return `<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    },
    getOtherIcon() {
        return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    }
};