import type { Language } from '../context/LanguageContext';
import { constructionExecutionPath } from './navigation';

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
  variant?: 'accounting' | 'creative' | 'legal';
  eyebrow: LocalizedText;
  category?: LocalizedText;
  parentHref?: string;
  title: LocalizedText;
  description: LocalizedText;
  heroCta?: LocalizedText;
  image?: string;
  imageAlt?: LocalizedText;
  layout: 'wide' | 'split' | 'list' | 'cards';
  heroLayout?: 'split';
  items: FeatureItem[];
  expertiseEyebrow?: LocalizedText;
  expertiseTitle?: LocalizedText;
  statement?: LocalizedText;
  statementEyebrow?: LocalizedText;
  approachBody?: LocalizedText[];
  statementImage?: string;
  statementLayout?: 'split';
  finalCtaTitle?: LocalizedText;
  finalCtaDescription?: LocalizedText;
  cta: LocalizedText;
}

export interface LandingCard extends FeatureItem {
  href: string;
  subtitle?: LocalizedText;
  cta?: LocalizedText;
}

export interface ConstructionLandingSections {
  introduction: {
    title: LocalizedText;
    paragraphs: LocalizedText[];
  };
  process: {
    title: LocalizedText;
    introduction: LocalizedText;
    steps: { code: string; title: LocalizedText; description: LocalizedText }[];
  };
  audiences: {
    title: LocalizedText;
    groups: { title: LocalizedText; description: LocalizedText }[];
  };
}

export interface PlatformLandingContent {
  family: ThemeFamily;
  eyebrow?: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  primaryCta: LocalizedText;
  secondaryCta?: LocalizedText;
  secondaryHref?: string;
  heroImages: string[];
  heroImageAlts: LocalizedText[];
  cards: LandingCard[];
  expertiseEyebrow?: LocalizedText;
  expertiseTitle?: LocalizedText;
  statement?: LocalizedText;
  statementBody?: LocalizedText;
  statementEyebrow?: LocalizedText;
  statementBodyExtra?: LocalizedText;
  finalCtaTitle?: LocalizedText;
  finalCtaDescription?: LocalizedText;
  statementTitle?: LocalizedText;
  toolsTitle?: LocalizedText;
  toolsBody?: LocalizedText;
  toolsCta?: LocalizedText;
  toolsHref?: string;
  tools?: LocalizedText[];
  constructionSections?: ConstructionLandingSections;
}

