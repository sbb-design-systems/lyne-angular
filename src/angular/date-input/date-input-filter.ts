import {
  BaseNgValidationError,
  createMetadataKey,
  type LogicFn,
  metadata,
  type PathKind,
  type required,
  type SchemaPath,
  type SchemaPathRules,
  validate,
  type ValidationErrorOptions,
} from '@angular/forms/signals';

type BaseValidatorConfig<TValue, TPathKind extends PathKind = PathKind.Root> = Parameters<
  typeof required<TValue, TPathKind>
>[1];

export type DateFilterFn = (date: Date) => boolean;

/**
 * A {@link MetadataKey} representing a date filter for a date input.
 */
export const DATE_FILTER = createMetadataKey<DateFilterFn | undefined>();

/**
 * An error used to indicate that a date does not pass the date filter validator.
 */
export class DateFilterValidationError extends BaseNgValidationError {
  override readonly kind = 'sbbDateFilter';

  constructor(
    readonly dateFilter: DateFilterFn,
    options?: ValidationErrorOptions,
  ) {
    super(options);
  }
}

/**
 * Binds a validator to the given path that requires the value to be validated
 * by the given `dateFilter`.
 * This function can only be called on date paths.
 *
 * @param path Path of the field to validate
 * @param dateFilterValue A LogicFn that returns the date filter. Due to type limitations, this must always
 *   a function that returns the date filter function.
 * @param config Optional, allows providing any of the following options:
 *  - `error`: Custom validation error(s) to be used instead of the default `ValidationError.min(minDate)`
 *    or a function that receives the `FieldContext` and returns custom validation error(s).
 * @template TPathKind The kind of path the logic is bound to (a root path, child path, or item of an array)
 */
export function dateFilter<TValue extends Date | null, TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
  dateFilterValue: LogicFn<TValue, DateFilterFn | undefined, TPathKind>,
  config?: BaseValidatorConfig<TValue, TPathKind>,
): void {
  const FILTER_MEMO = createMetadataKey<DateFilterFn | undefined>();

  // Memoize the minimum valid date.
  metadata(path, FILTER_MEMO, (ctx) => {
    if (config?.when && !config.when(ctx)) {
      return undefined;
    }
    return dateFilterValue(ctx);
    /*
    const result: unknown = (dateFilterValue as DateFilterFn)(new Date(NaN));
    return typeof result !== 'boolean' && result instanceof Function
      ? (dateFilterValue as LogicFn<TValue, DateFilterFn | undefined, TPathKind>)(ctx)
      : (dateFilterValue as DateFilterFn);
    */
  });

  // Publish the memoized date filter for aggregation.
  metadata(path, DATE_FILTER, ({ state }) => state.metadata(FILTER_MEMO)!());

  // Validate that the field value passes the date filter.
  validate(path, (ctx) => {
    const value = ctx.value();
    if (value === null || Number.isNaN(value.getTime())) {
      return undefined;
    }
    const dateFilter = ctx.state.metadata(FILTER_MEMO)!();
    if (dateFilter === undefined) {
      return undefined;
    }
    if (!dateFilter(value)) {
      if (config?.error) {
        return config.error instanceof Function ? config.error(ctx) : config.error;
      } else {
        const message = config?.message instanceof Function ? config.message(ctx) : config?.message;
        return new DateFilterValidationError(dateFilter, { message });
      }
    }
    return undefined;
  });
}
