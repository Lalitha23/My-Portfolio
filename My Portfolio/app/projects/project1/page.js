import Navigation from '@/components/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './project1.module.css';

export const metadata = {
  title: 'Job Application Lifecycle Agent — Lalitha Pammi',
  description:
    'An MCP server that automates the job application lifecycle inside Claude Desktop — human-in-the-loop by design.',
};

const stackItems = [
  {
    tech: 'Python + FastMCP',
    reason:
      'FastMCP is the cleanest way to define MCP tools and prompts — minimal boilerplate, straightforward tool registration.',
  },
  {
    tech: 'uv',
    reason:
      'Fastest Python package manager available. Dependency resolution in milliseconds versus seconds with pip.',
  },
  {
    tech: 'Claude Desktop',
    reason:
      'Meets users where they already are — no new app, no new account. The MCP server plugs directly into the LLM the user already uses.',
  },
  {
    tech: 'Anthropic Claude API',
    reason:
      'Classification layer for Agent 2 — determines whether a deleted email is a rejection and which Job ID it maps to.',
  },
  {
    tech: 'Microsoft Graph API + MSAL OAuth',
    reason:
      'Scope-limited to Mail.Read with implementation calling only the Deleted Items endpoint — auditable and minimal by design.',
  },
  {
    tech: 'Python schedule library',
    reason:
      'Lightweight background scheduler for Agent 2. No infrastructure overhead for a polling job that runs every few hours.',
  },
  {
    tech: 'Local filesystem',
    reason:
      'v1 storage — no database, no server. The folder name is the primary key. Everything is local, private, and directly inspectable.',
  },
];

const decisions = [
  {
    title: 'Human-in-the-loop save trigger',
    chose:
      'Explicit "save now" command as the required trigger — nothing is saved until the user says so.',
    rejected:
      'Auto-save after resume customization, or a dismissible confirmation prompt.',
    why:
      'The trust contract has to be felt, not read. Job seekers using this tool have specifically rejected auto-apply services because they want control over what goes on their resume before it reaches a recruiter. An automatic save would undermine the entire design philosophy — even if technically convenient.',
  },
  {
    title: 'Folder name as primary key — no database',
    chose:
      'The folder path itself (Company/Role-JobID/) as the lookup key. No database, no schema, no migration.',
    rejected: 'A local SQLite database to track applications and map Job IDs to metadata.',
    why:
      'A database adds complexity without adding value in v1. The folder name is human-readable, directly navigable in Finder or Explorer, and fully auditable without any tooling. When Agent 2 needs to match a rejection email to a folder, it reads the filesystem directly. The key is right there.',
  },
  {
    title: 'Human-triggered autonomous for Agent 2',
    chose:
      "The user's own email deletion as the intent signal — no separate confirmation, no additional step.",
    rejected:
      'Agent reads the full inbox and surfaces rejection emails for confirmation; or a separate "mark as rejected" workflow.',
    why:
      "The user has already made the decision when they delete the email — they read it, processed it, discarded it. Asking for another confirmation is noise. Reading the full inbox was rejected on principle: minimal data exposure keeps the agent's blast radius small and the code auditable.",
  },
];

