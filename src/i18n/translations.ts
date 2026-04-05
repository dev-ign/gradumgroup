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
    consultation: 'Consultation',
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
    scheduleDemo: 'Schedule Demo',
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
    accountingFinance: 'Accounting & Finance',
    marketingMedia: 'Marketing & Media',
    viewAllServices: 'View All Services',
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
      mainTitle: 'A Technology-First Advisory & Execution Platform',
      title1: 'Structured',
      title2: 'Advisory.',
      title3: 'Engineered',
      title4: 'Execution.',
      description: 'Gradum helps organizations design, build, and scale solutions across business operations, technology, and infrastructure.',
      cta: 'Explore Platform',
    },
    platform: {
      label: 'Our Platform',
      heading: 'Integrated advisory and execution architecture.',
      intro: 'Platform divisions operate under defined mandate frameworks and integrate within a unified advisory and execution architecture designed for multi-functional and multi-entity environments.',
    },
    divisions: [
      { name: 'Gradum Consulting', tagline: 'Advisory and technical support for teams building complex, performance-critical systems.', subtitle: 'Advanced Technology & Engineering Advisory' },
      { name: 'Gradum Construction', tagline: 'End-to-end delivery across architectural design, engineering, and physical execution.', subtitle: 'Engineering, Architecture & Build' },
      { name: 'Gradum Services', tagline: 'Financial operations, accounting, and brand execution services designed to support scalable growth.', subtitle: 'Business Operations & Growth Services' },
      { name: 'Gradum Accelerator', tagline: 'We partner with early-stage companies to build and scale technology-driven ventures.', subtitle: 'Startup Development & Venture Growth' },
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
    innovativeSolutions: {
      label: 'Built for Teams Operating at Scale',
      description: 'We operate across advanced engineering domains, proven technical frameworks, and complex industry environments.',
      intro1: 'Gradum partners with organizations navigating complex technical and operational environments.',
      intro2: 'We work across functions to design, implement, and scale solutions that drive measurable outcomes.',
      tabs: [
        {
          label: 'Applications',
          items: ['AI & Machine Learning', 'IoT & Smart Systems', 'Robotics & Automation', 'Data Analytics & Visualization'],
        },
        {
          label: 'Methodologies',
          items: ['Systems Engineering', 'Agile & Iterative Development', 'Model-Based Design', 'Lean Process Engineering'],
        },
        {
          label: 'Industries',
          items: ['Energy & Infrastructure', 'Healthcare Technology', 'Defense & Aerospace', 'Manufacturing & Supply Chain'],
        },
      ],
    },
    builtForCompanies: {
      heading: 'Technical Advisory Built for Strategic and Execution-Level Impact',
      description: 'We operate across executive, architecture, and program-delivery layers, helping organizations make stronger technical decisions and move complex initiatives forward with clarity.',
      platformLabel: 'One Platform. Four Capabilities.',
      exploreLink: 'Explore Each Platform',
    },
    advisoryCards: {
      cta: 'Request a Technical Consultation',
      items: [
        { title: 'Executive Advisory', desc: 'Technology strategy, system architecture direction, and technical decision support for leadership teams.' },
        { title: 'Engineering Advisory', desc: 'Hands-on support across modeling, simulation, embedded systems, controls, and technical workflow design.' },
        { title: 'Program-Level Execution Support', desc: 'Advisory oversight across multi-disciplinary engineering initiatives requiring structure, prioritization, and execution alignment.' },
      ],
    },
    precision: {
      heading: 'Built for High-Complexity Engineering Environments',
      heading1: 'Gradum is not built for volume.',
      heading2Prefix: 'It is ',
      heading2Accent: 'engineered for precision.',
      subtitle: 'Where Advisory Meets Execution',
      description: 'We work selectively with organizations where execution quality, depth, and long-term impact matter. From design to delivery, we focus on what actually moves the needle.',
      tags: ['System Architecture & Technical Direction', 'Embedded & Intelligent Systems', 'Control & Automation', 'Engineering Strategy & Execution Alignment'],
    },
    insights: {
      heading: 'Technical Insights',
      description: 'Perspectives on engineering strategy, system design, and technical execution across complex environments.',
      cards: [
        'Model-Based Design in Production Systems',
        'Designing for Performance-Constrained Environments',
        'From Prototype to Scalable System Architecture',
      ],
    },
    letsBuild: {
      heading: 'Designed for Complex Environments',
      description: 'Gradum integrates strategy, engineering, and execution to deliver solutions that perform in real-world environments.',
      techTags: ['Technology & Engineering', 'Business Operations', 'Infrastructure & Build', 'Data & Intelligence'],
    },
    footerLocations: 'Miami, FL (USA)\nSanto Domingo (Dominican Republic)',
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
      title: 'Engineering & Technology Advisory for Complex Systems',
      description: 'Gradum Consulting supports advanced engineering initiatives across embedded systems, control architectures, intelligent automation, and digital infrastructure, combining senior technical expertise with disciplined execution.',
      cta: 'Explore Consulting Capabilities',
    },
    whereWeOperate: {
      label: 'Where We Operate',
      subtitle: 'We operate across advanced engineering domains, proven technical frameworks, and complex industry environments.',
      links: [
        { label: 'Applications', href: '#' },
        { label: 'Methodologies', href: '#' },
        { label: 'Industries', href: '#' },
      ],
    },
    advisory: {
      label: 'Advisory Model',
      heading: 'Technical Advisory Built for Strategic and Execution-Level Impact',
      intro: 'We operate across executive, architecture, and program-delivery layers — helping organizations make stronger technical decisions and execute complex initiatives with greater precision.',
      cta: 'Request a Technical Consultation',
      items: [
        { title: 'Executive Advisory', desc: 'Technology strategy, system architecture direction, and technical decision support for leadership teams.' },
        { title: 'Engineering Advisory', desc: 'Hands-on support across modeling, simulation, embedded systems, controls, and technical workflow design.' },
        { title: 'Program-Level Execution Support', desc: 'Advisory oversight across multi-disciplinary engineering initiatives requiring structure, prioritization, and execution alignment.' },
      ],
    },
    complexity: {
      label: 'Capabilities',
      heading: 'Built for High-Complexity Engineering Environments',
      description: 'We support organizations navigating system-level complexity, performance constraints, integration challenges, and long development cycles — bringing structure, clarity, and technical rigor to critical initiatives.',
      pills: [
        'System Architecture & Technical Direction',
        'Embedded & Intelligent Systems',
        'Control & Automation',
        'Engineering Strategy & Execution Alignment',
      ],
    },
    insights: {
      label: 'Technical Insights',
      heading: 'Perspectives on engineering strategy, system design, and technical execution across complex environments.',
      cards: [
        { title: 'Model-Based Design in Production Systems', img: '1518770660439-4636190af475' },
        { title: 'Designing for Performance-Constrained Environments', img: '1558494949-ef010cbdcc31' },
        { title: 'From Prototype to Scalable System Architecture', img: '1488590528505-98d2b5aba04b' },
      ],
    },
    cta: {
      label: 'Start the Conversation',
      heading: 'Engineering Advisory with Real-World Execution in Mind',
      description: 'From early technical direction to program-level support, Gradum Consulting helps organizations navigate complexity and execute with greater precision.',
      cta: 'Request a Technical Consultation',
    },
  },
  construction: {
    hero: {
      label: 'Gradum Construction',
      title: 'Engineering, Architecture & Build for High-Quality Execution',
      description: 'Gradum Construction delivers end-to-end solutions across design, engineering, and construction, combining technical rigor, aesthetic precision, and disciplined execution.',
      cta: 'Explore Construction Services',
    },
    whatWeDeliver: {
      label: 'What We Deliver',
      subtitle: 'We support projects from early concept through final execution, ensuring alignment across design intent, technical feasibility, and build quality.',
      links: [
        { label: 'Design' },
        { label: 'Engineering' },
        { label: 'Construction' },
      ],
    },
    process: {
      label: 'End-to-End Execution',
      heading: 'Structured for End-to-End Project Execution',
      intro: 'We operate across planning, technical development, and on-site execution, ensuring projects move forward with clarity, coordination, and control.',
      cta: 'Request a Consultation',
      items: [
        { title: 'Design & Planning', desc: 'Architectural concepts, spatial planning, and design direction aligned with project goals and constraints.' },
        { title: 'Engineering & Technical Development', desc: 'Structural planning, system integration, and technical validation to ensure feasibility and performance.' },
        { title: 'Construction & Execution', desc: 'On-site coordination, build oversight, and delivery aligned with design intent and quality standards.' },
      ],
    },
    precision: {
      label: 'Precision & Discipline',
      heading: 'Built with Precision, Delivered with Discipline',
      description: 'Gradum Construction is focused on execution quality, bringing together design, engineering, and construction into a single, aligned process. We work on projects where detail, coordination, and long-term quality matter.',
      pills: [
        'Architectural Design & Interiors',
        'Structural & Technical Engineering',
        'Project Coordination',
        'Quality-Focused Execution',
      ],
    },
    insights: {
      label: 'Construction Insights',
      heading: 'Perspectives on design, construction, and project execution, from concept development to completed environments.',
      cards: [
        { title: 'Designing Functional and Modern Workspaces', img: '1497366811353-6870744d04b2' },
        { title: 'Balancing Aesthetics and Structural Integrity', img: '1541888946425-d81bb19240f5' },
        { title: 'From Concept to Built Environment', img: '1503387762-592deb58ef4e' },
      ],
    },
    cta: {
      label: 'Construction with Execution in Mind',
      heading: 'From initial design through final delivery, Gradum Construction ensures projects are built with clarity, coordination, and attention to detail.',
      description: 'From architectural concept to on-site execution, every phase is managed with precision, alignment, and a commitment to long-term quality.',
      cta: 'Start the Conversation',
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
    consultation: 'Consultación',
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
    scheduleDemo: 'Agendar Demo',
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
    accountingFinance: 'Contabilidad y finanzas',
    marketingMedia: 'Marketing y medios',
    viewAllServices: 'Ver todos los servicios',
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
      mainTitle: 'Una Plataforma de Asesoría y Ejecución Tecnológica',
      title1: 'Asesoría',
      title2: 'estructurada.',
      title3: 'Ejecución',
      title4: 'ingenieril.',
      description: 'Gradum ayuda a las organizaciones a diseñar, construir y escalar soluciones en operaciones empresariales, tecnología e infraestructura.',
      cta: 'Explorar Plataforma',
    },
    platform: {
      label: 'Nuestra plataforma',
      heading: 'Arquitectura integrada de asesoría y ejecución.',
      intro: 'Las divisiones de la plataforma operan bajo marcos de mandato definidos e integran una arquitectura unificada de asesoría y ejecución para entornos multifuncionales y multi-entidad.',
    },
    divisions: [
      { name: 'Gradum Consulting', tagline: 'Asesoría y soporte técnico para equipos que desarrollan sistemas complejos y de rendimiento crítico.', subtitle: 'Asesoría Avanzada en Tecnología e Ingeniería' },
      { name: 'Gradum Construction', tagline: 'Entrega integral en diseño arquitectónico, ingeniería y ejecución física.', subtitle: 'Ingeniería, Arquitectura y Construcción' },
      { name: 'Gradum Services', tagline: 'Servicios de operaciones financieras, contabilidad y ejecución de marca para apoyar el crecimiento escalable.', subtitle: 'Operaciones Empresariales y Servicios de Crecimiento' },
      { name: 'Gradum Accelerator', tagline: 'Trabajamos con empresas en etapa temprana para desarrollar y escalar emprendimientos impulsados por tecnología.', subtitle: 'Desarrollo de Startups y Crecimiento de Ventures' },
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
    innovativeSolutions: {
      label: 'Diseñado para Equipos que Operan a Escala',
      description: 'Operamos en dominios de ingeniería avanzada, marcos técnicos probados y entornos industriales complejos.',
      intro1: 'Gradum trabaja con organizaciones que navegan entornos técnicos y operativos complejos.',
      intro2: 'Trabajamos en múltiples funciones para diseñar, implementar y escalar soluciones que generan resultados medibles.',
      tabs: [
        {
          label: 'Aplicaciones',
          items: ['IA & Aprendizaje Automático', 'IoT & Sistemas Inteligentes', 'Robótica & Automatización', 'Análisis & Visualización de Datos'],
        },
        {
          label: 'Metodologías',
          items: ['Ingeniería de Sistemas', 'Desarrollo Ágil e Iterativo', 'Diseño Basado en Modelos', 'Ingeniería de Procesos Lean'],
        },
        {
          label: 'Industrias',
          items: ['Energía e Infraestructura', 'Tecnología en Salud', 'Defensa & Aeroespacial', 'Manufactura & Cadena de Suministro'],
        },
      ],
    },
    builtForCompanies: {
      heading: 'Asesoría Técnica para Impacto Estratégico y de Ejecución',
      description: 'Operamos en los niveles ejecutivo, de arquitectura y de entrega de programas, ayudando a las organizaciones a tomar decisiones técnicas más sólidas y avanzar en iniciativas complejas con claridad.',
      platformLabel: 'Una Plataforma. Cuatro Capacidades.',
      exploreLink: 'Explorar Cada Plataforma',
    },
    advisoryCards: {
      cta: 'Solicitar una Consultoría Técnica',
      items: [
        { title: 'Asesoría Ejecutiva', desc: 'Estrategia tecnológica, dirección de arquitectura de sistemas y soporte en decisiones técnicas para equipos de liderazgo.' },
        { title: 'Asesoría de Ingeniería', desc: 'Apoyo directo en modelado, simulación, sistemas embebidos, controles y diseño de flujos de trabajo técnicos.' },
        { title: 'Soporte de Ejecución a Nivel de Programa', desc: 'Supervisión de asesoría en iniciativas de ingeniería multidisciplinarias que requieren estructura, priorización y alineación de ejecución.' },
      ],
    },
    precision: {
      heading: 'Diseñado para Entornos de Ingeniería de Alta Complejidad',
      heading1: 'Gradum no está construido para volumen.',
      heading2Prefix: 'Está ',
      heading2Accent: 'diseñado para la precisión.',
      subtitle: 'Donde la Asesoría se Une a la Ejecución',
      description: 'Trabajamos selectivamente con organizaciones donde la calidad de ejecución, la profundidad y el impacto a largo plazo son lo que importa. Del diseño a la entrega, nos enfocamos en lo que realmente mueve la aguja.',
      tags: ['Arquitectura de Sistemas y Dirección Técnica', 'Sistemas Embebidos e Inteligentes', 'Control y Automatización', 'Estrategia e Alineación de Ejecución en Ingeniería'],
    },
    insights: {
      heading: 'Perspectivas Técnicas',
      description: 'Reflexiones sobre estrategia de ingeniería, diseño de sistemas y ejecución técnica en entornos complejos.',
      cards: [
        'Diseño Basado en Modelos en Sistemas de Producción',
        'Diseño para Entornos con Restricciones de Rendimiento',
        'Del Prototipo a la Arquitectura de Sistema Escalable',
      ],
    },
    letsBuild: {
      heading: 'Diseñado para Entornos Complejos',
      description: 'Gradum integra estrategia, ingeniería y ejecución para entregar soluciones que funcionan en entornos del mundo real.',
      techTags: ['Tecnología e Ingeniería', 'Operaciones Empresariales', 'Infraestructura y Construcción', 'Datos e Inteligencia'],
    },
    footerLocations: 'Miami, FL (EE. UU.)\nSanto Domingo (República Dominicana)',
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
      title: 'Asesoría en ingeniería y tecnología para sistemas complejos',
      description: 'Gradum Consulting apoya iniciativas de ingeniería avanzada en sistemas embebidos, arquitecturas de control, automatización inteligente e infraestructura digital, combinando experiencia técnica senior con ejecución disciplinada.',
      cta: 'Explorar capacidades de consultoría',
    },
    whereWeOperate: {
      label: 'Dónde operamos',
      subtitle: 'Operamos en dominios de ingeniería avanzada, marcos técnicos probados y entornos industriales complejos.',
      links: [
        { label: 'Aplicaciones', href: '#' },
        { label: 'Metodologías', href: '#' },
        { label: 'Industrias', href: '#' },
      ],
    },
    advisory: {
      label: 'Modelo de asesoría',
      heading: 'Asesoría técnica para impacto estratégico y operacional',
      intro: 'Operamos en capas ejecutivas, de arquitectura y de entrega de programas — ayudando a las organizaciones a tomar mejores decisiones técnicas y ejecutar iniciativas complejas con mayor precisión.',
      cta: 'Solicitar consultoría técnica',
      items: [
        { title: 'Asesoría ejecutiva', desc: 'Estrategia tecnológica, dirección de arquitectura de sistemas y soporte en decisiones técnicas para equipos de liderazgo.' },
        { title: 'Asesoría de ingeniería', desc: 'Apoyo práctico en modelado, simulación, sistemas embebidos, controles y diseño de flujos de trabajo técnico.' },
        { title: 'Apoyo a la ejecución de programas', desc: 'Supervisión de asesoría en iniciativas de ingeniería multidisciplinaria que requieren estructura, priorización y alineación de ejecución.' },
      ],
    },
    complexity: {
      label: 'Capacidades',
      heading: 'Diseñado para entornos de ingeniería de alta complejidad',
      description: 'Apoyamos a organizaciones que navegan complejidad a nivel de sistema, restricciones de rendimiento, desafíos de integración y largos ciclos de desarrollo.',
      pills: [
        'Arquitectura de sistemas y dirección técnica',
        'Sistemas embebidos e inteligentes',
        'Control y automatización',
        'Estrategia de ingeniería y alineación de ejecución',
      ],
    },
    insights: {
      label: 'Perspectivas técnicas',
      heading: 'Perspectivas sobre estrategia de ingeniería, diseño de sistemas y ejecución técnica.',
      cards: [
        { title: 'Diseño basado en modelos en sistemas de producción', img: '1518770660439-4636190af475' },
        { title: 'Diseñando para entornos con restricciones de rendimiento', img: '1461749280684-dcd6f7cd3663' },
        { title: 'Del prototipo a la arquitectura de sistema escalable', img: '1488590528505-98d2b5aba04b' },
      ],
    },
    cta: {
      label: 'Inicia la conversación',
      heading: 'Asesoría de ingeniería con ejecución en el mundo real',
      description: 'Desde la dirección técnica temprana hasta el apoyo a nivel de programa, Gradum Consulting ayuda a las organizaciones a navegar la complejidad y ejecutar con mayor precisión.',
      cta: 'Solicitar consultoría técnica',
    },
  },
  construction: {
    hero: {
      label: 'Gradum Construction',
      title: 'Ingeniería, Arquitectura y Construcción con Ejecución de Alta Calidad',
      description: 'Gradum Construction ofrece soluciones integrales desde el diseño hasta la ejecución, combinando rigor técnico, precisión estética y una ejecución disciplinada.',
      cta: 'Explorar Servicios de Construcción',
    },
    whatWeDeliver: {
      label: 'Lo Que Ofrecemos',
      subtitle: 'Apoyamos proyectos desde la conceptualización hasta la ejecución final, asegurando alineación entre diseño, viabilidad técnica y calidad constructiva.',
      links: [
        { label: 'Diseño' },
        { label: 'Ingeniería' },
        { label: 'Construcción' },
      ],
    },
    process: {
      label: 'Ejecución Integral',
      heading: 'Estructurado para una Ejecución Integral de Proyectos',
      intro: 'Operamos a través de planificación, desarrollo técnico y ejecución en obra, asegurando que los proyectos avancen con claridad, coordinación y control.',
      cta: 'Solicitar una Consulta',
      items: [
        { title: 'Diseño y Planificación', desc: 'Conceptos arquitectónicos, planificación espacial y dirección de diseño alineados con los objetivos y restricciones del proyecto.' },
        { title: 'Ingeniería y Desarrollo Técnico', desc: 'Planificación estructural, integración de sistemas y validación técnica para asegurar viabilidad y desempeño.' },
        { title: 'Construcción y Ejecución', desc: 'Coordinación en obra, supervisión de construcción y entrega alineada con el diseño y estándares de calidad.' },
      ],
    },
    precision: {
      label: 'Precisión y Disciplina',
      heading: 'Construido con Precisión, Ejecutado con Disciplina',
      description: 'Gradum Construction se enfoca en la calidad de ejecución, integrando diseño, ingeniería y construcción en un proceso único y alineado. Trabajamos en proyectos donde el detalle, la coordinación y la calidad a largo plazo son fundamentales.',
      pills: [
        'Diseño Arquitectónico e Interiores',
        'Ingeniería Estructural y Técnica',
        'Coordinación de Proyectos',
        'Ejecución Enfocada en Calidad',
      ],
    },
    insights: {
      label: 'Perspectivas de Construcción',
      heading: 'Perspectivas sobre diseño, construcción y ejecución de proyectos — desde la conceptualización hasta espacios terminados.',
      cards: [
        { title: 'Diseño de Espacios Funcionales y Modernos', img: '1497366811353-6870744d04b2' },
        { title: 'Balance entre Estética e Integridad Estructural', img: '1541888946425-d81bb19240f5' },
        { title: 'Del Concepto al Entorno Construido', img: '1503387762-592deb58ef4e' },
      ],
    },
    cta: {
      label: 'Construcción con Enfoque en la Ejecución',
      heading: 'Desde el diseño inicial hasta la entrega final, Gradum Construction asegura proyectos ejecutados con claridad, coordinación y atención al detalle.',
      description: 'Desde el concepto arquitectónico hasta la ejecución en obra, cada fase se gestiona con precisión, alineación y compromiso con la calidad a largo plazo.',
      cta: 'Iniciar la Conversación',
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
