/**
 * Article Card Component
 */
const ArticleCard = {
    render(article) {
        return `
            <div class="article-card" onclick="router.navigate('article/${article.id}')">
                <img src="${article.image}" class="article-card-image" alt="${article.title}">
                <div class="article-card-content">
                    <div>
                        <h4 class="article-card-title">${article.title}</h4>
                        <p class="article-card-description">${article.description}</p>
                    </div>
                    <div class="article-card-footer">
                        <span class="article-card-time">${article.readTime}</span>
                        <button class="article-card-bookmark ${article.bookmarked ? 'active' : ''}" 
                                onclick="event.stopPropagation(); ArticleCard.toggleBookmark('${article.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="${article.bookmarked ? 'currentColor' : 'none'}" 
                                 stroke="currentColor" stroke-width="2">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    toggleBookmark(articleId) {
        // Toggle bookmark state
        const article = LibraryPage.articles.find(a => a.id === articleId);
        if (article) {
            article.bookmarked = !article.bookmarked;
            // Re-render would happen here in a real app
        }
    }
};