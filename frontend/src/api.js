// SÄKERHETSBRIST (Information Disclosure): URL:en till backend är hårdkodad och synlig i frontend-koden. Angriparen kan enkelt identifiera var API:et finns och rikta attacker direkt dit. URL:en bör inte exponeras i koden utan hanteras på ett säkrare sätt.
export const BASE_URL = "https://yh-message-app-fullstack.onrender.com"
