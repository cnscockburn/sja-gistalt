import type { Level } from '@/types/level';
import type { StackSize } from '@/types/game';
import type { Scenario } from '@/types/scenario';
import { getScenarios } from '@/data/registry';
import { filterByLevel } from '@/utils/filterScenarios';
import { shuffle } from '@/utils/shuffle';

/**
 * Build a play deck: all scenarios -> filter to level -> shuffle -> cap to size.
 * If fewer scenarios exist than the requested size, the deck is as large as the
 * available pool allows.
 */
export async function buildDeck(level: Level, stackSize: StackSize): Promise<Scenario[]> {
  const all = await getScenarios();
  const available = filterByLevel(all, level);
  return shuffle(available).slice(0, stackSize);
}
