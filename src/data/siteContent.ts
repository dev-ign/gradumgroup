import type { Language } from '../context/LanguageContext';

export type ThemeFamily = 'consulting' | 'construction' | 'services' | 'brand';

export interface LocalizedText {
  en: string;
  es: string;
}

export const text = (en: string, es: string): LocalizedText => ({ en, es });
export const localize = (value: LocalizedText, lang: Language) => value[lang];

export interface FeatureItem {
  code?: string;
  title: LocalizedText;
  description: LocalizedText;
  image?: string;
}

export interface DetailPageContent {
  family: ThemeFamily;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  image?: string;
  imageAlt?: LocalizedText;
  layout: 'wide' | 'split' | 'list' | 'cards';
  items: FeatureItem[];
  statement?: LocalizedText;
  statementEyebrow?: LocalizedText;
  statementImage?: string;
  cta: LocalizedText;
}

export interface LandingCard extends FeatureItem {
  href: string;
}

export interface PlatformLandingContent {
  family: ThemeFamily;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  primaryCta: LocalizedText;
  secondaryCta: LocalizedText;
  heroImages: string[];
  heroImageAlts: LocalizedText[];
  cards: LandingCard[];
  statement: LocalizedText;
  statementBody: LocalizedText;
  statementTitle?: LocalizedText;
  toolsTitle?: LocalizedText;
  toolsBody?: LocalizedText;
  tools?: string[];
}

