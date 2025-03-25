import { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';
import { SbbHeader } from '@sbb-esta/lyne-angular/header/header';
import { SbbHeaderButton } from '@sbb-esta/lyne-angular/header/header-button';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbIconSidebar } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar';
import { SbbIconSidebarButton } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar-button';
import { SbbIconSidebarContainer } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar-container';
import { SbbIconSidebarContent } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar-content';
import { SbbIconSidebarLink } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar-link';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { Args, argsToTemplate, ArgTypes, Meta, moduleMetadata } from '@storybook/angular';
import { InputType } from '@storybook/types';

const position: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'end'],
};

const argTypes: ArgTypes = {
  position,
};

const args: Args = {
  position: 'start',
};

const iconSidebar = (args: Args) => `<sbb-icon-sidebar ${argsToTemplate(args)}>
          <sbb-icon-sidebar-link
            accessibility-label="Go to the party"
            icon-name="glass-cocktail-small"
            href="#"
          ></sbb-icon-sidebar-link>
          <sbb-icon-sidebar-link
            accessibility-label="Be a unicorn"
            icon-name="unicorn-small"
            href="#"
            class="sbb-active"
            accessibility-current="page"
          ></sbb-icon-sidebar-link>
          <sbb-icon-sidebar-button
            aria-label="Be happy"
            icon-name="face-grinning-small"
          ></sbb-icon-sidebar-button>
        </sbb-icon-sidebar>`;

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbChipLabel,
        SbbHeader,
        SbbHeaderButton,
        SbbIconSidebarButton,
        SbbIconSidebarContainer,
        SbbIconSidebarContent,
        SbbIconSidebarLink,
        SbbLogo,
        SbbTitle,
      ],
    }),
  ],
  title: 'elements/sbb-sidebar/sbb-icon-sidebar',
  component: SbbIconSidebar,
  parameters: { docs: { story: { inline: false, iframeHeight: '500px' } } },
  argTypes,
  args,
  render: ({ position, ...args }) => ({
    props: { position, ...args },
    template: `
      <sbb-header expanded scroll-origin="content" size="s">
        <sbb-header-button icon-name="hamburger-menu-small">Menu</sbb-header-button>
        <div style="flex-grow: 1"></div>
        <a aria-label="Homepage" href="/" class="sbb-header-logo">
          <sbb-logo protective-room="none"></sbb-logo>
        </a>
      </sbb-header>
      <sbb-icon-sidebar-container>
        ${position === 'start' ? iconSidebar(args) : ''}
        <sbb-icon-sidebar-content
          id="content"
          role="main"
          style="padding: var(--sbb-spacing-fixed-4x)"
        >
          <sbb-title level="1" visual-level="2">Unicorn Success Stories</sbb-title>
          <sbb-chip-label color="charcoal">AI generated</sbb-chip-label>
          <p>
            In the enchanting world of fantasy, unicorns are legendary creatures known for their grace,
            purity, and magical abilities. These mystical beings have inspired countless tales of bravery
            and wonder. Here, we delve into some captivating unicorn success stories that continue to
            enchant and inspire, each with a touch of public transport magic.
          </p>

          <sbb-title level="2" visual-level="3">Luna, the Moonlight Unicorn</sbb-title>
          <p>
            One of the most famous unicorns is <strong>Luna</strong>, the Moonlight Unicorn. Born under a
            rare celestial event in the serene forests near <strong>Zurich</strong>, Luna harnessed the
            power of the moon to bring light and hope to the darkest corners of the realm. Her luminous horn
            could heal wounds and purify water, making her a beloved guardian among the creatures of the
            forest. Luna also used her magic to illuminate the paths of night trains, ensuring safe journeys
            for all passengers traveling through the region.
          </p>

          <sbb-title level="2" visual-level="3">
            Aurelius, the Golden Unicorn of the Bernese Alps
          </sbb-title>
          <p>
            Another legendary unicorn is <strong>Aurelius</strong>, the Golden Unicorn of the
            <strong>Bernese Alps</strong>. Known for his shimmering golden coat and unparalleled strength,
            Aurelius led the charge against the malevolent Shadow Beasts. His bravery and determination
            restored harmony to the land, making him a symbol of courage and unity. Aurelius also played a
            crucial role in guiding mountain trains through the rugged terrain, helping travelers reach
            their destinations safely and efficiently.
          </p>

          <sbb-title level="2" visual-level="3">
            Seraphina, the Unicorn of the Lucerne Enchanted Glade
          </sbb-title>
          <p>
            <strong>Seraphina</strong>, the Unicorn of the <strong>Lucerne Enchanted Glade</strong>,
            possessed the rare gift of communication with all living beings. When a fierce drought struck
            the glade, Seraphina rallied the creatures of the forest to discover a hidden underground river,
            saving their home. Her wisdom and empathy made her a revered peacemaker. Seraphina also
            enchanted the local tram system, ensuring smooth and harmonious rides for all commuters
            navigating the picturesque city of Lucerne.
          </p>

          <sbb-title level="2" visual-level="3">Nerida, the Sea Unicorn</sbb-title>
          <p>
            In the waters of <strong>Lake Geneva</strong>, <strong>Nerida</strong>, the Sea Unicorn, used
            her magic to calm raging storms and protect the coastal villages from devastation. Her deep
            connection with the lake and its surroundings made her a guardian of the marine world and a
            symbol of nature's beauty and power. Nerida also enchanted the ferries that crossed Lake Geneva,
            ensuring safe and pleasant voyages for all passengers traveling between the lakeside towns.
          </p>

          <sbb-title level="2" visual-level="3">Orion, the Railway Unicorn</sbb-title>
          <p>
            Lastly, in the bustling city of <strong>Geneva</strong>, <strong>Orion</strong>, the Railway
            Unicorn, played a pivotal role in connecting distant Swiss cities. With his magical horn, Orion
            could guide trains safely through treacherous terrains and ensure timely arrivals. His
            dedication to bringing people together and fostering commerce made him a beloved figure in
            Switzerland's history. Orion's influence extended to the entire railway network, making it one
            of the most reliable and efficient in the world.
          </p>

          <p>
            These unicorn success stories, filled with magic, bravery, and wisdom, remind us that even in
            the realm of fantasy, the qualities of kindness, courage, and cooperation can lead to
            extraordinary achievements. As we celebrate these legendary unicorns, we are inspired to believe
            in the magic within ourselves and the possibility of creating our own success stories.
          </p>
        </sbb-icon-sidebar-content>
        ${position === 'end' ? iconSidebar(args) : ''}
      </sbb-icon-sidebar-container>`,
  }),
};
export default meta;

export const Default = {};
