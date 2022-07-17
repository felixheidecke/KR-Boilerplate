import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'date-fns';

const getPackageJson = () => {
  const metadata = readFileSync(resolve('./package.json'), {
    encoding: 'utf8',
    flag: 'r'
  });

  return JSON.parse(metadata);
};

export async function get() {
  const { version } = getPackageJson();

  return {
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      version,
      build: format(new Date(), 'PPpp')
    }
  };
}