export const platformLandings: Record<'consulting' | 'construction' | 'services', PlatformLandingContent> = {
  consulting: {
    family: 'consulting',
    eyebrow: text('Gradum Consulting', 'Gradum Consultoría'),
    title: text('Engineering solutions for complex systems.', 'Soluciones de ingeniería para sistemas complejos.'),
    description: text(
      'Gradum combines engineering, modeling, simulation, data and software to help organizations solve technical challenges and move from analysis to implementation.',
      'Gradum combina ingeniería, modelado, simulación, datos y software para resolver retos técnicos y avanzar del análisis a la implementación.',
    ),
    primaryCta: text('Request a Consultation', 'Solicitar una consulta'),
    secondaryCta: text('Explore Capabilities', 'Explorar capacidades'),
    heroImages: ['/assets/figma/Tech/magnific_recrea-esta-imagen-mejora_SyAMSTJUb8.jpeg', '/assets/figma/Tech/forecast-expert-ceo-analyzing-investment-insights-negotiations-details.jpg', '/assets/figma/Tech/cheerful-young-businessman-using-digital-tablet-smiling-while-his-colleagues-working-background.jpg'],
    heroImageAlts: [text('Developer working on technical software', 'Desarrollador trabajando en software técnico'), text('Specialist reviewing data on a laptop', 'Especialista revisando datos en una computadora'), text('Technology professional with a tablet in the office', 'Profesional de tecnología con una tableta en la oficina')],
    cards: [
      {
        title: text('Capabilities', 'Capacidades'),
        description: text('Engineering intelligence, modeling, simulation, controls and technical software.', 'Inteligencia de ingeniería, modelado, simulación, controles y software técnico.'),
        image: '/assets/figma/Tech/medium-shot-latin-friends-hanging-out (1).jpg',
        href: '/consulting/capabilities',
      },
      {
        title: text('Industries', 'Industrias'),
        description: text('Applied across complex industrial, infrastructure and technology environments.', 'Aplicado en entornos industriales, de infraestructura y tecnología complejos.'),
        image: '/assets/figma/Construccio\u0301n/architect-engineer-pointing-architectural-building-prototype-analyzing-construction-model-computer-businessman-designer-working-remote-from-home-real-estate-project-modeling-sketch.jpg',
        href: '/consulting/industries',
      },
      {
        title: text('How We Work', 'Cómo trabajamos'),
        description: text('From assessment and modeling to prototype, implementation and ongoing support.', 'Desde la evaluación y el modelado hasta el prototipo, la implementación y el soporte continuo.'),
        image: '/assets/figma/Personas/middle-aged-hispanic-business-people (6).jpg',
        href: '/consulting/how-we-work',
      },
    ],
    statement: text('From technical complexity to practical execution.', 'De la complejidad técnica a la ejecución práctica.'),
    statementBody: text('We work alongside engineering and leadership teams to understand the problem, evaluate alternatives and develop solutions for real operating environments.', 'Trabajamos junto a equipos de ingeniería y liderazgo para entender el problema, evaluar alternativas y desarrollar soluciones para entornos operativos reales.'),
    toolsTitle: text('Engineering tools. Applied with purpose.', 'Herramientas de ingeniería. Aplicadas con propósito.'),
    toolsBody: text('Our work can incorporate MATLAB and Simulink, Python, C/C++, databases, cloud platforms, instrumentation and embedded technologies—selected around the engineering problem, not the tool.', 'Nuestro trabajo puede incorporar MATLAB y Simulink, Python, C/C++, bases de datos, plataformas en la nube, instrumentación y tecnologías embebidas—seleccionadas según el problema de ingeniería.'),
    tools: ['MATLAB & Simulink', 'Python', 'C / C++', 'Databases', 'Cloud Platforms', 'Instrumentation', 'Embedded Technologies'],
  },
  construction: {
    family: 'construction',
    eyebrow: text('Gradum Construction', 'Gradum Construcción'),
    title: text('From concept to built reality.', 'Del concepto a la realidad construida.'),
    description: text('Architecture, engineering and execution brought together to create projects that are thoughtful, buildable and aligned with the client’s objectives.', 'Arquitectura, ingeniería y ejecución integradas para crear proyectos bien pensados, construibles y alineados con los objetivos del cliente.'),
    primaryCta: text('Discuss a Project', 'Conversemos sobre su proyecto'),
    secondaryCta: text('Explore Construction', 'Explorar construcción'),
    heroImages: ['/assets/figma/Construccio\u0301n/woman-studying-draft-construction-site.jpg'],
    heroImageAlts: [text('Architect reviewing plans at a construction site', 'Arquitecta revisando planos en una obra')],
    cards: [
      { code: '01', title: text('Architecture', 'Arquitectura'), description: text('Purpose-driven design shaped by context, function and experience.', 'Diseño con propósito, definido por el contexto, la función y la experiencia.'), image: '/assets/figma/Construccio\u0301n/detailed-view-interior-inspection-process-home.jpg', href: '/construction/architecture' },
      { code: '02', title: text('Engineering', 'Ingeniería'), description: text('Technical coordination that makes design safe, functional and executable.', 'Coordinación técnica que hace el diseño seguro, funcional y ejecutable.'), image: '/assets/figma/Construccio\u0301n/employee-working-project-side-view.jpg', href: '/construction/engineering' },
      { code: '03', title: text('Build', 'Construcción'), description: text('Disciplined project execution with visibility across quality, schedule and delivery.', 'Ejecución disciplinada con visibilidad sobre calidad, cronograma y entrega.'), image: '/assets/figma/Construccio\u0301n/close-up-construction-worker-construction-site.jpg', href: '/construction/build' },
    ],
    statement: text('One project. One integrated approach.', 'Un proyecto. Un enfoque integrado.'),
    statementBody: text('We connect design, technical coordination and execution early—reducing fragmentation between what is envisioned, engineered and delivered.', 'Conectamos diseño, coordinación técnica y ejecución desde el inicio, reduciendo la fragmentación entre lo concebido, diseñado y entregado.'),
  },
  services: {
    family: 'services',
    eyebrow: text('Gradum Services', 'Gradum Servicios'),
    title: text('The operating disciplines behind stronger businesses.', 'Las disciplinas operativas detrás de empresas más sólidas.'),
    description: text('Financial, commercial and administrative support designed to give growing organizations greater structure, visibility and execution capacity.', 'Soporte financiero, comercial y administrativo para dar a organizaciones en crecimiento mayor estructura, visibilidad y capacidad de ejecución.'),
    primaryCta: text('Talk to Our Team', 'Hable con nuestro equipo'),
    secondaryCta: text('Explore Services', 'Explorar servicios'),
    heroImages: ['/assets/figma/Finanzas/middle-aged-hispanic-business-people (2).jpg', '/assets/figma/Creatividad/medium-shot-business-woman-with-post-its.jpg'],
    heroImageAlts: [text('Business advisor reviewing information with a colleague', 'Asesora empresarial revisando información con un colega'), text('Creative professional organizing ideas on a glass wall', 'Profesional creativa organizando ideas en un muro de vidrio')],
    cards: [
      { code: '01', title: text('Accounting & Finance', 'Contabilidad y Finanzas'), description: text('Accounting, reporting and financial discipline for better business control.', 'Contabilidad, reportes y disciplina financiera para un mejor control empresarial.'), image: '/assets/figma/Finanzas/man-is-writing-calculator-pen-paper.jpg', href: '/services/accounting-finance' },
      { code: '02', title: text('Marketing & Media', 'Marketing y Medios'), description: text('Strategy, content and communication aligned with commercial objectives.', 'Estrategia, contenido y comunicación alineados con objetivos comerciales.'), image: '/assets/figma/Creatividad/medium-shot-happy-business-people.jpg', href: '/services/marketing-media' },
      { code: '03', title: text('Admin & Legal', 'Administración y Legal'), description: text('Administrative and business support for the requirements behind day-to-day operations.', 'Soporte administrativo y empresarial para las necesidades de la operación diaria.'), image: '/assets/figma/Finanzas/side-view-cropped-unrecognizable-business-people-working-common-desk.jpg', href: '/services/admin-legal' },
    ],
    statement: text('Built for growing organizations.', 'Creado para organizaciones en crecimiento.'),
    statementBody: text('Access professional capability where you need it—without building every function internally.', 'Acceda a capacidad profesional donde la necesita, sin construir cada función internamente.'),
  },
};

