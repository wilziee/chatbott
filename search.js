class SearchEngine {
    constructor() {
        this.invertedIndex = {}; // Konsep Map: Word -> Set of Intent IDs
    }

    buildIndex(knowledgeData) {
        knowledgeData.intents.forEach(intent => {
            if(intent.id === 'fallback') return;
            
            intent.keywords.forEach(keywordPhrase => {
                const words = window.TextNormalizer.process(keywordPhrase).split(' ');
                words.forEach(word => {
                    if (!this.invertedIndex[word]) {
                        this.invertedIndex[word] = new Set();
                    }
                    this.invertedIndex[word].add(intent.id);
                });
            });
        });
        console.log("Xaerisoft: Inverted Index built for fast retrieval.");
    }

    search(normalizedInput) {
        const inputWords = normalizedInput.split(' ');
        let scores = {}; // Menghitung skor kemunculan untuk setiap intent

        inputWords.forEach(word => {
            if (this.invertedIndex[word]) {
                this.invertedIndex[word].forEach(intentId => {
                    scores[intentId] = (scores[intentId] || 0) + 1;
                });
            }
        });

        // Urutkan berdasarkan skor tertinggi
        const sortedIntents = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
        return sortedIntents.length > 0 ? sortedIntents[0] : 'fallback';
    }
}
window.SearchEngine = SearchEngine;
