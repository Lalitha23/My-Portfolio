import Navigation from '@/components/Navigation';
import TableOfContents from '@/components/TableOfContents';
import Link from 'next/link';
import styles from './project3.module.css';

export const metadata = {
  title: 'AuditPrep Agent — Lalitha Pammi',
  description:
    'A multi-agent system that processes an audit checklist requirement by requirement and produces a Covered / Partial / At Risk gap report.',
};

const stackItems = [
  {
    tech: 'Python',
    reason:
      'All agent logic, tools, and orchestration run in Python. Ecosystem maturity for AI work, direct compatibility with Anthropic and Pinecone SDKs, and the same stack I used in the Job Application Lifecycle Agent — no context switching.',
  },
  {
    tech: 'Claude API (Sonnet)',
    reason:
      'Both Orchestrator and Coverage Agent use Claude. Long context window matters for compliance documents. Structured output reliability is critical for the JSON message protocol — agents must parse each other\'s responses without error handling hacks.',
  },
  {
    tech: 'Pinecone',
    reason:
      'Vector store for policy chunk embeddings. Production-grade managed service that scales to v3 organizational memory (multiple audit cycles) without architectural changes. The same index that powers v1 retrieval becomes the cross-audit memory in v3.',
  },
  {
    tech: 'OpenAI text-embedding-3-small',
    reason:
      'Significantly cheaper than text-embedding-3-large, performs well for compliance vocabulary, and deliberately decoupled from the Claude reasoning layer. Using OpenAI for embeddings and Claude for reasoning is a common production pattern — each component can be swapped independently.',
  },
  {
    tech: 'pdfplumber',
    reason:
      'PDF parsing for internal policy documents. Handles tables and structured layouts better than PyPDF2 — important because compliance policies frequently include control matrices and structured evidence tables.',
  },
  {
    tech: 'Streamlit',
    reason:
      'Right fit for the prototype: fast to build, supports streaming output for the live agent conversation screen, zero frontend overhead. The live conversation display — showing Orchestrator delegating and Coverage Agent responding in real time — is the demo\'s differentiator.',
  },
];

const decisions = [
  {
    title: 'Orchestrator cannot query Pinecone — enforced at code level',
    chose:
      'Tool access is strictly scoped: Orchestrator\'s tool list does not include query_pinecone. The Coverage Agent owns all Pinecone access. This is enforced in code, not just in prompts.',
    rejected:
      'Relying solely on prompt instructions to keep the Orchestrator from querying Pinecone directly.',
    why:
      'The most common failure mode for multi-agent prototypes is single-agent collapse — the Orchestrator starts querying the vector store directly, the Coverage Agent becomes a passthrough, and the architecture becomes a single agent in disguise. Enforcing tool separation at the code level makes that failure impossible, not just unlikely. If the Orchestrator\'s tool list doesn\'t include the tool, it can\'t call it.',
  },
  {
    title: 'Confidence flag is mandatory — "Needs Human Review" is a success state',
    chose:
      'Coverage Agent must return a confidence flag on every response. "Needs Human Review" is an explicit output category, not a failure. The prompt celebrates uncertainty as the correct response when evidence is unclear.',
    rejected:
      'Letting the Coverage Agent omit confidence when it felt certain, or treating low-confidence responses as errors to suppress.',
    why:
      'In a compliance context, a confident wrong answer is the highest-stakes failure. An agent that says "Covered" when evidence is thin is more dangerous than one that says "I\'m not sure." Making "Needs Human Review" an explicit success state — something the UI displays prominently, not an error to hide — builds trust in the system and keeps the human in the loop where it matters.',
  },
  {
    title: 'Synthetic data with deliberately seeded coverage gaps',
    chose:
      'Three synthetic policy documents (Access Control, Information Security, Vendor Management) with calibrated coverage: some requirements clearly covered, some clearly missing, some borderline — so the self-correction loop and "Needs Human Review" flag actually trigger during the demo.',
    rejected:
      'Clean synthetic data where everything is covered, or real customer compliance documents.',
    why:
      'A demo that returns "Covered" for every requirement proves nothing — it looks like a keyword search. Real customer data introduces privacy constraints that slow iteration. Seeded gaps let the system demonstrate its actual value: the self-correction loop triggers visibly, confidence-based re-queries run, and the "At Risk" category populates with specific policy language missing. The demo shows the system working, not just running.',
  },
];

