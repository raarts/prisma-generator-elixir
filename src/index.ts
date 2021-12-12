import { generatorHandler } from '@prisma/generator-helper';
import { parseEnvValue } from '@prisma/sdk';
import { logger } from '@prisma/sdk';

import { run } from './generator';

import type { GeneratorOptions } from '@prisma/generator-helper';

export const generate = async (options: GeneratorOptions): Promise<any> => {
  logger.log('Generating Absinthe GraphQL files');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const output = parseEnvValue(options.generator.output!);

  console.log(options);
  const results = run({
    output,
    dmmf: options.dmmf,
    config: { ...options.generator.config },
  });
  logger.log(results);
  logger.info('Done');
};

generatorHandler({
  onManifest: () => ({
    defaultOutput: '../src/generated/nestjs-dto',
    prettyName: 'Elixir Absinthe GraphQL Generator',
  }),
  onGenerate: generate,
});
