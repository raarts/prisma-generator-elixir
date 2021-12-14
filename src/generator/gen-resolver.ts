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
  
  def get(_root, args, info) do
    # Do a Repo.get here
  end
  
end
`;
};
