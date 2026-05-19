/**
 * Insight Card Component
 */
const InsightCard = {
    render({ title, value, description, type, trend }) {
        const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
        const trendColor = trend === 'up' ? '#E85D5D' : trend === 'down' ? '#4A6741' : '#6B6B6B';

        return `
            <div class="card insight-card">
                <div class="insight-header">
                    <h4 class="insight-title">${title}</h4>
                    <span class="insight-trend" style="color: ${trendColor}">${trendIcon}</span>
                </div>
                <div class="insight-value">${value}</div>
                <p class="insight-description">${description}</p>
            </div>
        `;
    }
};