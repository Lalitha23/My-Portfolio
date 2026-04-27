import Navigation from '@/components/Navigation';
import TableOfContents from '@/components/TableOfContents';
import Link from 'next/link';
import styles from './project3.module.css';

export const metadata = {
  title: 'AuditPrep Agent — Lalitha Pammi',
  description:
    'A multi-agent system that surfaces the right compliance controls for any audit question — instantly.',
};

const stackItems = [
  {
    tech: 'n8n',
    reason:
      'Visual workflow orchestration that connects retrieval and synthesis agents without custom glue code. Drag-and-drop debugging makes iteration fast — no need to redeploy just to change the flow.',
  },
  {
    tech: 'Pinecone',
    reason:
      'Purpose-built vector database for semantic search. Controls are retrieved by meaning, not keyword — so "password policy" and "authentication requirements" surface the same controls.',
  },
  {
    tech: 'Claude API',
    reason:
      'Best-in-class long-context reasoning for the synthesis step. The generation agent reads multiple retrieved controls simultaneously and produces coherent, audit-ready prose with inline citations.',
  },
  {
    tech: 'SOC 2 Type II (AICPA TSC)',
    reason:
      'The initial framework for the knowledge base. Security controls (CC series) are well-scoped and universally understood — the right starting point before adding ISO 27001 or FedRAMP.',
  },
];

const decisions = [
  {
    title: 'Multi-agent architecture — not a single large prompt',
    chose:
      'Separate retrieval and synthesis agents: a dedicated retriever queries Pinecone, a dedicated synthesizer receives only the retrieved controls and generates the response.',
    rejected:
      'A single prompt that contains the entire control library alongside the question.',
    why:
      'A single-prompt approach does not scale. Control libraries grow to thousands of entries — they cannot all fit in context, and injecting all of them means the model still has to do retrieval internally. Separating retrieval and synthesis means only the relevant controls reach the generation step. Each agent can also be evaluated and improved independently.',
  },
  {
    title: 'RAG over fine-tuning',
    chose:
      'A live RAG pipeline against a Pinecone knowledge base that is updated by re-ingesting the control library whenever policies change.',
    rejected:
      'Fine-tuning Claude on a compliance training dataset.',
    why:
      'SOC 2 controls change — new AICPA guidance, annual policy updates, organizational scope changes. A fine-tuned model is frozen at training time and goes stale the moment the underlying policies are updated. A RAG system reflects the current knowledge base the moment re-ingestion runs. Compliance is not a static domain.',
  },
  {
    title: 'SOC 2 first — not a generic multi-framework tool',
    chose:
      'SOC 2 Type II (AICPA Trust Service Criteria) as the v1 framework, with a control metadata schema designed around it.',
    rejected:
      'A framework-agnostic design that simultaneously supports SOC 2, ISO 27001, and FedRAMP Moderate from the start.',
    why:
      'A framework-agnostic schema would require a unified control taxonomy that does not exist yet — every framework structures controls differently. Scoping v1 to SOC 2 lets the retrieval accuracy be validated against a single, well-defined framework before the harder cross-framework mapping problem is introduced in v2.',
  },
];

