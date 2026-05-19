/**
 * Supportive Chat Screen
 */
const ChatPage = {
    initialized: false,

    render() {
        const userName = App.state.currentUser ? App.state.currentUser.name : 'Guest';

        if (!this.initialized) {
            App.state.chatMessages = [
                {
                    id: Date.now(),
                    type: 'received',
                    text: `Hello ${userName}! I'm here to listen. How are you feeling today?`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ];
            this.initialized = true;
        }

        const container = document.createElement('div');
        container.className = 'chat-screen';

        container.innerHTML = `
            <div class="global-header">
                <div class="header-logo">SaranaPikir</div>
                <div class="header-avatar">${userName.charAt(0).toUpperCase()}</div>
            </div>

            <div class="chat-area" id="chat-messages">
                <div class="chat-date">Today</div>
                ${App.state.chatMessages.map(msg => ChatBubble.render(msg)).join('')}
            </div>

            <div class="chat-input-area">
                <button class="chat-attach">+</button>
                <input type="text" class="chat-input-pill" placeholder="Tell me more about that..." id="chat-input" onkeypress="if(event.key==='Enter') ChatPage.sendMessage()">
                <button class="chat-send" onclick="ChatPage.sendMessage()">➔</button>
            </div>
        `;

        // Scroll to bottom after render
        setTimeout(() => this.scrollToBottom(), 100);

        return container;
    },

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();

        if (!text) return;

        // Add user message
        const userMsg = {
            id: Date.now(),
            type: 'sent',
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        App.state.chatMessages.push(userMsg);
        input.value = '';

        // Render with loading indicator
        this.updateMessages(true);

        try {
            const response = await api.chat(text);
            const aiMsg = {
                id: Date.now() + 1,
                type: 'received',
                text: response.aiResponse ? response.aiResponse.message : "I am here for you.",
                time: response.aiResponse ? response.aiResponse.timestamp : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            App.state.chatMessages.push(aiMsg);
        } catch (err) {
            console.error('Chat error:', err);
            App.showToast(err.message, 'error');
        }

        // Re-render without loading indicator
        this.updateMessages(false);
    },

    updateMessages(isLoading = false) {
        const container = document.getElementById('chat-messages');
        if (container) {
            let html = `<div class="chat-date">Today</div>`;
            html += App.state.chatMessages.map(msg => ChatBubble.render(msg)).join('');

            if (isLoading) {
                html += `
                    <div class="chat-bubble received">
                        <div class="typing-indicator">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                `;
            }

            container.innerHTML = html;
            this.scrollToBottom();
        }
    },

    scrollToBottom() {
        const container = document.getElementById('chat-messages');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }
};