import { IntentDetector } from './intent.js';
import { KnowledgeSearch } from './search.js';
import { ResponseGenerator } from './response.js';

export class AIEngine {
    constructor(memoryManager, contextManager) {
        this.intentDetector = new IntentDetector();
        this.knowledge = new KnowledgeSearch();
        this.generator = new ResponseGenerator(memoryManager, contextManager);
    }

    async init(knowledgeUrl) {
        return await this.knowledge.loadKnowledge(knowledgeUrl);
    }

    async processMessage(userText) {
        // 1. Cek Intent Standar (Greeting, Farewell, dll)
        const intent = this.intentDetector.detect(userText);
        if (intent !== 'general_query') {
            const intentResp = this.generator.generateIntentResponse(intent);
            if (intentResp) return intentResp;
        }

        // 2. Pencarian berbasis Inverted Index pada Knowledge JSON
        const searchResult = this.knowledge.searchTopic(userText);
        
        if (searchResult) {
            return this.generator.generateKnowledgeResponse(searchResult);
        }

        // 3. Fallback jika tidak ditemukan
        return this.generator.generateFallback();
    }
}
