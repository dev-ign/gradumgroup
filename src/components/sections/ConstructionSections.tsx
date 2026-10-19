import { Reveal, StaggerGroup } from '../ui/Reveal';
import { motionTokens } from '../../motion/presets';
import type { ConstructionLandingSections, LocalizedText } from '../../data/siteContent';

interface ConstructionSectionProps {
  content: ConstructionLandingSections;
  l: (value: LocalizedText) => string;
}

export function ConstructionIntroduction({ content, l }: ConstructionSectionProps) {
  return (
    <section className="construction-intro" aria-labelledby="construction-intro-title">
      <StaggerGroup trigger="viewport" className="section-shell construction-intro__inner">
        <Reveal><h2 id="construction-intro-title">{l(content.introduction.title)}</h2></Reveal>
        <Reveal className="construction-intro__body">
          {content.introduction.paragraphs.map((paragraph) => <p key={paragraph.en}>{l(paragraph)}</p>)}
        </Reveal>
      </StaggerGroup>
    </section>
  );
}

export function ConstructionProcess({ content, l }: ConstructionSectionProps) {
  return (
    <section className="construction-process" aria-labelledby="construction-process-title">
      <div className="platform-statement__elevation" aria-hidden="true">
        <div>{Array.from({ length: 16 }, (_, index) => <span key={index} />)}</div>
      </div>
      <div className="section-shell construction-process__inner">
        <StaggerGroup trigger="viewport" className="construction-process__heading">
          <Reveal><h2 id="construction-process-title">{l(content.process.title)}</h2></Reveal>
          <Reveal><p className="construction-process__lead">{l(content.process.introduction)}</p></Reveal>
        </StaggerGroup>
        <div className="construction-process__steps">
          {content.process.steps.map((step, index) => (
            <Reveal as="article" trigger="viewport" delay={index * motionTokens.stagger.tight} className="construction-process__step" key={step.code}>
              <h3>{l(step.title)}</h3>
              <p>{l(step.description)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConstructionAudiences({ content, l }: ConstructionSectionProps) {
  return (
    <section className="construction-audiences section-shell" aria-labelledby="construction-audiences-title">
      <StaggerGroup trigger="viewport" className="construction-audiences__heading">
        <Reveal><h2 id="construction-audiences-title">{l(content.audiences.title)}</h2></Reveal>
      </StaggerGroup>
      <div className="construction-audiences__grid">
        {content.audiences.groups.map((group, index) => (
          <Reveal as="article" trigger="viewport" delay={index * motionTokens.stagger.tight} className="construction-audiences__group" key={group.title.en}>
            <h3>{l(group.title)}</h3>
            <p>{l(group.description)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
