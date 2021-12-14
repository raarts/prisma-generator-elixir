import type { DMMF } from '@prisma/generator-helper';
import { Model } from './types';

interface GenerateTypesParam {
  model: Model;
  config: any;
}

export const generateTypes = ({ model, config }: GenerateTypesParam) => {
  const gen_field = (field: DMMF.Field) => {
    let result = `    field :${field.name.toLocaleLowerCase()}`;
    switch (field.type) {
      case 'String':
        result += `, :string`;
        break;
      case 'Json':
        result += `, :string`;
        break;
      case 'Boolean':
        result += `, :boolean`;
        break;
      case 'Int':
        result += `, :integer`;
        break;
      case 'Float':
        result += `, :float`;
        break;
      case 'DateTime':
        result += `, :datetime`;
        break;
      default:
        result += `, :string`;
        break;
    }
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
