/**
 * Static image map for scenario assets.
 *
 * Metro cannot resolve dynamic require() paths at bundle time, so every
 * image must be listed here as a static require(). When a new image is added
 * to src/assets/scenarios/, add its entry below.
 *
 * Returns undefined for any filename not present — PatientCard handles the
 * absent case gracefully (no image rendered).
 */
import { ImageRequireSource } from 'react-native';

const MAP: Record<string, ImageRequireSource> = {
  'sja_001_ankle_sprain.jpeg': require('./scenarios/sja_001_ankle_sprain.jpeg'),
  'sja_004_nosebleed.jpeg': require('./scenarios/sja_004_nosebleed.jpeg'),
  'sja_005_severe_nosebleed.jpeg': require('./scenarios/sja_005_severe_nosebleed.jpeg'),
  'sja_006_cut_finger.jpeg': require('./scenarios/sja_006_cut_finger.jpeg'),
  'sja_008_cardiac_arrest.jpeg': require('./scenarios/sja_008_cardiac_arrest.jpeg'),
  'sja_010_child_drowning.jpeg': require('./scenarios/sja_010_child_drowning.jpeg'),
  'sja_012_anaphylaxis.jpeg': require('./scenarios/sja_012_anaphylaxis.jpeg'),
  'sja_013_stroke.jpeg': require('./scenarios/sja_013_stroke.jpeg'),
  'sja_025_choking.jpeg': require('./scenarios/sja_025_choking.jpeg'),
  'sja_026_child_choking.jpeg': require('./scenarios/sja_026_child_choking.jpeg'),
  'sja_027_unresponsive_drunk.jpeg': require('./scenarios/sja_027_unresponsive_drunk.jpeg'),
  'sja_028_unresponsive_poisoning.jpeg': require('./scenarios/sja_028_unresponsive_poisoning.jpeg'),
  'sja_029_bee_anaphylaxis.jpeg': require('./scenarios/sja_029_bee_anaphylaxis.jpeg'),
  'sja_049_helmet_fall.jpeg': require('./scenarios/sja_049_helmet_fall.jpeg'),
  'sja_050_motorcyclist_seizure.jpeg': require('./scenarios/sja_050_motorcyclist_seizure.jpeg'),
  'sja_051_food_poisoning.jpeg': require('./scenarios/sja_051_food_poisoning.jpeg'),
  'sja_052_fertilizer_poisoning.jpeg': require('./scenarios/sja_052_fertilizer_poisoning.jpeg'),
  'sja_053_scald_burn.jpeg': require('./scenarios/sja_053_scald_burn.jpeg'),
  'sja_054_panic_attack.jpeg': require('./scenarios/sja_054_panic_attack.jpeg'),
  'sja_055_hyperventilation_ptsd.jpeg': require('./scenarios/sja_055_hyperventilation_ptsd.jpeg'),
  'sja_056_psychiatric_crisis.jpeg': require('./scenarios/sja_056_psychiatric_crisis.jpeg'),
  'sja_058_abdominal_trauma.jpeg': require('./scenarios/sja_058_abdominal_trauma.jpeg'),
  'sja_059_pelvic_fracture.jpeg': require('./scenarios/sja_059_pelvic_fracture.jpeg'),
  'sja_060_flail_chest.jpeg': require('./scenarios/sja_060_flail_chest.jpeg'),
};

export function getScenarioImage(
  filename: string | undefined
): ImageRequireSource | undefined {
  if (!filename) return undefined;
  return MAP[filename];
}