export const detailPages: Record<string, DetailPageContent> = {
  'consulting-capabilities': {
    family: 'consulting',
    eyebrow: text('Capabilities', 'Capacidades'),
    title: text('Technical capabilities for complex engineering decisions.', 'Capacidades técnicas para decisiones complejas de ingeniería.'),
    description: text('We combine engineering methods, computational tools and software to understand systems, improve performance and accelerate implementation.', 'Combinamos métodos de ingeniería, herramientas computacionales y software para comprender sistemas, mejorar el rendimiento y acelerar la implementación.'),
    image: '/assets/figma/Tech/woman-analyzing-data-flowchart-computer-office.jpg',
    imageAlt: text('Engineer analyzing data across multiple screens', 'Ingeniera analizando datos en varias pantallas'),
    layout: 'wide',
    items: [
      { code: 'C–01', title: text('Engineering Intelligence', 'Inteligencia de Ingeniería'), description: text('Data analysis, AI, optimization and decision-support methods for engineering and operational environments.', 'Análisis de datos, IA, optimización y métodos de apoyo a decisiones para entornos operativos y de ingeniería.') },
      { code: 'C–02', title: text('Modeling, Simulation & Control', 'Modelado, Simulación y Control'), description: text('System modeling, simulation, controls and scenario analysis to evaluate behavior before implementation.', 'Modelado de sistemas, simulación, controles y análisis de escenarios para evaluar el comportamiento antes de implementar.') },
      { code: 'C–03', title: text('Engineering Software & Automation', 'Software de Ingeniería y Automatización'), description: text('Technical applications, algorithms and automated workflows that improve engineering productivity and decision-making.', 'Aplicaciones técnicas, algoritmos y flujos automatizados que mejoran la productividad y la toma de decisiones.') },
      { code: 'C–04', title: text('Embedded & Intelligent Systems', 'Sistemas Embebidos e Inteligentes'), description: text('Software, algorithms and system-level support for connected, embedded and edge applications.', 'Software, algoritmos y soporte a nivel de sistema para aplicaciones conectadas, embebidas y de borde.') },
    ],
    statement: text('Technology follows the problem.', 'La tecnología sigue al problema.'),
    statementImage: '/assets/figma/Tech/colleagues-collaborating-laptop-office.jpg',
    cta: text('Request a Consultation', 'Solicitar una consulta'),
  },
  'consulting-industries': {
    family: 'consulting',
    eyebrow: text('Industries', 'Industrias'),
    title: text('Applied where engineering complexity matters.', 'Aplicado donde la complejidad de ingeniería importa.'),
    description: text('Our capabilities support organizations operating complex systems, products and infrastructure.', 'Nuestras capacidades apoyan a organizaciones que operan sistemas, productos e infraestructura compleja.'),
    layout: 'list',
    items: [
      { code: '01', title: text('Energy & Utilities', 'Energía y Servicios Públicos'), description: text('Modeling, analytics, optimization and engineering tools for energy systems and operations.', 'Modelado, analítica, optimización y herramientas de ingeniería para sistemas y operaciones de energía.'), image: '/assets/figma/Construccio\u0301n/asian-two-business-man-construction-engineers-supervising-progress-construction-project-construction-site.jpg' },
      { code: '02', title: text('Manufacturing & Industrial', 'Manufactura e Industria'), description: text('Simulation, automation and technical software for equipment, processes and production environments.', 'Simulación, automatización y software técnico para equipos, procesos y entornos de producción.'), image: '/assets/figma/Finanzas/tablet-label-shipping-with-man-warehouse-logistics-route-tracking-code-cargo-box-inventory-checklist-ecommerce-delivery-with-person-factory-supplier-distribution-depot.jpg' },
      { code: '03', title: text('Infrastructure', 'Infraestructura'), description: text('Engineering analysis and computational methods for infrastructure, utilities and complex built systems.', 'Análisis de ingeniería y métodos computacionales para infraestructura, servicios y sistemas construidos complejos.'), image: '/assets/figma/Construccio\u0301n/unfinished-gray-building-construction-exterior.jpg' },
      { code: '04', title: text('Aerospace & Advanced Mobility', 'Aeroespacial y Movilidad Avanzada'), description: text('Modeling, controls, simulation and software for demanding system-level applications.', 'Modelado, controles, simulación y software para aplicaciones exigentes a nivel de sistema.'), image: '/assets/figma/Tech/forecast-expert-ceo-analyzing-investment-insights-negotiations-details.jpg' },
      { code: '05', title: text('Technology & Engineering Organizations', 'Organizaciones de Tecnología e Ingeniería'), description: text('Specialized engineering software, analytics and computational support for technical teams.', 'Software de ingeniería especializado, analítica y soporte computacional para equipos técnicos.'), image: '/assets/figma/Tech/woman-working-mobile-app-interface-desk.jpg' },
    ],
    statement: text('Capability-led. Industry-aware.', 'Guiados por capacidad. Conscientes de la industria.'),
    cta: text('Discuss an Industry Challenge', 'Conversemos sobre un reto de la industria'),
  },
  'consulting-how-we-work': {
    family: 'consulting',
    eyebrow: text('How We Work', 'Cómo trabajamos'),
    title: text('A disciplined path from problem to implementation.', 'Un camino disciplinado del problema a la implementación.'),
    description: text('Engagements are structured around the maturity of the challenge and the decision the client needs to make.', 'Los proyectos se estructuran según la madurez del reto y la decisión que el cliente necesita tomar.'),
    image: '/assets/figma/Personas/business-people-conference-room.jpg',
    imageAlt: text('Business team working together in a conference room', 'Equipo empresarial trabajando en una sala de reuniones'),
    layout: 'split',
    items: [
      { code: '01', title: text('Discover', 'Descubrir'), description: text('Understand objectives, systems, constraints and operating context.', 'Comprender objetivos, sistemas, restricciones y contexto operativo.') },
      { code: '02', title: text('Assess', 'Evaluar'), description: text('Frame the opportunity, establish requirements and identify the highest-value path.', 'Definir la oportunidad, establecer requisitos e identificar el camino de mayor valor.') },
      { code: '03', title: text('Model & Prototype', 'Modelar y Prototipar'), description: text('Use models, simulations or prototypes to test assumptions and reduce uncertainty.', 'Usar modelos, simulaciones o prototipos para probar supuestos y reducir incertidumbre.') },
      { code: '04', title: text('Validate', 'Validar'), description: text('Evaluate performance, trade-offs and implementation readiness.', 'Evaluar rendimiento, compensaciones y preparación para implementar.') },
      { code: '05', title: text('Implement', 'Implementar'), description: text('Translate validated concepts into deployable solutions and workflows.', 'Convertir conceptos validados en soluciones y flujos desplegables.') },
      { code: '06', title: text('Improve', 'Mejorar'), description: text('Refine performance and support continued adoption as requirements evolve.', 'Refinar el rendimiento y apoyar la adopción continua a medida que evolucionan los requisitos.') },
    ],
    statement: text('Start at the right scale.', 'Comience con la escala adecuada.'),
    cta: text('Request a Consultation', 'Solicitar una consulta'),
  },
  'construction-architecture': {
    family: 'construction', eyebrow: text('Gradum Construction', 'Gradum Construcción'), title: text('Architecture shaped by purpose.', 'Arquitectura definida por el propósito.'), description: text('We design spaces around function, context, experience and long-term value.', 'Diseñamos espacios en torno a la función, el contexto, la experiencia y el valor a largo plazo.'), image: '/assets/figma/Construccio\u0301n/employee-working-project-side-view.jpg', imageAlt: text('Architect reviewing a floor plan with a colleague', 'Arquitecto revisando un plano con un colega'), layout: 'split',
    items: [
      { code: '01', title: text('Concept & Feasibility', 'Concepto y Factibilidad'), description: text('Define the project direction around site, program and objectives.', 'Definir la dirección del proyecto según sitio, programa y objetivos.') },
      { code: '02', title: text('Architectural Design', 'Diseño Arquitectónico'), description: text('Translate requirements into coherent spatial and design solutions.', 'Convertir requisitos en soluciones espaciales y de diseño coherentes.') },
      { code: '03', title: text('Design Development', 'Desarrollo de Diseño'), description: text('Advance concepts into coordinated materials, layouts and technical decisions.', 'Desarrollar conceptos en materiales, distribuciones y decisiones técnicas coordinadas.') },
      { code: '04', title: text('Documentation & Coordination', 'Documentación y Coordinación'), description: text('Prepare the information required to move efficiently toward execution.', 'Preparar la información necesaria para avanzar eficientemente hacia la ejecución.') },
    ], cta: text('Discuss Your Project', 'Conversemos sobre su proyecto'),
  },
  'construction-engineering': {
    family: 'construction', eyebrow: text('Gradum Construction', 'Gradum Construcción'), title: text('Engineering that makes design executable.', 'Ingeniería que hace el diseño ejecutable.'), description: text('Technical coordination focused on performance, constructability and project integration.', 'Coordinación técnica enfocada en rendimiento, constructibilidad e integración del proyecto.'), image: '/assets/figma/Construccio\u0301n/portrait-architect-engineer-with-experience-multistory-building-construction.jpg', imageAlt: text('Engineers reviewing plans beside a building under construction', 'Ingenieros revisando planos junto a un edificio en construcción'), layout: 'wide',
    items: [
      { code: 'E–01', title: text('Structural Coordination', 'Coordinación Estructural'), description: text('Align structural requirements with architecture and project constraints.', 'Alinear requisitos estructurales con arquitectura y restricciones del proyecto.') },
      { code: 'E–02', title: text('MEP Coordination', 'Coordinación MEP'), description: text('Coordinate mechanical, electrical and plumbing requirements.', 'Coordinar requisitos mecánicos, eléctricos y de plomería.') },
      { code: 'E–03', title: text('Technical Planning', 'Planificación Técnica'), description: text('Resolve technical interfaces and constructability considerations early.', 'Resolver interfaces técnicas y consideraciones de constructibilidad desde temprano.') },
      { code: 'E–04', title: text('Interdisciplinary Review', 'Revisión Interdisciplinaria'), description: text('Identify coordination gaps before they become execution problems.', 'Identificar brechas de coordinación antes de que se conviertan en problemas de ejecución.') },
    ], cta: text('Discuss Your Project', 'Conversemos sobre su proyecto'),
  },
  'construction-build': {
    family: 'construction', eyebrow: text('Gradum Construction', 'Gradum Construcción'), title: text('Disciplined execution from plan to delivery.', 'Ejecución disciplinada del plan a la entrega.'), description: text('We coordinate construction around quality, visibility and accountability.', 'Coordinamos la construcción en torno a calidad, visibilidad y responsabilidad.'), image: '/assets/figma/Construccio\u0301n/asian-two-business-man-construction-engineers-supervising-progress-construction-project-construction-site.jpg', imageAlt: text('Construction team supervising work at an active site', 'Equipo de construcción supervisando trabajos en una obra activa'), layout: 'wide',
    items: [
      { code: '01', title: text('Preconstruction', 'Preconstrucción'), description: text('Clarify scope, sequencing and execution requirements.', 'Aclarar alcance, secuencia y requisitos de ejecución.') },
      { code: '02', title: text('Construction Management', 'Gestión de Construcción'), description: text('Coordinate schedules, information and stakeholders.', 'Coordinar cronogramas, información y actores involucrados.') },
      { code: '03', title: text('Project Supervision', 'Supervisión de Proyecto'), description: text('Maintain visibility into progress, quality and approved project requirements.', 'Mantener visibilidad del avance, calidad y requisitos aprobados.') },
      { code: '04', title: text('Closeout & Delivery', 'Cierre y Entrega'), description: text('Support completion and structured project handover.', 'Apoyar la finalización y entrega estructurada del proyecto.') },
    ], cta: text('Discuss Your Project', 'Conversemos sobre su proyecto'),
  },
  'services-accounting': {
    family: 'services', eyebrow: text('Gradum Services', 'Gradum Servicios'), title: text('Financial clarity for better decisions.', 'Claridad financiera para mejores decisiones.'), description: text('We help businesses strengthen accounting discipline, reporting and financial visibility.', 'Ayudamos a las empresas a fortalecer su disciplina contable, reportes y visibilidad financiera.'), image: '/assets/figma/Finanzas/medium-shot-woman-working-as-economist.jpg', imageAlt: text('Financial professional reviewing figures at her desk', 'Profesional financiera revisando cifras en su escritorio'), layout: 'split',
    items: [
      { code: 'F–01', title: text('Accounting & Bookkeeping', 'Contabilidad y Registros'), description: text('Reliable records and organized financial information.', 'Registros confiables e información financiera organizada.') },
      { code: 'F–02', title: text('Tax & Compliance Support', 'Soporte Fiscal y de Cumplimiento'), description: text('Structured support for recurring tax and regulatory obligations.', 'Soporte estructurado para obligaciones fiscales y regulatorias recurrentes.') },
      { code: 'F–03', title: text('Financial Reporting', 'Reportes Financieros'), description: text('Clear management reporting for better visibility into performance.', 'Reportes gerenciales claros para mayor visibilidad del desempeño.') },
      { code: 'F–04', title: text('Cash Flow & Planning', 'Flujo de Caja y Planificación'), description: text('Forward-looking visibility into liquidity, obligations and financial needs.', 'Visibilidad futura sobre liquidez, obligaciones y necesidades financieras.') },
    ], statementEyebrow: text('Our Approach', 'Nuestro Enfoque'), statement: text('Good accounting should do more than meet an obligation. It should help management understand the business.', 'La buena contabilidad debe hacer más que cumplir una obligación. Debe ayudar a la gerencia a comprender el negocio.'), statementImage: '/assets/figma/Finanzas/side-view-woman-working-as-economist.jpg', cta: text('Talk to Our Team', 'Hable con nuestro equipo'),
  },
  'services-marketing': {
    family: 'services', eyebrow: text('Gradum Services', 'Gradum Servicios'), title: text('Clear positioning. Consistent execution.', 'Posicionamiento claro. Ejecución consistente.'), description: text('Strategy, content and communication designed around business and commercial objectives.', 'Estrategia, contenido y comunicación diseñados en torno a objetivos empresariales y comerciales.'), image: '/assets/figma/Creatividad/medium-shot-smiley-business-woman-with-post-its.jpg', imageAlt: text('Creative strategist arranging ideas on a glass wall', 'Estratega creativa organizando ideas en un muro de vidrio'), layout: 'cards',
    items: [
      { title: text('Brand & Positioning', 'Marca y Posicionamiento'), description: text('Clarify how the business should be understood and differentiated.', 'Aclarar cómo debe entenderse y diferenciarse el negocio.'), image: '/assets/figma/Creatividad/medium-shot-happy-business-people.jpg' },
      { title: text('Marketing Strategy', 'Estrategia de Marketing'), description: text('Define audiences, priorities, channels and campaigns.', 'Definir audiencias, prioridades, canales y campañas.'), image: '/assets/figma/Creatividad/medium-shot-people-meeting.jpg' },
      { title: text('Content & Creative', 'Contenido y Creatividad'), description: text('Build consistent, professional communication across formats.', 'Construir comunicación consistente y profesional en todos los formatos.'), image: '/assets/figma/Creatividad/medium-shot-people-working-with-laptop.jpg' },
      { title: text('Digital & Social', 'Digital y Social'), description: text('Structure digital presence around relevance, consistency and growth.', 'Estructurar la presencia digital en torno a relevancia, consistencia y crecimiento.') },
    ], statementEyebrow: text('Our Approach', 'Nuestro Enfoque'), statement: text('Strategy comes before volume. Every channel should have a reason to exist.', 'La estrategia viene antes que el volumen. Cada canal debe tener una razón de existir.'), statementImage: '/assets/figma/Personas/authentic-small-youthful-marketing-agency (3).jpg', cta: text('Talk to Our Team', 'Hable con nuestro equipo'),
  },
  'services-admin': {
    family: 'services', eyebrow: text('Gradum Services', 'Gradum Servicios'), title: text('Structure behind the business.', 'Estructura detrás del negocio.'), description: text('Practical administrative and business support that helps organizations operate with greater consistency.', 'Soporte administrativo y empresarial práctico que ayuda a operar con mayor consistencia.'), image: '/assets/figma/Personas/business-people-conference-room-medium-shot.jpg', imageAlt: text('Business professional coordinating work with an office team', 'Profesional coordinando el trabajo con un equipo de oficina'), layout: 'wide',
    items: [
      { code: '01', title: text('Business Administration', 'Administración Empresarial'), description: text('Support recurring administrative workflows and documentation.', 'Apoyar flujos administrativos recurrentes y documentación.') },
      { code: '02', title: text('Corporate Coordination', 'Coordinación Corporativa'), description: text('Organize routine corporate and regulatory requirements.', 'Organizar requisitos corporativos y regulatorios rutinarios.') },
      { code: '03', title: text('Contracts & Documentation', 'Contratos y Documentación'), description: text('Coordinate common business documents and agreement workflows.', 'Coordinar documentos empresariales y flujos de acuerdos comunes.') },
      { code: '04', title: text('Business Setup Support', 'Soporte para Establecimiento Empresarial'), description: text('Help new organizations establish the administrative foundations to operate.', 'Ayudar a nuevas organizaciones a establecer las bases administrativas para operar.') },
    ], statementEyebrow: text('Our Approach', 'Nuestro Enfoque'), statement: text('Specialized legal matters are coordinated with qualified professionals where required.', 'Los asuntos legales especializados se coordinan con profesionales calificados cuando es necesario.'), cta: text('Talk to Our Team', 'Hable con nuestro equipo'),
  },
};

