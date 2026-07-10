import { UniverseTheme } from './theme.js';
import { MemoryManager } from './memory.js';
import { ContextManager } from './context.js';
import { AIEngine } from './engine.js';
import { UIManager } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize Visuals
    const theme = new UniverseTheme('universe-canvas');
    theme.animate();
    
    // ProgressBar Animation (Simulasi Loading)
    const progressBar = document.getElementById('progress');
    progressBar.style.width = '30%';

    // 2. Initialize Core Systems
    const ui = new UIManager();
    const memory = new MemoryManager();
    const context = new ContextManager();
    const engine = new AIEngine(memory, context);

    progressBar.style.width = '70%';

    // 3. Load Knowledge Base (Pastikan struktur knowledge.json valid)
    const isLoaded = await engine.init('./knowledge.json');

    if (isLoaded) {
        progressBar.style.width = '100%';
        
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
            document.getElementById('app-container').classList.remove('hidden');
            
            // Welcome Message
            const history = memory.getHistory();
            if (history.length === 0) {
                ui.appendMessage('bot', "Sistem siap. Knowledge Base termuat. Ketik sesuatu untuk menguji mesin AI.");
            } else {
                // Restore history (opsional, dilimit ke 5 chat terakhir untuk UI)
                history.slice(-5).forEach(msg => {
                    ui.appendMessage(msg.role, msg.content);
                });
                ui.appendMessage('bot', `Welcome back, ${memory.getUserName()}! Engine ready.`);
            }
        }, 1000);
    } else {
        alert("Gagal memuat knowledge.json. Pastikan file ada dan Anda menjalankan Local Server (Live Server).");
    }

    // 4. Handle Input
    const handleSend = async () => {
        const text = ui.chatInput.value.trim();
        if (!text) return;

        // Kosongkan input
        ui.chatInput.value = '';

        // Tampilkan pesan User
        ui.appendMessage('user', text);
        memory.addMessage('user', text);

        // Tampilkan Loading/Typing bot
        ui.appendMessage('bot', '', true);

        // Proses AI lokal dengan sedikit delay buatan untuk efek
        setTimeout(async () => {
            const responseText = await engine.processMessage(text);
            
            ui.removeTypingIndicator();
            const botWrapper = ui.appendMessage('bot', '');
            const msgEl = botWrapper.querySelector('.message');
            
            // Jalankan Typing Effect
            await ui.typeText(msgEl, responseText, 15);
            memory.addMessage('bot', responseText);
        }, 600); // Simulasi waktu berfikir
    };

    ui.sendBtn.addEventListener('click', handleSend);
    ui.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});


