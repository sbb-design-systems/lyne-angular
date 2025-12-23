import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbTabGroup, SbbTabsModule } from '@sbb-esta/lyne-angular/tabs';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Tab1',
  },
};

const iconName: InputType = {
  control: {
    type: 'select',
  },
  options: ['app-icon-small', 'train-small', 'swisspass-small', 'pie-small'],
  table: {
    category: 'Tab1',
  },
};

const amount: InputType = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Tab1',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'l', 'xl'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const initialSelectedIndex: InputType = {
  control: {
    type: 'number',
  },
};

const argTypes: ArgTypes = {
  label,
  iconName,
  amount,
  size,
  negative,
  initialSelectedIndex,
};

const args: Args = {
  label: 'Tab label one',
  amount: 123,
  size: size.options![1],
  negative: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbTabsModule, SbbTitle, SbbBlockLink],
    }),
  ],
  title: 'elements/sbb-tab/sbb-tab-group',
  component: SbbTabGroup,
  parameters: {
    backgroundColor: () => 'var(--sbb-background-color-3)',
  },
  argTypes,
  args,
  render: ({ label, iconName, amount, size, initialSelectedIndex, ...args }: Args) => ({
    props: { label, iconName, amount, size, initialSelectedIndex, ...args },
    template: `
      <sbb-tab-group [size]="size" [initialSelectedIndex]="initialSelectedIndex">
        <sbb-tab-label [amount]="amount" [iconName]="iconName">{{label}}</sbb-tab-label>
        <sbb-tab>
          <article>
            Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
            elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
            urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus
            turpis in eu mi bibendum neque egestas congue.
            <sbb-title level="5">Content heading</sbb-title>
            Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
            elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
            urna neque viverra justo nec.
          </article>
        </sbb-tab>

        <sbb-tab-label>Tab title two</sbb-tab-label>
        <sbb-tab>
          <ng-template sbbTabContent>
            <section>
              Lazy loaded tab.
              Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
              elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
              urna neque viverra justo nec.
              <sbb-block-link target="_blank" href="https://www.sbb.ch">Visit sbb.ch</sbb-block-link>
            </section>
          </ng-template>
        </sbb-tab>

        <sbb-tab-label disabled>Tab title three</sbb-tab-label>
        <sbb-tab>I was disabled.</sbb-tab>

        <sbb-tab-label>Tab title four</sbb-tab-label>
        <sbb-tab>
          Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
          elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
          urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus
          turpis in eu mi bibendum neque egestas congue.
        </sbb-tab>
      </sbb-tab-group>
    `,
  }),
};
export default meta;

export const Default = {};
