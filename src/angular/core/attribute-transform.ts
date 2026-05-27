/**
 * Transform an attribute value to a boolean value.
 * We do not use the Angular implementation because it treats 'false' as a false value,
 * which does not align with the Lit and native interpretation.
 */
export function booleanAttribute(value: unknown): boolean {
  return typeof value === 'boolean'
    ? value
    : value !== 'false' && value !== undefined && value != null;
}

/**
 * In case where we want to support empty inputs, we transform
 * an empty string value to null.
 */
export function nullOnEmptyAttribute(value: unknown): unknown {
  return value === '' ? null : value;
}
