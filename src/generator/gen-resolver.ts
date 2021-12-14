import { Model } from './types';

interface GenerateResolverParam {
  model: Model;
  config: any;
}

export const generateResolver = ({ model, config }: GenerateResolverParam) => {
  return `defmodule ${config.appname}Web.Resolver.${model.name} do
  @moduledoc """
  This module is automatically generated.
  """
  alias ${config.appname}.Repo
  
  def get(_root, args, info) do
    Repo.get(${config.appname}.${model.name}, args.id)
  end
  
end
`;
};
