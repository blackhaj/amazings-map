import { parseCsv } from '~/utils/server';
import fs from 'fs/promises';
import path from 'path';

const headers =
  'Name,City/State,Country,Function,Joined,No Longer at Maze,Title'.split(',');

const parseAmazings = async () => {
  const file = await fs.readFile(
    path.resolve(__dirname, './amazings.csv'),
    'utf-8'
  );

  const parsed = (await parseCsv({ file, headers })) as Array<any>;

  const filtered = parsed
    .filter((row) => row['No Longer at Maze'] === 'No' && !!row['Country'])
    .map(async (row) => {
      return {
        country: row['Country'],
        department: row['Function'],
      };
    });

  const done = await Promise.all(filtered);

  await fs.writeFile(
    path.resolve(__dirname, 'amazings-done.json'),
    JSON.stringify(done, null, 2)
  );
  console.log(done);
};

parseAmazings();
