import type { Language } from '../context/LanguageContext';

/**
 * Get a value from a nested object by dot path (e.g. "home.hero.tagline" or "home.divisions.0.name").
 */
export function getByPath(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    const next = (current as Record<string, unknown>)[part];
    if (next !== undefined) {
      current = next;
      continue;
    }
    const index = parseInt(part, 10);
    if (!Number.isNaN(index) && Array.isArray(current)) {
      current = current[index];
      continue;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

const en = {
  common: {
    requestConsultation: 'Request Consultation',
    clientAccess: 'Client Access',
    privacyPolicy: 'Privacy Policy',
    terms: 'Terms',
    platform: 'Platform',
    company: 'Company',
    consulting: 'Consulting',
    construction: 'Construction',
    services: 'Services',
    accelerator: 'Accelerator',
    about: 'About',
    contact: 'Contact',
    learnMore: 'Learn More',
    comingSoon: 'Coming Soon',
    close: 'Close',
    cancel: 'Cancel',
    submitInquiry: 'Submit Inquiry',
    returnHome: 'Return Home →',
    footerTagline: 'Engineering-led advisory and execution platform structured for performance-critical environments.',
    footerLegal: 'Gradum Group LLC (US)  |  Gradum Group, SRL (Dominican Republic)',
  },
  notFound: {
    title: 'Page Not Found',
    description: "The page you're looking for doesn't exist.",
  },
  nav: {
    home: 'Home',
    platform: 'Platform',
    about: 'About',
    contact: 'Contact',
    selectLanguage: 'Select language',
    english: 'English',
    spanish: 'Español',
  },
  modal: {
    title: 'Request a Consultation',
    subtitle: 'A member of our team will contact you shortly.',
    closeLabel: 'Close modal',
    messageReceived: 'Message Received',
    thankYou: 'Thank you. A member of our team will contact you shortly.',
    name: 'Name *',
    company: 'Company',
    email: 'Email *',
    phone: 'Phone',
    country: 'Country',
    inquiryType: 'Inquiry Type',
    message: 'Message *',
    namePlaceholder: 'Full name',
    companyPlaceholder: 'Organization',
    emailPlaceholder: 'you@company.com',
    phonePlaceholder: '+1 (000) 000-0000',
    selectCountry: 'Select country',
    selectType: 'Select type',
    messagePlaceholder: 'Briefly describe your project or inquiry...',
    inquiryTypes: ['Consulting Inquiry', 'Construction Project', 'Accounting & Finance', 'Marketing & Media', 'Accelerator Program', 'General Inquiry'],
    countries: ['United States', 'Dominican Republic', 'Colombia', 'Mexico', 'Panama', 'Puerto Rico', 'Canada', 'Other'],
  },
  home: {
    hero: {
      tagline: 'Engineering-Led Advisory Platform',
      title1: 'Structured',
      title2: 'Advisory.',
      title3: 'Engineered',
      title4: 'Execution.',
      description: 'Gradum is an engineering-led advisory and execution platform structured to address technical, operational, and infrastructure complexity across performance-critical environments. We partner with mid-market enterprises and regional leaders operating in engineering-intensive, regulated, and infrastructure-critical industries.',
    },
    platform: {
      label: 'Our Platform',
      heading: 'Integrated advisory and execution architecture.',
      intro: 'Platform divisions operate under defined mandate frameworks and integrate within a unified advisory and execution architecture designed for multi-functional and multi-entity environments.',
    },
    divisions: [
      { name: 'Gradum Consulting', tagline: 'Engineering & Technology Advisory for performance-driven industries.' },
      { name: 'Gradum Construction', tagline: 'Architectural and structural execution.' },
      { name: 'Gradum Services', tagline: 'Financial Governance & Brand Execution Infrastructure.' },
      { name: 'Gradum Accelerator', tagline: 'Venture development platform.' },
    ],
    howWeWork: {
      label: 'Methodology',
      heading: 'How We Work',
      steps: [
        { num: '01', title: 'Assessment', desc: 'Clarifying objectives and operational constraints.' },
        { num: '02', title: 'Scope Alignment', desc: 'Defining deliverables, milestones, and accountability.' },
        { num: '03', title: 'Structured Execution', desc: 'Delivering against measurable targets.' },
        { num: '04', title: 'Ongoing Advisory', desc: 'Sustaining performance through disciplined oversight.' },
      ],
    },
    cta: {
      label: 'Client Coordination',
      heading: 'Structured Client Coordination',
      description: 'All engagements are managed through the Gradum Client Portal, ensuring secure collaboration, defined project stages, and centralized documentation.',
    },
  },
  about: {
    hero: {
      label: 'About',
      title1: 'Engineered for',
      title2: 'Precision.',
      intro: 'Gradum is an engineering-led advisory and execution platform structured across focused verticals.',
    },
    overview: [
      'We partner with organizations seeking operational clarity, technical rigor, and measurable performance across complex environments.',
      'Engagements typically involve cross-functional coordination, regulated operating environments, and executive-level accountability structures.',
      'Initial operations are anchored in the Dominican Republic, with expansion across Latin America and North America.',
    ],
    platform: {
      label: 'Our Platform',
      heading: 'Focused Verticals',
    },
    divisions: [
      { name: 'Gradum Consulting', desc: 'Engineering & Technology advisory focused on system architecture, digital infrastructure, and performance-critical operations. We provide executive-level engineering strategy and disciplined technical oversight across complex technical ecosystems.' },
      { name: 'Gradum Construction', desc: 'Project-based architectural and structural execution in the Dominican Republic.' },
      { name: 'Gradum Services', desc: 'Financial governance and brand execution infrastructure supporting operational performance.' },
      { name: 'Gradum Accelerator', desc: "A selective initiative launching in a future phase as part of Gradum's disciplined regional expansion." },
    ],
    philosophy: {
      label: 'Philosophy',
      heading: 'Execution Philosophy',
      principles: ['Discipline over noise.', 'Structure over improvisation.', 'Execution over abstraction.', 'Precision over volume.'],
      closing: 'Sustainable performance is built through defined scope, accountable ownership, and controlled delivery — not reactive decision-making.',
    },
    engagement: {
      label: 'Principles',
      heading: 'Engagement Principles',
      intro: 'Every engagement prioritizes:',
      items: ['Clear scope before action', 'Established ownership and accountability', 'Transparent coordination', 'Measurable operational impact'],
      closing1: 'Gradum is not built for volume.',
      closing2: 'It is engineered for precision.',
    },
  },
  consulting: {
    hero: {
      label: 'Gradum Consulting',
      title1: 'Engineering &',
      title2: 'Technology Advisory',
      title3: 'for Performance-Driven Industries.',
      description: 'We provide executive-level engineering strategy and disciplined technical oversight across complex systems, digital infrastructure, and performance-critical operations.',
      cta: 'Request a Technical Consultation',
    },
    overview: {
      label: 'Overview',
      heading: 'Advisory Model',
      p1: 'Our advisory model enables engagement at the executive strategy level or embedded participation within enterprise engineering programs.',
      p2: 'We align disciplined system architecture with measurable business outcomes — supporting modernization initiatives, executive technology roadmaps, and long-term engineering strategy.',
    },
    engagement: {
      label: 'Engagement',
      heading: 'Engagement Model',
      intro: 'Engagements frequently span multi-system modernization initiatives, enterprise technology roadmaps, and performance-critical infrastructure programs.',
      items: [
        { title: 'Technical Strategy & Advisory', desc: 'Executive-level guidance on system architecture, technology roadmaps, modernization programs, and performance engineering direction.' },
        { title: 'Performance Engineering & Execution Support', desc: 'Embedded technical execution across modeling, simulation, embedded systems, digital twin development, and industrial software integration.' },
      ],
    },
    capabilities: {
      label: 'Capabilities',
      heading: 'Core Technical Capabilities',
      items: [
        { title: 'Advanced Modeling & Simulation', desc: 'System-level modeling and multi-domain simulation supporting validation, optimization, and architecture-level design decisions.' },
        { title: 'Embedded Systems & Industrial Software Architecture', desc: 'Embedded software architecture, model-based development workflows, interface integration, and production-grade system design.' },
        { title: 'Digital Twin & Performance Engineering', desc: 'Digital infrastructure architecture, predictive performance modeling, and system-level optimization.' },
        { title: 'Industrial Software & Control System Integration', desc: 'Toolchain alignment across modeling platforms, simulation environments, control systems, and embedded software ecosystems.' },
      ],
    },
    industries: {
      label: 'Industries',
      heading: 'Representative Industry Focus',
      list: ['Agriculture', 'Energy & Utilities', 'Industrial Automation', 'Medical Devices', 'Mining'],
    },
    cta: {
      label: 'Advisory Model',
      heading: 'Delivered Through Senior Engineering Leadership',
      description: 'Engagements are delivered through senior engineering leadership aligned to formalized advisory mandates.',
    },
  },
  construction: {
    hero: {
      label: 'Gradum Construction',
      title1: 'Engineered Development',
      title2: 'for the Dominican Republic.',
      description: 'Structural, architectural, and planning services delivered with technical rigor and engineering discipline.',
      cta: 'Discuss a Project',
    },
    overview: {
      label: 'Overview',
      heading: 'Governed Engineering Execution',
      p1: 'Gradum Construction delivers project-based architectural and engineering services across the Dominican Republic, operating under licensed engineering standards and governed execution models.',
      p2: 'Our approach integrates structural design, soil analysis, cost planning, and coordinated execution — ensuring safety, regulatory compliance, and long-term structural performance in a region where engineering precision is critical.',
      p3: 'Projects are executed under licensed local engineering supervision and regulatory alignment.',
    },
    services: {
      label: 'Services',
      heading: 'Core Services',
      items: [
        { title: 'Structural Engineering & Floorplans', list: ['Structural system design', 'Reinforcement detailing', 'Load and performance analysis', 'Technical plan development'] },
        { title: 'Geotechnical Investigation', list: ['Soil evaluation coordination', 'Geotechnical analysis', 'Foundation recommendations', 'Site risk assessment'] },
        { title: 'Budgeting & Cost Planning', list: ['Budget framework development', 'Cost estimation and control', 'Resource allocation planning', 'Stakeholder financial coordination'] },
        { title: 'Architectural Design', list: ['Conceptual design development', 'Technical drawing preparation', 'Regulatory alignment', 'Construction documentation'] },
        { title: 'Interior Design', list: ['Functional layout planning', 'Material and finish selection', 'Implementation oversight'] },
      ],
    },
    seismic: {
      badge: 'In Development',
      heading: 'Seismic & Soil-Focused Engineering',
      intro: 'In response to the structural and seismic realities of the Dominican Republic, Gradum is developing an engineering-focused analytical platform to support:',
      list: ['Advanced soil studies', 'Seismic analysis', 'Structural risk modeling'],
      closing: 'This initiative reflects our long-term commitment to safety, structural validation, and engineering precision in local development.',
    },
    projectModel: {
      label: 'Methodology',
      heading: 'Project Model',
      steps: [
        { num: '01', title: 'Site & Structural Assessment' },
        { num: '02', title: 'Design & Technical Planning' },
        { num: '03', title: 'Budget Alignment' },
        { num: '04', title: 'Coordinated Execution' },
      ],
      cta: 'Discuss Your Development Mandate',
    },
  },
  services: {
    hero: {
      label: 'Gradum Services',
      title1: 'Operational Advisory',
      title2: 'for Disciplined Execution.',
      description: 'Gradum Services provides operational infrastructure support within defined financial and brand governance mandates.',
      cta: 'Strengthen Your Operations',
    },
    overview: {
      label: 'Overview',
      p1: 'We partner with organizations requiring structured financial governance and controlled brand infrastructure.',
      p2: 'Engagements operate under mandate-based workflows, compliance standards, and measurable reporting structures aligned to business objectives.',
    },
    practiceAreas: {
      label: 'Practice Areas',
      heading: 'Service Divisions',
      areas: [
        { name: 'Accounting & Finance', tagline: 'Financial structure and operational clarity.', desc: 'We provide structured financial coordination, compliance oversight, and planning support to strengthen internal controls and executive decision-making.', cta: 'Explore Accounting & Finance' },
        { name: 'Marketing & Media', tagline: 'Brand discipline and structured execution.', desc: 'We support positioning, digital management, and campaign coordination — ensuring communication systems align with business strategy and operational priorities.', cta: 'Explore Marketing & Media' },
      ],
    },
    engagement: {
      label: 'Methodology',
      heading: 'Engagement Model',
      steps: [
        { num: '01', title: 'Assessment', desc: 'Clarifying priorities and performance objectives.' },
        { num: '02', title: 'Scope Alignment', desc: 'Defining deliverables, timelines, and ownership.' },
        { num: '03', title: 'Structured Execution', desc: 'Delivering against defined milestones.' },
        { num: '04', title: 'Ongoing Advisory', desc: 'Sustaining performance through disciplined oversight.' },
      ],
    },
    cta: {
      heading: 'Strengthen Your Operations',
      description: 'Mandate-based execution frameworks aligned to your business objectives.',
    },
  },
  accelerator: {
    hero: {
      label: 'Gradum Accelerator',
      badge: 'Coming Soon',
      title1: 'Venture Development',
      title2: 'Within a',
      title3: 'Structured Platform.',
      description: "A selective initiative launching in a future phase as part of Gradum's disciplined regional expansion.",
      cta: 'Request Information',
    },
    overview: {
      label: 'Overview',
      heading: 'A Disciplined Approach to Venture Development',
      p1: 'Gradum Accelerator is a planned venture development initiative aligned with the broader Gradum advisory and execution platform.',
      p2: 'Rather than traditional incubation models, the Accelerator will operate through formalized advisory mandates — integrating engineering, financial governance, and operational discipline into long-term venture development.',
      p3: 'Initial launch will follow the continued expansion of Gradum Consulting and Construction operations.',
    },
    model: [
      { label: 'Model', value: 'Formalized advisory mandates' },
      { label: 'Approach', value: 'Engineering + financial governance + operational discipline' },
      { label: 'Timeline', value: 'Future phase launch' },
      { label: 'Geography', value: 'Regional expansion — Latin America & North America' },
    ],
    cta: {
      heading: 'Express Interest',
      description: 'Stay informed on the Gradum Accelerator launch timeline and program details.',
      button: 'Express Interest',
    },
  },
  accountingFinance: {
    hero: {
      label: 'Gradum Services',
      sublabel: 'Accounting & Finance',
      title1: 'Financial Structure.',
      title2: 'Operational Clarity.',
      description: 'Gradum delivers structured financial infrastructure and internal accounting execution designed to strengthen reporting integrity, regulatory alignment, and disciplined financial control.',
      cta: 'Request a Consultation',
    },
    overview: {
      label: 'Overview',
      description: 'Gradum supports organizations operating in the Dominican Republic requiring reliable reporting, regulatory alignment, and structured financial governance. Our internal accounting team operates under defined workflows, supervisory controls, and measurable reporting standards — ensuring financial visibility and operational discipline at every stage.',
    },
    deliverables: {
      label: 'Deliverables',
      heading: 'What We Deliver',
      items: [
        { title: 'Financial Reporting & Control', list: ['Bookkeeping execution and supervisory review', 'Monthly financial statement preparation and validation', 'Reporting alignment and documentation control', 'Reconciliation management and monitoring'] },
        { title: 'Compliance & Administrative Execution', list: ['Payroll processing and coordination', 'Tax compliance and filing execution', 'Regulatory reporting support', 'Vendor payment administration and controls'] },
        { title: 'Planning & Financial Structure', list: ['Budget framework development', 'Cash flow forecasting and oversight', 'Financial planning coordination', 'Operational finance structuring'] },
      ],
    },
    whoItsFor: {
      label: 'Target',
      heading: "Who It's For",
      items: [
        'Founder-led, scaling, and mid-market operating businesses in the Dominican Republic',
        'Growing organizations requiring internal accounting infrastructure',
        'Regulated operators requiring local compliance management',
        'International businesses with Dominican Republic operations',
      ],
    },
    engagement: {
      label: 'Engagement',
      heading: 'Engagement Structure',
      tiers: [
        { name: 'Essential', desc: 'Core accounting execution and compliance management.' },
        { name: 'Growth', desc: 'Enhanced reporting visibility, structured budgeting, and financial alignment.' },
        { name: 'Enterprise', desc: 'Comprehensive oversight, internal control frameworks, and multi-entity coordination.' },
      ],
    },
    cta: {
      heading: 'Strengthen Your Financial Infrastructure',
      button: 'Request a Consultation',
    },
  },
  marketingMedia: {
    hero: {
      label: 'Gradum Services',
      sublabel: 'Marketing & Media',
      title1: 'Brand Discipline.',
      title2: 'Structured Execution.',
      description: 'Structured brand governance and execution infrastructure designed to strengthen positioning, messaging alignment, and digital performance.',
      cta: 'Request a Consultation',
    },
    overview: {
      label: 'Overview',
      p1: 'Gradum supports organizations in building disciplined brand systems and structured marketing execution frameworks aligned with business strategy.',
      p2: 'Our focus is clarity in positioning, consistency in communication, and measurable alignment between brand strategy and operational goals.',
    },
    deliverables: {
      label: 'Deliverables',
      heading: 'What We Deliver',
      items: [
        { title: 'Brand & Positioning', list: ['Brand architecture coordination', 'Messaging alignment and narrative structure', 'Strategic positioning development'] },
        { title: 'Digital Presence', list: ['Website governance and optimization oversight', 'Digital platform coordination', 'Content system architecture'] },
        { title: 'Campaign Execution', list: ['Campaign strategy and planning', 'Launch execution management', 'Performance measurement and reporting'] },
      ],
    },
    whoItsFor: {
      label: 'Target',
      heading: "Who It's For",
      items: [
        'Scaling and mid-market businesses requiring disciplined brand infrastructure',
        'Professional service firms',
        'Organizations entering new markets',
        'Companies requiring disciplined digital coordination',
      ],
    },
    engagement: {
      label: 'Engagement',
      heading: 'Engagement Structure',
      tiers: [
        { name: 'Essential', desc: 'Core brand coordination and digital execution.' },
        { name: 'Growth', desc: 'Enhanced campaign planning, content systems, and performance reporting.' },
        { name: 'Enterprise', desc: 'Comprehensive brand structuring, multi-channel oversight, and strategic leadership.' },
      ],
    },
    cta: {
      heading: 'Strengthen Your Brand Infrastructure',
      button: 'Request a Consultation',
    },
  },
};

const es: typeof en = {
  common: {
    requestConsultation: 'Solicitar Consultoría',
    clientAccess: 'Acceso al cliente',
    privacyPolicy: 'Política de privacidad',
    terms: 'Términos',
    platform: 'Plataforma',
    company: 'Empresa',
    consulting: 'Consultoría',
    construction: 'Construcción',
    services: 'Servicios',
    accelerator: 'Acelerador',
    about: 'Nosotros',
    contact: 'Contacto',
    learnMore: 'Saber más',
    comingSoon: 'Próximamente',
    close: 'Cerrar',
    cancel: 'Cancelar',
    submitInquiry: 'Enviar solicitud',
    returnHome: 'Volver al inicio →',
    footerTagline: 'Plataforma de asesoría y ejecución liderada por ingeniería, estructurada para entornos de alto rendimiento.',
    footerLegal: 'Gradum Group LLC (EE. UU.)  |  Gradum Group, SRL (República Dominicana)',
  },
  notFound: {
    title: 'Página no encontrada',
    description: 'La página que buscas no existe.',
  },
  nav: {
    home: 'Inicio',
    platform: 'Plataforma',
    about: 'Nosotros',
    contact: 'Contacto',
    selectLanguage: 'Seleccionar idioma',
    english: 'English',
    spanish: 'Español',
  },
  modal: {
    title: 'Solicitar una consultoría',
    subtitle: 'Un miembro de nuestro equipo se pondrá en contacto pronto.',
    closeLabel: 'Cerrar ventana',
    messageReceived: 'Mensaje recibido',
    thankYou: 'Gracias. Un miembro de nuestro equipo se pondrá en contacto pronto.',
    name: 'Nombre *',
    company: 'Empresa',
    email: 'Correo *',
    phone: 'Teléfono',
    country: 'País',
    inquiryType: 'Tipo de consulta',
    message: 'Mensaje *',
    namePlaceholder: 'Nombre completo',
    companyPlaceholder: 'Organización',
    emailPlaceholder: 'tu@empresa.com',
    phonePlaceholder: '+1 (000) 000-0000',
    selectCountry: 'Seleccionar país',
    selectType: 'Seleccionar tipo',
    messagePlaceholder: 'Describe brevemente tu proyecto o consulta...',
    inquiryTypes: ['Consultoría', 'Proyecto de construcción', 'Contabilidad y finanzas', 'Marketing y medios', 'Programa Acelerador', 'Consulta general'],
    countries: ['Estados Unidos', 'República Dominicana', 'Colombia', 'México', 'Panamá', 'Puerto Rico', 'Canadá', 'Otro'],
  },
  home: {
    hero: {
      tagline: 'Plataforma de asesoría liderada por ingeniería',
      title1: 'Asesoría',
      title2: 'estructurada.',
      title3: 'Ejecución',
      title4: 'ingenieril.',
      description: 'Gradum es una plataforma de asesoría y ejecución liderada por ingeniería, estructurada para abordar la complejidad técnica, operativa e infraestructura en entornos de alto rendimiento. Trabajamos con empresas de mercado medio y líderes regionales en industrias intensivas en ingeniería, reguladas y críticas en infraestructura.',
    },
    platform: {
      label: 'Nuestra plataforma',
      heading: 'Arquitectura integrada de asesoría y ejecución.',
      intro: 'Las divisiones de la plataforma operan bajo marcos de mandato definidos e integran una arquitectura unificada de asesoría y ejecución para entornos multifuncionales y multi-entidad.',
    },
    divisions: [
      { name: 'Gradum Consulting', tagline: 'Asesoría en ingeniería y tecnología para industrias de alto rendimiento.' },
      { name: 'Gradum Construction', tagline: 'Ejecución arquitectónica y estructural.' },
      { name: 'Gradum Services', tagline: 'Gobernanza financiera e infraestructura de ejecución de marca.' },
      { name: 'Gradum Accelerator', tagline: 'Plataforma de desarrollo de ventures.' },
    ],
    howWeWork: {
      label: 'Metodología',
      heading: 'Cómo trabajamos',
      steps: [
        { num: '01', title: 'Evaluación', desc: 'Clarificación de objetivos y restricciones operativas.' },
        { num: '02', title: 'Alineación de alcance', desc: 'Definición de entregables, hitos y responsabilidad.' },
        { num: '03', title: 'Ejecución estructurada', desc: 'Entrega frente a objetivos medibles.' },
        { num: '04', title: 'Asesoría continua', desc: 'Sostenimiento del rendimiento mediante supervisión disciplinada.' },
      ],
    },
    cta: {
      label: 'Coordinación con clientes',
      heading: 'Coordinación estructurada con clientes',
      description: 'Todos los compromisos se gestionan a través del Portal de Clientes Gradum, garantizando colaboración segura, etapas de proyecto definidas y documentación centralizada.',
    },
  },
  about: {
    hero: {
      label: 'Nosotros',
      title1: 'Ingeniería para',
      title2: 'la precisión.',
      intro: 'Gradum es una plataforma de asesoría y ejecución liderada por ingeniería, estructurada en verticales enfocados.',
    },
    overview: [
      'Trabajamos con organizaciones que buscan claridad operativa, rigor técnico y rendimiento medible en entornos complejos.',
      'Los compromisos suelen implicar coordinación multifuncional, entornos operativos regulados y estructuras de responsabilidad a nivel ejecutivo.',
      'Las operaciones iniciales están ancladas en República Dominicana, con expansión en América Latina y Norteamérica.',
    ],
    platform: {
      label: 'Nuestra plataforma',
      heading: 'Verticals enfocados',
    },
    divisions: [
      { name: 'Gradum Consulting', desc: 'Asesoría en ingeniería y tecnología centrada en arquitectura de sistemas, infraestructura digital y operaciones de rendimiento crítico. Ofrecemos estrategia de ingeniería a nivel ejecutivo y supervisión técnica disciplinada en ecosistemas técnicos complejos.' },
      { name: 'Gradum Construction', desc: 'Ejecución arquitectónica y estructural por proyectos en República Dominicana.' },
      { name: 'Gradum Services', desc: 'Gobernanza financiera e infraestructura de ejecución de marca para el rendimiento operativo.' },
      { name: 'Gradum Accelerator', desc: 'Una iniciativa selectiva que se lanzará en una fase futura como parte de la expansión regional disciplinada de Gradum.' },
    ],
    philosophy: {
      label: 'Filosofía',
      heading: 'Filosofía de ejecución',
      principles: ['Disciplina sobre ruido.', 'Estructura sobre improvisación.', 'Ejecución sobre abstracción.', 'Precisión sobre volumen.'],
      closing: 'El rendimiento sostenible se construye con alcance definido, propiedad responsable y entrega controlada — no con decisiones reactivas.',
    },
    engagement: {
      label: 'Principios',
      heading: 'Principios de compromiso',
      intro: 'Cada compromiso prioriza:',
      items: ['Alcance claro antes de actuar', 'Propiedad y responsabilidad establecidas', 'Coordinación transparente', 'Impacto operativo medible'],
      closing1: 'Gradum no está construido para volumen.',
      closing2: 'Está diseñado para la precisión.',
    },
  },
  consulting: {
    hero: {
      label: 'Gradum Consulting',
      title1: 'Asesoría en',
      title2: 'ingeniería y tecnología',
      title3: 'para industrias de alto rendimiento.',
      description: 'Ofrecemos estrategia de ingeniería a nivel ejecutivo y supervisión técnica disciplinada en sistemas complejos, infraestructura digital y operaciones de rendimiento crítico.',
      cta: 'Solicitar consultoría técnica',
    },
    overview: {
      label: 'Resumen',
      heading: 'Modelo de asesoría',
      p1: 'Nuestro modelo de asesoría permite el compromiso a nivel de estrategia ejecutiva o la participación embebida en programas de ingeniería empresarial.',
      p2: 'Alineamos la arquitectura de sistemas disciplinada con resultados de negocio medibles — apoyando iniciativas de modernización, hojas de ruta tecnológicas ejecutivas y estrategia de ingeniería a largo plazo.',
    },
    engagement: {
      label: 'Compromiso',
      heading: 'Modelo de compromiso',
      intro: 'Los compromisos abarcan con frecuencia iniciativas de modernización multi-sistema, hojas de ruta tecnológicas empresariales y programas de infraestructura de rendimiento crítico.',
      items: [
        { title: 'Estrategia técnica y asesoría', desc: 'Orientación a nivel ejecutivo en arquitectura de sistemas, hojas de ruta tecnológicas, programas de modernización y dirección de ingeniería de rendimiento.' },
        { title: 'Ingeniería de rendimiento y apoyo a la ejecución', desc: 'Ejecución técnica embebida en modelado, simulación, sistemas embebidos, desarrollo de gemelos digitales e integración de software industrial.' },
      ],
    },
    capabilities: {
      label: 'Capacidades',
      heading: 'Capacidades técnicas principales',
      items: [
        { title: 'Modelado y simulación avanzados', desc: 'Modelado a nivel de sistema y simulación multi-dominio para validación, optimización y decisiones de diseño a nivel de arquitectura.' },
        { title: 'Sistemas embebidos y arquitectura de software industrial', desc: 'Arquitectura de software embebido, flujos de desarrollo basados en modelos, integración de interfaces y diseño de sistemas de grado productivo.' },
        { title: 'Gemelo digital e ingeniería de rendimiento', desc: 'Arquitectura de infraestructura digital, modelado predictivo de rendimiento y optimización a nivel de sistema.' },
        { title: 'Software industrial e integración de sistemas de control', desc: 'Alineación de cadenas de herramientas entre plataformas de modelado, entornos de simulación, sistemas de control y ecosistemas de software embebido.' },
      ],
    },
    industries: {
      label: 'Industrias',
      heading: 'Enfoque representativo por industria',
      list: ['Agricultura', 'Energía y servicios públicos', 'Automatización industrial', 'Dispositivos médicos', 'Minería'],
    },
    cta: {
      label: 'Modelo de asesoría',
      heading: 'Entregado mediante liderazgo senior en ingeniería',
      description: 'Los compromisos se entregan mediante liderazgo senior en ingeniería alineado a mandatos de asesoría formalizados.',
    },
  },
  construction: {
    hero: {
      label: 'Gradum Construction',
      title1: 'Desarrollo ingenieril',
      title2: 'para República Dominicana.',
      description: 'Servicios estructurales, arquitectónicos y de planificación con rigor técnico y disciplina de ingeniería.',
      cta: 'Hablar de un proyecto',
    },
    overview: {
      label: 'Resumen',
      heading: 'Ejecución ingenieril gobernada',
      p1: 'Gradum Construction ofrece servicios arquitectónicos y de ingeniería por proyectos en República Dominicana, bajo estándares de ingeniería licenciados y modelos de ejecución gobernados.',
      p2: 'Nuestro enfoque integra diseño estructural, análisis de suelos, planificación de costos y ejecución coordinada — garantizando seguridad, cumplimiento normativo y rendimiento estructural a largo plazo en una región donde la precisión ingenieril es crítica.',
      p3: 'Los proyectos se ejecutan bajo supervisión de ingeniería local licenciada y alineación regulatoria.',
    },
    services: {
      label: 'Servicios',
      heading: 'Servicios principales',
      items: [
        { title: 'Ingeniería estructural y planos', list: ['Diseño de sistemas estructurales', 'Detalle de refuerzos', 'Análisis de cargas y rendimiento', 'Desarrollo de planos técnicos'] },
        { title: 'Investigación geotécnica', list: ['Coordinación de evaluación de suelos', 'Análisis geotécnico', 'Recomendaciones de cimentación', 'Evaluación de riesgo del sitio'] },
        { title: 'Presupuesto y planificación de costos', list: ['Desarrollo de marco presupuestario', 'Estimación y control de costos', 'Planificación de asignación de recursos', 'Coordinación financiera con partes interesadas'] },
        { title: 'Diseño arquitectónico', list: ['Desarrollo de diseño conceptual', 'Preparación de dibujos técnicos', 'Alineación regulatoria', 'Documentación de construcción'] },
        { title: 'Diseño de interiores', list: ['Planificación de distribución funcional', 'Selección de materiales y acabados', 'Supervisión de implementación'] },
      ],
    },
    seismic: {
      badge: 'En desarrollo',
      heading: 'Ingeniería sísmica y de suelos',
      intro: 'En respuesta a las realidades estructurales y sísmicas de República Dominicana, Gradum está desarrollando una plataforma analítica enfocada en ingeniería para apoyar:',
      list: ['Estudios de suelos avanzados', 'Análisis sísmico', 'Modelado de riesgo estructural'],
      closing: 'Esta iniciativa refleja nuestro compromiso a largo plazo con la seguridad, validación estructural y precisión ingenieril en el desarrollo local.',
    },
    projectModel: {
      label: 'Metodología',
      heading: 'Modelo de proyecto',
      steps: [
        { num: '01', title: 'Evaluación del sitio y estructural' },
        { num: '02', title: 'Diseño y planificación técnica' },
        { num: '03', title: 'Alineación presupuestaria' },
        { num: '04', title: 'Ejecución coordinada' },
      ],
      cta: 'Hablar de su mandato de desarrollo',
    },
  },
  services: {
    hero: {
      label: 'Gradum Services',
      title1: 'Asesoría operativa',
      title2: 'para ejecución disciplinada.',
      description: 'Gradum Services ofrece soporte de infraestructura operativa dentro de mandatos definidos de gobernanza financiera y de marca.',
      cta: 'Fortalecer sus operaciones',
    },
    overview: {
      label: 'Resumen',
      p1: 'Trabajamos con organizaciones que requieren gobernanza financiera estructurada e infraestructura de marca controlada.',
      p2: 'Los compromisos operan bajo flujos de trabajo basados en mandato, estándares de cumplimiento y estructuras de reporte medibles alineadas a objetivos de negocio.',
    },
    practiceAreas: {
      label: 'Áreas de práctica',
      heading: 'Divisiones de servicio',
      areas: [
        { name: 'Contabilidad y finanzas', tagline: 'Estructura financiera y claridad operativa.', desc: 'Ofrecemos coordinación financiera estructurada, supervisión de cumplimiento y apoyo en planificación para fortalecer controles internos y toma de decisiones ejecutiva.', cta: 'Explorar Contabilidad y finanzas' },
        { name: 'Marketing y medios', tagline: 'Disciplina de marca y ejecución estructurada.', desc: 'Apoyamos posicionamiento, gestión digital y coordinación de campañas — asegurando que los sistemas de comunicación se alineen con la estrategia de negocio y prioridades operativas.', cta: 'Explorar Marketing y medios' },
      ],
    },
    engagement: {
      label: 'Metodología',
      heading: 'Modelo de compromiso',
      steps: [
        { num: '01', title: 'Evaluación', desc: 'Clarificación de prioridades y objetivos de rendimiento.' },
        { num: '02', title: 'Alineación de alcance', desc: 'Definición de entregables, plazos y propiedad.' },
        { num: '03', title: 'Ejecución estructurada', desc: 'Entrega frente a hitos definidos.' },
        { num: '04', title: 'Asesoría continua', desc: 'Sostenimiento del rendimiento mediante supervisión disciplinada.' },
      ],
    },
    cta: {
      heading: 'Fortalecer sus operaciones',
      description: 'Marcos de ejecución basados en mandato alineados a sus objetivos de negocio.',
    },
  },
  accelerator: {
    hero: {
      label: 'Gradum Accelerator',
      badge: 'Próximamente',
      title1: 'Desarrollo de ventures',
      title2: 'dentro de una',
      title3: 'plataforma estructurada.',
      description: 'Una iniciativa selectiva que se lanzará en una fase futura como parte de la expansión regional disciplinada de Gradum.',
      cta: 'Solicitar información',
    },
    overview: {
      label: 'Resumen',
      heading: 'Un enfoque disciplinado para el desarrollo de ventures',
      p1: 'Gradum Accelerator es una iniciativa planificada de desarrollo de ventures alineada con la plataforma más amplia de asesoría y ejecución de Gradum.',
      p2: 'En lugar de modelos de incubación tradicionales, el Acelerador operará mediante mandatos de asesoría formalizados — integrando ingeniería, gobernanza financiera y disciplina operativa en el desarrollo de ventures a largo plazo.',
      p3: 'El lanzamiento inicial seguirá a la expansión continua de las operaciones de Gradum Consulting y Construction.',
    },
    model: [
      { label: 'Modelo', value: 'Mandatos de asesoría formalizados' },
      { label: 'Enfoque', value: 'Ingeniería + gobernanza financiera + disciplina operativa' },
      { label: 'Cronograma', value: 'Lanzamiento en fase futura' },
      { label: 'Geografía', value: 'Expansión regional — América Latina y Norteamérica' },
    ],
    cta: {
      heading: 'Expresar interés',
      description: 'Manténgase informado sobre el cronograma de lanzamiento y los detalles del programa del Gradum Accelerator.',
      button: 'Expresar interés',
    },
  },
  accountingFinance: {
    hero: {
      label: 'Gradum Services',
      sublabel: 'Contabilidad y finanzas',
      title1: 'Estructura financiera.',
      title2: 'Claridad operativa.',
      description: 'Gradum ofrece infraestructura financiera estructurada y ejecución de contabilidad interna diseñada para fortalecer la integridad del reporte, alineación regulatoria y control financiero disciplinado.',
      cta: 'Solicitar una consultoría',
    },
    overview: {
      label: 'Resumen',
      description: 'Gradum apoya a organizaciones que operan en República Dominicana y requieren reportes confiables, alineación regulatoria y gobernanza financiera estructurada. Nuestro equipo de contabilidad interna opera bajo flujos de trabajo definidos, controles supervisores y estándares de reporte medibles — garantizando visibilidad financiera y disciplina operativa en cada etapa.',
    },
    deliverables: {
      label: 'Entregables',
      heading: 'Qué entregamos',
      items: [
        { title: 'Reporte y control financiero', list: ['Ejecución contable y revisión supervisora', 'Preparación y validación de estados financieros mensuales', 'Alineación de reportes y control documental', 'Gestión y monitoreo de conciliaciones'] },
        { title: 'Cumplimiento y ejecución administrativa', list: ['Procesamiento y coordinación de nómina', 'Cumplimiento y presentación fiscal', 'Soporte de reportes regulatorios', 'Administración y controles de pagos a proveedores'] },
        { title: 'Planificación y estructura financiera', list: ['Desarrollo de marco presupuestario', 'Pronóstico y supervisión de flujo de caja', 'Coordinación de planificación financiera', 'Estructuración de finanzas operativas'] },
      ],
    },
    whoItsFor: {
      label: 'Público objetivo',
      heading: 'Para quién es',
      items: [
        'Empresas operativas en República Dominicana lideradas por fundadores, en crecimiento y de mercado medio',
        'Organizaciones en crecimiento que requieren infraestructura contable interna',
        'Operadores regulados que requieren gestión de cumplimiento local',
        'Empresas internacionales con operaciones en República Dominicana',
      ],
    },
    engagement: {
      label: 'Compromiso',
      heading: 'Estructura de compromiso',
      tiers: [
        { name: 'Esencial', desc: 'Ejecución contable central y gestión de cumplimiento.' },
        { name: 'Crecimiento', desc: 'Visibilidad de reportes mejorada, presupuestación estructurada y alineación financiera.' },
        { name: 'Empresarial', desc: 'Supervisión integral, marcos de control interno y coordinación multi-entidad.' },
      ],
    },
    cta: {
      heading: 'Fortalecer su infraestructura financiera',
      button: 'Solicitar una consultoría',
    },
  },
  marketingMedia: {
    hero: {
      label: 'Gradum Services',
      sublabel: 'Marketing y medios',
      title1: 'Disciplina de marca.',
      title2: 'Ejecución estructurada.',
      description: 'Gobernanza de marca estructurada e infraestructura de ejecución para fortalecer posicionamiento, alineación de mensajes y rendimiento digital.',
      cta: 'Solicitar una consultoría',
    },
    overview: {
      label: 'Resumen',
      p1: 'Gradum apoya a organizaciones en la construcción de sistemas de marca disciplinados y marcos de ejecución de marketing estructurados alineados con la estrategia de negocio.',
      p2: 'Nuestro enfoque es claridad en posicionamiento, consistencia en comunicación y alineación medible entre estrategia de marca y objetivos operativos.',
    },
    deliverables: {
      label: 'Entregables',
      heading: 'Qué entregamos',
      items: [
        { title: 'Marca y posicionamiento', list: ['Coordinación de arquitectura de marca', 'Alineación de mensajes y estructura narrativa', 'Desarrollo de posicionamiento estratégico'] },
        { title: 'Presencia digital', list: ['Supervisión de gobernanza y optimización web', 'Coordinación de plataformas digitales', 'Arquitectura de sistemas de contenido'] },
        { title: 'Ejecución de campañas', list: ['Estrategia y planificación de campañas', 'Gestión de lanzamiento', 'Medición y reporte de rendimiento'] },
      ],
    },
    whoItsFor: {
      label: 'Público objetivo',
      heading: 'Para quién es',
      items: [
        'Empresas de mercado medio y en crecimiento que requieren infraestructura de marca disciplinada',
        'Firmas de servicios profesionales',
        'Organizaciones que entran en nuevos mercados',
        'Empresas que requieren coordinación digital disciplinada',
      ],
    },
    engagement: {
      label: 'Compromiso',
      heading: 'Estructura de compromiso',
      tiers: [
        { name: 'Esencial', desc: 'Coordinación de marca central y ejecución digital.' },
        { name: 'Crecimiento', desc: 'Planificación de campañas mejorada, sistemas de contenido y reporte de rendimiento.' },
        { name: 'Empresarial', desc: 'Estructuración de marca integral, supervisión multicanal y liderazgo estratégico.' },
      ],
    },
    cta: {
      heading: 'Fortalecer su infraestructura de marca',
      button: 'Solicitar una consultoría',
    },
  },
};

export const translations: Record<Language, typeof en> = { en, es };
