// FIXME the function `argsToTemplate` from @storybook/angular does not work with variables in kebab-case
//  however this implementation does not allow to pass function, maybe due to a JSON.stringify somewhere in the process.
export function spreadArgs(args: Record<string, unknown>) {
  return Object.entries(args)
    .filter(([key]) => args[key] !== undefined && args[key] !== false)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
}
