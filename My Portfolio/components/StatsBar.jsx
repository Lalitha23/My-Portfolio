import styles from './StatsBar.module.css';

const stats = [
  {
    number: '10+',
    label: 'Years Experience',
    sub: 'Enterprise & Gov SaaS',
  },
  {
    number: '3',
    label: 'Projects Shipped',
    sub: 'Live & in production',
  },
  {
    number: '6',
    label: 'AI Tools',
    sub: 'Claude · OpenAI · Pinecone · MCP',
  },
];

export default function StatsBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.stat}>
            <span className={styles.number}>{stat.number}</span>
            <span className={styles.label}>{stat.label}</span>
            <span className={styles.sub}>{stat.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
