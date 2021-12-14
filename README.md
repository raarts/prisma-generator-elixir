# Prisma Generator Elixir 

1. [What is it?](#what-is-it)
1. [Usage](#usage)
1. [Example](#example)
1. [License](#license)

(This is absolutely not ready yet, pre-pre-pre alpha)
## <a name="what-is-it"></a>What is it?

Generates `schema`, `resolvers`,  for models in your Prisma Schema. 

## <a name="usage"></a>Usage

```sh
npm install --save-dev @raarts/prisma-generator-elixir
```

```prisma
generator elixir {
  provider                        = "prisma-generator-elixir"
  output                          = "../hello/lib/hello_web"
  appname                         = "Hallo"
}
```

### Parameters

- [`output`]: (required) - output path relative to your `schema.prisma` file
- [`appname`]: (required) - Base name of the Elixir Application 
- [`genEcto`]: (optional) - Generate Ecto schema. Default true
- [`genTypes`]: (optional) - Generate Absinthe Type files. Default true
- [`genResolvers`]: (optional) - Generate Absinthe Resolvers based on Ecto Repo calls. Default true 
- [`genSchema`]: (optional) - Generate Absinthe Schema file. Default true
- [`genMigration`]: (optional) - Generate Ecto migration file. Default false


## <a name="example"></a>Example

<details>
  <summary>Prisma Schema</summary>
  
  ```prisma

generator elixirAbsinthe {
provider = "prisma-generator-elixir"
output = "../src"
}

model Question {
id String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
/// @DtoReadOnly
createdAt DateTime @default(now())
/// @DtoRelationRequired
createdBy User? @relation("CreatedQuestions", fields: [createdById], references: [id])
createdById String? @db.Uuid
updatedAt DateTime @updatedAt
/// @DtoRelationRequired
updatedBy User? @relation("UpdatedQuestions", fields: [updatedById], references: [id])
updatedById String? @db.Uuid

    /// @DtoRelationRequired
    /// @DtoRelationCanConnectOnCreate
    category   Category? @relation(fields: [categoryId], references: [id])
    categoryId String?   @db.Uuid

    /// @DtoCreateOptional
    /// @DtoRelationCanCreateOnCreate
    /// @DtoRelationCanConnectOnCreate
    /// @DtoRelationCanCreateOnUpdate
    /// @DtoRelationCanConnectOnUpdate
    tags Tag[]

    title     String
    content   String
    responses Response[]

}

````

</details>

<details>
<summary>Generated results</summary>

</details>

## <a name="license"></a>License

All files are released under the [Apache License 2.0](https://github.com/raarts/prisma-generator-elixir/blob/master/LICENSE).
