export interface Version {
  major: number;
  minor: number;
}

export interface UpdateStep extends Version {
  lyneChangelog: string;
  ngChangelog: string;
  actions: string[];
}

export const UPDATE_STEPS: UpdateStep[] = [
  {
    major: 21,
    minor: 0,
    lyneChangelog: 'https://github.com/sbb-design-systems/lyne-components/releases/tag/v4.0.0',
    ngChangelog: 'https://github.com/sbb-design-systems/lyne-angular/releases/tag/v21.0.0',
    actions: [],
  },
  {
    major: 22,
    minor: 0,
    lyneChangelog: 'https://github.com/sbb-design-systems/lyne-components/releases/tag/v5.0.0',
    ngChangelog: 'https://github.com/sbb-design-systems/lyne-angular/releases/tag/v22.0.0',
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
