interface GenerateResolverParam {
  model: any;
  config: any;
}

export const generateResolver = ({ model, config }: GenerateResolverParam) => {
  return `defmodule ${config.appname}.Resolver.${model.name} do
  @moduledoc """
  This module is automatically generated.
  """
  
end
`;
};
