import Navigation from '@/components/Navigation';
import TableOfContents from '@/components/TableOfContents';
import Image from 'next/image';
import Link from 'next/link';
import styles from './project2.module.css';

export const metadata = {
  title: 'Decrypt — Lalitha Pammi',
  description:
    'A browser-based Caesar cipher word game. Crack the shift. Find the word.',
};

const stackItems = [
  {
    tech: 'React (functional components + hooks)',
    reason:
      'The game state — attempts, guesses, clue visibility — maps naturally to React hooks. No class components needed, no routing complexity.',
  },
  {
    tech: 'CSS-in-JS (inline styles + keyframe animations)',
    reason:
      'Zero external dependencies was the goal. Inline styles and injected keyframes kept the CRT aesthetic fully self-contained without a CSS library.',
  },
  {
    tech: 'Vite',
    reason:
      'Fastest build tool for a pure React project. Instant hot reload during development and a clean production bundle in seconds.',
  },
  {
    tech: 'Vercel',
    reason:
      'Deploy from GitHub in one click. No server to manage — perfect for a static game that just needs a CDN-backed URL.',
  },
  {
    tech: 'No external dependencies',
    reason:
      'Pure React only. Every animation, every cipher mechanic, every UI interaction is handwritten. Nothing imported that I didn\'t understand.',
  },
];

const decisions = [
  {
    title: 'CRT terminal aesthetic — not a clean modern UI',
    chose:
      'A dark terminal look: scanline overlay, phosphor green glow, monospace font, vignette effect.',
    rejected:
      'A bright, minimal Wordle-style grid with colored tiles and clean typography.',
    why:
      'The game is about cracking a cipher — a covert act. The terminal aesthetic makes that feel real. A clean UI would look fine but feel wrong. The visual layer is not decoration; it reinforces what the player is trying to do.',
  },
  {
    title: 'Vowel clue on demand — not automatic',
    chose:
      'A single "Reveal Vowel Clue" button the player can use once, at any point, at their own discretion.',
    rejected:
      'Auto-reveal a clue after a wrong guess, or no clue at all.',
    why:
      'Players who want to crack the cipher purely shouldn\'t be penalized with an unsolicited hint. Players who are stuck shouldn\'t be locked out of one. The demand-triggered clue respects both play styles simultaneously — it\'s a mechanic that adapts to the player rather than forcing the player to adapt to it.',
  },
  {
    title: 'A–Z scratchpad as a physical thinking tool',
    chose:
      'A clickable A–Z row where any letter can be crossed off as the player eliminates possibilities.',
    rejected:
      'No scratchpad, or a text input field for notes.',
    why:
      'Cracking a Caesar cipher involves elimination — if D maps to G, then D is accounted for. The scratchpad externalizes that reasoning without doing it for the player. It keeps the cognitive load manageable without removing the deduction challenge.',
  },
];

