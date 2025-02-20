import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbTab } from '@sbb-esta/lyne-angular/tabs/tab';
import { SbbTabGroup } from '@sbb-esta/lyne-angular/tabs/tab-group';
import { SbbTabLabel } from '@sbb-esta/lyne-angular/tabs/tab-label';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

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

const argTypes: ArgTypes = {
  label,
  iconName,
  amount,
  size,
  negative,
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
      imports: [SbbTab, SbbTabLabel, SbbTitle, SbbBlockLink],
    }),
  ],
  title: 'elements/sbb-tab/sbb-tab-group',
  component: SbbTabGroup,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-milk)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ label, iconName, amount, size, ...args }) => ({
    props: { label, iconName, amount, size, ...args },
    template: `
      <sbb-tab-group size=${size} initial-selected-index="0">
        <sbb-tab-label amount=${amount} icon-name=${iconName}>${label}</sbb-tab-label>
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
          <section>
            Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
            elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
            urna neque viverra justo nec.
            <sbb-block-link target="_blank" href="https://www.sbb.ch">Visit sbb.ch</sbb-block-link>
          </section>
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