export const homeContent = {
  imagery: {
    consulting: '/assets/figma/Tech/colleagues-collaborating-laptop-office.jpg',
    construction: '/assets/figma/Construccio\u0301n/portrait-architect-engineer-with-experience-multistory-building-construction.jpg',
    services: '/assets/figma/Finanzas/side-view-cropped-unrecognizable-business-people-working-common-desk.jpg',
    cta: '/assets/figma/Personas/middle-aged-hispanic-business-people (3).jpg',
    ctaAlt: text('Colleagues collaborating on a project in the office', 'Colegas colaborando en un proyecto en la oficina'),
    networkMapAlt: text('Network map showing connections from the Dominican Republic across the Americas.', 'Mapa de conexiones desde la República Dominicana hacia el resto de las Américas.'),
  },
  hero: {
    title: text('Specialized Expertise. Real-World Impact.', 'Experiencia especializada. Impacto en el mundo real.'),
    description: text('Engineering, construction, and professional business services for organizations navigating technical, operational, and commercial challenges.', 'Ingeniería, construcción y servicios empresariales profesionales para organizaciones que afrontan desafíos técnicos, operativos y comerciales.'),
    primaryCta: text('Discuss Your Project', 'Hablemos de su proyecto'),
    secondaryCta: text('Explore Our Expertise', 'Explore nuestra experiencia'),
    regional: text('Supporting Organizations Across North America and Latin America', 'Apoyando organizaciones en Norteamérica y América Latina'),
  },
  disciplines: {
    title: text('Three Disciplines. Focused Expertise.', 'Tres disciplinas. Experiencia especializada.'),
    introduction: text('We bring together specialized capabilities across engineering and technology, the built environment, and business operations.', 'Reunimos capacidades especializadas en ingeniería y tecnología, el entorno construido y las operaciones empresariales.'),
    detail: text('Each division provides dedicated expertise, with engagements tailored to the requirements of the client and project.', 'Cada división aporta experiencia específica, con servicios adaptados a los requisitos del cliente y del proyecto.'),
    cards: {
      consulting: {
        title: text('Gradum Consulting', 'Gradum Consulting'),
        category: text('Engineering & Technology', 'Ingeniería y tecnología'),
        description: text('Engineering modeling, simulation, technical software, and analytical solutions for complex systems and industrial applications.', 'Modelado de ingeniería, simulación, software técnico y soluciones analíticas para sistemas complejos y aplicaciones industriales.'),
        cta: text('Explore Consulting', 'Explorar Consultoría'),
      },
      construction: {
        title: text('Gradum Construction', 'Gradum Construction'),
        category: text('Architecture, Engineering & Execution', 'Arquitectura, ingeniería y ejecución'),
        description: text('Architectural design, engineering services, construction estimating, and project execution—from individual technical deliverables to broader construction scopes.', 'Diseño arquitectónico, servicios de ingeniería, presupuestos de construcción y ejecución de proyectos, desde entregables técnicos individuales hasta alcances de construcción más amplios.'),
        cta: text('Explore Construction', 'Explorar Construcción'),
      },
      services: {
        title: text('Gradum Services', 'Gradum Services'),
        category: text('Finance, Creative & Legal', 'Finanzas, creatividad y asuntos legales'),
        description: text('Accounting and financial advisory, creative and digital production, and corporate legal support through project-based and ongoing professional engagements.', 'Asesoría contable y financiera, producción creativa y digital, y apoyo legal corporativo mediante proyectos específicos y servicios profesionales continuos.'),
        cta: text('Explore Services', 'Explorar Servicios'),
      },
    },
  },
  howWeWork: {
    title: text('The Right Expertise. For the Work That Matters.', 'La experiencia adecuada. Para el trabajo que importa.'),
    introduction: text('Every engagement begins with understanding the requirements, constraints, and intended outcomes.', 'Cada proyecto comienza por comprender los requisitos, las limitaciones y los resultados previstos.'),
    detail: text("We define the scope, bring together the appropriate capabilities, and focus on delivering practical work that addresses the client's needs.", 'Definimos el alcance, reunimos las capacidades adecuadas y nos enfocamos en entregar trabajo práctico que responda a las necesidades del cliente.'),
    steps: [
      { title: text('Understand the Challenge', 'Comprender el desafío'), description: text('Clarify objectives, requirements, and project constraints.', 'Aclarar los objetivos, requisitos y limitaciones del proyecto.') },
      { title: text('Define the Scope', 'Definir el alcance'), description: text('Establish deliverables, responsibilities, and the appropriate engagement model.', 'Establecer los entregables, las responsabilidades y el modelo de colaboración adecuado.') },
      { title: text('Deliver the Work', 'Entregar el trabajo'), description: text('Apply specialized expertise with clear communication and accountability.', 'Aplicar experiencia especializada con comunicación clara y responsabilidad.') },
    ],
  },
  latam: {
    title: text('Rooted in the Dominican Republic. Connected to Broader Markets.', 'Con raíces en la República Dominicana. Conectados con mercados más amplios.'),
    introduction: text('Based in the Dominican Republic, Gradum Group supports organizations locally while pursuing selected opportunities across Latin America and North America.', 'Con sede en la República Dominicana, Gradum Group apoya a organizaciones a nivel local mientras busca oportunidades seleccionadas en América Latina y Norteamérica.'),
    detail: text('Our multidisciplinary structure allows us to address different types of technical, construction, and business needs through focused service divisions.', 'Nuestra estructura multidisciplinaria nos permite atender distintas necesidades técnicas, de construcción y empresariales mediante divisiones de servicios especializadas.'),
  },
  ventures: {
    title: text('Gradum Ventures', 'Gradum Ventures'),
    description: text('We also develop and support selected businesses, real estate opportunities and new ventures.', 'También desarrollamos y apoyamos empresas seleccionadas, oportunidades inmobiliarias y nuevos emprendimientos.'),
  },
  insights: {
    title: text('Insights', 'Perspectivas'),
    description: text('Perspectives and practical resources across engineering, construction, business and emerging opportunities.', 'Perspectivas y recursos prácticos sobre ingeniería, construcción, negocios y oportunidades emergentes.'),
  },
  cta: {
    title: text("Let's Discuss What You're Building.", 'Hablemos de lo que está construyendo.'),
    description: text("Whether you're developing a technical solution, planning a construction project, or strengthening a business function, let's explore how Gradum can support your objectives.", 'Ya sea que esté desarrollando una solución técnica, planificando un proyecto de construcción o fortaleciendo una función empresarial, exploremos cómo Gradum puede apoyar sus objetivos.'),
    button: text('Discuss Your Project', 'Hablemos de su proyecto'),
  },
};

