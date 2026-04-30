import Link from 'next/link';
import styles from './ProjectsSection.module.css';

const projects = [
  {
    id: 'project1',
    name: 'Job Application Lifecycle Agent',
    tagline: 'An MCP server that automates the job application lifecycle inside Claude Desktop.',
    description:
      'Built an MCP server that lives inside Claude Desktop — automating the full application lifecycle from resume customization to organized file storage to rejection cleanup. Human-in-the-loop by design: nothing happens without explicit user intent. No subscriptions, no third-party uploads, full local control. Note: This is an job application organizing agent and not a resume wirting agent. ',
    stack: ['Python', 'FastMCP', 'Claude API', 'Microsoft Graph API', 'MSAL OAuth'],
    methodologies: ['Human-in-the-loop', 'Agentic AI', 'MCP Protocol'],
    link: '/projects/project1',
    externalLink: 'https://github.com/Lalitha23/job-application-agent-',
    externalLabel: 'GitHub',
    comingSoon: false,
  },
  {
    id: 'project2',
    name: 'Decrypt',
    tagline: 'A browser-based word puzzle game built with React and deployed on Vercel.',
    description:
      'Designed and shipped a word puzzle game that challenges players to decode encrypted messages through progressive difficulty. Built entirely in the browser — no backend, no accounts, no friction. Clean interface, instant feedback, and zero install.',
    stack: ['React', 'JSX', 'Vercel'],
    methodologies: ['Game Design', 'Progressive Disclosure', 'Responsive UI'],
    link: '/projects/project2',
    externalLink: 'https://decrypt-game-nine.vercel.app',
    externalLabel: 'Live Demo',
    comingSoon: false,
  },
  {
    id: 'project3',
    name: 'AuditPrep Agent',
    tagline: 'A multi-agent system that surfaces the right compliance controls for any audit question — instantly.',
    description:
      'An intelligent audit preparation assistant that retrieves and surfaces relevant compliance controls from a structured knowledge base. Orchestrated with n8n, vector search via Pinecone, and generation through the Claude API. Design complete — development in progress.',
    stack: ['n8n', 'Pinecone', 'Claude API'],
    methodologies: ['RAG Pipeline', 'Multi-Agent', 'Semantic Search', 'Compliance'],
    link: '/projects/project3',
    externalLink: null,
    externalLabel: null,
    comingSoon: false,
    statusBadge: 'Design Complete · Dev In Progress',
  },
];

export default function ProjectsSection() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Work</span>
          </div>
          <h2 className={styles.sectionTitle}>Projects &amp; Builds</h2>
        </div>

        <div className={styles.cards}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const cardClass = project.comingSoon
    ? `${styles.card} ${styles.cardComingSoon}`
    : styles.card;

  return (
    <article className={cardClass}>
      <div className={styles.cardTop}>
        <div className={styles.cardTopLeft}>
          <span className={project.comingSoon ? `${styles.badge} ${styles.comingSoonBadge}` : styles.badge}>
            {project.comingSoon ? 'Coming Soon' : 'Featured Project'}
          </span>
          <h3 className={styles.projectName}>{project.name}</h3>
          <p className={styles.projectTagline}>{project.tagline}</p>
          {project.statusBadge && (
            <span className={styles.statusBadge}>{project.statusBadge}</span>
          )}
        </div>

        <div className={styles.cardTopRight}>
          {project.comingSoon ? (
            <span className={styles.viewBtnDisabled}>In Development</span>
          ) : (
            <Link href={project.link} className={styles.viewBtn} data-robot-jump="true">
              View Project
            </Link>
          )}
          {project.externalLink && (
            <a
              href={project.externalLink}
              className={styles.externalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.externalLabel} ↗
            </a>
          )}
        </div>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.meta}>
          <div className={styles.metaGroup}>
            <span className={styles.metaLabel}>Tech Stack</span>
            <div className={styles.pills}>
              {project.stack.map((s) => (
                <span key={s} className={styles.pill}>{s}</span>
              ))}
            </div>
          </div>

          <div className={styles.metaGroup}>
            <span className={styles.metaLabel}>Methodologies</span>
            <div className={styles.pills}>
              {project.methodologies.map((m) => (
                <span key={m} className={`${styles.pill} ${styles.pillOutlined}`}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
