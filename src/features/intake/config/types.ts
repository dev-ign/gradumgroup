export type Locale = 'en' | 'es';
export type Localized = Record<Locale, string>;
export type Answer = string | string[] | Record<string, string>;
export type Answers = Record<string, Answer>;
export type Condition =
  | { all: Condition[] } | { any: Condition[] } | { not: Condition }
  | { questionId: string; operator: 'equals' | 'notEquals' | 'includes' | 'includesAny' | 'includesAll' | 'exists'; value?: string | string[] };
export type StageId = 'about' | 'work' | 'preferences' | 'contact' | 'review';
export interface Option { value: string; label: Localized; description?: Localized; mobileDescription?: Localized; icon?: string }
export interface Field { id: string; label: Localized; type: 'text' | 'email' | 'tel'; autocomplete?: string; hint?: Localized; required: boolean; maxLength: number }
interface BaseQuestion {
  id: string; stage: StageId; title: Localized; description?: Localized; mobileDescription?: Localized;
  required: boolean; visibleWhen?: Condition; reviewLabel: Localized; analyticsId: string;
  contextFrom?: string; interpolate?: Record<string, { questionId: string; format?: 'practice' }>;
  inlineAfter?: string; hint?: Localized;
  reviewGroup?: string;
}
export type Question = BaseQuestion & (
  | { type: 'single'; presentation: 'cards' | 'options'; options: Option[]; autoAdvance: boolean }
  | { type: 'multi'; options: Option[]; min: number; selectAll?: { value: string; members: string[] } }
  | { type: 'text' | 'long-text' | 'email' | 'tel'; maxLength: number }
  | { type: 'contact'; fields: Field[] }
);
export interface RoutingRule { id: string; priority: number; when: Condition; destination: string; category: string }
export interface IntakeDefinition {
  id: string; version: string; stages: { id: StageId; label: Localized }[];
  questions: Question[]; routing: RoutingRule[]; destinations: string[];
  fallback: { destination: string; category: string }; terminal: 'review';
}
export const sources = ['homepage', 'consulting', 'construction', 'services', 'footer', 'navigation', 'about', 'direct'] as const;
export type Source = typeof sources[number];
export interface FlowState {
  current: string; answers: Answers; visited: string[]; seen: string[]; editing: boolean;
  source: Source; locale: Locale; consent: boolean; revisiting: boolean;
}