export default function Project2Page() {
  return (
    <>
      <Navigation />
      <TableOfContents />
      <main className={styles.main}>

        {/* 1. Hero */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <Link href="/" className={styles.backLink}>← Back to Home</Link>
            <div className={styles.heroLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>Featured Project</span>
            </div>
            <h1 className={styles.heroTitle}>Decrypt</h1>
            <p className={styles.heroTagline}>
              A Caesar cipher word game. Crack the shift. Find the word.
            </p>
            <div className={styles.heroLinks}>
              <a
                href="https://decrypt-game-nine.vercel.app"
                className={styles.heroLinkPrimary}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo ↗
              </a>
              <a
                href="https://github.com/Lalitha23/Decrypt_Game1"
                className={styles.heroLinkSecondary}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

        {/* 2. Design Principles */}
        <section id="framework" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>Design Principles</span>
            </div>
            <h2 className={styles.sectionTitle}>How the game is built to think and feel</h2>
            <div className={styles.frameworkTableWrapper}>
              <table className={styles.frameworkTable}>
                <tbody>
                  <tr>
                    <td>Interaction Model</td>
                    <td>Fully client-side. No server, no API calls, no accounts.</td>
                  </tr>
                  <tr>
                    <td>Constraint-driven build</td>
                    <td>Zero external dependencies. Every animation and mechanic is handwritten in pure React.</td>
                  </tr>
                  <tr>
                    <td>Progressive disclosure</td>
                    <td>Vowel clue is demand-triggered, never automatic. Players choose their own difficulty.</td>
                  </tr>
                  <tr>
                    <td>Externalized cognition</td>
                    <td>A–Z scratchpad offloads letter-elimination reasoning without solving the puzzle.</td>
                  </tr>
                  <tr>
                    <td>Aesthetic coherence</td>
                    <td>CRT terminal aesthetic is functional, not decorative — it makes cracking the cipher feel real.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3. The Problem */}
        <section id="problem" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>The Problem</span>
            </div>
            <h2 className={styles.sectionTitle}>What I wanted to build</h2>
            <div className={styles.prose}>
              <p>
                Wordle is great at what it does — but the challenge is entirely vocabulary. You know what you&apos;re
                looking for; you just haven&apos;t found it yet. I wanted a word game with a different shape of
                difficulty: one where the player doesn&apos;t even know what letters they&apos;re looking at until they
                crack the code first.
              </p>
              <p>
                Caesar ciphers are one of the oldest encryption techniques — a fixed letter shift applied to every
                character in a word. Simple enough to explain in one sentence, but with enough variation (24 possible
                shifts) to keep each puzzle genuinely unpredictable. The core loop felt right: decrypt the word, then
                identify it. Two distinct stages of thinking instead of one.
              </p>
              <p>
                The browser felt like the obvious home. No accounts, no installs, no loading screens. You open the
                page, you see the cipher, you start working. That frictionless quality was a design requirement, not
                just a deployment convenience.
              </p>
            </div>
          </div>
        </section>

        {/* 3. What Shipped */}
        <section id="shipped" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>What Shipped</span>
            </div>
            <h2 className={styles.sectionTitle}>Working and live today</h2>
            <div className={styles.shippedGrid}>
              <div className={styles.shippedColumn}>
                <h3 className={styles.shippedSubhead}>Core Game — Easy Mode</h3>
                <ul className={styles.shippedList}>
                  <li>Caesar shift cipher with a random shift between 2–24 each session</li>
                  <li>Encrypted word displayed as glowing letter tiles on load</li>
                  <li>3 attempts before the word and shift are revealed</li>
                  <li>Vowel clue button — reveals one encrypted letter as its decoded vowel on demand</li>
                  <li>A–Z scratchpad row — click any letter to cross it off during deduction</li>
                  <li>Shake animation on wrong guess, confirmation on correct</li>
                  <li>Shift number revealed on win or loss</li>
                </ul>
              </div>
              <div className={styles.shippedColumn}>
                <h3 className={styles.shippedSubhead}>Visual &amp; UX</h3>
                <ul className={styles.shippedList}>
                  <li>CRT terminal aesthetic — dark background, phosphor green, scanline overlay</li>
                  <li>Glitch animation on the encrypted word at page load</li>
                  <li>Colored dot attempt tracker — three states: unused, wrong, correct</li>
                  <li>ACCESS GRANTED message on correct decode</li>
                  <li>Word and shift revealed automatically after all attempts are exhausted</li>
                  <li>Zero external UI dependencies — every visual element is handwritten</li>
                  <li>Deployed and live at <code>decrypt-game-nine.vercel.app</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. The Architecture */}
        <section id="architecture" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>The Architecture</span>
            </div>
            <h2 className={styles.sectionTitle}>How the pieces connect</h2>
            <div className={styles.prose}>
              <p>
                The entire game lives in a single React component. No backend, no API calls, no state management
                library. A word is selected from the word bank at mount time, shifted by a randomly chosen Caesar
                value, and rendered as the encrypted puzzle. Everything after that is local state.
              </p>
            </div>

            <div className={styles.archBlocks}>
              <div className={styles.archBlock}>
                <h3 className={styles.archSubhead}>Game State Flow</h3>
                <div className={styles.archFlow}>
                  <div className={styles.flowStep}>Page loads — random word selected from word bank</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Random Caesar shift (2–24) applied to every letter<br /><span className={styles.flowDetail}>e.g. PARTY → SDUWB at shift +3</span></div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Encrypted tiles rendered with glitch animation</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={`${styles.flowStep} ${styles.flowStepAccent}`}>Player uses scratchpad + optional vowel clue to deduce the shift</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Player types decoded word and submits</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Correct → ACCESS GRANTED + shift revealed<br />Wrong → attempt deducted, shake animation</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>All attempts used → word and shift revealed</div>
                </div>
              </div>

              <div className={styles.archBlock}>
                <h3 className={styles.archSubhead}>Cipher Mechanics</h3>
                <div className={styles.archFlow}>
                  <div className={styles.flowStep}>Caesar cipher: each letter shifted by a fixed amount</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={`${styles.flowStep} ${styles.flowStepAccent}`}>Shift wraps around A–Z (modulo 26)<br /><span className={styles.flowDetail}>Z + 3 = C, not ZZZ</span></div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Vowel clue: one letter is reversed to show its plaintext vowel</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Scratchpad crosses off used letters to track deduction progress</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Guess validated against original plaintext word (case-insensitive)</div>
                </div>
              </div>
            </div>

            <div className={styles.archImages}>
              <figure className={styles.archFigure}>
                <div className={styles.screenshotWrapper}>
                  <Image
                    src="/images/project2/screenshot-1.png"
                    alt="Decrypt game showing encrypted word TXHVW in CRT terminal style with A-Z scratchpad"
                    fill
                    className={styles.screenshotImg}
                    sizes="(max-width: 900px) 100vw, 880px"
                  />
                </div>
                <figcaption className={styles.caption}>
                  Live game — encrypted word displayed in CRT terminal aesthetic with scratchpad and vowel clue button
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 5. The Stack */}
        <section id="stack" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>The Stack</span>
            </div>
            <h2 className={styles.sectionTitle}>Tech used and why</h2>
            <div className={styles.stackGrid}>
              {stackItems.map((item) => (
                <div key={item.tech} className={styles.stackItem}>
                  <span className={styles.stackTech}>{item.tech}</span>
                  <p className={styles.stackReason}>{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Decisions I Made */}
        <section id="decisions" data-section="decisions" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>Decisions I Made</span>
            </div>
            <h2 className={styles.sectionTitle}>What I chose, why, and what I rejected</h2>
            <div className={styles.decisions}>
              {decisions.map((d, i) => (
                <div key={i} className={styles.decisionItem}>
                  <div className={styles.decisionNumber}>{String(i + 1).padStart(2, '0')}</div>
                  <div className={styles.decisionContent}>
                    <h3 className={styles.decisionTitle}>{d.title}</h3>
                    <div className={styles.decisionMeta}>
                      <p className={styles.decisionChose}>
                        <span className={styles.decisionLabel}>Chose</span> {d.chose}
                      </p>
                      <p className={styles.decisionRejected}>
                        <span className={styles.decisionLabel}>Rejected</span> {d.rejected}
                      </p>
                    </div>
                    <p className={styles.decisionWhy}>{d.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Epiphanies */}
        <section id="epiphanies" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>Epiphanies</span>
            </div>
            <h2 className={styles.sectionTitle}>Moments that changed my thinking</h2>
            <div className={styles.epiphanies}>
              <div className={styles.epiphany}>
                <blockquote className={styles.epiphanyQuote}>
                  &quot;I saw <code>SDUWB</code> on the screen and genuinely paused. I forgot I built it. I just started
                  trying to crack the cipher.&quot;
                </blockquote>
                <p className={styles.epiphanyBody}>
                  The first time the game loaded with a real encrypted word and the CRT aesthetic fully rendered, I
                  had the experience I was trying to design. That pause — the moment the encrypted sequence looks
                  genuinely mysterious — confirmed that the visual layer was earning its place. The terminal aesthetic
                  wasn&apos;t styling. It was the mechanic.
                </p>
              </div>
              <div className={styles.epiphany}>
                <blockquote className={styles.epiphanyQuote}>
                  &quot;The scratchpad wasn&apos;t in the original design. It appeared because I was testing the game and
                  kept opening Notes to track letters.&quot;
                </blockquote>
                <p className={styles.epiphanyBody}>
                  Building and playing your own game surfaces needs the designer wouldn&apos;t otherwise notice. I
                  added the A–Z scratchpad because I needed it myself during testing. The best mechanic in the game
                  came from the observation that a real user would open a separate app to manage what the game should
                  be doing for them. Playtest your own work. It shows you the gap between the game you imagined and
                  the one you actually built.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. The Story */}
        <section id="story" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>The Story</span>
            </div>
            <h2 className={styles.sectionTitle}>From concept to shipped game</h2>
            <div className={styles.prose}>
              <p>
                I&apos;ve played Wordle every day since it launched. But somewhere around month six, I realized I
                wasn&apos;t thinking differently across days — just pattern-matching to the same guessing strategy.
                The vocabulary layer alone wasn&apos;t enough variation. I wanted a game where the first step was
                something different: don&apos;t guess the word, crack the code first.
              </p>
              <p>
                Caesar ciphers were the obvious starting point. They&apos;re ancient, they&apos;re elegant, and
                they&apos;re approachable — no cryptography background required to play, but rewarding to people who
                have one. The game concept was simple: show the player an encrypted word, let them work out the shift,
                then identify the word. Two stages of thinking in one puzzle.
              </p>
              <p>
                The build was pure React — no libraries, no UI frameworks. Every visual element I wrote by hand.
                The scanline effect is a CSS pseudo-element. The glitch animation is a keyframe sequence. The letter
                tiles use a phosphor-green glow filter. I wanted to understand every pixel of the interface, and
                building without dependencies forced exactly that.
              </p>
              <p>
                The scratchpad emerged mid-build. I was playing a test session and kept switching to a Notes window
                to track which letters I&apos;d already tried. That behavior was the signal — the game needed a
                built-in thinking tool. The A–Z row was added in one sitting and immediately made the game feel
                complete in a way it hadn&apos;t before.
              </p>
              <p>
                Version 1 is live. The roadmap has Medium Mode (same cipher, no vowel clue), Hard Mode (unknown
                cipher type), daily words, streak tracking, and mobile keyboard support. The foundation is clean
                enough that each version is a contained addition — nothing in v1 needs to be torn out to build v2.
                That&apos;s what intentional architecture feels like from the inside.
              </p>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
