class ResponseGenerator {
    constructor(knowledgeData, memory) {
        this.knowledge = knowledgeData;
        this.memory = memory;
    }

    generate(intentId) {
        const intentObj = this.knowledge.intents.find(i => i.id === intentId);
        
        // Proteksi Fallback
        const targetIntent = intentObj || this.knowledge.intents.find(i => i.id === 'fallback');
        
        // Randomize Response
        const responses = targetIntent.responses;
        let selected = responses[Math.floor(Math.random() * responses.length)];
        
        // Entity Replacement (Jika ada variabel dinamis seperti [name])
        selected = selected.replace(/\[name\]/g, this.memory.userProfile.name);
        
        return selected;
    }
}
window.ResponseGenerator = ResponseGenerator;
