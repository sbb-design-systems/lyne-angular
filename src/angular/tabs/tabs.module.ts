import { SbbTab } from './tab/tab';
import { SbbTabGroup } from './tab-group/tab-group';
import { SbbTabLabel } from './tab-label/tab-label';

export const SbbTabsModule = [SbbTab, SbbTabGroup, SbbTabLabel] as const;