const roadmap = [
  {
    version: 'v1',
    label: 'Shipped',
    title: 'Two-Agent Python Core — Gap Analysis End to End',
    items: [
      'Orchestrator Agent: reads SOC 2 checklist, delegates per-requirement to Coverage Agent, evaluates confidence, triggers re-query when low, synthesizes final gap report',
      'Coverage Agent: queries Pinecone for relevant policy chunks, assesses coverage, returns structured JSON with assessment, confidence, citations, and suggested recheck terms',
      'Confidence-based self-correction loop: one re-query maximum per requirement; persists "Needs Human Review" if still low',
      'Append-only decision log: every Orchestrator decision captured with timestamp, rationale, confidence, and whether re-query was triggered',
      'Gap report with three categories: Covered, Partial, At Risk — with policy citations per requirement',
      'Streamlit UI: live agent conversation screen (streaming JSON messages) + gap report review screen',
      'All 6 acceptance criteria validated and passing',
    ],
  },
  {
    version: 'v1.5',
    label: 'Planned',
    title: 'SharePoint Connector — Evidence Where It Lives',
    items: [
      'Coverage Agent gains search_sharepoint(query, scope) tool — retrieves documents directly from the company\'s existing SharePoint estate',
      'Document freshness awareness: last-modified date surfaces with every citation; stale policies flagged automatically',
      'Setup flow: compliance lead specifies where policies live once — agent navigates from there on every run',
      'Authentication via Microsoft Graph + MSAL OAuth, read-only scope to specified sites and libraries',
    ],
  },
  {
    version: 'v2',
    label: 'Planned',
    title: 'Cross-Functional Coordination — Outreach + Risk Agents',
    items: [
      'Outreach Agent: drafts evidence request emails to cross-functional teams when Coverage Agent flags missing evidence — human approves before send',
      'Risk Agent: analyses past audit findings as a third document type; surfaces recurring gaps across cycles',
      'Vector-based episodic memory replacing text-based decision log',
      'Multi-cycle self-correction with a separate critic agent',
    ],
  },
  {
    version: 'v3',
    label: 'Future',
    title: 'Organizational Memory — Continuous Compliance',
    items: [
      'Historical Knowledge Base: multiple past audit cycles embedded in Pinecone; agents reason across audits, not just within one',
      'Pattern detection: surface recurring findings, repeat gaps, remediation history',
      'Cross-audit insights: "this requirement has been flagged in 3 of the last 4 audits"',
      'Transforms the system from a per-audit tool into continuous compliance infrastructure',
    ],
  },
];

