/**
 * Mood Card Component
 */
const MoodCard = {
    render(mood) {
        return `
            <div class="mood-card" data-mood="${mood.id}">
                <div class="mood-card-icon">
                    ${mood.icon}
                </div>
                <span class="mood-card-label">${mood.label}</span>
            </div>
        `;
    }
};