export default function Project1Page() {
  return (
    <>
      <Navigation />
      <main className={styles.main}>

        {/* 1. Hero */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <Link href="/" className={styles.backLink}>← Back to Home</Link>
            <div className={styles.heroLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>Featured Project</span>
            </div>
            <h1 className={styles.heroTitle}>Job Application Lifecycle Agent</h1>
            <p className={styles.heroTagline}>
              An MCP server that automates the job application lifecycle inside Claude Desktop — human-in-the-loop by design.
            </p>
            <div className={styles.heroLinks}>
              <a
                href="https://github.com/Lalitha23/job-application-agent-"
                className={styles.heroLinkPrimary}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

        {/* 2. The Problem */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>The Problem</span>
            </div>
            <h2 className={styles.sectionTitle}>What needed to be built</h2>
            <div className={styles.prose}>
              <p>
                Most job seekers applying in 2026 face three distinct frustrations. Auto-apply tools and resume
                inflation services apply on their behalf, often sending keyword-stuffed resumes that don&apos;t represent
                them authentically — with no visibility into what version went where.
              </p>
              <p>
                Even job seekers who customize their own resumes end up with a chaotic file system:{' '}
                <code>resume_v3_final_FINAL_amazon.docx</code>, scattered cover letters, no easy way to reference
                what was submitted for a specific role. And most job search services charge recurring subscriptions
                regardless of whether you&apos;re actively searching — real friction when there&apos;s no income.
              </p>
              <p>
                The insight: job seekers are already using LLMs like Claude to customize their resumes. That behavior
                is established. What nobody had built was the layer on top — something that captures those customized
                artifacts, organizes them, and manages the lifecycle automatically. No external service. No subscription.
                Full control. The intentional approach was right, but the infrastructure to support it did not exist.
              </p>
            </div>
          </div>
        </section>

        {/* 3. What Shipped */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>What Shipped</span>
            </div>
            <h2 className={styles.sectionTitle}>Working and live today</h2>
            <div className={styles.shippedGrid}>
              <div className={styles.shippedColumn}>
                <h3 className={styles.shippedSubhead}>Agent 1 — Resume Workflow</h3>
                <ul className={styles.shippedList}>
                  <li>MCP server running inside Claude Desktop, connected and active</li>
                  <li>4 preloaded prompts: review resume, rewrite resume, write cover letter, save now</li>
                  <li>Folder creation with Job ID as the primary key — no database needed</li>
                  <li>Saves <code>job_description.txt</code>, <code>resume.txt</code>, and <code>cover_letter.txt</code> per application</li>
                  <li>Responsible AI guardrails — rewrites use only experience already in the resume, never invents or inflates</li>
                  <li>Human-in-the-loop confirmation before every save — nothing happens without explicit user intent</li>
                  <li>Existing folders respected — agent checks before creating, never overwrites</li>
                </ul>
              </div>
              <div className={styles.shippedColumn}>
                <h3 className={styles.shippedSubhead}>Agent 2 — Rejection Watcher</h3>
                <ul className={styles.shippedList}>
                  <li>Rejection watcher running via Microsoft Outlook OAuth</li>
                  <li>Human-triggered autonomous pattern — email deletion is the trigger, not a separate step</li>
                  <li>Agent watches Deleted Items folder only — never reads the full inbox</li>
                  <li>Claude API classification as a safety net before any archival action</li>
                  <li><code>archive_application()</code> MCP tool — moves folder to <code>_Rejected/</code>, never permanently deletes</li>
                  <li>Deletion log and audit trail written to <code>deletion_log.csv</code></li>
                  <li>User chooses storage location at setup: Local Desktop or SharePoint</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. The Architecture */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>The Architecture</span>
            </div>
            <h2 className={styles.sectionTitle}>How the pieces connect</h2>
            <div className={styles.prose}>
              <p>
                A single MCP server is the stable foundation. Claude Desktop connects to it once — every tool registered
                on that server is immediately available. Adding a new agent capability means adding new tools to the same
                server. No new server, no new configuration, no reconfiguration needed.
              </p>
            </div>

            <div className={styles.archBlocks}>
              <div className={styles.archBlock}>
                <h3 className={styles.archSubhead}>Agent 1 — Human-in-the-loop</h3>
                <div className={styles.archFlow}>
                  <div className={styles.flowStep}>User pastes JD + resume into Claude Desktop</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Preloaded prompts guide the workflow<br /><span className={styles.flowDetail}>review · rewrite · cover letter</span></div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={`${styles.flowStep} ${styles.flowStepAccent}`}>User says &quot;save now&quot; ← human approval required</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>MCP tool extracts company + role + Job ID, confirms with user</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Creates folder: <code>Desktop/Job Applications/Company/Role-JobID/</code></div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Saves: <code>job_description.txt · resume.txt · cover_letter.txt</code></div>
                </div>
              </div>

              <div className={styles.archBlock}>
                <h3 className={styles.archSubhead}>Agent 2 — Human-triggered autonomous</h3>
                <div className={styles.archFlow}>
                  <div className={styles.flowStep}>Rejection email arrives in Outlook</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={`${styles.flowStep} ${styles.flowStepAccent}`}>User reads it and deletes the email ← this is the human trigger</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Agent polls Deleted Items folder every few hours</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Claude API safety check: &quot;Is this a rejection? Which Job ID?&quot;</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Matches Job ID → archives folder to <code>_Rejected/</code></div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Writes to <code>deletion_log.csv</code> — silent, clean, no interruption</div>
                </div>
              </div>
            </div>

            <div className={styles.archImages}>
              <figure className={styles.archFigure}>
                <div className={styles.imgWrapper}>
                  <Image
                    src="/images/project1/job_application_agent_architecture_v2.png"
                    alt="Two-agent architecture diagram showing Agent 1 and Agent 2 tools on the MCP server"
                    fill
                    className={styles.archImg}
                    sizes="(max-width: 900px) 100vw, 880px"
                  />
                </div>
                <figcaption className={styles.caption}>
                  Two-agent design — both agents share a single MCP server
                </figcaption>
              </figure>
              <figure className={styles.archFigure}>
                <div className={styles.imgWrapper}>
                  <Image
                    src="/images/project1/architecture_multi_agent.svg"
                    alt="Multi-agent extensibility diagram showing future agent additions to the same server"
                    fill
                    className={styles.archImg}
                    sizes="(max-width: 900px) 100vw, 880px"
                  />
                </div>
                <figcaption className={styles.caption}>
                  Extensibility design — v3 agents are new tools on the same server
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 5. The Stack */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
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
        <section className={styles.section}>
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
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>Epiphanies</span>
            </div>
            <h2 className={styles.sectionTitle}>Moments that changed my thinking</h2>
            <div className={styles.epiphanies}>
              <div className={styles.epiphany}>
                <blockquote className={styles.epiphanyQuote}>
                  &quot;I typed &lsquo;save now.&rsquo; Claude created the folder, named it correctly, and saved my resume,
                  cover letter and job description inside it. I stared at my screen for a full 10 seconds before celebrating.&quot;
                </blockquote>
                <p className={styles.epiphanyBody}>
                  That moment — Agent 1&apos;s first successful save — clarified what it meant to build something with
                  genuine utility. Not a demo, not a proof of concept. An artifact that would actually change how I
                  worked every day. The human-in-the-loop pattern wasn&apos;t a constraint; it was the feature.
                </p>
              </div>
              <div className={styles.epiphany}>
                <blockquote className={styles.epiphanyQuote}>
                  &quot;Same system. Same classifier. Completely different consequences depending on what it gets wrong.&quot;
                </blockquote>
                <p className={styles.epiphanyBody}>
                  Writing test cases for Agent 2&apos;s eval harness surfaced the real insight: a missed rejection means
                  a folder stays on the desktop a little longer — annoying, recoverable. An archived offer letter means
                  something irreplaceable is gone. Accuracy is not a single number. It&apos;s a consequence map. That
                  realization led to severity tiers in the eval harness: critical and high failures had to be zero before
                  the agent could run autonomously. Not minimized — zero.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. The Story */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>The Story</span>
            </div>
            <h2 className={styles.sectionTitle}>From frustration to working agent</h2>

            <div className={styles.screenshots}>
              <figure className={styles.screenshotFigure}>
                <div className={styles.screenshotWrapper}>
                  <Image
                    src="/images/project1/screenshot-1.png"
                    alt="MCP tools loaded inside Claude Desktop"
                    fill
                    className={styles.screenshotImg}
                    sizes="(max-width: 900px) 100vw, 380px"
                  />
                </div>
                <figcaption className={styles.caption}>Tools loaded in Claude Desktop via MCP</figcaption>
              </figure>
              <figure className={styles.screenshotFigure}>
                <div className={styles.screenshotWrapper}>
                  <Image
                    src="/images/project1/screenshot-2.png"
                    alt="Application artifacts saved to the correct desktop folder"
                    fill
                    className={styles.screenshotImg}
                    sizes="(max-width: 900px) 100vw, 380px"
                  />
                </div>
                <figcaption className={styles.caption}>All three artifacts saved under the Job ID folder</figcaption>
              </figure>
              <figure className={styles.screenshotFigure}>
                <div className={styles.screenshotWrapper}>
                  <Image
                    src="/images/project1/screenshot-3.png"
                    alt="MCP server running locally in the terminal"
                    fill
                    className={styles.screenshotImg}
                    sizes="(max-width: 900px) 100vw, 380px"
                  />
                </div>
                <figcaption className={styles.caption}>MCP server running on localhost</figcaption>
              </figure>
            </div>

            <div className={styles.prose}>
              <p>
                Two things collided to spark this. A post by a tech executive describing how AI could actively structure
                a desktop — not just search it, but manage the artifacts of knowledge work. And a pattern I&apos;d
                noticed in my own job search: every Claude session ended the same way. Files in Downloads. Manual
                renaming. <em>resume_final_v3_amazon_REAL.docx</em>. I tried resume match scoring tools and my resume
                started reading like a keyword list, not like me. I stopped.
              </p>
              <p>
                What I wanted was AI that helps me present my real experience better — not game an algorithm. No tool
                did all three: assist with the work, keep everything organized, and stay out of the way until I said so.
                So I built one.
              </p>
              <p>
                I took Anthropic Academy&apos;s MCP course to get up to speed on the protocol, then designed the
                architecture around a single server that both agents share. Claude Desktop connects once and gains
                everything registered on that server. Adding Agent 2 was a tool registration and a background
                scheduler — no new server, no new OAuth flow to configure.
              </p>
              <p>
                The eval work for Agent 2 was the most intellectually honest part of the build. Nobody handed me a
                quality bar. I had to derive it. I started writing test cases and the consequence map emerged — not
                from requirements, but from forcing myself to define what failure actually costs. Work on a government
                program earlier gave me the discipline for non-negotiable accuracy bars. Building this agent gave me
                the harder skill: finding that bar yourself, before anything goes wrong.
              </p>
              <p>
                Both agents are shipped. The MCP server is open source. The product roadmap covers v3
                (follow-up, interview prep, status tracking) and v4 (ChatGPT and Copilot support). The core
                philosophy doesn&apos;t change: meet users where they already are, add structure to what they&apos;re
                already doing, and keep the human in control at every step.
              </p>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
