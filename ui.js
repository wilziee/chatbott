export class UIManager {
    constructor() {
        this.chatBox = document.getElementById('chat-box');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-btn');
        this.toggleBtn = document.getElementById('toggle-btn');
        this.sidebar = document.getElementById('sidebar');
        
        this.placeholders = ["Ask me anything...", "Tanya soal koding...", "Lagi galau? Curhat sini...", "Butuh motivasi?"];
        this.initDynamicPlaceholder();
        this.initClock();
        this.initSidebar();
    }

    initSidebar() {
        this.toggleBtn.addEventListener('click', () => {
            this.sidebar.classList.toggle('collapsed');
            this.toggleBtn.innerHTML = this.sidebar.classList.contains('collapsed') ? '▶' : '◀';
        });
    }

    initDynamicPlaceholder() {
        let idx = 0;
        setInterval(() => {
            idx = (idx + 1) % this.placeholders.length;
            this.chatInput.placeholder = this.placeholders[idx];
        }, 3000);
    }

    initClock() {
        const clockEl = document.getElementById('digital-clock');
        setInterval(() => {
            const now = new Date();
            clockEl.textContent = now.toLocaleTimeString('id-ID');
        }, 1000);
    }

    appendMessage(role, text, isTyping = false) {
        const wrapper = document.createElement('div');
        wrapper.className = `message-wrapper ${role}`;

        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        
        if (isTyping) {
            msgDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
            msgDiv.id = 'typing-indicator-box';
        } else {
            msgDiv.innerHTML = text; // Mendukung HTML formatting dasar
        }

        const footer = document.createElement('div');
        footer.className = 'msg-footer';
        
        const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        
        if (role === 'bot' && !isTyping) {
            footer.innerHTML = `
                <span>${time}</span>
                <span class="action-btn copy-btn" title="Copy">📋</span>
                <span class="action-btn regen-btn" title="Regenerate">🔄</span>
            `;
            
            // Event listener copy
            footer.querySelector('.copy-btn').addEventListener('click', () => {
                navigator.clipboard.writeText(text);
                // Feedback opsional
            });
        } else if (role === 'user') {
            footer.innerHTML = `
                <span class="action-btn edit-btn" title="Edit">✏️</span>
                <span>${time}</span>
            `;
            footer.querySelector('.edit-btn').addEventListener('click', () => {
                this.chatInput.value = text;
                this.chatInput.focus();
            });
        } else {
            footer.innerHTML = `<span>${time}</span>`;
        }

        wrapper.appendChild(msgDiv);
        wrapper.appendChild(footer);
        this.chatBox.appendChild(wrapper);
        
        this.scrollToBottom();
        return wrapper;
    }

    removeTypingIndicator() {
        const typingBox = document.getElementById('typing-indicator-box');
        if (typingBox) {
            typingBox.parentElement.remove();
        }
    }

    scrollToBottom() {
        this.chatBox.scrollTo({
            top: this.chatBox.scrollHeight,
            behavior: 'smooth'
        });
    }

    // Simulasi Typing Effect
    async typeText(element, text, speed = 20) {
        element.innerHTML = "";
        let i = 0;
        return new Promise(resolve => {
            const interval = setInterval(() => {
                element.innerHTML += text.charAt(i);
                this.scrollToBottom();
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, speed);
        });
    }
}
