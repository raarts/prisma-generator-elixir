export const mapPrismTypeToEcto = (fieldType: string): string => {
  switch (fieldType) {
    case 'String':
      return `, :string`;
    case 'Json':
      return `, :string`;
    case 'Boolean':
      return `, :boolean`;
    case 'Int':
      return `, :integer`;
    case 'Float':
      return `, :float`;
    case 'DateTime':
      return `, :utc_datetime`;
    default:
      return `, :string`;
  }
};

export const mapPrismTypeToGraphQL = (fieldType: string): string => {
  switch (fieldType) {
    case 'String':
      return `, :string`;
    case 'Json':
      return `, :string`;
    case 'Boolean':
      return `, :boolean`;
    case 'Int':
      return `, :integer`;
    case 'Float':
      return `, :float`;
    case 'DateTime':
      return `, :datetime`;
    default:
      return `, :string`;
  }
};
