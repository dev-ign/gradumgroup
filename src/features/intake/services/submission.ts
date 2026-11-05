import type { Submission } from '../engine/engine';

export interface IntakeSubmissionAdapter {
  submit(payload: Submission, options: { signal: AbortSignal; idempotencyKey: string }): Promise<{ id: string; mode: 'mock' | 'live' }>;
}
/** Explicit, network-free prototype transport. Failure injection is for QA. */
export function createMockSubmission({ failures = 0, delay = 850 } = {}): IntakeSubmissionAdapter {
  const completed = new Map<string, { id: string; mode: 'mock' }>();
  return { async submit(_payload, { signal, idempotencyKey }) {
    if (completed.has(idempotencyKey)) return completed.get(idempotencyKey)!;
    await new Promise<void>((resolve, reject) => {
      if (signal.aborted) { reject(new DOMException('Aborted', 'AbortError')); return; }
      const abort = () => { clearTimeout(timer); reject(new DOMException('Aborted', 'AbortError')); };
      const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, delay);
      signal.addEventListener('abort', abort, { once: true });
    });
    if (failures-- > 0) throw new Error('Simulated submission failure');
    const result = { id: `demo-${idempotencyKey}`, mode: 'mock' as const };
    completed.set(idempotencyKey, result);
    return result;
  } };
}
