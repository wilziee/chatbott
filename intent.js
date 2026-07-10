class IntentDetector {
    constructor(searchEngine) {
        this.searchEngine = searchEngine;
    }

    detect(text) {
        const normalized = window.TextNormalizer.process(text);
        return this.searchEngine.search(normalized);
    }
}
window.IntentDetector = IntentDetector;
