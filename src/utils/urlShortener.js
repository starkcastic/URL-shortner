const crypto = require('crypto');

class UrlShortener {
    // Generates a short, URL-safe code (default 6 characters,
    // e.g. "aZ3xQ9") instead of a 12-character hex string.
    static generateShortUrl(length = 6) {
        return crypto
            .randomBytes(length)
            .toString('base64')
            .replace(/[+/=]/g, '') // keep it URL-safe
            .slice(0, length);
    }
}

module.exports = UrlShortener;