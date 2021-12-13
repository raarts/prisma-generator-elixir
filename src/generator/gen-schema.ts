import { Model } from './types';

interface GenerateSchemaParam {
  models: Model[];
  config: any;
}

export const generateSchema = ({ models, config }: GenerateSchemaParam) => {
  return `defmodule ${config.appname}.Schema do
  @moduledoc """
  This module is automatically generated.
  """

  use Absinthe.Schema
  alias Absinthe.Plugin
  
${models
  .map((model) => {
    return `  alias ${config.appname}.Resolver.${model.name}\n`;
  })
  .join('')}
${models
  .map((model) => {
    return `  import_types ${config.appname}.Schema.${model.name}Types\n`;
  })
  .join('')}
  
  query do
${models
  .map((model) => {
    return `
    field :${model.name.toLocaleLowerCase()}, :${model.name.toLocaleLowerCase()} do
      description "${model.documentation}"
      arg :id non_null(:integer)
      resolve &${model.name}.get/3
    end
  `;
  })
  .join('')}  
  end
end 
`;
};
