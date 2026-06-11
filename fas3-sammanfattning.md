Fas 3 – Granskning: Sammanfattning

Verktyg som använts:
CodeQL och Dependabot via GitHub.

Fynd:
CodeQL identifierade 8 alerts i backend/server.js, 7 endpoints saknar rate limiting (High) och en tillåtande CORS-konfiguration (Medium).
Dependabot identifierade 16 alerts, varav JWT-sårbarheterna (jsonwebtoken) är de mest kritiska då det är ett direkt beroende aktivt i appen.

Koppling till OWASP Top 10:
Saknad rate limiting → A07: Identification and Authentication Failures
JWT-sårbarheter → A02: Cryptographic Failures

Åtgärdsförslag:
- Installera express-rate-limit och begränsa känsliga endpoints
- Uppdatera jsonwebtoken till senaste versionen


Slutsats:
Manuell granskning och automatiserade verktyg kompletterar varandra. Verktygen fångade konfigurationsbrister som missades i Fas 2, medan den manuella granskningen identifierade logikfel som verktygen inte upptäckte.
