'use client';

import styles from './BackgroundOrbs.module.css';

export default function BackgroundOrbs() {
  return (
    <div className={styles.orbsContainer} aria-hidden="true">
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />
    </div>
  );
}
