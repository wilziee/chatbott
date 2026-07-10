class ContextManager {
    constructor() {
        this.currentContext = null;
        this.contextHistory = [];
    }

    updateContext(intentId) {
        if(intentId !== 'fallback') {
            this.currentContext = intentId;
            this.contextHistory.push(intentId);
            if(this.contextHistory.length > 5) this.contextHistory.shift();
        }
    }

    getCurrentContext() {
        return this.currentContext;
    }
}
window.ContextManager = ContextManager;
