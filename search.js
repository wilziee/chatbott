import { tokenize } from './normalize.js';

export class KnowledgeSearch {
    constructor() {
        this.database = null;
        this.invertedIndex = {}; 
        this.metadata = null;
    }

    async loadKnowledge(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network error');
            const data = await response.json();
            
            this.metadata = data.metadata;
            this.database = data.kategori;
            this.buildIndex();
            
            console.log(`Knowledge loaded. Total Entries Capacity: ${this.metadata.total_entri}`);
            return true;
        } catch (error) {
            console.error('Failed to load knowledge:', error);
            return false;
        }
    }

    // Membangun Inverted Index untuk pencarian O(1) per kata
    buildIndex() {
        this.invertedIndex = {};
        
        // Loop tiap kategori utama (Pemrograman, dll)
        for (const [catName, subCategories] of Object.entries(this.database)) {
            // Loop tiap sub-kategori (HTML, CSS, dll)
            for (const [topicName, topicData] of Object.entries(subCategories)) {
                
                const path = `${catName}::${topicName}`; // ID unik topik
                
                // Index kata kunci
                if (topicData.kata_kunci) {
                    topicData.kata_kunci.forEach(keyword => {
                        const tokens = tokenize(keyword);
                        tokens.forEach(token => {
                            if (!this.invertedIndex[token]) {
                                this.invertedIndex[token] = new Set();
                            }
                            this.invertedIndex[token].add(path);
                        });
                    });
                }
            }
        }
    }

    // Mencari topik dengan sistem skoring kemiripan
    searchTopic(text) {
        const tokens = tokenize(text);
        if (tokens.length === 0) return null;

        const scores = {}; // { 'Kategori::Topik': score }

        tokens.forEach(token => {
            if (this.invertedIndex[token]) {
                this.invertedIndex[token].forEach(topicPath => {
                    scores[topicPath] = (scores[topicPath] || 0) + 1;
                });
            }
        });

        // Cari skor tertinggi
        let bestMatch = null;
        let highestScore = 0;

        for (const [topicPath, score] of Object.entries(scores)) {
            // Pembobotan sederhana: semakin banyak kata cocok, skor makin tinggi
            if (score > highestScore) {
                highestScore = score;
                bestMatch = topicPath;
            }
        }

        if (bestMatch && highestScore > 0) {
            const [cat, top] = bestMatch.split('::');
            return {
                topicId: top,
                data: this.database[cat][top],
                score: highestScore
            };
        }

        return null;
    }
}
