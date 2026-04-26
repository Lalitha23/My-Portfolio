'use client';

import { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

const SECTIONS = [
  { id: 'problem', label: 'The Problem' },
  { id: 'shipped', label: 'What Shipped' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'stack', label: 'The Stack' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'epiphanies', label: 'Epiphanies' },
  { id: 'story', label: 'The Story' },
];

export default function TableOfContents() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        });
        const first = SECTIONS.find(({ id }) => visible.has(id));
        if (first) setActive(first.id);
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <p className={styles.title}>On this page</p>
      <ul className={styles.list}>
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`${styles.link} ${active === id ? styles.linkActive : ''}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
