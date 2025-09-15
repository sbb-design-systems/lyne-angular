import { SbbTab } from './tab/tab';
import { SbbTabContent } from './tab/tab-content';
import { SbbTabGroup } from './tab-group/tab-group';
import { SbbTabLabel } from './tab-label/tab-label';

export const SbbTabsModule = [SbbTab, SbbTabContent, SbbTabGroup, SbbTabLabel] as const;
