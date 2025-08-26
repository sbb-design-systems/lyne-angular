import { SbbFlipCard } from './flip-card/flip-card';
import { SbbFlipCardDetails } from './flip-card-details/flip-card-details';
import { SbbFlipCardSummary } from './flip-card-summary/flip-card-summary';

export const SbbFlipCardModule = [SbbFlipCard, SbbFlipCardDetails, SbbFlipCardSummary] as const;
