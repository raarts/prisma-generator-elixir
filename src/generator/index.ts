import type { DMMF } from '@prisma/generator-helper';
import path from 'path';
import { Model } from './types';
import { logger } from '@prisma/sdk';

interface RunParam {
  output: string;
  dmmf: DMMF.Document;
  config: any;
}

export const run = ({ output, dmmf, config }: RunParam) => {
  const allModels = dmmf.datamodel.models;

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

  const modelFiles = filteredModels.map((model) => {
    logger.info(`Processing Model ${model.name}`);

    return [];
  });

  return [...modelFiles].flat();
};
