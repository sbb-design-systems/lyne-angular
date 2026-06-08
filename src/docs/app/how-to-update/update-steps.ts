export interface UpdateStep {
  from: number;
  to: number;
  changelog: string;
  actions: string[];
}

export const UPDATE_STEPS: UpdateStep[] = [
  {
    from: 2100,
    to: 2200,
    changelog: 'https://github.com/sbb-design-systems/lyne-components/releases/tag/v5.0.0',
    actions: [
      `<p>
        Update your Angular dependencies to version 22.x.x with "--force" flag (due to unmet peer dependencies).<br/>
        See <sbb-link href='https://update.angular.io'>update.angular.io</sbb-link> for a step-by-step guide for updating Angular.
      </p>
      <pre><code class="hljs">npx @angular/cli@22 update @angular/core@22 @angular/cli@22 --force</code></pre>`,

      `<p>Update Angular CDK in a separate step to avoid dependency version resolving problems.</p>
       <pre><code class="hljs">npx @angular/cli@22 update @angular/cdk@22 --force</code></pre>`,

      `<p>Finally, update Lyne Angular.</p>
       <pre><code class="hljs">ng update @sbb-esta/lyne-angular@22</code></pre>`,
    ],
  },
];
