let toMeters = new Map();
toMeters.set('feet', 3.28084);
toMeters.set('meters', 1);
toMeters.set('kilometers', 0.001);
toMeters.set('centimeters', 100);
toMeters.set('inches', 3.28084*12);
toMeters.set('yards', 3.28084/3);
toMeters.set('miles', 3.28084/5280);
const lengthScales = ['feet', 'meters', 'kilometers', 'centimeters', 'inches', 'yards', 'miles'];

let toKilograms = new Map();
toKilograms.set('pounds', 2.20462);
toKilograms.set('kilograms', 1);
toKilograms.set('grams', 1000);
toKilograms.set('ounces', 2.20462*16);
toKilograms.set('stone', 2.20462/14);
toKilograms.set('US tons', 2.20462/2000);
toKilograms.set('metric tons', 0.001);
const massScales = ['pounds', 'kilograms', 'grams', 'ounces', 'stone', 'US tons', 'metric tons'];

let toLiters = new Map();
toLiters.set('liters', 1);
toLiters.set('milliliters', 1000);
toLiters.set('US gallons', 0.264172);
toLiters.set('US quarts', 0.264172*4);
toLiters.set('US pints', 0.264172*8);
toLiters.set('US cups', 4.16667)
toLiters.set('US fluid oz', 0.264172*128);
toLiters.set('US tablespoons', 0.264172*256);
toLiters.set('US teaspoons', 0.264172*256*3);
toLiters.set('cubic meters', 0.001);
const volumeScales = ['liters', 'milliliters', 'US gallons', 'US quarts', 'US pints', 'US cups', 
'US fluid oz', 'US tablespoons', 'US teaspoons', 'cubic meters'];

const temperatureScales = ['fahrenheit', 'celsius', 'kelvin'];

let scaleMap = new Map();
scaleMap.set('length', lengthScales);
scaleMap.set('mass', massScales);
scaleMap.set('volume', volumeScales);
scaleMap.set('temperature', temperatureScales);

const Constants = {
  TO_METERS: toMeters,
  TO_KILOGRAMS: toKilograms,
  TO_LITERS: toLiters,
  SCALE_MAP: scaleMap,
}
export default Constants;