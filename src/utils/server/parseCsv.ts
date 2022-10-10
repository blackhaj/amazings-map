import { parse } from 'csv-parse';

export const parseCsv = ({
  file,
  headers,
}: {
  file: string;
  headers: string[];
}) => {
  return new Promise((resolve, reject) => {
    parse(
      file,
      {
        delimiter: ',',
        columns: headers,
        fromLine: 2,
      },
      (error, result) => {
        if (error) {
          console.error('Something broke in the parser', error);
          reject(error);
        }
        resolve(result);
      }
    );
  });
};
