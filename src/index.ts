import { generatorHandler } from '@prisma/generator-helper';
import { parseEnvValue } from '@prisma/sdk';
import { logger } from '@prisma/sdk';

import { run } from './generator';

import type { GeneratorOptions } from '@prisma/generator-helper';
import path from 'path';
import fs from 'fs/promises';
import { WriteableFileSpecs } from './generator/types';
import makeDir from 'make-dir';

export const generate = async (options: GeneratorOptions): Promise<any> => {
  logger.log('Generating Elixir files');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const output = parseEnvValue(options.generator.output!);

  console.log(options);
  const results = run({
    output,
    dmmf: options.dmmf,
    config: { ...options.generator.config },
  });

  const indexCollections: Record<string, WriteableFileSpecs> = {};

  return Promise.all(
    results
      .concat(Object.values(indexCollections))
      .map(async ({ fileName, content }) => {
        await makeDir(path.dirname(fileName));
        console.log('writing:' + fileName);
        return fs.writeFile(fileName, content);
      }),
  );
};

generatorHandler({
  onManifest: () => ({
    defaultOutput: '../src/@generated/prisma-generator-elixir',
    prettyName: 'Elixir Ecto and Absinthe/GraphQL Generator',
  }),
  onGenerate: generate,
});
