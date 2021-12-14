import type { DMMF } from '@prisma/generator-helper';
import { Model } from './types';
import { mapPrismTypeToElixir } from './helpers';

interface GenerateMigrationParam {
  models: Model[];
  config: any;
  timestamp: string;
}

export const generateMigration = ({
  models,
  config,
  timestamp,
}: GenerateMigrationParam) => {
  const gen_add = (field: DMMF.Field) => {
    let result = `      add :${field.name.toLocaleLowerCase()}`;
    result += mapPrismTypeToElixir(field.type);
    result += '\n';
    return result;
  };

  return `defmodule ${config.appname}.Repo.Migrations.S${timestamp} do
  use Ecto.Migration
${models
  .map((model) => {
    return `
  def change do
    create table(:${model.name.toLocaleLowerCase()}) do
${model.fields.map(gen_add).join('')}    end
  end
  `;
  })
  .join('')}
end
`;
};
