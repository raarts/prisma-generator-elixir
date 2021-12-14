import type { DMMF } from '@prisma/generator-helper';
import { Model } from './types';

interface GenerateEctoParam {
  model: Model;
  config: any;
}

export const generateEcto = ({ model, config }: GenerateEctoParam) => {
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
        result += `, :utc_datetime`;
        break;
      default:
    }
    if (field.documentation) {
      result += '  # ' + field.documentation;
    }
    result += '\n';
    return result;
  };

  return `defmodule ${config.appname}.${model.name} do
  use Ecto.Schema
  import Ecto.Changeset
  alias ${config.appname}.Repo
  @primary_key false
  
  schema "${model.name.toLocaleLowerCase()}" do
${model.fields.map(gen_field).join('')}  end

  @doc false
  def changeset(${model.name.toLocaleLowerCase()}, attrs) do
    ${model.name.toLocaleLowerCase()}
    |> cast(attrs, [${model.fields
      .map((field: DMMF.Field) => ':' + field.name)
      .join(', ')}])
    |> validate_required([${model.fields
      .filter((field: DMMF.Field) => field.isRequired)
      .map((field: DMMF.Field) => ':' + field.name)
      .join(', ')}])
${model.fields
  .filter((field: DMMF.Field) => field.isUnique)
  .map((field: DMMF.Field) => '    |> unique_constraint(:' + field.name + ')')
  .join('\n')}  end

end
`;
};

// def list_users do
//   Repo.all(${config.appname}.${model.name})
// end
