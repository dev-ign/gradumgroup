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
    heroImages: ['/assets/figma/consulting-analysis.png', '/assets/figma/consulting-studio.png', '/assets/figma/consulting-engineer.png'],
    cards: [
      {
        title: text('Capabilities', 'Capacidades'),
        description: text('Engineering intelligence, modeling, simulation, controls and technical software.', 'Inteligencia de ingeniería, modelado, simulación, controles y software técnico.'),
        image: '/assets/figma/consulting-card-capabilities.png',
        href: '/consulting/capabilities',
      },
      {
        title: text('Industries', 'Industrias'),
        description: text('Applied across complex industrial, infrastructure and technology environments.', 'Aplicado en entornos industriales, de infraestructura y tecnología complejos.'),
        image: '/assets/figma/consulting-card-industries.png',
        href: '/consulting/industries',
      },
      {
        title: text('How We Work', 'Cómo trabajamos'),
        description: text('From assessment and modeling to prototype, implementation and ongoing support.', 'Desde la evaluación y el modelado hasta el prototipo, la implementación y el soporte continuo.'),
        image: '/assets/figma/consulting-card-process.png',
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
    heroImages: ['/assets/figma/construction-hero.png'],
    cards: [
      { code: '01', title: text('Architecture', 'Arquitectura'), description: text('Purpose-driven design shaped by context, function and experience.', 'Diseño con propósito, definido por el contexto, la función y la experiencia.'), image: '/assets/figma/construction-architecture-card.png', href: '/construction/architecture' },
      { code: '02', title: text('Engineering', 'Ingeniería'), description: text('Technical coordination that makes design safe, functional and executable.', 'Coordinación técnica que hace el diseño seguro, funcional y ejecutable.'), image: '/assets/figma/construction-engineering-card.png', href: '/construction/engineering' },
      { code: '03', title: text('Build', 'Construcción'), description: text('Disciplined project execution with visibility across quality, schedule and delivery.', 'Ejecución disciplinada con visibilidad sobre calidad, cronograma y entrega.'), image: '/assets/figma/construction-build-card.png', href: '/construction/build' },
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
    heroImages: ['/assets/figma/services-hero.png', '/assets/figma/services-hero-side.png'],
    cards: [
      { code: '01', title: text('Accounting & Finance', 'Contabilidad y Finanzas'), description: text('Accounting, reporting and financial discipline for better business control.', 'Contabilidad, reportes y disciplina financiera para un mejor control empresarial.'), image: '/assets/figma/services-accounting-card.png', href: '/services/accounting-finance' },
      { code: '02', title: text('Marketing & Media', 'Marketing y Medios'), description: text('Strategy, content and communication aligned with commercial objectives.', 'Estrategia, contenido y comunicación alineados con objetivos comerciales.'), image: '/assets/figma/services-marketing-card.png', href: '/services/marketing-media' },
      { code: '03', title: text('Admin & Legal', 'Administración y Legal'), description: text('Administrative and business support for the requirements behind day-to-day operations.', 'Soporte administrativo y empresarial para las necesidades de la operación diaria.'), image: '/assets/figma/services-admin.png', href: '/services/admin-legal' },
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
    image: '/assets/figma/consulting-capabilities.png',
    layout: 'wide',
    items: [
      { code: 'C–01', title: text('Engineering Intelligence', 'Inteligencia de Ingeniería'), description: text('Data analysis, AI, optimization and decision-support methods for engineering and operational environments.', 'Análisis de datos, IA, optimización y métodos de apoyo a decisiones para entornos operativos y de ingeniería.') },
      { code: 'C–02', title: text('Modeling, Simulation & Control', 'Modelado, Simulación y Control'), description: text('System modeling, simulation, controls and scenario analysis to evaluate behavior before implementation.', 'Modelado de sistemas, simulación, controles y análisis de escenarios para evaluar el comportamiento antes de implementar.') },
      { code: 'C–03', title: text('Engineering Software & Automation', 'Software de Ingeniería y Automatización'), description: text('Technical applications, algorithms and automated workflows that improve engineering productivity and decision-making.', 'Aplicaciones técnicas, algoritmos y flujos automatizados que mejoran la productividad y la toma de decisiones.') },
      { code: 'C–04', title: text('Embedded & Intelligent Systems', 'Sistemas Embebidos e Inteligentes'), description: text('Software, algorithms and system-level support for connected, embedded and edge applications.', 'Software, algoritmos y soporte a nivel de sistema para aplicaciones conectadas, embebidas y de borde.') },
    ],
    statement: text('Technology follows the problem.', 'La tecnología sigue al problema.'),
    statementImage: '/assets/figma/consulting-approach.png',
    cta: text('Request a Consultation', 'Solicitar una consulta'),
  },
  'consulting-industries': {
    family: 'consulting',
    eyebrow: text('Industries', 'Industrias'),
    title: text('Applied where engineering complexity matters.', 'Aplicado donde la complejidad de ingeniería importa.'),
    description: text('Our capabilities support organizations operating complex systems, products and infrastructure.', 'Nuestras capacidades apoyan a organizaciones que operan sistemas, productos e infraestructura compleja.'),
    layout: 'list',
    items: [
      { code: '01', title: text('Energy & Utilities', 'Energía y Servicios Públicos'), description: text('Modeling, analytics, optimization and engineering tools for energy systems and operations.', 'Modelado, analítica, optimización y herramientas de ingeniería para sistemas y operaciones de energía.'), image: '/assets/figma/industry-energy.png' },
      { code: '02', title: text('Manufacturing & Industrial', 'Manufactura e Industria'), description: text('Simulation, automation and technical software for equipment, processes and production environments.', 'Simulación, automatización y software técnico para equipos, procesos y entornos de producción.'), image: '/assets/figma/industry-manufacturing.png' },
      { code: '03', title: text('Infrastructure', 'Infraestructura'), description: text('Engineering analysis and computational methods for infrastructure, utilities and complex built systems.', 'Análisis de ingeniería y métodos computacionales para infraestructura, servicios y sistemas construidos complejos.'), image: '/assets/figma/industry-infrastructure.png' },
      { code: '04', title: text('Aerospace & Advanced Mobility', 'Aeroespacial y Movilidad Avanzada'), description: text('Modeling, controls, simulation and software for demanding system-level applications.', 'Modelado, controles, simulación y software para aplicaciones exigentes a nivel de sistema.'), image: '/assets/figma/industry-aerospace.png' },
      { code: '05', title: text('Technology & Engineering Organizations', 'Organizaciones de Tecnología e Ingeniería'), description: text('Specialized engineering software, analytics and computational support for technical teams.', 'Software de ingeniería especializado, analítica y soporte computacional para equipos técnicos.'), image: '/assets/figma/industry-technology.png' },
    ],
    statement: text('Capability-led. Industry-aware.', 'Guiados por capacidad. Conscientes de la industria.'),
    cta: text('Discuss an Industry Challenge', 'Conversemos sobre un reto de la industria'),
  },
  'consulting-how-we-work': {
    family: 'consulting',
    eyebrow: text('How We Work', 'Cómo trabajamos'),
    title: text('A disciplined path from problem to implementation.', 'Un camino disciplinado del problema a la implementación.'),
    description: text('Engagements are structured around the maturity of the challenge and the decision the client needs to make.', 'Los proyectos se estructuran según la madurez del reto y la decisión que el cliente necesita tomar.'),
    image: '/assets/figma/consulting-pathway.png',
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
    family: 'construction', eyebrow: text('Gradum Construction', 'Gradum Construcción'), title: text('Architecture shaped by purpose.', 'Arquitectura definida por el propósito.'), description: text('We design spaces around function, context, experience and long-term value.', 'Diseñamos espacios en torno a la función, el contexto, la experiencia y el valor a largo plazo.'), image: '/assets/figma/construction-architecture.png', layout: 'split',
    items: [
      { code: '01', title: text('Concept & Feasibility', 'Concepto y Factibilidad'), description: text('Define the project direction around site, program and objectives.', 'Definir la dirección del proyecto según sitio, programa y objetivos.') },
      { code: '02', title: text('Architectural Design', 'Diseño Arquitectónico'), description: text('Translate requirements into coherent spatial and design solutions.', 'Convertir requisitos en soluciones espaciales y de diseño coherentes.') },
      { code: '03', title: text('Design Development', 'Desarrollo de Diseño'), description: text('Advance concepts into coordinated materials, layouts and technical decisions.', 'Desarrollar conceptos en materiales, distribuciones y decisiones técnicas coordinadas.') },
      { code: '04', title: text('Documentation & Coordination', 'Documentación y Coordinación'), description: text('Prepare the information required to move efficiently toward execution.', 'Preparar la información necesaria para avanzar eficientemente hacia la ejecución.') },
    ], cta: text('Discuss Your Project', 'Conversemos sobre su proyecto'),
  },
  'construction-engineering': {
    family: 'construction', eyebrow: text('Gradum Construction', 'Gradum Construcción'), title: text('Engineering that makes design executable.', 'Ingeniería que hace el diseño ejecutable.'), description: text('Technical coordination focused on performance, constructability and project integration.', 'Coordinación técnica enfocada en rendimiento, constructibilidad e integración del proyecto.'), image: '/assets/figma/construction-engineering.png', layout: 'wide',
    items: [
      { code: 'E–01', title: text('Structural Coordination', 'Coordinación Estructural'), description: text('Align structural requirements with architecture and project constraints.', 'Alinear requisitos estructurales con arquitectura y restricciones del proyecto.') },
      { code: 'E–02', title: text('MEP Coordination', 'Coordinación MEP'), description: text('Coordinate mechanical, electrical and plumbing requirements.', 'Coordinar requisitos mecánicos, eléctricos y de plomería.') },
      { code: 'E–03', title: text('Technical Planning', 'Planificación Técnica'), description: text('Resolve technical interfaces and constructability considerations early.', 'Resolver interfaces técnicas y consideraciones de constructibilidad desde temprano.') },
      { code: 'E–04', title: text('Interdisciplinary Review', 'Revisión Interdisciplinaria'), description: text('Identify coordination gaps before they become execution problems.', 'Identificar brechas de coordinación antes de que se conviertan en problemas de ejecución.') },
    ], cta: text('Discuss Your Project', 'Conversemos sobre su proyecto'),
  },
  'construction-build': {
    family: 'construction', eyebrow: text('Gradum Construction', 'Gradum Construcción'), title: text('Disciplined execution from plan to delivery.', 'Ejecución disciplinada del plan a la entrega.'), description: text('We coordinate construction around quality, visibility and accountability.', 'Coordinamos la construcción en torno a calidad, visibilidad y responsabilidad.'), image: '/assets/figma/construction-build.png', layout: 'wide',
    items: [
      { code: '01', title: text('Preconstruction', 'Preconstrucción'), description: text('Clarify scope, sequencing and execution requirements.', 'Aclarar alcance, secuencia y requisitos de ejecución.') },
      { code: '02', title: text('Construction Management', 'Gestión de Construcción'), description: text('Coordinate schedules, information and stakeholders.', 'Coordinar cronogramas, información y actores involucrados.') },
      { code: '03', title: text('Project Supervision', 'Supervisión de Proyecto'), description: text('Maintain visibility into progress, quality and approved project requirements.', 'Mantener visibilidad del avance, calidad y requisitos aprobados.') },
      { code: '04', title: text('Closeout & Delivery', 'Cierre y Entrega'), description: text('Support completion and structured project handover.', 'Apoyar la finalización y entrega estructurada del proyecto.') },
    ], cta: text('Discuss Your Project', 'Conversemos sobre su proyecto'),
  },
  'services-accounting': {
    family: 'services', eyebrow: text('Gradum Services', 'Gradum Servicios'), title: text('Financial clarity for better decisions.', 'Claridad financiera para mejores decisiones.'), description: text('We help businesses strengthen accounting discipline, reporting and financial visibility.', 'Ayudamos a las empresas a fortalecer su disciplina contable, reportes y visibilidad financiera.'), image: '/assets/figma/services-accounting.png', layout: 'split',
    items: [
      { code: 'F–01', title: text('Accounting & Bookkeeping', 'Contabilidad y Registros'), description: text('Reliable records and organized financial information.', 'Registros confiables e información financiera organizada.') },
      { code: 'F–02', title: text('Tax & Compliance Support', 'Soporte Fiscal y de Cumplimiento'), description: text('Structured support for recurring tax and regulatory obligations.', 'Soporte estructurado para obligaciones fiscales y regulatorias recurrentes.') },
      { code: 'F–03', title: text('Financial Reporting', 'Reportes Financieros'), description: text('Clear management reporting for better visibility into performance.', 'Reportes gerenciales claros para mayor visibilidad del desempeño.') },
      { code: 'F–04', title: text('Cash Flow & Planning', 'Flujo de Caja y Planificación'), description: text('Forward-looking visibility into liquidity, obligations and financial needs.', 'Visibilidad futura sobre liquidez, obligaciones y necesidades financieras.') },
    ], statementEyebrow: text('Our Approach', 'Nuestro Enfoque'), statement: text('Good accounting should do more than meet an obligation. It should help management understand the business.', 'La buena contabilidad debe hacer más que cumplir una obligación. Debe ayudar a la gerencia a comprender el negocio.'), statementImage: '/assets/figma/services-accounting-approach.png', cta: text('Talk to Our Team', 'Hable con nuestro equipo'),
  },
  'services-marketing': {
    family: 'services', eyebrow: text('Gradum Services', 'Gradum Servicios'), title: text('Clear positioning. Consistent execution.', 'Posicionamiento claro. Ejecución consistente.'), description: text('Strategy, content and communication designed around business and commercial objectives.', 'Estrategia, contenido y comunicación diseñados en torno a objetivos empresariales y comerciales.'), image: '/assets/figma/services-marketing.png', layout: 'cards',
    items: [
      { title: text('Brand & Positioning', 'Marca y Posicionamiento'), description: text('Clarify how the business should be understood and differentiated.', 'Aclarar cómo debe entenderse y diferenciarse el negocio.'), image: '/assets/figma/services-brand.png' },
      { title: text('Marketing Strategy', 'Estrategia de Marketing'), description: text('Define audiences, priorities, channels and campaigns.', 'Definir audiencias, prioridades, canales y campañas.'), image: '/assets/figma/consulting-analysis.png' },
      { title: text('Content & Creative', 'Contenido y Creatividad'), description: text('Build consistent, professional communication across formats.', 'Construir comunicación consistente y profesional en todos los formatos.'), image: '/assets/figma/home-services.png' },
      { title: text('Digital & Social', 'Digital y Social'), description: text('Structure digital presence around relevance, consistency and growth.', 'Estructurar la presencia digital en torno a relevancia, consistencia y crecimiento.') },
    ], statementEyebrow: text('Our Approach', 'Nuestro Enfoque'), statement: text('Strategy comes before volume. Every channel should have a reason to exist.', 'La estrategia viene antes que el volumen. Cada canal debe tener una razón de existir.'), statementImage: '/assets/figma/services-marketing-approach.png', cta: text('Talk to Our Team', 'Hable con nuestro equipo'),
  },
  'services-admin': {
    family: 'services', eyebrow: text('Gradum Services', 'Gradum Servicios'), title: text('Structure behind the business.', 'Estructura detrás del negocio.'), description: text('Practical administrative and business support that helps organizations operate with greater consistency.', 'Soporte administrativo y empresarial práctico que ayuda a operar con mayor consistencia.'), image: '/assets/figma/services-admin.png', layout: 'wide',
    items: [
      { code: '01', title: text('Business Administration', 'Administración Empresarial'), description: text('Support recurring administrative workflows and documentation.', 'Apoyar flujos administrativos recurrentes y documentación.') },
      { code: '02', title: text('Corporate Coordination', 'Coordinación Corporativa'), description: text('Organize routine corporate and regulatory requirements.', 'Organizar requisitos corporativos y regulatorios rutinarios.') },
      { code: '03', title: text('Contracts & Documentation', 'Contratos y Documentación'), description: text('Coordinate common business documents and agreement workflows.', 'Coordinar documentos empresariales y flujos de acuerdos comunes.') },
      { code: '04', title: text('Business Setup Support', 'Soporte para Establecimiento Empresarial'), description: text('Help new organizations establish the administrative foundations to operate.', 'Ayudar a nuevas organizaciones a establecer las bases administrativas para operar.') },
    ], statementEyebrow: text('Our Approach', 'Nuestro Enfoque'), statement: text('Specialized legal matters are coordinated with qualified professionals where required.', 'Los asuntos legales especializados se coordinan con profesionales calificados cuando es necesario.'), cta: text('Talk to Our Team', 'Hable con nuestro equipo'),
  },
};

export const homeContent = {
  hero: {
    title: text('Complex problems. Integrated execution.', 'Problemas complejos. Ejecución integrada.'),
    description: text('Gradum brings together consulting, construction and business services to help organizations make better decisions, execute with discipline and build for long-term value.', 'Gradum integra consultoría, construcción y servicios empresariales para ayudar a las organizaciones a tomar mejores decisiones, ejecutar con disciplina y construir valor a largo plazo.'),
    regional: text('Supporting Organizations Across North America and Latin America', 'Apoyando organizaciones en Norteamérica y América Latina'),
  },
  disciplines: {
    title: text('One platform. Three disciplines.', 'Una plataforma. Tres disciplinas.'),
    description: text('Specialized expertise, connected by a common approach to problem-solving and execution.', 'Experiencia especializada, conectada por un enfoque común para resolver problemas y ejecutar.'),
  },
  insight: {
    title: text('From insight to implementation.', 'De la visión a la implementación.'),
    description: text('We work where strategy, technical complexity and execution meet—helping clients define the problem, design the right response and move forward with clarity.', 'Trabajamos donde convergen la estrategia, la complejidad técnica y la ejecución, ayudando a definir el problema, diseñar la respuesta adecuada y avanzar con claridad.'),
  },
  latam: {
    title: text('Built with Latin America in mind.', 'Creado pensando en América Latina.'),
    description: text('With roots in the Dominican Republic, Gradum combines local understanding with global engineering and business practices to serve organizations across Latin America and beyond.', 'Con raíces en República Dominicana, Gradum combina conocimiento local con prácticas globales de ingeniería y negocios para servir a organizaciones en América Latina y más allá.'),
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
    title: text('Build what comes next.', 'Construyamos lo que viene.'),
    description: text('Bring us the challenge, project or opportunity.', 'Tráiganos el reto, proyecto u oportunidad.'),
  },
};

export const aboutContent = {
  title: text('Built Around Execution.', 'Construido Alrededor de la Ejecución.'),
  introBold: text('Gradum is a multidisciplinary consulting and execution company', 'Gradum es una empresa multidisciplinaria de consultoría y ejecución'),
  intro: text(' created to solve complex technical, physical and business challenges.', ' creada para resolver retos técnicos, físicos y empresariales complejos.'),
  whoTitle: text('Who We Are', 'Quiénes Somos'),
  whoBody: text('We bring engineering, construction and business expertise together under one platform—giving clients access to the capabilities required to move from decision to execution.', 'Reunimos experiencia en ingeniería, construcción y negocios en una sola plataforma, dando a los clientes acceso a las capacidades necesarias para pasar de la decisión a la ejecución.'),
  approachTitle: text('Our Approach', 'Nuestro Enfoque'),
  approachBody: text('We begin with the problem. Then we assemble the right expertise, define a practical path forward and execute with clear ownership.', 'Comenzamos con el problema. Luego reunimos la experiencia adecuada, definimos un camino práctico y ejecutamos con responsabilidades claras.'),
  principles: [
    { code: '01', title: text('Clarity', 'Claridad'), description: text('Understand the problem and the decision that matters.', 'Comprender el problema y la decisión que importa.') },
    { code: '02', title: text('Rigor', 'Rigor'), description: text('Apply technical, financial and commercial discipline.', 'Aplicar disciplina técnica, financiera y comercial.') },
    { code: '03', title: text('Execution', 'Ejecución'), description: text('Turn recommendations into measurable action.', 'Convertir recomendaciones en acciones medibles.') },
  ],
  teamTitle: text('Leadership & Team', 'Liderazgo y Equipo'),
  teamBody: text('Our multidisciplinary team works across engineering, technology, architecture, finance, marketing and business operations. Teams are structured around the needs of each engagement.', 'Nuestro equipo multidisciplinario trabaja en ingeniería, tecnología, arquitectura, finanzas, marketing y operaciones. Los equipos se estructuran según las necesidades de cada proyecto.'),
  regionalTitle: text('Regional understanding. Global perspective.', 'Entendimiento regional. Perspectiva global.'),
  regionalBody: text('Gradum was built in Latin America, with an operating model designed to work across markets, disciplines and borders.', 'Gradum nació en América Latina, con un modelo operativo diseñado para trabajar a través de mercados, disciplinas y fronteras.'),
};

export const venturesContent = {
  eyebrow: text('Gradum Ventures', 'Gradum Ventures'),
  title: text('Building and accelerating new opportunities.', 'Construyendo y acelerando nuevas oportunidades.'),
  description: text('We apply Gradum’s operating, technical and development capabilities to selected businesses, real estate opportunities and new ventures.', 'Aplicamos las capacidades operativas, técnicas y de desarrollo de Gradum a empresas seleccionadas, oportunidades inmobiliarias y nuevos emprendimientos.'),
  items: [
    { title: text('Accelerator', 'Aceleradora'), description: text('Structured support for selected founders and growing businesses that can benefit from stronger strategy, operations, financial discipline or market execution.', 'Apoyo estructurado para fundadores y empresas en crecimiento que pueden beneficiarse de una estrategia, operaciones, disciplina financiera o ejecución de mercado más sólidas.'), image: '/assets/figma/ventures-accelerator.png' },
    { title: text('Real Estate Development', 'Desarrollo Inmobiliario'), description: text('Selected development opportunities informed by market understanding, design discipline and integrated project execution.', 'Oportunidades de desarrollo seleccionadas, informadas por el entendimiento del mercado, disciplina de diseño y ejecución integrada.'), image: '/assets/figma/ventures-real-estate.png' },
    { title: text('Venture Studio', 'Estudio de Emprendimientos'), description: text('We identify, validate and develop new business concepts where Gradum can contribute meaningful operating or technical capability.', 'Identificamos, validamos y desarrollamos nuevos conceptos de negocio donde Gradum puede aportar capacidades operativas o técnicas significativas.'), image: '/assets/figma/ventures-studio.png' },
  ],
  closing: text('More than capital.', 'Más que capital.'),
  closingBody: text('We are most interested in opportunities where Gradum can contribute expertise, execution capacity, development capability or market access.', 'Nos interesan las oportunidades donde Gradum puede aportar experiencia, capacidad de ejecución, desarrollo o acceso al mercado.'),
};

export const insightsContent = {
  eyebrow: text('Insights', 'Perspectivas'),
  title: text('Perspectives for complex markets.', 'Perspectivas para mercados complejos.'),
  description: text('Analysis, practical resources and curated thinking across engineering, construction, business and emerging opportunities.', 'Análisis, recursos prácticos y pensamiento seleccionado sobre ingeniería, construcción, negocios y oportunidades emergentes.'),
  articleTitle: text('Article title', 'Título del artículo'),
  articleSummary: text('One concise summary explaining why the topic matters.', 'Un resumen conciso que explica por qué el tema importa.'),
  principle: text('Useful before promotional.', 'Útil antes que promocional.'),
  principleBody: text('Insights may include original perspectives, practical explainers, relevant industry developments, webinar recaps and curated technical resources with attribution.', 'Las perspectivas pueden incluir ideas originales, explicaciones prácticas, desarrollos relevantes de la industria, resúmenes de seminarios y recursos técnicos seleccionados con atribución.'),
};