const roadmap = [
  {
    version: 'v1',
    label: 'In Design',
    title: 'Core Pipeline — SOC 2 Retrieval',
    items: [
      'Ingestion agent: SOC 2 Type II controls chunked by policy statement, embedded, and loaded into Pinecone with metadata (criteria code, control category, owner, evidence type)',
      'Retrieval agent: semantic search returns top-k controls with confidence scores',
      'Synthesis agent: Claude API generates audit-ready response from retrieved controls, with inline citations',
      'CLI interface for question input and response output',
    ],
  },
  {
    version: 'v1.5',
    label: 'Planned',
    title: 'n8n Orchestration + Web UI',
    items: [
      'Full retrieval → synthesis workflow in n8n with visual flow editor',
      'Simple web form for audit question input',
      'Structured response view with source control references',
      'Error handling and retry logic in the orchestration layer',
    ],
  },
  {
    version: 'v2',
    label: 'Planned',
    title: 'Multi-Framework Expansion',
    items: [
      'ISO 27001 controls ingested alongside SOC 2 — unified retrieval across frameworks',
      'FedRAMP Moderate control baseline',
      'Cross-framework control mapping (SOC 2 CC6 ↔ ISO 27001 A.9)',
      'Framework selector in the UI — answers scoped to the chosen framework',
    ],
  },
  {
    version: 'v3',
    label: 'Future',
    title: 'Evidence Automation + Gap Analysis',
    items: [
      'Evidence pull from integrated systems: GitHub (change logs), Jira (tickets), AWS Config (infrastructure state)',
      'Gap analysis report: identifies criteria with no mapped controls or missing evidence',
      'Automated audit package generation — structured export ready for auditor review',
      'Scheduled control freshness checks — flags stale controls for review',
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
              A multi-agent system that surfaces the right compliance controls for any audit question — instantly.
            </p>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              Design Complete · Dev In Progress
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
                    <td>Claude API (synthesis and reasoning), Pinecone (semantic retrieval), n8n (workflow orchestration). Each agent calls exactly the tool it owns — no shared state.</td>
                  </tr>
                  <tr>
                    <td>Planning</td>
                    <td>Three-agent linear pipeline: Ingestion → Retrieval → Synthesis. n8n routes between agents and handles retries. No dynamic decomposition in v1.</td>
                  </tr>
                  <tr>
                    <td>Memory</td>
                    <td>Pinecone vector store — persistent compliance knowledge base, chunked at the policy-statement level with metadata tagging (criteria code, control category, evidence type).</td>
                  </tr>
                  <tr>
                    <td>Human-in-the-loop</td>
                    <td>Compliance officer reviews and approves synthesized responses before submission to the auditor. The system surfaces; the expert decides.</td>
                  </tr>
                  <tr>
                    <td>Evaluation</td>
                    <td>Retrieval accuracy (recall@k), hallucination rate against source controls, control-to-criteria mapping precision. Retrieval and synthesis are evaluated independently.</td>
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
            <h2 className={styles.sectionTitle}>What audit prep actually looks like</h2>
            <div className={styles.prose}>
              <p>
                SOC 2 audits follow a pattern: an auditor asks a question, a compliance officer
                has to find the right controls, pull the relevant evidence, and present everything
                in a structured way — under time pressure, often in a live review. The bottleneck
                is always retrieval. Not judgment. Retrieval.
              </p>
              <p>
                Control libraries grow to hundreds of entries across dozens of policy documents.
                A question about &quot;access management controls&quot; might be covered by five
                separate policies in three different documents. Only the most experienced compliance
                officers know their library cold enough to answer without searching. Everyone else
                opens SharePoint, searches manually, cross-references criteria codes, and pastes
                the result into a Word document. That process can take hours per question.
              </p>
              <p>
                The underlying knowledge exists. The controls are documented. The criteria mappings
                are defined. The problem is that the retrieval step — matching an auditor&apos;s
                question to the right controls instantly — still requires institutional knowledge
                that lives in people&apos;s heads, not in a system anyone can query.
              </p>
              <p>
                AuditPrep Agent is built to compress that retrieval loop from hours to seconds.
                Not to replace the compliance officer&apos;s judgment — to give them the right
                controls instantly so their time goes to judgment, not search.
              </p>
            </div>
          </div>
        </section>

        {/* 4. What's Designed */}
        <section id="shipped" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.inner}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>What&apos;s Designed</span>
            </div>
            <h2 className={styles.sectionTitle}>Architecture decisions made, components specced</h2>
            <div className={styles.shippedGrid}>
              <div className={styles.shippedColumn}>
                <h3 className={styles.shippedSubhead}>Agent Design</h3>
                <ul className={styles.shippedList}>
                  <li>Ingestion agent: parses compliance controls, chunks at the policy-statement level, embeds with metadata, loads into Pinecone</li>
                  <li>Retrieval agent: converts auditor question into an embedding, runs semantic search, returns top-k controls with confidence scores</li>
                  <li>Synthesis agent: Claude API receives retrieved controls and the original question, generates audit-ready response with inline control citations</li>
                  <li>Routing agent: n8n workflow connects all three agents, handles error states and retry logic without custom glue code</li>
                  <li>Evaluation harness: retrieval accuracy tested independently from synthesis accuracy — separate quality bars</li>
                </ul>
              </div>
              <div className={styles.shippedColumn}>
                <h3 className={styles.shippedSubhead}>Knowledge Base Design</h3>
                <ul className={styles.shippedList}>
                  <li>SOC 2 Type II Trust Service Criteria as the initial framework (CC, A, C, PI, P series)</li>
                  <li>Chunking strategy: policy-statement level — not page level, not document level — for retrieval precision</li>
                  <li>Metadata schema per chunk: criteria code, control title, policy owner, evidence type, last review date, associated systems</li>
                  <li>Gap map: automatically surfaces criteria codes with no mapped controls — audit readiness at a glance</li>
                  <li>Re-ingestion pipeline: knowledge base updates whenever policies change, no model retraining required</li>
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
            <h2 className={styles.sectionTitle}>How the pieces connect</h2>
            <div className={styles.prose}>
              <p>
                Five layers, each with a single responsibility. The orchestration layer (n8n) sits
                between them, routing data and handling failures without any agent needing to know
                about the others.
              </p>
            </div>

            <div className={styles.archLayers}>
              <div className={styles.archLayer}>
                <div className={styles.archLayerTag}>Layer 1</div>
                <div className={styles.archLayerContent}>
                  <h3 className={styles.archLayerTitle}>Input</h3>
                  <p className={styles.archLayerDesc}>Audit question from the compliance officer or auditor — natural language, no structured format required.</p>
                </div>
              </div>
              <div className={styles.archLayerConnector}>↓</div>

              <div className={styles.archLayer}>
                <div className={styles.archLayerTag}>Layer 2</div>
                <div className={styles.archLayerContent}>
                  <h3 className={styles.archLayerTitle}>Orchestration — n8n Workflow</h3>
                  <p className={styles.archLayerDesc}>Parses the question, routes to the retrieval agent, handles retries, passes results to synthesis.</p>
                </div>
              </div>
              <div className={styles.archLayerConnector}>↓</div>

              <div className={`${styles.archLayer} ${styles.archLayerAccent}`}>
                <div className={styles.archLayerTag}>Layer 3</div>
                <div className={styles.archLayerContent}>
                  <h3 className={styles.archLayerTitle}>Vector Store — Pinecone</h3>
                  <p className={styles.archLayerDesc}>Semantic search over the compliance control knowledge base. Returns top-k controls with confidence scores and full metadata.</p>
                </div>
              </div>
              <div className={styles.archLayerConnector}>↓</div>

              <div className={`${styles.archLayer} ${styles.archLayerAccent}`}>
                <div className={styles.archLayerTag}>Layer 4</div>
                <div className={styles.archLayerContent}>
                  <h3 className={styles.archLayerTitle}>Generation — Claude API</h3>
                  <p className={styles.archLayerDesc}>Synthesis agent reads retrieved controls and generates a structured, audit-ready response with inline citations to source control IDs.</p>
                </div>
              </div>
              <div className={styles.archLayerConnector}>↓</div>

              <div className={styles.archLayer}>
                <div className={styles.archLayerTag}>Layer 5</div>
                <div className={styles.archLayerContent}>
                  <h3 className={styles.archLayerTitle}>Output</h3>
                  <p className={styles.archLayerDesc}>Structured response: generated prose + source control citations + criteria codes + evidence pointers. Reviewed and approved by the compliance officer before submission.</p>
                </div>
              </div>
            </div>

            <div className={styles.archBlocks}>
              <div className={styles.archBlock}>
                <h3 className={styles.archSubhead}>Ingestion Pipeline</h3>
                <div className={styles.archFlow}>
                  <div className={styles.flowStep}>Policy documents loaded as source</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Chunked at policy-statement level<br /><span className={styles.flowDetail}>not page level — precision over recall at this step</span></div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={`${styles.flowStep} ${styles.flowStepAccent}`}>Metadata tagged: criteria code · control category · owner · evidence type</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Embedded and upserted into Pinecone</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Gap map generated: criteria with no mapped controls flagged</div>
                </div>
              </div>

              <div className={styles.archBlock}>
                <h3 className={styles.archSubhead}>Query Pipeline</h3>
                <div className={styles.archFlow}>
                  <div className={styles.flowStep}>Auditor question received</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>n8n routes to retrieval agent</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={`${styles.flowStep} ${styles.flowStepAccent}`}>Pinecone: top-k controls returned with confidence scores</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Synthesis agent: Claude API generates response from retrieved controls</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Response reviewed and approved by compliance officer</div>
                  <div className={styles.flowArrow}>↓</div>
                  <div className={styles.flowStep}>Submitted to auditor with source citations</div>
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
            <h2 className={styles.sectionTitle}>v1 through v3 — what ships and when</h2>
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
            <h2 className={styles.sectionTitle}>From compliance work to compliance tooling</h2>
            <div className={styles.prose}>
              <p>
                Ten years of enterprise SaaS and government compliance work means I&apos;ve sat in
                a lot of audit prep meetings. The pattern was always the same: auditor asks a
                question, compliance officer opens SharePoint, searches for the right policy, finds
                the section that applies, cross-references the criteria code, pastes the answer into
                a Word document. That process — for one question — takes anywhere from twenty minutes
                to a few hours, depending on how well the person knows the library.
              </p>
              <p>
                The knowledge wasn&apos;t missing. The controls were documented. The criteria
                mappings existed. The problem was purely retrieval: getting the right control in
                front of the right person at the right moment. That&apos;s a solved problem in
                other domains — any RAG pipeline can do it. The question was whether the same
                approach worked well enough for compliance, where accuracy is non-negotiable and
                a wrong citation is worse than no citation.
              </p>
              <p>
                The architecture came together in phases. The knowledge base design came first,
                because that was the hardest part: figuring out the right chunking strategy for
                compliance controls. Chunking at the document level loses precision — an entire
                policy document gets retrieved when only one paragraph is relevant. Chunking at
                the sentence level loses context — individual statements don&apos;t carry enough
                information to be useful without surrounding policy context. Policy-statement level
                chunking — one control, one embedding — was the answer. Each chunk is independently
                searchable and independently citable.
              </p>
              <p>
                The metadata schema followed from that: criteria code, control category, policy
                owner, evidence type, last review date, associated systems. Every field serves
                the synthesis step — the generation agent uses those fields to produce structured
                output rather than free-form prose that auditors can&apos;t verify.
              </p>
              <p>
                The current status is design complete. The pipeline architecture is specced,
                the metadata schema is defined, the agent responsibilities are separated, and
                the evaluation approach is planned. Development is in progress. The ingestion
                pipeline runs next.
              </p>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
