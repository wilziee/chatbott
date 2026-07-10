document.addEventListener("DOMContentLoaded", async () => {
    // 1. Initialize Visuals
    window.ThemeManager.initUniverse();
    window.ThemeManager.initClock();
    const ui = new window.UIManager();

    // 2. Boot Up AI Engine
    const engine = new window.AIEngine();
    const isEngineReady = await engine.init();

    // 3. Remove Loader smoothly
    setTimeout(() => {
        const loader = document.getElementById('loader');
        const app = document.getElementById('app');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.classList.add('hidden');
            app.classList.remove('hidden');
        }, 1000);
    }, 2000); // Simulasi loading state

    // 4. Bind Input Event
    const inputEl = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    const handleSend = () => {
        const text = inputEl.value.trim();
        if(!text) return;

        // Tampilkan User Message
        ui.appendMessage('user', text);
        inputEl.value = '';
        
        // Tampilkan Typing Animation
        ui.showTyping();

        // Simulasi waktu proses & typing speed organik (Lokal, bebas delay jaringan)
        setTimeout(() => {
            const aiResponse = engine.processInput(text);
            ui.hideTyping();
            ui.appendMessage('ai', aiResponse);
        }, 800 + Math.random() * 500);
    };

    sendBtn.addEventListener('click', handleSend);
    inputEl.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleSend();
    });
});