export const aboutContent = {
  titleLead: text('Built on Expertise.', 'Construido sobre experiencia.'),
  titleAccent: text('Driven by Execution.', 'Impulsado por la ejecución.'),
  intro: text(
    'Gradum Group is a multidisciplinary professional services company bringing together engineering and technology consulting, architecture and construction, and specialized business services.',
    'Gradum Group es una empresa multidisciplinaria de servicios profesionales que reúne consultoría en ingeniería y tecnología, arquitectura y construcción, y servicios empresariales especializados.',
  ),
  whoEyebrow: text('WHO WE ARE', 'QUIÉNES SOMOS'),
  whoTitle: text('Different Disciplines. One Commitment to Delivery.', 'Diferentes disciplinas. Un mismo compromiso con la entrega.'),
  whoParagraphs: [
    text('Gradum was established to provide organizations with access to specialized expertise for technical projects, construction initiatives, and essential business functions.', 'Gradum se estableció para brindar a las organizaciones acceso a conocimientos especializados para proyectos técnicos, iniciativas de construcción y funciones empresariales esenciales.'),
    text('Through dedicated operating divisions, we support clients with clearly defined services—from individual assignments to ongoing professional engagements and broader project delivery.', 'A través de divisiones operativas dedicadas, apoyamos a nuestros clientes con servicios claramente definidos: desde encargos individuales hasta relaciones profesionales continuas y la ejecución de proyectos más amplios.'),
    text('Our focus is on understanding the work, defining the right scope, and delivering with professional accountability.', 'Nuestro enfoque consiste en comprender el trabajo, definir el alcance adecuado y cumplir con responsabilidad profesional.'),
  ],
  structureEyebrow: text('OUR STRUCTURE', 'NUESTRA ESTRUCTURA'),
  structureTitle: text('Three Divisions. Distinct Capabilities.', 'Tres divisiones. Capacidades distintivas.'),
  divisions: [
    { title: text('Gradum Consulting', 'Gradum Consultoría'), description: text('Engineering analysis, modeling, simulation, technical software, and technology-focused solutions.', 'Análisis de ingeniería, modelado, simulación, software técnico y soluciones enfocadas en tecnología.'), image: '/assets/figma/Tech/woman-analyzing-data-flowchart-computer-office.jpg', imageAlt: text('Engineer analyzing technical data on multiple screens', 'Ingeniera analizando datos técnicos en varias pantallas') },
    { title: text('Gradum Construction', 'Gradum Construcción'), description: text('Architecture, technical engineering, cost estimating, and construction execution.', 'Arquitectura, ingeniería técnica, estimación de costos y ejecución de obras de construcción.'), image: '/assets/figma/Construccio\u0301n/woman-studying-draft-construction-site.jpg', imageAlt: text('Construction professional reviewing plans at a building site', 'Profesional de la construcción revisando planos en una obra') },
    { title: text('Gradum Services', 'Gradum Servicios'), description: text('Accounting and financial advisory, creative and digital production, and business legal counsel.', 'Asesoría contable y financiera, producción creativa y digital, y asesoría legal empresarial.'), image: '/assets/figma/Finanzas/middle-aged-hispanic-business-people (2).jpg', imageAlt: text('Business advisor reviewing information with a colleague', 'Asesora empresarial revisando información con un colega') },
  ],
  structureStatement: text('Each division operates within its area of expertise, allowing clients to engage the capabilities relevant to their needs.', 'Cada división opera dentro de su área de especialización, lo que permite a los clientes contratar las capacidades pertinentes a sus necesidades.'),
  thinkingEyebrow: text('HOW WE THINK', 'CÓMO PENSAMOS'),
  thinkingTitle: text('Clarity. Discipline. Execution.', 'Claridad. Disciplina. Ejecución.'),
  principles: [
    { title: text('Clarity', 'Claridad'), description: text('Understand the challenge, requirements, and expected deliverables before committing to a solution.', 'Comprender el desafío, los requisitos y los entregables esperados antes de comprometerse con una solución.') },
    { title: text('Discipline', 'Disciplina'), description: text('Apply structured thinking, technical rigor, and responsible project management.', 'Aplicar pensamiento estructurado, rigor técnico y gestión responsable de proyectos.') },
    { title: text('Execution', 'Ejecución'), description: text('Translate defined objectives into practical work, deliverables, and outcomes.', 'Traducir los objetivos definidos en trabajo práctico, entregables y resultados.') },
  ],
  presenceEyebrow: text('OUR PRESENCE', 'NUESTRA PRESENCIA'),
  presenceTitle: text('Based in the Dominican Republic. Built for Broader Opportunities.', 'Con sede en la República Dominicana. Preparados para nuevas oportunidades.'),
  presenceParagraphs: [
    text('Gradum Group operates from the Dominican Republic, with a business presence in the United States.', 'Gradum Group opera desde la República Dominicana y tiene presencia empresarial en los Estados Unidos.'),
    text('Our immediate focus is supporting clients in the Dominican market while developing opportunities across Latin America and North America where our expertise is relevant.', 'Nuestro enfoque inmediato es apoyar a clientes en el mercado dominicano mientras desarrollamos oportunidades en América Latina y América del Norte donde nuestra experiencia sea pertinente.'),
  ],
  ctaTitle: text("Let's Work on What Matters.", 'Trabajemos en lo que importa.'),
  ctaDescription: text('Connect with Gradum to discuss a technical challenge, construction project, or professional business service.', 'Conecte con Gradum para conversar sobre un desafío técnico, un proyecto de construcción o un servicio profesional empresarial.'),
  ctaButton: text('Discuss Your Project', 'Conversemos sobre su proyecto'),
};

