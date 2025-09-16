import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbCard } from '@sbb-esta/lyne-angular/card';
import { SbbImage } from '@sbb-esta/lyne-angular/image';
import { SbbOverlay } from '@sbb-esta/lyne-angular/overlay';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbButton, SbbTitle, SbbImage, SbbCard],
    }),
  ],
  title: 'elements/sbb-overlay',
  component: SbbOverlay,
  args: {
    expanded: false,
    negative: false,
  },
  render: ({ openOverlay, ...args }: Args) => ({
    props: { openOverlay, ...args },
    template: `
      <sbb-button size="m" #trigger>
        Open overlay
      </sbb-button>
      <sbb-overlay [trigger]="trigger" ${argsToTemplate(args)}>
        <div class="overlay-content">
          <sbb-title visualLevel="2" negative=${args['negative'] === true} style="margin-block-start: 0">
            Many Meetings
          </sbb-title>
          Frodo halted for a moment, looking back. Elrond was in his chair and the fire was on his face
          like summer-light upon the trees. Near him sat the Lady Arwen. To his surprise Frodo saw that
          Aragorn stood beside her; his dark cloak was thrown back, and he seemed to be clad in
          elven-mail, and a star shone on his breast. They spoke together, and then suddenly it seemed
          to Frodo that Arwen turned towards him, and the light of her eyes fell on him from afar and
          pierced his heart.
          <sbb-image
            style="margin-block: 1rem"
            imageSrc='https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg'
            alt="Natural landscape"
          ></sbb-image>
          He stood still enchanted, while the sweet syllables of the elvish song fell like clear jewels
          of blended word and melody. 'It is a song to Elbereth,'' said Bilbo. 'They will sing that, and
          other songs of the Blessed Realm, many times tonight. Come on!’ —J.R.R. Tolkien, The Lord of
          the Rings: The Fellowship of the Ring, “Many Meetings”
          <sbb-card color="transparent-bordered" style="margin-block-start: 1rem">
            J.R.R. Tolkien, the mastermind behind Middle-earth's enchanting world, was born on January 3,
            1892. With "The Hobbit" and "The Lord of the Rings", he pioneered fantasy literature. Tolkien's
            linguistic brilliance and mythic passion converge in a literary legacy that continues to
            transport readers to magical realms.
          </sbb-card>
        </div>
      </sbb-overlay>
    `,
  }),
};
export default meta;

export const Default = {};
