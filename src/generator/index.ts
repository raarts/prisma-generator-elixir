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

export const stringToBoolean = (input: string, defaultValue = false) => {
  if (input === 'true') {
    return true;
  }
  if (input === 'false') {
    return false;
  }
  return defaultValue;
};

export const run = ({ output, dmmf, config, timestamp }: RunParam) => {
  const allModels = dmmf.datamodel.models;

  const genEcto = stringToBoolean(config.genEcto, true);
  const genTypes = stringToBoolean(config.genTypes, true);
  const genResolvers = stringToBoolean(config.genResolvers, true);
  const genSchema = stringToBoolean(config.genSchema, true);
  const genMigration = stringToBoolean(config.genMigration, false);

  // Extend the model definitions with the files and paths that need to be generated
  const filteredModels: Model[] = allModels.map((model) => ({
    ...model,
    output: {
      ecto: path.join(
        output,
        config.appname.toLocaleLowerCase(),
        'schema',
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

    // generate schema types definition hello_web/schema/model.ex
    const types = {
      fileName: model.output.types + '.ex',
      content: generateTypes({
        model,
        config,
      }),
    };

    // generate schema resolver hello_web/resolvers/model.ex
    const resolver = {
      fileName: model.output.resolver + '.ex',
      content: generateResolver({
        model,
        config,
      }),
    };
    const list = [];
    if (genEcto) list.push(ecto);
    if (genTypes) list.push(types);
    if (genResolvers) list.push(resolver);
    return list;
  });

  if (genSchema) {
    // generate schema file hello_web/schema.ex
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
    ]);
  }

  if (genMigration) {
    // generate migration file priv/repo/migrations/YYYYMMDDhhmmss_prisma_generated.exs
    modelFiles.push([
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
  }

  return [...modelFiles].flat();
};
