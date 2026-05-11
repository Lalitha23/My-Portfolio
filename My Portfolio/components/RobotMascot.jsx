'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './RobotMascot.module.css';

export default function RobotMascot() {
  const [posX, setPosX] = useState(20);
  const [animState, setAnimState] = useState('waving');
  const [walkFrame, setWalkFrame] = useState(0);
  const [showStars, setShowStars] = useState(false);
  const [showClipboard, setShowClipboard] = useState(false);

  const lastScrollY = useRef(0);
  const walkDist = useRef(0);
  const scrollTimer = useRef(null);
  const clipboardActive = useRef(false);

  // Wave for 2s on load, then go idle
  useEffect(() => {
    const t = setTimeout(() => setAnimState('idle'), 2000);
    return () => clearTimeout(t);
  }, []);

  // Scroll → walk left-to-right with two-frame waddle
  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(scrollY / maxScroll, 1);
      const robotW = 68;
      const maxX = Math.max(0, window.innerWidth - robotW - 20);
      setPosX(20 + pct * maxX);

      const delta = Math.abs(scrollY - lastScrollY.current);
      walkDist.current += delta;
      if (walkDist.current > 22) {
        walkDist.current = 0;
        setWalkFrame((f) => 1 - f);
      }
      lastScrollY.current = scrollY;

      if (!clipboardActive.current) {
        setAnimState('walking');
      }

      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        if (!clipboardActive.current) setAnimState('idle');
      }, 250);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimer.current);
    };
  }, []);

  // VIEW PROJECT click → jump + starbursts
  useEffect(() => {
    function onClick(e) {
      if (e.target.closest('[data-robot-jump]')) {
        setAnimState('jumping');
        setShowStars(true);
        setTimeout(() => {
          setShowStars(false);
          setAnimState('idle');
        }, 800);
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Decisions section → clipboard + scribble
  useEffect(() => {
    const el = document.querySelector('[data-section="decisions"]');
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        clipboardActive.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setShowClipboard(true);
          setAnimState('clipboard');
        } else {
          setShowClipboard(false);
          setAnimState('idle');
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cls = [styles.robot, styles[animState], styles[`frame${walkFrame}`]].join(' ');

  return (
    <div className={cls} style={{ left: `${posX}px` }} aria-hidden="true">
      {showStars && (
        <div className={styles.starBurst}>
          <span className={styles.star1}>✦</span>
          <span className={styles.star2}>★</span>
          <span className={styles.star3}>✦</span>
          <span className={styles.star4}>★</span>
        </div>
      )}
      <svg
        className={styles.svg}
        viewBox="0 0 48 56"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Antenna */}
        <rect x="20" y="0" width="8" height="6" fill="#FF4444" />
        <rect x="22" y="6" width="4" height="3" fill="#2D5FA6" />

        {/* Head */}
        <rect x="8" y="9" width="32" height="18" fill="#2D5FA6" />
        {/* Face screen */}
        <rect x="12" y="12" width="24" height="12" fill="#5B9BD5" />
        {/* Eyes */}
        <rect x="15" y="15" width="6" height="5" fill="#FFD700" />
        <rect x="27" y="15" width="6" height="5" fill="#FFD700" />

        {/* Body */}
        <rect x="6" y="27" width="36" height="16" fill="#2D5FA6" />
        {/* Chest buttons */}
        <rect x="14" y="32" width="5" height="4" fill="#FFD700" />
        <rect x="29" y="32" width="5" height="4" fill="#FFD700" />

        {/* Left arm */}
        <g className={styles.leftArm}>
          <rect x="0" y="27" width="6" height="10" fill="#2D5FA6" />
        </g>

        {/* Right arm + optional clipboard */}
        {showClipboard ? (
          <g className={styles.clipboardGroup}>
            {/* Arm raised */}
            <rect x="42" y="21" width="6" height="10" fill="#2D5FA6" />
            {/* Clipboard body */}
            <rect x="48" y="18" width="13" height="17" fill="#FFD700" rx="1" />
            {/* Clip holder */}
            <rect x="52" y="16" width="5" height="4" fill="#2D5FA6" rx="1" />
            {/* Notes lines */}
            <rect x="50" y="25" width="9" height="1.5" fill="#2D5FA6" />
            <rect x="50" y="28.5" width="7" height="1.5" fill="#2D5FA6" />
            <rect x="50" y="32" width="8" height="1.5" fill="#2D5FA6" />
          </g>
        ) : (
          <g className={styles.rightArm}>
            <rect x="42" y="27" width="6" height="10" fill="#2D5FA6" />
          </g>
        )}

        {/* Left leg */}
        <g className={styles.leftLeg}>
          <rect x="12" y="43" width="10" height="13" fill="#2D5FA6" />
        </g>

        {/* Right leg */}
        <g className={styles.rightLeg}>
          <rect x="26" y="43" width="10" height="13" fill="#2D5FA6" />
        </g>
      </svg>
    </div>
  );
}
