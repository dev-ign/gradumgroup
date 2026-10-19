import { text, type LocalizedText } from './siteContent';

type ConsultingItem = {
  title: LocalizedText;
  description: LocalizedText;
};

type IndustryItem = ConsultingItem & {
  image: string;
  imageAlt: LocalizedText;
};

type ConsultingHero = {
  label: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  image?: string;
  imageAlt?: LocalizedText;
};

type ConsultingCta = {
  title: LocalizedText;
  description: LocalizedText;
  label: LocalizedText;
};

export type ConsultingDetailContent =
  | {
      layout: 'capabilities';
      hero: ConsultingHero & { image: string; imageAlt: LocalizedText };
      items: readonly ConsultingItem[];
      approach: ConsultingCta & { image: string };
    }
  | {
      layout: 'industries';
      hero: ConsultingHero;
      items: readonly IndustryItem[];
      cta: ConsultingCta;
    }
  | {
      layout: 'process';
      hero: ConsultingHero & { image: string; imageAlt: LocalizedText };
      items: readonly (ConsultingItem & { number: string })[];
      support: { title: LocalizedText; description: LocalizedText };
      cta: ConsultingCta;
    };

const projectCta = text('Discuss Your Project', 'Conversemos sobre su proyecto');

export const consultingDetails = {
  'consulting-capabilities': {
    layout: 'capabilities',
    hero: {
      label: text('Capabilities', 'Capacidades'),
      title: text('Engineering Expertise.\nApplied to Complex Challenges.', 'Experiencia en ingeniería.\nAplicada a desafíos complejos.'),
      description: text('Modeling, simulation, software, and engineering analysis to help organizations evaluate systems, improve performance, and advance technical projects.', 'Modelado, simulación, software y análisis de ingeniería para ayudar a las organizaciones a evaluar sistemas, mejorar el rendimiento y avanzar proyectos técnicos.'),
      image: '/assets/figma/Tech/woman-analyzing-data-flowchart-computer-office.jpg',
      imageAlt: text('Engineer reviewing software and system diagrams across multiple screens', 'Ingeniera revisando software y diagramas de sistemas en varias pantallas'),
    },
    items: [
      { title: text('Engineering Intelligence', 'Inteligencia de ingeniería'), description: text('Data analysis, optimization, and decision-support solutions for complex engineering challenges.', 'Análisis de datos, optimización y soluciones de apoyo a la toma de decisiones para desafíos complejos de ingeniería.') },
      { title: text('Modeling, Simulation & Control', 'Modelado, simulación y control'), description: text('Modeling and simulation to evaluate system behavior, performance, and control strategies.', 'Modelado y simulación para evaluar el comportamiento, el rendimiento y las estrategias de control de los sistemas.') },
      { title: text('Engineering Software & Automation', 'Software de ingeniería y automatización'), description: text('Technical software, algorithms, and automated workflows that improve engineering processes.', 'Software técnico, algoritmos y flujos de trabajo automatizados que mejoran los procesos de ingeniería.') },
      { title: text('Embedded & Intelligent Systems', 'Sistemas embebidos e inteligentes'), description: text('Software and system-level engineering for embedded, connected, and intelligent applications.', 'Software e ingeniería de sistemas para aplicaciones embebidas, conectadas e inteligentes.') },
    ],
    approach: {
      title: text('Technology Follows the Problem.', 'La tecnología sigue al problema.'),
      description: text('The right methods and technologies, selected around your technical requirements—not the other way around.', 'Seleccionamos los métodos y las tecnologías adecuados según sus requisitos técnicos, y no al revés.'),
      label: text('Discuss Your Technical Requirements', 'Conversemos sobre sus requisitos técnicos'),
      image: '/assets/figma/Tech/colleagues-collaborating-laptop-office.jpg',
    },
  },
  'consulting-industries': {
    layout: 'industries',
    hero: {
      label: text('Industries', 'Industrias'),
      title: text('Engineering Expertise.\nAcross Critical Industries.', 'Experiencia en ingeniería.\nEn industrias esenciales.'),
      description: text('Engineering and technology consulting for organizations across the Dominican Republic and Latin America.', 'Consultoría en ingeniería y tecnología para organizaciones en la República Dominicana y América Latina.'),
    },
    items: [
      {
        title: text('Industrial Manufacturing', 'Manufactura industrial'),
        description: text('Modeling, simulation, automation, and engineering software for industrial processes and production systems.', 'Modelado, simulación, automatización y software de ingeniería para procesos industriales y sistemas de producción.'),
        image: '/assets/figma/Tech/industry-manufacturing-robot.png',
        imageAlt: text('Industrial robotic arm working on a manufacturing line', 'Brazo robótico industrial trabajando en una línea de producción'),
      },
      {
        title: text('Energy, Utilities & Oil and Gas', 'Energía, servicios públicos y petróleo y gas'),
        description: text('Engineering analysis, modeling, simulation, and technical software for energy infrastructure and operations.', 'Análisis de ingeniería, modelado, simulación y software técnico para infraestructura y operaciones energéticas.'),
        image: '/assets/figma/Tech/industry-energy-substation.png',
        imageAlt: text('Electrical transformers at a utility substation', 'Transformadores eléctricos en una subestación'),
      },
      {
        title: text('Technology & Product Engineering', 'Tecnología e ingeniería de productos'),
        description: text('Engineering software, simulation, algorithms, and technical development for products and connected systems.', 'Software de ingeniería, simulación, algoritmos y desarrollo técnico para productos y sistemas conectados.'),
        image: '/assets/figma/Tech/woman-analyzing-data-flowchart-computer-office.jpg',
        imageAlt: text('Engineer reviewing software and system diagrams', 'Ingeniera revisando software y diagramas de sistemas'),
      },
      {
        title: text('Medical Devices & Life Sciences', 'Dispositivos médicos y ciencias de la vida'),
        description: text('Modeling, technical software, and engineering support for medical technologies and device development.', 'Modelado, software técnico y apoyo de ingeniería para tecnologías médicas y desarrollo de dispositivos.'),
        image: '/assets/figma/Tech/industry-medical-device.png',
        imageAlt: text('Diagnostic instrument under development on a laboratory bench', 'Instrumento de diagnóstico en desarrollo sobre una mesa de laboratorio'),
      },
      {
        title: text('Agriculture & AgTech', 'Agricultura y tecnología agrícola'),
        description: text('Engineering analysis, automation, and data-driven solutions for agricultural equipment and systems.', 'Análisis de ingeniería, automatización y soluciones basadas en datos para equipos y sistemas agrícolas.'),
        image: '/assets/figma/Tech/industry-agtech-tractor.png',
        imageAlt: text('Sensor-equipped agricultural tractor working in a field', 'Tractor agrícola equipado con sensores trabajando en un campo'),
      },
      {
        title: text('Infrastructure & Transportation', 'Infraestructura y transporte'),
        description: text('Simulation, analytics, and optimization for infrastructure, logistics, and transportation systems.', 'Simulación, analítica y optimización para infraestructura, logística y sistemas de transporte.'),
        image: '/assets/figma/Construccio\u0301n/construction-site-with-tall-crane-building-development.jpg',
        imageAlt: text('Large infrastructure project under construction with cranes', 'Gran proyecto de infraestructura en construcción con grúas'),
      },
    ],
    cta: {
      title: text('Have a Technical Challenge?', '¿Tiene un desafío técnico?'),
      description: text("Let's discuss your engineering requirements and explore how Gradum Consulting can support your team.", 'Conversemos sobre sus requisitos de ingeniería y exploremos cómo Gradum Consulting puede apoyar a su equipo.'),
      label: projectCta,
    },
  },
  'consulting-how-we-work': {
    layout: 'process',
    hero: {
      label: text('How We Work', 'Cómo trabajamos'),
      title: text('A Disciplined Approach.\nFrom Analysis to Implementation.', 'Un enfoque disciplinado.\nDel análisis a la implementación.'),
      description: text('We structure each engagement around your technical requirements, project scope, and objectives.', 'Estructuramos cada proyecto en torno a sus requisitos técnicos, alcance y objetivos.'),
      image: '/assets/figma/Personas/business-people-conference-room.jpg',
      imageAlt: text('Team discussing project requirements around a conference table', 'Equipo conversando sobre los requisitos de un proyecto en una mesa de reuniones'),
    },
    items: [
      { number: '01', title: text('Discover', 'Descubrir'), description: text('Understand the objectives, technical requirements, and operating constraints.', 'Comprender los objetivos, requisitos técnicos y limitaciones operativas.') },
      { number: '02', title: text('Assess', 'Evaluar'), description: text('Evaluate alternatives, technical feasibility, and project priorities.', 'Evaluar alternativas, viabilidad técnica y prioridades del proyecto.') },
      { number: '03', title: text('Model & Prototype', 'Modelar y crear prototipos'), description: text('Develop models, simulations, or prototypes to test potential solutions.', 'Desarrollar modelos, simulaciones o prototipos para probar posibles soluciones.') },
      { number: '04', title: text('Validate', 'Validar'), description: text('Assess performance, technical trade-offs, and readiness for implementation.', 'Evaluar el rendimiento, los compromisos técnicos y la preparación para la implementación.') },
      { number: '05', title: text('Implement', 'Implementar'), description: text('Support integration and the transition to practical applications.', 'Apoyar la integración y la transición a aplicaciones prácticas.') },
      { number: '06', title: text('Improve', 'Mejorar'), description: text('Refine performance and adapt solutions as requirements evolve.', 'Refinar el rendimiento y adaptar las soluciones a medida que evolucionan los requisitos.') },
    ],
    support: {
      title: text('The Right Expertise. At the Right Stage.', 'La experiencia adecuada. En la etapa adecuada.'),
      description: text('From focused technical assessments to broader engineering projects, our involvement is defined by your needs—not a fixed process.', 'Desde evaluaciones técnicas específicas hasta proyectos de ingeniería más amplios, nuestra participación se define según sus necesidades, no por un proceso fijo.'),
    },
    cta: {
      title: text("Let's Define Your Next Step.", 'Definamos su próximo paso.'),
      description: text("Tell us about your technical challenge. We'll explore the right approach and next steps for your project.", 'Cuéntenos sobre su desafío técnico. Exploraremos el enfoque adecuado y los próximos pasos para su proyecto.'),
      label: projectCta,
    },
  },
} satisfies Record<'consulting-capabilities' | 'consulting-industries' | 'consulting-how-we-work', ConsultingDetailContent>;

export type ConsultingDetailKey = keyof typeof consultingDetails;

export function isConsultingDetailKey(page: string): page is ConsultingDetailKey {
  return Object.prototype.hasOwnProperty.call(consultingDetails, page);
}
