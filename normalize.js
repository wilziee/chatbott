/**
 * Membersihkan dan menormalisasi teks masukan
 */
export function normalizeText(text) {
    if (!text) return "";
    
    let normalized = text.toLowerCase();
    
    // Hapus tanda baca berlebih
    normalized = normalized.replace(/[^\w\s\d]/gi, ' ');
    
    // Hapus spasi ganda
    normalized = normalized.replace(/\s+/g, ' ').trim();
    
    return normalized;
}

/**
 * Stopwords dasar bahasa Indonesia untuk optimasi pencarian
 */
export const stopWords = new Set([
    "yang", "di", "ke", "dari", "pada", "dalam", "untuk", "dengan", "dan", "atau", "ini", "itu", "juga", "sudah", "saya", "kamu", "dia", "mereka", "kita", "kami", "adalah", "sebuah", "buat", "sih", "dong", "ya"
]);

/**
 * Tokenisasi teks menjadi array kata penting
 */
export function tokenize(text) {
    const words = normalizeText(text).split(' ');
    return words.filter(word => word.length > 1 && !stopWords.has(word));
}