export const platformLandings: Record<'consulting' | 'construction' | 'services', PlatformLandingContent> = {
  consulting: {
    family: 'consulting',
    title: text('Engineering Solutions for Complex Systems.', 'Soluciones de ingeniería para sistemas complejos.'),
    description: text(
      'We apply engineering, modeling, simulation, data, and software to help organizations address technical challenges.',
      'Aplicamos ingeniería, modelado, simulación, datos y software para ayudar a las organizaciones a afrontar desafíos técnicos.',
    ),
    primaryCta: text('Discuss Your Project', 'Conversemos sobre su proyecto'),
    secondaryCta: text('Explore Capabilities', 'Explorar capacidades'),
    secondaryHref: '/consulting/capabilities',
    heroImages: ['/assets/figma/Tech/magnific_recrea-esta-imagen-mejora_SyAMSTJUb8.jpeg', '/assets/figma/Tech/forecast-expert-ceo-analyzing-investment-insights-negotiations-details.jpg', '/assets/figma/Tech/cheerful-young-businessman-using-digital-tablet-smiling-while-his-colleagues-working-background.jpg'],
    heroImageAlts: [text('Developer working on technical software', 'Desarrollador trabajando en software técnico'), text('Specialist reviewing data on a laptop', 'Especialista revisando datos en una computadora'), text('Technology professional with a tablet in the office', 'Profesional de tecnología con una tableta en la oficina')],
    cards: [
      {
        title: text('Capabilities', 'Capacidades'),
        description: text('Engineering analysis, modeling, simulation, and technical software.', 'Análisis de ingeniería, modelado, simulación y software técnico.'),
        cta: text('Explore Capabilities →', 'Explorar capacidades →'),
        image: '/assets/figma/Tech/woman-analyzing-data-flowchart-computer-office.jpg',
        href: '/consulting/capabilities',
      },
      {
        title: text('Industries', 'Industrias'),
        description: text('Engineering expertise applied across industrial and technology-driven environments.', 'Experiencia en ingeniería aplicada a entornos industriales e impulsados por la tecnología.'),
        cta: text('Explore Industries →', 'Explorar industrias →'),
        image: '/assets/figma/Construccio\u0301n/architect-engineer-pointing-architectural-building-prototype-analyzing-construction-model-computer-businessman-designer-working-remote-from-home-real-estate-project-modeling-sketch.jpg',
        href: '/consulting/industries',
      },
      {
        title: text('How We Work', 'Cómo trabajamos'),
        description: text('A structured approach from technical assessment to implementation support.', 'Un enfoque estructurado desde la evaluación técnica hasta el apoyo en la implementación.'),
        cta: text('Explore Our Approach →', 'Explorar nuestro enfoque →'),
        image: '/assets/figma/Personas/middle-aged-hispanic-business-people (6).jpg',
        href: '/consulting/how-we-work',
      },
    ],
    statement: text('From Technical Complexity to Practical Solutions.', 'De la complejidad técnica a soluciones prácticas.'),
    statementBody: text('We work with engineering and leadership teams to assess requirements, evaluate alternatives, and develop solutions suited to real operating environments.', 'Trabajamos con equipos de ingeniería y dirección para evaluar requisitos, analizar alternativas y desarrollar soluciones adaptadas a entornos operativos reales.'),
    toolsTitle: text('Engineering Tools. Applied with Purpose.', 'Herramientas de ingeniería. Aplicadas con propósito.'),
    toolsBody: text('Our technical work can incorporate MATLAB & Simulink, Python, C/C++, data technologies, and embedded systems—selected according to project requirements.', 'Nuestro trabajo técnico puede incorporar MATLAB & Simulink, Python, C/C++, tecnologías de datos y sistemas embebidos, seleccionados según los requisitos del proyecto.'),
    toolsCta: text('Explore Capabilities →', 'Explorar capacidades →'),
    toolsHref: '/consulting/capabilities',
    tools: [text('MATLAB & Simulink', 'MATLAB & Simulink'), text('Python', 'Python'), text('C/C++', 'C/C++'), text('Data Technologies', 'Tecnologías de datos'), text('Embedded Systems', 'Sistemas embebidos')],
    finalCtaTitle: text("Let's Solve Your Next Technical Challenge.", 'Resolvamos su próximo desafío técnico.'),
    finalCtaDescription: text("Tell us about your project. We'll explore how Gradum Consulting can support your team.", 'Cuéntenos sobre su proyecto. Exploraremos cómo Gradum Consulting puede apoyar a su equipo.'),
  },
  construction: {
    family: 'construction',
    eyebrow: text('Gradum Construction', 'Gradum Construcción'),
    title: text('From Concept to Construction.', 'Del concepto a la construcción.'),
    description: text('Architecture, engineering, and construction execution for residential, commercial, and development projects.', 'Arquitectura, ingeniería y ejecución de obras para proyectos residenciales, comerciales y de desarrollo.'),
    primaryCta: text('Discuss Your Project', 'Conversemos sobre su proyecto'),
    heroImages: ['/assets/figma/Construccio\u0301n/woman-studying-draft-construction-site.jpg'],
    heroImageAlts: [text('Architect reviewing plans at a construction site', 'Arquitecta revisando planos en una obra')],
    expertiseTitle: text('Three Disciplines. One Commitment to Delivery.', 'Tres disciplinas. Un compromiso con la entrega.'),
    cards: [
      { code: '01', title: text('Architecture', 'Arquitectura'), subtitle: text('Design & Documentation', 'Diseño y documentación'), description: text('Architectural design, 3D visualization, construction drawings, and technical documentation that help translate project requirements into buildable plans.', 'Diseño arquitectónico, visualización 3D, planos de construcción y documentación técnica que ayudan a traducir los requisitos del proyecto en planes construibles.'), cta: text('Explore Architecture →', 'Explorar Arquitectura →'), image: '/assets/figma/Construccio\u0301n/detailed-view-interior-inspection-process-home.jpg', href: '/construction/architecture' },
      { code: '02', title: text('Engineering', 'Ingeniería'), subtitle: text('Technical & Cost Engineering', 'Ingeniería técnica y de costos'), description: text('Structural and building systems engineering, construction budgets, quantity takeoffs, and technical coordination to support informed project decisions.', 'Ingeniería estructural y de sistemas de edificación, presupuestos de construcción, cómputos de cantidades y coordinación técnica para apoyar decisiones informadas sobre el proyecto.'), cta: text('Explore Engineering →', 'Explorar Ingeniería →'), image: '/assets/figma/Construccio\u0301n/employee-working-project-side-view.jpg', href: '/construction/engineering' },
      { code: '03', title: text('Execution', 'Ejecución'), subtitle: text('Construction & Project Delivery', 'Construcción y entrega de proyectos'), description: text('Construction execution, site supervision, and project coordination to turn approved plans into completed work.', 'Ejecución de obras, supervisión en obra y coordinación de proyectos para convertir los planes aprobados en trabajos terminados.'), cta: text('Explore Execution →', 'Explorar Ejecución →'), image: '/assets/figma/Construccio\u0301n/close-up-construction-worker-construction-site.jpg', href: constructionExecutionPath },
    ],
    constructionSections: {
      introduction: {
        title: text('Integrated Expertise. Flexible Engagements.', 'Experiencia integrada. Participación flexible.'),
        paragraphs: [
          text('We bring together architectural design, technical engineering, and construction execution to support projects from early planning through completion.', 'Integramos diseño arquitectónico, ingeniería técnica y ejecución de obras para apoyar proyectos desde la planificación inicial hasta su finalización.'),
          text("Whether you need a specific deliverable or a team to carry out a broader scope, we tailor our involvement to your project's requirements.", 'Ya sea que necesite un entregable específico o un equipo para llevar a cabo un alcance más amplio, adaptamos nuestra participación a los requisitos de su proyecto.'),
        ],
      },
      process: {
        title: text('One Project. The Right Expertise.', 'Un proyecto. La experiencia adecuada.'),
        introduction: text('Every project has different requirements. Our involvement can begin with a single technical assignment or extend across design, engineering, and construction execution.', 'Cada proyecto tiene requisitos diferentes. Nuestra participación puede comenzar con una tarea técnica específica o extenderse al diseño, la ingeniería y la ejecución de obras.'),
        steps: [
          { code: '01', title: text('Define the Scope', 'Definir el alcance'), description: text("Understand the project's objectives, technical requirements, deliverables, and constraints.", 'Comprender los objetivos, requisitos técnicos, entregables y limitaciones del proyecto.') },
          { code: '02', title: text('Develop the Solution', 'Desarrollar la solución'), description: text('Prepare the architectural, engineering, or construction plan appropriate to the engagement.', 'Preparar el plan arquitectónico, de ingeniería o de construcción apropiado para el encargo.') },
          { code: '03', title: text('Execute & Coordinate', 'Ejecutar y coordinar'), description: text('Deliver the agreed scope with technical oversight, communication, and attention to project requirements.', 'Entregar el alcance acordado con supervisión técnica, comunicación y atención a los requisitos del proyecto.') },
        ],
      },
      audiences: {
        title: text('Built Around Your Project Needs.', 'Adaptado a las necesidades de su proyecto.'),
        groups: [
          { title: text('Developers & Property Owners', 'Desarrolladores y propietarios'), description: text('Architectural, engineering, and construction services for new developments, renovations, and property improvements.', 'Servicios de arquitectura, ingeniería y construcción para nuevos desarrollos, renovaciones y mejoras de propiedades.') },
          { title: text('Contractors & Construction Firms', 'Contratistas y empresas constructoras'), description: text('Technical support, estimates, quantity takeoffs, drawings, and specialized project services that complement existing teams.', 'Apoyo técnico, presupuestos, cómputos de cantidades, planos y servicios especializados para proyectos que complementan a los equipos existentes.') },
          { title: text('Architects & Engineering Firms', 'Arquitectos y firmas de ingeniería'), description: text('Additional technical capacity for design documentation, engineering coordination, and project execution support.', 'Capacidad técnica adicional para documentación de diseño, coordinación de ingeniería y apoyo en la ejecución de proyectos.') },
        ],
      },
    },
    finalCtaTitle: text('Have a Project in Mind?', '¿Tiene un proyecto en mente?'),
    finalCtaDescription: text("From a technical deliverable to a complete construction scope, let's discuss what your project requires.", 'Desde un entregable técnico hasta un alcance completo de construcción, conversemos sobre lo que requiere su proyecto.'),
  },
  services: {
    family: 'services',
    eyebrow: text('Gradum Services', 'Gradum Servicios'),
    title: text('The Expertise Behind Stronger Businesses.', 'La experiencia detrás de empresas más sólidas.'),
    description: text('Financial, creative, and legal expertise to help businesses operate with confidence, build their brands, and make informed decisions.', 'Experiencia financiera, creativa y legal para ayudar a las empresas a operar con confianza, desarrollar sus marcas y tomar decisiones informadas.'),
    primaryCta: text('Discuss Your Business Needs', 'Conversemos sobre las necesidades de su empresa'),
    secondaryCta: text('Explore Our Services', 'Explore nuestros servicios'),
    heroImages: ['/assets/figma/Finanzas/middle-aged-hispanic-business-people (2).jpg', '/assets/figma/Creatividad/medium-shot-business-woman-with-post-its.jpg'],
    heroImageAlts: [text('Business advisor reviewing information with a colleague', 'Asesora empresarial revisando información con un colega'), text('Creative professional organizing ideas on a glass wall', 'Profesional creativa organizando ideas en un muro de vidrio')],
    expertiseTitle: text('Specialized Services. Built Around Your Business.', 'Servicios especializados. Diseñados para su empresa.'),
    cards: [
      { title: text('Accounting & Finance', 'Contabilidad y Finanzas'), subtitle: text('Financial Operations & Fractional CFO', 'Operaciones financieras y dirección financiera fraccional'), description: text('Accounting, tax compliance, financial reporting, and strategic financial oversight to help businesses maintain control and make informed financial decisions.', 'Contabilidad, cumplimiento tributario, informes financieros y supervisión financiera estratégica para ayudar a las empresas a mantener el control y tomar decisiones financieras informadas.'), cta: text('Explore Accounting & Finance →', 'Explorar Contabilidad y Finanzas →'), image: '/assets/figma/Finanzas/man-is-writing-calculator-pen-paper.jpg', href: '/services/accounting-finance' },
      { title: text('Creative & Media', 'Creatividad y Medios'), subtitle: text('Creative Direction & Digital Production', 'Dirección creativa y producción digital'), description: text('Graphic design, website design, audiovisual production, and creative direction to develop brands and deliver effective visual and digital experiences.', 'Diseño gráfico, diseño de sitios web, producción audiovisual y dirección creativa para desarrollar marcas y ofrecer experiencias visuales y digitales eficaces.'), cta: text('Explore Creative & Media →', 'Explorar Creatividad y Medios →'), image: '/assets/figma/Creatividad/medium-shot-people-working-with-laptop.jpg', href: '/services/marketing-media' },
      { title: text('Legal & Corporate', 'Legal y Corporativo'), subtitle: text('Business Legal Advisory', 'Asesoría legal empresarial'), description: text('Business legal counsel, contract drafting and review, corporate documentation, and ongoing legal advisory services delivered by qualified professionals.', 'Asesoría legal empresarial, redacción y revisión de contratos, documentación corporativa y servicios continuos de asesoría legal prestados por profesionales calificados.'), cta: text('Explore Legal & Corporate →', 'Explorar Legal y Corporativo →'), image: '/assets/figma/Personas/business-people-conference-room.jpg', href: '/services/admin-legal' },
    ],
    statement: text('The Right Expertise. At the Right Time.', 'La experiencia adecuada. En el momento adecuado.'),
    statementBody: text('Access specialized professional capabilities without building every function in-house.', 'Acceda a capacidades profesionales especializadas sin desarrollar cada función internamente.'),
    statementBodyExtra: text('From individual projects to ongoing advisory and fractional leadership, our engagements are tailored to your business needs.', 'Desde proyectos individuales hasta asesoría continua y liderazgo fraccional, adaptamos nuestros servicios a las necesidades de su empresa.'),
    finalCtaTitle: text("Let's Move Your Business Forward.", 'Impulsemos su empresa hacia adelante.'),
    finalCtaDescription: text("Tell us what your business needs. We'll help identify the right expertise and define the next steps.", 'Cuéntenos qué necesita su empresa. Le ayudaremos a identificar la experiencia adecuada y definir los próximos pasos.'),
  },
};

