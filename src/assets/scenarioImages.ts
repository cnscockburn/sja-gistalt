/**
 * Static image map for scenario assets.
 *
 * Metro cannot resolve dynamic require() paths at bundle time, so every
 * image must be listed here as a static require(). When a new image is added
 * to assets/scenarios/, add its entry below.
 *
 * Returns undefined for any filename not present — PatientCard handles the
 * absent case gracefully (no image rendered).
 */
import { ImageRequireSource } from 'react-native';

const MAP: Record<string, ImageRequireSource> = {
  'sja-001.jpg': require('../../assets/scenarios/sja-001.jpg'),
  'sja-004.jpg': require('../../assets/scenarios/sja-004.jpg'),
  'sja-005.jpg': require('../../assets/scenarios/sja-005.jpg'),
  'sja-006.jpg': require('../../assets/scenarios/sja-006.jpg'),
  'sja-008.jpg': require('../../assets/scenarios/sja-008.jpg'),
  'sja-010.jpg': require('../../assets/scenarios/sja-010.jpg'),
  'sja-012.jpg': require('../../assets/scenarios/sja-012.jpg'),
};

export function getScenarioImage(
  filename: string | undefined
): ImageRequireSource | undefined {
  if (!filename) return undefined;
  return MAP[filename];
}
