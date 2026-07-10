class UIManager {
    constructor() {
        this.chatHistory = document.getElementById('chat-history');
        this.typingIndicator = document.getElementById('typing-indicator');
        this.inputEl = document.getElementById('user-input');
        
        this.placeholders = ["Ask me anything...", "Let's explore the universe...", "Need assistance?", "Type a module..."];
        this.placeholderIndex = 0;
        this.initDynamicPlaceholder();
    }

    initDynamicPlaceholder() {
        setInterval(() => {
            this.placeholderIndex = (this.placeholderIndex + 1) % this.placeholders.length;
            this.inputEl.setAttribute('placeholder', this.placeholders[this.placeholderIndex]);
        }, 4000);
    }

    appendMessage(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role === 'user' ? 'msg-user' : 'msg-ai'}`;
        
        const content = document.createElement('div');
        content.textContent = text;
        msgDiv.appendChild(content);

        // Meta (Timestamp & Actions)
        const meta = document.createElement('div');
        meta.className = 'msg-actions';
        const time = new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'});
        
        if (role === 'ai') {
            meta.innerHTML = `<span>🕒 ${time}</span> • <span onclick="navigator.clipboard.writeText('${text}')">📋 Copy</span> • <span>🔄 Regen</span>`;
        } else {
            meta.innerHTML = `<span>🕒 ${time}</span> • <span>✏️ Edit</span>`;
        }
        
        msgDiv.appendChild(meta);
        this.chatHistory.appendChild(msgDiv);
        this.scrollToBottom();
    }

    showTyping() {
        this.typingIndicator.classList.remove('hidden');
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.classList.add('hidden');
    }

    scrollToBottom() {
        const container = document.getElementById('chat-container');
        container.scrollTop = container.scrollHeight;
    }
}
window.UIManager = UIManager;
