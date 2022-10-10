import worldData from './world-data.json';
import amazings from './amazings-done.json';

const countryList = worldData.objects.countries.geometries.reduce(
  (acc, country) => {
    acc[country.properties.name] = true;
    return acc;
  },
  {} as { [key: string]: any }
);

console.log(countryList);

console.log(amazings.filter((item) => !countryList[item.country]));