export const venturesContent = {
  heroImage: '/assets/figma/Personas/authentic-small-youthful-marketing-agency (2).jpg',
  heroAlt: text('Team joining hands around a shared venture', 'Equipo uniendo las manos en torno a un proyecto compartido'),
  eyebrow: text('Gradum Ventures', 'Gradum Ventures'),
  title: text('Building and accelerating new opportunities.', 'Construyendo y acelerando nuevas oportunidades.'),
  description: text('We apply Gradum’s operating, technical and development capabilities to selected businesses, real estate opportunities and new ventures.', 'Aplicamos las capacidades operativas, técnicas y de desarrollo de Gradum a empresas seleccionadas, oportunidades inmobiliarias y nuevos emprendimientos.'),
  items: [
    { title: text('Accelerator', 'Aceleradora'), description: text('Structured support for selected founders and growing businesses that can benefit from stronger strategy, operations, financial discipline or market execution.', 'Apoyo estructurado para fundadores y empresas en crecimiento que pueden beneficiarse de una estrategia, operaciones, disciplina financiera o ejecución de mercado más sólidas.'), image: '/assets/figma/Personas/medium-shot-latin-friends-hanging-out.jpg' },
    { title: text('Real Estate Development', 'Desarrollo Inmobiliario'), description: text('Selected development opportunities informed by market understanding, design discipline and integrated project execution.', 'Oportunidades de desarrollo seleccionadas, informadas por el entendimiento del mercado, disciplina de diseño y ejecución integrada.'), image: '/assets/figma/Construccio\u0301n/construction-site-with-tall-crane-building-development.jpg' },
    { title: text('Venture Studio', 'Estudio de Emprendimientos'), description: text('We identify, validate and develop new business concepts where Gradum can contribute meaningful operating or technical capability.', 'Identificamos, validamos y desarrollamos nuevos conceptos de negocio donde Gradum puede aportar capacidades operativas o técnicas significativas.'), image: '/assets/figma/Personas/middle-aged-hispanic-business-people.jpg' },
  ],
  closing: text('More than capital.', 'Más que capital.'),
  closingBody: text('We are most interested in opportunities where Gradum can contribute expertise, execution capacity, development capability or market access.', 'Nos interesan las oportunidades donde Gradum puede aportar experiencia, capacidad de ejecución, desarrollo o acceso al mercado.'),
};