export default function Project3Page() {
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
            <h1 className={styles.heroTitle}>AuditPrep Agent</h1>
            <p className={styles.heroTagline}>
              A multi-agent system that processes an audit checklist requirement by requirement — producing a Covered / Partial / At Risk gap report with policy citations and a full decision log.
            </p>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              v1 Shipped · All Acceptance Criteria Passing
            </div>
          </div>
        </section>

        {/* 2. Agentic Framework */}
        <section id="framework" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>Agentic Framework</span>
            </div>
            <h2 className={styles.sectionTitle}>How the system reasons and acts</h2>
            <div className={styles.frameworkTableWrapper}>
              <table className={styles.frameworkTable}>
                <tbody>
                  <tr>
                    <td>Tool Use</td>
                    <td>Orchestrator tools: read_checklist, delegate_to_coverage, evaluate_confidence, request_recheck, log_decision, synthesize_report. Coverage Agent tools: query_pinecone, assess_coverage, report_back. Tool access is scoped at the code level — Orchestrator cannot call query_pinecone.</td>
                  </tr>
                  <tr>
                    <td>Planning</td>
                    <td>Orchestrator decomposes the audit checklist into individual requirements and processes each sequentially. After each Coverage Agent response, it evaluates confidence and decides whether to accept, re-query, or flag for human review — before moving to the next requirement.</td>
                  </tr>
                  <tr>
                    <td>Memory</td>
                    <td>Two memory types: Pinecone vector store (external — policy chunks with metadata, queried per requirement) and an append-only JSON decision log (episodic — every Orchestrator decision with timestamp, rationale, confidence, and re-query trigger). In-context conversation resets between audit runs in v1.</td>
                  </tr>
                  <tr>
                    <td>Human-in-the-loop</td>
                    <td>Gap report is displayed in Streamlit for review before export. Requirements where confidence remains low after one re-query are explicitly flagged as "Needs Human Review" — surfaced prominently, not suppressed. The human decides; the system surfaces.</td>
                  </tr>
                  <tr>
                    <td>Evaluation</td>
                    <td>Six acceptance criteria validated: end-to-end flow without manual intervention, multi-agent observability (distinct agents visible in conversation log), self-correction visibly triggers on seeded gaps, decision log complete, gap report accurate against seeded data, demo runs under 3 minutes.</td>
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
            <h2 className={styles.sectionTitle}>Audit prep is a coordination problem, not a knowledge problem</h2>
            <div className={styles.prose}>
              <p>
                Compliance teams preparing for SOC 2 audits face a coordination nightmare that no existing tool solves end-to-end. The knowledge exists. The controls are documented. The problem is everything else.
              </p>
              <p>
                <strong style={{color: '#F0F4FF'}}>Evidence is scattered.</strong> Internal policies live in SharePoint, past audit findings live in PDFs, the auditor&apos;s checklist arrives as an Excel file. There is no single source of truth, and assembling one from scratch is the first tax of every audit cycle.
              </p>
              <p>
                <strong style={{color: '#F0F4FF'}}>Coverage gaps are invisible until it&apos;s too late.</strong> Teams discover missing evidence during the audit response window — when they have days, not weeks, to find it. The gap analysis that should happen at the start happens under pressure at the end.
              </p>
              <p>
                <strong style={{color: '#F0F4FF'}}>Past findings aren&apos;t institutional memory.</strong> The same gaps get flagged audit after audit. Previous findings sit in archived folders, not in any workflow that would surface them before the next audit starts.
              </p>
              <p>
                <strong style={{color: '#F0F4FF'}}>Cross-functional asks are manual and slow.</strong> When evidence sits with engineering, HR, or security, the compliance lead drafts individual emails, follows up, escalates. This is the most time-consuming part of audit prep and the least intellectually engaging — exactly the work an agentic system should handle.
              </p>
              <p>
                The result: compliance teams spend most of audit prep on coordination tasks. AuditPrep Agent is designed to take that coordination work off the human and put it on a multi-agent system — while keeping the human in control of high-stakes decisions.
              </p>
            </div>
          </div>
        </section>

        {/* 4. What Shipped */}
        <section id="shipped" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>What Shipped</span>
            </div>
            <h2 className={styles.sectionTitle}>v1 — working end to end, all criteria passing</h2>
            <div className={styles.shippedGrid}>
              <div className={styles.shippedColumn}>
                <h3 className={styles.shippedSubhead}>Agent System</h3>
                <ul className={styles.shippedList}>
                  <li>Orchestrator Agent: reads SOC 2 checklist, delegates each requirement to Coverage Agent via structured JSON, evaluates confidence, triggers re-query when low, synthesizes final gap report</li>
                  <li>Coverage Agent: queries Pinecone for relevant policy chunks, assesses coverage, returns structured JSON with assessment, confidence flag, citations, and suggested recheck terms</li>
                  <li>Confidence-based self-correction: one re-query maximum per requirement with refined search terms; flags as &quot;Needs Human Review&quot; if still low</li>
                  <li>Append-only decision log: every Orchestrator decision captured — timestamp, requirement, action, response, confidence, re-query trigger</li>
                  <li>Structured JSON message protocol between agents — parseable, auditable, displayable in UI</li>
                </ul>
              </div>
              <div className={styles.shippedColumn}>
                <h3 className={styles.shippedSubhead}>Output &amp; UI</h3>
                <ul className={styles.shippedList}>
                  <li>Gap report with three categories: Covered, Partial, At Risk — each requirement shows assessment, policy citations, Coverage Agent reasoning, and any &quot;Needs Human Review&quot; flags</li>
                  <li>Human-in-the-loop checkpoint: report displayed in Streamlit for review before export</li>
                  <li>Live agent conversation screen: streaming JSON messages between Orchestrator and Coverage Agent, color-coded by sender, confidence indicators per requirement</li>
                  <li>Decision log accessible via &quot;View Audit Trail&quot; — the system is not a black box</li>
                  <li>All 6 acceptance criteria validated and passing as of May 2026</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. The Architecture */}
        <section id="architecture" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>The Architecture</span>
            </div>
            <h2 className={styles.sectionTitle}>Three layers, each doing one thing</h2>
            <div className={styles.prose}>
              <p>
                The system is layered by responsibility. Agents make decisions. RAG provides semantic memory. Infrastructure handles parsing, routing, and logging. The layers communicate through the structured JSON message protocol — no shared state, no implicit coupling.
              </p>
            </div>

            <div className={styles.archLayers}>
              <div className={`${styles.archLayer} ${styles.archLayerAccent}`}>
                <div className={styles.archLayerTag}>Layer 1</div>
                <div className={styles.archLayerContent}>
                  <h3 className={styles.archLayerTitle}>Multi-Agent Layer — Orchestrator + Coverage Agent</h3>
                  <p className={styles.archLayerDesc}>Decisions, delegation, confidence evaluation, self-correction, synthesis. Orchestrator owns the checklist and the gap report. Coverage Agent owns all Pinecone access. Tool lists enforced at the code level.</p>
                </div>
              </div>
              <div className={styles.archLayerConnector}>↓ uses</div>

              <div className={`${styles.archLayer} ${styles.archLayerAccent}`}>
                <div className={styles.archLayerTag}>Layer 2</div>
                <div className={styles.archLayerContent}>
                  <h3 className={styles.archLayerTitle}>RAG Pipeline — Pinecone + OpenAI Embeddings</h3>
                  <p className={styles.archLayerDesc}>Policy chunks embedded with OpenAI text-embedding-3-small, stored in Pinecone with metadata (source file, page, document type). Coverage Agent queries by requirement text — semantic match, not keyword. Returns top-k chunks with confidence scores.</p>
                </div>
              </div>
              <div className={styles.archLayerConnector}>↓ runs on</div>

              <div className={styles.archLayer}>
                <div className={styles.archLayerTag}>Layer 3</div>
                <div className={styles.archLayerContent}>
                  <h3 className={styles.archLayerTitle}>Infrastructure — Ingest, Decision Log, UI Bridge</h3>
                  <p className={styles.archLayerDesc}>pdfplumber parses policy PDFs. Chunking pipeline splits at policy-statement level. Append-only decision log captures every agent action. Streamlit bridges agent output to the live conversation display and gap report UI.</p>
                </div>
              </div>
            </div>

            <div className={styles.archBlocks}>
              <div className={styles.archBlock}>
                <h3 className={styles.archSubhead}>Ingestion Pipeline</h3>
                <div className={styles.archFlow}>
                  <div className={styles.flowStep}>Policy PDFs uploaded via Streamlit UI</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>pdfplumber parses — handles tables and structured layouts</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={`${styles.flowStep} ${styles.flowStepAccent}`}>Chunked at policy-statement level<br /><span className={styles.flowDetail}>not page level — one control, one embedding</span></div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>OpenAI text-embedding-3-small generates embeddings</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Upserted into Pinecone with metadata: source, page, document type</div>
                </div>
              </div>

              <div className={styles.archBlock}>
                <h3 className={styles.archSubhead}>Per-Requirement Query Flow</h3>
                <div className={styles.archFlow}>
                  <div className={styles.flowStep}>Orchestrator reads next checklist requirement</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={`${styles.flowStep} ${styles.flowStepAccent}`}>Delegates via structured JSON → Coverage Agent</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Coverage Agent: query_pinecone → assess → report_back (JSON)</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Orchestrator checks confidence flag</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={`${styles.flowStep} ${styles.flowStepAccent}`}>If low: one re-query with refined terms. If still low: flag &quot;Needs Human Review&quot;</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>log_decision → move to next requirement</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. The Stack */}
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

        {/* 7. Decisions I Made */}
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

        {/* 8. Roadmap */}
        <section id="roadmap" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>Roadmap</span>
            </div>
            <h2 className={styles.sectionTitle}>v1 shipped — v1.5 through v3 designed</h2>
            <div className={styles.roadmap}>
              {roadmap.map((milestone, i) => (
                <div key={i} className={styles.roadmapMilestone}>
                  <div className={styles.roadmapHeader}>
                    <span className={`${styles.roadmapVersion} ${i > 0 ? styles.roadmapVersionPlanned : ''}`}>
                      {milestone.version}
                    </span>
                    <span className={`${styles.roadmapStatus} ${i === 0 ? styles.roadmapStatusActive : ''}`}>
                      {milestone.label}
                    </span>
                  </div>
                  <h3 className={styles.roadmapTitle}>{milestone.title}</h3>
                  <ul className={styles.roadmapList}>
                    {milestone.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. The Story */}
        <section id="story" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>The Story</span>
            </div>
            <h2 className={styles.sectionTitle}>From living the problem to building the system</h2>
            <div className={styles.prose}>
              <p>
                At Maximus, I owned the Provider Data Management System — the platform that processed Medicaid and Medicare provider enrollments for state agencies. Our environment was audited on combined SOC 1 and SOC 2 scopes, depending on the contract. I sat in enough audit prep cycles to know the pattern cold.
              </p>
              <p>
                The auditor sends the checklist. The compliance team opens a fresh SharePoint folder. Then the coordination begins: &quot;Can you send me the latest access control policy?&quot; &quot;Where&apos;s the current vendor risk assessment?&quot; &quot;Is this version of the BCP still active?&quot; The evidence existed. It was in SharePoint. It just wasn&apos;t in the right SharePoint folder. Every cycle, the team did the same gather — hunting evidence that was always somewhere accessible, copying it into the audit response folder, hoping they had the latest version.
              </p>
              <p>
                The hard part was never the analysis. The controls were documented. The criteria mappings existed. The hard part was the coordination tax: knowing where things lived, who owned them, whether what you had was current. A multi-agent system is the right architecture for that problem — not because it&apos;s clever, but because the work literally requires delegation, tracking, and synthesis across multiple sources.
              </p>
              <p>
                The architecture decisions came from that lived context. The decision log exists because compliance teams need to show their work — auditors want to see the process, not just the answer. The &quot;Needs Human Review&quot; flag is an explicit success state because experienced compliance officers know that some requirements genuinely require judgment calls. The synthetic data has deliberately seeded gaps because a demo that says &quot;Covered&quot; for everything proves nothing.
              </p>
              <p>
                v1 ships the core pattern: two agents, structured communication, confidence-based self-correction, full decision log, gap report. v1.5 solves the problem I actually lived — evidence where it already lives, not evidence you have to upload. The SharePoint connector turns the system from an analysis tool into an agent that operates inside the company&apos;s existing document estate. That&apos;s the shift that makes it real.
              </p>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
