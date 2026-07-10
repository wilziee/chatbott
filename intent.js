import { normalizeText } from './normalize.js';

export class IntentDetector {
    constructor() {
        this.patterns = {
            greeting: /^(halo|hai|hey|hi|selamat\s+(pagi|siang|sore|malam)|assalamualaikum)/i,
            farewell: /^(dadah|bye|sampai\s+jumpa|pamit|keluar)/i,
            identity_ask: /^(siapa\s+kamu|kamu\s+siapa|nama\s+kamu|buat\s+apa)/i,
            capability: /^(bisa\s+apa|bantu\s+apa|fungsimu)/i,
            gratitude: /^(terima\s+kasih|makasih|thanks|thank\s+you)/i
        };
    }

    detect(text) {
        const normalized = normalizeText(text);
        
        for (const [intent, regex] of Object.entries(this.patterns)) {
            if (regex.test(normalized)) {
                return intent;
            }
        }
        return 'general_query'; // Intensi standar yang akan diteruskan ke mesin pencari
    }
}
