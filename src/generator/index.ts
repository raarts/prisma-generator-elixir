import type { DMMF } from '@prisma/generator-helper';
import path from 'path';
import { Model } from './types';
import { logger } from '@prisma/sdk';
import { generateEcto } from './gen-ecto';
import { generateTypes } from './gen-types';
import { generateResolver } from './gen-resolver';
import { generateSchema } from './gen-schema';
import { generateMigration } from './gen-migration';

interface RunParam {
  output: string;
  dmmf: DMMF.Document;
  config: any;
  timestamp: string;
}

export const run = ({ output, dmmf, config, timestamp }: RunParam) => {
  const allModels = dmmf.datamodel.models;

  // Extend the model definitions with the files and paths that need to be generated
  const filteredModels: Model[] = allModels.map((model) => ({
    ...model,
    output: {
      ecto: path.join(
        output,
        config.appname.toLocaleLowerCase(),
        model.name.toLocaleLowerCase(),
      ),
      types: path.join(
        output,
        config.appname.toLocaleLowerCase() + '_web/schema',
        model.name.toLocaleLowerCase(),
      ),
      resolver: path.join(
        output,
        config.appname.toLocaleLowerCase() + '_web/resolvers',
        model.name.toLocaleLowerCase(),
      ),
    },
  }));

  console.log('filteredModels: ', filteredModels);

  // for each model loop and generate all files
  const modelFiles = filteredModels.map((model) => {
    logger.info(`Processing Model ${model.name}`);

    // generate ecto definition hello/model.ex
    const ecto = {
      fileName: model.output.ecto + '.ex',
      content: generateEcto({
        model,
        config,
      }),
    };

    // generate schema definition hello_web/schema/model.ex
    const schema = {
      fileName: model.output.types + '.ex',
      content: generateTypes({
        model,
        config,
      }),
    };

    // generate schema definition hello_web/schema/model.ex
    const resolver = {
      fileName: model.output.resolver + '.ex',
      content: generateResolver({
        model,
        config,
      }),
    };
    return [ecto, schema, resolver];
  });

  modelFiles.push([
    {
      fileName: path.join(
        output,
        config.appname.toLocaleLowerCase() + '_web/schema.ex',
      ),
      content: generateSchema({
        models: filteredModels,
        config,
      }),
    },
    {
      fileName: path.join(
        output,
        '../priv/repo/migrations',
        timestamp + '_prisma_generated.exs',
      ),
      content: generateMigration({
        models: filteredModels,
        config,
        timestamp,
      }),
    },
  ]);

  return [...modelFiles].flat();
};
