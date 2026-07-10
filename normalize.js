class TextNormalizer {
    static process(text) {
        if (!text) return "";
        return text
            .toLowerCase()
            .replace(/[^\w\s]/gi, '') // Hapus tanda baca
            .replace(/\s+/g, ' ')     // Hapus spasi berlebih
            .trim();
    }
}
window.TextNormalizer = TextNormalizer;
