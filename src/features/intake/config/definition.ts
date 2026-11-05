import { intakeTranslations, type IntakeCopyKey } from '../../../i18n/intake';
import type { Condition, IntakeDefinition, Localized, Option, Question } from './types';

export const copy = (key: IntakeCopyKey): Localized => ({ en: intakeTranslations.en[key], es: intakeTranslations.es[key] });
const eq = (questionId: string, value: string): Condition => ({ questionId, operator: 'equals', value });
const partner = eq('q01_relationship', 'partner');
const category = (value: string): Condition => ({ all: [partner, eq('q02_work_category', value)] });
const option = (value: string, key: IntakeCopyKey, icon?: string): Option => ({ value, label: copy(key), ...(icon ? { icon } : {}) });
const base = (id: string, stage: Question['stage'], title: IntakeCopyKey, review: IntakeCopyKey, visibleWhen?: Condition) => ({ id, stage, title: copy(title), reviewLabel: copy(review), required: true, analyticsId: id, visibleWhen, reviewGroup: stage === 'work' && id !== 'c01_client_need' ? 'work' : id });
const single = (id: string, stage: Question['stage'], title: IntakeCopyKey, review: IntakeCopyKey, options: Option[], visibleWhen?: Condition): Question => ({ ...base(id, stage, title, review, visibleWhen), type: 'single', presentation: 'options', options, autoAdvance: true });
const text = (id: string, title: IntakeCopyKey, when: Condition, long = false): Question => ({ ...base(id, 'work', title, title, when), type: long ? 'long-text' : 'text', maxLength: long ? 1000 : 200 });

export const intakeDefinition: IntakeDefinition = {
  id: 'gradum-intake', version: '1.0.0', terminal: 'review',
  stages: ['about', 'work', 'preferences', 'contact', 'review'].map(id => ({ id: id as Question['stage'], label: copy(id as IntakeCopyKey) })),
  questions: [
    { ...single('q01_relationship', 'about', 'relationship', 'relationshipLabel', [
      { ...option('client', 'client', 'briefcase'), description: copy('clientDescription'), mobileDescription: copy('clientMobileDescription') },
      { ...option('partner', 'partner', 'people'), description: copy('partnerDescription'), mobileDescription: copy('partnerMobileDescription') },
    ]), presentation: 'cards', description: copy('relationshipSupport'), mobileDescription: copy('relationshipMobileSupport') } as Question,
    single('c01_client_need', 'work', 'clientNeed', 'clientNeedLabel', [option('consulting', 'consulting'), option('construction', 'construction'), option('services', 'services'), option('not_sure_yet', 'unsure')], eq('q01_relationship', 'client')),
    { ...single('q02_work_category', 'work', 'category', 'workLabel', [option('architecture', 'architecture', 'architecture'), option('engineering', 'engineering', 'engineering'), option('construction', 'construction', 'construction'), option('project_management', 'projectManagement', 'project-management'), option('business_services', 'businessServices', 'business-services'), option('other', 'otherWork', 'other')], partner), description: copy('categorySupport') },
    { ...single('q03_engineering_specialty', 'work', 'specialty', 'specialtyLabel', [option('structural', 'structural'), option('civil', 'civil'), option('mechanical', 'mechanical'), option('electrical', 'electrical'), option('industrial', 'industrial'), option('environmental', 'environmental'), option('other', 'otherSpecialty')], category('engineering')), description: copy('specialtySupport'), contextFrom: 'q02_work_category' },
    { ...text('q03_engineering_specialty_other_text', 'specialtyDetail', { all: [category('engineering'), eq('q03_engineering_specialty', 'other')] }), inlineAfter: 'q03_engineering_specialty', hint: copy('detailHint') },
    { ...text('q03_architecture_focus', 'architectureFocus', category('architecture')), contextFrom: 'q02_work_category' },
    { ...text('q03_construction_trade', 'trade', category('construction')), contextFrom: 'q02_work_category' },
    text('q03_construction_crew_size', 'crew', category('construction')),
    { ...text('q03_pm_scope', 'pmScope', category('project_management'), true), description: copy('pmSupport'), contextFrom: 'q02_work_category' },
    { ...text('q03_services_area', 'servicesArea', category('business_services')), contextFrom: 'q02_work_category' },
    text('q03_other_description', 'otherDescription', category('other'), true),
    { ...single('q04_experience_years', 'work', 'experience', 'experienceLabel', [option('less_than_2', 'lessTwo'), option('2_5', 'twoFive'), option('6_10', 'sixTen'), option('more_than_10', 'moreTen')], partner), description: copy('experienceSupport'), interpolate: { specialty: { questionId: 'q03_engineering_specialty', format: 'practice' } } },
    { ...base('q05_coverage', 'preferences', 'coverage', 'coverageLabel', partner), type: 'multi', min: 1, description: copy('multiSupport'), hint: copy('coverageHint'), options: [option('santo_domingo', 'santoDomingo'), option('north', 'north'), option('east', 'east'), option('south', 'south'), option('nationwide', 'nationwide'), option('outside_dr', 'outside')], selectAll: { value: 'nationwide', members: ['santo_domingo', 'north', 'east', 'south'] } },
    { ...base('q06_project_interests', 'preferences', 'interests', 'interestsLabel', partner), type: 'multi', min: 1, description: copy('interestsSupport'), options: [option('residential', 'residential'), option('commercial', 'commercial'), option('industrial', 'industrial'), option('infrastructure', 'infrastructure'), option('renovation', 'renovation'), option('technical_consulting', 'technical'), option('project_supervision', 'supervision'), option('other', 'other')] },
    { ...base('q06a_other_detail', 'preferences', 'otherProjects', 'otherProjects', { all: [partner, { questionId: 'q06_project_interests', operator: 'includes', value: 'other' }] }), type: 'text', maxLength: 500, required: false, inlineAfter: 'q06_project_interests', reviewGroup: 'q06_project_interests' },
    single('q07_availability', 'preferences', 'availability', 'availabilityLabel', [option('now', 'now'), option('within_30_days', 'thirtyDays'), option('specific_projects', 'specific'), option('not_now', 'later')], partner),
    { ...base('q08_contact', 'contact', 'contactTitle', 'contact'), type: 'contact', description: copy('contactSupport'), fields: [
      { id: 'name', label: copy('name'), type: 'text', autocomplete: 'name', required: true, maxLength: 160 },
      { id: 'email', label: copy('email'), type: 'email', autocomplete: 'email', required: true, maxLength: 254 },
      { id: 'phone', label: copy('phone'), type: 'tel', autocomplete: 'tel', required: true, maxLength: 60, hint: copy('phoneHint') },
    ] },
  ],
  destinations: ['mock:consulting', 'mock:construction', 'mock:services', 'mock:partnerships', 'mock:general'],
  routing: [
    ...['consulting', 'construction', 'services'].map((value): IntakeDefinition['routing'][number] => ({ id: `client_${value}`, priority: 100, when: { all: [eq('q01_relationship', 'client'), eq('c01_client_need', value)] }, destination: `mock:${value}`, category: `${value}_inquiry` })),
    ...['engineering', 'architecture', 'construction', 'project_management', 'business_services', 'other'].map((value): IntakeDefinition['routing'][number] => ({ id: `partner_${value}`, priority: 90, when: category(value), destination: value === 'construction' ? 'mock:construction' : 'mock:partnerships', category: value === 'construction' ? 'construction_subcontractor' : `${value}_partnership` })),
  ],
  fallback: { destination: 'mock:general', category: 'general_inquiry' },
};
