export class MemoryManager {
    constructor() {
        this.storageKey = 'xaerisoft_memory';
        this.memory = this.loadMemory();
        this.maxHistory = 20;
    }

    loadMemory() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            return JSON.parse(data);
        }
        return {
            userName: "Guest",
            chatHistory: [],
            preferences: {},
            lastSeen: Date.now()
        };
    }

    saveMemory() {
        this.memory.lastSeen = Date.now();
        localStorage.setItem(this.storageKey, JSON.stringify(this.memory));
    }

    addMessage(role, content) {
        this.memory.chatHistory.push({ role, content, timestamp: Date.now() });
        
        // Batasi memori hingga 20 chat terakhir untuk menjaga performa
        if (this.memory.chatHistory.length > this.maxHistory) {
            this.memory.chatHistory.shift(); 
        }
        
        this.saveMemory();
    }

    getHistory() {
        return this.memory.chatHistory;
    }

    updatePreference(key, value) {
        this.memory.preferences[key] = value;
        this.saveMemory();
    }

    getUserName() {
        return this.memory.userName;
    }

    setUserName(name) {
        this.memory.userName = name;
        this.saveMemory();
    }
}
