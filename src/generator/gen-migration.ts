import type { DMMF } from '@prisma/generator-helper';
import { Model } from './types';
import { mapPrismTypeToEcto } from './helpers';

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
    result += mapPrismTypeToEcto(field.type);
    if (field.isId) {
      result += ', primary_key: true';
    }
    result += '\n';
    return result;
  };

  return `defmodule ${config.appname}.Repo.Migrations.S${timestamp} do
  use Ecto.Migration
  
  def change do
${models
  .map((model) => {
    return `
    create table(:${model.name.toLocaleLowerCase()}, primary_key: false) do
${model.fields.map(gen_add).join('')}    end
  `;
  })
  .join('')}
  end
end
`;
};
