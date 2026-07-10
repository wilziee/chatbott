export class ContextManager {
    constructor() {
        this.currentTopic = null;
        this.lastTopic = null;
        this.activeEntities = {};
    }

    setTopic(topicName) {
        if (this.currentTopic !== topicName) {
            this.lastTopic = this.currentTopic;
            this.currentTopic = topicName;
        }
    }

    getTopic() {
        return this.currentTopic;
    }

    addEntity(key, value) {
        this.activeEntities[key] = value;
    }

    clearContext() {
        this.currentTopic = null;
        this.activeEntities = {};
    }
}
