export class ResponseGenerator {
    constructor(memoryManager, contextManager) {
        this.memory = memoryManager;
        this.context = contextManager;
    }

    generateIntentResponse(intent) {
        const userName = this.memory.getUserName();
        switch (intent) {
            case 'greeting':
                return this.getRandom([
                    `Halo! Ada yang bisa Xaerisoft AI bantu hari ini, ${userName}?`,
                    `Hai ${userName}! Siap ngoding atau mau ngobrol santuy nih?`,
                    `Salam! Xaerisoft AI online. Butuh bantuan apa cuy?`
                ]);
            case 'identity_ask':
                return "Gua Xaerisoft AI, asisten pintar buatan lu yang jalan pake arsitektur JavaScript murni cuy. Gak pake API luar, murni lokal and ngebut!";
            case 'capability':
                return "Gua bisa bahas pemrograman, cybersecurity, gadget, ngasih motivasi, sampai nemenin curhat. Tanya aja apa yang lu mau dari knowledge base gua.";
            case 'farewell':
                return "Siap, sampai jumpa lagi! Jangan sungkan balik kalau butuh bantuan ngoding atau sekadar ngobrol.";
            case 'gratitude':
                return "Yoi, sama-sama! Santuy aja, kalau ada error lagi kabarin gua ya.";
            default:
                return null;
        }
    }

    generateKnowledgeResponse(searchResult) {
        if (!searchResult || !searchResult.data.jawaban) return null;
        
        // Simpan konteks topik terbaru
        this.context.setTopic(searchResult.topicId);

        // Pilih jawaban secara acak untuk variasi
        const answers = searchResult.data.jawaban;
        return this.getRandom(answers);
    }

    generateFallback() {
        const lastTopic = this.context.getTopic();
        
        let response = this.getRandom([
            "Waduh, gua belum punya info soal itu nih cuy. Coba pakai kata kunci yang beda ya.",
            "Hmm, di database gua belum ada bahasan tentang itu. Ada topik lain yang mau dibahas?",
            "Kayaknya itu di luar knowledge base gua saat ini ngab. Coba ketik hal lain."
        ]);

        if (lastTopic) {
            response += ` Atau kita mau lanjutin bahas soal **${lastTopic}** yang tadi?`;
        }

        return response;
    }

    getRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}
