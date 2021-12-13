import { DMMF } from '@prisma/generator-helper';

export interface Model extends DMMF.Model {
  output: {
    ecto: string;
    types: string;
    resolver: string;
  };
}

export type WriteableFileSpecs = {
  fileName: string;
  content: string;
};
