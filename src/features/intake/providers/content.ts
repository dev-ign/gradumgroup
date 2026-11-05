import { intakeDefinition } from '../config/definition';
import type { IntakeDefinition, Locale } from '../config/types';
import { assertDefinition } from '../engine/schema';

export interface IntakeContentProvider {
  getPublishedDefinition(locale: Locale): Promise<IntakeDefinition>;
}
export const localIntakeProvider: IntakeContentProvider = {
  async getPublishedDefinition() { assertDefinition(intakeDefinition); return intakeDefinition; },
};
// A future Sanity provider fetches published JSON, normalizes references into
// this same definition, and calls assertDefinition before returning. No SDK,
// credentials or executable CMS rules are required by the engine or UI.
