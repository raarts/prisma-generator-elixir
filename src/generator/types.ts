import { DMMF } from '@prisma/generator-helper';

export interface Model extends DMMF.Model {
  output: {
    ecto: string;
    schema: string;
    resolver: string;
  };
}

export type WriteableFileSpecs = {
  fileName: string;
  content: string;
};
