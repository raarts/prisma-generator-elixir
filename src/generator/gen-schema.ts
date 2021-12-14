import { Model } from './types';
import { DMMF } from '@prisma/generator-helper';
import { mapPrismTypeToElixir } from './helpers';

interface GenerateSchemaParam {
  models: Model[];
  config: any;
}

export const generateSchema = ({ models, config }: GenerateSchemaParam) => {
  const gen_arg = (field: DMMF.Field) => {
    let result = `      arg :${field.name.toLocaleLowerCase()}`;
    result += mapPrismTypeToElixir(field.type);
    result += '\n';
    return result;
  };

  return `defmodule ${config.appname}Web.Schema do
  @moduledoc """
  This module is automatically generated.
  """

  use Absinthe.Schema
  alias Absinthe.Plugin
  import_types Absinthe.Type.Custom  # for :datetime

${models
  .map((model) => {
    return `  alias ${config.appname}Web.Resolver.${model.name}\n`;
  })
  .join('')}
${models
  .map((model) => {
    return `  import_types ${config.appname}Web.Schema.${model.name}Types\n`;
  })
  .join('')}
  
  query do
${models
  .map((model) => {
    return `
    field :${model.name.toLocaleLowerCase()}, :${model.name.toLocaleLowerCase()} do
      description "${model.documentation}"
${model.fields.map(gen_arg).join('')}
      resolve &${model.name}.get/3
    end
  `;
  })
  .join('')}  
  end
end 
`;
};