export const detailPages: Record<string, DetailPageContent> = {
  'services-accounting': {
    family: 'services', variant: 'accounting', eyebrow: text('Gradum Services', 'Gradum Servicios'), category: text('Accounting & Finance', 'Contabilidad y Finanzas'), title: text('Financial Clarity. Stronger Decisions.', 'Claridad financiera. Decisiones más sólidas.'), description: text('Accounting, tax compliance, financial reporting, and advisory services to help businesses maintain control, meet their obligations, and plan with confidence.', 'Servicios de contabilidad, cumplimiento tributario, informes financieros y asesoría para ayudar a las empresas a mantener el control, cumplir sus obligaciones y planificar con confianza.'), heroCta: text('Discuss Your Financial Needs', 'Conversemos sobre sus necesidades financieras'), image: '/assets/figma/Finanzas/medium-shot-woman-working-as-economist.jpg', imageAlt: text('Financial professional reviewing figures at her desk', 'Profesional financiera revisando cifras en su escritorio'), layout: 'split',
    expertiseTitle: text('Financial Support at Every Stage.', 'Apoyo financiero en cada etapa.'),
    items: [
      { title: text('Accounting & Bookkeeping', 'Contabilidad y teneduría de libros'), description: text('Monthly accounting, bank reconciliations, transaction recording, and financial recordkeeping.', 'Contabilidad mensual, conciliaciones bancarias, registro de transacciones y mantenimiento de registros financieros.') },
      { title: text('Tax & Regulatory Compliance', 'Cumplimiento tributario y regulatorio'), description: text('DGII tax filings, regulatory reporting, and ongoing support with applicable tax obligations.', 'Declaraciones tributarias ante la DGII, informes regulatorios y apoyo continuo con las obligaciones tributarias aplicables.') },
      { title: text('Financial Reporting', 'Informes financieros'), description: text('Financial statements, management reports, and performance analysis to provide a clearer view of your business.', 'Estados financieros, informes de gestión y análisis del desempeño para ofrecer una visión más clara de su empresa.') },
      { title: text('Payroll & TSS Administration', 'Nómina y administración de la TSS'), description: text('Payroll processing, TSS reporting, and administration of related employment obligations.', 'Procesamiento de nómina, reportes ante la TSS y administración de las obligaciones laborales relacionadas.') },
      { title: text('Budgeting & Cash Flow Planning', 'Presupuestos y planificación de flujo de caja'), description: text('Budget preparation, cash-flow forecasts, and financial planning to support business decisions.', 'Preparación de presupuestos, proyecciones de flujo de caja y planificación financiera para respaldar decisiones empresariales.') },
      { title: text('Fractional CFO & Financial Advisory', 'Dirección financiera fraccional y asesoría financiera'), description: text('Senior-level financial oversight, strategic planning, and ongoing advisory without the need for a full-time CFO.', 'Supervisión financiera de alto nivel, planificación estratégica y asesoría continua sin necesidad de un director financiero a tiempo completo.') },
    ], statement: text('Beyond Compliance. Toward Financial Clarity.', 'Más allá del cumplimiento. Hacia la claridad financiera.'), approachBody: [
      text('Reliable accounting is the foundation of sound financial management.', 'Una contabilidad confiable es la base de una gestión financiera sólida.'),
      text('We combine organized records, regulatory compliance, and practical financial insight to help businesses understand their financial position and make informed decisions.', 'Combinamos registros organizados, cumplimiento regulatorio y conocimientos financieros prácticos para ayudar a las empresas a comprender su situación financiera y tomar decisiones informadas.'),
      text('From monthly accounting to fractional CFO engagements, our services are structured around your needs.', 'Desde la contabilidad mensual hasta los servicios de dirección financiera fraccional, estructuramos nuestros servicios según sus necesidades.'),
    ], statementImage: '/assets/figma/Finanzas/side-view-woman-working-as-economist.jpg', finalCtaTitle: text("Let's Strengthen Your Financial Operations.", 'Fortalezcamos sus operaciones financieras.'), finalCtaDescription: text("Whether you need ongoing accounting support or strategic financial guidance, let's discuss the right approach for your business.", 'Ya sea que necesite apoyo contable continuo u orientación financiera estratégica, conversemos sobre el enfoque adecuado para su empresa.'), cta: text('Discuss Your Financial Needs', 'Conversemos sobre sus necesidades financieras'),
  },
  'services-marketing': {
    family: 'services', variant: 'creative', eyebrow: text('Gradum Services', 'Gradum Servicios'), category: text('Creative & Media', 'Creatividad y Medios'), title: text('Design. Digital. Production.', 'Diseño. Digital. Producción.'), description: text('Graphic design, website development, audiovisual production, and creative direction for businesses that value thoughtful design and technical execution.', 'Diseño gráfico, desarrollo de sitios web, producción audiovisual y dirección creativa para empresas que valoran el diseño cuidadoso y la ejecución técnica.'), heroCta: text('Discuss Your Creative Project', 'Conversemos sobre su proyecto creativo'), image: '/assets/figma/Creatividad/medium-shot-smiley-business-woman-with-post-its.jpg', imageAlt: text('Creative strategist arranging ideas on a glass wall', 'Estratega creativa organizando ideas en un muro de vidrio'), layout: 'cards',
    expertiseTitle: text('Creative Capabilities. Practical Results.', 'Capacidades creativas. Resultados prácticos.'),
    items: [
      { title: text('Brand Identity & Graphic Design', 'Identidad de marca y diseño gráfico'), description: text('Visual identities, brand guidelines, corporate materials, presentations, and graphic design assets.', 'Identidades visuales, guías de marca, materiales corporativos, presentaciones y recursos de diseño gráfico.'), image: '/assets/figma/Creatividad/medium-shot-happy-business-people.jpg' },
      { title: text('Web Design & Development', 'Diseño y desarrollo web'), description: text('Corporate websites, landing pages, responsive interfaces, and website implementation.', 'Sitios web corporativos, páginas de destino, interfaces adaptables e implementación de sitios web.'), image: '/assets/figma/Creatividad/medium-shot-people-working-with-laptop.jpg' },
      { title: text('Audiovisual Production', 'Producción audiovisual'), description: text('Video production, editing, motion graphics, and audio production for corporate and commercial applications.', 'Producción de video, edición, gráficos animados y producción de audio para aplicaciones corporativas y comerciales.'), image: '/assets/figma/Creatividad/medium-shot-people-meeting.jpg' },
      { title: text('Digital Experiences & Interactive Design', 'Experiencias digitales y diseño interactivo'), description: text('User interface design, interactive content, and digital presentations tailored to specific business needs.', 'Diseño de interfaces de usuario, contenido interactivo y presentaciones digitales adaptadas a necesidades empresariales específicas.'), image: '/assets/figma/Tech/woman-analyzing-data-flowchart-computer-office.jpg' },
      { title: text('Creative Direction & Brand Management', 'Dirección creativa y gestión de marca'), description: text('Ongoing creative leadership, brand consistency, visual direction, and coordination of creative projects.', 'Liderazgo creativo continuo, coherencia de marca, dirección visual y coordinación de proyectos creativos.'), image: '/assets/figma/Creatividad/medium-shot-business-woman-with-post-its.jpg' },
    ], statement: text('Creative Expertise. On Your Terms.', 'Experiencia creativa. En sus términos.'), approachBody: [
      text('From a website or brand identity to ongoing creative leadership, we provide the design and production capabilities your business needs.', 'Desde un sitio web o una identidad de marca hasta un liderazgo creativo continuo, ofrecemos las capacidades de diseño y producción que su empresa necesita.'),
      text('Engage Gradum for a defined project or as your ongoing creative partner.', 'Contrate a Gradum para un proyecto definido o como su socio creativo permanente.'),
    ], statementImage: '/assets/figma/Personas/authentic-small-youthful-marketing-agency (3).jpg', statementLayout: 'split', finalCtaTitle: text("Let's Create Something Meaningful.", 'Creemos algo significativo.'), finalCtaDescription: text('Tell us about your next design, digital, or production project.', 'Cuéntenos sobre su próximo proyecto de diseño, digital o producción.'), cta: text('Discuss Your Creative Project', 'Conversemos sobre su proyecto creativo'),
  },
  'services-admin': {
    family: 'services', variant: 'legal', eyebrow: text('Gradum Services', 'Gradum Servicios'), category: text('Legal & Corporate', 'Legal y Corporativo'), title: text('Legal Clarity. Business Confidence.', 'Claridad legal. Confianza empresarial.'), description: text('Business legal advisory, commercial contracts, and corporate counsel to help companies navigate legal obligations and make informed decisions.', 'Asesoría legal empresarial, contratos comerciales y asesoría corporativa para ayudar a las empresas a gestionar sus obligaciones legales y tomar decisiones informadas.'), heroCta: text('Discuss Your Legal Needs', 'Conversemos sobre sus necesidades legales'), image: '/assets/figma/Personas/business-people-conference-room-medium-shot.jpg', imageAlt: text('Business professional holding a folder in a shared office', 'Profesional con una carpeta en una oficina compartida'), layout: 'wide', heroLayout: 'split',
    expertiseTitle: text('Legal Support for Business Decisions.', 'Apoyo legal para decisiones empresariales.'),
    items: [
      { title: text('Corporate Formation & Structuring', 'Constitución y estructuración corporativa'), description: text('Company incorporation, corporate structuring, and legal documentation for business entities.', 'Constitución de sociedades, estructuración corporativa y documentación legal para entidades empresariales.') },
      { title: text('Commercial Contracts & Agreements', 'Contratos y acuerdos comerciales'), description: text('Drafting, review, and negotiation of commercial contracts and business agreements.', 'Redacción, revisión y negociación de contratos comerciales y acuerdos empresariales.') },
      { title: text('Corporate Governance & Compliance', 'Gobierno corporativo y cumplimiento'), description: text('Corporate records, governance requirements, and guidance on applicable legal obligations.', 'Registros corporativos, requisitos de gobierno y orientación sobre las obligaciones legales aplicables.') },
      { title: text('Business Transactions & Due Diligence', 'Transacciones empresariales y debida diligencia'), description: text('Legal review and advisory support for commercial transactions and business opportunities.', 'Revisión legal y apoyo de asesoría para transacciones comerciales y oportunidades empresariales.') },
      { title: text('Ongoing Corporate Legal Counsel', 'Asesoría legal corporativa continua'), description: text('Continuing legal advice for business operations, commercial decisions, and corporate matters.', 'Asesoría legal continua para operaciones empresariales, decisiones comerciales y asuntos corporativos.') },
    ], statement: text('Legal Expertise. When Your Business Needs It.', 'Experiencia legal. Cuando su empresa la necesita.'), approachBody: [
      text("From individual agreements and corporate matters to ongoing legal counsel, we provide business-focused legal support tailored to your company's requirements.", 'Desde acuerdos individuales y asuntos corporativos hasta asesoría legal continua, ofrecemos apoyo legal empresarial adaptado a las necesidades de su empresa.'),
      text('Our approach emphasizes practical advice, clear communication, and informed commercial decisions.', 'Nuestro enfoque prioriza la asesoría práctica, la comunicación clara y las decisiones comerciales informadas.'),
    ], statementImage: '/assets/figma/Personas/middle-aged-hispanic-business-people.jpg', statementLayout: 'split', finalCtaTitle: text("Let's Discuss Your Business's Legal Needs.", 'Conversemos sobre las necesidades legales de su empresa.'), finalCtaDescription: text("Whether you need help with a commercial agreement, corporate requirements, or ongoing legal counsel, let's define the appropriate next steps.", 'Ya sea que necesite ayuda con un acuerdo comercial, requisitos corporativos o asesoría legal continua, definamos los próximos pasos adecuados.'), cta: text('Discuss Your Legal Needs', 'Conversemos sobre sus necesidades legales'),
  },
};

export const homeContent = {
  imagery: {
    consulting: '/assets/figma/Tech/colleagues-collaborating-laptop-office.jpg',
    construction: '/assets/figma/Construccio\u0301n/portrait-architect-engineer-with-experience-multistory-building-construction.jpg',
    services: '/assets/figma/Finanzas/side-view-cropped-unrecognizable-business-people-working-common-desk.jpg',
    cta: '/assets/figma/Personas/middle-aged-hispanic-business-people (3).jpg',
    ctaAlt: text('Colleagues collaborating on a project in the office', 'Colegas colaborando en un proyecto en la oficina'),
    networkMapAlt: text('Map of the Americas with the Dominican Republic highlighted.', 'Mapa de las Américas con la República Dominicana destacada.'),
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
