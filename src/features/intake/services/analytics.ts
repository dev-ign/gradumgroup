export type IntakeEvent = 'intake_started' | 'question_viewed' | 'question_answered' | 'question_back' | 'intake_saved' | 'intake_resumed' | 'intake_reviewed' | 'intake_submitted' | 'intake_submission_failed' | 'intake_exited';
export interface AnalyticsMetadata { flowVersion: string; questionId?: string; stage?: string; relationship?: 'client' | 'partner'; source: string; locale: string; routingCategory?: string }
export interface IntakeAnalytics { track(event: IntakeEvent, metadata: AnalyticsMetadata): void }
export const noOpAnalytics: IntakeAnalytics = { track() {} };
// Copy only these fields into a future consent-aware analytics adapter. Never
// spread answers, free text, contact data or submission payloads into events.
export function track(analytics: IntakeAnalytics, event: IntakeEvent, metadata: AnalyticsMetadata) {
  const { flowVersion, questionId, stage, relationship, source, locale, routingCategory } = metadata;
  analytics.track(event, { flowVersion, questionId, stage, relationship, source, locale, routingCategory });
}
