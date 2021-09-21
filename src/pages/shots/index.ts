import { Shot } from '../../common/interfaces/shot';
import { shot as multiPlayerInteraction } from './MultiPlayerInteraction';
import { shot as comingSoon } from './ComingSoon';

export const allShots: Shot[] = [
  multiPlayerInteraction,
  comingSoon,
];
