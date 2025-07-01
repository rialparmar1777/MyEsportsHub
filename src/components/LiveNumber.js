import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function LiveNumber({ value, suffix = '', className = '', duration = 1.5 }) {
  const [inView, setInView] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef();
  const controls = useAnimation();

  // Parse value (e.g., 50K+ => 50000)
  function parseValue(val) {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      let num = parseFloat(val);
      if (val.includes('K')) num *= 1000;
      if (val.includes('M')) num *= 1000000;
      return num;
    }
    return 0;
  }

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const target = parseValue(value);
    controls.start({
      count: target,
      transition: { duration, ease: 'easeOut' },
    });
  }, [inView, value, controls, duration]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      animate={controls}
      initial={{ count: 0 }}
      onUpdate={latest => {
        setDisplayValue(Math.floor(latest.count));
      }}
    >
      {inView
        ? `${displayValue.toLocaleString()}${suffix}`
        : `0${suffix}`}
    </motion.span>
  );
} 