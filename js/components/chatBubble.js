/**
 * Chat Bubble Component
 */
const ChatBubble = {
    render(message) {
        const bubbleClass = message.type === 'sent' ? 'chat-sent' : 'chat-received';

        return `
            <div class="chat-bubble ${bubbleClass}">
                ${message.text}
                <span class="chat-time">${message.time}</span>
            </div>
        `;
    }
};