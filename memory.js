class MemoryManager {
    constructor() {
        this.shortTermMemory = []; // Max 20
        this.userProfile = {
            name: "User",
            hobbies: [],
            preferences: {}
        };
    }

    saveInteraction(role, text) {
        this.shortTermMemory.push({ role, text, timestamp: new Date().toISOString() });
        if (this.shortTermMemory.length > 20) {
            this.shortTermMemory.shift(); // Buang yang paling lama
        }
    }

    getHistory() {
        return this.shortTermMemory;
    }
}
window.MemoryManager = MemoryManager;
