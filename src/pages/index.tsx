import React, { useState } from 'react';
import { scaleLinear } from 'd3-scale';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from 'react-simple-maps';
import worldData from '../data/world-data.json';
import { SimpleLayout } from '~/components';
import ReactTooltip from 'react-tooltip';
import amazings from '../data/amazings-done.json';

const colorScale = scaleLinear().domain([0, 37]).range(['#c7d2fe', '#3730a3']);

type Counts = {
  [key: string]: {
    totalCount: number;
    departments: {
      [key: string]: number;
    };
  };
};

const counts: Counts = amazings.reduce((acc, row) => {
  if (!acc[row['country']]) {
    acc[row['country']] = {
      totalCount: 0,
      departments: {},
    };
  }
  acc[row['country']].totalCount++;

  acc[row['country']].departments[row.department] =
    (acc[row['country']].departments[row.department] || 0) + 1;
  return acc;
}, {} as Counts);

const createDetails = ({
  country,
  counts,
}: {
  country: string;
  counts: Counts;
}) => {
  const countryInfo = counts[country];

  const byDepartment = () => {
    const sortedDepartments = Object.entries(countryInfo?.departments).sort(
      (first, next) => (first[0] > next[0] ? 1 : -1)
    );
    return sortedDepartments.map(([name, count]) => {
      return (
        <>
          {name}: {count}
          <br />
        </>
      );
    });
  };

  return (
    <p className="p-2 rounded-md bg-stone-800 text-zinc-100 ">
      <h3 className="font-bold">{`${country}`}</h3>
      <p>Total: {countryInfo?.totalCount || 0}</p>
      <br /> {countryInfo ? byDepartment() : null}
    </p>
  );
};

const MapChart = () => {
  const [content, setTooltipContent] = useState<
    '' | { country: string; counts: Counts }
  >('');

  return (
    <>
      <SimpleLayout title="A map of Amazings">
        <>
          <ReactTooltip multiline={true}>
            {content ? createDetails(content) : ''}
          </ReactTooltip>
          <section data-tip="" data-multiline={true}>
            <ComposableMap
              projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 147,
              }}
            >
              <Sphere className="stroke-stone-400 dark:stroke-indigo-300 stroke-[0.1] dark:stroke-[0.1]" />
              <Graticule className="stroke-stone-400 dark:stroke-teal-300 stroke-[0.1] dark:stroke-[0.1]" />
              <Geographies
                className="stroke-stone-400 stroke-[0.1]"
                geography={worldData}
              >
                {({ geographies }: any) =>
                  geographies.map((geo: any) => {
                    const d = counts[geo.properties.name]?.totalCount || 0;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={d ? colorScale(d) : '#F5F4F6'}
                        onMouseEnter={() => {
                          setTooltipContent({
                            country: geo.properties.name,
                            counts,
                          });
                        }}
                        onMouseLeave={() => {
                          setTooltipContent('');
                        }}
                        style={{
                          hover: {
                            fill: '#14b8a6',
                            outline: 'none',
                          },
                          pressed: {
                            outline: 'none',
                          },
                          default: {
                            outline: 'none',
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </section>
        </>
      </SimpleLayout>
    </>
  );
};

export default MapChart;
