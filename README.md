# CR-67 Low Voltage — Practice Quiz

A lightweight, static practice quiz for the **CR-67 Low Voltage Communications
Systems** exam. 160 questions transcribed from study-portal screenshots into a
clean data file, served as a single-page web app. No build step, no backend —
just static files, ideal for GitHub Pages.

## What's here

| File | Purpose |
|------|---------|
| `index.html` | The page shell |
| `styles.css` | Styling (dark theme, mobile-friendly) |
| `app.js` | Quiz + flashcard logic (vanilla JS) |
| `questions.json` | The 160-question bank |
| `media/` | The 6 diagrams (oscilloscope waveforms, a circuit, a DPDT switch) |

The original 633 MB of source photos live in `assets/` and are **git-ignored** —
they were only the input to transcription and aren't needed to run the site.

## Features

- **Quiz mode** — pick an answer, get instant right/wrong, score tracked.
- **Flashcard mode** — reveal the answer + explanation on demand.
- **Shuffle** and **"only questions I've missed"** review (missed set persists in
  `localStorage`).
- Keyboard: `1–4` to answer, `←`/`→` to navigate, `Space` to reveal a flashcard.
- Worked explanations and NEC/NFPA references shown where available.

## Run locally

Any static file server works, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Open `index.html` directly won't work in some browsers because it `fetch`es
`questions.json`; use a server.)

## Deploy to GitHub Pages

1. Create a public repo on GitHub and push this folder (see steps printed by the
   setup, or below).
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from
   a branch**, branch `main`, folder `/ (root)`, **Save**.
3. Wait ~1 minute. Your site is at `https://<username>.github.io/<repo>/`.

## Data model

Each question in `questions.json`:

```json
{
  "id": "13198",
  "question": "Refer to the illustration, what is the total resistance of this circuit?",
  "options": ["10 ohms", "25 ohms", "5 ohms", "15 ohms"],
  "answerIndex": 0,
  "explanation": "…worked solution…",
  "references": ["NFPA 70: NEC 2017: …"],
  "media": "media/13198.jpg"
}
```

`explanation`, `references`, and `media` are optional.

## Accuracy note

Questions were OCR-transcribed from photographs and reflect the source study
app's stated answers verbatim (including its occasional typos). Always verify
against the current NEC/NFPA before relying on any answer.
