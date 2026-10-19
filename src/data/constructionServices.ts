import { text, type LocalizedText } from './siteContent';

export interface ConstructionServiceContent {
  hero: {
    eyebrow: LocalizedText;
    category: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    image: string;
    imageAlt: LocalizedText;
  };
  expertise: {
    label: LocalizedText;
    items: readonly { title: LocalizedText; description: LocalizedText }[];
  };
  support: {
    label?: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
  };
  cta: {
    title: LocalizedText;
    description: LocalizedText;
    label: LocalizedText;
  };
}

const eyebrow = text('Gradum Construction', 'Gradum Construcción');
const ctaLabel = text('Discuss Your Project', 'Conversemos sobre su proyecto');

export const constructionServices = {
  'construction-architecture': {
    hero: {
      eyebrow,
      category: text('Architecture', 'Arquitectura'),
      title: text('Architectural Design.\nFrom Concept to Detail.', 'Diseño arquitectónico.\nDel concepto al detalle.'),
      description: text('Architectural design, visualization, and technical documentation for residential, commercial, and development projects.', 'Diseño arquitectónico, visualización y documentación técnica para proyectos residenciales, comerciales y de desarrollo.'),
      image: '/assets/figma/Construccio\u0301n/employee-working-project-side-view.jpg',
      imageAlt: text('Architect reviewing floor plans and pointing to a drawing at a desk', 'Arquitecto revisando planos y señalando un dibujo en un escritorio'),
    },
    expertise: {
      label: text('Architecture expertise', 'Experiencia en arquitectura'),
      items: [
        { title: text('Concept Design & Space Planning', 'Diseño conceptual y planificación espacial'), description: text('Architectural concepts, preliminary layouts, and spatial planning aligned with project requirements.', 'Conceptos arquitectónicos, distribuciones preliminares y planificación espacial alineados con los requisitos del proyecto.') },
        { title: text('Architectural Design & Development', 'Diseño y desarrollo arquitectónico'), description: text('Residential and commercial architectural design, floor plans, elevations, sections, and design development.', 'Diseño arquitectónico residencial y comercial, plantas, alzados, secciones y desarrollo del diseño.') },
        { title: text('3D Modeling & Visualization', 'Modelado y visualización 3D'), description: text('Architectural 3D models, renderings, and visual presentations to communicate design intent.', 'Modelos arquitectónicos 3D, renderizados y presentaciones visuales para comunicar la intención del diseño.') },
        { title: text('Construction Drawings & Documentation', 'Planos y documentación para construcción'), description: text('Architectural construction drawings, technical details, and documentation supporting project execution.', 'Planos arquitectónicos de construcción, detalles técnicos y documentación que respaldan la ejecución del proyecto.') },
        { title: text('Renovation & Remodeling Design', 'Diseño de renovación y remodelación'), description: text('Architectural redesign, space adaptation, and renovation planning for existing properties.', 'Rediseño arquitectónico, adaptación de espacios y planificación de renovaciones para propiedades existentes.') },
        { title: text('Architectural Coordination & Technical Support', 'Coordinación arquitectónica y apoyo técnico'), description: text('Design revisions, technical reviews, and coordination with engineering and construction teams.', 'Revisiones de diseño, evaluaciones técnicas y coordinación con equipos de ingeniería y construcción.') },
      ],
    },
    support: {
      title: text('Architectural Expertise. At Every Stage.', 'Experiencia arquitectónica. En cada etapa.'),
      description: text('From individual drawings and visualizations to complete architectural design scopes, we support developers, contractors, design firms, and property owners.', 'Desde planos y visualizaciones individuales hasta alcances completos de diseño arquitectónico, apoyamos a desarrolladores, contratistas, firmas de diseño y propietarios.'),
    },
    cta: {
      title: text("Let's Discuss Your Architectural Project.", 'Conversemos sobre su proyecto arquitectónico.'),
      description: text("Share your requirements. We'll identify the design services and deliverables your project needs.", 'Comparta sus requisitos. Identificaremos los servicios de diseño y entregables que necesita su proyecto.'),
      label: ctaLabel,
    },
  },
  'construction-engineering': {
    hero: {
      eyebrow,
      category: text('Engineering', 'Ingeniería'),
      title: text('Engineering Precision.\nFrom Design to Delivery.', 'Precisión en ingeniería.\nDel diseño a la entrega.'),
      description: text('Structural engineering, building systems, cost estimating, and technical project support for residential, commercial, and construction projects.', 'Ingeniería estructural, sistemas de edificación, estimación de costos y apoyo técnico para proyectos residenciales, comerciales y de construcción.'),
      image: '/assets/figma/Construccio\u0301n/portrait-architect-engineer-with-experience-multistory-building-construction.jpg',
      imageAlt: text('Two engineers reviewing construction plans beside a building under construction', 'Dos ingenieros revisando planos de construcción junto a un edificio en obra'),
    },
    expertise: {
      label: text('Our Expertise', 'Nuestra experiencia'),
      items: [
        { title: text('Cost Estimating & Budgeting', 'Estimación de costos y presupuestos'), description: text('Construction budgets, detailed cost estimates, and unit price analysis for project planning and procurement.', 'Presupuestos de construcción, estimaciones detalladas de costos y análisis de precios unitarios para la planificación y adquisición del proyecto.') },
        { title: text('Quantity Takeoffs & Progress Valuations', 'Cómputos de cantidades y valuaciones de avance'), description: text('Material quantities, construction measurements, and progress valuations for accurate project assessment.', 'Cantidades de materiales, mediciones de obra y valuaciones de avance para una evaluación precisa del proyecto.') },
        { title: text('Structural Engineering', 'Ingeniería estructural'), description: text('Structural design, calculations, and technical drawings aligned with project requirements.', 'Diseño estructural, cálculos y planos técnicos alineados con los requisitos del proyecto.') },
        { title: text('Building Systems Engineering', 'Ingeniería de sistemas de edificación'), description: text('Electrical, plumbing, and sanitary engineering design and technical coordination.', 'Diseño de ingeniería eléctrica, de plomería y sanitaria, y coordinación técnica.') },
        { title: text('Technical Documentation & Coordination', 'Documentación y coordinación técnica'), description: text('Construction drawings, technical reviews, and coordination across architectural and engineering disciplines.', 'Planos de construcción, revisiones técnicas y coordinación entre las disciplinas de arquitectura e ingeniería.') },
        { title: text('Project Planning & Cost Control', 'Planificación de proyectos y control de costos'), description: text('Project schedules, budget monitoring, cost reporting, and analysis of changes during execution.', 'Cronogramas de proyecto, seguimiento presupuestario, informes de costos y análisis de cambios durante la ejecución.') },
      ],
    },
    support: {
      title: text('Technical Expertise. When You Need It.', 'Experiencia técnica. Cuando la necesita.'),
      description: text('From individual engineering deliverables to broader project coordination, we support contractors, developers, design firms, and project owners.', 'Desde entregables individuales de ingeniería hasta una coordinación de proyecto más amplia, apoyamos a contratistas, desarrolladores, firmas de diseño y propietarios de proyectos.'),
    },
    cta: {
      title: text("Let's Discuss Your Engineering Requirements.", 'Conversemos sobre sus requisitos de ingeniería.'),
      description: text("Share your project scope. We'll identify the technical services and deliverables your team needs.", 'Comparta el alcance de su proyecto. Identificaremos los servicios técnicos y entregables que necesita su equipo.'),
      label: ctaLabel,
    },
  },
  'construction-build': {
    hero: {
      eyebrow,
      category: text('Execution', 'Ejecución'),
      title: text('From Planning.\nTo Built Reality.', 'De la planificación.\nA la realidad construida.'),
      description: text('Construction execution, project management, and site supervision for residential and commercial projects.', 'Ejecución de obras, gestión de proyectos y supervisión de obra para proyectos residenciales y comerciales.'),
      image: '/assets/figma/Construccio\u0301n/asian-two-business-man-construction-engineers-supervising-progress-construction-project-construction-site.jpg',
      imageAlt: text('Construction supervisors coordinating work at an active building site', 'Supervisores de construcción coordinando trabajos en una obra activa'),
    },
    expertise: {
      label: text('Our Expertise', 'Nuestra experiencia'),
      items: [
        { title: text('Construction Execution', 'Ejecución de obras'), description: text('Construction of residential, commercial, and development projects in accordance with approved plans and specifications.', 'Construcción de proyectos residenciales, comerciales y de desarrollo de acuerdo con los planos y especificaciones aprobados.') },
        { title: text('Preconstruction & Planning', 'Preconstrucción y planificación'), description: text('Scope assessment, construction sequencing, resource planning, and site preparation.', 'Evaluación del alcance, secuenciación de la construcción, planificación de recursos y preparación del sitio.') },
        { title: text('Construction Management', 'Gestión de construcción'), description: text('Management of project schedules, resources, contractors, and construction activities.', 'Gestión de cronogramas, recursos, contratistas y actividades de construcción del proyecto.') },
        { title: text('Site Supervision & Quality Control', 'Supervisión de obra y control de calidad'), description: text('On-site supervision, progress monitoring, and quality control throughout construction.', 'Supervisión en obra, seguimiento del avance y control de calidad durante toda la construcción.') },
        { title: text('Contractor & Supplier Coordination', 'Coordinación de contratistas y proveedores'), description: text('Coordination of subcontractors, suppliers, materials, and construction logistics.', 'Coordinación de subcontratistas, proveedores, materiales y logística de construcción.') },
        { title: text('Project Closeout & Handover', 'Cierre y entrega del proyecto'), description: text('Final inspections, completion reviews, outstanding-item resolution, and project handover.', 'Inspecciones finales, revisiones de finalización, resolución de pendientes y entrega del proyecto.') },
      ],
    },
    support: {
      label: text('Our Approach', 'Nuestro enfoque'),
      title: text('Built on Planning.\nDelivered Through Execution.', 'Fundada en la planificación.\nEntregada mediante la ejecución.'),
      description: text("From individual construction scopes to complete project execution, we align technical requirements, resources, and on-site coordination with each project's objectives.", 'Desde alcances individuales de construcción hasta la ejecución completa del proyecto, alineamos los requisitos técnicos, los recursos y la coordinación en obra con los objetivos de cada proyecto.'),
    },
    cta: {
      title: text('Ready to Build?', '¿Listo para construir?'),
      description: text("Tell us about your project. We'll evaluate the scope, requirements, and next steps.", 'Cuéntenos sobre su proyecto. Evaluaremos el alcance, los requisitos y los próximos pasos.'),
      label: ctaLabel,
    },
  },
} satisfies Record<'construction-architecture' | 'construction-engineering' | 'construction-build', ConstructionServiceContent>;

export type ConstructionServiceKey = keyof typeof constructionServices;

export function isConstructionServiceKey(page: string): page is ConstructionServiceKey {
  return Object.prototype.hasOwnProperty.call(constructionServices, page);
}
