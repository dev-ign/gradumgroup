import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { homeContent, localize } from '../../data/siteContent';
import { Reveal, StaggerGroup } from '../ui/Reveal';

interface TimelineMetrics {
  nodePositions: number[];
  activationOffset: number;
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function HowWeWorkTimeline() {
  const { lang } = useLanguage();
  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const metricsRef = useRef<TimelineMetrics | null>(null);
  const { scrollY } = useScroll();
  const lineProgress = useMotionValue(0);
  const firstActive = useMotionValue(0);
  const secondActive = useMotionValue(0);
  const thirdActive = useMotionValue(0);
  const activeValues = useMemo(() => [firstActive, secondActive, thirdActive], [firstActive, secondActive, thirdActive]);

  const updateProgress = useCallback((scrollPosition: number) => {
    const metrics = metricsRef.current;
    if (!metrics) return;

    if (prefersReducedMotion) {
      if (lineProgress.get() !== 1) lineProgress.set(1);
      activeValues.forEach((value) => { if (value.get() !== 1) value.set(1); });
      return;
    }

    // The viewport guide crosses each real node center as the visitor scrolls.
    // This keeps fill and activation aligned after responsive text reflow.
    const cursor = scrollPosition + metrics.activationOffset;
    const [first, , last] = metrics.nodePositions;
    lineProgress.set(clamp((cursor - first) / (last - first)));
    metrics.nodePositions.forEach((position, index) => {
      const next = cursor >= position ? 1 : 0;
      if (activeValues[index].get() !== next) activeValues[index].set(next);
    });
  }, [prefersReducedMotion, lineProgress, activeValues]);

  useMotionValueEvent(scrollY, 'change', updateProgress);

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    const track = trackRef.current;
    const nodes = nodeRefs.current;
    if (!timeline || !track || nodes.length !== 3 || nodes.some((node) => !node)) return;

    let frame = 0;
    let disposed = false;
    const measure = () => {
      frame = 0;
      const timelineTop = timeline.getBoundingClientRect().top;
      const centers = nodes.map((node) => {
        const rect = node!.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });
      const first = centers[0] - timelineTop;
      const last = centers[2] - timelineTop;
      track.style.top = `${first}px`;
      track.style.height = `${last - first}px`;
      metricsRef.current = {
        nodePositions: centers.map((center) => center + window.scrollY),
        activationOffset: window.innerHeight * 0.65,
      };
      updateProgress(scrollY.get());
    };
    const scheduleMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(timeline);
    observer.observe(document.body);
    nodes.forEach((node) => observer.observe(node!));
    window.addEventListener('resize', scheduleMeasure);
    window.addEventListener('load', scheduleMeasure);
    document.fonts.ready.then(() => { if (!disposed) scheduleMeasure(); });

    return () => {
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
      window.removeEventListener('load', scheduleMeasure);
    };
  }, [scrollY, updateProgress]);

  return (
    <section className="home-insight" aria-labelledby="how-we-work-title">
      <StaggerGroup trigger="viewport" className="home-insight__intro section-shell">
        <Reveal><h2 id="how-we-work-title">{l(homeContent.howWeWork.title)}</h2></Reveal>
        <Reveal><p>{l(homeContent.howWeWork.introduction)}</p></Reveal>
        <Reveal><p>{l(homeContent.howWeWork.detail)}</p></Reveal>
      </StaggerGroup>
      <div className="engagement-timeline section-shell" ref={timelineRef}>
        <div className="engagement-timeline__track" ref={trackRef} aria-hidden="true">
          <motion.div className="engagement-timeline__fill" style={{ scaleY: prefersReducedMotion ? 1 : lineProgress }} />
        </div>
        {homeContent.howWeWork.steps.map((step, index) => (
          <div className={`engagement-timeline__step engagement-timeline__step--${index % 2 === 0 ? 'left' : 'right'}`} key={step.title.en}>
            <Reveal as="article" trigger="viewport" className="engagement-timeline__content">
              <h3>{l(step.title)}</h3>
              <p>{l(step.description)}</p>
            </Reveal>
            <span className="engagement-timeline__node" ref={(node) => { nodeRefs.current[index] = node; }} aria-hidden="true">
              <motion.span className="engagement-timeline__node-fill" style={{ scale: prefersReducedMotion ? 1 : activeValues[index] }} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
