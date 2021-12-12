import type { DMMF } from '@prisma/generator-helper';

interface RunParam {
  output: string;
  dmmf: DMMF.Document;
}

export const run = ({ output, dmmf }: RunParam) => {
  const allModels = dmmf.datamodel.models;
  console.log(output);
  console.log(allModels);
};
