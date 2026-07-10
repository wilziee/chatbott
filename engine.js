class AIEngine {
    constructor() {
        this.knowledgeData = null;
        this.searchEngine = new window.SearchEngine();
        this.memory = new window.MemoryManager();
        this.context = new window.ContextManager();
    }

    async init() {
        try {
            // Load JSON tanpa backend
            const response = await fetch('knowledge.json');
            this.knowledgeData = await response.json();
            
            // Build index for fast processing
            this.searchEngine.buildIndex(this.knowledgeData);
            
            this.intentDetector = new window.IntentDetector(this.searchEngine);
            this.responseGenerator = new window.ResponseGenerator(this.knowledgeData, this.memory);
            
            return true;
        } catch (error) {
            console.error("Xaerisoft Engine Error: Failed to load knowledge.json", error);
            return false;
        }
    }

    processInput(inputText) {
        // 1. Simpan ke memori (User)
        this.memory.saveInteraction('user', inputText);

        // 2. Deteksi Intent
        const intentId = this.intentDetector.detect(inputText);

        // 3. Update Konteks
        this.context.updateContext(intentId);

        // 4. Generate Respon
        const responseText = this.responseGenerator.generate(intentId);

        // 5. Simpan ke memori (AI)
        this.memory.saveInteraction('ai', responseText);

        return responseText;
    }
}
window.AIEngine = AIEngine;