export const insightsContent = {
  heroImage: '/assets/figma/Personas/middle-aged-hispanic-business-person (1).jpg',
  heroAlt: text('Business advisor discussing ideas with colleagues', 'Asesor empresarial conversando sobre ideas con colegas'),
  articleImages: [
    '/assets/figma/Tech/woman-analyzing-data-flowchart-computer-office.jpg',
    '/assets/figma/Construccio\u0301n/steel-bar-site-construction.jpg',
    '/assets/figma/Finanzas/high-angle-woman-working-laptop.jpg',
  ],
  eyebrow: text('Insights', 'Perspectivas'),
  title: text('Perspectives for complex markets.', 'Perspectivas para mercados complejos.'),
  description: text('Analysis, practical resources and curated thinking across engineering, construction, business and emerging opportunities.', 'Análisis, recursos prácticos y pensamiento seleccionado sobre ingeniería, construcción, negocios y oportunidades emergentes.'),
  articleTitle: text('Article title', 'Título del artículo'),
  articleSummary: text('One concise summary explaining why the topic matters.', 'Un resumen conciso que explica por qué el tema importa.'),
  principle: text('Useful before promotional.', 'Útil antes que promocional.'),
  principleBody: text('Insights may include original perspectives, practical explainers, relevant industry developments, webinar recaps and curated technical resources with attribution.', 'Las perspectivas pueden incluir ideas originales, explicaciones prácticas, desarrollos relevantes de la industria, resúmenes de seminarios y recursos técnicos seleccionados con atribución.'),
};
