import type { DMMF } from '@prisma/generator-helper';
import { Model } from './types';
import { mapPrismTypeToElixir } from './helpers';

interface GenerateTypesParam {
  model: Model;
  config: any;
}

export const generateTypes = ({ model, config }: GenerateTypesParam) => {
  const gen_field = (field: DMMF.Field) => {
    console.log(field);
    let result = `    field :${field.name.toLocaleLowerCase()}`;
    result += mapPrismTypeToElixir(field.type);
    result += ' do\n';
    // if (field.documentation) {
    result += '      description "' + field.documentation + '"\n';
    // }
    result += '    end\n';
    return result;
  };

  return `defmodule ${config.appname}Web.Schema.${model.name}Types do
  @moduledoc """
  This module is automatically generated.
  """

  use Absinthe.Schema.Notation

  object :${model.name.toLocaleLowerCase()} do
    description ""

${model.fields.map(gen_field).join('')}  end
end
`;
};
