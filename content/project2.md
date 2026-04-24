# 🔐 DECRYPT — Product Document

*DECRYPT — Crack the code. Find the word.*
> *A Caesar cipher word game. Crack the shift. Find the word.*

🌐 **Live: [decrypt-game-nine.vercel.app](https://decrypt-game-nine.vercel.app)**

---

## 🎯 Vision

Decrypt is a browser-based word puzzle game inspired by Wordle. A word is encrypted using a cipher — the player's job is to figure out the encryption pattern, decode it, and guess the word. Unlike Wordle where the challenge is vocabulary, Decrypt adds a cryptography layer — players must crack the code before they can even attempt the word.

---

## 👤 Target Player

- Puzzle and word game enthusiasts
- People who enjoy Wordle, Quordle, and similar daily games
- Students interested in cryptography and logic
- Casual players looking for a daily mental challenge

---

## 🕹 Game Versions

### ✅ Version 1 — Easy Mode
**Status:** Live  
**URL:** [decrypt-game-nine.vercel.app](https://decrypt-game-nine.vercel.app)

**Cipher:** Caesar shift (random shift between 2–24)

**How it works:**
- Player is shown an encrypted word (e.g. `SDUWB`)
- Player figures out the Caesar shift and decodes the word
- Player types the decoded real word and submits

**Mechanics:**
- 3 attempts maximum
- Vowel clue available on demand — one encrypted letter is revealed as its decoded vowel (e.g. `W → A`)
- A–Z scratchpad — click any letter to cross it off while working through the cipher
- Word revealed after all attempts are exhausted
- Shift number revealed on win or loss

**Feedback:**
- ✓ Correct guess — ACCESS GRANTED
- ✗ Wrong guess — attempt deducted, input shakes
- After all attempts — word and shift revealed

**UI Features:**
- CRT terminal aesthetic with scanlines and vignette
- Glitch animation on encrypted word at load
- Colored dot attempt tracker
- Shake animation on wrong guess

---

### 🔜 Version 2 — Medium Mode
**Status:** Planned

**Cipher:** Caesar shift

**Differences from Easy:**
- No vowel clue available
- Harder shift range (wider, less predictable)
- Player must deduce the shift entirely on their own
- A–Z scratchpad still available

**Design goal:** Bridge between Easy and Hard. Player already understands Caesar cipher from Easy mode but now has to crack it without any assistance.

---

### 🔜 Version 3 — Hard Mode
**Status:** Planned

**Cipher:** Unknown — could be any of:
- Caesar shift
- Vigenère cipher
- Reverse alphabet
- Skip cipher
- Substitution cipher

**Differences from Medium:**
- Cipher type is NOT revealed — player must identify it first
- Cipher key is NOT revealed — player must crack it
- Two-stage puzzle: identify cipher type → crack the key → decode the word
- No vowel clue
- Fewer attempts

**Design goal:** For experienced players who want a genuine cryptography challenge. Requires logical deduction, pattern recognition, and knowledge of cipher types.

---

## 🗺 Feature Roadmap

### Gameplay
- [ ] Medium Mode — Caesar cipher, no clue
- [ ] Hard Mode — unknown cipher type and key
- [ ] Word length variety — 4, 5, and 6-letter words
- [ ] Difficulty selector on home screen

### Daily Experience
- [ ] Daily Word — same encrypted word for everyone each day (Wordle-style)
- [ ] Streak tracking — persistent daily win streak
- [ ] Share results — copy shareable result card to clipboard (e.g. 🔐 DECRYPT #42 ✗ ✗ ✓)

### Polish
- [ ] Expanded word bank — 500+ curated 5-letter words
- [ ] Sound effects — keypress, correct, wrong, win
- [ ] Mobile optimization
- [ ] Keyboard input on mobile (custom key layout)

### Analytics
- [ ] Google Analytics integration — track sessions and engagement
- [ ] Event tracking — clue revealed, attempts used, win/loss rate
- [ ] Hardest words report

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (functional components + hooks) |
| Styling | CSS-in-JS (inline styles + keyframe animations) |
| Build tool | Vite |
| Hosting | Vercel |
| Version control | GitHub |
| Dependencies | None — pure React |

---

## 📁 File Structure

```
Decrypt_Game/
├── src/
│   ├── decrypt-game_1.jsx   ← game component
│   ├── App.jsx              ← root component
│   └── main.jsx             ← React entry point
├── public/
├── README.md                ← project overview + live link
├── PRODUCT.md               ← this file
└── package.json
```

---

## 👩‍💻 Built by

Lalitha — game design, mechanics, and product decisions.  
Claude — implementation partner.

---


## Images
- screenshot1.png: image of live game
