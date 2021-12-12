import type { DMMF } from '@prisma/generator-helper';
import path from 'path';
import { Model } from './types';
import { logger } from '@prisma/sdk';
import { generateEcto } from './gen-ecto';

interface RunParam {
  output: string;
  dmmf: DMMF.Document;
  config: any;
}

export const run = ({ output, dmmf, config }: RunParam) => {
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
      schema: path.join(
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

  console.log(filteredModels);

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
    return [ecto];
  });

  return [...modelFiles].flat();
};
