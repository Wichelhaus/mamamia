# MAMAMIA

Statische Website: `index.html` ist die Übersichtsseite, von der aus man alle Tools erreicht.

## Regeln

- Immer direkt auf `main` arbeiten und pushen. Keine anderen Branches, keine Ausnahmen.
- Jedes neue Tool bekommt einen eigenen Ordner: `tools/<tool-name>/index.html` (plus eigene Dateien im selben Ordner).
- Jedes neue Tool als Karte in `index.html` verlinken (in `.tool-grid`, vor dem Platzhalter-`<li>`).
- Alle Seiten müssen responsive sein (von ca. 360 px Handy bis Desktop prüfen).
- Design im Stil des Films „Mamma Mia!“ (griechische Insel, Ägäis-Blau, Sonne, Pink, 70er-Schrift).
  Gemeinsame Farben/Schriften/Komponenten aus `assets/style.css` verwenden (aus einem Tool: `../../assets/style.css`).

## Tool-Karte

```html
<li>
  <a class="tool-card" href="tools/<tool-name>/">
    <span class="tool-card__icon" aria-hidden="true">🌞</span>
    <h3 class="tool-card__title">Tool-Name</h3>
    <p class="tool-card__text">Kurze Beschreibung.</p>
  </a>
</li>
```
